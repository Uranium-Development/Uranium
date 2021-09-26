var shown = false;

interface commandBar {
	wrapperElement: HTMLElement | null;
	inputElement: HTMLElement | null;
	suggestionsElement: HTMLElement | null;

	typeSelector: string;
}

// generate the global selector
const cmd: commandBar = {
	wrapperElement: document.getElementById("commandbar"),
	inputElement: document.getElementById("commandbar-focus"),
	suggestionsElement: document.getElementById("command-suggestions"),

	typeSelector: "all"
}

document.onkeydown = function(e) {
	if (e.ctrlKey && e.shiftKey && e.key == "P") {
		cmd.wrapperElement!.setAttribute('style', 'pointer-events: auto; display: block;');
	}
}
