const os = require("os-utils");
const si = require("systeminformation");
const freeMem = os.freemem();
const totalMem = os.totalmem();
const freeMemMB = freeMem;
const totalMemMB = totalMem;

try {
  require("electron-reloader")(module);
} catch (_) {}

os.cpuUsage(function (v) {
  document.querySelector(".got-CPU").innerHTML = "CPU Usage (%): " + v;
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const messageMemory = `Your current free memory is: ${freeMemMB.toFixed(
    2
  )} MB / ${totalMemMB.toFixed(2)} MB`;
  document.querySelector(".got-memory").innerHTML = messageMemory;
  document.querySelector(
    ".got-cpu-count"
  ).innerHTML = `Your CPU has a thread count of: ${os.cpuCount()}`;
});

// 1. Reload Functionality On Button and Key Press
// document.querySelector(".thishere").addEventListener("click", createWindow);

// function createWindow() {
//   globalShortcut.register("f5", function () {
//     console.log("f5 is pressed");
//     mainWindow.reload();
//   });
//   globalShortcut.register("CommandOrControl+R", function () {
//     console.log("CommandOrControl+R is pressed");
//     mainWindow.reload();
//   });
// }

// 2. Implement if currentPage = Navbar current, background = black
