export class textbox {
    constructor(element, DOMClass, caretClass) {
        // primary variables
        this.focused = false;
        this.container = element;
        this.lineHeight = 25;

        this.cursorPos = 0;

        this.text = "";

        // generator
        this.DOM = document.createElement("div");
        this.DOM.classList.add(DOMClass);

        this.caretCont = document.createElement("div");
        this.caretCont.classList.add(DOMClass);
        this.caretCont.style = "background-color: transparent;";

        this.caret = document.createElement("div");
        this.caret.classList.add(caretClass);
        this.caret.style = "width: 2px; height: 25px;";

        this.input = document.createElement("input");
        this.input.style = "width: 1px; height: 25px; background-color: transparent;";

        element.appendChild(this.DOM);
        element.appendChild(this.caretCont);
        this.caretCont.appendChild(this.caret);
        this.caretCont.appendChild(this.input);

        this.input.addEventListener("keydown", function (e) {
            e.preventDefault();
            if (e.key.length == 1) {
                // it's a character
                this.text += e.key;
                this.cursorPos++;
            } else if (e.key == "Backspace") {
                this.text = this.text.substr(0, this.cursorPos - 1) + this.text.substr(this.cursorPos, this.text.length);
            } else if (e.key == "ArrowRight") {
                this.cursorPos++;
            } else if (e.key == "ArrowLeft") {
                this.cursorPos--;
            }
        });

        // extras; private
        this.caretUpdates = 0;
    }

    focus() {
        this.focused = true;
        this.input.focus();
    }

    escape() {
        this.focused = false;
        this.input.blur();
    }

    setLineHeight(height) {
        this.lineHeight = height;
        this.caret.style = `width: 2px; height: ${height}px;`;
    }

    Update() {
        this.caretUpdates++;
        if (this.caretUpdates == 100) {
            if (this.caret.classList.contains("caret-blink") || !this.focused) {
                this.caret.classList.remove("caret-blink");
            } else {
                this.caret.classList.add("caret-blink");
            }
        }
    }
}
