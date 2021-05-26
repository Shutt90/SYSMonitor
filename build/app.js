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
    frame: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmFzaC9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9tYWluLmpzIl0sIm5hbWVzIjpbImFwcCIsIkJyb3dzZXJXaW5kb3ciLCJyZXF1aXJlIiwicGF0aCIsImNyZWF0ZVdpbmRvdyIsIndpbiIsIndpZHRoIiwiaGVpZ2h0IiwiZnJhbWUiLCJ3ZWJQcmVmZXJlbmNlcyIsInByZWxvYWQiLCJqb2luIiwiX19kaXJuYW1lIiwibG9hZEZpbGUiLCJ3aGVuUmVhZHkiLCJ0aGVuIiwib24iLCJnZXRBbGx3aW5kb3dzIiwibGVuZ3RoIiwicHJvY2VzcyIsInBsYXRmb3JtIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsSUFBTTtBQUFFQSxLQUFGO0FBQU9DO0FBQVAsSUFBeUJDLG1CQUFPLENBQUMsMEJBQUQsQ0FBdEM7O0FBRUEsSUFBTUMsSUFBSSxHQUFHRCxtQkFBTyxDQUFDLGtCQUFELENBQXBCOztBQUVBLFNBQVNFLFlBQVQsR0FBd0I7QUFDdEIsTUFBTUMsR0FBRyxHQUFHLElBQUlKLGFBQUosQ0FBa0I7QUFDNUJLLFNBQUssRUFBRSxHQURxQjtBQUU1QkMsVUFBTSxFQUFFLEdBRm9CO0FBRzVCQyxTQUFLLEVBQUUsS0FIcUI7QUFJNUJDLGtCQUFjLEVBQUU7QUFDZEMsYUFBTyxFQUFFUCxJQUFJLENBQUNRLElBQUwsQ0FBVUMsU0FBVixFQUFxQixZQUFyQjtBQURLO0FBSlksR0FBbEIsQ0FBWjtBQVNBUCxLQUFHLENBQUNRLFFBQUosQ0FBYSxZQUFiO0FBQ0Q7O0FBRURiLEdBQUcsQ0FBQ2MsU0FBSixHQUFnQkMsSUFBaEIsQ0FBcUIsTUFBTTtBQUN6QlgsY0FBWTtBQUVaSixLQUFHLENBQUNnQixFQUFKLENBQU8sVUFBUCxHQUNFLE1BQU07QUFDSixRQUFJZixhQUFhLENBQUNnQixhQUFkLEdBQThCQyxNQUE5QixLQUF5QyxDQUE3QyxFQUFnRDtBQUM5Q2Qsa0JBQVk7QUFDYjtBQUNGLEdBTEg7QUFNRCxDQVREO0FBV0FKLEdBQUcsQ0FBQ2dCLEVBQUosQ0FBTyxtQkFBUCxFQUE0QixNQUFNO0FBQ2hDLE1BQUlHLE9BQU8sQ0FBQ0MsUUFBUixLQUFxQixRQUF6QixFQUFtQztBQUNqQ3BCLE9BQUcsQ0FBQ3FCLElBQUo7QUFDRDtBQUNGLENBSkQsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTs7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IHsgYXBwLCBCcm93c2VyV2luZG93IH0gPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XHJcblxyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVXaW5kb3coKSB7XHJcbiAgY29uc3Qgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xyXG4gICAgd2lkdGg6IDgwMCxcclxuICAgIGhlaWdodDogNjAwLFxyXG4gICAgZnJhbWU6IGZhbHNlLFxyXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcclxuICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCJwcmVsb2FkLmpzXCIpLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgd2luLmxvYWRGaWxlKFwiaW5kZXguaHRtbFwiKTtcclxufVxyXG5cclxuYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gIGNyZWF0ZVdpbmRvdygpO1xyXG5cclxuICBhcHAub24oXCJhY3RpdmF0ZVwiKSxcclxuICAgICgpID0+IHtcclxuICAgICAgaWYgKEJyb3dzZXJXaW5kb3cuZ2V0QWxsd2luZG93cygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNyZWF0ZVdpbmRvdygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbmFwcC5vbihcIndpbmRvdy1hbGwtY2xvc2VkXCIsICgpID0+IHtcclxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJkYXJ3aW5cIikge1xyXG4gICAgYXBwLnF1aXQoKTtcclxuICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9