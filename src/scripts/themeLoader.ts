import themes from "../../extensions/themes/themes";

export const requestTheme = (themeName: string) => {
	var theme: string = "None";
	themes.forEach((theme: any) => {
		if (theme.name === themeName) {
			theme = "../extensions/themes/" + theme.file
		}
	});

	return theme;
};

export const loadTheme = (themePath: string) => {
	const t = document.getElementById("ctheme");
	t!.setAttribute("href", themePath);
};
