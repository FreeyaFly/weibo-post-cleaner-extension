(() => {
    window.__WB_DEL_STOP = false;
    const CFG = {
        afterOpenMenuDelay: 150,
        afterClickActionDelay: 1000,
        loopDelayMin: 1200,
        loopDelayMax: 2500,
        scrollStep: 900,
    };

    const sleep = async(ms) => {
        const step = 100;
        let passed = 0;
        while (passed < ms) {
            if (window.__WB_DEL_STOP)
                return;
            await new Promise((r) => setTimeout(r, step));
            passed += step;
        }
    };

    const randDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const isVisible = (el) => !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));

    function pickTopInViewport(els) {
        const cand = els
            .filter(isVisible)
            .map((el) => ({
                    el,
                    rect: el.getBoundingClientRect()
                }))
            .filter(({
                    rect
                }) => rect.bottom > 0 && rect.top < window.innerHeight)
            .sort((a, b) => a.rect.top - b.rect.top);
        return cand[0]?.el || null;
    }

    function findMenuBtn() {
        const a11y = Array.from(document.querySelectorAll('[aria-label*="更多"], [title*="更多"]'));
        let btn = pickTopInViewport(a11y);
        if (btn)
            return btn;

        const downs = Array.from(document.querySelectorAll(".woo-font--angleDown"));
        btn = pickTopInViewport(downs);
        return btn;
    }

    function clickConfirm() {
        const btns = Array.from(document.getElementsByClassName("woo-button-content")).filter(isVisible);
        const confirm = btns.find((b) => /确定|确认|删除/.test((b.textContent || "").trim()));
        if (confirm) {
            confirm.click();
            return true;
        }
        return false;
    }

    async function deleteOnce() {
        if (window.__WB_DEL_STOP) {
            return {
                ok: false,
                msg: "已收到停止信号"
            };
        }

        const menuBtn = findMenuBtn();
        if (!menuBtn) {
            window.scrollBy(0, CFG.scrollStep);
            return {
                ok: false,
                msg: "没找到视口内“更多/下拉”按钮，已滚动加载"
            };
        }

        menuBtn.click();
        await sleep(CFG.afterOpenMenuDelay);

        if (window.__WB_DEL_STOP) {
            return {
                ok: false,
                msg: "已停止，未继续点击菜单项"
            };
        }

        const actionItems = Array.from(
                document.querySelectorAll(".woo-box-flex.woo-box-alignCenter.woo-pop-item-main, [role='menuitem']")).filter(isVisible);

        const targets = ["删除", "取消快转", "删除快转", "删除微博", "删除此微博"];
        const targetBtn = actionItems.find((el) => targets.includes((el.textContent || "").trim()));

        if (!targetBtn) {
            document.body.click();
            return {
                ok: false,
                msg: "菜单已打开，但没看到“删除/取消快转”"
            };
        }

        if (window.__WB_DEL_STOP) {
            document.body.click();
            return {
                ok: false,
                msg: "已停止，未点击删除项"
            };
        }

        targetBtn.click();
        await sleep(CFG.afterClickActionDelay);

        if (window.__WB_DEL_STOP) {
            return {
                ok: false,
                msg: "已停止，未点击确认按钮"
            };
        }

        const confirmed = clickConfirm();
        return {
            ok: true,
            msg: confirmed ? "已点击确认" : "已点操作项，但未找到确认按钮"
        };
    }

    async function mainLoop() {
        console.log("%c微博批量删除脚本已启动", "color:#fff;background:#ff8200;padding:2px 6px;border-radius:4px;");
        console.log("停止：点击插件 Stop，或执行 window.__WB_DEL_STOP = true");

        let count = 0;

        while (!window.__WB_DEL_STOP) {
            try {
                const r = await deleteOnce();

                if (window.__WB_DEL_STOP)
                    break;

                if (r.ok)
                    count += 1;
                console.log(`[${new Date().toLocaleTimeString()}] #${count} ${r.msg}`);
            } catch (e) {
                console.warn("本轮异常：", e);
            }

            if (window.__WB_DEL_STOP)
                break;

            await sleep(randDelay(CFG.loopDelayMin, CFG.loopDelayMax));
        }

        console.log("%c已停止。", "color:#333;background:#eee;padding:2px 6px;border-radius:4px;");
    }

    mainLoop();
})();
