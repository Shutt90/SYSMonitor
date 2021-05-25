/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
var {
  app,
  BrowserWindow
} = __webpack_require__(/*! electron */ "electron");

var path = __webpack_require__(/*! path */ "path");

function createWindow() {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate"), () => {
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmFzaC9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9tYWluLmpzIl0sIm5hbWVzIjpbImFwcCIsIkJyb3dzZXJXaW5kb3ciLCJyZXF1aXJlIiwicGF0aCIsImNyZWF0ZVdpbmRvdyIsIndpbiIsIndpZHRoIiwiaGVpZ2h0Iiwid2ViUHJlZmVyZW5jZXMiLCJwcmVsb2FkIiwiam9pbiIsIl9fZGlybmFtZSIsImxvYWRGaWxlIiwid2hlblJlYWR5IiwidGhlbiIsIm9uIiwiZ2V0QWxsd2luZG93cyIsImxlbmd0aCIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsInF1aXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLElBQU07QUFBRUEsS0FBRjtBQUFPQztBQUFQLElBQXlCQyxtQkFBTyxDQUFDLDBCQUFELENBQXRDOztBQUVBLElBQU1DLElBQUksR0FBR0QsbUJBQU8sQ0FBQyxrQkFBRCxDQUFwQjs7QUFFQSxTQUFTRSxZQUFULEdBQXdCO0FBQ3RCLE1BQU1DLEdBQUcsR0FBRyxJQUFJSixhQUFKLENBQWtCO0FBQzVCSyxTQUFLLEVBQUUsR0FEcUI7QUFFNUJDLFVBQU0sRUFBRSxHQUZvQjtBQUc1QkMsa0JBQWMsRUFBRTtBQUNkQyxhQUFPLEVBQUVOLElBQUksQ0FBQ08sSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFlBQXJCO0FBREs7QUFIWSxHQUFsQixDQUFaO0FBUUFOLEtBQUcsQ0FBQ08sUUFBSixDQUFhLFlBQWI7QUFDRDs7QUFFRFosR0FBRyxDQUFDYSxTQUFKLEdBQWdCQyxJQUFoQixDQUFxQixNQUFNO0FBQ3pCVixjQUFZO0FBRVpKLEtBQUcsQ0FBQ2UsRUFBSixDQUFPLFVBQVAsR0FDRSxNQUFNO0FBQ0osUUFBSWQsYUFBYSxDQUFDZSxhQUFkLEdBQThCQyxNQUE5QixLQUF5QyxDQUE3QyxFQUFnRDtBQUM5Q2Isa0JBQVk7QUFDYjtBQUNGLEdBTEg7QUFNRCxDQVREO0FBV0FKLEdBQUcsQ0FBQ2UsRUFBSixDQUFPLG1CQUFQLEVBQTRCLE1BQU07QUFDaEMsTUFBSUcsT0FBTyxDQUFDQyxRQUFSLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDbkIsT0FBRyxDQUFDb0IsSUFBSjtBQUNEO0FBQ0YsQ0FKRCxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgeyBhcHAsIEJyb3dzZXJXaW5kb3cgfSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcclxuXHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVdpbmRvdygpIHtcclxuICBjb25zdCB3aW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICB3aWR0aDogODAwLFxyXG4gICAgaGVpZ2h0OiA2MDAsXHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInByZWxvYWQuanNcIiksXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICB3aW4ubG9hZEZpbGUoXCJpbmRleC5odG1sXCIpO1xyXG59XHJcblxyXG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgY3JlYXRlV2luZG93KCk7XHJcblxyXG4gIGFwcC5vbihcImFjdGl2YXRlXCIpLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICBpZiAoQnJvd3NlcldpbmRvdy5nZXRBbGx3aW5kb3dzKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY3JlYXRlV2luZG93KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLm9uKFwid2luZG93LWFsbC1jbG9zZWRcIiwgKCkgPT4ge1xyXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcImRhcndpblwiKSB7XHJcbiAgICBhcHAucXVpdCgpO1xyXG4gIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=