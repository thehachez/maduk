/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var jsdom = __webpack_require__(109);
	var fs = __webpack_require__(110);
	console.log("START TEST IN VDOM");
	var clientroot = fs.readFileSync("./services/webserver/client/statics/clientroot.js", "utf-8");
	jsdom.env({
	    url: "http://localhost/ste",
	    scripts: ["http://code.jquery.com/jquery.js"],
	    src: [clientroot],
	    done: function done(err, window) {
	        var $ = window.$;
	        console.log("HTML TITLE:" + window.document.title);
	        function spyMethod(target, method) {
	            var oldMethod = target[method];
	            target[method] = function () {
	                console.log(arguments);
	                return oldMethod.apply(this, arguments);
	            };
	        }
	        spyMethod(window.console, "log");
	        spyMethod(window.console, "error");
	        spyMethod(window.console, "warn");
	        window.addEventListener("error", function (event) {
	            console.error("script error", event.error);
	        });
	        window.location.reload();
	    }
	});

/***/ },

/***/ 109:
/***/ function(module, exports) {

	module.exports = require("jsdom");

/***/ },

/***/ 110:
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }

/******/ });
//# sourceMappingURL=test.js.map