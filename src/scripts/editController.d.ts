export declare class textbox {
    focused: boolean;
    listening: boolean;
    container: HTMLElement;
    lineHeight: number;
    cursorPos: number;
    currentLine: number;
    linePos: number;
    lineCounts: number[];
    text: string;
    lastText: string;
    lastType: number;
    DOM: HTMLElement;
    caretCont: HTMLElement;
    caret: HTMLElement;
    caretUpdates: number;
    constructor(element: HTMLElement, DOMClass: string, caretClass: string);
    checkPosX(): void;
    checkPosY(): void;
    getLine(): number;
    getTruePos(): number;
    getCursorPos(): number;
    focus(): void;
    escape(): void;
    setLineHeight(height: number): void;
    setText(txt: string): void;
    Update(): void;
}
//# sourceMappingURL=editController.d.ts.map