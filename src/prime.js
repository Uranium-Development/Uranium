var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var editor = document.getElementById("primary");
var linecol = document.getElementById("lineCol");
// import { getUpdated } from "../languages/lua.js";
import { textbox } from "./scripts/editController.js";
// import dynamicLoad from "./dynamicLoading.js";
// import all scripts
import "./toolbar.js";
// real code
var wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
};
var primary = new textbox(editor, "primary", "caret");
editor.onmousedown = function (e) {
    e.stopPropagation();
    primary.focus();
};
window.onmousedown = function () {
    primary.escape();
};
// mainloops
function mainloop() {
    return __awaiter(this, void 0, void 0, function* () {
        var isFloat = false;
        var downTime = 0;
        var trueTime = 0;
        while (true) {
            yield wait(0.005);
            trueTime++;
            var tabs = document.getElementsByClassName("tab");
            for (var i = 0; i < tabs.length; i++) {
                const tab = tabs[i];
                tab.onmousedown = function () {
                    isFloat = true;
                };
            }
            if (isFloat) {
                downTime += 1;
            }
            document.onmouseup = function () {
                isFloat = false;
                downTime = 0;
            };
            if (isFloat && downTime > 50) {
                // @ts-ignore
                window.uranium.updateWindowPositionToMouse();
            }
            primary.Update();
            linecol.innerText = `Ln ${primary.getLine()}, Col ${primary.getCursorPos()}`;
        }
    });
}
mainloop();
