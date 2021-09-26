var editor = document.getElementById("primary");
var linecol = document.getElementById("lineCol");

// import { getUpdated } from "../languages/lua.js";
import { textbox } from "./scripts/editController.js";
// import dynamicLoad from "./dynamicLoading.js";

// import all scripts
import "./toolbar.js";

// real code
var wait = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time * 1000);
	});
};

var primary = new textbox(editor!, "primary", "caret");

editor!.onmousedown = function (e) {
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
			const tab = tabs[i] as HTMLElement;
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
		linecol!.innerText = `Ln ${primary.getLine()}, Col ${primary.getCursorPos()}`;
	}
}

mainloop();
