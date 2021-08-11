/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/frontend/front-index.js":
/*!****************************************!*\
  !*** ./src/js/frontend/front-index.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_flyout_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/flyout-nav */ \"./src/js/frontend/header/flyout-nav.js\");\n/* harmony import */ var _header_menu_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/menu-toggle */ \"./src/js/frontend/header/menu-toggle.js\");\n\n\n\nfunction domReady(fn) {\n  // If we're early to the party\n  document.addEventListener(\"DOMContentLoaded\", fn); // If late; I mean on time.\n\n  if (document.readyState === \"interactive\" || document.readyState === \"complete\") {\n    fn();\n  }\n}\n\ndomReady(() => {\n  (0,_header_flyout_nav__WEBPACK_IMPORTED_MODULE_0__.default)();\n  (0,_header_menu_toggle__WEBPACK_IMPORTED_MODULE_1__.default)();\n});\n\n//# sourceURL=webpack://sterling/./src/js/frontend/front-index.js?");

/***/ }),

/***/ "./src/js/frontend/header/flyout-nav.js":
/*!**********************************************!*\
  !*** ./src/js/frontend/header/flyout-nav.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ bindFlyoutMenuListeners; }\n/* harmony export */ });\n/* harmony import */ var _utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/animate-toggle */ \"./src/js/frontend/utility/animate-toggle.js\");\n\nfunction bindFlyoutMenuListeners() {\n  const flyoutToggles = document.querySelectorAll(\".toggle-flyout\");\n  const menuItemsHaveChildren = document.querySelectorAll(\".menu-item-has-children\");\n  flyoutToggles.forEach(flyoutToggle => {\n    flyoutToggle.addEventListener('click', FlyoutMenu.handleClick);\n  });\n  menuItemsHaveChildren.forEach(menuItem => {\n    menuItem.addEventListener('focusout', FlyoutMenu.handleFocusOut);\n\n    if (window.innerWidth > 980) {\n      menuItem.addEventListener('mouseenter', FlyoutMenu.isEdge);\n    }\n  });\n}\nconst FlyoutMenu = {\n  handleFocusOut(e) {\n    // Don't close if focus is moving within the same menu\n    if (e.relatedTarget && e.relatedTarget.closest('.flyout-menu')) {\n      return;\n    } // Get all open menus so that submenus are also closed on menu close.\n\n\n    const openMenu = document.querySelectorAll('.menu-item-has-children.submenu-open');\n    openMenu.forEach(openMenu => {\n      // Do not close menu related to click to prevent double firing.\n      if (e.relatedTarget && openMenu === e.relatedTarget.closest('.submenu-open')) {\n        return;\n      }\n\n      FlyoutMenu.closeSubMenu(openMenu);\n    });\n  },\n\n  handleClick(e) {\n    const menuItem = e.target.classList.contains('menu-item-has-children') ? e.target : e.target.closest('.menu-item-has-children');\n\n    if (menuItem.classList.contains('submenu-open')) {\n      FlyoutMenu.closeSubMenu(menuItem);\n    } else {\n      FlyoutMenu.openSubMenu(menuItem);\n    }\n\n    e.preventDefault();\n  },\n\n  isEdge() {\n    let dropdown = this.querySelector('.flyout-menu');\n    let dropdownRect = dropdown.getBoundingClientRect();\n    let offsetLeft = dropdownRect.left;\n    let width = dropdownRect.width;\n    let docWidth = window.innerWidth;\n    let submenuVisible = offsetLeft + width <= docWidth;\n\n    if (!submenuVisible) {\n      dropdown.classList.add('edge');\n    }\n  },\n\n  closeSubMenu(menuItem) {\n    if (window.innerWidth < 980) {\n      (0,_utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__.collapseSection)(menuItem.querySelector('.flyout-menu'));\n    }\n\n    menuItem.classList.remove('submenu-open'); // Aria labels on toggle and toggle-flyout\n\n    this.getAriaElements(menuItem.children);\n  },\n\n  openSubMenu(menuItem) {\n    if (window.innerWidth < 980) {\n      (0,_utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__.expandSection)(menuItem.querySelector('.flyout-menu'));\n    }\n\n    menuItem.classList.add('submenu-open');\n    this.getAriaElements(menuItem.children);\n  },\n\n  getAriaElements(liElements) {\n    const ariaElements = [...liElements].filter(child => child.hasAttribute('aria-expanded'));\n    this.setAriaExpanded(ariaElements);\n  },\n\n  setAriaExpanded(ariaElements) {\n    ariaElements.forEach(ariaElement => {\n      ariaElement.setAttribute('aria-expanded', ariaElement.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');\n    });\n  }\n\n};\n\n//# sourceURL=webpack://sterling/./src/js/frontend/header/flyout-nav.js?");

/***/ }),

/***/ "./src/js/frontend/header/menu-toggle.js":
/*!***********************************************!*\
  !*** ./src/js/frontend/header/menu-toggle.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ menuToggle; }\n/* harmony export */ });\n/* harmony import */ var _utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/animate-toggle */ \"./src/js/frontend/utility/animate-toggle.js\");\n\nfunction menuToggle() {\n  const toggle = document.getElementById(\"primary-mobile-menu\");\n  const menu = document.getElementById(\"site-navigation\");\n  toggle.addEventListener('click', toggleMobileMenu);\n\n  function toggleMobileMenu() {\n    if (toggle.classList.contains('menu-open')) {\n      (0,_utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__.collapseSection)(menu);\n      toggle.classList.remove('menu-open');\n    } else {\n      (0,_utility_animate_toggle__WEBPACK_IMPORTED_MODULE_0__.expandSection)(menu);\n      toggle.classList.add('menu-open');\n    }\n  }\n}\n\n//# sourceURL=webpack://sterling/./src/js/frontend/header/menu-toggle.js?");

/***/ }),

/***/ "./src/js/frontend/utility/animate-toggle.js":
/*!***************************************************!*\
  !*** ./src/js/frontend/utility/animate-toggle.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"collapseSection\": function() { return /* binding */ collapseSection; },\n/* harmony export */   \"expandSection\": function() { return /* binding */ expandSection; }\n/* harmony export */ });\nfunction collapseSection(element) {\n  // get the height of the element's inner content, regardless of its actual size\n  var sectionHeight = element.scrollHeight; // temporarily disable all css transitions\n\n  var elementTransition = element.style.transition;\n  element.style.transition = ''; // on the next frame (as soon as the previous style change has taken effect),\n  // explicitly set the element's height to its current pixel height, so we \n  // aren't transitioning out of 'auto'\n\n  requestAnimationFrame(function () {\n    element.style.height = sectionHeight + 'px';\n    element.style.transition = elementTransition; // on the next frame (as soon as the previous style change has taken effect),\n    // have the element transition to height: 0\n\n    requestAnimationFrame(function () {\n      element.style.height = 0 + 'px';\n    }); // Hide element when animation ends\n\n    element.addEventListener('transitionend', function (e) {\n      element.style.display = 'none';\n    }, {\n      once: true\n    });\n  });\n}\nfunction expandSection(element) {\n  element.style.display = 'block'; // get the height of the element's inner content, regardless of its actual size\n\n  var sectionHeight = element.scrollHeight; // have the element transition to the height of its inner content\n\n  element.style.height = sectionHeight + 'px'; // when the next css transition finishes (which should be the one we just triggered)\n\n  element.addEventListener('transitionend', function (e) {\n    // remove \"height\" from the element's inline styles, so it can return to its initial value\n    element.style.height = 'auto';\n  }, {\n    once: true\n  });\n}\n\n//# sourceURL=webpack://sterling/./src/js/frontend/utility/animate-toggle.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/frontend/front-index.js");
/******/ 	
/******/ })()
;