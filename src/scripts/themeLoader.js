import themes from "../../extensions/themes/themes";
export const requestTheme = (themeName) => {
    var theme = "None";
    themes.forEach((theme) => {
        if (theme.name === themeName) {
            theme = "../extensions/themes/" + theme.file;
        }
    });
    return theme;
};
export const loadTheme = (themePath) => {
    const t = document.getElementById("ctheme");
    t.setAttribute("href", themePath);
};
