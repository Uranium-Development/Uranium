import themes from "../../extensions/themes/themes.js";

export const requestTheme = (themeName) => {
	themes.forEach((theme) => {
		if (theme.name === themeName) {
			return "../extensions/themes/" + theme.file;
		}
	});

	return ["../extensions/themes/" + theme, "No theme found"];
};
