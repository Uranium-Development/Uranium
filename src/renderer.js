"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("uranium", {
    close: () => ipcRenderer.send("uranium:close"),
    updateWindowPositionToMouse: () => ipcRenderer.send("uranium:updateWindowPositionToMouse"),
});
