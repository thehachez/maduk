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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _uniqueSelector = __webpack_require__(1);
	
	console.log(_uniqueSelector.unique);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unique = unique;
	
	var _getID = __webpack_require__(2);
	
	var _getClasses = __webpack_require__(3);
	
	var _getAttributes = __webpack_require__(4);
	
	var _getNthChild = __webpack_require__(5);
	
	var _getTag = __webpack_require__(7);
	
	var _isUnique = __webpack_require__(8);
	
	var _getParents = __webpack_require__(9);
	
	/**
	 * Returns all the selectors of the elmenet
	 * @param  { Object } element
	 * @return { Object }
	 */
	function getAllSelectors(el, selectors, attributesToIgnore) {
	  var funcs = {
	    'Tag': _getTag.getTag,
	    'NthChild': _getNthChild.getNthChild,
	    'Attributes': function Attributes(elem) {
	      return (0, _getAttributes.getAttributes)(elem, attributesToIgnore);
	    },
	    'Class': _getClasses.getClassSelectors,
	    'ID': _getID.getID
	  };
	
	  return selectors.reduce(function (res, next) {
	    res[next] = funcs[next](el);
	    return res;
	  }, {});
	}
	
	/**
	 * Tests uniqueNess of the element inside its parent
	 * @param  { Object } element
	 * @param { String } Selectors
	 * @return { Boolean }
	 */
	function testUniqueness(element, selector) {
	  var parentNode = element.parentNode;
	
	  var elements = parentNode.querySelectorAll(selector);
	  return elements.length === 1 && elements[0] === element;
	}
	
	/**
	 * Checks all the possible selectors of an element to find one unique and return it
	 * @param  { Object } element
	 * @param  { Array } items
	 * @param  { String } tag
	 * @return { String }
	 */
	function getUniqueCombination(element, items, tag) {
	  var combinations = getCombinations(items);
	  var uniqCombinations = combinations.filter(testUniqueness.bind(this, element));
	  if (uniqCombinations.length) return uniqCombinations[0];
	
	  if (Boolean(tag)) {
	    var _combinations = items.map(function (item) {
	      return tag + item;
	    });
	    var _uniqCombinations = _combinations.filter(testUniqueness.bind(this, element));
	    if (_uniqCombinations.length) return _uniqCombinations[0];
	  }
	
	  return null;
	}
	
	/**
	 * Returns a uniqueSelector based on the passed options
	 * @param  { DOM } element
	 * @param  { Array } options
	 * @return { String }
	 */
	function getUniqueSelector(element, selectorTypes, attributesToIgnore) {
	  var foundSelector = void 0;
	
	  var elementSelectors = getAllSelectors(element, selectorTypes, attributesToIgnore);
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = selectorTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var selectorType = _step.value;
	      var ID = elementSelectors.ID;
	      var Tag = elementSelectors.Tag;
	      var Classes = elementSelectors.Class;
	      var Attributes = elementSelectors.Attributes;
	      var NthChild = elementSelectors.NthChild;
	
	      switch (selectorType) {
	        case 'ID':
	          if (Boolean(ID) && testUniqueness(element, ID)) {
	            return ID;
	          }
	          break;
	
	        case 'Tag':
	          if (Boolean(Tag) && testUniqueness(element, Tag)) {
	            return Tag;
	          }
	          break;
	
	        case 'Class':
	          if (Boolean(Classes) && Classes.length) {
	            foundSelector = getUniqueCombination(element, Classes, Tag);
	            if (foundSelector) {
	              return foundSelector;
	            }
	          }
	          break;
	
	        case 'Attributes':
	          if (Boolean(Attributes) && Attributes.length) {
	            foundSelector = getUniqueCombination(element, Attributes, Tag);
	            if (foundSelector) {
	              return foundSelector;
	            }
	          }
	          break;
	
	        case 'NthChild':
	          if (Boolean(NthChild)) {
	            return NthChild;
	          }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return '*';
	}
	
	/**
	 * Returns all the possible selector compinations
	 */
	function getCombinations(items) {
	  items = items ? items : [];
	  var result = [[]];
	  var i = void 0,
	      j = void 0,
	      k = void 0,
	      l = void 0,
	      ref = void 0,
	      ref1 = void 0;
	
	  for (i = k = 0, ref = items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
	    for (j = l = 0, ref1 = result.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
	      result.push(result[j].concat(items[i]));
	    }
	  }
	
	  result.shift();
	  result = result.sort(function (a, b) {
	    return a.length - b.length;
	  });
	  result = result.map(function (item) {
	    return item.join('');
	  });
	
	  return result;
	}
	
	/**
	 * Generate unique CSS selector for given DOM element
	 *
	 * @param {Element} el
	 * @return {String}
	 * @api private
	 */
	
	function unique(el) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var _options$selectorType = options.selectorTypes;
	  var selectorTypes = _options$selectorType === undefined ? ['ID', 'Class', 'Tag', 'NthChild'] : _options$selectorType;
	  var _options$attributesTo = options.attributesToIgnore;
	  var attributesToIgnore = _options$attributesTo === undefined ? ['id', 'class', 'length'] : _options$attributesTo;
	
	  var allSelectors = [];
	  var parents = (0, _getParents.getParents)(el);
	
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = parents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var elem = _step2.value;
	
	      var selector = getUniqueSelector(elem, selectorTypes, attributesToIgnore);
	      if (Boolean(selector)) {
	        allSelectors.push(selector);
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  var selectors = [];
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = allSelectors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var it = _step3.value;
	
	      selectors.unshift(it);
	      var _selector = selectors.join(' > ');
	      if ((0, _isUnique.isUnique)(el, _selector)) {
	        return _selector;
	      }
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }
	
	  return null;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getID = getID;
	/**
	 * Returns the Tag of the element
	 * @param  { Object } element
	 * @return { String }
	 */
	function getID(el) {
	  return '#' + el.getAttribute('id');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getClasses = getClasses;
	exports.getClassSelectors = getClassSelectors;
	/**
	 * Get class names for an element
	 *
	 * @pararm { Element } el
	 * @return { Array }
	 */
	function getClasses(el) {
	  var classNames = void 0;
	
	  try {
	    classNames = el.classList.toString().split(' ');
	  } catch (e) {
	    if (!el.hasAttribute('class')) {
	      return [];
	    }
	
	    var className = el.getAttribute('class');
	
	    // remove duplicate and leading/trailing whitespaces
	    className = className.trim().replace(/\s+/g, ' ');
	
	    // split into separate classnames
	    classNames = className.split(' ');
	  }
	
	  return classNames;
	}
	
	/**
	 * Returns the Class selectors of the element
	 * @param  { Object } element
	 * @return { Array }
	 */
	function getClassSelectors(el) {
	  var classList = getClasses(el).filter(Boolean);
	  return classList.map(function (cl) {
	    return '.' + cl;
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAttributes = getAttributes;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Returns the Attribute selectors of the element
	 * @param  { DOM Element } element
	 * @param  { Array } array of attributes to ignore
	 * @return { Array }
	 */
	function getAttributes(el) {
	  var attributesToIgnore = arguments.length <= 1 || arguments[1] === undefined ? ['id', 'class', 'length'] : arguments[1];
	  var attributes = el.attributes;
	
	  var attrs = [].concat(_toConsumableArray(attributes));
	
	  return attrs.reduce(function (sum, next) {
	    if (!(attributesToIgnore.indexOf(next.nodeName) > -1)) {
	      sum.push('[' + next.nodeName + '="' + next.value + '"]');
	    }
	    return sum;
	  }, []);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNthChild = getNthChild;
	
	var _isElement = __webpack_require__(6);
	
	/**
	 * Returns the selectors based on the position of the element relative to its siblings
	 * @param  { Object } element
	 * @return { Array }
	 */
	function getNthChild(element) {
	  var counter = 0;
	  var k = void 0;
	  var sibling = void 0;
	  var parentNode = element.parentNode;
	
	
	  if (Boolean(parentNode)) {
	    var childNodes = parentNode.childNodes;
	
	    var len = childNodes.length;
	    for (k = 0; k < len; k++) {
	      sibling = childNodes[k];
	      if ((0, _isElement.isElement)(sibling)) {
	        counter++;
	        if (sibling === element) {
	          return ':nth-child(' + counter + ')';
	        }
	      }
	    }
	  }
	  return null;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.isElement = isElement;
	/**
	 * Determines if the passed el is a DOM element
	 */
	function isElement(el) {
	  var isElem = void 0;
	
	  if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object') {
	    isElem = el instanceof HTMLElement;
	  } else {
	    isElem = !!el && (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string';
	  }
	  return isElem;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTag = getTag;
	/**
	 * Returns the Tag of the element
	 * @param  { Object } element
	 * @return { String }
	 */
	function getTag(el) {
	  return el.tagName.toLowerCase();
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isUnique = isUnique;
	/**
	 * Checks if the selector is unique
	 * @param  { Object } element
	 * @param  { String } selector
	 * @return { Array }
	 */
	function isUnique(el, selector) {
	  if (!Boolean(selector)) return false;
	  var elems = el.ownerDocument.querySelectorAll(selector);
	  return elems.length === 1 && elems[0] === el;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getParents = getParents;
	
	var _isElement = __webpack_require__(6);
	
	/**
	 * Returns all the element and all of its parents
	 * @param { DOM Element }
	 * @return { Array of DOM elements }
	 */
	function getParents(el) {
	  var parents = [];
	  var currentElement = el;
	  while ((0, _isElement.isElement)(currentElement)) {
	    parents.push(currentElement);
	    currentElement = currentElement.parentNode;
	  }
	
	  return parents;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=node.bundle.js.map