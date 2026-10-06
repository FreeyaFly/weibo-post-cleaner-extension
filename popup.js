const statusEl = document.getElementById("status");

function setStatus(text, type) {
  statusEl.textContent = text;

  if (type === "running") {
    statusEl.style.color = "#065f46";
    statusEl.style.background = "#d1fae5";
    return;
  }

  if (type === "stopped") {
    statusEl.style.color = "#7f1d1d";
    statusEl.style.background = "#fee2e2";
    return;
  }

  statusEl.style.color = "#3f6212";
  statusEl.style.background = "#ecfccb";
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tab;
}

function isWeiboTab(tab) {
  return Boolean(tab?.id && tab?.url && tab.url.includes("weibo.com"));
}

const actionsEl = document.getElementById("actions");
const confirmEl = document.getElementById("confirm");

function showConfirm(show) {
  actionsEl.hidden = show;
  confirmEl.hidden = !show;
}

document.getElementById("start").addEventListener("click", async () => {
  const tab = await getActiveTab();

  if (!isWeiboTab(tab)) {
    setStatus("Open Weibo", "stopped");
    return;
  }

  showConfirm(true);
});

document.getElementById("cancel").addEventListener("click", () => {
  showConfirm(false);
});

document.getElementById("confirm-start").addEventListener("click", async () => {
  showConfirm(false);
  const tab = await getActiveTab();

  if (!isWeiboTab(tab)) {
    setStatus("Open Weibo", "stopped");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["cleaner.js"],
      world: "MAIN"
    });

    setStatus("Running", "running");
  } catch (error) {
    console.error("Failed to start Weibo Post Cleaner:", error);
    setStatus("Error", "stopped");
  }
});

document.getElementById("stop").addEventListener("click", async () => {
  const tab = await getActiveTab();

  if (!isWeiboTab(tab)) {
    setStatus("Open Weibo", "stopped");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: "MAIN",
      func: () => {
        window.__WB_DEL_STOP = true;
        console.log("Weibo Post Cleaner: stop signal sent.");
      }
    });

    setStatus("Stopped", "stopped");
  } catch (error) {
    console.error("Failed to stop Weibo Post Cleaner:", error);
    setStatus("Error", "stopped");
  }
});