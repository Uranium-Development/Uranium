export class textbox {
    constructor(element, DOMClass, caretClass) {
        this.focused = false;
        this.listening = false;
        this.lineHeight = 25;
        this.cursorPos = 0;
        this.currentLine = 0;
        this.linePos = 0;
        this.lineCounts = [0];
        this.text = '';
        this.lastText = '';
        this.lastType = 0;
        this.caretUpdates = 0;
        // primary variables
        this.container = element;
        // generator
        this.DOM = document.createElement("div");
        this.DOM.classList.add(DOMClass);
        this.DOM.setAttribute("style", "white-space: nowrap; overflow-x: auto;");
        this.caretCont = document.createElement("div");
        this.caretCont.classList.add(DOMClass);
        this.caretCont.setAttribute("style", "background-color: transparent; position: absolute;");
        this.caret = document.createElement("div");
        this.caret.classList.add(caretClass);
        this.caret.setAttribute("style", "width: 2px; height: 25px; position: absolute;");
        element.appendChild(this.DOM);
        element.appendChild(this.caretCont);
        this.caretCont.appendChild(this.caret);
    }
    checkPosX() {
        if (this.cursorPos > this.text.length) {
            this.cursorPos = this.text.length;
        }
        if (this.linePos > this.lineCounts[this.currentLine]) {
            this.linePos = this.lineCounts[this.currentLine];
        }
        if (this.cursorPos < 0) {
            this.cursorPos = 0;
        }
        if (this.linePos < 0) {
            this.linePos = 0;
        }
    }
    checkPosY() {
        if (this.currentLine > this.lineCounts.length - 1) {
            this.currentLine = this.lineCounts.length - 1;
        }
        if (this.currentLine < 0) {
            this.currentLine = 0;
        }
    }
    getLine() {
        return this.currentLine;
    }
    getTruePos() {
        return this.cursorPos;
    }
    getCursorPos() {
        return this.linePos;
    }
    focus() {
        this.focused = true;
        if (!this.listening) {
            this.listening = true;
            document.addEventListener("keydown", (e) => {
                if (this.focused) {
                    e.preventDefault();
                    var registered = false;
                    if (e.key.length == 1) {
                        // it's a character
                        this.text += e.key;
                        this.cursorPos++;
                        this.linePos++;
                        registered = true;
                    }
                    else {
                        switch (e.key) {
                            case "Backspace": {
                                this.text =
                                    this.text.slice(0, this.cursorPos - 1) +
                                        this.text.slice(this.cursorPos, this.text.length);
                                this.cursorPos--;
                                this.linePos--;
                                registered = true;
                                break;
                            }
                            case "ArrowRight": {
                                this.cursorPos++;
                                this.linePos++;
                                registered = true;
                                break;
                            }
                            case "ArrowLeft": {
                                this.cursorPos--;
                                this.linePos--;
                                registered = true;
                                break;
                            }
                            case "Enter": {
                                this.text += "\n";
                                this.currentLine++;
                                this.linePos = 0;
                                registered = true;
                                break;
                            }
                        }
                    }
                    if (registered) {
                        this.checkPosX();
                        this.checkPosY();
                        this.lastType = Math.round(new Date().getTime() / 1000);
                    }
                }
            });
        }
    }
    escape() {
        this.focused = false;
    }
    setLineHeight(height) {
        this.lineHeight = height;
        this.caret.setAttribute("style", `width: 2px; height: ${height}px; position: absolute;`);
    }
    setText(txt) {
        this.text = txt;
    }
    Update() {
        this.caretUpdates++;
        if (this.caretUpdates >= 100 && this.focused) {
            this.caretUpdates = 0;
            if (this.caret.classList.contains("caret-blink") ||
                Math.round(new Date().getTime() / 1000) - this.lastType < 1) {
                this.caret.classList.remove("caret-blink");
            }
            else {
                this.caret.classList.add("caret-blink");
            }
        }
        if (this.lastText != this.text) {
            this.lastText = this.text;
            this.DOM.innerText = this.text;
            this.caret.setAttribute("style", `width: 2px; height: ${this.lineHeight}px; position: absolute; left: ${this.linePos * 9.6}px; top: ${this.lineHeight * this.currentLine}`);
        }
    }
}
