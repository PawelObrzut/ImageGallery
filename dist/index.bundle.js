"use strict";
(self["webpackChunkts_webpack_imagegallery"] = self["webpackChunkts_webpack_imagegallery"] || []).push([["index"],{

/***/ "./node_modules/content-type/index.js":
/*!********************************************!*\
  !*** ./node_modules/content-type/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp to match type in RFC 7231 sec 3.1.1.1
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!TOKEN_REGEXP.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  var header = typeof string === 'object'
    ? getcontenttype(string)
    : string

  if (typeof header !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = header.indexOf(';')
  var type = index !== -1
    ? header.substr(0, index).trim()
    : header.trim()

  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid media type')
  }

  var obj = new ContentType(type.toLowerCase())

  // parse parameters
  if (index !== -1) {
    var key
    var match
    var value

    PARAM_REGEXP.lastIndex = index

    while ((match = PARAM_REGEXP.exec(header))) {
      if (match.index !== index) {
        throw new TypeError('invalid parameter format')
      }

      index += match[0].length
      key = match[1].toLowerCase()
      value = match[2]

      if (value[0] === '"') {
        // remove quotes and escapes
        value = value
          .substr(1, value.length - 2)
          .replace(QESC_REGEXP, '$1')
      }

      obj.parameters[key] = value
    }

    if (index !== header.length) {
      throw new TypeError('invalid parameter format')
    }
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype (obj) {
  var header

  if (typeof obj.getHeader === 'function') {
    // res-like
    header = obj.getHeader('content-type')
  } else if (typeof obj.headers === 'object') {
    // req-like
    header = obj.headers && obj.headers['content-type']
  }

  if (typeof header !== 'string') {
    throw new TypeError('content-type header is missing from object')
  }

  return header
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring (val) {
  var str = String(val)

  // no need to quote tokens
  if (TOKEN_REGEXP.test(str)) {
    return str
  }

  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType (type) {
  this.parameters = Object.create(null)
  this.type = type
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Montserrat:500);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-family: \"Montserrat\", Arial, sans-serif;\n  color: #d1d1d1;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  text-align: center;\n}\n\n.fixed {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.header {\n  background-color: #111e1f;\n  color: #d1d1d1;\n  margin: auto;\n  text-align: center;\n  font-size: 3rem;\n  padding: 1.5rem;\n  z-index: 5;\n  border-bottom: solid 1rem black;\n}\n.search {\n  background-color: #111f18;\n  padding: 1rem;\n  text-align: center;\n}\n\n.input-form__querry {\n  width: 15rem;\n  height: 3rem;\n  border-radius: 3rem;\n  padding-left: 1rem;\n  font-size: 1.5rem;\n  font-family: inherit;\n  border-color: #d1d1d1;\n}\n\n.input-form__btn {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 50%;\n  background-color: #003606;\n  color: #d1d1d1;\n  border-color: #d1d1d1;\n  cursor: pointer;\n}\n\n.container {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: 400px;\n  grid-auto-flow: dense;\n  gap: 0.5rem;\n}\n\n/* .image-container {\n  margin: 0;\n  padding: 0;\n  border: solid 1px red;\n} */\n\n.img-item {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 50%;\n}\n\n.container :nth-child(1) {\n  grid-column: span 2;\n}\n\n.container :nth-child(3) {\n  grid-row: span 2;\n}\n\n.container :nth-child(5) {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n.container :nth-child(10) {\n  grid-column: span 2;\n}\n\n@media screen and (max-width: 550px) {\n  .container {\n    grid-template-columns: repeat(1, 1fr);\n    gap: 0;\n    grid-row-gap: 0.5rem;\n  }\n  .container > * {\n    grid-column: span 1;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,4CAA4C;EAC5C,cAAc;AAChB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,MAAM;EACN,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,UAAU;EACV,+BAA+B;AACjC;AACA;EACE,yBAAyB;EACzB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;EACd,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,aAAa;EACb,qCAAqC;EACrC,qBAAqB;EACrB,qBAAqB;EACrB,WAAW;AACb;;AAEA;;;;GAIG;;AAEH;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,wBAAwB;AAC1B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE;IACE,qCAAqC;IACrC,MAAM;IACN,oBAAoB;EACtB;EACA;IACE,mBAAmB;EACrB;AACF","sourcesContent":["@import url(https://fonts.googleapis.com/css?family=Montserrat:500);\n\nhtml {\n  font-family: \"Montserrat\", Arial, sans-serif;\n  color: #d1d1d1;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  text-align: center;\n}\n\n.fixed {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.header {\n  background-color: #111e1f;\n  color: #d1d1d1;\n  margin: auto;\n  text-align: center;\n  font-size: 3rem;\n  padding: 1.5rem;\n  z-index: 5;\n  border-bottom: solid 1rem black;\n}\n.search {\n  background-color: #111f18;\n  padding: 1rem;\n  text-align: center;\n}\n\n.input-form__querry {\n  width: 15rem;\n  height: 3rem;\n  border-radius: 3rem;\n  padding-left: 1rem;\n  font-size: 1.5rem;\n  font-family: inherit;\n  border-color: #d1d1d1;\n}\n\n.input-form__btn {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 50%;\n  background-color: #003606;\n  color: #d1d1d1;\n  border-color: #d1d1d1;\n  cursor: pointer;\n}\n\n.container {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: 400px;\n  grid-auto-flow: dense;\n  gap: 0.5rem;\n}\n\n/* .image-container {\n  margin: 0;\n  padding: 0;\n  border: solid 1px red;\n} */\n\n.img-item {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 50%;\n}\n\n.container :nth-child(1) {\n  grid-column: span 2;\n}\n\n.container :nth-child(3) {\n  grid-row: span 2;\n}\n\n.container :nth-child(5) {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n.container :nth-child(10) {\n  grid-column: span 2;\n}\n\n@media screen and (max-width: 550px) {\n  .container {\n    grid-template-columns: repeat(1, 1fr);\n    gap: 0;\n    grid-row-gap: 0.5rem;\n  }\n  .container > * {\n    grid-column: span 1;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var unsplash_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unsplash-js */ "./node_modules/unsplash-js/dist/unsplash-js.esm.js");


var search = document.querySelector('.input-form__querry');
var go = document.querySelector('.input-form__btn');
var resultContainer = document.querySelector('.container');
var api = (0,unsplash_js__WEBPACK_IMPORTED_MODULE_1__.createApi)({
    accessKey: process.env.API_KEY, // TODO webpack has a env variable plugin - check it out
});
var state = {
    title: 'A Photo Gallery',
    gallery: [],
    searchEntry: '',
    recentSearches: [],
};
var renderImage = function (child, parent) {
    parent.innerHTML += child;
};
var imageTemplate = function (url) { return "\n    <article class=\"image-container\">\n      <img class=\"img-item\" src=\"".concat(url, "\" />\n    </article>\n  "); };
var displayPics = function (pics) {
    resultContainer.innerHTML = '';
    pics.forEach(function (imageSrc) {
        renderImage(imageTemplate(imageSrc), resultContainer);
    });
};
var conductGallerySearch = function () {
    api.search
        .getPhotos({
        query: state.searchEntry,
        page: 1,
        perPage: 10,
        orientation: 'landscape',
    })
        .then(function (result) {
        state.gallery = [];
        state.gallery = result.response.results.map(function (element) { return (element.urls.regular); });
        console.log('done');
        displayPics(state.gallery);
    })
        .catch(function () {
        console.log('something went wrong!'); // TODO make use of catch handler
    });
};
go.addEventListener('click', function (event) {
    event.preventDefault();
    state.searchEntry = search.value;
    search.value = '';
    conductGallerySearch();
    resultContainer.innerHTML += '';
});
window.addEventListener('statechange', function () {
    displayPics(state.gallery);
});
window.dispatchEvent(new Event('statechange'));


/***/ }),

/***/ "./node_modules/unsplash-js/dist/unsplash-js.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/unsplash-js/dist/unsplash-js.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Language": () => (/* binding */ Language),
/* harmony export */   "OrderBy": () => (/* binding */ OrderBy),
/* harmony export */   "_internals": () => (/* binding */ internals),
/* harmony export */   "createApi": () => (/* binding */ createApi)
/* harmony export */ });
/* harmony import */ var content_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! content-type */ "./node_modules/content-type/index.js");


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var checkIsString = /*#__PURE__*/getRefinement(function (value) {
  return typeof value === 'string' ? value : null;
});
var isDefined = function isDefined(x) {
  return x !== null && x !== undefined;
};
function getRefinement(getB) {
  return function (a) {
    return isDefined(getB(a));
  };
}
var checkIsNonEmptyArray = function checkIsNonEmptyArray(a) {
  return a.length > 0;
};

/** Takes a dictionary containing nullish values and returns a dictionary of all the defined
 * (non-nullish) values.
 */

var compactDefined = function compactDefined(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    var _ref;

    var value = obj[key];
    return _extends({}, acc, isDefined(value) ? (_ref = {}, _ref[key] = value, _ref) : {});
  }, {});
};
function flow() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  var len = fns.length - 1;
  return function () {
    for (var _len2 = arguments.length, x = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      x[_key2] = arguments[_key2];
    }

    var y = fns[0].apply(this, x);

    for (var i = 1; i <= len; i++) {
      y = fns[i].call(this, y);
    }

    return y;
  };
}

var checkIsObject = /*#__PURE__*/getRefinement(function (response) {
  return isDefined(response) && typeof response === 'object' && !Array.isArray(response) ? response : null;
});
var checkIsErrors = /*#__PURE__*/getRefinement(function (errors) {
  return Array.isArray(errors) && errors.every(checkIsString) && checkIsNonEmptyArray(errors) ? errors : null;
});
var checkIsApiError = /*#__PURE__*/getRefinement(function (response) {
  return checkIsObject(response) && 'errors' in response && checkIsErrors(response.errors) ? {
    errors: response.errors
  } : null;
});
var getErrorForBadStatusCode = function getErrorForBadStatusCode(jsonResponse) {
  if (checkIsApiError(jsonResponse)) {
    return {
      errors: jsonResponse.errors,
      source: 'api'
    };
  } else {
    return {
      errors: ['Responded with a status code outside the 2xx range, and the response body is not recognisable.'],
      source: 'decoding'
    };
  }
};
var DecodingError = function DecodingError(message) {
  this.message = message;
};

var CONTENT_TYPE_RESPONSE_HEADER = 'content-type';
var CONTENT_TYPE_JSON = 'application/json';

var checkIsJsonResponse = function checkIsJsonResponse(response) {
  var contentTypeHeader = response.headers.get(CONTENT_TYPE_RESPONSE_HEADER);
  return isDefined(contentTypeHeader) && (0,content_type__WEBPACK_IMPORTED_MODULE_0__.parse)(contentTypeHeader).type === CONTENT_TYPE_JSON;
};
/**
 * Note: restrict the type of JSON to `AnyJson` so that `any` doesn't leak downstream.
 */


var getJsonResponse = function getJsonResponse(response) {
  if (checkIsJsonResponse(response)) {
    return response.json()["catch"](function (_err) {
      throw new DecodingError('unable to parse JSON response.');
    });
  } else {
    throw new DecodingError('expected JSON response from server.');
  }
};

var handleFetchResponse = function handleFetchResponse(handleResponse) {
  return function (response) {
    return (response.ok ? handleResponse({
      response: response
    }).then(function (handledResponse) {
      return {
        type: 'success',
        status: response.status,
        response: handledResponse,
        originalResponse: response
      };
    }) : getJsonResponse(response).then(function (jsonResponse) {
      return _extends({
        type: 'error',
        status: response.status
      }, getErrorForBadStatusCode(jsonResponse), {
        originalResponse: response
      });
    }))["catch"](function (error) {
      /**
       * We want to separate expected decoding errors from unknown ones. We do so by throwing a custom
       * `DecodingError` whenever we encounter one within `handleFetchResponse` and catch them all
       * here. This allows us to easily handle all of these errors at once. Unexpected errors are not
       * caught, so that they bubble up and fail loudly.
       *
       * Note: Ideally we'd use an Either type, but this does the job without introducing dependencies
       * like `fp-ts`.
       */
      if (error instanceof DecodingError) {
        return {
          type: 'error',
          source: 'decoding',
          status: response.status,
          originalResponse: response,
          errors: [error.message]
        };
      } else {
        throw error;
      }
    });
  };
};
var castResponse = function castResponse() {
  return function (_ref) {
    var response = _ref.response;
    return getJsonResponse(response);
  };
};

var addQueryToUrl = function addQueryToUrl(query) {
  return function (url) {
    Object.keys(query).forEach(function (queryKey) {
      return url.searchParams.set(queryKey, query[queryKey].toString());
    });
  };
};

var addPathnameToUrl = function addPathnameToUrl(pathname) {
  return function (url) {
    // When there is no existing pathname, the value is `/`. Appending would give us a URL with two
    // forward slashes. This is why we replace the value in that scenario.
    if (url.pathname === '/') {
      url.pathname = pathname;
    } else {
      url.pathname += pathname;
    }
  };
};

var buildUrl = function buildUrl(_ref) {
  var pathname = _ref.pathname,
      query = _ref.query;
  return function (apiUrl) {
    var url = new URL(apiUrl);
    addPathnameToUrl(pathname)(url);
    addQueryToUrl(query)(url);
    return url.toString();
  };
};

var getQueryFromSearchParams = function getQueryFromSearchParams(searchParams) {
  var query = {};
  searchParams.forEach(function (value, key) {
    query[key] = value;
  });
  return query;
};

var parseQueryAndPathname = function parseQueryAndPathname(url) {
  var _URL = new URL(url),
      pathname = _URL.pathname,
      searchParams = _URL.searchParams;

  var query = getQueryFromSearchParams(searchParams);
  return {
    query: query,
    pathname: pathname === '/' ? undefined : pathname
  };
};

/**
 * helper used to type-check the arguments, and add default params for all requests
 */

var createRequestHandler = function createRequestHandler(fn) {
  return function (a, additionalFetchOptions) {
    if (additionalFetchOptions === void 0) {
      additionalFetchOptions = {};
    }

    var _fn = fn(a),
        headers = _fn.headers,
        query = _fn.query,
        baseReqParams = _objectWithoutPropertiesLoose(_fn, ["headers", "query"]);

    return _extends({}, baseReqParams, additionalFetchOptions, {
      query: query,
      headers: _extends({}, headers, additionalFetchOptions.headers)
    });
  };
};
var makeEndpoint = function makeEndpoint(endpoint) {
  return endpoint;
};
var initMakeRequest = function initMakeRequest(_ref) {
  var accessKey = _ref.accessKey,
      _ref$apiVersion = _ref.apiVersion,
      apiVersion = _ref$apiVersion === void 0 ? 'v1' : _ref$apiVersion,
      _ref$apiUrl = _ref.apiUrl,
      apiUrl = _ref$apiUrl === void 0 ? 'https://api.unsplash.com' : _ref$apiUrl,
      generalHeaders = _ref.headers,
      providedFetch = _ref.fetch,
      generalFetchOptions = _objectWithoutPropertiesLoose(_ref, ["accessKey", "apiVersion", "apiUrl", "headers", "fetch"]);

  return function (_ref2) {
    var handleResponse = _ref2.handleResponse,
        handleRequest = _ref2.handleRequest;
    return flow(handleRequest, function (_ref3) {
      var pathname = _ref3.pathname,
          query = _ref3.query,
          _ref3$method = _ref3.method,
          method = _ref3$method === void 0 ? 'GET' : _ref3$method,
          endpointHeaders = _ref3.headers,
          body = _ref3.body,
          signal = _ref3.signal;
      var url = buildUrl({
        pathname: pathname,
        query: query
      })(apiUrl);

      var fetchOptions = _extends({
        method: method,
        headers: _extends({}, generalHeaders, endpointHeaders, {
          'Accept-Version': apiVersion
        }, isDefined(accessKey) ? {
          Authorization: "Client-ID " + accessKey
        } : {}),
        body: body,
        signal: signal
      }, generalFetchOptions);

      var fetchToUse = providedFetch != null ? providedFetch : fetch;
      return fetchToUse(url, fetchOptions).then(handleFetchResponse(handleResponse));
    });
  };
};

var TOTAL_RESPONSE_HEADER = 'x-total';

var getTotalFromApiFeedResponse = function getTotalFromApiFeedResponse(response) {
  var totalsStr = response.headers.get(TOTAL_RESPONSE_HEADER);

  if (isDefined(totalsStr)) {
    var total = parseInt(totalsStr);

    if (Number.isInteger(total)) {
      return total;
    } else {
      throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to be valid integer.");
    }
  } else {
    throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to exist.");
  }
};

var handleFeedResponse = function handleFeedResponse() {
  return function (_ref) {
    var response = _ref.response;
    return castResponse()({
      response: response
    }).then(function (results) {
      return {
        results: results,
        total: getTotalFromApiFeedResponse(response)
      };
    });
  };
};

var getCollections = function getCollections(collectionIds) {
  return isDefined(collectionIds) ? {
    collections: collectionIds.join()
  } : {};
};
var getTopics = function getTopics(topicIds) {
  return isDefined(topicIds) ? {
    topics: topicIds.join()
  } : {};
};
var getFeedParams = function getFeedParams(_ref) {
  var page = _ref.page,
      perPage = _ref.perPage,
      orderBy = _ref.orderBy;
  return compactDefined({
    per_page: perPage,
    order_by: orderBy,
    page: page
  });
};

var COLLECTIONS_PATH_PREFIX = '/collections';
var getPhotos = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var collectionId = _ref.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/photos";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var collectionId = _ref2.collectionId,
          orientation = _ref2.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref2, ["collectionId", "orientation"]);

      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var collectionId = _ref3.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var collectionId = _ref4.collectionId;
      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var list = /*#__PURE__*/function () {
  var getPathname = function getPathname() {
    return COLLECTIONS_PATH_PREFIX;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (paginationParams) {
      if (paginationParams === void 0) {
        paginationParams = {};
      }

      return {
        pathname: getPathname(),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getRelated = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref5) {
    var collectionId = _ref5.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/related";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref6) {
      var collectionId = _ref6.collectionId;
      return {
        pathname: getPathname({
          collectionId: collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();

var index = {
  __proto__: null,
  getPhotos: getPhotos,
  get: get,
  list: list,
  getRelated: getRelated
};

var PHOTOS_PATH_PREFIX = '/photos';
var list$1 = /*#__PURE__*/function () {
  var _getPathname = function getPathname() {
    return PHOTOS_PATH_PREFIX;
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function (feedParams) {
      if (feedParams === void 0) {
        feedParams = {};
      }

      return {
        pathname: PHOTOS_PATH_PREFIX,
        query: compactDefined(getFeedParams(feedParams))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get$1 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var photoId = _ref.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var photoId = _ref2.photoId;
      return {
        pathname: getPathname({
          photoId: photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getStats = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var photoId = _ref3.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId + "/statistics";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var photoId = _ref4.photoId;
      return {
        pathname: getPathname({
          photoId: photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getRandom = /*#__PURE__*/function () {
  var getPathname = function getPathname() {
    return PHOTOS_PATH_PREFIX + "/random";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_temp) {
      var _ref5 = _temp === void 0 ? {} : _temp,
          collectionIds = _ref5.collectionIds,
          contentFilter = _ref5.contentFilter,
          topicIds = _ref5.topicIds,
          queryParams = _objectWithoutPropertiesLoose(_ref5, ["collectionIds", "contentFilter", "topicIds"]);

      return {
        pathname: getPathname(),
        query: compactDefined(_extends({}, queryParams, {
          content_filter: contentFilter
        }, getCollections(collectionIds), getTopics(topicIds))),
        headers: {
          /**
           * Avoid response caching
           */
          'cache-control': 'no-cache'
        }
      };
    }),
    handleResponse: castResponse()
  });
}();
var trackDownload = {
  handleRequest: /*#__PURE__*/createRequestHandler(function (_ref6) {
    var downloadLocation = _ref6.downloadLocation;

    var _parseQueryAndPathnam = parseQueryAndPathname(downloadLocation),
        pathname = _parseQueryAndPathnam.pathname,
        query = _parseQueryAndPathnam.query;

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }

    return {
      pathname: pathname,
      query: compactDefined(query)
    };
  }),
  handleResponse: /*#__PURE__*/castResponse()
};

var index$1 = {
  __proto__: null,
  list: list$1,
  get: get$1,
  getStats: getStats,
  getRandom: getRandom,
  trackDownload: trackDownload
};

var SEARCH_PATH_PREFIX = "/search";
var getPhotos$1 = /*#__PURE__*/function () {
  var _getPathname = function getPathname() {
    return SEARCH_PATH_PREFIX + "/photos";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function (_ref) {
      var query = _ref.query,
          page = _ref.page,
          perPage = _ref.perPage,
          orderBy = _ref.orderBy,
          collectionIds = _ref.collectionIds,
          lang = _ref.lang,
          contentFilter = _ref.contentFilter,
          filters = _objectWithoutPropertiesLoose(_ref, ["query", "page", "perPage", "orderBy", "collectionIds", "lang", "contentFilter"]);

      return {
        pathname: _getPathname(),
        query: compactDefined(_extends({
          query: query,
          content_filter: contentFilter,
          lang: lang,
          order_by: orderBy
        }, getFeedParams({
          page: page,
          perPage: perPage
        }), getCollections(collectionIds), filters))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getCollections$1 = /*#__PURE__*/function () {
  var _getPathname2 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/collections";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname2();
    },
    handleRequest: createRequestHandler(function (_ref2) {
      var query = _ref2.query,
          paginationParams = _objectWithoutPropertiesLoose(_ref2, ["query"]);

      return {
        pathname: _getPathname2(),
        query: _extends({
          query: query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getUsers = /*#__PURE__*/function () {
  var _getPathname3 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/users";
  };

  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname3();
    },
    handleRequest: createRequestHandler(function (_ref3) {
      var query = _ref3.query,
          paginationParams = _objectWithoutPropertiesLoose(_ref3, ["query"]);

      return {
        pathname: _getPathname3(),
        query: _extends({
          query: query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();

var index$2 = {
  __proto__: null,
  getPhotos: getPhotos$1,
  getCollections: getCollections$1,
  getUsers: getUsers
};

var USERS_PATH_PREFIX = '/users';
var get$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref) {
    var username = _ref.username;
    return USERS_PATH_PREFIX + "/" + username;
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref2) {
      var username = _ref2.username;
      return {
        pathname: getPathname({
          username: username
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getPhotos$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref3) {
    var username = _ref3.username;
    return USERS_PATH_PREFIX + "/" + username + "/photos";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref4) {
      var username = _ref4.username,
          stats = _ref4.stats,
          orientation = _ref4.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref4, ["username", "stats", "orientation"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation,
          stats: stats
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getLikes = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref5) {
    var username = _ref5.username;
    return USERS_PATH_PREFIX + "/" + username + "/likes";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref6) {
      var username = _ref6.username,
          orientation = _ref6.orientation,
          paginationParams = _objectWithoutPropertiesLoose(_ref6, ["username", "orientation"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation: orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getCollections$2 = /*#__PURE__*/function () {
  var getPathname = function getPathname(_ref7) {
    var username = _ref7.username;
    return USERS_PATH_PREFIX + "/" + username + "/collections";
  };

  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: createRequestHandler(function (_ref8) {
      var username = _ref8.username,
          paginationParams = _objectWithoutPropertiesLoose(_ref8, ["username"]);

      return {
        pathname: getPathname({
          username: username
        }),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();

var index$3 = {
  __proto__: null,
  get: get$2,
  getPhotos: getPhotos$2,
  getLikes: getLikes,
  getCollections: getCollections$2
};

var BASE_TOPIC_PATH = '/topics';

var getTopicPath = function getTopicPath(_ref) {
  var topicIdOrSlug = _ref.topicIdOrSlug;
  return BASE_TOPIC_PATH + "/" + topicIdOrSlug;
};

var list$2 = /*#__PURE__*/makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest(_ref2) {
    var page = _ref2.page,
        perPage = _ref2.perPage,
        orderBy = _ref2.orderBy,
        topicIdsOrSlugs = _ref2.topicIdsOrSlugs;
    return {
      pathname: BASE_TOPIC_PATH,
      query: compactDefined(_extends({}, getFeedParams({
        page: page,
        perPage: perPage
      }), {
        ids: topicIdsOrSlugs == null ? void 0 : topicIdsOrSlugs.join(','),
        order_by: orderBy
      }))
    };
  },
  handleResponse: /*#__PURE__*/handleFeedResponse()
});
var get$3 = /*#__PURE__*/makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest(_ref3) {
    var topicIdOrSlug = _ref3.topicIdOrSlug;
    return {
      pathname: getTopicPath({
        topicIdOrSlug: topicIdOrSlug
      }),
      query: {}
    };
  },
  handleResponse: /*#__PURE__*/castResponse()
});
var getPhotos$3 = /*#__PURE__*/function () {
  var getPathname = /*#__PURE__*/flow(getTopicPath, function (topicPath) {
    return topicPath + "/photos";
  });
  return makeEndpoint({
    getPathname: getPathname,
    handleRequest: function handleRequest(_ref4) {
      var topicIdOrSlug = _ref4.topicIdOrSlug,
          orientation = _ref4.orientation,
          feedParams = _objectWithoutPropertiesLoose(_ref4, ["topicIdOrSlug", "orientation"]);

      return {
        pathname: getPathname({
          topicIdOrSlug: topicIdOrSlug
        }),
        query: compactDefined(_extends({}, getFeedParams(feedParams), {
          orientation: orientation
        }))
      };
    },
    handleResponse: handleFeedResponse()
  });
}();

var index$4 = {
  __proto__: null,
  list: list$2,
  get: get$3,
  getPhotos: getPhotos$3
};

var trackNonHotLinkedPhotoView = function trackNonHotLinkedPhotoView(_ref) {
  var appId = _ref.appId;
  return function (_ref2) {
    var photoId = _ref2.photoId;
    var ids = !Array.isArray(photoId) ? [photoId] : photoId;

    if (ids.length > 20) {
      throw new Error('You cannot track more than 20 photos at once. Please try again with fewer photos.');
    }

    return fetch("views.unsplash.com/v?photo_id=" + ids.join() + "&app_id=" + appId);
  };
};



var internals = {
  __proto__: null,
  collections: index,
  photos: index$1,
  search: index$2,
  users: index$3,
  topics: index$4,
  trackNonHotLinkedPhotoView: trackNonHotLinkedPhotoView
};

var Language;

(function (Language) {
  Language["Afrikaans"] = "af";
  Language["Amharic"] = "am";
  Language["Arabic"] = "ar";
  Language["Azerbaijani"] = "az";
  Language["Belarusian"] = "be";
  Language["Bulgarian"] = "bg";
  Language["Bengali"] = "bn";
  Language["Bosnian"] = "bs";
  Language["Catalan"] = "ca";
  Language["Cebuano"] = "ceb";
  Language["Corsican"] = "co";
  Language["Czech"] = "cs";
  Language["Welsh"] = "cy";
  Language["Danish"] = "da";
  Language["German"] = "de";
  Language["Greek"] = "el";
  Language["English"] = "en";
  Language["Esperanto"] = "eo";
  Language["Spanish"] = "es";
  Language["Estonian"] = "et";
  Language["Basque"] = "eu";
  Language["Persian"] = "fa";
  Language["Finnish"] = "fi";
  Language["French"] = "fr";
  Language["Frisian"] = "fy";
  Language["Irish"] = "ga";
  Language["ScotsGaelic"] = "gd";
  Language["Galician"] = "gl";
  Language["Gujarati"] = "gu";
  Language["Hausa"] = "ha";
  Language["Hawaiian"] = "haw";
  Language["Hindi"] = "hi";
  Language["Hmong"] = "hmn";
  Language["Croatian"] = "hr";
  Language["HaitianCreole"] = "ht";
  Language["Hungarian"] = "hu";
  Language["Armenian"] = "hy";
  Language["Indonesian"] = "id";
  Language["Igbo"] = "ig";
  Language["Icelandic"] = "is";
  Language["Italian"] = "it";
  Language["Hebrew"] = "iw";
  Language["Japanese"] = "ja";
  Language["Javanese"] = "jw";
  Language["Georgian"] = "ka";
  Language["Kazakh"] = "kk";
  Language["Khmer"] = "km";
  Language["Kannada"] = "kn";
  Language["Korean"] = "ko";
  Language["Kurdish"] = "ku";
  Language["Kyrgyz"] = "ky";
  Language["Latin"] = "la";
  Language["Luxembourgish"] = "lb";
  Language["Lao"] = "lo";
  Language["Lithuanian"] = "lt";
  Language["Latvian"] = "lv";
  Language["Malagasy"] = "mg";
  Language["Maori"] = "mi";
  Language["Macedonian"] = "mk";
  Language["Malayalam"] = "ml";
  Language["Mongolian"] = "mn";
  Language["Marathi"] = "mr";
  Language["Malay"] = "ms";
  Language["Maltese"] = "mt";
  Language["Myanmar"] = "my";
  Language["Nepali"] = "ne";
  Language["Dutch"] = "nl";
  Language["Norwegian"] = "no";
  Language["Nyanja"] = "ny";
  Language["Oriya"] = "or";
  Language["Punjabi"] = "pa";
  Language["Polish"] = "pl";
  Language["Pashto"] = "ps";
  Language["Portuguese"] = "pt";
  Language["Romanian"] = "ro";
  Language["Russian"] = "ru";
  Language["Kinyarwanda"] = "rw";
  Language["Sindhi"] = "sd";
  Language["Sinhala"] = "si";
  Language["Slovak"] = "sk";
  Language["Slovenian"] = "sl";
  Language["Samoan"] = "sm";
  Language["Shona"] = "sn";
  Language["Somali"] = "so";
  Language["Albanian"] = "sq";
  Language["Serbian"] = "sr";
  Language["Sesotho"] = "st";
  Language["Sundanese"] = "su";
  Language["Swedish"] = "sv";
  Language["Swahili"] = "sw";
  Language["Tamil"] = "ta";
  Language["Telugu"] = "te";
  Language["Tajik"] = "tg";
  Language["Thai"] = "th";
  Language["Turkmen"] = "tk";
  Language["Filipino"] = "tl";
  Language["Turkish"] = "tr";
  Language["Tatar"] = "tt";
  Language["Uighur"] = "ug";
  Language["Ukrainian"] = "uk";
  Language["Urdu"] = "ur";
  Language["Uzbek"] = "uz";
  Language["Vietnamese"] = "vi";
  Language["Xhosa"] = "xh";
  Language["Yiddish"] = "yi";
  Language["Yoruba"] = "yo";
  Language["ChineseSimplified"] = "zh";
  Language["ChineseTraditional"] = "zh-TW";
  Language["Zulu"] = "zu";
})(Language || (Language = {}));

var OrderBy;

(function (OrderBy) {
  OrderBy["LATEST"] = "latest";
  OrderBy["POPULAR"] = "popular";
  OrderBy["VIEWS"] = "views";
  OrderBy["DOWNLOADS"] = "downloads";
  OrderBy["OLDEST"] = "oldest";
})(OrderBy || (OrderBy = {}));

var createApi = /*#__PURE__*/flow(initMakeRequest, function (makeRequest) {
  return {
    photos: {
      get: makeRequest(get$1),
      list: makeRequest(list$1),
      getStats: makeRequest(getStats),
      getRandom: makeRequest(getRandom),
      trackDownload: makeRequest(trackDownload)
    },
    users: {
      getPhotos: makeRequest(getPhotos$2),
      getCollections: makeRequest(getCollections$2),
      getLikes: makeRequest(getLikes),
      get: makeRequest(get$2)
    },
    search: {
      getCollections: makeRequest(getCollections$1),
      getPhotos: makeRequest(getPhotos$1),
      getUsers: makeRequest(getUsers)
    },
    collections: {
      getPhotos: makeRequest(getPhotos),
      get: makeRequest(get),
      list: makeRequest(list),
      getRelated: makeRequest(getRelated)
    },
    topics: {
      list: makeRequest(list$2),
      get: makeRequest(get$3),
      getPhotos: makeRequest(getPhotos$3)
    }
  };
});


//# sourceMappingURL=unsplash-js.esm.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQSwwQkFBMEI7QUFDMUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLFNBQVM7QUFDVDtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0Qjs7QUFFN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRWdFO0FBQ2pFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHNfd2VicGFja19pbWFnZWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvY29udGVudC10eXBlL2luZGV4LmpzIiwid2VicGFjazovL3RzX3dlYnBhY2tfaW1hZ2VnYWxsZXJ5Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90c193ZWJwYWNrX2ltYWdlZ2FsbGVyeS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdHNfd2VicGFja19pbWFnZWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90c193ZWJwYWNrX2ltYWdlZ2FsbGVyeS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90c193ZWJwYWNrX2ltYWdlZ2FsbGVyeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90c193ZWJwYWNrX2ltYWdlZ2FsbGVyeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdHNfd2VicGFja19pbWFnZWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdHNfd2VicGFja19pbWFnZWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdHNfd2VicGFja19pbWFnZWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90c193ZWJwYWNrX2ltYWdlZ2FsbGVyeS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RzX3dlYnBhY2tfaW1hZ2VnYWxsZXJ5Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3RzX3dlYnBhY2tfaW1hZ2VnYWxsZXJ5Ly4vbm9kZV9tb2R1bGVzL3Vuc3BsYXNoLWpzL2Rpc3QvdW5zcGxhc2gtanMuZXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogY29udGVudC10eXBlXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoICooIFwiO1wiIHBhcmFtZXRlciApIGluIFJGQyA3MjMxIHNlYyAzLjEuMS4xXG4gKlxuICogcGFyYW1ldGVyICAgICA9IHRva2VuIFwiPVwiICggdG9rZW4gLyBxdW90ZWQtc3RyaW5nIClcbiAqIHRva2VuICAgICAgICAgPSAxKnRjaGFyXG4gKiB0Y2hhciAgICAgICAgID0gXCIhXCIgLyBcIiNcIiAvIFwiJFwiIC8gXCIlXCIgLyBcIiZcIiAvIFwiJ1wiIC8gXCIqXCJcbiAqICAgICAgICAgICAgICAgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgLyBcIl5cIiAvIFwiX1wiIC8gXCJgXCIgLyBcInxcIiAvIFwiflwiXG4gKiAgICAgICAgICAgICAgIC8gRElHSVQgLyBBTFBIQVxuICogICAgICAgICAgICAgICA7IGFueSBWQ0hBUiwgZXhjZXB0IGRlbGltaXRlcnNcbiAqIHF1b3RlZC1zdHJpbmcgPSBEUVVPVEUgKiggcWR0ZXh0IC8gcXVvdGVkLXBhaXIgKSBEUVVPVEVcbiAqIHFkdGV4dCAgICAgICAgPSBIVEFCIC8gU1AgLyAleDIxIC8gJXgyMy01QiAvICV4NUQtN0UgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqIHF1b3RlZC1wYWlyICAgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqL1xudmFyIFBBUkFNX1JFR0VYUCA9IC87ICooWyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rKSAqPSAqKFwiKD86W1xcdTAwMGJcXHUwMDIwXFx1MDAyMVxcdTAwMjMtXFx1MDA1YlxcdTAwNWQtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl18XFxcXFtcXHUwMDBiXFx1MDAyMC1cXHUwMGZmXSkqXCJ8WyEjJCUmJyorLl5fYHx+MC05QS1aYS16LV0rKSAqL2dcbnZhciBURVhUX1JFR0VYUCA9IC9eW1xcdTAwMGJcXHUwMDIwLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdKyQvXG52YXIgVE9LRU5fUkVHRVhQID0gL15bISMkJSYnKisuXl9gfH4wLTlBLVphLXotXSskL1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqXG4gKiBxdW90ZWQtcGFpciA9IFwiXFxcIiAoIEhUQUIgLyBTUCAvIFZDSEFSIC8gb2JzLXRleHQgKVxuICogb2JzLXRleHQgICAgPSAleDgwLUZGXG4gKi9cbnZhciBRRVNDX1JFR0VYUCA9IC9cXFxcKFtcXHUwMDBiXFx1MDAyMC1cXHUwMGZmXSkvZ1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBjaGFycyB0aGF0IG11c3QgYmUgcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKi9cbnZhciBRVU9URV9SRUdFWFAgPSAvKFtcXFxcXCJdKS9nXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIHR5cGUgaW4gUkZDIDcyMzEgc2VjIDMuMS4xLjFcbiAqXG4gKiBtZWRpYS10eXBlID0gdHlwZSBcIi9cIiBzdWJ0eXBlXG4gKiB0eXBlICAgICAgID0gdG9rZW5cbiAqIHN1YnR5cGUgICAgPSB0b2tlblxuICovXG52YXIgVFlQRV9SRUdFWFAgPSAvXlshIyQlJicqKy5eX2B8fjAtOUEtWmEtei1dK1xcL1shIyQlJicqKy5eX2B8fjAtOUEtWmEtei1dKyQvXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRcbmV4cG9ydHMucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIEZvcm1hdCBvYmplY3QgdG8gbWVkaWEgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBvYmogaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgdmFyIHBhcmFtZXRlcnMgPSBvYmoucGFyYW1ldGVyc1xuICB2YXIgdHlwZSA9IG9iai50eXBlXG5cbiAgaWYgKCF0eXBlIHx8ICFUWVBFX1JFR0VYUC50ZXN0KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCB0eXBlJylcbiAgfVxuXG4gIHZhciBzdHJpbmcgPSB0eXBlXG5cbiAgLy8gYXBwZW5kIHBhcmFtZXRlcnNcbiAgaWYgKHBhcmFtZXRlcnMgJiYgdHlwZW9mIHBhcmFtZXRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIHBhcmFtXG4gICAgdmFyIHBhcmFtcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLnNvcnQoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcmFtID0gcGFyYW1zW2ldXG5cbiAgICAgIGlmICghVE9LRU5fUkVHRVhQLnRlc3QocGFyYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIG5hbWUnKVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcgKz0gJzsgJyArIHBhcmFtICsgJz0nICsgcXN0cmluZyhwYXJhbWV0ZXJzW3BhcmFtXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogUGFyc2UgbWVkaWEgdHlwZSB0byBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHJpbmdcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZSAoc3RyaW5nKSB7XG4gIGlmICghc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyaW5nIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIC8vIHN1cHBvcnQgcmVxL3Jlcy1saWtlIG9iamVjdHMgYXMgYXJndW1lbnRcbiAgdmFyIGhlYWRlciA9IHR5cGVvZiBzdHJpbmcgPT09ICdvYmplY3QnXG4gICAgPyBnZXRjb250ZW50dHlwZShzdHJpbmcpXG4gICAgOiBzdHJpbmdcblxuICBpZiAodHlwZW9mIGhlYWRlciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHJpbmcgaXMgcmVxdWlyZWQgdG8gYmUgYSBzdHJpbmcnKVxuICB9XG5cbiAgdmFyIGluZGV4ID0gaGVhZGVyLmluZGV4T2YoJzsnKVxuICB2YXIgdHlwZSA9IGluZGV4ICE9PSAtMVxuICAgID8gaGVhZGVyLnN1YnN0cigwLCBpbmRleCkudHJpbSgpXG4gICAgOiBoZWFkZXIudHJpbSgpXG5cbiAgaWYgKCFUWVBFX1JFR0VYUC50ZXN0KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBtZWRpYSB0eXBlJylcbiAgfVxuXG4gIHZhciBvYmogPSBuZXcgQ29udGVudFR5cGUodHlwZS50b0xvd2VyQ2FzZSgpKVxuXG4gIC8vIHBhcnNlIHBhcmFtZXRlcnNcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHZhciBrZXlcbiAgICB2YXIgbWF0Y2hcbiAgICB2YXIgdmFsdWVcblxuICAgIFBBUkFNX1JFR0VYUC5sYXN0SW5kZXggPSBpbmRleFxuXG4gICAgd2hpbGUgKChtYXRjaCA9IFBBUkFNX1JFR0VYUC5leGVjKGhlYWRlcikpKSB7XG4gICAgICBpZiAobWF0Y2guaW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgICB9XG5cbiAgICAgIGluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgICAga2V5ID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKVxuICAgICAgdmFsdWUgPSBtYXRjaFsyXVxuXG4gICAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHF1b3RlcyBhbmQgZXNjYXBlc1xuICAgICAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAgICAgLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAyKVxuICAgICAgICAgIC5yZXBsYWNlKFFFU0NfUkVHRVhQLCAnJDEnKVxuICAgICAgfVxuXG4gICAgICBvYmoucGFyYW1ldGVyc1trZXldID0gdmFsdWVcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggIT09IGhlYWRlci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG4vKipcbiAqIEdldCBjb250ZW50LXR5cGUgZnJvbSByZXEvcmVzIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGdldGNvbnRlbnR0eXBlIChvYmopIHtcbiAgdmFyIGhlYWRlclxuXG4gIGlmICh0eXBlb2Ygb2JqLmdldEhlYWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHJlcy1saWtlXG4gICAgaGVhZGVyID0gb2JqLmdldEhlYWRlcignY29udGVudC10eXBlJylcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gcmVxLWxpa2VcbiAgICBoZWFkZXIgPSBvYmouaGVhZGVycyAmJiBvYmouaGVhZGVyc1snY29udGVudC10eXBlJ11cbiAgfVxuXG4gIGlmICh0eXBlb2YgaGVhZGVyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRlbnQtdHlwZSBoZWFkZXIgaXMgbWlzc2luZyBmcm9tIG9iamVjdCcpXG4gIH1cblxuICByZXR1cm4gaGVhZGVyXG59XG5cbi8qKlxuICogUXVvdGUgYSBzdHJpbmcgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcXN0cmluZyAodmFsKSB7XG4gIHZhciBzdHIgPSBTdHJpbmcodmFsKVxuXG4gIC8vIG5vIG5lZWQgdG8gcXVvdGUgdG9rZW5zXG4gIGlmIChUT0tFTl9SRUdFWFAudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgaWYgKHN0ci5sZW5ndGggPiAwICYmICFURVhUX1JFR0VYUC50ZXN0KHN0cikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciB2YWx1ZScpXG4gIH1cblxuICByZXR1cm4gJ1wiJyArIHN0ci5yZXBsYWNlKFFVT1RFX1JFR0VYUCwgJ1xcXFwkMScpICsgJ1wiJ1xufVxuXG4vKipcbiAqIENsYXNzIHRvIHJlcHJlc2VudCBhIGNvbnRlbnQgdHlwZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIENvbnRlbnRUeXBlICh0eXBlKSB7XG4gIHRoaXMucGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy50eXBlID0gdHlwZVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6NTAwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCB7XFxuICBmb250LWZhbWlseTogXFxcIk1vbnRzZXJyYXRcXFwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiAjZDFkMWQxO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZml4ZWQge1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIHRvcDogMDtcXG4gIHotaW5kZXg6IDEwO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTFlMWY7XFxuICBjb2xvcjogI2QxZDFkMTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIHBhZGRpbmc6IDEuNXJlbTtcXG4gIHotaW5kZXg6IDU7XFxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcmVtIGJsYWNrO1xcbn1cXG4uc2VhcmNoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTFmMTg7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uaW5wdXQtZm9ybV9fcXVlcnJ5IHtcXG4gIHdpZHRoOiAxNXJlbTtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDNyZW07XFxuICBwYWRkaW5nLWxlZnQ6IDFyZW07XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgYm9yZGVyLWNvbG9yOiAjZDFkMWQxO1xcbn1cXG5cXG4uaW5wdXQtZm9ybV9fYnRuIHtcXG4gIHdpZHRoOiAzcmVtO1xcbiAgaGVpZ2h0OiAzcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMzYwNjtcXG4gIGNvbG9yOiAjZDFkMWQxO1xcbiAgYm9yZGVyLWNvbG9yOiAjZDFkMWQxO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtYXV0by1yb3dzOiA0MDBweDtcXG4gIGdyaWQtYXV0by1mbG93OiBkZW5zZTtcXG4gIGdhcDogMC41cmVtO1xcbn1cXG5cXG4vKiAuaW1hZ2UtY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IHNvbGlkIDFweCByZWQ7XFxufSAqL1xcblxcbi5pbWctaXRlbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgb2JqZWN0LXBvc2l0aW9uOiA1MCUgNTAlO1xcbn1cXG5cXG4uY29udGFpbmVyIDpudGgtY2hpbGQoMSkge1xcbiAgZ3JpZC1jb2x1bW46IHNwYW4gMjtcXG59XFxuXFxuLmNvbnRhaW5lciA6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtcm93OiBzcGFuIDI7XFxufVxcblxcbi5jb250YWluZXIgOm50aC1jaGlsZCg1KSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbiAgZ3JpZC1yb3c6IHNwYW4gMjtcXG59XFxuXFxuLmNvbnRhaW5lciA6bnRoLWNoaWxkKDEwKSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1NTBweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICAgIGdhcDogMDtcXG4gICAgZ3JpZC1yb3ctZ2FwOiAwLjVyZW07XFxuICB9XFxuICAuY29udGFpbmVyID4gKiB7XFxuICAgIGdyaWQtY29sdW1uOiBzcGFuIDE7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSw0Q0FBNEM7RUFDNUMsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixNQUFNO0VBQ04sV0FBVztBQUNiOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixlQUFlO0VBQ2YsVUFBVTtFQUNWLCtCQUErQjtBQUNqQztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixhQUFhO0VBQ2IscUNBQXFDO0VBQ3JDLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsV0FBVztBQUNiOztBQUVBOzs7O0dBSUc7O0FBRUg7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0U7SUFDRSxxQ0FBcUM7SUFDckMsTUFBTTtJQUNOLG9CQUFvQjtFQUN0QjtFQUNBO0lBQ0UsbUJBQW1CO0VBQ3JCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6NTAwKTtcXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTW9udHNlcnJhdFxcXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6ICNkMWQxZDE7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5maXhlZCB7XFxuICBwb3NpdGlvbjogc3RpY2t5O1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTA7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMWUxZjtcXG4gIGNvbG9yOiAjZDFkMWQxO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgcGFkZGluZzogMS41cmVtO1xcbiAgei1pbmRleDogNTtcXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFyZW0gYmxhY2s7XFxufVxcbi5zZWFyY2gge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMWYxODtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5pbnB1dC1mb3JtX19xdWVycnkge1xcbiAgd2lkdGg6IDE1cmVtO1xcbiAgaGVpZ2h0OiAzcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogM3JlbTtcXG4gIHBhZGRpbmctbGVmdDogMXJlbTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBib3JkZXItY29sb3I6ICNkMWQxZDE7XFxufVxcblxcbi5pbnB1dC1mb3JtX19idG4ge1xcbiAgd2lkdGg6IDNyZW07XFxuICBoZWlnaHQ6IDNyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAzNjA2O1xcbiAgY29sb3I6ICNkMWQxZDE7XFxuICBib3JkZXItY29sb3I6ICNkMWQxZDE7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDQwMHB4O1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGRlbnNlO1xcbiAgZ2FwOiAwLjVyZW07XFxufVxcblxcbi8qIC5pbWFnZS1jb250YWluZXIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogc29saWQgMXB4IHJlZDtcXG59ICovXFxuXFxuLmltZy1pdGVtIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBvYmplY3QtcG9zaXRpb246IDUwJSA1MCU7XFxufVxcblxcbi5jb250YWluZXIgOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbn1cXG5cXG4uY29udGFpbmVyIDpudGgtY2hpbGQoMykge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMjtcXG59XFxuXFxuLmNvbnRhaW5lciA6bnRoLWNoaWxkKDUpIHtcXG4gIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICBncmlkLXJvdzogc3BhbiAyO1xcbn1cXG5cXG4uY29udGFpbmVyIDpudGgtY2hpbGQoMTApIHtcXG4gIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDU1MHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gICAgZ2FwOiAwO1xcbiAgICBncmlkLXJvdy1nYXA6IDAuNXJlbTtcXG4gIH1cXG4gIC5jb250YWluZXIgPiAqIHtcXG4gICAgZ3JpZC1jb2x1bW46IHNwYW4gMTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBjcmVhdGVBcGkgfSBmcm9tICd1bnNwbGFzaC1qcyc7XG5cbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuaW5wdXQtZm9ybV9fcXVlcnJ5Jyk7XG5jb25zdCBnbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuaW5wdXQtZm9ybV9fYnRuJyk7XG5jb25zdCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLmNvbnRhaW5lcicpO1xuXG5jb25zdCBhcGkgPSBjcmVhdGVBcGkoe1xuICBhY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFQSV9LRVksIC8vIFRPRE8gd2VicGFjayBoYXMgYSBlbnYgdmFyaWFibGUgcGx1Z2luIC0gY2hlY2sgaXQgb3V0XG59KTtcblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZ2FsbGVyeTogc3RyaW5nW107XG4gIHNlYXJjaEVudHJ5OiBzdHJpbmcgfCBudWxsO1xuICByZWNlbnRTZWFyY2hlczogc3RyaW5nW107XG59XG5cbmNvbnN0IHN0YXRlOiBTdGF0ZSA9IHtcbiAgdGl0bGU6ICdBIFBob3RvIEdhbGxlcnknLFxuICBnYWxsZXJ5OiBbXSxcbiAgc2VhcmNoRW50cnk6ICcnLFxuICByZWNlbnRTZWFyY2hlczogW10sXG59O1xuXG5jb25zdCByZW5kZXJJbWFnZSA9IChjaGlsZDogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gIHBhcmVudC5pbm5lckhUTUwgKz0gY2hpbGQ7XG59O1xuXG5jb25zdCBpbWFnZVRlbXBsYXRlID0gKHVybDogc3RyaW5nKSA9PiBgXG4gICAgPGFydGljbGUgY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIj5cbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctaXRlbVwiIHNyYz1cIiR7dXJsfVwiIC8+XG4gICAgPC9hcnRpY2xlPlxuICBgO1xuXG5jb25zdCBkaXNwbGF5UGljcyA9IChwaWNzOiBzdHJpbmdbXSkgPT4ge1xuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIHBpY3MuZm9yRWFjaChpbWFnZVNyYyA9PiB7XG4gICAgcmVuZGVySW1hZ2UoaW1hZ2VUZW1wbGF0ZShpbWFnZVNyYyksIHJlc3VsdENvbnRhaW5lcik7XG4gIH0pO1xufTtcblxuY29uc3QgY29uZHVjdEdhbGxlcnlTZWFyY2ggPSAoKSA9PiB7XG4gIGFwaS5zZWFyY2hcbiAgICAuZ2V0UGhvdG9zKHtcbiAgICAgIHF1ZXJ5OiBzdGF0ZS5zZWFyY2hFbnRyeSxcbiAgICAgIHBhZ2U6IDEsIC8vIFRPRE8gYWRkIHBhZ2luYXRpb25cbiAgICAgIHBlclBhZ2U6IDEwLFxuICAgICAgb3JpZW50YXRpb246ICdsYW5kc2NhcGUnLFxuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHN0YXRlLmdhbGxlcnkgPSBbXTtcbiAgICAgIHN0YXRlLmdhbGxlcnkgPSByZXN1bHQucmVzcG9uc2UucmVzdWx0cy5tYXAoZWxlbWVudCA9PiAoZWxlbWVudC51cmxzLnJlZ3VsYXIpKTtcbiAgICAgIGNvbnNvbGUubG9nKCdkb25lJyk7XG4gICAgICBkaXNwbGF5UGljcyhzdGF0ZS5nYWxsZXJ5KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIHdlbnQgd3JvbmchJyk7IC8vIFRPRE8gbWFrZSB1c2Ugb2YgY2F0Y2ggaGFuZGxlclxuICAgIH0pO1xufTtcblxuZ28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgc3RhdGUuc2VhcmNoRW50cnkgPSAgKHNlYXJjaCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgKHNlYXJjaCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9ICcnO1xuICBjb25kdWN0R2FsbGVyeVNlYXJjaCgpO1xuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MICs9ICcnO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgZGlzcGxheVBpY3Moc3RhdGUuZ2FsbGVyeSk7XG59KTtcblxud2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdGF0ZWNoYW5nZScpKTsiLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJ2NvbnRlbnQtdHlwZSc7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgY2hlY2tJc1N0cmluZyA9IC8qI19fUFVSRV9fKi9nZXRSZWZpbmVtZW50KGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogbnVsbDtcbn0pO1xudmFyIGlzRGVmaW5lZCA9IGZ1bmN0aW9uIGlzRGVmaW5lZCh4KSB7XG4gIHJldHVybiB4ICE9PSBudWxsICYmIHggIT09IHVuZGVmaW5lZDtcbn07XG5mdW5jdGlvbiBnZXRSZWZpbmVtZW50KGdldEIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGlzRGVmaW5lZChnZXRCKGEpKTtcbiAgfTtcbn1cbnZhciBjaGVja0lzTm9uRW1wdHlBcnJheSA9IGZ1bmN0aW9uIGNoZWNrSXNOb25FbXB0eUFycmF5KGEpIHtcbiAgcmV0dXJuIGEubGVuZ3RoID4gMDtcbn07XG5cbi8qKiBUYWtlcyBhIGRpY3Rpb25hcnkgY29udGFpbmluZyBudWxsaXNoIHZhbHVlcyBhbmQgcmV0dXJucyBhIGRpY3Rpb25hcnkgb2YgYWxsIHRoZSBkZWZpbmVkXHJcbiAqIChub24tbnVsbGlzaCkgdmFsdWVzLlxyXG4gKi9cblxudmFyIGNvbXBhY3REZWZpbmVkID0gZnVuY3Rpb24gY29tcGFjdERlZmluZWQob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgYWNjLCBpc0RlZmluZWQodmFsdWUpID8gKF9yZWYgPSB7fSwgX3JlZltrZXldID0gdmFsdWUsIF9yZWYpIDoge30pO1xuICB9LCB7fSk7XG59O1xuZnVuY3Rpb24gZmxvdygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZucyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgbGVuID0gZm5zLmxlbmd0aCAtIDE7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCB4ID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICB4W19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgdmFyIHkgPSBmbnNbMF0uYXBwbHkodGhpcywgeCk7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgeSA9IGZuc1tpXS5jYWxsKHRoaXMsIHkpO1xuICAgIH1cblxuICAgIHJldHVybiB5O1xuICB9O1xufVxuXG52YXIgY2hlY2tJc09iamVjdCA9IC8qI19fUFVSRV9fKi9nZXRSZWZpbmVtZW50KGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICByZXR1cm4gaXNEZWZpbmVkKHJlc3BvbnNlKSAmJiB0eXBlb2YgcmVzcG9uc2UgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHJlc3BvbnNlKSA/IHJlc3BvbnNlIDogbnVsbDtcbn0pO1xudmFyIGNoZWNrSXNFcnJvcnMgPSAvKiNfX1BVUkVfXyovZ2V0UmVmaW5lbWVudChmdW5jdGlvbiAoZXJyb3JzKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGVycm9ycykgJiYgZXJyb3JzLmV2ZXJ5KGNoZWNrSXNTdHJpbmcpICYmIGNoZWNrSXNOb25FbXB0eUFycmF5KGVycm9ycykgPyBlcnJvcnMgOiBudWxsO1xufSk7XG52YXIgY2hlY2tJc0FwaUVycm9yID0gLyojX19QVVJFX18qL2dldFJlZmluZW1lbnQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIHJldHVybiBjaGVja0lzT2JqZWN0KHJlc3BvbnNlKSAmJiAnZXJyb3JzJyBpbiByZXNwb25zZSAmJiBjaGVja0lzRXJyb3JzKHJlc3BvbnNlLmVycm9ycykgPyB7XG4gICAgZXJyb3JzOiByZXNwb25zZS5lcnJvcnNcbiAgfSA6IG51bGw7XG59KTtcbnZhciBnZXRFcnJvckZvckJhZFN0YXR1c0NvZGUgPSBmdW5jdGlvbiBnZXRFcnJvckZvckJhZFN0YXR1c0NvZGUoanNvblJlc3BvbnNlKSB7XG4gIGlmIChjaGVja0lzQXBpRXJyb3IoanNvblJlc3BvbnNlKSkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IGpzb25SZXNwb25zZS5lcnJvcnMsXG4gICAgICBzb3VyY2U6ICdhcGknXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3JzOiBbJ1Jlc3BvbmRlZCB3aXRoIGEgc3RhdHVzIGNvZGUgb3V0c2lkZSB0aGUgMnh4IHJhbmdlLCBhbmQgdGhlIHJlc3BvbnNlIGJvZHkgaXMgbm90IHJlY29nbmlzYWJsZS4nXSxcbiAgICAgIHNvdXJjZTogJ2RlY29kaW5nJ1xuICAgIH07XG4gIH1cbn07XG52YXIgRGVjb2RpbmdFcnJvciA9IGZ1bmN0aW9uIERlY29kaW5nRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufTtcblxudmFyIENPTlRFTlRfVFlQRV9SRVNQT05TRV9IRUFERVIgPSAnY29udGVudC10eXBlJztcbnZhciBDT05URU5UX1RZUEVfSlNPTiA9ICdhcHBsaWNhdGlvbi9qc29uJztcblxudmFyIGNoZWNrSXNKc29uUmVzcG9uc2UgPSBmdW5jdGlvbiBjaGVja0lzSnNvblJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIHZhciBjb250ZW50VHlwZUhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KENPTlRFTlRfVFlQRV9SRVNQT05TRV9IRUFERVIpO1xuICByZXR1cm4gaXNEZWZpbmVkKGNvbnRlbnRUeXBlSGVhZGVyKSAmJiBwYXJzZShjb250ZW50VHlwZUhlYWRlcikudHlwZSA9PT0gQ09OVEVOVF9UWVBFX0pTT047XG59O1xuLyoqXHJcbiAqIE5vdGU6IHJlc3RyaWN0IHRoZSB0eXBlIG9mIEpTT04gdG8gYEFueUpzb25gIHNvIHRoYXQgYGFueWAgZG9lc24ndCBsZWFrIGRvd25zdHJlYW0uXHJcbiAqL1xuXG5cbnZhciBnZXRKc29uUmVzcG9uc2UgPSBmdW5jdGlvbiBnZXRKc29uUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgaWYgKGNoZWNrSXNKc29uUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChfZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcigndW5hYmxlIHRvIHBhcnNlIEpTT04gcmVzcG9uc2UuJyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IERlY29kaW5nRXJyb3IoJ2V4cGVjdGVkIEpTT04gcmVzcG9uc2UgZnJvbSBzZXJ2ZXIuJyk7XG4gIH1cbn07XG5cbnZhciBoYW5kbGVGZXRjaFJlc3BvbnNlID0gZnVuY3Rpb24gaGFuZGxlRmV0Y2hSZXNwb25zZShoYW5kbGVSZXNwb25zZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5vayA/IGhhbmRsZVJlc3BvbnNlKHtcbiAgICAgIHJlc3BvbnNlOiByZXNwb25zZVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGhhbmRsZWRSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmVzcG9uc2U6IGhhbmRsZWRSZXNwb25zZSxcbiAgICAgICAgb3JpZ2luYWxSZXNwb25zZTogcmVzcG9uc2VcbiAgICAgIH07XG4gICAgfSkgOiBnZXRKc29uUmVzcG9uc2UocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGpzb25SZXNwb25zZSkge1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH0sIGdldEVycm9yRm9yQmFkU3RhdHVzQ29kZShqc29uUmVzcG9uc2UpLCB7XG4gICAgICAgIG9yaWdpbmFsUmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgICB9KTtcbiAgICB9KSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIC8qKlxyXG4gICAgICAgKiBXZSB3YW50IHRvIHNlcGFyYXRlIGV4cGVjdGVkIGRlY29kaW5nIGVycm9ycyBmcm9tIHVua25vd24gb25lcy4gV2UgZG8gc28gYnkgdGhyb3dpbmcgYSBjdXN0b21cclxuICAgICAgICogYERlY29kaW5nRXJyb3JgIHdoZW5ldmVyIHdlIGVuY291bnRlciBvbmUgd2l0aGluIGBoYW5kbGVGZXRjaFJlc3BvbnNlYCBhbmQgY2F0Y2ggdGhlbSBhbGxcclxuICAgICAgICogaGVyZS4gVGhpcyBhbGxvd3MgdXMgdG8gZWFzaWx5IGhhbmRsZSBhbGwgb2YgdGhlc2UgZXJyb3JzIGF0IG9uY2UuIFVuZXhwZWN0ZWQgZXJyb3JzIGFyZSBub3RcclxuICAgICAgICogY2F1Z2h0LCBzbyB0aGF0IHRoZXkgYnViYmxlIHVwIGFuZCBmYWlsIGxvdWRseS5cclxuICAgICAgICpcclxuICAgICAgICogTm90ZTogSWRlYWxseSB3ZSdkIHVzZSBhbiBFaXRoZXIgdHlwZSwgYnV0IHRoaXMgZG9lcyB0aGUgam9iIHdpdGhvdXQgaW50cm9kdWNpbmcgZGVwZW5kZW5jaWVzXHJcbiAgICAgICAqIGxpa2UgYGZwLXRzYC5cclxuICAgICAgICovXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBEZWNvZGluZ0Vycm9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBzb3VyY2U6ICdkZWNvZGluZycsXG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgb3JpZ2luYWxSZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgZXJyb3JzOiBbZXJyb3IubWVzc2FnZV1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcbnZhciBjYXN0UmVzcG9uc2UgPSBmdW5jdGlvbiBjYXN0UmVzcG9uc2UoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciByZXNwb25zZSA9IF9yZWYucmVzcG9uc2U7XG4gICAgcmV0dXJuIGdldEpzb25SZXNwb25zZShyZXNwb25zZSk7XG4gIH07XG59O1xuXG52YXIgYWRkUXVlcnlUb1VybCA9IGZ1bmN0aW9uIGFkZFF1ZXJ5VG9VcmwocXVlcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh1cmwpIHtcbiAgICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlLZXkpIHtcbiAgICAgIHJldHVybiB1cmwuc2VhcmNoUGFyYW1zLnNldChxdWVyeUtleSwgcXVlcnlbcXVlcnlLZXldLnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuICB9O1xufTtcblxudmFyIGFkZFBhdGhuYW1lVG9VcmwgPSBmdW5jdGlvbiBhZGRQYXRobmFtZVRvVXJsKHBhdGhuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBleGlzdGluZyBwYXRobmFtZSwgdGhlIHZhbHVlIGlzIGAvYC4gQXBwZW5kaW5nIHdvdWxkIGdpdmUgdXMgYSBVUkwgd2l0aCB0d29cbiAgICAvLyBmb3J3YXJkIHNsYXNoZXMuIFRoaXMgaXMgd2h5IHdlIHJlcGxhY2UgdGhlIHZhbHVlIGluIHRoYXQgc2NlbmFyaW8uXG4gICAgaWYgKHVybC5wYXRobmFtZSA9PT0gJy8nKSB7XG4gICAgICB1cmwucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsLnBhdGhuYW1lICs9IHBhdGhuYW1lO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBidWlsZFVybCA9IGZ1bmN0aW9uIGJ1aWxkVXJsKF9yZWYpIHtcbiAgdmFyIHBhdGhuYW1lID0gX3JlZi5wYXRobmFtZSxcbiAgICAgIHF1ZXJ5ID0gX3JlZi5xdWVyeTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcGlVcmwpIHtcbiAgICB2YXIgdXJsID0gbmV3IFVSTChhcGlVcmwpO1xuICAgIGFkZFBhdGhuYW1lVG9VcmwocGF0aG5hbWUpKHVybCk7XG4gICAgYWRkUXVlcnlUb1VybChxdWVyeSkodXJsKTtcbiAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gIH07XG59O1xuXG52YXIgZ2V0UXVlcnlGcm9tU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gZ2V0UXVlcnlGcm9tU2VhcmNoUGFyYW1zKHNlYXJjaFBhcmFtcykge1xuICB2YXIgcXVlcnkgPSB7fTtcbiAgc2VhcmNoUGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBxdWVyeVtrZXldID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcXVlcnk7XG59O1xuXG52YXIgcGFyc2VRdWVyeUFuZFBhdGhuYW1lID0gZnVuY3Rpb24gcGFyc2VRdWVyeUFuZFBhdGhuYW1lKHVybCkge1xuICB2YXIgX1VSTCA9IG5ldyBVUkwodXJsKSxcbiAgICAgIHBhdGhuYW1lID0gX1VSTC5wYXRobmFtZSxcbiAgICAgIHNlYXJjaFBhcmFtcyA9IF9VUkwuc2VhcmNoUGFyYW1zO1xuXG4gIHZhciBxdWVyeSA9IGdldFF1ZXJ5RnJvbVNlYXJjaFBhcmFtcyhzZWFyY2hQYXJhbXMpO1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBwYXRobmFtZTogcGF0aG5hbWUgPT09ICcvJyA/IHVuZGVmaW5lZCA6IHBhdGhuYW1lXG4gIH07XG59O1xuXG4vKipcclxuICogaGVscGVyIHVzZWQgdG8gdHlwZS1jaGVjayB0aGUgYXJndW1lbnRzLCBhbmQgYWRkIGRlZmF1bHQgcGFyYW1zIGZvciBhbGwgcmVxdWVzdHNcclxuICovXG5cbnZhciBjcmVhdGVSZXF1ZXN0SGFuZGxlciA9IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYWRkaXRpb25hbEZldGNoT3B0aW9ucykge1xuICAgIGlmIChhZGRpdGlvbmFsRmV0Y2hPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgX2ZuID0gZm4oYSksXG4gICAgICAgIGhlYWRlcnMgPSBfZm4uaGVhZGVycyxcbiAgICAgICAgcXVlcnkgPSBfZm4ucXVlcnksXG4gICAgICAgIGJhc2VSZXFQYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfZm4sIFtcImhlYWRlcnNcIiwgXCJxdWVyeVwiXSk7XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGJhc2VSZXFQYXJhbXMsIGFkZGl0aW9uYWxGZXRjaE9wdGlvbnMsIHtcbiAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgIGhlYWRlcnM6IF9leHRlbmRzKHt9LCBoZWFkZXJzLCBhZGRpdGlvbmFsRmV0Y2hPcHRpb25zLmhlYWRlcnMpXG4gICAgfSk7XG4gIH07XG59O1xudmFyIG1ha2VFbmRwb2ludCA9IGZ1bmN0aW9uIG1ha2VFbmRwb2ludChlbmRwb2ludCkge1xuICByZXR1cm4gZW5kcG9pbnQ7XG59O1xudmFyIGluaXRNYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIGluaXRNYWtlUmVxdWVzdChfcmVmKSB7XG4gIHZhciBhY2Nlc3NLZXkgPSBfcmVmLmFjY2Vzc0tleSxcbiAgICAgIF9yZWYkYXBpVmVyc2lvbiA9IF9yZWYuYXBpVmVyc2lvbixcbiAgICAgIGFwaVZlcnNpb24gPSBfcmVmJGFwaVZlcnNpb24gPT09IHZvaWQgMCA/ICd2MScgOiBfcmVmJGFwaVZlcnNpb24sXG4gICAgICBfcmVmJGFwaVVybCA9IF9yZWYuYXBpVXJsLFxuICAgICAgYXBpVXJsID0gX3JlZiRhcGlVcmwgPT09IHZvaWQgMCA/ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20nIDogX3JlZiRhcGlVcmwsXG4gICAgICBnZW5lcmFsSGVhZGVycyA9IF9yZWYuaGVhZGVycyxcbiAgICAgIHByb3ZpZGVkRmV0Y2ggPSBfcmVmLmZldGNoLFxuICAgICAgZ2VuZXJhbEZldGNoT3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImFjY2Vzc0tleVwiLCBcImFwaVZlcnNpb25cIiwgXCJhcGlVcmxcIiwgXCJoZWFkZXJzXCIsIFwiZmV0Y2hcIl0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgaGFuZGxlUmVzcG9uc2UgPSBfcmVmMi5oYW5kbGVSZXNwb25zZSxcbiAgICAgICAgaGFuZGxlUmVxdWVzdCA9IF9yZWYyLmhhbmRsZVJlcXVlc3Q7XG4gICAgcmV0dXJuIGZsb3coaGFuZGxlUmVxdWVzdCwgZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICB2YXIgcGF0aG5hbWUgPSBfcmVmMy5wYXRobmFtZSxcbiAgICAgICAgICBxdWVyeSA9IF9yZWYzLnF1ZXJ5LFxuICAgICAgICAgIF9yZWYzJG1ldGhvZCA9IF9yZWYzLm1ldGhvZCxcbiAgICAgICAgICBtZXRob2QgPSBfcmVmMyRtZXRob2QgPT09IHZvaWQgMCA/ICdHRVQnIDogX3JlZjMkbWV0aG9kLFxuICAgICAgICAgIGVuZHBvaW50SGVhZGVycyA9IF9yZWYzLmhlYWRlcnMsXG4gICAgICAgICAgYm9keSA9IF9yZWYzLmJvZHksXG4gICAgICAgICAgc2lnbmFsID0gX3JlZjMuc2lnbmFsO1xuICAgICAgdmFyIHVybCA9IGJ1aWxkVXJsKHtcbiAgICAgICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgIH0pKGFwaVVybCk7XG5cbiAgICAgIHZhciBmZXRjaE9wdGlvbnMgPSBfZXh0ZW5kcyh7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBfZXh0ZW5kcyh7fSwgZ2VuZXJhbEhlYWRlcnMsIGVuZHBvaW50SGVhZGVycywge1xuICAgICAgICAgICdBY2NlcHQtVmVyc2lvbic6IGFwaVZlcnNpb25cbiAgICAgICAgfSwgaXNEZWZpbmVkKGFjY2Vzc0tleSkgPyB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJDbGllbnQtSUQgXCIgKyBhY2Nlc3NLZXlcbiAgICAgICAgfSA6IHt9KSxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgc2lnbmFsOiBzaWduYWxcbiAgICAgIH0sIGdlbmVyYWxGZXRjaE9wdGlvbnMpO1xuXG4gICAgICB2YXIgZmV0Y2hUb1VzZSA9IHByb3ZpZGVkRmV0Y2ggIT0gbnVsbCA/IHByb3ZpZGVkRmV0Y2ggOiBmZXRjaDtcbiAgICAgIHJldHVybiBmZXRjaFRvVXNlKHVybCwgZmV0Y2hPcHRpb25zKS50aGVuKGhhbmRsZUZldGNoUmVzcG9uc2UoaGFuZGxlUmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbnZhciBUT1RBTF9SRVNQT05TRV9IRUFERVIgPSAneC10b3RhbCc7XG5cbnZhciBnZXRUb3RhbEZyb21BcGlGZWVkUmVzcG9uc2UgPSBmdW5jdGlvbiBnZXRUb3RhbEZyb21BcGlGZWVkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgdmFyIHRvdGFsc1N0ciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFRPVEFMX1JFU1BPTlNFX0hFQURFUik7XG5cbiAgaWYgKGlzRGVmaW5lZCh0b3RhbHNTdHIpKSB7XG4gICAgdmFyIHRvdGFsID0gcGFyc2VJbnQodG90YWxzU3RyKTtcblxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRvdGFsKSkge1xuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcihcImV4cGVjdGVkIFwiICsgVE9UQUxfUkVTUE9OU0VfSEVBREVSICsgXCIgaGVhZGVyIHRvIGJlIHZhbGlkIGludGVnZXIuXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRGVjb2RpbmdFcnJvcihcImV4cGVjdGVkIFwiICsgVE9UQUxfUkVTUE9OU0VfSEVBREVSICsgXCIgaGVhZGVyIHRvIGV4aXN0LlwiKTtcbiAgfVxufTtcblxudmFyIGhhbmRsZUZlZWRSZXNwb25zZSA9IGZ1bmN0aW9uIGhhbmRsZUZlZWRSZXNwb25zZSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gX3JlZi5yZXNwb25zZTtcbiAgICByZXR1cm4gY2FzdFJlc3BvbnNlKCkoe1xuICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAgICAgdG90YWw6IGdldFRvdGFsRnJvbUFwaUZlZWRSZXNwb25zZShyZXNwb25zZSlcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59O1xuXG52YXIgZ2V0Q29sbGVjdGlvbnMgPSBmdW5jdGlvbiBnZXRDb2xsZWN0aW9ucyhjb2xsZWN0aW9uSWRzKSB7XG4gIHJldHVybiBpc0RlZmluZWQoY29sbGVjdGlvbklkcykgPyB7XG4gICAgY29sbGVjdGlvbnM6IGNvbGxlY3Rpb25JZHMuam9pbigpXG4gIH0gOiB7fTtcbn07XG52YXIgZ2V0VG9waWNzID0gZnVuY3Rpb24gZ2V0VG9waWNzKHRvcGljSWRzKSB7XG4gIHJldHVybiBpc0RlZmluZWQodG9waWNJZHMpID8ge1xuICAgIHRvcGljczogdG9waWNJZHMuam9pbigpXG4gIH0gOiB7fTtcbn07XG52YXIgZ2V0RmVlZFBhcmFtcyA9IGZ1bmN0aW9uIGdldEZlZWRQYXJhbXMoX3JlZikge1xuICB2YXIgcGFnZSA9IF9yZWYucGFnZSxcbiAgICAgIHBlclBhZ2UgPSBfcmVmLnBlclBhZ2UsXG4gICAgICBvcmRlckJ5ID0gX3JlZi5vcmRlckJ5O1xuICByZXR1cm4gY29tcGFjdERlZmluZWQoe1xuICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxuICAgIG9yZGVyX2J5OiBvcmRlckJ5LFxuICAgIHBhZ2U6IHBhZ2VcbiAgfSk7XG59O1xuXG52YXIgQ09MTEVDVElPTlNfUEFUSF9QUkVGSVggPSAnL2NvbGxlY3Rpb25zJztcbnZhciBnZXRQaG90b3MgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWYuY29sbGVjdGlvbklkO1xuICAgIHJldHVybiBDT0xMRUNUSU9OU19QQVRIX1BSRUZJWCArIFwiL1wiICsgY29sbGVjdGlvbklkICsgXCIvcGhvdG9zXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWYyLmNvbGxlY3Rpb25JZCxcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IF9yZWYyLm9yaWVudGF0aW9uLFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmMiwgW1wiY29sbGVjdGlvbklkXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIGNvbGxlY3Rpb25JZDogY29sbGVjdGlvbklkXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcyksIHtcbiAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmMykge1xuICAgIHZhciBjb2xsZWN0aW9uSWQgPSBfcmVmMy5jb2xsZWN0aW9uSWQ7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBjb2xsZWN0aW9uSWQ7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWY0LmNvbGxlY3Rpb25JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgbGlzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBDT0xMRUNUSU9OU19QQVRIX1BSRUZJWDtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKHBhZ2luYXRpb25QYXJhbXMpIHtcbiAgICAgIGlmIChwYWdpbmF0aW9uUGFyYW1zID09PSB2b2lkIDApIHtcbiAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcylcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFJlbGF0ZWQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmNSkge1xuICAgIHZhciBjb2xsZWN0aW9uSWQgPSBfcmVmNS5jb2xsZWN0aW9uSWQ7XG4gICAgcmV0dXJuIENPTExFQ1RJT05TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9yZWxhdGVkXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNikge1xuICAgICAgdmFyIGNvbGxlY3Rpb25JZCA9IF9yZWY2LmNvbGxlY3Rpb25JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uSWRcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG5cbnZhciBpbmRleCA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBnZXRQaG90b3M6IGdldFBob3RvcyxcbiAgZ2V0OiBnZXQsXG4gIGxpc3Q6IGxpc3QsXG4gIGdldFJlbGF0ZWQ6IGdldFJlbGF0ZWRcbn07XG5cbnZhciBQSE9UT1NfUEFUSF9QUkVGSVggPSAnL3Bob3Rvcyc7XG52YXIgbGlzdCQxID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9nZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVg7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgLy8gV3JhcHBlciB1c2VzIHR5cGUgdHJpY2sgdG8gYWxsb3cgMCBhcmdzXG4gICAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9wYXJhbXMpIHtcbiAgICAgIHJldHVybiBfZ2V0UGF0aG5hbWUoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChmZWVkUGFyYW1zKSB7XG4gICAgICBpZiAoZmVlZFBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGZlZWRQYXJhbXMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IFBIT1RPU19QQVRIX1BSRUZJWCxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKGdldEZlZWRQYXJhbXMoZmVlZFBhcmFtcykpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXQkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYpIHtcbiAgICB2YXIgcGhvdG9JZCA9IF9yZWYucGhvdG9JZDtcbiAgICByZXR1cm4gUEhPVE9TX1BBVEhfUFJFRklYICsgXCIvXCIgKyBwaG90b0lkO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBwaG90b0lkID0gX3JlZjIucGhvdG9JZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgcGhvdG9JZDogcGhvdG9JZFxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IHt9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXRTdGF0cyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9yZWYzKSB7XG4gICAgdmFyIHBob3RvSWQgPSBfcmVmMy5waG90b0lkO1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVggKyBcIi9cIiArIHBob3RvSWQgKyBcIi9zdGF0aXN0aWNzXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgZ2V0UGF0aG5hbWU6IGdldFBhdGhuYW1lLFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIHBob3RvSWQgPSBfcmVmNC5waG90b0lkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICBwaG90b0lkOiBwaG90b0lkXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeToge31cbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFJhbmRvbSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnZXRQYXRobmFtZSA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBQSE9UT1NfUEFUSF9QUkVGSVggKyBcIi9yYW5kb21cIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF90ZW1wKSB7XG4gICAgICB2YXIgX3JlZjUgPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcCxcbiAgICAgICAgICBjb2xsZWN0aW9uSWRzID0gX3JlZjUuY29sbGVjdGlvbklkcyxcbiAgICAgICAgICBjb250ZW50RmlsdGVyID0gX3JlZjUuY29udGVudEZpbHRlcixcbiAgICAgICAgICB0b3BpY0lkcyA9IF9yZWY1LnRvcGljSWRzLFxuICAgICAgICAgIHF1ZXJ5UGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjUsIFtcImNvbGxlY3Rpb25JZHNcIiwgXCJjb250ZW50RmlsdGVyXCIsIFwidG9waWNJZHNcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBxdWVyeVBhcmFtcywge1xuICAgICAgICAgIGNvbnRlbnRfZmlsdGVyOiBjb250ZW50RmlsdGVyXG4gICAgICAgIH0sIGdldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25JZHMpLCBnZXRUb3BpY3ModG9waWNJZHMpKSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEF2b2lkIHJlc3BvbnNlIGNhY2hpbmdcclxuICAgICAgICAgICAqL1xuICAgICAgICAgICdjYWNoZS1jb250cm9sJzogJ25vLWNhY2hlJ1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciB0cmFja0Rvd25sb2FkID0ge1xuICBoYW5kbGVSZXF1ZXN0OiAvKiNfX1BVUkVfXyovY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgdmFyIGRvd25sb2FkTG9jYXRpb24gPSBfcmVmNi5kb3dubG9hZExvY2F0aW9uO1xuXG4gICAgdmFyIF9wYXJzZVF1ZXJ5QW5kUGF0aG5hbSA9IHBhcnNlUXVlcnlBbmRQYXRobmFtZShkb3dubG9hZExvY2F0aW9uKSxcbiAgICAgICAgcGF0aG5hbWUgPSBfcGFyc2VRdWVyeUFuZFBhdGhuYW0ucGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5ID0gX3BhcnNlUXVlcnlBbmRQYXRobmFtLnF1ZXJ5O1xuXG4gICAgaWYgKCFpc0RlZmluZWQocGF0aG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBwYXRobmFtZSBmcm9tIHVybC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKHF1ZXJ5KVxuICAgIH07XG4gIH0pLFxuICBoYW5kbGVSZXNwb25zZTogLyojX19QVVJFX18qL2Nhc3RSZXNwb25zZSgpXG59O1xuXG52YXIgaW5kZXgkMSA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBsaXN0OiBsaXN0JDEsXG4gIGdldDogZ2V0JDEsXG4gIGdldFN0YXRzOiBnZXRTdGF0cyxcbiAgZ2V0UmFuZG9tOiBnZXRSYW5kb20sXG4gIHRyYWNrRG93bmxvYWQ6IHRyYWNrRG93bmxvYWRcbn07XG5cbnZhciBTRUFSQ0hfUEFUSF9QUkVGSVggPSBcIi9zZWFyY2hcIjtcbnZhciBnZXRQaG90b3MkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZSgpIHtcbiAgICByZXR1cm4gU0VBUkNIX1BBVEhfUFJFRklYICsgXCIvcGhvdG9zXCI7XG4gIH07XG5cbiAgcmV0dXJuIG1ha2VFbmRwb2ludCh7XG4gICAgLy8gV3JhcHBlciB1c2VzIHR5cGUgdHJpY2sgdG8gYWxsb3cgMCBhcmdzXG4gICAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uIGdldFBhdGhuYW1lKF9wYXJhbXMpIHtcbiAgICAgIHJldHVybiBfZ2V0UGF0aG5hbWUoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgcXVlcnkgPSBfcmVmLnF1ZXJ5LFxuICAgICAgICAgIHBhZ2UgPSBfcmVmLnBhZ2UsXG4gICAgICAgICAgcGVyUGFnZSA9IF9yZWYucGVyUGFnZSxcbiAgICAgICAgICBvcmRlckJ5ID0gX3JlZi5vcmRlckJ5LFxuICAgICAgICAgIGNvbGxlY3Rpb25JZHMgPSBfcmVmLmNvbGxlY3Rpb25JZHMsXG4gICAgICAgICAgbGFuZyA9IF9yZWYubGFuZyxcbiAgICAgICAgICBjb250ZW50RmlsdGVyID0gX3JlZi5jb250ZW50RmlsdGVyLFxuICAgICAgICAgIGZpbHRlcnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJxdWVyeVwiLCBcInBhZ2VcIiwgXCJwZXJQYWdlXCIsIFwib3JkZXJCeVwiLCBcImNvbGxlY3Rpb25JZHNcIiwgXCJsYW5nXCIsIFwiY29udGVudEZpbHRlclwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBfZ2V0UGF0aG5hbWUoKSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHtcbiAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgY29udGVudF9maWx0ZXI6IGNvbnRlbnRGaWx0ZXIsXG4gICAgICAgICAgbGFuZzogbGFuZyxcbiAgICAgICAgICBvcmRlcl9ieTogb3JkZXJCeVxuICAgICAgICB9LCBnZXRGZWVkUGFyYW1zKHtcbiAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgIHBlclBhZ2U6IHBlclBhZ2VcbiAgICAgICAgfSksIGdldENvbGxlY3Rpb25zKGNvbGxlY3Rpb25JZHMpLCBmaWx0ZXJzKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldENvbGxlY3Rpb25zJDEgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgX2dldFBhdGhuYW1lMiA9IGZ1bmN0aW9uIGdldFBhdGhuYW1lKCkge1xuICAgIHJldHVybiBTRUFSQ0hfUEFUSF9QUkVGSVggKyBcIi9jb2xsZWN0aW9uc1wiO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIC8vIFdyYXBwZXIgdXNlcyB0eXBlIHRyaWNrIHRvIGFsbG93IDAgYXJnc1xuICAgIGdldFBhdGhuYW1lOiBmdW5jdGlvbiBnZXRQYXRobmFtZShfcGFyYW1zKSB7XG4gICAgICByZXR1cm4gX2dldFBhdGhuYW1lMigpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgcXVlcnkgPSBfcmVmMi5xdWVyeSxcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjIsIFtcInF1ZXJ5XCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IF9nZXRQYXRobmFtZTIoKSxcbiAgICAgICAgcXVlcnk6IF9leHRlbmRzKHtcbiAgICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgICAgfSwgZ2V0RmVlZFBhcmFtcyhwYWdpbmF0aW9uUGFyYW1zKSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGNhc3RSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldFVzZXJzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9nZXRQYXRobmFtZTMgPSBmdW5jdGlvbiBnZXRQYXRobmFtZSgpIHtcbiAgICByZXR1cm4gU0VBUkNIX1BBVEhfUFJFRklYICsgXCIvdXNlcnNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICAvLyBXcmFwcGVyIHVzZXMgdHlwZSB0cmljayB0byBhbGxvdyAwIGFyZ3NcbiAgICBnZXRQYXRobmFtZTogZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3BhcmFtcykge1xuICAgICAgcmV0dXJuIF9nZXRQYXRobmFtZTMoKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlcXVlc3Q6IGNyZWF0ZVJlcXVlc3RIYW5kbGVyKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgdmFyIHF1ZXJ5ID0gX3JlZjMucXVlcnksXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYzLCBbXCJxdWVyeVwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBfZ2V0UGF0aG5hbWUzKCksXG4gICAgICAgIHF1ZXJ5OiBfZXh0ZW5kcyh7XG4gICAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICAgIH0sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcykpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBjYXN0UmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4JDIgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkMSxcbiAgZ2V0Q29sbGVjdGlvbnM6IGdldENvbGxlY3Rpb25zJDEsXG4gIGdldFVzZXJzOiBnZXRVc2Vyc1xufTtcblxudmFyIFVTRVJTX1BBVEhfUFJFRklYID0gJy91c2Vycyc7XG52YXIgZ2V0JDIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmKSB7XG4gICAgdmFyIHVzZXJuYW1lID0gX3JlZi51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lO1xuICB9O1xuXG4gIHJldHVybiBtYWtlRW5kcG9pbnQoe1xuICAgIGdldFBhdGhuYW1lOiBnZXRQYXRobmFtZSxcbiAgICBoYW5kbGVSZXF1ZXN0OiBjcmVhdGVSZXF1ZXN0SGFuZGxlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IF9yZWYyLnVzZXJuYW1lO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiB7fVxuICAgICAgfTtcbiAgICB9KSxcbiAgICBoYW5kbGVSZXNwb25zZTogY2FzdFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG52YXIgZ2V0UGhvdG9zJDIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiBnZXRQYXRobmFtZShfcmVmMykge1xuICAgIHZhciB1c2VybmFtZSA9IF9yZWYzLnVzZXJuYW1lO1xuICAgIHJldHVybiBVU0VSU19QQVRIX1BSRUZJWCArIFwiL1wiICsgdXNlcm5hbWUgKyBcIi9waG90b3NcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNC51c2VybmFtZSxcbiAgICAgICAgICBzdGF0cyA9IF9yZWY0LnN0YXRzLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjQub3JpZW50YXRpb24sXG4gICAgICAgICAgcGFnaW5hdGlvblBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY0LCBbXCJ1c2VybmFtZVwiLCBcInN0YXRzXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxuICAgICAgICB9KSxcbiAgICAgICAgcXVlcnk6IGNvbXBhY3REZWZpbmVkKF9leHRlbmRzKHt9LCBnZXRGZWVkUGFyYW1zKHBhZ2luYXRpb25QYXJhbXMpLCB7XG4gICAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uLFxuICAgICAgICAgIHN0YXRzOiBzdGF0c1xuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSksXG4gICAgaGFuZGxlUmVzcG9uc2U6IGhhbmRsZUZlZWRSZXNwb25zZSgpXG4gIH0pO1xufSgpO1xudmFyIGdldExpa2VzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZjUpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNS51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lICsgXCIvbGlrZXNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNi51c2VybmFtZSxcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IF9yZWY2Lm9yaWVudGF0aW9uLFxuICAgICAgICAgIHBhZ2luYXRpb25QYXJhbXMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmNiwgW1widXNlcm5hbWVcIiwgXCJvcmllbnRhdGlvblwiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhuYW1lOiBnZXRQYXRobmFtZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29tcGFjdERlZmluZWQoX2V4dGVuZHMoe30sIGdldEZlZWRQYXJhbXMocGFnaW5hdGlvblBhcmFtcyksIHtcbiAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcbnZhciBnZXRDb2xsZWN0aW9ucyQyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdldFBhdGhuYW1lID0gZnVuY3Rpb24gZ2V0UGF0aG5hbWUoX3JlZjcpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSBfcmVmNy51c2VybmFtZTtcbiAgICByZXR1cm4gVVNFUlNfUEFUSF9QUkVGSVggKyBcIi9cIiArIHVzZXJuYW1lICsgXCIvY29sbGVjdGlvbnNcIjtcbiAgfTtcblxuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogY3JlYXRlUmVxdWVzdEhhbmRsZXIoZnVuY3Rpb24gKF9yZWY4KSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBfcmVmOC51c2VybmFtZSxcbiAgICAgICAgICBwYWdpbmF0aW9uUGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjgsIFtcInVzZXJuYW1lXCJdKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6IGdldFBhdGhuYW1lKHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBnZXRGZWVkUGFyYW1zKHBhZ2luYXRpb25QYXJhbXMpXG4gICAgICB9O1xuICAgIH0pLFxuICAgIGhhbmRsZVJlc3BvbnNlOiBoYW5kbGVGZWVkUmVzcG9uc2UoKVxuICB9KTtcbn0oKTtcblxudmFyIGluZGV4JDMgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgZ2V0OiBnZXQkMixcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkMixcbiAgZ2V0TGlrZXM6IGdldExpa2VzLFxuICBnZXRDb2xsZWN0aW9uczogZ2V0Q29sbGVjdGlvbnMkMlxufTtcblxudmFyIEJBU0VfVE9QSUNfUEFUSCA9ICcvdG9waWNzJztcblxudmFyIGdldFRvcGljUGF0aCA9IGZ1bmN0aW9uIGdldFRvcGljUGF0aChfcmVmKSB7XG4gIHZhciB0b3BpY0lkT3JTbHVnID0gX3JlZi50b3BpY0lkT3JTbHVnO1xuICByZXR1cm4gQkFTRV9UT1BJQ19QQVRIICsgXCIvXCIgKyB0b3BpY0lkT3JTbHVnO1xufTtcblxudmFyIGxpc3QkMiA9IC8qI19fUFVSRV9fKi9tYWtlRW5kcG9pbnQoe1xuICBnZXRQYXRobmFtZTogZ2V0VG9waWNQYXRoLFxuICBoYW5kbGVSZXF1ZXN0OiBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KF9yZWYyKSB7XG4gICAgdmFyIHBhZ2UgPSBfcmVmMi5wYWdlLFxuICAgICAgICBwZXJQYWdlID0gX3JlZjIucGVyUGFnZSxcbiAgICAgICAgb3JkZXJCeSA9IF9yZWYyLm9yZGVyQnksXG4gICAgICAgIHRvcGljSWRzT3JTbHVncyA9IF9yZWYyLnRvcGljSWRzT3JTbHVncztcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IEJBU0VfVE9QSUNfUEFUSCxcbiAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyh7XG4gICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgIHBlclBhZ2U6IHBlclBhZ2VcbiAgICAgIH0pLCB7XG4gICAgICAgIGlkczogdG9waWNJZHNPclNsdWdzID09IG51bGwgPyB2b2lkIDAgOiB0b3BpY0lkc09yU2x1Z3Muam9pbignLCcpLFxuICAgICAgICBvcmRlcl9ieTogb3JkZXJCeVxuICAgICAgfSkpXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlUmVzcG9uc2U6IC8qI19fUFVSRV9fKi9oYW5kbGVGZWVkUmVzcG9uc2UoKVxufSk7XG52YXIgZ2V0JDMgPSAvKiNfX1BVUkVfXyovbWFrZUVuZHBvaW50KHtcbiAgZ2V0UGF0aG5hbWU6IGdldFRvcGljUGF0aCxcbiAgaGFuZGxlUmVxdWVzdDogZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChfcmVmMykge1xuICAgIHZhciB0b3BpY0lkT3JTbHVnID0gX3JlZjMudG9waWNJZE9yU2x1ZztcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IGdldFRvcGljUGF0aCh7XG4gICAgICAgIHRvcGljSWRPclNsdWc6IHRvcGljSWRPclNsdWdcbiAgICAgIH0pLFxuICAgICAgcXVlcnk6IHt9XG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlUmVzcG9uc2U6IC8qI19fUFVSRV9fKi9jYXN0UmVzcG9uc2UoKVxufSk7XG52YXIgZ2V0UGhvdG9zJDMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2V0UGF0aG5hbWUgPSAvKiNfX1BVUkVfXyovZmxvdyhnZXRUb3BpY1BhdGgsIGZ1bmN0aW9uICh0b3BpY1BhdGgpIHtcbiAgICByZXR1cm4gdG9waWNQYXRoICsgXCIvcGhvdG9zXCI7XG4gIH0pO1xuICByZXR1cm4gbWFrZUVuZHBvaW50KHtcbiAgICBnZXRQYXRobmFtZTogZ2V0UGF0aG5hbWUsXG4gICAgaGFuZGxlUmVxdWVzdDogZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChfcmVmNCkge1xuICAgICAgdmFyIHRvcGljSWRPclNsdWcgPSBfcmVmNC50b3BpY0lkT3JTbHVnLFxuICAgICAgICAgIG9yaWVudGF0aW9uID0gX3JlZjQub3JpZW50YXRpb24sXG4gICAgICAgICAgZmVlZFBhcmFtcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWY0LCBbXCJ0b3BpY0lkT3JTbHVnXCIsIFwib3JpZW50YXRpb25cIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogZ2V0UGF0aG5hbWUoe1xuICAgICAgICAgIHRvcGljSWRPclNsdWc6IHRvcGljSWRPclNsdWdcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBjb21wYWN0RGVmaW5lZChfZXh0ZW5kcyh7fSwgZ2V0RmVlZFBhcmFtcyhmZWVkUGFyYW1zKSwge1xuICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxuICAgICAgICB9KSlcbiAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVSZXNwb25zZTogaGFuZGxlRmVlZFJlc3BvbnNlKClcbiAgfSk7XG59KCk7XG5cbnZhciBpbmRleCQ0ID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGxpc3Q6IGxpc3QkMixcbiAgZ2V0OiBnZXQkMyxcbiAgZ2V0UGhvdG9zOiBnZXRQaG90b3MkM1xufTtcblxudmFyIHRyYWNrTm9uSG90TGlua2VkUGhvdG9WaWV3ID0gZnVuY3Rpb24gdHJhY2tOb25Ib3RMaW5rZWRQaG90b1ZpZXcoX3JlZikge1xuICB2YXIgYXBwSWQgPSBfcmVmLmFwcElkO1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHBob3RvSWQgPSBfcmVmMi5waG90b0lkO1xuICAgIHZhciBpZHMgPSAhQXJyYXkuaXNBcnJheShwaG90b0lkKSA/IFtwaG90b0lkXSA6IHBob3RvSWQ7XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA+IDIwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgdHJhY2sgbW9yZSB0aGFuIDIwIHBob3RvcyBhdCBvbmNlLiBQbGVhc2UgdHJ5IGFnYWluIHdpdGggZmV3ZXIgcGhvdG9zLicpO1xuICAgIH1cblxuICAgIHJldHVybiBmZXRjaChcInZpZXdzLnVuc3BsYXNoLmNvbS92P3Bob3RvX2lkPVwiICsgaWRzLmpvaW4oKSArIFwiJmFwcF9pZD1cIiArIGFwcElkKTtcbiAgfTtcbn07XG5cblxuXG52YXIgaW50ZXJuYWxzID0ge1xuICBfX3Byb3RvX186IG51bGwsXG4gIGNvbGxlY3Rpb25zOiBpbmRleCxcbiAgcGhvdG9zOiBpbmRleCQxLFxuICBzZWFyY2g6IGluZGV4JDIsXG4gIHVzZXJzOiBpbmRleCQzLFxuICB0b3BpY3M6IGluZGV4JDQsXG4gIHRyYWNrTm9uSG90TGlua2VkUGhvdG9WaWV3OiB0cmFja05vbkhvdExpbmtlZFBob3RvVmlld1xufTtcblxudmFyIExhbmd1YWdlO1xuXG4oZnVuY3Rpb24gKExhbmd1YWdlKSB7XG4gIExhbmd1YWdlW1wiQWZyaWthYW5zXCJdID0gXCJhZlwiO1xuICBMYW5ndWFnZVtcIkFtaGFyaWNcIl0gPSBcImFtXCI7XG4gIExhbmd1YWdlW1wiQXJhYmljXCJdID0gXCJhclwiO1xuICBMYW5ndWFnZVtcIkF6ZXJiYWlqYW5pXCJdID0gXCJhelwiO1xuICBMYW5ndWFnZVtcIkJlbGFydXNpYW5cIl0gPSBcImJlXCI7XG4gIExhbmd1YWdlW1wiQnVsZ2FyaWFuXCJdID0gXCJiZ1wiO1xuICBMYW5ndWFnZVtcIkJlbmdhbGlcIl0gPSBcImJuXCI7XG4gIExhbmd1YWdlW1wiQm9zbmlhblwiXSA9IFwiYnNcIjtcbiAgTGFuZ3VhZ2VbXCJDYXRhbGFuXCJdID0gXCJjYVwiO1xuICBMYW5ndWFnZVtcIkNlYnVhbm9cIl0gPSBcImNlYlwiO1xuICBMYW5ndWFnZVtcIkNvcnNpY2FuXCJdID0gXCJjb1wiO1xuICBMYW5ndWFnZVtcIkN6ZWNoXCJdID0gXCJjc1wiO1xuICBMYW5ndWFnZVtcIldlbHNoXCJdID0gXCJjeVwiO1xuICBMYW5ndWFnZVtcIkRhbmlzaFwiXSA9IFwiZGFcIjtcbiAgTGFuZ3VhZ2VbXCJHZXJtYW5cIl0gPSBcImRlXCI7XG4gIExhbmd1YWdlW1wiR3JlZWtcIl0gPSBcImVsXCI7XG4gIExhbmd1YWdlW1wiRW5nbGlzaFwiXSA9IFwiZW5cIjtcbiAgTGFuZ3VhZ2VbXCJFc3BlcmFudG9cIl0gPSBcImVvXCI7XG4gIExhbmd1YWdlW1wiU3BhbmlzaFwiXSA9IFwiZXNcIjtcbiAgTGFuZ3VhZ2VbXCJFc3RvbmlhblwiXSA9IFwiZXRcIjtcbiAgTGFuZ3VhZ2VbXCJCYXNxdWVcIl0gPSBcImV1XCI7XG4gIExhbmd1YWdlW1wiUGVyc2lhblwiXSA9IFwiZmFcIjtcbiAgTGFuZ3VhZ2VbXCJGaW5uaXNoXCJdID0gXCJmaVwiO1xuICBMYW5ndWFnZVtcIkZyZW5jaFwiXSA9IFwiZnJcIjtcbiAgTGFuZ3VhZ2VbXCJGcmlzaWFuXCJdID0gXCJmeVwiO1xuICBMYW5ndWFnZVtcIklyaXNoXCJdID0gXCJnYVwiO1xuICBMYW5ndWFnZVtcIlNjb3RzR2FlbGljXCJdID0gXCJnZFwiO1xuICBMYW5ndWFnZVtcIkdhbGljaWFuXCJdID0gXCJnbFwiO1xuICBMYW5ndWFnZVtcIkd1amFyYXRpXCJdID0gXCJndVwiO1xuICBMYW5ndWFnZVtcIkhhdXNhXCJdID0gXCJoYVwiO1xuICBMYW5ndWFnZVtcIkhhd2FpaWFuXCJdID0gXCJoYXdcIjtcbiAgTGFuZ3VhZ2VbXCJIaW5kaVwiXSA9IFwiaGlcIjtcbiAgTGFuZ3VhZ2VbXCJIbW9uZ1wiXSA9IFwiaG1uXCI7XG4gIExhbmd1YWdlW1wiQ3JvYXRpYW5cIl0gPSBcImhyXCI7XG4gIExhbmd1YWdlW1wiSGFpdGlhbkNyZW9sZVwiXSA9IFwiaHRcIjtcbiAgTGFuZ3VhZ2VbXCJIdW5nYXJpYW5cIl0gPSBcImh1XCI7XG4gIExhbmd1YWdlW1wiQXJtZW5pYW5cIl0gPSBcImh5XCI7XG4gIExhbmd1YWdlW1wiSW5kb25lc2lhblwiXSA9IFwiaWRcIjtcbiAgTGFuZ3VhZ2VbXCJJZ2JvXCJdID0gXCJpZ1wiO1xuICBMYW5ndWFnZVtcIkljZWxhbmRpY1wiXSA9IFwiaXNcIjtcbiAgTGFuZ3VhZ2VbXCJJdGFsaWFuXCJdID0gXCJpdFwiO1xuICBMYW5ndWFnZVtcIkhlYnJld1wiXSA9IFwiaXdcIjtcbiAgTGFuZ3VhZ2VbXCJKYXBhbmVzZVwiXSA9IFwiamFcIjtcbiAgTGFuZ3VhZ2VbXCJKYXZhbmVzZVwiXSA9IFwiandcIjtcbiAgTGFuZ3VhZ2VbXCJHZW9yZ2lhblwiXSA9IFwia2FcIjtcbiAgTGFuZ3VhZ2VbXCJLYXpha2hcIl0gPSBcImtrXCI7XG4gIExhbmd1YWdlW1wiS2htZXJcIl0gPSBcImttXCI7XG4gIExhbmd1YWdlW1wiS2FubmFkYVwiXSA9IFwia25cIjtcbiAgTGFuZ3VhZ2VbXCJLb3JlYW5cIl0gPSBcImtvXCI7XG4gIExhbmd1YWdlW1wiS3VyZGlzaFwiXSA9IFwia3VcIjtcbiAgTGFuZ3VhZ2VbXCJLeXJneXpcIl0gPSBcImt5XCI7XG4gIExhbmd1YWdlW1wiTGF0aW5cIl0gPSBcImxhXCI7XG4gIExhbmd1YWdlW1wiTHV4ZW1ib3VyZ2lzaFwiXSA9IFwibGJcIjtcbiAgTGFuZ3VhZ2VbXCJMYW9cIl0gPSBcImxvXCI7XG4gIExhbmd1YWdlW1wiTGl0aHVhbmlhblwiXSA9IFwibHRcIjtcbiAgTGFuZ3VhZ2VbXCJMYXR2aWFuXCJdID0gXCJsdlwiO1xuICBMYW5ndWFnZVtcIk1hbGFnYXN5XCJdID0gXCJtZ1wiO1xuICBMYW5ndWFnZVtcIk1hb3JpXCJdID0gXCJtaVwiO1xuICBMYW5ndWFnZVtcIk1hY2Vkb25pYW5cIl0gPSBcIm1rXCI7XG4gIExhbmd1YWdlW1wiTWFsYXlhbGFtXCJdID0gXCJtbFwiO1xuICBMYW5ndWFnZVtcIk1vbmdvbGlhblwiXSA9IFwibW5cIjtcbiAgTGFuZ3VhZ2VbXCJNYXJhdGhpXCJdID0gXCJtclwiO1xuICBMYW5ndWFnZVtcIk1hbGF5XCJdID0gXCJtc1wiO1xuICBMYW5ndWFnZVtcIk1hbHRlc2VcIl0gPSBcIm10XCI7XG4gIExhbmd1YWdlW1wiTXlhbm1hclwiXSA9IFwibXlcIjtcbiAgTGFuZ3VhZ2VbXCJOZXBhbGlcIl0gPSBcIm5lXCI7XG4gIExhbmd1YWdlW1wiRHV0Y2hcIl0gPSBcIm5sXCI7XG4gIExhbmd1YWdlW1wiTm9yd2VnaWFuXCJdID0gXCJub1wiO1xuICBMYW5ndWFnZVtcIk55YW5qYVwiXSA9IFwibnlcIjtcbiAgTGFuZ3VhZ2VbXCJPcml5YVwiXSA9IFwib3JcIjtcbiAgTGFuZ3VhZ2VbXCJQdW5qYWJpXCJdID0gXCJwYVwiO1xuICBMYW5ndWFnZVtcIlBvbGlzaFwiXSA9IFwicGxcIjtcbiAgTGFuZ3VhZ2VbXCJQYXNodG9cIl0gPSBcInBzXCI7XG4gIExhbmd1YWdlW1wiUG9ydHVndWVzZVwiXSA9IFwicHRcIjtcbiAgTGFuZ3VhZ2VbXCJSb21hbmlhblwiXSA9IFwicm9cIjtcbiAgTGFuZ3VhZ2VbXCJSdXNzaWFuXCJdID0gXCJydVwiO1xuICBMYW5ndWFnZVtcIktpbnlhcndhbmRhXCJdID0gXCJyd1wiO1xuICBMYW5ndWFnZVtcIlNpbmRoaVwiXSA9IFwic2RcIjtcbiAgTGFuZ3VhZ2VbXCJTaW5oYWxhXCJdID0gXCJzaVwiO1xuICBMYW5ndWFnZVtcIlNsb3Zha1wiXSA9IFwic2tcIjtcbiAgTGFuZ3VhZ2VbXCJTbG92ZW5pYW5cIl0gPSBcInNsXCI7XG4gIExhbmd1YWdlW1wiU2Ftb2FuXCJdID0gXCJzbVwiO1xuICBMYW5ndWFnZVtcIlNob25hXCJdID0gXCJzblwiO1xuICBMYW5ndWFnZVtcIlNvbWFsaVwiXSA9IFwic29cIjtcbiAgTGFuZ3VhZ2VbXCJBbGJhbmlhblwiXSA9IFwic3FcIjtcbiAgTGFuZ3VhZ2VbXCJTZXJiaWFuXCJdID0gXCJzclwiO1xuICBMYW5ndWFnZVtcIlNlc290aG9cIl0gPSBcInN0XCI7XG4gIExhbmd1YWdlW1wiU3VuZGFuZXNlXCJdID0gXCJzdVwiO1xuICBMYW5ndWFnZVtcIlN3ZWRpc2hcIl0gPSBcInN2XCI7XG4gIExhbmd1YWdlW1wiU3dhaGlsaVwiXSA9IFwic3dcIjtcbiAgTGFuZ3VhZ2VbXCJUYW1pbFwiXSA9IFwidGFcIjtcbiAgTGFuZ3VhZ2VbXCJUZWx1Z3VcIl0gPSBcInRlXCI7XG4gIExhbmd1YWdlW1wiVGFqaWtcIl0gPSBcInRnXCI7XG4gIExhbmd1YWdlW1wiVGhhaVwiXSA9IFwidGhcIjtcbiAgTGFuZ3VhZ2VbXCJUdXJrbWVuXCJdID0gXCJ0a1wiO1xuICBMYW5ndWFnZVtcIkZpbGlwaW5vXCJdID0gXCJ0bFwiO1xuICBMYW5ndWFnZVtcIlR1cmtpc2hcIl0gPSBcInRyXCI7XG4gIExhbmd1YWdlW1wiVGF0YXJcIl0gPSBcInR0XCI7XG4gIExhbmd1YWdlW1wiVWlnaHVyXCJdID0gXCJ1Z1wiO1xuICBMYW5ndWFnZVtcIlVrcmFpbmlhblwiXSA9IFwidWtcIjtcbiAgTGFuZ3VhZ2VbXCJVcmR1XCJdID0gXCJ1clwiO1xuICBMYW5ndWFnZVtcIlV6YmVrXCJdID0gXCJ1elwiO1xuICBMYW5ndWFnZVtcIlZpZXRuYW1lc2VcIl0gPSBcInZpXCI7XG4gIExhbmd1YWdlW1wiWGhvc2FcIl0gPSBcInhoXCI7XG4gIExhbmd1YWdlW1wiWWlkZGlzaFwiXSA9IFwieWlcIjtcbiAgTGFuZ3VhZ2VbXCJZb3J1YmFcIl0gPSBcInlvXCI7XG4gIExhbmd1YWdlW1wiQ2hpbmVzZVNpbXBsaWZpZWRcIl0gPSBcInpoXCI7XG4gIExhbmd1YWdlW1wiQ2hpbmVzZVRyYWRpdGlvbmFsXCJdID0gXCJ6aC1UV1wiO1xuICBMYW5ndWFnZVtcIlp1bHVcIl0gPSBcInp1XCI7XG59KShMYW5ndWFnZSB8fCAoTGFuZ3VhZ2UgPSB7fSkpO1xuXG52YXIgT3JkZXJCeTtcblxuKGZ1bmN0aW9uIChPcmRlckJ5KSB7XG4gIE9yZGVyQnlbXCJMQVRFU1RcIl0gPSBcImxhdGVzdFwiO1xuICBPcmRlckJ5W1wiUE9QVUxBUlwiXSA9IFwicG9wdWxhclwiO1xuICBPcmRlckJ5W1wiVklFV1NcIl0gPSBcInZpZXdzXCI7XG4gIE9yZGVyQnlbXCJET1dOTE9BRFNcIl0gPSBcImRvd25sb2Fkc1wiO1xuICBPcmRlckJ5W1wiT0xERVNUXCJdID0gXCJvbGRlc3RcIjtcbn0pKE9yZGVyQnkgfHwgKE9yZGVyQnkgPSB7fSkpO1xuXG52YXIgY3JlYXRlQXBpID0gLyojX19QVVJFX18qL2Zsb3coaW5pdE1ha2VSZXF1ZXN0LCBmdW5jdGlvbiAobWFrZVJlcXVlc3QpIHtcbiAgcmV0dXJuIHtcbiAgICBwaG90b3M6IHtcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDEpLFxuICAgICAgbGlzdDogbWFrZVJlcXVlc3QobGlzdCQxKSxcbiAgICAgIGdldFN0YXRzOiBtYWtlUmVxdWVzdChnZXRTdGF0cyksXG4gICAgICBnZXRSYW5kb206IG1ha2VSZXF1ZXN0KGdldFJhbmRvbSksXG4gICAgICB0cmFja0Rvd25sb2FkOiBtYWtlUmVxdWVzdCh0cmFja0Rvd25sb2FkKVxuICAgIH0sXG4gICAgdXNlcnM6IHtcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zJDIpLFxuICAgICAgZ2V0Q29sbGVjdGlvbnM6IG1ha2VSZXF1ZXN0KGdldENvbGxlY3Rpb25zJDIpLFxuICAgICAgZ2V0TGlrZXM6IG1ha2VSZXF1ZXN0KGdldExpa2VzKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDIpXG4gICAgfSxcbiAgICBzZWFyY2g6IHtcbiAgICAgIGdldENvbGxlY3Rpb25zOiBtYWtlUmVxdWVzdChnZXRDb2xsZWN0aW9ucyQxKSxcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zJDEpLFxuICAgICAgZ2V0VXNlcnM6IG1ha2VSZXF1ZXN0KGdldFVzZXJzKVxuICAgIH0sXG4gICAgY29sbGVjdGlvbnM6IHtcbiAgICAgIGdldFBob3RvczogbWFrZVJlcXVlc3QoZ2V0UGhvdG9zKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0KSxcbiAgICAgIGxpc3Q6IG1ha2VSZXF1ZXN0KGxpc3QpLFxuICAgICAgZ2V0UmVsYXRlZDogbWFrZVJlcXVlc3QoZ2V0UmVsYXRlZClcbiAgICB9LFxuICAgIHRvcGljczoge1xuICAgICAgbGlzdDogbWFrZVJlcXVlc3QobGlzdCQyKSxcbiAgICAgIGdldDogbWFrZVJlcXVlc3QoZ2V0JDMpLFxuICAgICAgZ2V0UGhvdG9zOiBtYWtlUmVxdWVzdChnZXRQaG90b3MkMylcbiAgICB9XG4gIH07XG59KTtcblxuZXhwb3J0IHsgTGFuZ3VhZ2UsIE9yZGVyQnksIGludGVybmFscyBhcyBfaW50ZXJuYWxzLCBjcmVhdGVBcGkgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuc3BsYXNoLWpzLmVzbS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==