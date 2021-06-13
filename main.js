const {
  app,
  BrowserWindow,
  getCurrentWindow,
  globalShortcut,
} = require("electron");

try {
  require("electron-reloader")(module);
} catch (_) {}

const path = require("path");

var reload = () => {
  getCurrentWindow().reload();
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    resizeable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      fullscreen: false,
      devTools: true,
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
