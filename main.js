const { app, BrowserWindow } = require("electron");

const WIN_WIDTH = 1010;
const WIN_HEIGHT = 550;

const createWindow = () => {
    const win = new BrowserWindow({
        width: WIN_WIDTH,
        height: WIN_HEIGHT,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("./src/index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit(); 
});



