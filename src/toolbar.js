"use strict";
var shown = false;
// generate the global selector
const cmd = {
    wrapperElement: document.getElementById("commandbar"),
    inputElement: document.getElementById("commandbar-focus"),
    suggestionsElement: document.getElementById("command-suggestions"),
    typeSelector: "all"
};
document.onkeydown = function (e) {
    if (e.ctrlKey && e.shiftKey && e.key == "P") {
        cmd.wrapperElement.setAttribute('style', 'pointer-events: auto; display: block;');
    }
};
