const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
    app.quit();
}

var mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "renderer.js"),
        },
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.setMenuBarVisibility(false);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("uranium:close", () => {
    app.quit();
});

ipcMain.on("uranium:updateWindowPositionToMouse", () => {
    let mousePos = screen.getCursorScreenPoint();
    mainWindow.setPosition(mousePos.x - mainWindow.getSize()[0] / 2, mousePos.y - 10);
});
