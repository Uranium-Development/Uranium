export class session {
	document: string = "";
	mode: string = "plainText";

	constructor(text: string, mode: string) {
		this.document = text;
		this.mode = mode;
	}
}
