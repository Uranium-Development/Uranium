var editor = document.getElementById("primary");
var linecol = document.getElementById("lineCol");

import { getUpdated } from "../languages/lua.js";
import { textbox } from "./scripts/editController.js";

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
async function mainloop() {
	var isFloat = false;
	var downTime = 0;

	var trueTime = 0;
	while (true) {
		await wait(0.005);
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
		linecol.innerText = `Ln ${primary.getLine()}, Col ${primary.getCursorPos()}`;
	}
}

mainloop();
