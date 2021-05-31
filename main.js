const { app, BrowserWindow } = require("electron");
try {
  require("electron-reloader")(module);
} catch (_) {}

const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    resizeable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate"),
    () => {
      if (BrowserWindow.getAllwindows().length === 0) {
        createWindow();
      }
    };
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
