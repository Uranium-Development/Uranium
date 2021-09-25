var editor = document.getElementById("primary");

import { getUpdated } from "..\\languages\\lua.js";
import { textbox } from ".\\scripts\\editController.js";

var wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
};

var primary = new textbox(editor, "primary", "caret");

editor.onmousedown = function () {
    primary.focus();
};

// mainloops
async function mainloop() {
    var isFloat = false;
    var downTime = 0;

    var trueTime = 0;
    var caretOn = false;
    while (true) {
        await wait(0.001);
        trueTime++;
        var tabs = document.getElementsByClassName("tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].onmousedown = function () {
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
            window.uranium.updateWindowPositionToMouse();
        }

        primary.Update();
    }
}

mainloop();
