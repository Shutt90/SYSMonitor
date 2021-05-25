const os = require("os");
const freeMem = os.freemem();
const totalMem = os.totalmem();
const freeMemMB = freeMem * 0.00000095367432;
const totalMemMB = totalMem * 0.00000095367432;
const cpuType = os.cpus();

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const message = `Your current free memory is: ${freeMemMB.toFixed(
    2
  )} MB / ${totalMemMB.toFixed(2)} MB`;
  document.querySelector(".got-memory").innerHTML = message;
  console.log(...cpuType);
});
