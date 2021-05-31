/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/anymatch/index.js":
/*!****************************************!*\
  !*** ./node_modules/anymatch/index.js ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const picomatch = __webpack_require__(/*! picomatch */ "./node_modules/picomatch/index.js");
const normalizePath = __webpack_require__(/*! normalize-path */ "./node_modules/normalize-path/index.js");

/**
 * @typedef {(testString: string) => boolean} AnymatchFn
 * @typedef {string|RegExp|AnymatchFn} AnymatchPattern
 * @typedef {AnymatchPattern|AnymatchPattern[]} AnymatchMatcher
 */
const BANG = '!';
const DEFAULT_OPTIONS = {returnIndex: false};
const arrify = (item) => Array.isArray(item) ? item : [item];

/**
 * @param {AnymatchPattern} matcher
 * @param {object} options
 * @returns {AnymatchFn}
 */
const createPattern = (matcher, options) => {
  if (typeof matcher === 'function') {
    return matcher;
  }
  if (typeof matcher === 'string') {
    const glob = picomatch(matcher, options);
    return (string) => matcher === string || glob(string);
  }
  if (matcher instanceof RegExp) {
    return (string) => matcher.test(string);
  }
  return (string) => false;
};

/**
 * @param {Array<Function>} patterns
 * @param {Array<Function>} negPatterns
 * @param {String|Array} args
 * @param {Boolean} returnIndex
 * @returns {boolean|number}
 */
const matchPatterns = (patterns, negPatterns, args, returnIndex) => {
  const isList = Array.isArray(args);
  const _path = isList ? args[0] : args;
  if (!isList && typeof _path !== 'string') {
    throw new TypeError('anymatch: second argument must be a string: got ' +
      Object.prototype.toString.call(_path))
  }
  const path = normalizePath(_path);

  for (let index = 0; index < negPatterns.length; index++) {
    const nglob = negPatterns[index];
    if (nglob(path)) {
      return returnIndex ? -1 : false;
    }
  }

  const applied = isList && [path].concat(args.slice(1));
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    if (isList ? pattern(...applied) : pattern(path)) {
      return returnIndex ? index : true;
    }
  }

  return returnIndex ? -1 : false;
};

/**
 * @param {AnymatchMatcher} matchers
 * @param {Array|string} testString
 * @param {object} options
 * @returns {boolean|number|Function}
 */
const anymatch = (matchers, testString, options = DEFAULT_OPTIONS) => {
  if (matchers == null) {
    throw new TypeError('anymatch: specify first argument');
  }
  const opts = typeof options === 'boolean' ? {returnIndex: options} : options;
  const returnIndex = opts.returnIndex || false;

  // Early cache for matchers.
  const mtchers = arrify(matchers);
  const negatedGlobs = mtchers
    .filter(item => typeof item === 'string' && item.charAt(0) === BANG)
    .map(item => item.slice(1))
    .map(item => picomatch(item, opts));
  const patterns = mtchers
    .filter(item => typeof item !== 'string' || (typeof item === 'string' && item.charAt(0) !== BANG))
    .map(matcher => createPattern(matcher, opts));

  if (testString == null) {
    return (testString, ri = false) => {
      const returnIndex = typeof ri === 'boolean' ? ri : false;
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    }
  }

  return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
};

anymatch.default = anymatch;
module.exports = anymatch;


/***/ }),

/***/ "./data.js":
/*!*****************!*\
  !*** ./data.js ***!
  \*****************/
/***/ (() => {

var labels = ["Memory Used", "Memory Free"];
var data = {
  labels: labels,
  datasets: [{
    label: "System Info",
    backgroundColor: ["#0074D9", "#FF4136"],
    borderColor: "rgb(100,99,32)",
    data: [2, 10]
  }]
};
var config = {
  type: "doughnut",
  data,
  options: {}
};
var myChart = new Chart(document.getElementById("myRam"), config);

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var {
  app,
  BrowserWindow
} = __webpack_require__(/*! electron */ "electron");

try {
  __webpack_require__(/*! electron-reloader */ "./node_modules/electron-reloader/index.js")(module);
} catch (_) {}

var path = __webpack_require__(/*! path */ "path");

function createWindow() {
  var win = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    resizeable: true,
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

/***/ }),

/***/ "./node_modules/binary-extensions/binary-extensions.json":
/*!***************************************************************!*\
  !*** ./node_modules/binary-extensions/binary-extensions.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["3dm","3ds","3g2","3gp","7z","a","aac","adp","ai","aif","aiff","alz","ape","apk","appimage","ar","arj","asf","au","avi","bak","baml","bh","bin","bk","bmp","btif","bz2","bzip2","cab","caf","cgm","class","cmx","cpio","cr2","cur","dat","dcm","deb","dex","djvu","dll","dmg","dng","doc","docm","docx","dot","dotm","dra","DS_Store","dsk","dts","dtshd","dvb","dwg","dxf","ecelp4800","ecelp7470","ecelp9600","egg","eol","eot","epub","exe","f4v","fbs","fh","fla","flac","flatpak","fli","flv","fpx","fst","fvt","g3","gh","gif","graffle","gz","gzip","h261","h263","h264","icns","ico","ief","img","ipa","iso","jar","jpeg","jpg","jpgv","jpm","jxr","key","ktx","lha","lib","lvp","lz","lzh","lzma","lzo","m3u","m4a","m4v","mar","mdi","mht","mid","midi","mj2","mka","mkv","mmr","mng","mobi","mov","movie","mp3","mp4","mp4a","mpeg","mpg","mpga","mxu","nef","npx","numbers","nupkg","o","odp","ods","odt","oga","ogg","ogv","otf","ott","pages","pbm","pcx","pdb","pdf","pea","pgm","pic","png","pnm","pot","potm","potx","ppa","ppam","ppm","pps","ppsm","ppsx","ppt","pptm","pptx","psd","pya","pyc","pyo","pyv","qt","rar","ras","raw","resources","rgb","rip","rlc","rmf","rmvb","rpm","rtf","rz","s3m","s7z","scpt","sgi","shar","snap","sil","sketch","slk","smv","snk","so","stl","suo","sub","swf","tar","tbz","tbz2","tga","tgz","thmx","tif","tiff","tlz","ttc","ttf","txz","udf","uvh","uvi","uvm","uvp","uvs","uvu","viv","vob","war","wav","wax","wbmp","wdp","weba","webm","webp","whl","wim","wm","wma","wmv","wmx","woff","woff2","wrm","wvx","xbm","xif","xla","xlam","xls","xlsb","xlsm","xlsx","xlt","xltm","xltx","xm","xmind","xpi","xpm","xwd","xz","z","zip","zipx"]');

/***/ }),

/***/ "./node_modules/binary-extensions/index.js":
/*!*************************************************!*\
  !*** ./node_modules/binary-extensions/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./binary-extensions.json */ "./node_modules/binary-extensions/binary-extensions.json");


/***/ }),

/***/ "./node_modules/braces/index.js":
/*!**************************************!*\
  !*** ./node_modules/braces/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const stringify = __webpack_require__(/*! ./lib/stringify */ "./node_modules/braces/lib/stringify.js");
const compile = __webpack_require__(/*! ./lib/compile */ "./node_modules/braces/lib/compile.js");
const expand = __webpack_require__(/*! ./lib/expand */ "./node_modules/braces/lib/expand.js");
const parse = __webpack_require__(/*! ./lib/parse */ "./node_modules/braces/lib/parse.js");

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

const braces = (input, options = {}) => {
  let output = [];

  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces.create(input, options));
  }

  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */

braces.parse = (input, options = {}) => parse(input, options);

/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.stringify = (input, options = {}) => {
  if (typeof input === 'string') {
    return stringify(braces.parse(input, options), options);
  }
  return stringify(input, options);
};

/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.compile = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }
  return compile(input, options);
};

/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.expand = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }

  let result = expand(input, options);

  // filter out empty strings if specified
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }

  // filter out duplicates if specified
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }

  return result;
};

/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.create = (input, options = {}) => {
  if (input === '' || input.length < 3) {
    return [input];
  }

 return options.expand !== true
    ? braces.compile(input, options)
    : braces.expand(input, options);
};

/**
 * Expose "braces"
 */

module.exports = braces;


/***/ }),

/***/ "./node_modules/braces/lib/compile.js":
/*!********************************************!*\
  !*** ./node_modules/braces/lib/compile.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fill = __webpack_require__(/*! fill-range */ "./node_modules/fill-range/index.js");
const utils = __webpack_require__(/*! ./utils */ "./node_modules/braces/lib/utils.js");

const compile = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? '\\' : '';
    let output = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);
      let range = fill(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

module.exports = compile;


/***/ }),

/***/ "./node_modules/braces/lib/constants.js":
/*!**********************************************!*\
  !*** ./node_modules/braces/lib/constants.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  MAX_LENGTH: 1024 * 64,

  // Digits
  CHAR_0: '0', /* 0 */
  CHAR_9: '9', /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 'A', /* A */
  CHAR_LOWERCASE_A: 'a', /* a */
  CHAR_UPPERCASE_Z: 'Z', /* Z */
  CHAR_LOWERCASE_Z: 'z', /* z */

  CHAR_LEFT_PARENTHESES: '(', /* ( */
  CHAR_RIGHT_PARENTHESES: ')', /* ) */

  CHAR_ASTERISK: '*', /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: '&', /* & */
  CHAR_AT: '@', /* @ */
  CHAR_BACKSLASH: '\\', /* \ */
  CHAR_BACKTICK: '`', /* ` */
  CHAR_CARRIAGE_RETURN: '\r', /* \r */
  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
  CHAR_COLON: ':', /* : */
  CHAR_COMMA: ',', /* , */
  CHAR_DOLLAR: '$', /* . */
  CHAR_DOT: '.', /* . */
  CHAR_DOUBLE_QUOTE: '"', /* " */
  CHAR_EQUAL: '=', /* = */
  CHAR_EXCLAMATION_MARK: '!', /* ! */
  CHAR_FORM_FEED: '\f', /* \f */
  CHAR_FORWARD_SLASH: '/', /* / */
  CHAR_HASH: '#', /* # */
  CHAR_HYPHEN_MINUS: '-', /* - */
  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
  CHAR_LEFT_CURLY_BRACE: '{', /* { */
  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
  CHAR_LINE_FEED: '\n', /* \n */
  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
  CHAR_PERCENT: '%', /* % */
  CHAR_PLUS: '+', /* + */
  CHAR_QUESTION_MARK: '?', /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
  CHAR_SEMICOLON: ';', /* ; */
  CHAR_SINGLE_QUOTE: '\'', /* ' */
  CHAR_SPACE: ' ', /*   */
  CHAR_TAB: '\t', /* \t */
  CHAR_UNDERSCORE: '_', /* _ */
  CHAR_VERTICAL_LINE: '|', /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};


/***/ }),

/***/ "./node_modules/braces/lib/expand.js":
/*!*******************************************!*\
  !*** ./node_modules/braces/lib/expand.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fill = __webpack_require__(/*! fill-range */ "./node_modules/fill-range/index.js");
const stringify = __webpack_require__(/*! ./stringify */ "./node_modules/braces/lib/stringify.js");
const utils = __webpack_require__(/*! ./utils */ "./node_modules/braces/lib/utils.js");

const append = (queue = '', stash = '', enclose = false) => {
  let result = [];

  queue = [].concat(queue);
  stash = [].concat(stash);

  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
  }

  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
      }
    }
  }
  return utils.flatten(result);
};

const expand = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;

  let walk = (node, parent = {}) => {
    node.queue = [];

    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }

    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify(node, options)));
      return;
    }

    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ['{}']));
      return;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);

      if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
      }

      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify(node, options);
      }

      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }

    let enclose = utils.encloseBrace(node);
    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }

    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];

      if (child.type === 'comma' && node.type === 'brace') {
        if (i === 1) queue.push('');
        queue.push('');
        continue;
      }

      if (child.type === 'close') {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }

      if (child.value && child.type !== 'open') {
        queue.push(append(queue.pop(), child.value));
        continue;
      }

      if (child.nodes) {
        walk(child, node);
      }
    }

    return queue;
  };

  return utils.flatten(walk(ast));
};

module.exports = expand;


/***/ }),

/***/ "./node_modules/braces/lib/parse.js":
/*!******************************************!*\
  !*** ./node_modules/braces/lib/parse.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const stringify = __webpack_require__(/*! ./stringify */ "./node_modules/braces/lib/stringify.js");

/**
 * Constants
 */

const {
  MAX_LENGTH,
  CHAR_BACKSLASH, /* \ */
  CHAR_BACKTICK, /* ` */
  CHAR_COMMA, /* , */
  CHAR_DOT, /* . */
  CHAR_LEFT_PARENTHESES, /* ( */
  CHAR_RIGHT_PARENTHESES, /* ) */
  CHAR_LEFT_CURLY_BRACE, /* { */
  CHAR_RIGHT_CURLY_BRACE, /* } */
  CHAR_LEFT_SQUARE_BRACKET, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET, /* ] */
  CHAR_DOUBLE_QUOTE, /* " */
  CHAR_SINGLE_QUOTE, /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = __webpack_require__(/*! ./constants */ "./node_modules/braces/lib/constants.js");

/**
 * parse
 */

const parse = (input, options = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  let opts = options || {};
  let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }

  let ast = { type: 'root', input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth = 0;
  let value;
  let memo = {};

  /**
   * Helpers
   */

  const advance = () => input[index++];
  const push = node => {
    if (node.type === 'text' && prev.type === 'dot') {
      prev.type = 'text';
    }

    if (prev && prev.type === 'text' && node.type === 'text') {
      prev.value += node.value;
      return;
    }

    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };

  push({ type: 'bos' });

  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();

    /**
     * Invalid chars
     */

    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }

    /**
     * Escaped chars
     */

    if (value === CHAR_BACKSLASH) {
      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
      continue;
    }

    /**
     * Right square bracket (literal): ']'
     */

    if (value === CHAR_RIGHT_SQUARE_BRACKET) {
      push({ type: 'text', value: '\\' + value });
      continue;
    }

    /**
     * Left square bracket: '['
     */

    if (value === CHAR_LEFT_SQUARE_BRACKET) {
      brackets++;

      let closed = true;
      let next;

      while (index < length && (next = advance())) {
        value += next;

        if (next === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          continue;
        }

        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          brackets--;

          if (brackets === 0) {
            break;
          }
        }
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Parentheses
     */

    if (value === CHAR_LEFT_PARENTHESES) {
      block = push({ type: 'paren', nodes: [] });
      stack.push(block);
      push({ type: 'text', value });
      continue;
    }

    if (value === CHAR_RIGHT_PARENTHESES) {
      if (block.type !== 'paren') {
        push({ type: 'text', value });
        continue;
      }
      block = stack.pop();
      push({ type: 'text', value });
      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Quotes: '|"|`
     */

    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;

      if (options.keepQuotes !== true) {
        value = '';
      }

      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }

        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }

        value += next;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Left curly brace: '{'
     */

    if (value === CHAR_LEFT_CURLY_BRACE) {
      depth++;

      let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
      let brace = {
        type: 'brace',
        open: true,
        close: false,
        dollar,
        depth,
        commas: 0,
        ranges: 0,
        nodes: []
      };

      block = push(brace);
      stack.push(block);
      push({ type: 'open', value });
      continue;
    }

    /**
     * Right curly brace: '}'
     */

    if (value === CHAR_RIGHT_CURLY_BRACE) {
      if (block.type !== 'brace') {
        push({ type: 'text', value });
        continue;
      }

      let type = 'close';
      block = stack.pop();
      block.close = true;

      push({ type, value });
      depth--;

      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Comma: ','
     */

    if (value === CHAR_COMMA && depth > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: 'text', value: stringify(block) }];
      }

      push({ type: 'comma', value });
      block.commas++;
      continue;
    }

    /**
     * Dot: '.'
     */

    if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
      let siblings = block.nodes;

      if (depth === 0 || siblings.length === 0) {
        push({ type: 'text', value });
        continue;
      }

      if (prev.type === 'dot') {
        block.range = [];
        prev.value += value;
        prev.type = 'range';

        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = 'text';
          continue;
        }

        block.ranges++;
        block.args = [];
        continue;
      }

      if (prev.type === 'range') {
        siblings.pop();

        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }

      push({ type: 'dot', value });
      continue;
    }

    /**
     * Text
     */

    push({ type: 'text', value });
  }

  // Mark imbalanced braces and brackets as invalid
  do {
    block = stack.pop();

    if (block.type !== 'root') {
      block.nodes.forEach(node => {
        if (!node.nodes) {
          if (node.type === 'open') node.isOpen = true;
          if (node.type === 'close') node.isClose = true;
          if (!node.nodes) node.type = 'text';
          node.invalid = true;
        }
      });

      // get the location of the block on parent.nodes (block's siblings)
      let parent = stack[stack.length - 1];
      let index = parent.nodes.indexOf(block);
      // replace the (invalid) block with it's nodes
      parent.nodes.splice(index, 1, ...block.nodes);
    }
  } while (stack.length > 0);

  push({ type: 'eos' });
  return ast;
};

module.exports = parse;


/***/ }),

/***/ "./node_modules/braces/lib/stringify.js":
/*!**********************************************!*\
  !*** ./node_modules/braces/lib/stringify.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const utils = __webpack_require__(/*! ./utils */ "./node_modules/braces/lib/utils.js");

module.exports = (ast, options = {}) => {
  let stringify = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};



/***/ }),

/***/ "./node_modules/braces/lib/utils.js":
/*!******************************************!*\
  !*** ./node_modules/braces/lib/utils.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.isInteger = num => {
  if (typeof num === 'number') {
    return Number.isInteger(num);
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isInteger(Number(num));
  }
  return false;
};

/**
 * Find a node of the given type
 */

exports.find = (node, type) => node.nodes.find(node => node.type === type);

/**
 * Find a node of the given type
 */

exports.exceedsLimit = (min, max, step = 1, limit) => {
  if (limit === false) return false;
  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
  return ((Number(max) - Number(min)) / Number(step)) >= limit;
};

/**
 * Escape the given node with '\\' before node.value
 */

exports.escapeNode = (block, n = 0, type) => {
  let node = block.nodes[n];
  if (!node) return;

  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
    if (node.escaped !== true) {
      node.value = '\\' + node.value;
      node.escaped = true;
    }
  }
};

/**
 * Returns true if the given brace node should be enclosed in literal braces
 */

exports.encloseBrace = node => {
  if (node.type !== 'brace') return false;
  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
    node.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a brace node is invalid.
 */

exports.isInvalidBrace = block => {
  if (block.type !== 'brace') return false;
  if (block.invalid === true || block.dollar) return true;
  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
    block.invalid = true;
    return true;
  }
  if (block.open !== true || block.close !== true) {
    block.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a node is an open or close node
 */

exports.isOpenOrClose = node => {
  if (node.type === 'open' || node.type === 'close') {
    return true;
  }
  return node.open === true || node.close === true;
};

/**
 * Reduce an array of text nodes.
 */

exports.reduce = nodes => nodes.reduce((acc, node) => {
  if (node.type === 'text') acc.push(node.value);
  if (node.type === 'range') node.type = 'text';
  return acc;
}, []);

/**
 * Flatten an array
 */

exports.flatten = (...args) => {
  const result = [];
  const flat = arr => {
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
    }
    return result;
  };
  flat(args);
  return result;
};


/***/ }),

/***/ "./node_modules/chokidar/index.js":
/*!****************************************!*\
  !*** ./node_modules/chokidar/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const { EventEmitter } = __webpack_require__(/*! events */ "events");
const fs = __webpack_require__(/*! fs */ "fs");
const sysPath = __webpack_require__(/*! path */ "path");
const { promisify } = __webpack_require__(/*! util */ "util");
const readdirp = __webpack_require__(/*! readdirp */ "./node_modules/readdirp/index.js");
const anymatch = __webpack_require__(/*! anymatch */ "./node_modules/anymatch/index.js").default;
const globParent = __webpack_require__(/*! glob-parent */ "./node_modules/glob-parent/index.js");
const isGlob = __webpack_require__(/*! is-glob */ "./node_modules/is-glob/index.js");
const braces = __webpack_require__(/*! braces */ "./node_modules/braces/index.js");
const normalizePath = __webpack_require__(/*! normalize-path */ "./node_modules/normalize-path/index.js");

const NodeFsHandler = __webpack_require__(/*! ./lib/nodefs-handler */ "./node_modules/chokidar/lib/nodefs-handler.js");
const FsEventsHandler = __webpack_require__(/*! ./lib/fsevents-handler */ "./node_modules/chokidar/lib/fsevents-handler.js");
const {
  EV_ALL,
  EV_READY,
  EV_ADD,
  EV_CHANGE,
  EV_UNLINK,
  EV_ADD_DIR,
  EV_UNLINK_DIR,
  EV_RAW,
  EV_ERROR,

  STR_CLOSE,
  STR_END,

  BACK_SLASH_RE,
  DOUBLE_SLASH_RE,
  SLASH_OR_BACK_SLASH_RE,
  DOT_RE,
  REPLACER_RE,

  SLASH,
  SLASH_SLASH,
  BRACE_START,
  BANG,
  ONE_DOT,
  TWO_DOTS,
  GLOBSTAR,
  SLASH_GLOBSTAR,
  ANYMATCH_OPTS,
  STRING_TYPE,
  FUNCTION_TYPE,
  EMPTY_STR,
  EMPTY_FN,

  isWindows,
  isMacos
} = __webpack_require__(/*! ./lib/constants */ "./node_modules/chokidar/lib/constants.js");

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

/**
 * @typedef {String} Path
 * @typedef {'all'|'add'|'addDir'|'change'|'unlink'|'unlinkDir'|'raw'|'error'|'ready'} EventName
 * @typedef {'readdir'|'watch'|'add'|'remove'|'change'} ThrottleType
 */

/**
 *
 * @typedef {Object} WatchHelpers
 * @property {Boolean} followSymlinks
 * @property {'stat'|'lstat'} statMethod
 * @property {Path} path
 * @property {Path} watchPath
 * @property {Function} entryPath
 * @property {Boolean} hasGlob
 * @property {Object} globFilter
 * @property {Function} filterPath
 * @property {Function} filterDir
 */

const arrify = (value = []) => Array.isArray(value) ? value : [value];
const flatten = (list, result = []) => {
  list.forEach(item => {
    if (Array.isArray(item)) {
      flatten(item, result);
    } else {
      result.push(item);
    }
  });
  return result;
};

const unifyPaths = (paths_) => {
  /**
   * @type {Array<String>}
   */
  const paths = flatten(arrify(paths_));
  if (!paths.every(p => typeof p === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};

// If SLASH_SLASH occurs at the beginning of path, it is not replaced
//     because "//StoragePC/DrivePool/Movies" is a valid network path
const toUnix = (string) => {
  let str = string.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  while (str.match(DOUBLE_SLASH_RE)) {
    str = str.replace(DOUBLE_SLASH_RE, SLASH);
  }
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};

// Our version of upath.normalize
// TODO: this is not equal to path-normalize module - investigate why
const normalizePathToUnix = (path) => toUnix(sysPath.normalize(toUnix(path)));

const normalizeIgnored = (cwd = EMPTY_STR) => (path) => {
  if (typeof path !== STRING_TYPE) return path;
  return normalizePathToUnix(sysPath.isAbsolute(path) ? path : sysPath.join(cwd, path));
};

const getAbsolutePath = (path, cwd) => {
  if (sysPath.isAbsolute(path)) {
    return path;
  }
  if (path.startsWith(BANG)) {
    return BANG + sysPath.join(cwd, path.slice(1));
  }
  return sysPath.join(cwd, path);
};

const undef = (opts, key) => opts[key] === undefined;

/**
 * Directory entry.
 * @property {Path} path
 * @property {Set<Path>} items
 */
class DirEntry {
  /**
   * @param {Path} dir
   * @param {Function} removeWatcher
   */
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    /** @type {Set<Path>} */
    this.items = new Set();
  }

  add(item) {
    const {items} = this;
    if (!items) return;
    if (item !== ONE_DOT && item !== TWO_DOTS) items.add(item);
  }

  async remove(item) {
    const {items} = this;
    if (!items) return;
    items.delete(item);
    if (items.size > 0) return;

    const dir = this.path;
    try {
      await readdir(dir);
    } catch (err) {
      if (this._removeWatcher) {
        this._removeWatcher(sysPath.dirname(dir), sysPath.basename(dir));
      }
    }
  }

  has(item) {
    const {items} = this;
    if (!items) return;
    return items.has(item);
  }

  /**
   * @returns {Array<String>}
   */
  getChildren() {
    const {items} = this;
    if (!items) return;
    return [...items.values()];
  }

  dispose() {
    this.items.clear();
    delete this.path;
    delete this._removeWatcher;
    delete this.items;
    Object.freeze(this);
  }
}

const STAT_METHOD_F = 'stat';
const STAT_METHOD_L = 'lstat';
class WatchHelper {
  constructor(path, watchPath, follow, fsw) {
    this.fsw = fsw;
    this.path = path = path.replace(REPLACER_RE, EMPTY_STR);
    this.watchPath = watchPath;
    this.fullWatchPath = sysPath.resolve(watchPath);
    this.hasGlob = watchPath !== path;
    /** @type {object|boolean} */
    if (path === EMPTY_STR) this.hasGlob = false;
    this.globSymlink = this.hasGlob && follow ? undefined : false;
    this.globFilter = this.hasGlob ? anymatch(path, undefined, ANYMATCH_OPTS) : false;
    this.dirParts = this.getDirParts(path);
    this.dirParts.forEach((parts) => {
      if (parts.length > 1) parts.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }

  checkGlobSymlink(entry) {
    // only need to resolve once
    // first entry should always have entry.parentDir === EMPTY_STR
    if (this.globSymlink === undefined) {
      this.globSymlink = entry.fullParentDir === this.fullWatchPath ?
        false : {realPath: entry.fullParentDir, linkPath: this.fullWatchPath};
    }

    if (this.globSymlink) {
      return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
    }

    return entry.fullPath;
  }

  entryPath(entry) {
    return sysPath.join(this.watchPath,
      sysPath.relative(this.watchPath, this.checkGlobSymlink(entry))
    );
  }

  filterPath(entry) {
    const {stats} = entry;
    if (stats && stats.isSymbolicLink()) return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE ?
      this.globFilter(resolvedPath) : true;
    return matchesGlob &&
      this.fsw._isntIgnored(resolvedPath, stats) &&
      this.fsw._hasReadPermissions(stats);
  }

  getDirParts(path) {
    if (!this.hasGlob) return [];
    const parts = [];
    const expandedPath = path.includes(BRACE_START) ? braces.expand(path) : [path];
    expandedPath.forEach((path) => {
      parts.push(sysPath.relative(this.watchPath, path).split(SLASH_OR_BACK_SLASH_RE));
    });
    return parts;
  }

  filterDir(entry) {
    if (this.hasGlob) {
      const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
      let globstar = false;
      this.unmatchedGlob = !this.dirParts.some((parts) => {
        return parts.every((part, i) => {
          if (part === GLOBSTAR) globstar = true;
          return globstar || !entryParts[0][i] || anymatch(part, entryParts[0][i], ANYMATCH_OPTS);
        });
      });
    }
    return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
}

/**
 * Watches files & directories for changes. Emitted events:
 * `add`, `addDir`, `change`, `unlink`, `unlinkDir`, `all`, `error`
 *
 *     new FSWatcher()
 *       .add(directories)
 *       .on('add', path => log('File', path, 'was added'))
 */
class FSWatcher extends EventEmitter {
// Not indenting methods for history sake; for now.
constructor(_opts) {
  super();

  const opts = {};
  if (_opts) Object.assign(opts, _opts); // for frozen objects

  /** @type {Map<String, DirEntry>} */
  this._watched = new Map();
  /** @type {Map<String, Array>} */
  this._closers = new Map();
  /** @type {Set<String>} */
  this._ignoredPaths = new Set();

  /** @type {Map<ThrottleType, Map>} */
  this._throttled = new Map();

  /** @type {Map<Path, String|Boolean>} */
  this._symlinkPaths = new Map();

  this._streams = new Set();
  this.closed = false;

  // Set up default options.
  if (undef(opts, 'persistent')) opts.persistent = true;
  if (undef(opts, 'ignoreInitial')) opts.ignoreInitial = false;
  if (undef(opts, 'ignorePermissionErrors')) opts.ignorePermissionErrors = false;
  if (undef(opts, 'interval')) opts.interval = 100;
  if (undef(opts, 'binaryInterval')) opts.binaryInterval = 300;
  if (undef(opts, 'disableGlobbing')) opts.disableGlobbing = false;
  opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;

  // Enable fsevents on OS X when polling isn't explicitly enabled.
  if (undef(opts, 'useFsEvents')) opts.useFsEvents = !opts.usePolling;

  // If we can't use fsevents, ensure the options reflect it's disabled.
  const canUseFsEvents = FsEventsHandler.canUse();
  if (!canUseFsEvents) opts.useFsEvents = false;

  // Use polling on Mac if not using fsevents.
  // Other platforms use non-polling fs_watch.
  if (undef(opts, 'usePolling') && !opts.useFsEvents) {
    opts.usePolling = isMacos;
  }

  // Global override (useful for end-developers that need to force polling for all
  // instances of chokidar, regardless of usage/dependency depth)
  const envPoll = process.env.CHOKIDAR_USEPOLLING;
  if (envPoll !== undefined) {
    const envLower = envPoll.toLowerCase();

    if (envLower === 'false' || envLower === '0') {
      opts.usePolling = false;
    } else if (envLower === 'true' || envLower === '1') {
      opts.usePolling = true;
    } else {
      opts.usePolling = !!envLower;
    }
  }
  const envInterval = process.env.CHOKIDAR_INTERVAL;
  if (envInterval) {
    opts.interval = Number.parseInt(envInterval, 10);
  }

  // Editor atomic write normalization enabled by default with fs.watch
  if (undef(opts, 'atomic')) opts.atomic = !opts.usePolling && !opts.useFsEvents;
  if (opts.atomic) this._pendingUnlinks = new Map();

  if (undef(opts, 'followSymlinks')) opts.followSymlinks = true;

  if (undef(opts, 'awaitWriteFinish')) opts.awaitWriteFinish = false;
  if (opts.awaitWriteFinish === true) opts.awaitWriteFinish = {};
  const awf = opts.awaitWriteFinish;
  if (awf) {
    if (!awf.stabilityThreshold) awf.stabilityThreshold = 2000;
    if (!awf.pollInterval) awf.pollInterval = 100;
    this._pendingWrites = new Map();
  }
  if (opts.ignored) opts.ignored = arrify(opts.ignored);

  let readyCalls = 0;
  this._emitReady = () => {
    readyCalls++;
    if (readyCalls >= this._readyCount) {
      this._emitReady = EMPTY_FN;
      this._readyEmitted = true;
      // use process.nextTick to allow time for listener to be bound
      process.nextTick(() => this.emit(EV_READY));
    }
  };
  this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
  this._readyEmitted = false;
  this.options = opts;

  // Initialize with proper watcher.
  if (opts.useFsEvents) {
    this._fsEventsHandler = new FsEventsHandler(this);
  } else {
    this._nodeFsHandler = new NodeFsHandler(this);
  }

  // You’re frozen when your heart’s not open.
  Object.freeze(opts);
}

// Public methods

/**
 * Adds paths to be watched on an existing FSWatcher instance
 * @param {Path|Array<Path>} paths_
 * @param {String=} _origAdd private; for handling non-existent paths to be watched
 * @param {Boolean=} _internal private; indicates a non-user add
 * @returns {FSWatcher} for chaining
 */
add(paths_, _origAdd, _internal) {
  const {cwd, disableGlobbing} = this.options;
  this.closed = false;
  let paths = unifyPaths(paths_);
  if (cwd) {
    paths = paths.map((path) => {
      const absPath = getAbsolutePath(path, cwd);

      // Check `path` instead of `absPath` because the cwd portion can't be a glob
      if (disableGlobbing || !isGlob(path)) {
        return absPath;
      }
      return normalizePath(absPath);
    });
  }

  // set aside negated glob strings
  paths = paths.filter((path) => {
    if (path.startsWith(BANG)) {
      this._ignoredPaths.add(path.slice(1));
      return false;
    }

    // if a path is being added that was previously ignored, stop ignoring it
    this._ignoredPaths.delete(path);
    this._ignoredPaths.delete(path + SLASH_GLOBSTAR);

    // reset the cached userIgnored anymatch fn
    // to make ignoredPaths changes effective
    this._userIgnored = undefined;

    return true;
  });

  if (this.options.useFsEvents && this._fsEventsHandler) {
    if (!this._readyCount) this._readyCount = paths.length;
    if (this.options.persistent) this._readyCount *= 2;
    paths.forEach((path) => this._fsEventsHandler._addToFsEvents(path));
  } else {
    if (!this._readyCount) this._readyCount = 0;
    this._readyCount += paths.length;
    Promise.all(
      paths.map(async path => {
        const res = await this._nodeFsHandler._addToNodeFs(path, !_internal, 0, 0, _origAdd);
        if (res) this._emitReady();
        return res;
      })
    ).then(results => {
      if (this.closed) return;
      results.filter(item => item).forEach(item => {
        this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
      });
    });
  }

  return this;
}

/**
 * Close watchers or start ignoring events from specified paths.
 * @param {Path|Array<Path>} paths_ - string or array of strings, file/directory paths and/or globs
 * @returns {FSWatcher} for chaining
*/
unwatch(paths_) {
  if (this.closed) return this;
  const paths = unifyPaths(paths_);
  const {cwd} = this.options;

  paths.forEach((path) => {
    // convert to absolute path unless relative path already matches
    if (!sysPath.isAbsolute(path) && !this._closers.has(path)) {
      if (cwd) path = sysPath.join(cwd, path);
      path = sysPath.resolve(path);
    }

    this._closePath(path);

    this._ignoredPaths.add(path);
    if (this._watched.has(path)) {
      this._ignoredPaths.add(path + SLASH_GLOBSTAR);
    }

    // reset the cached userIgnored anymatch fn
    // to make ignoredPaths changes effective
    this._userIgnored = undefined;
  });

  return this;
}

/**
 * Close watchers and remove all listeners from watched paths.
 * @returns {Promise<void>}.
*/
close() {
  if (this.closed) return this._closePromise;
  this.closed = true;

  // Memory management.
  this.removeAllListeners();
  const closers = [];
  this._closers.forEach(closerList => closerList.forEach(closer => {
    const promise = closer();
    if (promise instanceof Promise) closers.push(promise);
  }));
  this._streams.forEach(stream => stream.destroy());
  this._userIgnored = undefined;
  this._readyCount = 0;
  this._readyEmitted = false;
  this._watched.forEach(dirent => dirent.dispose());
  ['closers', 'watched', 'streams', 'symlinkPaths', 'throttled'].forEach(key => {
    this[`_${key}`].clear();
  });

  this._closePromise = closers.length ? Promise.all(closers).then(() => undefined) : Promise.resolve();
  return this._closePromise;
}

/**
 * Expose list of watched paths
 * @returns {Object} for chaining
*/
getWatched() {
  const watchList = {};
  this._watched.forEach((entry, dir) => {
    const key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
    watchList[key || ONE_DOT] = entry.getChildren().sort();
  });
  return watchList;
}

emitWithAll(event, args) {
  this.emit(...args);
  if (event !== EV_ERROR) this.emit(EV_ALL, ...args);
}

// Common helpers
// --------------

/**
 * Normalize and emit events.
 * Calling _emit DOES NOT MEAN emit() would be called!
 * @param {EventName} event Type of event
 * @param {Path} path File or directory path
 * @param {*=} val1 arguments to be passed with event
 * @param {*=} val2
 * @param {*=} val3
 * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
 */
async _emit(event, path, val1, val2, val3) {
  if (this.closed) return;

  const opts = this.options;
  if (isWindows) path = sysPath.normalize(path);
  if (opts.cwd) path = sysPath.relative(opts.cwd, path);
  /** @type Array<any> */
  const args = [event, path];
  if (val3 !== undefined) args.push(val1, val2, val3);
  else if (val2 !== undefined) args.push(val1, val2);
  else if (val1 !== undefined) args.push(val1);

  const awf = opts.awaitWriteFinish;
  let pw;
  if (awf && (pw = this._pendingWrites.get(path))) {
    pw.lastChange = new Date();
    return this;
  }

  if (opts.atomic) {
    if (event === EV_UNLINK) {
      this._pendingUnlinks.set(path, args);
      setTimeout(() => {
        this._pendingUnlinks.forEach((entry, path) => {
          this.emit(...entry);
          this.emit(EV_ALL, ...entry);
          this._pendingUnlinks.delete(path);
        });
      }, typeof opts.atomic === 'number' ? opts.atomic : 100);
      return this;
    }
    if (event === EV_ADD && this._pendingUnlinks.has(path)) {
      event = args[0] = EV_CHANGE;
      this._pendingUnlinks.delete(path);
    }
  }

  if (awf && (event === EV_ADD || event === EV_CHANGE) && this._readyEmitted) {
    const awfEmit = (err, stats) => {
      if (err) {
        event = args[0] = EV_ERROR;
        args[1] = err;
        this.emitWithAll(event, args);
      } else if (stats) {
        // if stats doesn't exist the file must have been deleted
        if (args.length > 2) {
          args[2] = stats;
        } else {
          args.push(stats);
        }
        this.emitWithAll(event, args);
      }
    };

    this._awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit);
    return this;
  }

  if (event === EV_CHANGE) {
    const isThrottled = !this._throttle(EV_CHANGE, path, 50);
    if (isThrottled) return this;
  }

  if (opts.alwaysStat && val1 === undefined &&
    (event === EV_ADD || event === EV_ADD_DIR || event === EV_CHANGE)
  ) {
    const fullPath = opts.cwd ? sysPath.join(opts.cwd, path) : path;
    let stats;
    try {
      stats = await stat(fullPath);
    } catch (err) {}
    // Suppress event when fs_stat fails, to avoid sending undefined 'stat'
    if (!stats || this.closed) return;
    args.push(stats);
  }
  this.emitWithAll(event, args);

  return this;
}

/**
 * Common handler for errors
 * @param {Error} error
 * @returns {Error|Boolean} The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
 */
_handleError(error) {
  const code = error && error.code;
  if (error && code !== 'ENOENT' && code !== 'ENOTDIR' &&
    (!this.options.ignorePermissionErrors || (code !== 'EPERM' && code !== 'EACCES'))
  ) {
    this.emit(EV_ERROR, error);
  }
  return error || this.closed;
}

/**
 * Helper utility for throttling
 * @param {ThrottleType} actionType type being throttled
 * @param {Path} path being acted upon
 * @param {Number} timeout duration of time to suppress duplicate actions
 * @returns {Object|false} tracking object or false if action should be suppressed
 */
_throttle(actionType, path, timeout) {
  if (!this._throttled.has(actionType)) {
    this._throttled.set(actionType, new Map());
  }

  /** @type {Map<Path, Object>} */
  const action = this._throttled.get(actionType);
  /** @type {Object} */
  const actionPath = action.get(path);

  if (actionPath) {
    actionPath.count++;
    return false;
  }

  let timeoutObject;
  const clear = () => {
    const item = action.get(path);
    const count = item ? item.count : 0;
    action.delete(path);
    clearTimeout(timeoutObject);
    if (item) clearTimeout(item.timeoutObject);
    return count;
  };
  timeoutObject = setTimeout(clear, timeout);
  const thr = {timeoutObject, clear, count: 0};
  action.set(path, thr);
  return thr;
}

_incrReadyCount() {
  return this._readyCount++;
}

/**
 * Awaits write operation to finish.
 * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
 * @param {Path} path being acted upon
 * @param {Number} threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
 * @param {EventName} event
 * @param {Function} awfEmit Callback to be called when ready for event to be emitted.
 */
_awaitWriteFinish(path, threshold, event, awfEmit) {
  let timeoutHandler;

  let fullPath = path;
  if (this.options.cwd && !sysPath.isAbsolute(path)) {
    fullPath = sysPath.join(this.options.cwd, path);
  }

  const now = new Date();

  const awaitWriteFinish = (prevStat) => {
    fs.stat(fullPath, (err, curStat) => {
      if (err || !this._pendingWrites.has(path)) {
        if (err && err.code !== 'ENOENT') awfEmit(err);
        return;
      }

      const now = Number(new Date());

      if (prevStat && curStat.size !== prevStat.size) {
        this._pendingWrites.get(path).lastChange = now;
      }
      const pw = this._pendingWrites.get(path);
      const df = now - pw.lastChange;

      if (df >= threshold) {
        this._pendingWrites.delete(path);
        awfEmit(undefined, curStat);
      } else {
        timeoutHandler = setTimeout(
          awaitWriteFinish,
          this.options.awaitWriteFinish.pollInterval,
          curStat
        );
      }
    });
  };

  if (!this._pendingWrites.has(path)) {
    this._pendingWrites.set(path, {
      lastChange: now,
      cancelWait: () => {
        this._pendingWrites.delete(path);
        clearTimeout(timeoutHandler);
        return event;
      }
    });
    timeoutHandler = setTimeout(
      awaitWriteFinish,
      this.options.awaitWriteFinish.pollInterval
    );
  }
}

_getGlobIgnored() {
  return [...this._ignoredPaths.values()];
}

/**
 * Determines whether user has asked to ignore this path.
 * @param {Path} path filepath or dir
 * @param {fs.Stats=} stats result of fs.stat
 * @returns {Boolean}
 */
_isIgnored(path, stats) {
  if (this.options.atomic && DOT_RE.test(path)) return true;
  if (!this._userIgnored) {
    const {cwd} = this.options;
    const ign = this.options.ignored;

    const ignored = ign && ign.map(normalizeIgnored(cwd));
    const paths = arrify(ignored)
      .filter((path) => typeof path === STRING_TYPE && !isGlob(path))
      .map((path) => path + SLASH_GLOBSTAR);
    const list = this._getGlobIgnored().map(normalizeIgnored(cwd)).concat(ignored, paths);
    this._userIgnored = anymatch(list, undefined, ANYMATCH_OPTS);
  }

  return this._userIgnored([path, stats]);
}

_isntIgnored(path, stat) {
  return !this._isIgnored(path, stat);
}

/**
 * Provides a set of common helpers and properties relating to symlink and glob handling.
 * @param {Path} path file, directory, or glob pattern being watched
 * @param {Number=} depth at any depth > 0, this isn't a glob
 * @returns {WatchHelper} object containing helpers for this path
 */
_getWatchHelpers(path, depth) {
  const watchPath = depth || this.options.disableGlobbing || !isGlob(path) ? path : globParent(path);
  const follow = this.options.followSymlinks;

  return new WatchHelper(path, watchPath, follow, this);
}

// Directory helpers
// -----------------

/**
 * Provides directory tracking objects
 * @param {String} directory path of the directory
 * @returns {DirEntry} the directory's tracking object
 */
_getWatchedDir(directory) {
  if (!this._boundRemove) this._boundRemove = this._remove.bind(this);
  const dir = sysPath.resolve(directory);
  if (!this._watched.has(dir)) this._watched.set(dir, new DirEntry(dir, this._boundRemove));
  return this._watched.get(dir);
}

// File helpers
// ------------

/**
 * Check for read permissions.
 * Based on this answer on SO: https://stackoverflow.com/a/11781404/1358405
 * @param {fs.Stats} stats - object, result of fs_stat
 * @returns {Boolean} indicates whether the file can be read
*/
_hasReadPermissions(stats) {
  if (this.options.ignorePermissionErrors) return true;

  // stats.mode may be bigint
  const md = stats && Number.parseInt(stats.mode, 10);
  const st = md & 0o777;
  const it = Number.parseInt(st.toString(8)[0], 10);
  return Boolean(4 & it);
}

/**
 * Handles emitting unlink events for
 * files and directories, and via recursion, for
 * files and directories within directories that are unlinked
 * @param {String} directory within which the following item is located
 * @param {String} item      base path of item/directory
 * @returns {void}
*/
_remove(directory, item, isDirectory) {
  // if what is being deleted is a directory, get that directory's paths
  // for recursive deleting and cleaning of watched object
  // if it is not a directory, nestedDirectoryChildren will be empty array
  const path = sysPath.join(directory, item);
  const fullPath = sysPath.resolve(path);
  isDirectory = isDirectory != null
    ? isDirectory
    : this._watched.has(path) || this._watched.has(fullPath);

  // prevent duplicate handling in case of arriving here nearly simultaneously
  // via multiple paths (such as _handleFile and _handleDir)
  if (!this._throttle('remove', path, 100)) return;

  // if the only watched file is removed, watch for its return
  if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
    this.add(directory, item, true);
  }

  // This will create a new entry in the watched object in either case
  // so we got to do the directory check beforehand
  const wp = this._getWatchedDir(path);
  const nestedDirectoryChildren = wp.getChildren();

  // Recursively remove children directories / files.
  nestedDirectoryChildren.forEach(nested => this._remove(path, nested));

  // Check if item was on the watched list and remove it
  const parent = this._getWatchedDir(directory);
  const wasTracked = parent.has(item);
  parent.remove(item);

  // Fixes issue #1042 -> Relative paths were detected and added as symlinks
  // (https://github.com/paulmillr/chokidar/blob/e1753ddbc9571bdc33b4a4af172d52cb6e611c10/lib/nodefs-handler.js#L612),
  // but never removed from the map in case the path was deleted.
  // This leads to an incorrect state if the path was recreated:
  // https://github.com/paulmillr/chokidar/blob/e1753ddbc9571bdc33b4a4af172d52cb6e611c10/lib/nodefs-handler.js#L553
  if (this._symlinkPaths.has(fullPath)) {
    this._symlinkPaths.delete(fullPath);
  }

  // If we wait for this file to be fully written, cancel the wait.
  let relPath = path;
  if (this.options.cwd) relPath = sysPath.relative(this.options.cwd, path);
  if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
    const event = this._pendingWrites.get(relPath).cancelWait();
    if (event === EV_ADD) return;
  }

  // The Entry will either be a directory that just got removed
  // or a bogus entry to a file, in either case we have to remove it
  this._watched.delete(path);
  this._watched.delete(fullPath);
  const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK;
  if (wasTracked && !this._isIgnored(path)) this._emit(eventName, path);

  // Avoid conflicts if we later create another file with the same name
  if (!this.options.useFsEvents) {
    this._closePath(path);
  }
}

/**
 * Closes all watchers for a path
 * @param {Path} path
 */
_closePath(path) {
  this._closeFile(path)
  const dir = sysPath.dirname(path);
  this._getWatchedDir(dir).remove(sysPath.basename(path));
}

/**
 * Closes only file-specific watchers
 * @param {Path} path
 */
_closeFile(path) {
  const closers = this._closers.get(path);
  if (!closers) return;
  closers.forEach(closer => closer());
  this._closers.delete(path);
}

/**
 *
 * @param {Path} path
 * @param {Function} closer
 */
_addPathCloser(path, closer) {
  if (!closer) return;
  let list = this._closers.get(path);
  if (!list) {
    list = [];
    this._closers.set(path, list);
  }
  list.push(closer);
}

_readdirp(root, opts) {
  if (this.closed) return;
  const options = {type: EV_ALL, alwaysStat: true, lstat: true, ...opts};
  let stream = readdirp(root, options);
  this._streams.add(stream);
  stream.once(STR_CLOSE, () => {
    stream = undefined;
  });
  stream.once(STR_END, () => {
    if (stream) {
      this._streams.delete(stream);
      stream = undefined;
    }
  });
  return stream;
}

}

// Export FSWatcher class
exports.FSWatcher = FSWatcher;

/**
 * Instantiates watcher with paths to be tracked.
 * @param {String|Array<String>} paths file/directory paths and/or globs
 * @param {Object=} options chokidar opts
 * @returns an instance of FSWatcher for chaining.
 */
const watch = (paths, options) => {
  const watcher = new FSWatcher(options);
  watcher.add(paths);
  return watcher;
};

exports.watch = watch;


/***/ }),

/***/ "./node_modules/chokidar/lib/constants.js":
/*!************************************************!*\
  !*** ./node_modules/chokidar/lib/constants.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const {sep} = __webpack_require__(/*! path */ "path");
const {platform} = process;

exports.EV_ALL = 'all';
exports.EV_READY = 'ready';
exports.EV_ADD = 'add';
exports.EV_CHANGE = 'change';
exports.EV_ADD_DIR = 'addDir';
exports.EV_UNLINK = 'unlink';
exports.EV_UNLINK_DIR = 'unlinkDir';
exports.EV_RAW = 'raw';
exports.EV_ERROR = 'error';

exports.STR_DATA = 'data';
exports.STR_END = 'end';
exports.STR_CLOSE = 'close';

exports.FSEVENT_CREATED = 'created';
exports.FSEVENT_MODIFIED = 'modified';
exports.FSEVENT_DELETED = 'deleted';
exports.FSEVENT_MOVED = 'moved';
exports.FSEVENT_CLONED = 'cloned';
exports.FSEVENT_UNKNOWN = 'unknown';
exports.FSEVENT_TYPE_FILE = 'file';
exports.FSEVENT_TYPE_DIRECTORY = 'directory';
exports.FSEVENT_TYPE_SYMLINK = 'symlink';

exports.KEY_LISTENERS = 'listeners';
exports.KEY_ERR = 'errHandlers';
exports.KEY_RAW = 'rawEmitters';
exports.HANDLER_KEYS = [exports.KEY_LISTENERS, exports.KEY_ERR, exports.KEY_RAW];

exports.DOT_SLASH = `.${sep}`;

exports.BACK_SLASH_RE = /\\/g;
exports.DOUBLE_SLASH_RE = /\/\//;
exports.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
exports.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
exports.REPLACER_RE = /^\.[/\\]/;

exports.SLASH = '/';
exports.SLASH_SLASH = '//';
exports.BRACE_START = '{';
exports.BANG = '!';
exports.ONE_DOT = '.';
exports.TWO_DOTS = '..';
exports.STAR = '*';
exports.GLOBSTAR = '**';
exports.ROOT_GLOBSTAR = '/**/*';
exports.SLASH_GLOBSTAR = '/**';
exports.DIR_SUFFIX = 'Dir';
exports.ANYMATCH_OPTS = {dot: true};
exports.STRING_TYPE = 'string';
exports.FUNCTION_TYPE = 'function';
exports.EMPTY_STR = '';
exports.EMPTY_FN = () => {};
exports.IDENTITY_FN = val => val;

exports.isWindows = platform === 'win32';
exports.isMacos = platform === 'darwin';
exports.isLinux = platform === 'linux';


/***/ }),

/***/ "./node_modules/chokidar/lib/fsevents-handler.js":
/*!*******************************************************!*\
  !*** ./node_modules/chokidar/lib/fsevents-handler.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(/*! fs */ "fs");
const sysPath = __webpack_require__(/*! path */ "path");
const { promisify } = __webpack_require__(/*! util */ "util");

let fsevents;
try {
  fsevents = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fsevents'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (error) {
  if (process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR) console.error(error);
}

if (fsevents) {
  // TODO: real check
  const mtch = process.version.match(/v(\d+)\.(\d+)/);
  if (mtch && mtch[1] && mtch[2]) {
    const maj = Number.parseInt(mtch[1], 10);
    const min = Number.parseInt(mtch[2], 10);
    if (maj === 8 && min < 16) {
      fsevents = undefined;
    }
  }
}

const {
  EV_ADD,
  EV_CHANGE,
  EV_ADD_DIR,
  EV_UNLINK,
  EV_ERROR,
  STR_DATA,
  STR_END,
  FSEVENT_CREATED,
  FSEVENT_MODIFIED,
  FSEVENT_DELETED,
  FSEVENT_MOVED,
  // FSEVENT_CLONED,
  FSEVENT_UNKNOWN,
  FSEVENT_TYPE_FILE,
  FSEVENT_TYPE_DIRECTORY,
  FSEVENT_TYPE_SYMLINK,

  ROOT_GLOBSTAR,
  DIR_SUFFIX,
  DOT_SLASH,
  FUNCTION_TYPE,
  EMPTY_FN,
  IDENTITY_FN
} = __webpack_require__(/*! ./constants */ "./node_modules/chokidar/lib/constants.js");

const Depth = (value) => isNaN(value) ? {} : {depth: value};

const stat = promisify(fs.stat);
const lstat = promisify(fs.lstat);
const realpath = promisify(fs.realpath);

const statMethods = { stat, lstat };

/**
 * @typedef {String} Path
 */

/**
 * @typedef {Object} FsEventsWatchContainer
 * @property {Set<Function>} listeners
 * @property {Function} rawEmitter
 * @property {{stop: Function}} watcher
 */

// fsevents instance helper functions
/**
 * Object to hold per-process fsevents instances (may be shared across chokidar FSWatcher instances)
 * @type {Map<Path,FsEventsWatchContainer>}
 */
const FSEventsWatchers = new Map();

// Threshold of duplicate path prefixes at which to start
// consolidating going forward
const consolidateThreshhold = 10;

const wrongEventFlags = new Set([
  69888, 70400, 71424, 72704, 73472, 131328, 131840, 262912
]);

/**
 * Instantiates the fsevents interface
 * @param {Path} path path to be watched
 * @param {Function} callback called when fsevents is bound and ready
 * @returns {{stop: Function}} new fsevents instance
 */
const createFSEventsInstance = (path, callback) => {
  const stop = fsevents.watch(path, callback);
  return {stop};
};

/**
 * Instantiates the fsevents interface or binds listeners to an existing one covering
 * the same file tree.
 * @param {Path} path           - to be watched
 * @param {Path} realPath       - real path for symlinks
 * @param {Function} listener   - called when fsevents emits events
 * @param {Function} rawEmitter - passes data to listeners of the 'raw' event
 * @returns {Function} closer
 */
function setFSEventsListener(path, realPath, listener, rawEmitter) {
  let watchPath = sysPath.extname(path) ? sysPath.dirname(path) : path;
  const parentPath = sysPath.dirname(watchPath);
  let cont = FSEventsWatchers.get(watchPath);

  // If we've accumulated a substantial number of paths that
  // could have been consolidated by watching one directory
  // above the current one, create a watcher on the parent
  // path instead, so that we do consolidate going forward.
  if (couldConsolidate(parentPath)) {
    watchPath = parentPath;
  }

  const resolvedPath = sysPath.resolve(path);
  const hasSymlink = resolvedPath !== realPath;

  const filteredListener = (fullPath, flags, info) => {
    if (hasSymlink) fullPath = fullPath.replace(realPath, resolvedPath);
    if (
      fullPath === resolvedPath ||
      !fullPath.indexOf(resolvedPath + sysPath.sep)
    ) listener(fullPath, flags, info);
  };

  // check if there is already a watcher on a parent path
  // modifies `watchPath` to the parent path when it finds a match
  let watchedParent = false;
  for (const watchedPath of FSEventsWatchers.keys()) {
    if (realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep) === 0) {
      watchPath = watchedPath;
      cont = FSEventsWatchers.get(watchPath);
      watchedParent = true;
      break;
    }
  }

  if (cont || watchedParent) {
    cont.listeners.add(filteredListener);
  } else {
    cont = {
      listeners: new Set([filteredListener]),
      rawEmitter,
      watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
        if (!cont.listeners.size) return;
        const info = fsevents.getInfo(fullPath, flags);
        cont.listeners.forEach(list => {
          list(fullPath, flags, info);
        });

        cont.rawEmitter(info.event, fullPath, info);
      })
    };
    FSEventsWatchers.set(watchPath, cont);
  }

  // removes this instance's listeners and closes the underlying fsevents
  // instance if there are no more listeners left
  return () => {
    const lst = cont.listeners;

    lst.delete(filteredListener);
    if (!lst.size) {
      FSEventsWatchers.delete(watchPath);
      if (cont.watcher) return cont.watcher.stop().then(() => {
        cont.rawEmitter = cont.watcher = undefined;
        Object.freeze(cont);
      });
    }
  };
}

// Decide whether or not we should start a new higher-level
// parent watcher
const couldConsolidate = (path) => {
  let count = 0;
  for (const watchPath of FSEventsWatchers.keys()) {
    if (watchPath.indexOf(path) === 0) {
      count++;
      if (count >= consolidateThreshhold) {
        return true;
      }
    }
  }

  return false;
};

// returns boolean indicating whether fsevents can be used
const canUse = () => fsevents && FSEventsWatchers.size < 128;

// determines subdirectory traversal levels from root to path
const calcDepth = (path, root) => {
  let i = 0;
  while (!path.indexOf(root) && (path = sysPath.dirname(path)) !== root) i++;
  return i;
};

// returns boolean indicating whether the fsevents' event info has the same type
// as the one returned by fs.stat
const sameTypes = (info, stats) => (
  info.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() ||
  info.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() ||
  info.type === FSEVENT_TYPE_FILE && stats.isFile()
)

/**
 * @mixin
 */
class FsEventsHandler {

/**
 * @param {import('../index').FSWatcher} fsw
 */
constructor(fsw) {
  this.fsw = fsw;
}
checkIgnored(path, stats) {
  const ipaths = this.fsw._ignoredPaths;
  if (this.fsw._isIgnored(path, stats)) {
    ipaths.add(path);
    if (stats && stats.isDirectory()) {
      ipaths.add(path + ROOT_GLOBSTAR);
    }
    return true;
  }

  ipaths.delete(path);
  ipaths.delete(path + ROOT_GLOBSTAR);
}

addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
  const event = watchedDir.has(item) ? EV_CHANGE : EV_ADD;
  this.handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts);
}

async checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts) {
  try {
    const stats = await stat(path)
    if (this.fsw.closed) return;
    if (sameTypes(info, stats)) {
      this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
    } else {
      this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
    } else {
      this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
    }
  }
}

handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info, opts) {
  if (this.fsw.closed || this.checkIgnored(path)) return;

  if (event === EV_UNLINK) {
    const isDirectory = info.type === FSEVENT_TYPE_DIRECTORY
    // suppress unlink events on never before seen files
    if (isDirectory || watchedDir.has(item)) {
      this.fsw._remove(parent, item, isDirectory);
    }
  } else {
    if (event === EV_ADD) {
      // track new directories
      if (info.type === FSEVENT_TYPE_DIRECTORY) this.fsw._getWatchedDir(path);

      if (info.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
        // push symlinks back to the top of the stack to get handled
        const curDepth = opts.depth === undefined ?
          undefined : calcDepth(fullPath, realPath) + 1;
        return this._addToFsEvents(path, false, true, curDepth);
      }

      // track new paths
      // (other than symlinks being followed, which will be tracked soon)
      this.fsw._getWatchedDir(parent).add(item);
    }
    /**
     * @type {'add'|'addDir'|'unlink'|'unlinkDir'}
     */
    const eventName = info.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
    this.fsw._emit(eventName, path);
    if (eventName === EV_ADD_DIR) this._addToFsEvents(path, false, true);
  }
}

/**
 * Handle symlinks encountered during directory scan
 * @param {String} watchPath  - file/dir path to be watched with fsevents
 * @param {String} realPath   - real path (in case of symlinks)
 * @param {Function} transform  - path transformer
 * @param {Function} globFilter - path filter in case a glob pattern was provided
 * @returns {Function} closer for the watcher instance
*/
_watchWithFsEvents(watchPath, realPath, transform, globFilter) {
  if (this.fsw.closed || this.fsw._isIgnored(watchPath)) return;
  const opts = this.fsw.options;
  const watchCallback = async (fullPath, flags, info) => {
    if (this.fsw.closed) return;
    if (
      opts.depth !== undefined &&
      calcDepth(fullPath, realPath) > opts.depth
    ) return;
    const path = transform(sysPath.join(
      watchPath, sysPath.relative(watchPath, fullPath)
    ));
    if (globFilter && !globFilter(path)) return;
    // ensure directories are tracked
    const parent = sysPath.dirname(path);
    const item = sysPath.basename(path);
    const watchedDir = this.fsw._getWatchedDir(
      info.type === FSEVENT_TYPE_DIRECTORY ? path : parent
    );

    // correct for wrong events emitted
    if (wrongEventFlags.has(flags) || info.event === FSEVENT_UNKNOWN) {
      if (typeof opts.ignored === FUNCTION_TYPE) {
        let stats;
        try {
          stats = await stat(path);
        } catch (error) {}
        if (this.fsw.closed) return;
        if (this.checkIgnored(path, stats)) return;
        if (sameTypes(info, stats)) {
          this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
        } else {
          this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info, opts);
        }
      } else {
        this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
    } else {
      switch (info.event) {
      case FSEVENT_CREATED:
      case FSEVENT_MODIFIED:
        return this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info, opts);
      case FSEVENT_DELETED:
      case FSEVENT_MOVED:
        return this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
    }
  };

  const closer = setFSEventsListener(
    watchPath,
    realPath,
    watchCallback,
    this.fsw._emitRaw
  );

  this.fsw._emitReady();
  return closer;
}

/**
 * Handle symlinks encountered during directory scan
 * @param {String} linkPath path to symlink
 * @param {String} fullPath absolute path to the symlink
 * @param {Function} transform pre-existing path transformer
 * @param {Number} curDepth level of subdirectories traversed to where symlink is
 * @returns {Promise<void>}
 */
async _handleFsEventsSymlink(linkPath, fullPath, transform, curDepth) {
  // don't follow the same symlink more than once
  if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath)) return;

  this.fsw._symlinkPaths.set(fullPath, true);
  this.fsw._incrReadyCount();

  try {
    const linkTarget = await realpath(linkPath);
    if (this.fsw.closed) return;
    if (this.fsw._isIgnored(linkTarget)) {
      return this.fsw._emitReady();
    }

    this.fsw._incrReadyCount();

    // add the linkTarget for watching with a wrapper for transform
    // that causes emitted paths to incorporate the link's path
    this._addToFsEvents(linkTarget || linkPath, (path) => {
      let aliasedPath = linkPath;
      if (linkTarget && linkTarget !== DOT_SLASH) {
        aliasedPath = path.replace(linkTarget, linkPath);
      } else if (path !== DOT_SLASH) {
        aliasedPath = sysPath.join(linkPath, path);
      }
      return transform(aliasedPath);
    }, false, curDepth);
  } catch(error) {
    if (this.fsw._handleError(error)) {
      return this.fsw._emitReady();
    }
  }
}

/**
 *
 * @param {Path} newPath
 * @param {fs.Stats} stats
 */
emitAdd(newPath, stats, processPath, opts, forceAdd) {
  const pp = processPath(newPath);
  const isDir = stats.isDirectory();
  const dirObj = this.fsw._getWatchedDir(sysPath.dirname(pp));
  const base = sysPath.basename(pp);

  // ensure empty dirs get tracked
  if (isDir) this.fsw._getWatchedDir(pp);
  if (dirObj.has(base)) return;
  dirObj.add(base);

  if (!opts.ignoreInitial || forceAdd === true) {
    this.fsw._emit(isDir ? EV_ADD_DIR : EV_ADD, pp, stats);
  }
}

initWatch(realPath, path, wh, processPath) {
  if (this.fsw.closed) return;
  const closer = this._watchWithFsEvents(
    wh.watchPath,
    sysPath.resolve(realPath || wh.watchPath),
    processPath,
    wh.globFilter
  );
  this.fsw._addPathCloser(path, closer);
}

/**
 * Handle added path with fsevents
 * @param {String} path file/dir path or glob pattern
 * @param {Function|Boolean=} transform converts working path to what the user expects
 * @param {Boolean=} forceAdd ensure add is emitted
 * @param {Number=} priorDepth Level of subdirectories already traversed.
 * @returns {Promise<void>}
 */
async _addToFsEvents(path, transform, forceAdd, priorDepth) {
  if (this.fsw.closed) {
    return;
  }
  const opts = this.fsw.options;
  const processPath = typeof transform === FUNCTION_TYPE ? transform : IDENTITY_FN;

  const wh = this.fsw._getWatchHelpers(path);

  // evaluate what is at the path we're being asked to watch
  try {
    const stats = await statMethods[wh.statMethod](wh.watchPath);
    if (this.fsw.closed) return;
    if (this.fsw._isIgnored(wh.watchPath, stats)) {
      throw null;
    }
    if (stats.isDirectory()) {
      // emit addDir unless this is a glob parent
      if (!wh.globFilter) this.emitAdd(processPath(path), stats, processPath, opts, forceAdd);

      // don't recurse further if it would exceed depth setting
      if (priorDepth && priorDepth > opts.depth) return;

      // scan the contents of the dir
      this.fsw._readdirp(wh.watchPath, {
        fileFilter: entry => wh.filterPath(entry),
        directoryFilter: entry => wh.filterDir(entry),
        ...Depth(opts.depth - (priorDepth || 0))
      }).on(STR_DATA, (entry) => {
        // need to check filterPath on dirs b/c filterDir is less restrictive
        if (this.fsw.closed) {
          return;
        }
        if (entry.stats.isDirectory() && !wh.filterPath(entry)) return;

        const joinedPath = sysPath.join(wh.watchPath, entry.path);
        const {fullPath} = entry;

        if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
          // preserve the current depth here since it can't be derived from
          // real paths past the symlink
          const curDepth = opts.depth === undefined ?
            undefined : calcDepth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;

          this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
        } else {
          this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
        }
      }).on(EV_ERROR, EMPTY_FN).on(STR_END, () => {
        this.fsw._emitReady();
      });
    } else {
      this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
      this.fsw._emitReady();
    }
  } catch (error) {
    if (!error || this.fsw._handleError(error)) {
      // TODO: Strange thing: "should not choke on an ignored watch path" will be failed without 2 ready calls -__-
      this.fsw._emitReady();
      this.fsw._emitReady();
    }
  }

  if (opts.persistent && forceAdd !== true) {
    if (typeof transform === FUNCTION_TYPE) {
      // realpath has already been resolved
      this.initWatch(undefined, path, wh, processPath);
    } else {
      let realPath;
      try {
        realPath = await realpath(wh.watchPath);
      } catch (e) {}
      this.initWatch(realPath, path, wh, processPath);
    }
  }
}

}

module.exports = FsEventsHandler;
module.exports.canUse = canUse;


/***/ }),

/***/ "./node_modules/chokidar/lib/nodefs-handler.js":
/*!*****************************************************!*\
  !*** ./node_modules/chokidar/lib/nodefs-handler.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(/*! fs */ "fs");
const sysPath = __webpack_require__(/*! path */ "path");
const { promisify } = __webpack_require__(/*! util */ "util");
const isBinaryPath = __webpack_require__(/*! is-binary-path */ "./node_modules/is-binary-path/index.js");
const {
  isWindows,
  isLinux,
  EMPTY_FN,
  EMPTY_STR,
  KEY_LISTENERS,
  KEY_ERR,
  KEY_RAW,
  HANDLER_KEYS,
  EV_CHANGE,
  EV_ADD,
  EV_ADD_DIR,
  EV_ERROR,
  STR_DATA,
  STR_END,
  BRACE_START,
  STAR
} = __webpack_require__(/*! ./constants */ "./node_modules/chokidar/lib/constants.js");

const THROTTLE_MODE_WATCH = 'watch';

const open = promisify(fs.open);
const stat = promisify(fs.stat);
const lstat = promisify(fs.lstat);
const close = promisify(fs.close);
const fsrealpath = promisify(fs.realpath);

const statMethods = { lstat, stat };

// TODO: emit errors properly. Example: EMFILE on Macos.
const foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};

const addAndConvert = (main, prop, item) => {
  let container = main[prop];
  if (!(container instanceof Set)) {
    main[prop] = container = new Set([container]);
  }
  container.add(item);
};

const clearItem = cont => key => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};

const delFromSet = (main, prop, item) => {
  const container = main[prop];
  if (container instanceof Set) {
    container.delete(item);
  } else if (container === item) {
    delete main[prop];
  }
};

const isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;

/**
 * @typedef {String} Path
 */

// fs_watch helpers

// object to hold per-process fs_watch instances
// (may be shared across chokidar FSWatcher instances)

/**
 * @typedef {Object} FsWatchContainer
 * @property {Set} listeners
 * @property {Set} errHandlers
 * @property {Set} rawEmitters
 * @property {fs.FSWatcher=} watcher
 * @property {Boolean=} watcherUnusable
 */

/**
 * @type {Map<String,FsWatchContainer>}
 */
const FsWatchInstances = new Map();

/**
 * Instantiates the fs_watch interface
 * @param {String} path to be watched
 * @param {Object} options to be passed to fs_watch
 * @param {Function} listener main event handler
 * @param {Function} errHandler emits info about errors
 * @param {Function} emitRaw emits raw event data
 * @returns {fs.FSWatcher} new fsevents instance
 */
function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path);
    emitRaw(rawEvent, evPath, {watchedPath: path});

    // emit based on events occurring for files from a directory's watcher in
    // case the file's watcher misses it (and rely on throttling to de-dupe)
    if (evPath && path !== evPath) {
      fsWatchBroadcast(
        sysPath.resolve(path, evPath), KEY_LISTENERS, sysPath.join(path, evPath)
      );
    }
  };
  try {
    return fs.watch(path, options, handleEvent);
  } catch (error) {
    errHandler(error);
  }
}

/**
 * Helper for passing fs_watch event data to a collection of listeners
 * @param {Path} fullPath absolute path bound to fs_watch instance
 * @param {String} type listener type
 * @param {*=} val1 arguments to be passed to listeners
 * @param {*=} val2
 * @param {*=} val3
 */
const fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont) return;
  foreach(cont[type], (listener) => {
    listener(val1, val2, val3);
  });
};

/**
 * Instantiates the fs_watch interface or binds listeners
 * to an existing one covering the same file system entry
 * @param {String} path
 * @param {String} fullPath absolute path
 * @param {Object} options to be passed to fs_watch
 * @param {Object} handlers container for event listener functions
 */
const setFsWatchListener = (path, fullPath, options, handlers) => {
  const {listener, errHandler, rawEmitter} = handlers;
  let cont = FsWatchInstances.get(fullPath);

  /** @type {fs.FSWatcher=} */
  let watcher;
  if (!options.persistent) {
    watcher = createFsWatchInstance(
      path, options, listener, errHandler, rawEmitter
    );
    return watcher.close.bind(watcher);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher = createFsWatchInstance(
      path,
      options,
      fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
      errHandler, // no need to use broadcast here
      fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
    );
    if (!watcher) return;
    watcher.on(EV_ERROR, async (error) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      cont.watcherUnusable = true; // documented since Node 10.4.1
      // Workaround for https://github.com/joyent/node/issues/4337
      if (isWindows && error.code === 'EPERM') {
        try {
          const fd = await open(path, 'r');
          await close(fd);
          broadcastErr(error);
        } catch (err) {}
      } else {
        broadcastErr(error);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher
    };
    FsWatchInstances.set(fullPath, cont);
  }
  // const index = cont.listeners.indexOf(listener);

  // removes this instance's listeners and closes the underlying fs_watch
  // instance if there are no more listeners left
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      // Check to protect against issue gh-730.
      // if (cont.watcherUnusable) {
      cont.watcher.close();
      // }
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = undefined;
      Object.freeze(cont);
    }
  };
};

// fs_watchFile helpers

// object to hold per-process fs_watchFile instances
// (may be shared across chokidar FSWatcher instances)
const FsWatchFileInstances = new Map();

/**
 * Instantiates the fs_watchFile interface or binds listeners
 * to an existing one covering the same file system entry
 * @param {String} path to be watched
 * @param {String} fullPath absolute path
 * @param {Object} options options to be passed to fs_watchFile
 * @param {Object} handlers container for event listener functions
 * @returns {Function} closer
 */
const setFsWatchFileListener = (path, fullPath, options, handlers) => {
  const {listener, rawEmitter} = handlers;
  let cont = FsWatchFileInstances.get(fullPath);

  /* eslint-disable no-unused-vars, prefer-destructuring */
  let listeners = new Set();
  let rawEmitters = new Set();

  const copts = cont && cont.options;
  if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
    // "Upgrade" the watcher to persistence or a quicker interval.
    // This creates some unlikely edge case issues if the user mixes
    // settings in a very weird way, but solving for those cases
    // doesn't seem worthwhile for the added complexity.
    listeners = cont.listeners;
    rawEmitters = cont.rawEmitters;
    fs.unwatchFile(fullPath);
    cont = undefined;
  }

  /* eslint-enable no-unused-vars, prefer-destructuring */

  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    // TODO
    // listeners.add(listener);
    // rawEmitters.add(rawEmitter);
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options,
      watcher: fs.watchFile(fullPath, options, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter) => {
          rawEmitter(EV_CHANGE, fullPath, {curr, prev});
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener) => listener(path, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  // const index = cont.listeners.indexOf(listener);

  // Removes this instance's listeners and closes the underlying fs_watchFile
  // instance if there are no more listeners left.
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      fs.unwatchFile(fullPath);
      cont.options = cont.watcher = undefined;
      Object.freeze(cont);
    }
  };
};

/**
 * @mixin
 */
class NodeFsHandler {

/**
 * @param {import("../index").FSWatcher} fsW
 */
constructor(fsW) {
  this.fsw = fsW;
  this._boundHandleError = (error) => fsW._handleError(error);
}

/**
 * Watch file for changes with fs_watchFile or fs_watch.
 * @param {String} path to file or dir
 * @param {Function} listener on fs change
 * @returns {Function} closer for the watcher instance
 */
_watchWithNodeFs(path, listener) {
  const opts = this.fsw.options;
  const directory = sysPath.dirname(path);
  const basename = sysPath.basename(path);
  const parent = this.fsw._getWatchedDir(directory);
  parent.add(basename);
  const absolutePath = sysPath.resolve(path);
  const options = {persistent: opts.persistent};
  if (!listener) listener = EMPTY_FN;

  let closer;
  if (opts.usePolling) {
    options.interval = opts.enableBinaryInterval && isBinaryPath(basename) ?
      opts.binaryInterval : opts.interval;
    closer = setFsWatchFileListener(path, absolutePath, options, {
      listener,
      rawEmitter: this.fsw._emitRaw
    });
  } else {
    closer = setFsWatchListener(path, absolutePath, options, {
      listener,
      errHandler: this._boundHandleError,
      rawEmitter: this.fsw._emitRaw
    });
  }
  return closer;
}

/**
 * Watch a file and emit add event if warranted.
 * @param {Path} file Path
 * @param {fs.Stats} stats result of fs_stat
 * @param {Boolean} initialAdd was the file added at watch instantiation?
 * @returns {Function} closer for the watcher instance
 */
_handleFile(file, stats, initialAdd) {
  if (this.fsw.closed) {
    return;
  }
  const dirname = sysPath.dirname(file);
  const basename = sysPath.basename(file);
  const parent = this.fsw._getWatchedDir(dirname);
  // stats is always present
  let prevStats = stats;

  // if the file is already being watched, do nothing
  if (parent.has(basename)) return;

  const listener = async (path, newStats) => {
    if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5)) return;
    if (!newStats || newStats.mtimeMs === 0) {
      try {
        const newStats = await stat(file);
        if (this.fsw.closed) return;
        // Check that change event was not fired because of changed only accessTime.
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV_CHANGE, file, newStats);
        }
        if (isLinux && prevStats.ino !== newStats.ino) {
          this.fsw._closeFile(path)
          prevStats = newStats;
          this.fsw._addPathCloser(path, this._watchWithNodeFs(file, listener));
        } else {
          prevStats = newStats;
        }
      } catch (error) {
        // Fix issues where mtime is null but file is still present
        this.fsw._remove(dirname, basename);
      }
      // add is about to be emitted if file not already tracked in parent
    } else if (parent.has(basename)) {
      // Check that change event was not fired because of changed only accessTime.
      const at = newStats.atimeMs;
      const mt = newStats.mtimeMs;
      if (!at || at <= mt || mt !== prevStats.mtimeMs) {
        this.fsw._emit(EV_CHANGE, file, newStats);
      }
      prevStats = newStats;
    }
  }
  // kick off the watcher
  const closer = this._watchWithNodeFs(file, listener);

  // emit an add event if we're supposed to
  if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
    if (!this.fsw._throttle(EV_ADD, file, 0)) return;
    this.fsw._emit(EV_ADD, file, stats);
  }

  return closer;
}

/**
 * Handle symlinks encountered while reading a dir.
 * @param {Object} entry returned by readdirp
 * @param {String} directory path of dir being read
 * @param {String} path of this item
 * @param {String} item basename of this item
 * @returns {Promise<Boolean>} true if no more processing is needed for this entry.
 */
async _handleSymlink(entry, directory, path, item) {
  if (this.fsw.closed) {
    return;
  }
  const full = entry.fullPath;
  const dir = this.fsw._getWatchedDir(directory);

  if (!this.fsw.options.followSymlinks) {
    // watch symlink directly (don't follow) and detect changes
    this.fsw._incrReadyCount();
    const linkPath = await fsrealpath(path);
    if (this.fsw.closed) return;
    if (dir.has(item)) {
      if (this.fsw._symlinkPaths.get(full) !== linkPath) {
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV_CHANGE, path, entry.stats);
      }
    } else {
      dir.add(item);
      this.fsw._symlinkPaths.set(full, linkPath);
      this.fsw._emit(EV_ADD, path, entry.stats);
    }
    this.fsw._emitReady();
    return true;
  }

  // don't follow the same symlink more than once
  if (this.fsw._symlinkPaths.has(full)) {
    return true;
  }

  this.fsw._symlinkPaths.set(full, true);
}

_handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
  // Normalize the directory name on Windows
  directory = sysPath.join(directory, EMPTY_STR);

  if (!wh.hasGlob) {
    throttler = this.fsw._throttle('readdir', directory, 1000);
    if (!throttler) return;
  }

  const previous = this.fsw._getWatchedDir(wh.path);
  const current = new Set();

  let stream = this.fsw._readdirp(directory, {
    fileFilter: entry => wh.filterPath(entry),
    directoryFilter: entry => wh.filterDir(entry),
    depth: 0
  }).on(STR_DATA, async (entry) => {
    if (this.fsw.closed) {
      stream = undefined;
      return;
    }
    const item = entry.path;
    let path = sysPath.join(directory, item);
    current.add(item);

    if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path, item)) {
      return;
    }

    if (this.fsw.closed) {
      stream = undefined;
      return;
    }
    // Files that present in current directory snapshot
    // but absent in previous are added to watch list and
    // emit `add` event.
    if (item === target || !target && !previous.has(item)) {
      this.fsw._incrReadyCount();

      // ensure relativeness of path is preserved in case of watcher reuse
      path = sysPath.join(dir, sysPath.relative(dir, path));

      this._addToNodeFs(path, initialAdd, wh, depth + 1);
    }
  }).on(EV_ERROR, this._boundHandleError);

  return new Promise(resolve =>
    stream.once(STR_END, () => {
      if (this.fsw.closed) {
        stream = undefined;
        return;
      }
      const wasThrottled = throttler ? throttler.clear() : false;

      resolve();

      // Files that absent in current directory snapshot
      // but present in previous emit `remove` event
      // and are removed from @watched[directory].
      previous.getChildren().filter((item) => {
        return item !== directory &&
          !current.has(item) &&
          // in case of intersecting globs;
          // a path may have been filtered out of this readdir, but
          // shouldn't be removed because it matches a different glob
          (!wh.hasGlob || wh.filterPath({
            fullPath: sysPath.resolve(directory, item)
          }));
      }).forEach((item) => {
        this.fsw._remove(directory, item);
      });

      stream = undefined;

      // one more time for any missed in case changes came in extremely quickly
      if (wasThrottled) this._handleRead(directory, false, wh, target, dir, depth, throttler);
    })
  );
}

/**
 * Read directory to add / remove files from `@watched` list and re-read it on change.
 * @param {String} dir fs path
 * @param {fs.Stats} stats
 * @param {Boolean} initialAdd
 * @param {Number} depth relative to user-supplied path
 * @param {String} target child path targeted for watch
 * @param {Object} wh Common watch helpers for this path
 * @param {String} realpath
 * @returns {Promise<Function>} closer for the watcher instance.
 */
async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath) {
  const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
  const tracked = parentDir.has(sysPath.basename(dir));
  if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
    if (!wh.hasGlob || wh.globFilter(dir)) this.fsw._emit(EV_ADD_DIR, dir, stats);
  }

  // ensure dir is tracked (harmless if redundant)
  parentDir.add(sysPath.basename(dir));
  this.fsw._getWatchedDir(dir);
  let throttler;
  let closer;

  const oDepth = this.fsw.options.depth;
  if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath)) {
    if (!target) {
      await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
      if (this.fsw.closed) return;
    }

    closer = this._watchWithNodeFs(dir, (dirPath, stats) => {
      // if current directory is removed, do nothing
      if (stats && stats.mtimeMs === 0) return;

      this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
    });
  }
  return closer;
}

/**
 * Handle added file, directory, or glob pattern.
 * Delegates call to _handleFile / _handleDir after checks.
 * @param {String} path to file or ir
 * @param {Boolean} initialAdd was the file added at watch instantiation?
 * @param {Object} priorWh depth relative to user-supplied path
 * @param {Number} depth Child path actually targeted for watch
 * @param {String=} target Child path actually targeted for watch
 * @returns {Promise}
 */
async _addToNodeFs(path, initialAdd, priorWh, depth, target) {
  const ready = this.fsw._emitReady;
  if (this.fsw._isIgnored(path) || this.fsw.closed) {
    ready();
    return false;
  }

  const wh = this.fsw._getWatchHelpers(path, depth);
  if (!wh.hasGlob && priorWh) {
    wh.hasGlob = priorWh.hasGlob;
    wh.globFilter = priorWh.globFilter;
    wh.filterPath = entry => priorWh.filterPath(entry);
    wh.filterDir = entry => priorWh.filterDir(entry);
  }

  // evaluate what is at the path we're being asked to watch
  try {
    const stats = await statMethods[wh.statMethod](wh.watchPath);
    if (this.fsw.closed) return;
    if (this.fsw._isIgnored(wh.watchPath, stats)) {
      ready();
      return false;
    }

    const follow = this.fsw.options.followSymlinks && !path.includes(STAR) && !path.includes(BRACE_START);
    let closer;
    if (stats.isDirectory()) {
      const absPath = sysPath.resolve(path);
      const targetPath = follow ? await fsrealpath(path) : path;
      if (this.fsw.closed) return;
      closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
      if (this.fsw.closed) return;
      // preserve this symlink's target path
      if (absPath !== targetPath && targetPath !== undefined) {
        this.fsw._symlinkPaths.set(absPath, targetPath);
      }
    } else if (stats.isSymbolicLink()) {
      const targetPath = follow ? await fsrealpath(path) : path;
      if (this.fsw.closed) return;
      const parent = sysPath.dirname(wh.watchPath);
      this.fsw._getWatchedDir(parent).add(wh.watchPath);
      this.fsw._emit(EV_ADD, wh.watchPath, stats);
      closer = await this._handleDir(parent, stats, initialAdd, depth, path, wh, targetPath);
      if (this.fsw.closed) return;

      // preserve this symlink's target path
      if (targetPath !== undefined) {
        this.fsw._symlinkPaths.set(sysPath.resolve(path), targetPath);
      }
    } else {
      closer = this._handleFile(wh.watchPath, stats, initialAdd);
    }
    ready();

    this.fsw._addPathCloser(path, closer);
    return false;

  } catch (error) {
    if (this.fsw._handleError(error)) {
      ready();
      return path;
    }
  }
}

}

module.exports = NodeFsHandler;


/***/ }),

/***/ "./node_modules/date-time/index.js":
/*!*****************************************!*\
  !*** ./node_modules/date-time/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const timeZone = __webpack_require__(/*! time-zone */ "./node_modules/time-zone/index.js");

const dateTime = options => {
	options = Object.assign({
		date: new Date(),
		local: true,
		showTimeZone: false,
		showMilliseconds: false
	}, options);

	let {date} = options;

	if (options.local) {
		// Offset the date so it will return the correct value when getting the ISO string
		date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
	}

	let end = '';

	if (options.showTimeZone) {
		end = ' UTC' + (options.local ? timeZone(date) : '');
	}

	if (options.showMilliseconds && date.getUTCMilliseconds() > 0) {
		end = ` ${date.getUTCMilliseconds()}ms${end}`;
	}

	return date
		.toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, end);
};

module.exports = dateTime;
// TODO: Remove this for the next major release
module.exports.default = dateTime;


/***/ }),

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const electron = __webpack_require__(/*! electron */ "electron");

if (typeof electron === 'string') {
	throw new TypeError('Not running in an Electron environment!');
}

const app = electron.app || electron.remote.app;

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

module.exports = isEnvSet ? getFromEnv : !app.isPackaged;


/***/ }),

/***/ "./node_modules/electron-reloader/index.js":
/*!*************************************************!*\
  !*** ./node_modules/electron-reloader/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {inspect} = __webpack_require__(/*! util */ "util");
const path = __webpack_require__(/*! path */ "path");
const electron = __webpack_require__(/*! electron */ "electron");
const chokidar = __webpack_require__(/*! chokidar */ "./node_modules/chokidar/index.js");
const isDev = __webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js");
const dateTime = __webpack_require__(/*! date-time */ "./node_modules/date-time/index.js");
const chalk = __webpack_require__(/*! chalk */ "./node_modules/electron-reloader/node_modules/chalk/source/index.js");
const findUp = __webpack_require__(/*! find-up */ "./node_modules/electron-reloader/node_modules/find-up/index.js");

function getMainProcessPaths(topModuleObject, cwd) {
	const paths = new Set([topModuleObject.filename]);

	const getPaths = moduleObject => {
		for (const child of moduleObject.children) {
			if (path.relative(cwd, child.filename).includes('node_modules')) {
				continue;
			}

			paths.add(child.filename);
			getPaths(child);
		}
	};

	getPaths(topModuleObject);

	return paths;
}

module.exports = (moduleObject, options) => {
	// This module should be a dev dependency, but guard
	// this in case the user included it as a dependency.
	if (!isDev) {
		return;
	}

	if (!moduleObject) {
		throw new Error('You have to pass the `module` object');
	}

	options = {
		watchRenderer: true,
		...options
	};

	const mainProcessDirectory = path.dirname(moduleObject.filename);
	const packageDirectory = findUp.sync('package.json', {cwd: mainProcessDirectory});
	const cwd = packageDirectory ? path.dirname(packageDirectory) : mainProcessDirectory;
	const mainProcessPaths = getMainProcessPaths(moduleObject, cwd);
	const watchPaths = options.watchRenderer ? cwd : [...mainProcessPaths];
	let isRelaunching = false;

	const watcher = chokidar.watch(watchPaths, {
		cwd,
		disableGlobbing: true,
		ignored: [
			/(^|[/\\])\../, // Dotfiles
			'node_modules',
			'**/*.map'
		].concat(options.ignore)
	});

	electron.app.on('quit', () => {
		watcher.close();
	});

	if (options.debug) {
		watcher.on('ready', () => {
			console.log('Watched paths:', inspect(watcher.getWatched(), {compact: false, colors: true}));
		});
	}

	watcher.on('change', filePath => {
		if (options.debug) {
			console.log('File changed:', chalk.bold(filePath), chalk.dim(`(${dateTime().split(' ')[1]})`));
		}

		if (mainProcessPaths.has(path.join(cwd, filePath))) {
			// Prevent multiple instances of Electron from being started due to the change
			// handler being called multiple times before the original instance exits.
			if (!isRelaunching) {
				electron.app.relaunch();
				electron.app.exit(0);
			}

			isRelaunching = true;
		} else {
			for (const window_ of electron.BrowserWindow.getAllWindows()) {
				window_.webContents.reloadIgnoringCache();

				for (const view_ of window_.getBrowserViews()) {
					view_.webContents.reloadIgnoringCache();
				}
			}
		}
	});
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/ansi-styles/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/ansi-styles/index.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = __webpack_require__(/*! color-convert */ "./node_modules/electron-reloader/node_modules/color-convert/index.js");
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/chalk/source/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/chalk/source/index.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const ansiStyles = __webpack_require__(/*! ansi-styles */ "./node_modules/electron-reloader/node_modules/ansi-styles/index.js");
const {stdout: stdoutColor, stderr: stderrColor} = __webpack_require__(/*! supports-color */ "./node_modules/electron-reloader/node_modules/supports-color/browser.js");
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = __webpack_require__(/*! ./util */ "./node_modules/electron-reloader/node_modules/chalk/source/util.js");

const {isArray} = Array;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
			return applyStyle(builder, chalkTag(builder, ...arguments_));
		}

		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!isArray(firstString) || !isArray(firstString.raw)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = __webpack_require__(/*! ./templates */ "./node_modules/electron-reloader/node_modules/chalk/source/templates.js");
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

module.exports = chalk;


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/chalk/source/templates.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/chalk/source/templates.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	const u = c[0] === 'u';
	const bracket = c[1] === '{';

	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	if (u && bracket) {
		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, arguments_) {
	const results = [];
	const chunks = arguments_.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		const number = Number(chunk);
		if (!Number.isNaN(number)) {
			results.push(number);
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const [styleName, styles] of Object.entries(enabled)) {
		if (!Array.isArray(styles)) {
			continue;
		}

		if (!(styleName in current)) {
			throw new Error(`Unknown Chalk style: ${styleName}`);
		}

		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
	}

	return current;
}

module.exports = (chalk, temporary) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
		if (escapeCharacter) {
			chunk.push(unescape(escapeCharacter));
		} else if (style) {
			const string = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(character);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMessage);
	}

	return chunks.join('');
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/chalk/source/util.js":
/*!**************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/chalk/source/util.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


const stringReplaceAll = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

module.exports = {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/color-convert/conversions.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/color-convert/conversions.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/electron-reloader/node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/color-convert/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/color-convert/index.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/electron-reloader/node_modules/color-convert/conversions.js");
const route = __webpack_require__(/*! ./route */ "./node_modules/electron-reloader/node_modules/color-convert/route.js");

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/color-convert/route.js":
/*!****************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/color-convert/route.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/electron-reloader/node_modules/color-convert/conversions.js");

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/color-name/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/color-name/index.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/find-up/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/find-up/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const path = __webpack_require__(/*! path */ "path");
const locatePath = __webpack_require__(/*! locate-path */ "./node_modules/electron-reloader/node_modules/locate-path/index.js");
const pathExists = __webpack_require__(/*! path-exists */ "./node_modules/path-exists/index.js");

const stop = Symbol('findUp.stop');

module.exports = async (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.sync = (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = locateOptions => {
		if (typeof name !== 'function') {
			return locatePath.sync(paths, locateOptions);
		}

		const foundPath = name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath.sync([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const foundPath = runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.exists = pathExists;

module.exports.sync.exists = pathExists.sync;

module.exports.stop = stop;


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/locate-path/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/locate-path/index.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
const {promisify} = __webpack_require__(/*! util */ "util");
const pLocate = __webpack_require__(/*! p-locate */ "./node_modules/electron-reloader/node_modules/p-locate/index.js");

const fsStat = promisify(fs.stat);
const fsLStat = promisify(fs.lstat);

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile'
};

function checkType({type}) {
	if (type in typeMappings) {
		return;
	}

	throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

module.exports = async (paths, options) => {
	options = {
		cwd: process.cwd(),
		type: 'file',
		allowSymlinks: true,
		...options
	};

	checkType(options);

	const statFn = options.allowSymlinks ? fsStat : fsLStat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFn(path.resolve(options.cwd, path_));
			return matchType(options.type, stat);
		} catch {
			return false;
		}
	}, options);
};

module.exports.sync = (paths, options) => {
	options = {
		cwd: process.cwd(),
		allowSymlinks: true,
		type: 'file',
		...options
	};

	checkType(options);

	const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;

	for (const path_ of paths) {
		try {
			const stat = statFn(path.resolve(options.cwd, path_));

			if (matchType(options.type, stat)) {
				return path_;
			}
		} catch {}
	}
};


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/p-limit/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/p-limit/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Queue = __webpack_require__(/*! yocto-queue */ "./node_modules/yocto-queue/index.js");

const pLimit = concurrency => {
	if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = new Queue();
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.size > 0) {
			queue.dequeue()();
		}
	};

	const run = async (fn, resolve, ...args) => {
		activeCount++;

		const result = (async () => fn(...args))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (fn, resolve, ...args) => {
		queue.enqueue(run.bind(null, fn, resolve, ...args));

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// when the run function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency && queue.size > 0) {
				queue.dequeue()();
			}
		})();
	};

	const generator = (fn, ...args) => new Promise(resolve => {
		enqueue(fn, resolve, ...args);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount
		},
		pendingCount: {
			get: () => queue.size
		},
		clearQueue: {
			value: () => {
				queue.clear();
			}
		}
	});

	return generator;
};

module.exports = pLimit;


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/p-locate/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/p-locate/index.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const pLimit = __webpack_require__(/*! p-limit */ "./node_modules/electron-reloader/node_modules/p-limit/index.js");

class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// The input can also be a promise, so we await it
const testElement = async (element, tester) => tester(await element);

// The input can also be a promise, so we `Promise.all()` them both
const finder = async element => {
	const values = await Promise.all(element);
	if (values[1] === true) {
		throw new EndError(values[0]);
	}

	return false;
};

const pLocate = async (iterable, tester, options) => {
	options = {
		concurrency: Infinity,
		preserveOrder: true,
		...options
	};

	const limit = pLimit(options.concurrency);

	// Start all the promises concurrently with optional limit
	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

	// Check the promises either serially or concurrently
	const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

	try {
		await Promise.all(items.map(element => checkLimit(finder, element)));
	} catch (error) {
		if (error instanceof EndError) {
			return error.value;
		}

		throw error;
	}
};

module.exports = pLocate;


/***/ }),

/***/ "./node_modules/electron-reloader/node_modules/supports-color/browser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-reloader/node_modules/supports-color/browser.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";

module.exports = {
	stdout: false,
	stderr: false
};


/***/ }),

/***/ "./node_modules/fill-range/index.js":
/*!******************************************!*\
  !*** ./node_modules/fill-range/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */



const util = __webpack_require__(/*! util */ "util");
const toRegexRange = __webpack_require__(/*! to-regex-range */ "./node_modules/to-regex-range/index.js");

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform = toNumber => {
  return value => toNumber === true ? Number(value) : String(value);
};

const isValidValue = value => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber = num => Number.isInteger(+num);

const zeros = input => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify = (start, end, options) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen = (input, maxLength) => {
  let negative = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  let prefix = options.capture ? '' : '?:';
  let positives = '';
  let negatives = '';
  let result;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start = String.fromCharCode(a);
  if (a === b) return start;

  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError = (...args) => {
  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};

const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify(start, end, options) === false;
  let format = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts = { negatives: [], positives: [] };
  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters = (start, end, step = 1, options = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format = options.transform || (val => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);

  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill(start, end, 1, { transform: step });
  }

  if (isObject(step)) {
    return fill(start, end, 0, step);
  }

  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber(step)) {
    if (step != null && !isObject(step)) return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }

  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

module.exports = fill;


/***/ }),

/***/ "./node_modules/glob-parent/index.js":
/*!*******************************************!*\
  !*** ./node_modules/glob-parent/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isGlob = __webpack_require__(/*! is-glob */ "./node_modules/is-glob/index.js");
var pathPosixDirname = __webpack_require__(/*! path */ "path").posix.dirname;
var isWin32 = __webpack_require__(/*! os */ "os").platform() === 'win32';

var slash = '/';
var backslash = /\\/g;
var enclosure = /[\{\[].*[\}\]]$/;
var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 * @returns {string}
 */
module.exports = function globParent(str, opts) {
  var options = Object.assign({ flipBackslashes: true }, opts);

  // flip windows path separators
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (enclosure.test(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  // remove path parts that are globby
  do {
    str = pathPosixDirname(str);
  } while (isGlob(str) || globby.test(str));

  // remove escape chars and return result
  return str.replace(escaped, '$1');
};


/***/ }),

/***/ "./node_modules/is-binary-path/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-binary-path/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const path = __webpack_require__(/*! path */ "path");
const binaryExtensions = __webpack_require__(/*! binary-extensions */ "./node_modules/binary-extensions/index.js");

const extensions = new Set(binaryExtensions);

module.exports = filePath => extensions.has(path.extname(filePath).slice(1).toLowerCase());


/***/ }),

/***/ "./node_modules/is-extglob/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-extglob/index.js ***!
  \******************************************/
/***/ ((module) => {

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function isExtglob(str) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  var match;
  while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
    if (match[2]) return true;
    str = str.slice(match.index + match[0].length);
  }

  return false;
};


/***/ }),

/***/ "./node_modules/is-glob/index.js":
/*!***************************************!*\
  !*** ./node_modules/is-glob/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isExtglob = __webpack_require__(/*! is-extglob */ "./node_modules/is-extglob/index.js");
var chars = { '{': '}', '(': ')', '[': ']'};
var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;

module.exports = function isGlob(str, options) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  if (isExtglob(str)) {
    return true;
  }

  var regex = strictRegex;
  var match;

  // optionally relax regex
  if (options && options.strict === false) {
    regex = relaxedRegex;
  }

  while ((match = regex.exec(str))) {
    if (match[2]) return true;
    var idx = match.index + match[0].length;

    // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character
    var open = match[1];
    var close = open ? chars[open] : null;
    if (open && close) {
      var n = str.indexOf(close, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }

    str = str.slice(idx);
  }
  return false;
};


/***/ }),

/***/ "./node_modules/is-number/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-number/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};


/***/ }),

/***/ "./node_modules/normalize-path/index.js":
/*!**********************************************!*\
  !*** ./node_modules/normalize-path/index.js ***!
  \**********************************************/
/***/ ((module) => {

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

module.exports = function(path, stripTrailing) {
  if (typeof path !== 'string') {
    throw new TypeError('expected path to be a string');
  }

  if (path === '\\' || path === '/') return '/';

  var len = path.length;
  if (len <= 1) return path;

  // ensure that win32 namespaces has two leading slashes, so that the path is
  // handled properly by the win32 version of path.parse() after being normalized
  // https://msdn.microsoft.com/library/windows/desktop/aa365247(v=vs.85).aspx#namespaces
  var prefix = '';
  if (len > 4 && path[3] === '\\') {
    var ch = path[2];
    if ((ch === '?' || ch === '.') && path.slice(0, 2) === '\\\\') {
      path = path.slice(2);
      prefix = '//';
    }
  }

  var segs = path.split(/[/\\]+/);
  if (stripTrailing !== false && segs[segs.length - 1] === '') {
    segs.pop();
  }
  return prefix + segs.join('/');
};


/***/ }),

/***/ "./node_modules/path-exists/index.js":
/*!*******************************************!*\
  !*** ./node_modules/path-exists/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const fs = __webpack_require__(/*! fs */ "fs");
const {promisify} = __webpack_require__(/*! util */ "util");

const pAccess = promisify(fs.access);

module.exports = async path => {
	try {
		await pAccess(path);
		return true;
	} catch (_) {
		return false;
	}
};

module.exports.sync = path => {
	try {
		fs.accessSync(path);
		return true;
	} catch (_) {
		return false;
	}
};


/***/ }),

/***/ "./node_modules/picomatch/index.js":
/*!*****************************************!*\
  !*** ./node_modules/picomatch/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./lib/picomatch */ "./node_modules/picomatch/lib/picomatch.js");


/***/ }),

/***/ "./node_modules/picomatch/lib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/picomatch/lib/constants.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(/*! path */ "path");
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

module.exports = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};


/***/ }),

/***/ "./node_modules/picomatch/lib/parse.js":
/*!*********************************************!*\
  !*** ./node_modules/picomatch/lib/parse.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const constants = __webpack_require__(/*! ./constants */ "./node_modules/picomatch/lib/constants.js");
const utils = __webpack_require__(/*! ./utils */ "./node_modules/picomatch/lib/utils.js");

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = opts => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || '';
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };

  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren') {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');
    let rest;

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        output = token.close = `)${rest})${extglobStar})`;
      }

      if (token.prev.type === 'bos') {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = opts => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

module.exports = parse;


/***/ }),

/***/ "./node_modules/picomatch/lib/picomatch.js":
/*!*************************************************!*\
  !*** ./node_modules/picomatch/lib/picomatch.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(/*! path */ "path");
const scan = __webpack_require__(/*! ./scan */ "./node_modules/picomatch/lib/scan.js");
const parse = __webpack_require__(/*! ./parse */ "./node_modules/picomatch/lib/parse.js");
const utils = __webpack_require__(/*! ./utils */ "./node_modules/picomatch/lib/utils.js");
const constants = __webpack_require__(/*! ./constants */ "./node_modules/picomatch/lib/constants.js");
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan(input, options);

/**
 * Compile a regular expression from the `state` object returned by the
 * [parse()](#parse) method.
 *
 * @param {Object} `state`
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
 * @return {RegExp}
 * @api public
 */

picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${state.output})${append}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }

  return regex;
};

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  let parsed = { negated: false, fastpaths: true };

  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    parsed.output = parse.fastpaths(input, options);
  }

  if (!parsed.output) {
    parsed = parse(input, options);
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants;

/**
 * Expose "picomatch"
 */

module.exports = picomatch;


/***/ }),

/***/ "./node_modules/picomatch/lib/scan.js":
/*!********************************************!*\
  !*** ./node_modules/picomatch/lib/scan.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const utils = __webpack_require__(/*! ./utils */ "./node_modules/picomatch/lib/utils.js");
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = __webpack_require__(/*! ./constants */ "./node_modules/picomatch/lib/constants.js");

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

module.exports = scan;


/***/ }),

/***/ "./node_modules/picomatch/lib/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/picomatch/lib/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(/*! path */ "path");
const win32 = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = __webpack_require__(/*! ./constants */ "./node_modules/picomatch/lib/constants.js");

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};


/***/ }),

/***/ "./node_modules/readdirp/index.js":
/*!****************************************!*\
  !*** ./node_modules/readdirp/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(/*! fs */ "fs");
const { Readable } = __webpack_require__(/*! stream */ "stream");
const sysPath = __webpack_require__(/*! path */ "path");
const { promisify } = __webpack_require__(/*! util */ "util");
const picomatch = __webpack_require__(/*! picomatch */ "./node_modules/picomatch/index.js");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const lstat = promisify(fs.lstat);
const realpath = promisify(fs.realpath);

/**
 * @typedef {Object} EntryInfo
 * @property {String} path
 * @property {String} fullPath
 * @property {fs.Stats=} stats
 * @property {fs.Dirent=} dirent
 * @property {String} basename
 */

const BANG = '!';
const NORMAL_FLOW_ERRORS = new Set(['ENOENT', 'EPERM', 'EACCES', 'ELOOP']);
const FILE_TYPE = 'files';
const DIR_TYPE = 'directories';
const FILE_DIR_TYPE = 'files_directories';
const EVERYTHING_TYPE = 'all';
const ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];

const isNormalFlowError = error => NORMAL_FLOW_ERRORS.has(error.code);

const normalizeFilter = filter => {
  if (filter === undefined) return;
  if (typeof filter === 'function') return filter;

  if (typeof filter === 'string') {
    const glob = picomatch(filter.trim());
    return entry => glob(entry.basename);
  }

  if (Array.isArray(filter)) {
    const positive = [];
    const negative = [];
    for (const item of filter) {
      const trimmed = item.trim();
      if (trimmed.charAt(0) === BANG) {
        negative.push(picomatch(trimmed.slice(1)));
      } else {
        positive.push(picomatch(trimmed));
      }
    }

    if (negative.length > 0) {
      if (positive.length > 0) {
        return entry =>
          positive.some(f => f(entry.basename)) && !negative.some(f => f(entry.basename));
      }
      return entry => !negative.some(f => f(entry.basename));
    }
    return entry => positive.some(f => f(entry.basename));
  }
};

class ReaddirpStream extends Readable {
  static get defaultOptions() {
    return {
      root: '.',
      /* eslint-disable no-unused-vars */
      fileFilter: (path) => true,
      directoryFilter: (path) => true,
      /* eslint-enable no-unused-vars */
      type: FILE_TYPE,
      lstat: false,
      depth: 2147483648,
      alwaysStat: false
    };
  }

  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark || 4096
    });
    const opts = { ...ReaddirpStream.defaultOptions, ...options };
    const { root, type } = opts;

    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);

    const statMethod = opts.lstat ? lstat : stat;
    // Use bigint stats if it's windows and stat() supports options (node 10+).
    if (process.platform === 'win32' && stat.length === 3) {
      this._stat = path => statMethod(path, { bigint: true });
    } else {
      this._stat = statMethod;
    }

    this._maxDepth = opts.depth;
    this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
    this._wantsEverything = type === EVERYTHING_TYPE;
    this._root = sysPath.resolve(root);
    this._isDirent = ('Dirent' in fs) && !opts.alwaysStat;
    this._statsProp = this._isDirent ? 'dirent' : 'stats';
    this._rdOptions = { encoding: 'utf8', withFileTypes: this._isDirent };

    // Launch stream with one parent, the root dir.
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = undefined;
  }

  async _read(batch) {
    if (this.reading) return;
    this.reading = true;

    try {
      while (!this.destroyed && batch > 0) {
        const { path, depth, files = [] } = this.parent || {};

        if (files.length > 0) {
          const slice = files.splice(0, batch).map(dirent => this._formatEntry(dirent, path));
          for (const entry of await Promise.all(slice)) {
            if (this.destroyed) return;

            const entryType = await this._getEntryType(entry);
            if (entryType === 'directory' && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }

              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === 'file' || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed) return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }

  async _exploreDir(path, depth) {
    let files;
    try {
      files = await readdir(path, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return {files, depth, path};
  }

  async _formatEntry(dirent, path) {
    let entry;
    try {
      const basename = this._isDirent ? dirent.name : dirent;
      const fullPath = sysPath.resolve(sysPath.join(path, basename));
      entry = {path: sysPath.relative(this._root, fullPath), fullPath, basename};
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
    }
    return entry;
  }

  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit('warn', err);
    } else {
      this.destroy(err);
    }
  }

  async _getEntryType(entry) {
    // entry may be undefined, because a warning or an error were emitted
    // and the statsProp is undefined
    const stats = entry && entry[this._statsProp];
    if (!stats) {
      return;
    }
    if (stats.isFile()) {
      return 'file';
    }
    if (stats.isDirectory()) {
      return 'directory';
    }
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await realpath(full);
        const entryRealPathStats = await lstat(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return 'file';
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
            return this._onError(new Error(
              `Circular symlink detected: "${full}" points to "${entryRealPath}"`
            ));
          }
          return 'directory';
        }
      } catch (error) {
        this._onError(error);
      }
    }
  }

  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];

    return stats && this._wantsEverything && !stats.isDirectory();
  }
}

/**
 * @typedef {Object} ReaddirpArguments
 * @property {Function=} fileFilter
 * @property {Function=} directoryFilter
 * @property {String=} type
 * @property {Number=} depth
 * @property {String=} root
 * @property {Boolean=} lstat
 * @property {Boolean=} bigint
 */

/**
 * Main function which ends up calling readdirRec and reads all files and directories in given root recursively.
 * @param {String} root Root directory
 * @param {ReaddirpArguments=} options Options to specify root (start directory), filters and recursion depth
 */
const readdirp = (root, options = {}) => {
  let type = options.entryType || options.type;
  if (type === 'both') type = FILE_DIR_TYPE; // backwards-compatibility
  if (type) options.type = type;
  if (!root) {
    throw new Error('readdirp: root argument is required. Usage: readdirp(root, options)');
  } else if (typeof root !== 'string') {
    throw new TypeError('readdirp: root argument must be a string. Usage: readdirp(root, options)');
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(', ')}`);
  }

  options.root = root;
  return new ReaddirpStream(options);
};

const readdirpPromise = (root, options = {}) => {
  return new Promise((resolve, reject) => {
    const files = [];
    readdirp(root, options)
      .on('data', entry => files.push(entry))
      .on('end', () => resolve(files))
      .on('error', error => reject(error));
  });
};

readdirp.promise = readdirpPromise;
readdirp.ReaddirpStream = ReaddirpStream;
readdirp.default = readdirp;

module.exports = readdirp;


/***/ }),

/***/ "./node_modules/time-zone/index.js":
/*!*****************************************!*\
  !*** ./node_modules/time-zone/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";

module.exports = date => {
	const offset = (date || new Date()).getTimezoneOffset();
	const absOffset = Math.abs(offset);
	const hours = Math.floor(absOffset / 60);
	const minutes = absOffset % 60;
	const minutesOut = minutes > 0 ? ':' + ('0' + minutes).slice(-2) : '';

	return (offset < 0 ? '+' : '-') + hours + minutesOut;
};


/***/ }),

/***/ "./node_modules/to-regex-range/index.js":
/*!**********************************************!*\
  !*** ./node_modules/to-regex-range/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const isNumber = __webpack_require__(/*! is-number */ "./node_modules/is-number/index.js");

const toRegexRange = (min, max, options) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a = Math.min(min, max);
  let b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives, opts);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
  let onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
  let intersected = filterPatterns(neg, pos, '-?', true, options) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  let nines = 1;
  let zeros = 1;

  let stop = countNines(min, nines);
  let stops = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = '';
  let count = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit, options);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;

  for (let i = 0; i < ranges.length; i++) {
    let max = ranges[i];
    let obj = rangeToPattern(String(start), String(max), options);
    let zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr, key, val) {
  return arr.some(ele => ele[key] === val);
}

function countNines(min, len) {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a, b, options) {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }

  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});

/**
 * Expose `toRegexRange`
 */

module.exports = toRegexRange;


/***/ }),

/***/ "./node_modules/yocto-queue/index.js":
/*!*******************************************!*\
  !*** ./node_modules/yocto-queue/index.js ***!
  \*******************************************/
/***/ ((module) => {

class Node {
	/// value;
	/// next;

	constructor(value) {
		this.value = value;

		// TODO: Remove this when targeting Node.js 12.
		this.next = undefined;
	}
}

class Queue {
	// TODO: Use private class fields when targeting Node.js 12.
	// #_head;
	// #_tail;
	// #_size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this._head) {
			this._tail.next = node;
			this._tail = node;
		} else {
			this._head = node;
			this._tail = node;
		}

		this._size++;
	}

	dequeue() {
		const current = this._head;
		if (!current) {
			return;
		}

		this._head = this._head.next;
		this._size--;
		return current.value;
	}

	clear() {
		this._head = undefined;
		this._tail = undefined;
		this._size = 0;
	}

	get size() {
		return this._size;
	}

	* [Symbol.iterator]() {
		let current = this._head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}

module.exports = Queue;


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");;

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");;

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./main.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./data.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9hbnltYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL2RhdGEuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9tYWluLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2JpbmFyeS1leHRlbnNpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2JyYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9leHBhbmQuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9icmFjZXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9icmFjZXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2Nob2tpZGFyL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2Nob2tpZGFyL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvY2hva2lkYXIvbGliL2ZzZXZlbnRzLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvY2hva2lkYXIvbGliL25vZGVmcy1oYW5kbGVyLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2RhdGUtdGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9lbGVjdHJvbi1pcy1kZXYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tcmVsb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tcmVsb2FkZXIvbm9kZV9tb2R1bGVzL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tcmVsb2FkZXIvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS90ZW1wbGF0ZXMuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tcmVsb2FkZXIvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS91dGlsLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2NvbnZlcnNpb25zLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L3JvdXRlLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9maW5kLXVwL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXJlbG9hZGVyL25vZGVfbW9kdWxlcy9sb2NhdGUtcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9lbGVjdHJvbi1yZWxvYWRlci9ub2RlX21vZHVsZXMvcC1saW1pdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9lbGVjdHJvbi1yZWxvYWRlci9ub2RlX21vZHVsZXMvcC1sb2NhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tcmVsb2FkZXIvbm9kZV9tb2R1bGVzL3N1cHBvcnRzLWNvbG9yL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvZmlsbC1yYW5nZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9nbG9iLXBhcmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9pcy1iaW5hcnktcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9pcy1leHRnbG9iL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL2lzLWdsb2IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Jhc2gvLi9ub2RlX21vZHVsZXMvaXMtbnVtYmVyL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS1wYXRoL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3BhdGgtZXhpc3RzL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3BpY29tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BhcnNlLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3BpY29tYXRjaC9saWIvcGljb21hdGNoLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3BpY29tYXRjaC9saWIvc2Nhbi5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3JlYWRkaXJwL2luZGV4LmpzIiwid2VicGFjazovL2NyYXNoLy4vbm9kZV9tb2R1bGVzL3RpbWUtem9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy90by1yZWdleC1yYW5nZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC8uL25vZGVfbW9kdWxlcy95b2N0by1xdWV1ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jcmFzaC9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly9jcmFzaC9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvZXh0ZXJuYWwgXCJvc1wiIiwid2VicGFjazovL2NyYXNoL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovL2NyYXNoL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvZXh0ZXJuYWwgXCJ1dGlsXCIiLCJ3ZWJwYWNrOi8vY3Jhc2gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3Jhc2gvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jcmFzaC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsibGFiZWxzIiwiZGF0YSIsImRhdGFzZXRzIiwibGFiZWwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsImNvbmZpZyIsInR5cGUiLCJvcHRpb25zIiwibXlDaGFydCIsIkNoYXJ0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcCIsIkJyb3dzZXJXaW5kb3ciLCJyZXF1aXJlIiwibW9kdWxlIiwiXyIsInBhdGgiLCJjcmVhdGVXaW5kb3ciLCJ3aW4iLCJ3aWR0aCIsImhlaWdodCIsImZyYW1lIiwicmVzaXplYWJsZSIsIndlYlByZWZlcmVuY2VzIiwicHJlbG9hZCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJsb2FkRmlsZSIsIndoZW5SZWFkeSIsInRoZW4iLCJvbiIsImdldEFsbHdpbmRvd3MiLCJsZW5ndGgiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJxdWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsOENBQTZDLENBQUMsY0FBYyxFQUFDOztBQUU3RCxrQkFBa0IsbUJBQU8sQ0FBQyxvREFBVztBQUNyQyxzQkFBc0IsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRTlDO0FBQ0EsYUFBYSxnQ0FBZ0M7QUFDN0MsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSxrQ0FBa0M7QUFDL0M7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsNEJBQTRCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsYUFBYTtBQUN4QixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGtCQUFrQjtBQUM3QixXQUFXLFNBQVM7QUFDcEIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsU0FBUzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7O0FDMWdCUjs7QUFFYixXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixnQkFBZ0IsbUJBQU8sQ0FBQyxrQkFBTTtBQUM5QixPQUFPLFlBQVksR0FBRyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3BDLHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsNkRBQWE7O0FBRXpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsSUFBSTtBQUNsQixjQUFjLElBQUk7QUFDbEIsY0FBYyxJQUFJO0FBQ2xCLGNBQWMsY0FBYztBQUM1QixjQUFjLFNBQVM7QUFDdkI7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLE9BQU87QUFDbEIsV0FBVyxHQUFHO0FBQ2QsV0FBVyxHQUFHO0FBQ2QsV0FBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsU0FBUyxpQ0FBaUM7QUFDMUM7O0FBRUEsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLFNBQVMscUJBQXFCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsV0FBVztBQUN0RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLDZCQUE2QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUDtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxrQkFBa0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyb0JhO0FBQ2IsaUJBQWlCLG1CQUFPLENBQUMsb0RBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsTUFBTSxLQUFLOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksMEJBQTBCLElBQUksSUFBSTtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7Ozs7OztBQ3BDVDtBQUNiLGlCQUFpQixtQkFBTyxDQUFDLDBCQUFVOztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDWmE7QUFDYixPQUFPLFFBQVEsR0FBRyxtQkFBTyxDQUFDLGtCQUFNO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixpQkFBaUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNuQyxpQkFBaUIsbUJBQU8sQ0FBQyxrREFBVTtBQUNuQyxjQUFjLG1CQUFPLENBQUMsZ0VBQWlCO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3BDLGNBQWMsbUJBQU8sQ0FBQyxrRkFBTztBQUM3QixlQUFlLG1CQUFPLENBQUMsK0VBQVM7O0FBRWhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQsMEJBQTBCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxnRUFBZ0UsNkJBQTZCO0FBQzdGLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0Esb0VBQW9FLHlCQUF5QjtBQUM3Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7QUNoR2E7O0FBRWI7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYSxFQUFFLEVBQUUsS0FBSztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTztBQUM5RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLFdBQVcsK0JBQStCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBTyxDQUFDLDJGQUFlO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCLHFCQUFxQixTQUFTO0FBQzlCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2xLWTtBQUNiLG1CQUFtQixtQkFBTyxDQUFDLHVGQUFhO0FBQ3hDLE9BQU8seUNBQXlDLEdBQUcsbUJBQU8sQ0FBQywrRkFBZ0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsa0ZBQVE7O0FBRXBCLE9BQU8sUUFBUTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZUFBZTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLE9BQU8sS0FBSztBQUNoRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxrQkFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLHdCQUF3QjtBQUN4QztBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLG1CQUFPLENBQUMsNEZBQWE7QUFDbEM7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQSxzQkFBc0IsMkNBQTJDLEVBQUU7QUFDbkU7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3BPYTtBQUNiLDBDQUEwQyxFQUFFLEdBQUcsUUFBUSxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVUsdUVBQXVFO0FBQzNKO0FBQ0E7QUFDQSxxQ0FBcUMsRUFBRSxFQUFFLFFBQVEsS0FBSyxXQUFXLEVBQUU7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsNkRBQTZELE1BQU0sY0FBYyxLQUFLO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsVUFBVTtBQUNyRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1DQUFtQztBQUNuRCxHQUFHO0FBQ0g7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0EsMERBQTBELGNBQWMsa0JBQWtCLCtCQUErQixLQUFLO0FBQzlIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDcklhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxxRkFBWTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsUUFBUSw0QkFBNEI7QUFDcEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyw2QkFBNkI7QUFDcEMsV0FBVyxpQ0FBaUM7QUFDNUMsVUFBVSxnQ0FBZ0M7QUFDMUMsV0FBVyxpQ0FBaUM7QUFDNUMsT0FBTyxxQ0FBcUM7QUFDNUMsU0FBUywyQ0FBMkM7QUFDcEQsUUFBUTtBQUNSOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLGlCQUFpQjtBQUN6QjtBQUNBO0FBQ0Esb0RBQW9ELGdCQUFnQjtBQUNwRSxrREFBa0QsY0FBYztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUSxTQUFTO0FBQ2pDLGdCQUFnQixRQUFRLFNBQVM7QUFDakMsaUJBQWlCLE9BQU8sUUFBUTtBQUNoQyxpQkFBaUIsT0FBTyxRQUFRO0FBQ2hDLGdCQUFnQixTQUFTLE9BQU87QUFDaEMsZ0JBQWdCLFNBQVMsT0FBTztBQUNoQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUU7O0FBRXpFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsRUFBRSxVQUFVLEVBQUU7QUFDL0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztBQUNBLGVBQWUsYUFBYSxhQUFhO0FBQ3pDO0FBQ0EsZUFBZSxhQUFhLGFBQWE7QUFDekM7QUFDQSxlQUFlLGFBQWEsYUFBYTtBQUN6QztB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QTtXQUNBLEU7Ozs7O1VDSkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG5jb25zdCBub3JtYWxpemVQYXRoID0gcmVxdWlyZSgnbm9ybWFsaXplLXBhdGgnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7KHRlc3RTdHJpbmc6IHN0cmluZykgPT4gYm9vbGVhbn0gQW55bWF0Y2hGblxuICogQHR5cGVkZWYge3N0cmluZ3xSZWdFeHB8QW55bWF0Y2hGbn0gQW55bWF0Y2hQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7QW55bWF0Y2hQYXR0ZXJufEFueW1hdGNoUGF0dGVybltdfSBBbnltYXRjaE1hdGNoZXJcbiAqL1xuY29uc3QgQkFORyA9ICchJztcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtyZXR1cm5JbmRleDogZmFsc2V9O1xuY29uc3QgYXJyaWZ5ID0gKGl0ZW0pID0+IEFycmF5LmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4vKipcbiAqIEBwYXJhbSB7QW55bWF0Y2hQYXR0ZXJufSBtYXRjaGVyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMge0FueW1hdGNoRm59XG4gKi9cbmNvbnN0IGNyZWF0ZVBhdHRlcm4gPSAobWF0Y2hlciwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIG1hdGNoZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF0Y2hlcjtcbiAgfVxuICBpZiAodHlwZW9mIG1hdGNoZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZ2xvYiA9IHBpY29tYXRjaChtYXRjaGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKHN0cmluZykgPT4gbWF0Y2hlciA9PT0gc3RyaW5nIHx8IGdsb2Ioc3RyaW5nKTtcbiAgfVxuICBpZiAobWF0Y2hlciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAoc3RyaW5nKSA9PiBtYXRjaGVyLnRlc3Qoc3RyaW5nKTtcbiAgfVxuICByZXR1cm4gKHN0cmluZykgPT4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSBwYXR0ZXJuc1xuICogQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IG5lZ1BhdHRlcm5zXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYXJnc1xuICogQHBhcmFtIHtCb29sZWFufSByZXR1cm5JbmRleFxuICogQHJldHVybnMge2Jvb2xlYW58bnVtYmVyfVxuICovXG5jb25zdCBtYXRjaFBhdHRlcm5zID0gKHBhdHRlcm5zLCBuZWdQYXR0ZXJucywgYXJncywgcmV0dXJuSW5kZXgpID0+IHtcbiAgY29uc3QgaXNMaXN0ID0gQXJyYXkuaXNBcnJheShhcmdzKTtcbiAgY29uc3QgX3BhdGggPSBpc0xpc3QgPyBhcmdzWzBdIDogYXJncztcbiAgaWYgKCFpc0xpc3QgJiYgdHlwZW9mIF9wYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FueW1hdGNoOiBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZzogZ290ICcgK1xuICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKF9wYXRoKSlcbiAgfVxuICBjb25zdCBwYXRoID0gbm9ybWFsaXplUGF0aChfcGF0aCk7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG5lZ1BhdHRlcm5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IG5nbG9iID0gbmVnUGF0dGVybnNbaW5kZXhdO1xuICAgIGlmIChuZ2xvYihwYXRoKSkge1xuICAgICAgcmV0dXJuIHJldHVybkluZGV4ID8gLTEgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhcHBsaWVkID0gaXNMaXN0ICYmIFtwYXRoXS5jb25jYXQoYXJncy5zbGljZSgxKSk7XG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXR0ZXJucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gcGF0dGVybnNbaW5kZXhdO1xuICAgIGlmIChpc0xpc3QgPyBwYXR0ZXJuKC4uLmFwcGxpZWQpIDogcGF0dGVybihwYXRoKSkge1xuICAgICAgcmV0dXJuIHJldHVybkluZGV4ID8gaW5kZXggOiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXR1cm5JbmRleCA/IC0xIDogZmFsc2U7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7QW55bWF0Y2hNYXRjaGVyfSBtYXRjaGVyc1xuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHRlc3RTdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7Ym9vbGVhbnxudW1iZXJ8RnVuY3Rpb259XG4gKi9cbmNvbnN0IGFueW1hdGNoID0gKG1hdGNoZXJzLCB0ZXN0U3RyaW5nLCBvcHRpb25zID0gREVGQVVMVF9PUFRJT05TKSA9PiB7XG4gIGlmIChtYXRjaGVycyA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYW55bWF0Y2g6IHNwZWNpZnkgZmlyc3QgYXJndW1lbnQnKTtcbiAgfVxuICBjb25zdCBvcHRzID0gdHlwZW9mIG9wdGlvbnMgPT09ICdib29sZWFuJyA/IHtyZXR1cm5JbmRleDogb3B0aW9uc30gOiBvcHRpb25zO1xuICBjb25zdCByZXR1cm5JbmRleCA9IG9wdHMucmV0dXJuSW5kZXggfHwgZmFsc2U7XG5cbiAgLy8gRWFybHkgY2FjaGUgZm9yIG1hdGNoZXJzLlxuICBjb25zdCBtdGNoZXJzID0gYXJyaWZ5KG1hdGNoZXJzKTtcbiAgY29uc3QgbmVnYXRlZEdsb2JzID0gbXRjaGVyc1xuICAgIC5maWx0ZXIoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgJiYgaXRlbS5jaGFyQXQoMCkgPT09IEJBTkcpXG4gICAgLm1hcChpdGVtID0+IGl0ZW0uc2xpY2UoMSkpXG4gICAgLm1hcChpdGVtID0+IHBpY29tYXRjaChpdGVtLCBvcHRzKSk7XG4gIGNvbnN0IHBhdHRlcm5zID0gbXRjaGVyc1xuICAgIC5maWx0ZXIoaXRlbSA9PiB0eXBlb2YgaXRlbSAhPT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBpdGVtLmNoYXJBdCgwKSAhPT0gQkFORykpXG4gICAgLm1hcChtYXRjaGVyID0+IGNyZWF0ZVBhdHRlcm4obWF0Y2hlciwgb3B0cykpO1xuXG4gIGlmICh0ZXN0U3RyaW5nID09IG51bGwpIHtcbiAgICByZXR1cm4gKHRlc3RTdHJpbmcsIHJpID0gZmFsc2UpID0+IHtcbiAgICAgIGNvbnN0IHJldHVybkluZGV4ID0gdHlwZW9mIHJpID09PSAnYm9vbGVhbicgPyByaSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIG1hdGNoUGF0dGVybnMocGF0dGVybnMsIG5lZ2F0ZWRHbG9icywgdGVzdFN0cmluZywgcmV0dXJuSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaFBhdHRlcm5zKHBhdHRlcm5zLCBuZWdhdGVkR2xvYnMsIHRlc3RTdHJpbmcsIHJldHVybkluZGV4KTtcbn07XG5cbmFueW1hdGNoLmRlZmF1bHQgPSBhbnltYXRjaDtcbm1vZHVsZS5leHBvcnRzID0gYW55bWF0Y2g7XG4iLCJjb25zdCBsYWJlbHMgPSBbXCJNZW1vcnkgVXNlZFwiLCBcIk1lbW9yeSBGcmVlXCJdO1xyXG5jb25zdCBkYXRhID0ge1xyXG4gIGxhYmVsczogbGFiZWxzLFxyXG4gIGRhdGFzZXRzOiBbXHJcbiAgICB7XHJcbiAgICAgIGxhYmVsOiBcIlN5c3RlbSBJbmZvXCIsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogW1wiIzAwNzREOVwiLCBcIiNGRjQxMzZcIl0sXHJcbiAgICAgIGJvcmRlckNvbG9yOiBcInJnYigxMDAsOTksMzIpXCIsXHJcbiAgICAgIGRhdGE6IFsyLCAxMF0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgdHlwZTogXCJkb3VnaG51dFwiLFxyXG4gIGRhdGEsXHJcbiAgb3B0aW9uczoge30sXHJcbn07XHJcblxyXG52YXIgbXlDaGFydCA9IG5ldyBDaGFydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15UmFtXCIpLCBjb25maWcpO1xyXG4iLCJjb25zdCB7IGFwcCwgQnJvd3NlcldpbmRvdyB9ID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xyXG50cnkge1xyXG4gIHJlcXVpcmUoXCJlbGVjdHJvbi1yZWxvYWRlclwiKShtb2R1bGUpO1xyXG59IGNhdGNoIChfKSB7fVxyXG5cclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlV2luZG93KCkge1xyXG4gIGNvbnN0IHdpbiA9IG5ldyBCcm93c2VyV2luZG93KHtcclxuICAgIHdpZHRoOiA4MDAsXHJcbiAgICBoZWlnaHQ6IDUwMCxcclxuICAgIGZyYW1lOiBmYWxzZSxcclxuICAgIHJlc2l6ZWFibGU6IHRydWUsXHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInByZWxvYWQuanNcIiksXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICB3aW4ubG9hZEZpbGUoXCJpbmRleC5odG1sXCIpO1xyXG59XHJcblxyXG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgY3JlYXRlV2luZG93KCk7XHJcblxyXG4gIGFwcC5vbihcImFjdGl2YXRlXCIpLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICBpZiAoQnJvd3NlcldpbmRvdy5nZXRBbGx3aW5kb3dzKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY3JlYXRlV2luZG93KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLm9uKFwid2luZG93LWFsbC1jbG9zZWRcIiwgKCkgPT4ge1xyXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcImRhcndpblwiKSB7XHJcbiAgICBhcHAucXVpdCgpO1xyXG4gIH1cclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9iaW5hcnktZXh0ZW5zaW9ucy5qc29uJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuY29uc3QgY29tcGlsZSA9IHJlcXVpcmUoJy4vbGliL2NvbXBpbGUnKTtcbmNvbnN0IGV4cGFuZCA9IHJlcXVpcmUoJy4vbGliL2V4cGFuZCcpO1xuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpO1xuXG4vKipcbiAqIEV4cGFuZCB0aGUgZ2l2ZW4gcGF0dGVybiBvciBjcmVhdGUgYSByZWdleC1jb21wYXRpYmxlIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ3thLGIsY30nLCB7IGNvbXBpbGU6IHRydWUgfSkpOyAvLz0+IFsnKGF8YnxjKSddXG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ3thLGIsY30nKSk7IC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBicmFjZXMgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gW107XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgZm9yIChsZXQgcGF0dGVybiBvZiBpbnB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGJyYWNlcy5jcmVhdGUocGF0dGVybiwgb3B0aW9ucyk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKC4uLnJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBbXS5jb25jYXQoYnJhY2VzLmNyZWF0ZShpbnB1dCwgb3B0aW9ucykpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHBhbmQgPT09IHRydWUgJiYgb3B0aW9ucy5ub2R1cGVzID09PSB0cnVlKSB7XG4gICAgb3V0cHV0ID0gWy4uLm5ldyBTZXQob3V0cHV0KV07XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIHdpdGggdGhlIGdpdmVuIGBvcHRpb25zYC5cbiAqXG4gKiBgYGBqc1xuICogLy8gYnJhY2VzLnBhcnNlKHBhdHRlcm4sIFssIG9wdGlvbnNdKTtcbiAqIGNvbnN0IGFzdCA9IGJyYWNlcy5wYXJzZSgnYS97YixjfS9kJyk7XG4gKiBjb25zb2xlLmxvZyhhc3QpO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0dGVybiBCcmFjZSBwYXR0ZXJuIHRvIHBhcnNlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIEFTVFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMucGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBicmFjZXMgc3RyaW5nIGZyb20gYW4gQVNULCBvciBhbiBBU1Qgbm9kZS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBsZXQgYXN0ID0gYnJhY2VzLnBhcnNlKCdmb28ve2EsYn0vYmFyJyk7XG4gKiBjb25zb2xlLmxvZyhzdHJpbmdpZnkoYXN0Lm5vZGVzWzJdKSk7IC8vPT4gJ3thLGJ9J1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBCcmFjZSBwYXR0ZXJuIG9yIEFTVC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGV4cGFuZGVkIHZhbHVlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuYnJhY2VzLnN0cmluZ2lmeSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeShicmFjZXMucGFyc2UoaW5wdXQsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgfVxuICByZXR1cm4gc3RyaW5naWZ5KGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogQ29tcGlsZXMgYSBicmFjZSBwYXR0ZXJuIGludG8gYSByZWdleC1jb21wYXRpYmxlLCBvcHRpbWl6ZWQgc3RyaW5nLlxuICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBtYWluIFticmFjZXNdKCNicmFjZXMpIGZ1bmN0aW9uIGJ5IGRlZmF1bHQuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzLmNvbXBpbGUoJ2Eve2IsY30vZCcpKTtcbiAqIC8vPT4gWydhLyhifGMpL2QnXVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBCcmFjZSBwYXR0ZXJuIG9yIEFTVC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGV4cGFuZGVkIHZhbHVlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuYnJhY2VzLmNvbXBpbGUgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIGlucHV0ID0gYnJhY2VzLnBhcnNlKGlucHV0LCBvcHRpb25zKTtcbiAgfVxuICByZXR1cm4gY29tcGlsZShpbnB1dCwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIEV4cGFuZHMgYSBicmFjZSBwYXR0ZXJuIGludG8gYW4gYXJyYXkuIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGVcbiAqIG1haW4gW2JyYWNlc10oI2JyYWNlcykgZnVuY3Rpb24gd2hlbiBgb3B0aW9ucy5leHBhbmRgIGlzIHRydWUuIEJlZm9yZVxuICogdXNpbmcgdGhpcyBtZXRob2QgaXQncyByZWNvbW1lbmRlZCB0aGF0IHlvdSByZWFkIHRoZSBbcGVyZm9ybWFuY2Ugbm90ZXNdKCNwZXJmb3JtYW5jZSkpXG4gKiBhbmQgYWR2YW50YWdlcyBvZiB1c2luZyBbLmNvbXBpbGVdKCNjb21waWxlKSBpbnN0ZWFkLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbiAqIGNvbnNvbGUubG9nKGJyYWNlcy5leHBhbmQoJ2Eve2IsY30vZCcpKTtcbiAqIC8vPT4gWydhL2IvZCcsICdhL2MvZCddO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEJyYWNlIHBhdHRlcm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGV4cGFuZGVkIHZhbHVlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuYnJhY2VzLmV4cGFuZCA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgaW5wdXQgPSBicmFjZXMucGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IHJlc3VsdCA9IGV4cGFuZChpbnB1dCwgb3B0aW9ucyk7XG5cbiAgLy8gZmlsdGVyIG91dCBlbXB0eSBzdHJpbmdzIGlmIHNwZWNpZmllZFxuICBpZiAob3B0aW9ucy5ub2VtcHR5ID09PSB0cnVlKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlcyBpZiBzcGVjaWZpZWRcbiAgaWYgKG9wdGlvbnMubm9kdXBlcyA9PT0gdHJ1ZSkge1xuICAgIHJlc3VsdCA9IFsuLi5uZXcgU2V0KHJlc3VsdCldO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUHJvY2Vzc2VzIGEgYnJhY2UgcGF0dGVybiBhbmQgcmV0dXJucyBlaXRoZXIgYW4gZXhwYW5kZWQgYXJyYXlcbiAqIChpZiBgb3B0aW9ucy5leHBhbmRgIGlzIHRydWUpLCBhIGhpZ2hseSBvcHRpbWl6ZWQgcmVnZXgtY29tcGF0aWJsZSBzdHJpbmcuXG4gKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIG1haW4gW2JyYWNlc10oI2JyYWNlcykgZnVuY3Rpb24uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzLmNyZWF0ZSgndXNlci17MjAwLi4zMDB9L3Byb2plY3Qte2EsYixjfS17MS4uMTB9JykpXG4gKiAvLz0+ICd1c2VyLSgyMFswLTldfDJbMS05XVswLTldfDMwMCkvcHJvamVjdC0oYXxifGMpLShbMS05XXwxMCknXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgQnJhY2UgcGF0dGVyblxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuY3JlYXRlID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKGlucHV0ID09PSAnJyB8fCBpbnB1dC5sZW5ndGggPCAzKSB7XG4gICAgcmV0dXJuIFtpbnB1dF07XG4gIH1cblxuIHJldHVybiBvcHRpb25zLmV4cGFuZCAhPT0gdHJ1ZVxuICAgID8gYnJhY2VzLmNvbXBpbGUoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBicmFjZXMuZXhwYW5kKGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogRXhwb3NlIFwiYnJhY2VzXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJyYWNlcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsbCA9IHJlcXVpcmUoJ2ZpbGwtcmFuZ2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5jb25zdCBjb21waWxlID0gKGFzdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCB3YWxrID0gKG5vZGUsIHBhcmVudCA9IHt9KSA9PiB7XG4gICAgbGV0IGludmFsaWRCbG9jayA9IHV0aWxzLmlzSW52YWxpZEJyYWNlKHBhcmVudCk7XG4gICAgbGV0IGludmFsaWROb2RlID0gbm9kZS5pbnZhbGlkID09PSB0cnVlICYmIG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZTtcbiAgICBsZXQgaW52YWxpZCA9IGludmFsaWRCbG9jayA9PT0gdHJ1ZSB8fCBpbnZhbGlkTm9kZSA9PT0gdHJ1ZTtcbiAgICBsZXQgcHJlZml4ID0gb3B0aW9ucy5lc2NhcGVJbnZhbGlkID09PSB0cnVlID8gJ1xcXFwnIDogJyc7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgaWYgKG5vZGUuaXNPcGVuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gcHJlZml4ICsgbm9kZS52YWx1ZTtcbiAgICB9XG4gICAgaWYgKG5vZGUuaXNDbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHByZWZpeCArIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm4gaW52YWxpZCA/IChwcmVmaXggKyBub2RlLnZhbHVlKSA6ICcoJztcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICByZXR1cm4gaW52YWxpZCA/IChwcmVmaXggKyBub2RlLnZhbHVlKSA6ICcpJztcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnY29tbWEnKSB7XG4gICAgICByZXR1cm4gbm9kZS5wcmV2LnR5cGUgPT09ICdjb21tYScgPyAnJyA6IChpbnZhbGlkID8gbm9kZS52YWx1ZSA6ICd8Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUucmFuZ2VzID4gMCkge1xuICAgICAgbGV0IGFyZ3MgPSB1dGlscy5yZWR1Y2Uobm9kZS5ub2Rlcyk7XG4gICAgICBsZXQgcmFuZ2UgPSBmaWxsKC4uLmFyZ3MsIHsgLi4ub3B0aW9ucywgd3JhcDogZmFsc2UsIHRvUmVnZXg6IHRydWUgfSk7XG5cbiAgICAgIGlmIChyYW5nZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gMSAmJiByYW5nZS5sZW5ndGggPiAxID8gYCgke3JhbmdlfSlgIDogcmFuZ2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUubm9kZXMpIHtcbiAgICAgICAgb3V0cHV0ICs9IHdhbGsoY2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIHJldHVybiB3YWxrKGFzdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBNQVhfTEVOR1RIOiAxMDI0ICogNjQsXG5cbiAgLy8gRGlnaXRzXG4gIENIQVJfMDogJzAnLCAvKiAwICovXG4gIENIQVJfOTogJzknLCAvKiA5ICovXG5cbiAgLy8gQWxwaGFiZXQgY2hhcnMuXG4gIENIQVJfVVBQRVJDQVNFX0E6ICdBJywgLyogQSAqL1xuICBDSEFSX0xPV0VSQ0FTRV9BOiAnYScsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogJ1onLCAvKiBaICovXG4gIENIQVJfTE9XRVJDQVNFX1o6ICd6JywgLyogeiAqL1xuXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUzogJygnLCAvKiAoICovXG4gIENIQVJfUklHSFRfUEFSRU5USEVTRVM6ICcpJywgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6ICcqJywgLyogKiAqL1xuXG4gIC8vIE5vbi1hbHBoYWJldGljIGNoYXJzLlxuICBDSEFSX0FNUEVSU0FORDogJyYnLCAvKiAmICovXG4gIENIQVJfQVQ6ICdAJywgLyogQCAqL1xuICBDSEFSX0JBQ0tTTEFTSDogJ1xcXFwnLCAvKiBcXCAqL1xuICBDSEFSX0JBQ0tUSUNLOiAnYCcsIC8qIGAgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46ICdcXHInLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogJ14nLCAvKiBeICovXG4gIENIQVJfQ09MT046ICc6JywgLyogOiAqL1xuICBDSEFSX0NPTU1BOiAnLCcsIC8qICwgKi9cbiAgQ0hBUl9ET0xMQVI6ICckJywgLyogLiAqL1xuICBDSEFSX0RPVDogJy4nLCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAnXCInLCAvKiBcIiAqL1xuICBDSEFSX0VRVUFMOiAnPScsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAnIScsIC8qICEgKi9cbiAgQ0hBUl9GT1JNX0ZFRUQ6ICdcXGYnLCAvKiBcXGYgKi9cbiAgQ0hBUl9GT1JXQVJEX1NMQVNIOiAnLycsIC8qIC8gKi9cbiAgQ0hBUl9IQVNIOiAnIycsIC8qICMgKi9cbiAgQ0hBUl9IWVBIRU5fTUlOVVM6ICctJywgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogJzwnLCAvKiA8ICovXG4gIENIQVJfTEVGVF9DVVJMWV9CUkFDRTogJ3snLCAvKiB7ICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVDogJ1snLCAvKiBbICovXG4gIENIQVJfTElORV9GRUVEOiAnXFxuJywgLyogXFxuICovXG4gIENIQVJfTk9fQlJFQUtfU1BBQ0U6ICdcXHUwMEEwJywgLyogXFx1MDBBMCAqL1xuICBDSEFSX1BFUkNFTlQ6ICclJywgLyogJSAqL1xuICBDSEFSX1BMVVM6ICcrJywgLyogKyAqL1xuICBDSEFSX1FVRVNUSU9OX01BUks6ICc/JywgLyogPyAqL1xuICBDSEFSX1JJR0hUX0FOR0xFX0JSQUNLRVQ6ICc+JywgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAnfScsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogJ10nLCAvKiBdICovXG4gIENIQVJfU0VNSUNPTE9OOiAnOycsIC8qIDsgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEU6ICdcXCcnLCAvKiAnICovXG4gIENIQVJfU1BBQ0U6ICcgJywgLyogICAqL1xuICBDSEFSX1RBQjogJ1xcdCcsIC8qIFxcdCAqL1xuICBDSEFSX1VOREVSU0NPUkU6ICdfJywgLyogXyAqL1xuICBDSEFSX1ZFUlRJQ0FMX0xJTkU6ICd8JywgLyogfCAqL1xuICBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRTogJ1xcdUZFRkYnIC8qIFxcdUZFRkYgKi9cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZpbGwgPSByZXF1aXJlKCdmaWxsLXJhbmdlJyk7XG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNvbnN0IGFwcGVuZCA9IChxdWV1ZSA9ICcnLCBzdGFzaCA9ICcnLCBlbmNsb3NlID0gZmFsc2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gIHF1ZXVlID0gW10uY29uY2F0KHF1ZXVlKTtcbiAgc3Rhc2ggPSBbXS5jb25jYXQoc3Rhc2gpO1xuXG4gIGlmICghc3Rhc2gubGVuZ3RoKSByZXR1cm4gcXVldWU7XG4gIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGVuY2xvc2UgPyB1dGlscy5mbGF0dGVuKHN0YXNoKS5tYXAoZWxlID0+IGB7JHtlbGV9fWApIDogc3Rhc2g7XG4gIH1cblxuICBmb3IgKGxldCBpdGVtIG9mIHF1ZXVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIGl0ZW0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXBwZW5kKHZhbHVlLCBzdGFzaCwgZW5jbG9zZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBlbGUgb2Ygc3Rhc2gpIHtcbiAgICAgICAgaWYgKGVuY2xvc2UgPT09IHRydWUgJiYgdHlwZW9mIGVsZSA9PT0gJ3N0cmluZycpIGVsZSA9IGB7JHtlbGV9fWA7XG4gICAgICAgIHJlc3VsdC5wdXNoKEFycmF5LmlzQXJyYXkoZWxlKSA/IGFwcGVuZChpdGVtLCBlbGUsIGVuY2xvc2UpIDogKGl0ZW0gKyBlbGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHV0aWxzLmZsYXR0ZW4ocmVzdWx0KTtcbn07XG5cbmNvbnN0IGV4cGFuZCA9IChhc3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBsZXQgcmFuZ2VMaW1pdCA9IG9wdGlvbnMucmFuZ2VMaW1pdCA9PT0gdm9pZCAwID8gMTAwMCA6IG9wdGlvbnMucmFuZ2VMaW1pdDtcblxuICBsZXQgd2FsayA9IChub2RlLCBwYXJlbnQgPSB7fSkgPT4ge1xuICAgIG5vZGUucXVldWUgPSBbXTtcblxuICAgIGxldCBwID0gcGFyZW50O1xuICAgIGxldCBxID0gcGFyZW50LnF1ZXVlO1xuXG4gICAgd2hpbGUgKHAudHlwZSAhPT0gJ2JyYWNlJyAmJiBwLnR5cGUgIT09ICdyb290JyAmJiBwLnBhcmVudCkge1xuICAgICAgcCA9IHAucGFyZW50O1xuICAgICAgcSA9IHAucXVldWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaW52YWxpZCB8fCBub2RlLmRvbGxhcikge1xuICAgICAgcS5wdXNoKGFwcGVuZChxLnBvcCgpLCBzdHJpbmdpZnkobm9kZSwgb3B0aW9ucykpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnYnJhY2UnICYmIG5vZGUuaW52YWxpZCAhPT0gdHJ1ZSAmJiBub2RlLm5vZGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcS5wdXNoKGFwcGVuZChxLnBvcCgpLCBbJ3t9J10pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLnJhbmdlcyA+IDApIHtcbiAgICAgIGxldCBhcmdzID0gdXRpbHMucmVkdWNlKG5vZGUubm9kZXMpO1xuXG4gICAgICBpZiAodXRpbHMuZXhjZWVkc0xpbWl0KC4uLmFyZ3MsIG9wdGlvbnMuc3RlcCwgcmFuZ2VMaW1pdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2V4cGFuZGVkIGFycmF5IGxlbmd0aCBleGNlZWRzIHJhbmdlIGxpbWl0LiBVc2Ugb3B0aW9ucy5yYW5nZUxpbWl0IHRvIGluY3JlYXNlIG9yIGRpc2FibGUgdGhlIGxpbWl0LicpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmFuZ2UgPSBmaWxsKC4uLmFyZ3MsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByYW5nZSA9IHN0cmluZ2lmeShub2RlLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcS5wdXNoKGFwcGVuZChxLnBvcCgpLCByYW5nZSkpO1xuICAgICAgbm9kZS5ub2RlcyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbmNsb3NlID0gdXRpbHMuZW5jbG9zZUJyYWNlKG5vZGUpO1xuICAgIGxldCBxdWV1ZSA9IG5vZGUucXVldWU7XG4gICAgbGV0IGJsb2NrID0gbm9kZTtcblxuICAgIHdoaWxlIChibG9jay50eXBlICE9PSAnYnJhY2UnICYmIGJsb2NrLnR5cGUgIT09ICdyb290JyAmJiBibG9jay5wYXJlbnQpIHtcbiAgICAgIGJsb2NrID0gYmxvY2sucGFyZW50O1xuICAgICAgcXVldWUgPSBibG9jay5xdWV1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IG5vZGUubm9kZXNbaV07XG5cbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnY29tbWEnICYmIG5vZGUudHlwZSA9PT0gJ2JyYWNlJykge1xuICAgICAgICBpZiAoaSA9PT0gMSkgcXVldWUucHVzaCgnJyk7XG4gICAgICAgIHF1ZXVlLnB1c2goJycpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgICAgcS5wdXNoKGFwcGVuZChxLnBvcCgpLCBxdWV1ZSwgZW5jbG9zZSkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLnZhbHVlICYmIGNoaWxkLnR5cGUgIT09ICdvcGVuJykge1xuICAgICAgICBxdWV1ZS5wdXNoKGFwcGVuZChxdWV1ZS5wb3AoKSwgY2hpbGQudmFsdWUpKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5ub2Rlcykge1xuICAgICAgICB3YWxrKGNoaWxkLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH07XG5cbiAgcmV0dXJuIHV0aWxzLmZsYXR0ZW4od2Fsayhhc3QpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwYW5kO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IHtcbiAgTUFYX0xFTkdUSCxcbiAgQ0hBUl9CQUNLU0xBU0gsIC8qIFxcICovXG4gIENIQVJfQkFDS1RJQ0ssIC8qIGAgKi9cbiAgQ0hBUl9DT01NQSwgLyogLCAqL1xuICBDSEFSX0RPVCwgLyogLiAqL1xuICBDSEFSX0xFRlRfUEFSRU5USEVTRVMsIC8qICggKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUywgLyogKSAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UsIC8qIHsgKi9cbiAgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSwgLyogfSAqL1xuICBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQsIC8qIFsgKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCwgLyogXSAqL1xuICBDSEFSX0RPVUJMRV9RVU9URSwgLyogXCIgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEUsIC8qICcgKi9cbiAgQ0hBUl9OT19CUkVBS19TUEFDRSxcbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0Vcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIHBhcnNlXG4gKi9cblxuY29uc3QgcGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICBsZXQgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGxldCBtYXggPSB0eXBlb2Ygb3B0cy5tYXhMZW5ndGggPT09ICdudW1iZXInID8gTWF0aC5taW4oTUFYX0xFTkdUSCwgb3B0cy5tYXhMZW5ndGgpIDogTUFYX0xFTkdUSDtcbiAgaWYgKGlucHV0Lmxlbmd0aCA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoICgke2lucHV0Lmxlbmd0aH0pLCBleGNlZWRzIG1heCBjaGFyYWN0ZXJzICgke21heH0pYCk7XG4gIH1cblxuICBsZXQgYXN0ID0geyB0eXBlOiAncm9vdCcsIGlucHV0LCBub2RlczogW10gfTtcbiAgbGV0IHN0YWNrID0gW2FzdF07XG4gIGxldCBibG9jayA9IGFzdDtcbiAgbGV0IHByZXYgPSBhc3Q7XG4gIGxldCBicmFja2V0cyA9IDA7XG4gIGxldCBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBkZXB0aCA9IDA7XG4gIGxldCB2YWx1ZTtcbiAgbGV0IG1lbW8gPSB7fTtcblxuICAvKipcbiAgICogSGVscGVyc1xuICAgKi9cblxuICBjb25zdCBhZHZhbmNlID0gKCkgPT4gaW5wdXRbaW5kZXgrK107XG4gIGNvbnN0IHB1c2ggPSBub2RlID0+IHtcbiAgICBpZiAobm9kZS50eXBlID09PSAndGV4dCcgJiYgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgcHJldi50eXBlID0gJ3RleHQnO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3RleHQnICYmIG5vZGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBwcmV2LnZhbHVlICs9IG5vZGUudmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYmxvY2subm9kZXMucHVzaChub2RlKTtcbiAgICBub2RlLnBhcmVudCA9IGJsb2NrO1xuICAgIG5vZGUucHJldiA9IHByZXY7XG4gICAgcHJldiA9IG5vZGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgcHVzaCh7IHR5cGU6ICdib3MnIH0pO1xuXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGJsb2NrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgdmFsdWUgPSBhZHZhbmNlKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnZhbGlkIGNoYXJzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfWkVST19XSURUSF9OT0JSRUFLX1NQQUNFIHx8IHZhbHVlID09PSBDSEFSX05PX0JSRUFLX1NQQUNFKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVkIGNoYXJzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfQkFDS1NMQVNIKSB7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogKG9wdGlvbnMua2VlcEVzY2FwaW5nID8gdmFsdWUgOiAnJykgKyBhZHZhbmNlKCkgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSaWdodCBzcXVhcmUgYnJhY2tldCAobGl0ZXJhbCk6ICddJ1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogJ1xcXFwnICsgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMZWZ0IHNxdWFyZSBicmFja2V0OiAnWydcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICBicmFja2V0cysrO1xuXG4gICAgICBsZXQgY2xvc2VkID0gdHJ1ZTtcbiAgICAgIGxldCBuZXh0O1xuXG4gICAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGggJiYgKG5leHQgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgIHZhbHVlICs9IG5leHQ7XG5cbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgICAgIGJyYWNrZXRzKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9CQUNLU0xBU0gpIHtcbiAgICAgICAgICB2YWx1ZSArPSBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgICAgIGJyYWNrZXRzLS07XG5cbiAgICAgICAgICBpZiAoYnJhY2tldHMgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcmVudGhlc2VzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgYmxvY2sgPSBwdXNoKHsgdHlwZTogJ3BhcmVuJywgbm9kZXM6IFtdIH0pO1xuICAgICAgc3RhY2sucHVzaChibG9jayk7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUykge1xuICAgICAgaWYgKGJsb2NrLnR5cGUgIT09ICdwYXJlbicpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgYmxvY2sgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFF1b3RlczogJ3xcInxgXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfRE9VQkxFX1FVT1RFIHx8IHZhbHVlID09PSBDSEFSX1NJTkdMRV9RVU9URSB8fCB2YWx1ZSA9PT0gQ0hBUl9CQUNLVElDSykge1xuICAgICAgbGV0IG9wZW4gPSB2YWx1ZTtcbiAgICAgIGxldCBuZXh0O1xuXG4gICAgICBpZiAob3B0aW9ucy5rZWVwUXVvdGVzICE9PSB0cnVlKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCAmJiAobmV4dCA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfQkFDS1NMQVNIKSB7XG4gICAgICAgICAgdmFsdWUgKz0gbmV4dCArIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBvcGVuKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMua2VlcFF1b3RlcyA9PT0gdHJ1ZSkgdmFsdWUgKz0gbmV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlICs9IG5leHQ7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGVmdCBjdXJseSBicmFjZTogJ3snXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfTEVGVF9DVVJMWV9CUkFDRSkge1xuICAgICAgZGVwdGgrKztcblxuICAgICAgbGV0IGRvbGxhciA9IHByZXYudmFsdWUgJiYgcHJldi52YWx1ZS5zbGljZSgtMSkgPT09ICckJyB8fCBibG9jay5kb2xsYXIgPT09IHRydWU7XG4gICAgICBsZXQgYnJhY2UgPSB7XG4gICAgICAgIHR5cGU6ICdicmFjZScsXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGNsb3NlOiBmYWxzZSxcbiAgICAgICAgZG9sbGFyLFxuICAgICAgICBkZXB0aCxcbiAgICAgICAgY29tbWFzOiAwLFxuICAgICAgICByYW5nZXM6IDAsXG4gICAgICAgIG5vZGVzOiBbXVxuICAgICAgfTtcblxuICAgICAgYmxvY2sgPSBwdXNoKGJyYWNlKTtcbiAgICAgIHN0YWNrLnB1c2goYmxvY2spO1xuICAgICAgcHVzaCh7IHR5cGU6ICdvcGVuJywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSaWdodCBjdXJseSBicmFjZTogJ30nXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgIGlmIChibG9jay50eXBlICE9PSAnYnJhY2UnKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHR5cGUgPSAnY2xvc2UnO1xuICAgICAgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgIGJsb2NrLmNsb3NlID0gdHJ1ZTtcblxuICAgICAgcHVzaCh7IHR5cGUsIHZhbHVlIH0pO1xuICAgICAgZGVwdGgtLTtcblxuICAgICAgYmxvY2sgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbW1hOiAnLCdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9DT01NQSAmJiBkZXB0aCA+IDApIHtcbiAgICAgIGlmIChibG9jay5yYW5nZXMgPiAwKSB7XG4gICAgICAgIGJsb2NrLnJhbmdlcyA9IDA7XG4gICAgICAgIGxldCBvcGVuID0gYmxvY2subm9kZXMuc2hpZnQoKTtcbiAgICAgICAgYmxvY2subm9kZXMgPSBbb3BlbiwgeyB0eXBlOiAndGV4dCcsIHZhbHVlOiBzdHJpbmdpZnkoYmxvY2spIH1dO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2NvbW1hJywgdmFsdWUgfSk7XG4gICAgICBibG9jay5jb21tYXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdDogJy4nXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfRE9UICYmIGRlcHRoID4gMCAmJiBibG9jay5jb21tYXMgPT09IDApIHtcbiAgICAgIGxldCBzaWJsaW5ncyA9IGJsb2NrLm5vZGVzO1xuXG4gICAgICBpZiAoZGVwdGggPT09IDAgfHwgc2libGluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcpIHtcbiAgICAgICAgYmxvY2sucmFuZ2UgPSBbXTtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi50eXBlID0gJ3JhbmdlJztcblxuICAgICAgICBpZiAoYmxvY2subm9kZXMubGVuZ3RoICE9PSAzICYmIGJsb2NrLm5vZGVzLmxlbmd0aCAhPT0gNSkge1xuICAgICAgICAgIGJsb2NrLmludmFsaWQgPSB0cnVlO1xuICAgICAgICAgIGJsb2NrLnJhbmdlcyA9IDA7XG4gICAgICAgICAgcHJldi50eXBlID0gJ3RleHQnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxvY2sucmFuZ2VzKys7XG4gICAgICAgIGJsb2NrLmFyZ3MgPSBbXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2LnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgICAgc2libGluZ3MucG9wKCk7XG5cbiAgICAgICAgbGV0IGJlZm9yZSA9IHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICBiZWZvcmUudmFsdWUgKz0gcHJldi52YWx1ZSArIHZhbHVlO1xuICAgICAgICBwcmV2ID0gYmVmb3JlO1xuICAgICAgICBibG9jay5yYW5nZXMtLTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnZG90JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXh0XG4gICAgICovXG5cbiAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIC8vIE1hcmsgaW1iYWxhbmNlZCBicmFjZXMgYW5kIGJyYWNrZXRzIGFzIGludmFsaWRcbiAgZG8ge1xuICAgIGJsb2NrID0gc3RhY2sucG9wKCk7XG5cbiAgICBpZiAoYmxvY2sudHlwZSAhPT0gJ3Jvb3QnKSB7XG4gICAgICBibG9jay5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAoIW5vZGUubm9kZXMpIHtcbiAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnb3BlbicpIG5vZGUuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnY2xvc2UnKSBub2RlLmlzQ2xvc2UgPSB0cnVlO1xuICAgICAgICAgIGlmICghbm9kZS5ub2Rlcykgbm9kZS50eXBlID0gJ3RleHQnO1xuICAgICAgICAgIG5vZGUuaW52YWxpZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBibG9jayBvbiBwYXJlbnQubm9kZXMgKGJsb2NrJ3Mgc2libGluZ3MpXG4gICAgICBsZXQgcGFyZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBsZXQgaW5kZXggPSBwYXJlbnQubm9kZXMuaW5kZXhPZihibG9jayk7XG4gICAgICAvLyByZXBsYWNlIHRoZSAoaW52YWxpZCkgYmxvY2sgd2l0aCBpdCdzIG5vZGVzXG4gICAgICBwYXJlbnQubm9kZXMuc3BsaWNlKGluZGV4LCAxLCAuLi5ibG9jay5ub2Rlcyk7XG4gICAgfVxuICB9IHdoaWxlIChzdGFjay5sZW5ndGggPiAwKTtcblxuICBwdXNoKHsgdHlwZTogJ2VvcycgfSk7XG4gIHJldHVybiBhc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXN0LCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IHN0cmluZ2lmeSA9IChub2RlLCBwYXJlbnQgPSB7fSkgPT4ge1xuICAgIGxldCBpbnZhbGlkQmxvY2sgPSBvcHRpb25zLmVzY2FwZUludmFsaWQgJiYgdXRpbHMuaXNJbnZhbGlkQnJhY2UocGFyZW50KTtcbiAgICBsZXQgaW52YWxpZE5vZGUgPSBub2RlLmludmFsaWQgPT09IHRydWUgJiYgb3B0aW9ucy5lc2NhcGVJbnZhbGlkID09PSB0cnVlO1xuICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgIGlmIChub2RlLnZhbHVlKSB7XG4gICAgICBpZiAoKGludmFsaWRCbG9jayB8fCBpbnZhbGlkTm9kZSkgJiYgdXRpbHMuaXNPcGVuT3JDbG9zZShub2RlKSkge1xuICAgICAgICByZXR1cm4gJ1xcXFwnICsgbm9kZS52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5ub2Rlcykge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5ub2Rlcykge1xuICAgICAgICBvdXRwdXQgKz0gc3RyaW5naWZ5KGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gc3RyaW5naWZ5KGFzdCk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuaXNJbnRlZ2VyID0gbnVtID0+IHtcbiAgaWYgKHR5cGVvZiBudW0gPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtKTtcbiAgfVxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3N0cmluZycgJiYgbnVtLnRyaW0oKSAhPT0gJycpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobnVtKSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBGaW5kIGEgbm9kZSBvZiB0aGUgZ2l2ZW4gdHlwZVxuICovXG5cbmV4cG9ydHMuZmluZCA9IChub2RlLCB0eXBlKSA9PiBub2RlLm5vZGVzLmZpbmQobm9kZSA9PiBub2RlLnR5cGUgPT09IHR5cGUpO1xuXG4vKipcbiAqIEZpbmQgYSBub2RlIG9mIHRoZSBnaXZlbiB0eXBlXG4gKi9cblxuZXhwb3J0cy5leGNlZWRzTGltaXQgPSAobWluLCBtYXgsIHN0ZXAgPSAxLCBsaW1pdCkgPT4ge1xuICBpZiAobGltaXQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIGlmICghZXhwb3J0cy5pc0ludGVnZXIobWluKSB8fCAhZXhwb3J0cy5pc0ludGVnZXIobWF4KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKChOdW1iZXIobWF4KSAtIE51bWJlcihtaW4pKSAvIE51bWJlcihzdGVwKSkgPj0gbGltaXQ7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gbm9kZSB3aXRoICdcXFxcJyBiZWZvcmUgbm9kZS52YWx1ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlTm9kZSA9IChibG9jaywgbiA9IDAsIHR5cGUpID0+IHtcbiAgbGV0IG5vZGUgPSBibG9jay5ub2Rlc1tuXTtcbiAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgaWYgKCh0eXBlICYmIG5vZGUudHlwZSA9PT0gdHlwZSkgfHwgbm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgaWYgKG5vZGUuZXNjYXBlZCAhPT0gdHJ1ZSkge1xuICAgICAgbm9kZS52YWx1ZSA9ICdcXFxcJyArIG5vZGUudmFsdWU7XG4gICAgICBub2RlLmVzY2FwZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGJyYWNlIG5vZGUgc2hvdWxkIGJlIGVuY2xvc2VkIGluIGxpdGVyYWwgYnJhY2VzXG4gKi9cblxuZXhwb3J0cy5lbmNsb3NlQnJhY2UgPSBub2RlID0+IHtcbiAgaWYgKG5vZGUudHlwZSAhPT0gJ2JyYWNlJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoKG5vZGUuY29tbWFzID4+IDAgKyBub2RlLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIG5vZGUuaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBicmFjZSBub2RlIGlzIGludmFsaWQuXG4gKi9cblxuZXhwb3J0cy5pc0ludmFsaWRCcmFjZSA9IGJsb2NrID0+IHtcbiAgaWYgKGJsb2NrLnR5cGUgIT09ICdicmFjZScpIHJldHVybiBmYWxzZTtcbiAgaWYgKGJsb2NrLmludmFsaWQgPT09IHRydWUgfHwgYmxvY2suZG9sbGFyKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKChibG9jay5jb21tYXMgPj4gMCArIGJsb2NrLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIGJsb2NrLmludmFsaWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChibG9jay5vcGVuICE9PSB0cnVlIHx8IGJsb2NrLmNsb3NlICE9PSB0cnVlKSB7XG4gICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGlzIGFuIG9wZW4gb3IgY2xvc2Ugbm9kZVxuICovXG5cbmV4cG9ydHMuaXNPcGVuT3JDbG9zZSA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG5vZGUub3BlbiA9PT0gdHJ1ZSB8fCBub2RlLmNsb3NlID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWR1Y2UgYW4gYXJyYXkgb2YgdGV4dCBub2Rlcy5cbiAqL1xuXG5leHBvcnRzLnJlZHVjZSA9IG5vZGVzID0+IG5vZGVzLnJlZHVjZSgoYWNjLCBub2RlKSA9PiB7XG4gIGlmIChub2RlLnR5cGUgPT09ICd0ZXh0JykgYWNjLnB1c2gobm9kZS52YWx1ZSk7XG4gIGlmIChub2RlLnR5cGUgPT09ICdyYW5nZScpIG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgcmV0dXJuIGFjYztcbn0sIFtdKTtcblxuLyoqXG4gKiBGbGF0dGVuIGFuIGFycmF5XG4gKi9cblxuZXhwb3J0cy5mbGF0dGVuID0gKC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGZsYXQgPSBhcnIgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlID0gYXJyW2ldO1xuICAgICAgQXJyYXkuaXNBcnJheShlbGUpID8gZmxhdChlbGUsIHJlc3VsdCkgOiBlbGUgIT09IHZvaWQgMCAmJiByZXN1bHQucHVzaChlbGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBmbGF0KGFyZ3MpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBFdmVudEVtaXR0ZXIgfSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3Qgc3lzUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgcHJvbWlzaWZ5IH0gPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCByZWFkZGlycCA9IHJlcXVpcmUoJ3JlYWRkaXJwJyk7XG5jb25zdCBhbnltYXRjaCA9IHJlcXVpcmUoJ2FueW1hdGNoJykuZGVmYXVsdDtcbmNvbnN0IGdsb2JQYXJlbnQgPSByZXF1aXJlKCdnbG9iLXBhcmVudCcpO1xuY29uc3QgaXNHbG9iID0gcmVxdWlyZSgnaXMtZ2xvYicpO1xuY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG5jb25zdCBub3JtYWxpemVQYXRoID0gcmVxdWlyZSgnbm9ybWFsaXplLXBhdGgnKTtcblxuY29uc3QgTm9kZUZzSGFuZGxlciA9IHJlcXVpcmUoJy4vbGliL25vZGVmcy1oYW5kbGVyJyk7XG5jb25zdCBGc0V2ZW50c0hhbmRsZXIgPSByZXF1aXJlKCcuL2xpYi9mc2V2ZW50cy1oYW5kbGVyJyk7XG5jb25zdCB7XG4gIEVWX0FMTCxcbiAgRVZfUkVBRFksXG4gIEVWX0FERCxcbiAgRVZfQ0hBTkdFLFxuICBFVl9VTkxJTkssXG4gIEVWX0FERF9ESVIsXG4gIEVWX1VOTElOS19ESVIsXG4gIEVWX1JBVyxcbiAgRVZfRVJST1IsXG5cbiAgU1RSX0NMT1NFLFxuICBTVFJfRU5ELFxuXG4gIEJBQ0tfU0xBU0hfUkUsXG4gIERPVUJMRV9TTEFTSF9SRSxcbiAgU0xBU0hfT1JfQkFDS19TTEFTSF9SRSxcbiAgRE9UX1JFLFxuICBSRVBMQUNFUl9SRSxcblxuICBTTEFTSCxcbiAgU0xBU0hfU0xBU0gsXG4gIEJSQUNFX1NUQVJULFxuICBCQU5HLFxuICBPTkVfRE9ULFxuICBUV09fRE9UUyxcbiAgR0xPQlNUQVIsXG4gIFNMQVNIX0dMT0JTVEFSLFxuICBBTllNQVRDSF9PUFRTLFxuICBTVFJJTkdfVFlQRSxcbiAgRlVOQ1RJT05fVFlQRSxcbiAgRU1QVFlfU1RSLFxuICBFTVBUWV9GTixcblxuICBpc1dpbmRvd3MsXG4gIGlzTWFjb3Ncbn0gPSByZXF1aXJlKCcuL2xpYi9jb25zdGFudHMnKTtcblxuY29uc3Qgc3RhdCA9IHByb21pc2lmeShmcy5zdGF0KTtcbmNvbnN0IHJlYWRkaXIgPSBwcm9taXNpZnkoZnMucmVhZGRpcik7XG5cbi8qKlxuICogQHR5cGVkZWYge1N0cmluZ30gUGF0aFxuICogQHR5cGVkZWYgeydhbGwnfCdhZGQnfCdhZGREaXInfCdjaGFuZ2UnfCd1bmxpbmsnfCd1bmxpbmtEaXInfCdyYXcnfCdlcnJvcid8J3JlYWR5J30gRXZlbnROYW1lXG4gKiBAdHlwZWRlZiB7J3JlYWRkaXInfCd3YXRjaCd8J2FkZCd8J3JlbW92ZSd8J2NoYW5nZSd9IFRocm90dGxlVHlwZVxuICovXG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFdhdGNoSGVscGVyc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBmb2xsb3dTeW1saW5rc1xuICogQHByb3BlcnR5IHsnc3RhdCd8J2xzdGF0J30gc3RhdE1ldGhvZFxuICogQHByb3BlcnR5IHtQYXRofSBwYXRoXG4gKiBAcHJvcGVydHkge1BhdGh9IHdhdGNoUGF0aFxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZW50cnlQYXRoXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGhhc0dsb2JcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBnbG9iRmlsdGVyXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBmaWx0ZXJQYXRoXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBmaWx0ZXJEaXJcbiAqL1xuXG5jb25zdCBhcnJpZnkgPSAodmFsdWUgPSBbXSkgPT4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG5jb25zdCBmbGF0dGVuID0gKGxpc3QsIHJlc3VsdCA9IFtdKSA9PiB7XG4gIGxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgZmxhdHRlbihpdGVtLCByZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgdW5pZnlQYXRocyA9IChwYXRoc18pID0+IHtcbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheTxTdHJpbmc+fVxuICAgKi9cbiAgY29uc3QgcGF0aHMgPSBmbGF0dGVuKGFycmlmeShwYXRoc18pKTtcbiAgaWYgKCFwYXRocy5ldmVyeShwID0+IHR5cGVvZiBwID09PSBTVFJJTkdfVFlQRSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBOb24tc3RyaW5nIHByb3ZpZGVkIGFzIHdhdGNoIHBhdGg6ICR7cGF0aHN9YCk7XG4gIH1cbiAgcmV0dXJuIHBhdGhzLm1hcChub3JtYWxpemVQYXRoVG9Vbml4KTtcbn07XG5cbi8vIElmIFNMQVNIX1NMQVNIIG9jY3VycyBhdCB0aGUgYmVnaW5uaW5nIG9mIHBhdGgsIGl0IGlzIG5vdCByZXBsYWNlZFxuLy8gICAgIGJlY2F1c2UgXCIvL1N0b3JhZ2VQQy9Ecml2ZVBvb2wvTW92aWVzXCIgaXMgYSB2YWxpZCBuZXR3b3JrIHBhdGhcbmNvbnN0IHRvVW5peCA9IChzdHJpbmcpID0+IHtcbiAgbGV0IHN0ciA9IHN0cmluZy5yZXBsYWNlKEJBQ0tfU0xBU0hfUkUsIFNMQVNIKTtcbiAgbGV0IHByZXBlbmQgPSBmYWxzZTtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKFNMQVNIX1NMQVNIKSkge1xuICAgIHByZXBlbmQgPSB0cnVlO1xuICB9XG4gIHdoaWxlIChzdHIubWF0Y2goRE9VQkxFX1NMQVNIX1JFKSkge1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKERPVUJMRV9TTEFTSF9SRSwgU0xBU0gpO1xuICB9XG4gIGlmIChwcmVwZW5kKSB7XG4gICAgc3RyID0gU0xBU0ggKyBzdHI7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8vIE91ciB2ZXJzaW9uIG9mIHVwYXRoLm5vcm1hbGl6ZVxuLy8gVE9ETzogdGhpcyBpcyBub3QgZXF1YWwgdG8gcGF0aC1ub3JtYWxpemUgbW9kdWxlIC0gaW52ZXN0aWdhdGUgd2h5XG5jb25zdCBub3JtYWxpemVQYXRoVG9Vbml4ID0gKHBhdGgpID0+IHRvVW5peChzeXNQYXRoLm5vcm1hbGl6ZSh0b1VuaXgocGF0aCkpKTtcblxuY29uc3Qgbm9ybWFsaXplSWdub3JlZCA9IChjd2QgPSBFTVBUWV9TVFIpID0+IChwYXRoKSA9PiB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gU1RSSU5HX1RZUEUpIHJldHVybiBwYXRoO1xuICByZXR1cm4gbm9ybWFsaXplUGF0aFRvVW5peChzeXNQYXRoLmlzQWJzb2x1dGUocGF0aCkgPyBwYXRoIDogc3lzUGF0aC5qb2luKGN3ZCwgcGF0aCkpO1xufTtcblxuY29uc3QgZ2V0QWJzb2x1dGVQYXRoID0gKHBhdGgsIGN3ZCkgPT4ge1xuICBpZiAoc3lzUGF0aC5pc0Fic29sdXRlKHBhdGgpKSB7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgaWYgKHBhdGguc3RhcnRzV2l0aChCQU5HKSkge1xuICAgIHJldHVybiBCQU5HICsgc3lzUGF0aC5qb2luKGN3ZCwgcGF0aC5zbGljZSgxKSk7XG4gIH1cbiAgcmV0dXJuIHN5c1BhdGguam9pbihjd2QsIHBhdGgpO1xufTtcblxuY29uc3QgdW5kZWYgPSAob3B0cywga2V5KSA9PiBvcHRzW2tleV0gPT09IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBEaXJlY3RvcnkgZW50cnkuXG4gKiBAcHJvcGVydHkge1BhdGh9IHBhdGhcbiAqIEBwcm9wZXJ0eSB7U2V0PFBhdGg+fSBpdGVtc1xuICovXG5jbGFzcyBEaXJFbnRyeSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1BhdGh9IGRpclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZW1vdmVXYXRjaGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkaXIsIHJlbW92ZVdhdGNoZXIpIHtcbiAgICB0aGlzLnBhdGggPSBkaXI7XG4gICAgdGhpcy5fcmVtb3ZlV2F0Y2hlciA9IHJlbW92ZVdhdGNoZXI7XG4gICAgLyoqIEB0eXBlIHtTZXQ8UGF0aD59ICovXG4gICAgdGhpcy5pdGVtcyA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIGFkZChpdGVtKSB7XG4gICAgY29uc3Qge2l0ZW1zfSA9IHRoaXM7XG4gICAgaWYgKCFpdGVtcykgcmV0dXJuO1xuICAgIGlmIChpdGVtICE9PSBPTkVfRE9UICYmIGl0ZW0gIT09IFRXT19ET1RTKSBpdGVtcy5hZGQoaXRlbSk7XG4gIH1cblxuICBhc3luYyByZW1vdmUoaXRlbSkge1xuICAgIGNvbnN0IHtpdGVtc30gPSB0aGlzO1xuICAgIGlmICghaXRlbXMpIHJldHVybjtcbiAgICBpdGVtcy5kZWxldGUoaXRlbSk7XG4gICAgaWYgKGl0ZW1zLnNpemUgPiAwKSByZXR1cm47XG5cbiAgICBjb25zdCBkaXIgPSB0aGlzLnBhdGg7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHJlYWRkaXIoZGlyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmICh0aGlzLl9yZW1vdmVXYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVdhdGNoZXIoc3lzUGF0aC5kaXJuYW1lKGRpciksIHN5c1BhdGguYmFzZW5hbWUoZGlyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGl0ZW0pIHtcbiAgICBjb25zdCB7aXRlbXN9ID0gdGhpcztcbiAgICBpZiAoIWl0ZW1zKSByZXR1cm47XG4gICAgcmV0dXJuIGl0ZW1zLmhhcyhpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn1cbiAgICovXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGNvbnN0IHtpdGVtc30gPSB0aGlzO1xuICAgIGlmICghaXRlbXMpIHJldHVybjtcbiAgICByZXR1cm4gWy4uLml0ZW1zLnZhbHVlcygpXTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5pdGVtcy5jbGVhcigpO1xuICAgIGRlbGV0ZSB0aGlzLnBhdGg7XG4gICAgZGVsZXRlIHRoaXMuX3JlbW92ZVdhdGNoZXI7XG4gICAgZGVsZXRlIHRoaXMuaXRlbXM7XG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgfVxufVxuXG5jb25zdCBTVEFUX01FVEhPRF9GID0gJ3N0YXQnO1xuY29uc3QgU1RBVF9NRVRIT0RfTCA9ICdsc3RhdCc7XG5jbGFzcyBXYXRjaEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKHBhdGgsIHdhdGNoUGF0aCwgZm9sbG93LCBmc3cpIHtcbiAgICB0aGlzLmZzdyA9IGZzdztcbiAgICB0aGlzLnBhdGggPSBwYXRoID0gcGF0aC5yZXBsYWNlKFJFUExBQ0VSX1JFLCBFTVBUWV9TVFIpO1xuICAgIHRoaXMud2F0Y2hQYXRoID0gd2F0Y2hQYXRoO1xuICAgIHRoaXMuZnVsbFdhdGNoUGF0aCA9IHN5c1BhdGgucmVzb2x2ZSh3YXRjaFBhdGgpO1xuICAgIHRoaXMuaGFzR2xvYiA9IHdhdGNoUGF0aCAhPT0gcGF0aDtcbiAgICAvKiogQHR5cGUge29iamVjdHxib29sZWFufSAqL1xuICAgIGlmIChwYXRoID09PSBFTVBUWV9TVFIpIHRoaXMuaGFzR2xvYiA9IGZhbHNlO1xuICAgIHRoaXMuZ2xvYlN5bWxpbmsgPSB0aGlzLmhhc0dsb2IgJiYgZm9sbG93ID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgdGhpcy5nbG9iRmlsdGVyID0gdGhpcy5oYXNHbG9iID8gYW55bWF0Y2gocGF0aCwgdW5kZWZpbmVkLCBBTllNQVRDSF9PUFRTKSA6IGZhbHNlO1xuICAgIHRoaXMuZGlyUGFydHMgPSB0aGlzLmdldERpclBhcnRzKHBhdGgpO1xuICAgIHRoaXMuZGlyUGFydHMuZm9yRWFjaCgocGFydHMpID0+IHtcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSBwYXJ0cy5wb3AoKTtcbiAgICB9KTtcbiAgICB0aGlzLmZvbGxvd1N5bWxpbmtzID0gZm9sbG93O1xuICAgIHRoaXMuc3RhdE1ldGhvZCA9IGZvbGxvdyA/IFNUQVRfTUVUSE9EX0YgOiBTVEFUX01FVEhPRF9MO1xuICB9XG5cbiAgY2hlY2tHbG9iU3ltbGluayhlbnRyeSkge1xuICAgIC8vIG9ubHkgbmVlZCB0byByZXNvbHZlIG9uY2VcbiAgICAvLyBmaXJzdCBlbnRyeSBzaG91bGQgYWx3YXlzIGhhdmUgZW50cnkucGFyZW50RGlyID09PSBFTVBUWV9TVFJcbiAgICBpZiAodGhpcy5nbG9iU3ltbGluayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmdsb2JTeW1saW5rID0gZW50cnkuZnVsbFBhcmVudERpciA9PT0gdGhpcy5mdWxsV2F0Y2hQYXRoID9cbiAgICAgICAgZmFsc2UgOiB7cmVhbFBhdGg6IGVudHJ5LmZ1bGxQYXJlbnREaXIsIGxpbmtQYXRoOiB0aGlzLmZ1bGxXYXRjaFBhdGh9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdsb2JTeW1saW5rKSB7XG4gICAgICByZXR1cm4gZW50cnkuZnVsbFBhdGgucmVwbGFjZSh0aGlzLmdsb2JTeW1saW5rLnJlYWxQYXRoLCB0aGlzLmdsb2JTeW1saW5rLmxpbmtQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW50cnkuZnVsbFBhdGg7XG4gIH1cblxuICBlbnRyeVBhdGgoZW50cnkpIHtcbiAgICByZXR1cm4gc3lzUGF0aC5qb2luKHRoaXMud2F0Y2hQYXRoLFxuICAgICAgc3lzUGF0aC5yZWxhdGl2ZSh0aGlzLndhdGNoUGF0aCwgdGhpcy5jaGVja0dsb2JTeW1saW5rKGVudHJ5KSlcbiAgICApO1xuICB9XG5cbiAgZmlsdGVyUGF0aChlbnRyeSkge1xuICAgIGNvbnN0IHtzdGF0c30gPSBlbnRyeTtcbiAgICBpZiAoc3RhdHMgJiYgc3RhdHMuaXNTeW1ib2xpY0xpbmsoKSkgcmV0dXJuIHRoaXMuZmlsdGVyRGlyKGVudHJ5KTtcbiAgICBjb25zdCByZXNvbHZlZFBhdGggPSB0aGlzLmVudHJ5UGF0aChlbnRyeSk7XG4gICAgY29uc3QgbWF0Y2hlc0dsb2IgPSB0aGlzLmhhc0dsb2IgJiYgdHlwZW9mIHRoaXMuZ2xvYkZpbHRlciA9PT0gRlVOQ1RJT05fVFlQRSA/XG4gICAgICB0aGlzLmdsb2JGaWx0ZXIocmVzb2x2ZWRQYXRoKSA6IHRydWU7XG4gICAgcmV0dXJuIG1hdGNoZXNHbG9iICYmXG4gICAgICB0aGlzLmZzdy5faXNudElnbm9yZWQocmVzb2x2ZWRQYXRoLCBzdGF0cykgJiZcbiAgICAgIHRoaXMuZnN3Ll9oYXNSZWFkUGVybWlzc2lvbnMoc3RhdHMpO1xuICB9XG5cbiAgZ2V0RGlyUGFydHMocGF0aCkge1xuICAgIGlmICghdGhpcy5oYXNHbG9iKSByZXR1cm4gW107XG4gICAgY29uc3QgcGFydHMgPSBbXTtcbiAgICBjb25zdCBleHBhbmRlZFBhdGggPSBwYXRoLmluY2x1ZGVzKEJSQUNFX1NUQVJUKSA/IGJyYWNlcy5leHBhbmQocGF0aCkgOiBbcGF0aF07XG4gICAgZXhwYW5kZWRQYXRoLmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgIHBhcnRzLnB1c2goc3lzUGF0aC5yZWxhdGl2ZSh0aGlzLndhdGNoUGF0aCwgcGF0aCkuc3BsaXQoU0xBU0hfT1JfQkFDS19TTEFTSF9SRSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXJ0cztcbiAgfVxuXG4gIGZpbHRlckRpcihlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc0dsb2IpIHtcbiAgICAgIGNvbnN0IGVudHJ5UGFydHMgPSB0aGlzLmdldERpclBhcnRzKHRoaXMuY2hlY2tHbG9iU3ltbGluayhlbnRyeSkpO1xuICAgICAgbGV0IGdsb2JzdGFyID0gZmFsc2U7XG4gICAgICB0aGlzLnVubWF0Y2hlZEdsb2IgPSAhdGhpcy5kaXJQYXJ0cy5zb21lKChwYXJ0cykgPT4ge1xuICAgICAgICByZXR1cm4gcGFydHMuZXZlcnkoKHBhcnQsIGkpID0+IHtcbiAgICAgICAgICBpZiAocGFydCA9PT0gR0xPQlNUQVIpIGdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZ2xvYnN0YXIgfHwgIWVudHJ5UGFydHNbMF1baV0gfHwgYW55bWF0Y2gocGFydCwgZW50cnlQYXJ0c1swXVtpXSwgQU5ZTUFUQ0hfT1BUUyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAhdGhpcy51bm1hdGNoZWRHbG9iICYmIHRoaXMuZnN3Ll9pc250SWdub3JlZCh0aGlzLmVudHJ5UGF0aChlbnRyeSksIGVudHJ5LnN0YXRzKTtcbiAgfVxufVxuXG4vKipcbiAqIFdhdGNoZXMgZmlsZXMgJiBkaXJlY3RvcmllcyBmb3IgY2hhbmdlcy4gRW1pdHRlZCBldmVudHM6XG4gKiBgYWRkYCwgYGFkZERpcmAsIGBjaGFuZ2VgLCBgdW5saW5rYCwgYHVubGlua0RpcmAsIGBhbGxgLCBgZXJyb3JgXG4gKlxuICogICAgIG5ldyBGU1dhdGNoZXIoKVxuICogICAgICAgLmFkZChkaXJlY3RvcmllcylcbiAqICAgICAgIC5vbignYWRkJywgcGF0aCA9PiBsb2coJ0ZpbGUnLCBwYXRoLCAnd2FzIGFkZGVkJykpXG4gKi9cbmNsYXNzIEZTV2F0Y2hlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4vLyBOb3QgaW5kZW50aW5nIG1ldGhvZHMgZm9yIGhpc3Rvcnkgc2FrZTsgZm9yIG5vdy5cbmNvbnN0cnVjdG9yKF9vcHRzKSB7XG4gIHN1cGVyKCk7XG5cbiAgY29uc3Qgb3B0cyA9IHt9O1xuICBpZiAoX29wdHMpIE9iamVjdC5hc3NpZ24ob3B0cywgX29wdHMpOyAvLyBmb3IgZnJvemVuIG9iamVjdHNcblxuICAvKiogQHR5cGUge01hcDxTdHJpbmcsIERpckVudHJ5Pn0gKi9cbiAgdGhpcy5fd2F0Y2hlZCA9IG5ldyBNYXAoKTtcbiAgLyoqIEB0eXBlIHtNYXA8U3RyaW5nLCBBcnJheT59ICovXG4gIHRoaXMuX2Nsb3NlcnMgPSBuZXcgTWFwKCk7XG4gIC8qKiBAdHlwZSB7U2V0PFN0cmluZz59ICovXG4gIHRoaXMuX2lnbm9yZWRQYXRocyA9IG5ldyBTZXQoKTtcblxuICAvKiogQHR5cGUge01hcDxUaHJvdHRsZVR5cGUsIE1hcD59ICovXG4gIHRoaXMuX3Rocm90dGxlZCA9IG5ldyBNYXAoKTtcblxuICAvKiogQHR5cGUge01hcDxQYXRoLCBTdHJpbmd8Qm9vbGVhbj59ICovXG4gIHRoaXMuX3N5bWxpbmtQYXRocyA9IG5ldyBNYXAoKTtcblxuICB0aGlzLl9zdHJlYW1zID0gbmV3IFNldCgpO1xuICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuXG4gIC8vIFNldCB1cCBkZWZhdWx0IG9wdGlvbnMuXG4gIGlmICh1bmRlZihvcHRzLCAncGVyc2lzdGVudCcpKSBvcHRzLnBlcnNpc3RlbnQgPSB0cnVlO1xuICBpZiAodW5kZWYob3B0cywgJ2lnbm9yZUluaXRpYWwnKSkgb3B0cy5pZ25vcmVJbml0aWFsID0gZmFsc2U7XG4gIGlmICh1bmRlZihvcHRzLCAnaWdub3JlUGVybWlzc2lvbkVycm9ycycpKSBvcHRzLmlnbm9yZVBlcm1pc3Npb25FcnJvcnMgPSBmYWxzZTtcbiAgaWYgKHVuZGVmKG9wdHMsICdpbnRlcnZhbCcpKSBvcHRzLmludGVydmFsID0gMTAwO1xuICBpZiAodW5kZWYob3B0cywgJ2JpbmFyeUludGVydmFsJykpIG9wdHMuYmluYXJ5SW50ZXJ2YWwgPSAzMDA7XG4gIGlmICh1bmRlZihvcHRzLCAnZGlzYWJsZUdsb2JiaW5nJykpIG9wdHMuZGlzYWJsZUdsb2JiaW5nID0gZmFsc2U7XG4gIG9wdHMuZW5hYmxlQmluYXJ5SW50ZXJ2YWwgPSBvcHRzLmJpbmFyeUludGVydmFsICE9PSBvcHRzLmludGVydmFsO1xuXG4gIC8vIEVuYWJsZSBmc2V2ZW50cyBvbiBPUyBYIHdoZW4gcG9sbGluZyBpc24ndCBleHBsaWNpdGx5IGVuYWJsZWQuXG4gIGlmICh1bmRlZihvcHRzLCAndXNlRnNFdmVudHMnKSkgb3B0cy51c2VGc0V2ZW50cyA9ICFvcHRzLnVzZVBvbGxpbmc7XG5cbiAgLy8gSWYgd2UgY2FuJ3QgdXNlIGZzZXZlbnRzLCBlbnN1cmUgdGhlIG9wdGlvbnMgcmVmbGVjdCBpdCdzIGRpc2FibGVkLlxuICBjb25zdCBjYW5Vc2VGc0V2ZW50cyA9IEZzRXZlbnRzSGFuZGxlci5jYW5Vc2UoKTtcbiAgaWYgKCFjYW5Vc2VGc0V2ZW50cykgb3B0cy51c2VGc0V2ZW50cyA9IGZhbHNlO1xuXG4gIC8vIFVzZSBwb2xsaW5nIG9uIE1hYyBpZiBub3QgdXNpbmcgZnNldmVudHMuXG4gIC8vIE90aGVyIHBsYXRmb3JtcyB1c2Ugbm9uLXBvbGxpbmcgZnNfd2F0Y2guXG4gIGlmICh1bmRlZihvcHRzLCAndXNlUG9sbGluZycpICYmICFvcHRzLnVzZUZzRXZlbnRzKSB7XG4gICAgb3B0cy51c2VQb2xsaW5nID0gaXNNYWNvcztcbiAgfVxuXG4gIC8vIEdsb2JhbCBvdmVycmlkZSAodXNlZnVsIGZvciBlbmQtZGV2ZWxvcGVycyB0aGF0IG5lZWQgdG8gZm9yY2UgcG9sbGluZyBmb3IgYWxsXG4gIC8vIGluc3RhbmNlcyBvZiBjaG9raWRhciwgcmVnYXJkbGVzcyBvZiB1c2FnZS9kZXBlbmRlbmN5IGRlcHRoKVxuICBjb25zdCBlbnZQb2xsID0gcHJvY2Vzcy5lbnYuQ0hPS0lEQVJfVVNFUE9MTElORztcbiAgaWYgKGVudlBvbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGVudkxvd2VyID0gZW52UG9sbC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGVudkxvd2VyID09PSAnZmFsc2UnIHx8IGVudkxvd2VyID09PSAnMCcpIHtcbiAgICAgIG9wdHMudXNlUG9sbGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZW52TG93ZXIgPT09ICd0cnVlJyB8fCBlbnZMb3dlciA9PT0gJzEnKSB7XG4gICAgICBvcHRzLnVzZVBvbGxpbmcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzLnVzZVBvbGxpbmcgPSAhIWVudkxvd2VyO1xuICAgIH1cbiAgfVxuICBjb25zdCBlbnZJbnRlcnZhbCA9IHByb2Nlc3MuZW52LkNIT0tJREFSX0lOVEVSVkFMO1xuICBpZiAoZW52SW50ZXJ2YWwpIHtcbiAgICBvcHRzLmludGVydmFsID0gTnVtYmVyLnBhcnNlSW50KGVudkludGVydmFsLCAxMCk7XG4gIH1cblxuICAvLyBFZGl0b3IgYXRvbWljIHdyaXRlIG5vcm1hbGl6YXRpb24gZW5hYmxlZCBieSBkZWZhdWx0IHdpdGggZnMud2F0Y2hcbiAgaWYgKHVuZGVmKG9wdHMsICdhdG9taWMnKSkgb3B0cy5hdG9taWMgPSAhb3B0cy51c2VQb2xsaW5nICYmICFvcHRzLnVzZUZzRXZlbnRzO1xuICBpZiAob3B0cy5hdG9taWMpIHRoaXMuX3BlbmRpbmdVbmxpbmtzID0gbmV3IE1hcCgpO1xuXG4gIGlmICh1bmRlZihvcHRzLCAnZm9sbG93U3ltbGlua3MnKSkgb3B0cy5mb2xsb3dTeW1saW5rcyA9IHRydWU7XG5cbiAgaWYgKHVuZGVmKG9wdHMsICdhd2FpdFdyaXRlRmluaXNoJykpIG9wdHMuYXdhaXRXcml0ZUZpbmlzaCA9IGZhbHNlO1xuICBpZiAob3B0cy5hd2FpdFdyaXRlRmluaXNoID09PSB0cnVlKSBvcHRzLmF3YWl0V3JpdGVGaW5pc2ggPSB7fTtcbiAgY29uc3QgYXdmID0gb3B0cy5hd2FpdFdyaXRlRmluaXNoO1xuICBpZiAoYXdmKSB7XG4gICAgaWYgKCFhd2Yuc3RhYmlsaXR5VGhyZXNob2xkKSBhd2Yuc3RhYmlsaXR5VGhyZXNob2xkID0gMjAwMDtcbiAgICBpZiAoIWF3Zi5wb2xsSW50ZXJ2YWwpIGF3Zi5wb2xsSW50ZXJ2YWwgPSAxMDA7XG4gICAgdGhpcy5fcGVuZGluZ1dyaXRlcyA9IG5ldyBNYXAoKTtcbiAgfVxuICBpZiAob3B0cy5pZ25vcmVkKSBvcHRzLmlnbm9yZWQgPSBhcnJpZnkob3B0cy5pZ25vcmVkKTtcblxuICBsZXQgcmVhZHlDYWxscyA9IDA7XG4gIHRoaXMuX2VtaXRSZWFkeSA9ICgpID0+IHtcbiAgICByZWFkeUNhbGxzKys7XG4gICAgaWYgKHJlYWR5Q2FsbHMgPj0gdGhpcy5fcmVhZHlDb3VudCkge1xuICAgICAgdGhpcy5fZW1pdFJlYWR5ID0gRU1QVFlfRk47XG4gICAgICB0aGlzLl9yZWFkeUVtaXR0ZWQgPSB0cnVlO1xuICAgICAgLy8gdXNlIHByb2Nlc3MubmV4dFRpY2sgdG8gYWxsb3cgdGltZSBmb3IgbGlzdGVuZXIgdG8gYmUgYm91bmRcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gdGhpcy5lbWl0KEVWX1JFQURZKSk7XG4gICAgfVxuICB9O1xuICB0aGlzLl9lbWl0UmF3ID0gKC4uLmFyZ3MpID0+IHRoaXMuZW1pdChFVl9SQVcsIC4uLmFyZ3MpO1xuICB0aGlzLl9yZWFkeUVtaXR0ZWQgPSBmYWxzZTtcbiAgdGhpcy5vcHRpb25zID0gb3B0cztcblxuICAvLyBJbml0aWFsaXplIHdpdGggcHJvcGVyIHdhdGNoZXIuXG4gIGlmIChvcHRzLnVzZUZzRXZlbnRzKSB7XG4gICAgdGhpcy5fZnNFdmVudHNIYW5kbGVyID0gbmV3IEZzRXZlbnRzSGFuZGxlcih0aGlzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9ub2RlRnNIYW5kbGVyID0gbmV3IE5vZGVGc0hhbmRsZXIodGhpcyk7XG4gIH1cblxuICAvLyBZb3XigJlyZSBmcm96ZW4gd2hlbiB5b3VyIGhlYXJ04oCZcyBub3Qgb3Blbi5cbiAgT2JqZWN0LmZyZWV6ZShvcHRzKTtcbn1cblxuLy8gUHVibGljIG1ldGhvZHNcblxuLyoqXG4gKiBBZGRzIHBhdGhzIHRvIGJlIHdhdGNoZWQgb24gYW4gZXhpc3RpbmcgRlNXYXRjaGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge1BhdGh8QXJyYXk8UGF0aD59IHBhdGhzX1xuICogQHBhcmFtIHtTdHJpbmc9fSBfb3JpZ0FkZCBwcml2YXRlOyBmb3IgaGFuZGxpbmcgbm9uLWV4aXN0ZW50IHBhdGhzIHRvIGJlIHdhdGNoZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbj19IF9pbnRlcm5hbCBwcml2YXRlOyBpbmRpY2F0ZXMgYSBub24tdXNlciBhZGRcbiAqIEByZXR1cm5zIHtGU1dhdGNoZXJ9IGZvciBjaGFpbmluZ1xuICovXG5hZGQocGF0aHNfLCBfb3JpZ0FkZCwgX2ludGVybmFsKSB7XG4gIGNvbnN0IHtjd2QsIGRpc2FibGVHbG9iYmluZ30gPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gIGxldCBwYXRocyA9IHVuaWZ5UGF0aHMocGF0aHNfKTtcbiAgaWYgKGN3ZCkge1xuICAgIHBhdGhzID0gcGF0aHMubWFwKChwYXRoKSA9PiB7XG4gICAgICBjb25zdCBhYnNQYXRoID0gZ2V0QWJzb2x1dGVQYXRoKHBhdGgsIGN3ZCk7XG5cbiAgICAgIC8vIENoZWNrIGBwYXRoYCBpbnN0ZWFkIG9mIGBhYnNQYXRoYCBiZWNhdXNlIHRoZSBjd2QgcG9ydGlvbiBjYW4ndCBiZSBhIGdsb2JcbiAgICAgIGlmIChkaXNhYmxlR2xvYmJpbmcgfHwgIWlzR2xvYihwYXRoKSkge1xuICAgICAgICByZXR1cm4gYWJzUGF0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub3JtYWxpemVQYXRoKGFic1BhdGgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gc2V0IGFzaWRlIG5lZ2F0ZWQgZ2xvYiBzdHJpbmdzXG4gIHBhdGhzID0gcGF0aHMuZmlsdGVyKChwYXRoKSA9PiB7XG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aChCQU5HKSkge1xuICAgICAgdGhpcy5faWdub3JlZFBhdGhzLmFkZChwYXRoLnNsaWNlKDEpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBpZiBhIHBhdGggaXMgYmVpbmcgYWRkZWQgdGhhdCB3YXMgcHJldmlvdXNseSBpZ25vcmVkLCBzdG9wIGlnbm9yaW5nIGl0XG4gICAgdGhpcy5faWdub3JlZFBhdGhzLmRlbGV0ZShwYXRoKTtcbiAgICB0aGlzLl9pZ25vcmVkUGF0aHMuZGVsZXRlKHBhdGggKyBTTEFTSF9HTE9CU1RBUik7XG5cbiAgICAvLyByZXNldCB0aGUgY2FjaGVkIHVzZXJJZ25vcmVkIGFueW1hdGNoIGZuXG4gICAgLy8gdG8gbWFrZSBpZ25vcmVkUGF0aHMgY2hhbmdlcyBlZmZlY3RpdmVcbiAgICB0aGlzLl91c2VySWdub3JlZCA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBpZiAodGhpcy5vcHRpb25zLnVzZUZzRXZlbnRzICYmIHRoaXMuX2ZzRXZlbnRzSGFuZGxlcikge1xuICAgIGlmICghdGhpcy5fcmVhZHlDb3VudCkgdGhpcy5fcmVhZHlDb3VudCA9IHBhdGhzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBlcnNpc3RlbnQpIHRoaXMuX3JlYWR5Q291bnQgKj0gMjtcbiAgICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB0aGlzLl9mc0V2ZW50c0hhbmRsZXIuX2FkZFRvRnNFdmVudHMocGF0aCkpO1xuICB9IGVsc2Uge1xuICAgIGlmICghdGhpcy5fcmVhZHlDb3VudCkgdGhpcy5fcmVhZHlDb3VudCA9IDA7XG4gICAgdGhpcy5fcmVhZHlDb3VudCArPSBwYXRocy5sZW5ndGg7XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBwYXRocy5tYXAoYXN5bmMgcGF0aCA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX25vZGVGc0hhbmRsZXIuX2FkZFRvTm9kZUZzKHBhdGgsICFfaW50ZXJuYWwsIDAsIDAsIF9vcmlnQWRkKTtcbiAgICAgICAgaWYgKHJlcykgdGhpcy5fZW1pdFJlYWR5KCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xuICAgICAgcmVzdWx0cy5maWx0ZXIoaXRlbSA9PiBpdGVtKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICB0aGlzLmFkZChzeXNQYXRoLmRpcm5hbWUoaXRlbSksIHN5c1BhdGguYmFzZW5hbWUoX29yaWdBZGQgfHwgaXRlbSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDbG9zZSB3YXRjaGVycyBvciBzdGFydCBpZ25vcmluZyBldmVudHMgZnJvbSBzcGVjaWZpZWQgcGF0aHMuXG4gKiBAcGFyYW0ge1BhdGh8QXJyYXk8UGF0aD59IHBhdGhzXyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzLCBmaWxlL2RpcmVjdG9yeSBwYXRocyBhbmQvb3IgZ2xvYnNcbiAqIEByZXR1cm5zIHtGU1dhdGNoZXJ9IGZvciBjaGFpbmluZ1xuKi9cbnVud2F0Y2gocGF0aHNfKSB7XG4gIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuIHRoaXM7XG4gIGNvbnN0IHBhdGhzID0gdW5pZnlQYXRocyhwYXRoc18pO1xuICBjb25zdCB7Y3dkfSA9IHRoaXMub3B0aW9ucztcblxuICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgLy8gY29udmVydCB0byBhYnNvbHV0ZSBwYXRoIHVubGVzcyByZWxhdGl2ZSBwYXRoIGFscmVhZHkgbWF0Y2hlc1xuICAgIGlmICghc3lzUGF0aC5pc0Fic29sdXRlKHBhdGgpICYmICF0aGlzLl9jbG9zZXJzLmhhcyhwYXRoKSkge1xuICAgICAgaWYgKGN3ZCkgcGF0aCA9IHN5c1BhdGguam9pbihjd2QsIHBhdGgpO1xuICAgICAgcGF0aCA9IHN5c1BhdGgucmVzb2x2ZShwYXRoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jbG9zZVBhdGgocGF0aCk7XG5cbiAgICB0aGlzLl9pZ25vcmVkUGF0aHMuYWRkKHBhdGgpO1xuICAgIGlmICh0aGlzLl93YXRjaGVkLmhhcyhwYXRoKSkge1xuICAgICAgdGhpcy5faWdub3JlZFBhdGhzLmFkZChwYXRoICsgU0xBU0hfR0xPQlNUQVIpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHRoZSBjYWNoZWQgdXNlcklnbm9yZWQgYW55bWF0Y2ggZm5cbiAgICAvLyB0byBtYWtlIGlnbm9yZWRQYXRocyBjaGFuZ2VzIGVmZmVjdGl2ZVxuICAgIHRoaXMuX3VzZXJJZ25vcmVkID0gdW5kZWZpbmVkO1xuICB9KTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDbG9zZSB3YXRjaGVycyBhbmQgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZnJvbSB3YXRjaGVkIHBhdGhzLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59LlxuKi9cbmNsb3NlKCkge1xuICBpZiAodGhpcy5jbG9zZWQpIHJldHVybiB0aGlzLl9jbG9zZVByb21pc2U7XG4gIHRoaXMuY2xvc2VkID0gdHJ1ZTtcblxuICAvLyBNZW1vcnkgbWFuYWdlbWVudC5cbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgY29uc3QgY2xvc2VycyA9IFtdO1xuICB0aGlzLl9jbG9zZXJzLmZvckVhY2goY2xvc2VyTGlzdCA9PiBjbG9zZXJMaXN0LmZvckVhY2goY2xvc2VyID0+IHtcbiAgICBjb25zdCBwcm9taXNlID0gY2xvc2VyKCk7XG4gICAgaWYgKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSBjbG9zZXJzLnB1c2gocHJvbWlzZSk7XG4gIH0pKTtcbiAgdGhpcy5fc3RyZWFtcy5mb3JFYWNoKHN0cmVhbSA9PiBzdHJlYW0uZGVzdHJveSgpKTtcbiAgdGhpcy5fdXNlcklnbm9yZWQgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3JlYWR5Q291bnQgPSAwO1xuICB0aGlzLl9yZWFkeUVtaXR0ZWQgPSBmYWxzZTtcbiAgdGhpcy5fd2F0Y2hlZC5mb3JFYWNoKGRpcmVudCA9PiBkaXJlbnQuZGlzcG9zZSgpKTtcbiAgWydjbG9zZXJzJywgJ3dhdGNoZWQnLCAnc3RyZWFtcycsICdzeW1saW5rUGF0aHMnLCAndGhyb3R0bGVkJ10uZm9yRWFjaChrZXkgPT4ge1xuICAgIHRoaXNbYF8ke2tleX1gXS5jbGVhcigpO1xuICB9KTtcblxuICB0aGlzLl9jbG9zZVByb21pc2UgPSBjbG9zZXJzLmxlbmd0aCA/IFByb21pc2UuYWxsKGNsb3NlcnMpLnRoZW4oKCkgPT4gdW5kZWZpbmVkKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICByZXR1cm4gdGhpcy5fY2xvc2VQcm9taXNlO1xufVxuXG4vKipcbiAqIEV4cG9zZSBsaXN0IG9mIHdhdGNoZWQgcGF0aHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGZvciBjaGFpbmluZ1xuKi9cbmdldFdhdGNoZWQoKSB7XG4gIGNvbnN0IHdhdGNoTGlzdCA9IHt9O1xuICB0aGlzLl93YXRjaGVkLmZvckVhY2goKGVudHJ5LCBkaXIpID0+IHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLm9wdGlvbnMuY3dkID8gc3lzUGF0aC5yZWxhdGl2ZSh0aGlzLm9wdGlvbnMuY3dkLCBkaXIpIDogZGlyO1xuICAgIHdhdGNoTGlzdFtrZXkgfHwgT05FX0RPVF0gPSBlbnRyeS5nZXRDaGlsZHJlbigpLnNvcnQoKTtcbiAgfSk7XG4gIHJldHVybiB3YXRjaExpc3Q7XG59XG5cbmVtaXRXaXRoQWxsKGV2ZW50LCBhcmdzKSB7XG4gIHRoaXMuZW1pdCguLi5hcmdzKTtcbiAgaWYgKGV2ZW50ICE9PSBFVl9FUlJPUikgdGhpcy5lbWl0KEVWX0FMTCwgLi4uYXJncyk7XG59XG5cbi8vIENvbW1vbiBoZWxwZXJzXG4vLyAtLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhbmQgZW1pdCBldmVudHMuXG4gKiBDYWxsaW5nIF9lbWl0IERPRVMgTk9UIE1FQU4gZW1pdCgpIHdvdWxkIGJlIGNhbGxlZCFcbiAqIEBwYXJhbSB7RXZlbnROYW1lfSBldmVudCBUeXBlIG9mIGV2ZW50XG4gKiBAcGFyYW0ge1BhdGh9IHBhdGggRmlsZSBvciBkaXJlY3RvcnkgcGF0aFxuICogQHBhcmFtIHsqPX0gdmFsMSBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHdpdGggZXZlbnRcbiAqIEBwYXJhbSB7Kj19IHZhbDJcbiAqIEBwYXJhbSB7Kj19IHZhbDNcbiAqIEByZXR1cm5zIHRoZSBlcnJvciBpZiBkZWZpbmVkLCBvdGhlcndpc2UgdGhlIHZhbHVlIG9mIHRoZSBGU1dhdGNoZXIgaW5zdGFuY2UncyBgY2xvc2VkYCBmbGFnXG4gKi9cbmFzeW5jIF9lbWl0KGV2ZW50LCBwYXRoLCB2YWwxLCB2YWwyLCB2YWwzKSB7XG4gIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gIGlmIChpc1dpbmRvd3MpIHBhdGggPSBzeXNQYXRoLm5vcm1hbGl6ZShwYXRoKTtcbiAgaWYgKG9wdHMuY3dkKSBwYXRoID0gc3lzUGF0aC5yZWxhdGl2ZShvcHRzLmN3ZCwgcGF0aCk7XG4gIC8qKiBAdHlwZSBBcnJheTxhbnk+ICovXG4gIGNvbnN0IGFyZ3MgPSBbZXZlbnQsIHBhdGhdO1xuICBpZiAodmFsMyAhPT0gdW5kZWZpbmVkKSBhcmdzLnB1c2godmFsMSwgdmFsMiwgdmFsMyk7XG4gIGVsc2UgaWYgKHZhbDIgIT09IHVuZGVmaW5lZCkgYXJncy5wdXNoKHZhbDEsIHZhbDIpO1xuICBlbHNlIGlmICh2YWwxICE9PSB1bmRlZmluZWQpIGFyZ3MucHVzaCh2YWwxKTtcblxuICBjb25zdCBhd2YgPSBvcHRzLmF3YWl0V3JpdGVGaW5pc2g7XG4gIGxldCBwdztcbiAgaWYgKGF3ZiAmJiAocHcgPSB0aGlzLl9wZW5kaW5nV3JpdGVzLmdldChwYXRoKSkpIHtcbiAgICBwdy5sYXN0Q2hhbmdlID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChvcHRzLmF0b21pYykge1xuICAgIGlmIChldmVudCA9PT0gRVZfVU5MSU5LKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nVW5saW5rcy5zZXQocGF0aCwgYXJncyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1VubGlua3MuZm9yRWFjaCgoZW50cnksIHBhdGgpID0+IHtcbiAgICAgICAgICB0aGlzLmVtaXQoLi4uZW50cnkpO1xuICAgICAgICAgIHRoaXMuZW1pdChFVl9BTEwsIC4uLmVudHJ5KTtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nVW5saW5rcy5kZWxldGUocGF0aCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgdHlwZW9mIG9wdHMuYXRvbWljID09PSAnbnVtYmVyJyA/IG9wdHMuYXRvbWljIDogMTAwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoZXZlbnQgPT09IEVWX0FERCAmJiB0aGlzLl9wZW5kaW5nVW5saW5rcy5oYXMocGF0aCkpIHtcbiAgICAgIGV2ZW50ID0gYXJnc1swXSA9IEVWX0NIQU5HRTtcbiAgICAgIHRoaXMuX3BlbmRpbmdVbmxpbmtzLmRlbGV0ZShwYXRoKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXdmICYmIChldmVudCA9PT0gRVZfQUREIHx8IGV2ZW50ID09PSBFVl9DSEFOR0UpICYmIHRoaXMuX3JlYWR5RW1pdHRlZCkge1xuICAgIGNvbnN0IGF3ZkVtaXQgPSAoZXJyLCBzdGF0cykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBldmVudCA9IGFyZ3NbMF0gPSBFVl9FUlJPUjtcbiAgICAgICAgYXJnc1sxXSA9IGVycjtcbiAgICAgICAgdGhpcy5lbWl0V2l0aEFsbChldmVudCwgYXJncyk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRzKSB7XG4gICAgICAgIC8vIGlmIHN0YXRzIGRvZXNuJ3QgZXhpc3QgdGhlIGZpbGUgbXVzdCBoYXZlIGJlZW4gZGVsZXRlZFxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgYXJnc1syXSA9IHN0YXRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyZ3MucHVzaChzdGF0cyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0V2l0aEFsbChldmVudCwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuX2F3YWl0V3JpdGVGaW5pc2gocGF0aCwgYXdmLnN0YWJpbGl0eVRocmVzaG9sZCwgZXZlbnQsIGF3ZkVtaXQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKGV2ZW50ID09PSBFVl9DSEFOR0UpIHtcbiAgICBjb25zdCBpc1Rocm90dGxlZCA9ICF0aGlzLl90aHJvdHRsZShFVl9DSEFOR0UsIHBhdGgsIDUwKTtcbiAgICBpZiAoaXNUaHJvdHRsZWQpIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKG9wdHMuYWx3YXlzU3RhdCAmJiB2YWwxID09PSB1bmRlZmluZWQgJiZcbiAgICAoZXZlbnQgPT09IEVWX0FERCB8fCBldmVudCA9PT0gRVZfQUREX0RJUiB8fCBldmVudCA9PT0gRVZfQ0hBTkdFKVxuICApIHtcbiAgICBjb25zdCBmdWxsUGF0aCA9IG9wdHMuY3dkID8gc3lzUGF0aC5qb2luKG9wdHMuY3dkLCBwYXRoKSA6IHBhdGg7XG4gICAgbGV0IHN0YXRzO1xuICAgIHRyeSB7XG4gICAgICBzdGF0cyA9IGF3YWl0IHN0YXQoZnVsbFBhdGgpO1xuICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAvLyBTdXBwcmVzcyBldmVudCB3aGVuIGZzX3N0YXQgZmFpbHMsIHRvIGF2b2lkIHNlbmRpbmcgdW5kZWZpbmVkICdzdGF0J1xuICAgIGlmICghc3RhdHMgfHwgdGhpcy5jbG9zZWQpIHJldHVybjtcbiAgICBhcmdzLnB1c2goc3RhdHMpO1xuICB9XG4gIHRoaXMuZW1pdFdpdGhBbGwoZXZlbnQsIGFyZ3MpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENvbW1vbiBoYW5kbGVyIGZvciBlcnJvcnNcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKiBAcmV0dXJucyB7RXJyb3J8Qm9vbGVhbn0gVGhlIGVycm9yIGlmIGRlZmluZWQsIG90aGVyd2lzZSB0aGUgdmFsdWUgb2YgdGhlIEZTV2F0Y2hlciBpbnN0YW5jZSdzIGBjbG9zZWRgIGZsYWdcbiAqL1xuX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gIGNvbnN0IGNvZGUgPSBlcnJvciAmJiBlcnJvci5jb2RlO1xuICBpZiAoZXJyb3IgJiYgY29kZSAhPT0gJ0VOT0VOVCcgJiYgY29kZSAhPT0gJ0VOT1RESVInICYmXG4gICAgKCF0aGlzLm9wdGlvbnMuaWdub3JlUGVybWlzc2lvbkVycm9ycyB8fCAoY29kZSAhPT0gJ0VQRVJNJyAmJiBjb2RlICE9PSAnRUFDQ0VTJykpXG4gICkge1xuICAgIHRoaXMuZW1pdChFVl9FUlJPUiwgZXJyb3IpO1xuICB9XG4gIHJldHVybiBlcnJvciB8fCB0aGlzLmNsb3NlZDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSBmb3IgdGhyb3R0bGluZ1xuICogQHBhcmFtIHtUaHJvdHRsZVR5cGV9IGFjdGlvblR5cGUgdHlwZSBiZWluZyB0aHJvdHRsZWRcbiAqIEBwYXJhbSB7UGF0aH0gcGF0aCBiZWluZyBhY3RlZCB1cG9uXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCBkdXJhdGlvbiBvZiB0aW1lIHRvIHN1cHByZXNzIGR1cGxpY2F0ZSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fGZhbHNlfSB0cmFja2luZyBvYmplY3Qgb3IgZmFsc2UgaWYgYWN0aW9uIHNob3VsZCBiZSBzdXBwcmVzc2VkXG4gKi9cbl90aHJvdHRsZShhY3Rpb25UeXBlLCBwYXRoLCB0aW1lb3V0KSB7XG4gIGlmICghdGhpcy5fdGhyb3R0bGVkLmhhcyhhY3Rpb25UeXBlKSkge1xuICAgIHRoaXMuX3Rocm90dGxlZC5zZXQoYWN0aW9uVHlwZSwgbmV3IE1hcCgpKTtcbiAgfVxuXG4gIC8qKiBAdHlwZSB7TWFwPFBhdGgsIE9iamVjdD59ICovXG4gIGNvbnN0IGFjdGlvbiA9IHRoaXMuX3Rocm90dGxlZC5nZXQoYWN0aW9uVHlwZSk7XG4gIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICBjb25zdCBhY3Rpb25QYXRoID0gYWN0aW9uLmdldChwYXRoKTtcblxuICBpZiAoYWN0aW9uUGF0aCkge1xuICAgIGFjdGlvblBhdGguY291bnQrKztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgdGltZW91dE9iamVjdDtcbiAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IGFjdGlvbi5nZXQocGF0aCk7XG4gICAgY29uc3QgY291bnQgPSBpdGVtID8gaXRlbS5jb3VudCA6IDA7XG4gICAgYWN0aW9uLmRlbGV0ZShwYXRoKTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dE9iamVjdCk7XG4gICAgaWYgKGl0ZW0pIGNsZWFyVGltZW91dChpdGVtLnRpbWVvdXRPYmplY3QpO1xuICAgIHJldHVybiBjb3VudDtcbiAgfTtcbiAgdGltZW91dE9iamVjdCA9IHNldFRpbWVvdXQoY2xlYXIsIHRpbWVvdXQpO1xuICBjb25zdCB0aHIgPSB7dGltZW91dE9iamVjdCwgY2xlYXIsIGNvdW50OiAwfTtcbiAgYWN0aW9uLnNldChwYXRoLCB0aHIpO1xuICByZXR1cm4gdGhyO1xufVxuXG5faW5jclJlYWR5Q291bnQoKSB7XG4gIHJldHVybiB0aGlzLl9yZWFkeUNvdW50Kys7XG59XG5cbi8qKlxuICogQXdhaXRzIHdyaXRlIG9wZXJhdGlvbiB0byBmaW5pc2guXG4gKiBQb2xscyBhIG5ld2x5IGNyZWF0ZWQgZmlsZSBmb3Igc2l6ZSB2YXJpYXRpb25zLiBXaGVuIGZpbGVzIHNpemUgZG9lcyBub3QgY2hhbmdlIGZvciAndGhyZXNob2xkJyBtaWxsaXNlY29uZHMgY2FsbHMgY2FsbGJhY2suXG4gKiBAcGFyYW0ge1BhdGh9IHBhdGggYmVpbmcgYWN0ZWQgdXBvblxuICogQHBhcmFtIHtOdW1iZXJ9IHRocmVzaG9sZCBUaW1lIGluIG1pbGxpc2Vjb25kcyBhIGZpbGUgc2l6ZSBtdXN0IGJlIGZpeGVkIGJlZm9yZSBhY2tub3dsZWRnaW5nIHdyaXRlIE9QIGlzIGZpbmlzaGVkXG4gKiBAcGFyYW0ge0V2ZW50TmFtZX0gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGF3ZkVtaXQgQ2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdoZW4gcmVhZHkgZm9yIGV2ZW50IHRvIGJlIGVtaXR0ZWQuXG4gKi9cbl9hd2FpdFdyaXRlRmluaXNoKHBhdGgsIHRocmVzaG9sZCwgZXZlbnQsIGF3ZkVtaXQpIHtcbiAgbGV0IHRpbWVvdXRIYW5kbGVyO1xuXG4gIGxldCBmdWxsUGF0aCA9IHBhdGg7XG4gIGlmICh0aGlzLm9wdGlvbnMuY3dkICYmICFzeXNQYXRoLmlzQWJzb2x1dGUocGF0aCkpIHtcbiAgICBmdWxsUGF0aCA9IHN5c1BhdGguam9pbih0aGlzLm9wdGlvbnMuY3dkLCBwYXRoKTtcbiAgfVxuXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3QgYXdhaXRXcml0ZUZpbmlzaCA9IChwcmV2U3RhdCkgPT4ge1xuICAgIGZzLnN0YXQoZnVsbFBhdGgsIChlcnIsIGN1clN0YXQpID0+IHtcbiAgICAgIGlmIChlcnIgfHwgIXRoaXMuX3BlbmRpbmdXcml0ZXMuaGFzKHBhdGgpKSB7XG4gICAgICAgIGlmIChlcnIgJiYgZXJyLmNvZGUgIT09ICdFTk9FTlQnKSBhd2ZFbWl0KGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm93ID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXG4gICAgICBpZiAocHJldlN0YXQgJiYgY3VyU3RhdC5zaXplICE9PSBwcmV2U3RhdC5zaXplKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdXcml0ZXMuZ2V0KHBhdGgpLmxhc3RDaGFuZ2UgPSBub3c7XG4gICAgICB9XG4gICAgICBjb25zdCBwdyA9IHRoaXMuX3BlbmRpbmdXcml0ZXMuZ2V0KHBhdGgpO1xuICAgICAgY29uc3QgZGYgPSBub3cgLSBwdy5sYXN0Q2hhbmdlO1xuXG4gICAgICBpZiAoZGYgPj0gdGhyZXNob2xkKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdXcml0ZXMuZGVsZXRlKHBhdGgpO1xuICAgICAgICBhd2ZFbWl0KHVuZGVmaW5lZCwgY3VyU3RhdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lb3V0SGFuZGxlciA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgYXdhaXRXcml0ZUZpbmlzaCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuYXdhaXRXcml0ZUZpbmlzaC5wb2xsSW50ZXJ2YWwsXG4gICAgICAgICAgY3VyU3RhdFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlmICghdGhpcy5fcGVuZGluZ1dyaXRlcy5oYXMocGF0aCkpIHtcbiAgICB0aGlzLl9wZW5kaW5nV3JpdGVzLnNldChwYXRoLCB7XG4gICAgICBsYXN0Q2hhbmdlOiBub3csXG4gICAgICBjYW5jZWxXYWl0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdXcml0ZXMuZGVsZXRlKHBhdGgpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGltZW91dEhhbmRsZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgYXdhaXRXcml0ZUZpbmlzaCxcbiAgICAgIHRoaXMub3B0aW9ucy5hd2FpdFdyaXRlRmluaXNoLnBvbGxJbnRlcnZhbFxuICAgICk7XG4gIH1cbn1cblxuX2dldEdsb2JJZ25vcmVkKCkge1xuICByZXR1cm4gWy4uLnRoaXMuX2lnbm9yZWRQYXRocy52YWx1ZXMoKV07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHVzZXIgaGFzIGFza2VkIHRvIGlnbm9yZSB0aGlzIHBhdGguXG4gKiBAcGFyYW0ge1BhdGh9IHBhdGggZmlsZXBhdGggb3IgZGlyXG4gKiBAcGFyYW0ge2ZzLlN0YXRzPX0gc3RhdHMgcmVzdWx0IG9mIGZzLnN0YXRcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5faXNJZ25vcmVkKHBhdGgsIHN0YXRzKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuYXRvbWljICYmIERPVF9SRS50ZXN0KHBhdGgpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKCF0aGlzLl91c2VySWdub3JlZCkge1xuICAgIGNvbnN0IHtjd2R9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IGlnbiA9IHRoaXMub3B0aW9ucy5pZ25vcmVkO1xuXG4gICAgY29uc3QgaWdub3JlZCA9IGlnbiAmJiBpZ24ubWFwKG5vcm1hbGl6ZUlnbm9yZWQoY3dkKSk7XG4gICAgY29uc3QgcGF0aHMgPSBhcnJpZnkoaWdub3JlZClcbiAgICAgIC5maWx0ZXIoKHBhdGgpID0+IHR5cGVvZiBwYXRoID09PSBTVFJJTkdfVFlQRSAmJiAhaXNHbG9iKHBhdGgpKVxuICAgICAgLm1hcCgocGF0aCkgPT4gcGF0aCArIFNMQVNIX0dMT0JTVEFSKTtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fZ2V0R2xvYklnbm9yZWQoKS5tYXAobm9ybWFsaXplSWdub3JlZChjd2QpKS5jb25jYXQoaWdub3JlZCwgcGF0aHMpO1xuICAgIHRoaXMuX3VzZXJJZ25vcmVkID0gYW55bWF0Y2gobGlzdCwgdW5kZWZpbmVkLCBBTllNQVRDSF9PUFRTKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl91c2VySWdub3JlZChbcGF0aCwgc3RhdHNdKTtcbn1cblxuX2lzbnRJZ25vcmVkKHBhdGgsIHN0YXQpIHtcbiAgcmV0dXJuICF0aGlzLl9pc0lnbm9yZWQocGF0aCwgc3RhdCk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBzZXQgb2YgY29tbW9uIGhlbHBlcnMgYW5kIHByb3BlcnRpZXMgcmVsYXRpbmcgdG8gc3ltbGluayBhbmQgZ2xvYiBoYW5kbGluZy5cbiAqIEBwYXJhbSB7UGF0aH0gcGF0aCBmaWxlLCBkaXJlY3RvcnksIG9yIGdsb2IgcGF0dGVybiBiZWluZyB3YXRjaGVkXG4gKiBAcGFyYW0ge051bWJlcj19IGRlcHRoIGF0IGFueSBkZXB0aCA+IDAsIHRoaXMgaXNuJ3QgYSBnbG9iXG4gKiBAcmV0dXJucyB7V2F0Y2hIZWxwZXJ9IG9iamVjdCBjb250YWluaW5nIGhlbHBlcnMgZm9yIHRoaXMgcGF0aFxuICovXG5fZ2V0V2F0Y2hIZWxwZXJzKHBhdGgsIGRlcHRoKSB7XG4gIGNvbnN0IHdhdGNoUGF0aCA9IGRlcHRoIHx8IHRoaXMub3B0aW9ucy5kaXNhYmxlR2xvYmJpbmcgfHwgIWlzR2xvYihwYXRoKSA/IHBhdGggOiBnbG9iUGFyZW50KHBhdGgpO1xuICBjb25zdCBmb2xsb3cgPSB0aGlzLm9wdGlvbnMuZm9sbG93U3ltbGlua3M7XG5cbiAgcmV0dXJuIG5ldyBXYXRjaEhlbHBlcihwYXRoLCB3YXRjaFBhdGgsIGZvbGxvdywgdGhpcyk7XG59XG5cbi8vIERpcmVjdG9yeSBoZWxwZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFByb3ZpZGVzIGRpcmVjdG9yeSB0cmFja2luZyBvYmplY3RzXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHBhdGggb2YgdGhlIGRpcmVjdG9yeVxuICogQHJldHVybnMge0RpckVudHJ5fSB0aGUgZGlyZWN0b3J5J3MgdHJhY2tpbmcgb2JqZWN0XG4gKi9cbl9nZXRXYXRjaGVkRGlyKGRpcmVjdG9yeSkge1xuICBpZiAoIXRoaXMuX2JvdW5kUmVtb3ZlKSB0aGlzLl9ib3VuZFJlbW92ZSA9IHRoaXMuX3JlbW92ZS5iaW5kKHRoaXMpO1xuICBjb25zdCBkaXIgPSBzeXNQYXRoLnJlc29sdmUoZGlyZWN0b3J5KTtcbiAgaWYgKCF0aGlzLl93YXRjaGVkLmhhcyhkaXIpKSB0aGlzLl93YXRjaGVkLnNldChkaXIsIG5ldyBEaXJFbnRyeShkaXIsIHRoaXMuX2JvdW5kUmVtb3ZlKSk7XG4gIHJldHVybiB0aGlzLl93YXRjaGVkLmdldChkaXIpO1xufVxuXG4vLyBGaWxlIGhlbHBlcnNcbi8vIC0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIENoZWNrIGZvciByZWFkIHBlcm1pc3Npb25zLlxuICogQmFzZWQgb24gdGhpcyBhbnN3ZXIgb24gU086IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTc4MTQwNC8xMzU4NDA1XG4gKiBAcGFyYW0ge2ZzLlN0YXRzfSBzdGF0cyAtIG9iamVjdCwgcmVzdWx0IG9mIGZzX3N0YXRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZmlsZSBjYW4gYmUgcmVhZFxuKi9cbl9oYXNSZWFkUGVybWlzc2lvbnMoc3RhdHMpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVQZXJtaXNzaW9uRXJyb3JzKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBzdGF0cy5tb2RlIG1heSBiZSBiaWdpbnRcbiAgY29uc3QgbWQgPSBzdGF0cyAmJiBOdW1iZXIucGFyc2VJbnQoc3RhdHMubW9kZSwgMTApO1xuICBjb25zdCBzdCA9IG1kICYgMG83Nzc7XG4gIGNvbnN0IGl0ID0gTnVtYmVyLnBhcnNlSW50KHN0LnRvU3RyaW5nKDgpWzBdLCAxMCk7XG4gIHJldHVybiBCb29sZWFuKDQgJiBpdCk7XG59XG5cbi8qKlxuICogSGFuZGxlcyBlbWl0dGluZyB1bmxpbmsgZXZlbnRzIGZvclxuICogZmlsZXMgYW5kIGRpcmVjdG9yaWVzLCBhbmQgdmlhIHJlY3Vyc2lvbiwgZm9yXG4gKiBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgd2l0aGluIGRpcmVjdG9yaWVzIHRoYXQgYXJlIHVubGlua2VkXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHdpdGhpbiB3aGljaCB0aGUgZm9sbG93aW5nIGl0ZW0gaXMgbG9jYXRlZFxuICogQHBhcmFtIHtTdHJpbmd9IGl0ZW0gICAgICBiYXNlIHBhdGggb2YgaXRlbS9kaXJlY3RvcnlcbiAqIEByZXR1cm5zIHt2b2lkfVxuKi9cbl9yZW1vdmUoZGlyZWN0b3J5LCBpdGVtLCBpc0RpcmVjdG9yeSkge1xuICAvLyBpZiB3aGF0IGlzIGJlaW5nIGRlbGV0ZWQgaXMgYSBkaXJlY3RvcnksIGdldCB0aGF0IGRpcmVjdG9yeSdzIHBhdGhzXG4gIC8vIGZvciByZWN1cnNpdmUgZGVsZXRpbmcgYW5kIGNsZWFuaW5nIG9mIHdhdGNoZWQgb2JqZWN0XG4gIC8vIGlmIGl0IGlzIG5vdCBhIGRpcmVjdG9yeSwgbmVzdGVkRGlyZWN0b3J5Q2hpbGRyZW4gd2lsbCBiZSBlbXB0eSBhcnJheVxuICBjb25zdCBwYXRoID0gc3lzUGF0aC5qb2luKGRpcmVjdG9yeSwgaXRlbSk7XG4gIGNvbnN0IGZ1bGxQYXRoID0gc3lzUGF0aC5yZXNvbHZlKHBhdGgpO1xuICBpc0RpcmVjdG9yeSA9IGlzRGlyZWN0b3J5ICE9IG51bGxcbiAgICA/IGlzRGlyZWN0b3J5XG4gICAgOiB0aGlzLl93YXRjaGVkLmhhcyhwYXRoKSB8fCB0aGlzLl93YXRjaGVkLmhhcyhmdWxsUGF0aCk7XG5cbiAgLy8gcHJldmVudCBkdXBsaWNhdGUgaGFuZGxpbmcgaW4gY2FzZSBvZiBhcnJpdmluZyBoZXJlIG5lYXJseSBzaW11bHRhbmVvdXNseVxuICAvLyB2aWEgbXVsdGlwbGUgcGF0aHMgKHN1Y2ggYXMgX2hhbmRsZUZpbGUgYW5kIF9oYW5kbGVEaXIpXG4gIGlmICghdGhpcy5fdGhyb3R0bGUoJ3JlbW92ZScsIHBhdGgsIDEwMCkpIHJldHVybjtcblxuICAvLyBpZiB0aGUgb25seSB3YXRjaGVkIGZpbGUgaXMgcmVtb3ZlZCwgd2F0Y2ggZm9yIGl0cyByZXR1cm5cbiAgaWYgKCFpc0RpcmVjdG9yeSAmJiAhdGhpcy5vcHRpb25zLnVzZUZzRXZlbnRzICYmIHRoaXMuX3dhdGNoZWQuc2l6ZSA9PT0gMSkge1xuICAgIHRoaXMuYWRkKGRpcmVjdG9yeSwgaXRlbSwgdHJ1ZSk7XG4gIH1cblxuICAvLyBUaGlzIHdpbGwgY3JlYXRlIGEgbmV3IGVudHJ5IGluIHRoZSB3YXRjaGVkIG9iamVjdCBpbiBlaXRoZXIgY2FzZVxuICAvLyBzbyB3ZSBnb3QgdG8gZG8gdGhlIGRpcmVjdG9yeSBjaGVjayBiZWZvcmVoYW5kXG4gIGNvbnN0IHdwID0gdGhpcy5fZ2V0V2F0Y2hlZERpcihwYXRoKTtcbiAgY29uc3QgbmVzdGVkRGlyZWN0b3J5Q2hpbGRyZW4gPSB3cC5nZXRDaGlsZHJlbigpO1xuXG4gIC8vIFJlY3Vyc2l2ZWx5IHJlbW92ZSBjaGlsZHJlbiBkaXJlY3RvcmllcyAvIGZpbGVzLlxuICBuZXN0ZWREaXJlY3RvcnlDaGlsZHJlbi5mb3JFYWNoKG5lc3RlZCA9PiB0aGlzLl9yZW1vdmUocGF0aCwgbmVzdGVkKSk7XG5cbiAgLy8gQ2hlY2sgaWYgaXRlbSB3YXMgb24gdGhlIHdhdGNoZWQgbGlzdCBhbmQgcmVtb3ZlIGl0XG4gIGNvbnN0IHBhcmVudCA9IHRoaXMuX2dldFdhdGNoZWREaXIoZGlyZWN0b3J5KTtcbiAgY29uc3Qgd2FzVHJhY2tlZCA9IHBhcmVudC5oYXMoaXRlbSk7XG4gIHBhcmVudC5yZW1vdmUoaXRlbSk7XG5cbiAgLy8gRml4ZXMgaXNzdWUgIzEwNDIgLT4gUmVsYXRpdmUgcGF0aHMgd2VyZSBkZXRlY3RlZCBhbmQgYWRkZWQgYXMgc3ltbGlua3NcbiAgLy8gKGh0dHBzOi8vZ2l0aHViLmNvbS9wYXVsbWlsbHIvY2hva2lkYXIvYmxvYi9lMTc1M2RkYmM5NTcxYmRjMzNiNGE0YWYxNzJkNTJjYjZlNjExYzEwL2xpYi9ub2RlZnMtaGFuZGxlci5qcyNMNjEyKSxcbiAgLy8gYnV0IG5ldmVyIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGluIGNhc2UgdGhlIHBhdGggd2FzIGRlbGV0ZWQuXG4gIC8vIFRoaXMgbGVhZHMgdG8gYW4gaW5jb3JyZWN0IHN0YXRlIGlmIHRoZSBwYXRoIHdhcyByZWNyZWF0ZWQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wYXVsbWlsbHIvY2hva2lkYXIvYmxvYi9lMTc1M2RkYmM5NTcxYmRjMzNiNGE0YWYxNzJkNTJjYjZlNjExYzEwL2xpYi9ub2RlZnMtaGFuZGxlci5qcyNMNTUzXG4gIGlmICh0aGlzLl9zeW1saW5rUGF0aHMuaGFzKGZ1bGxQYXRoKSkge1xuICAgIHRoaXMuX3N5bWxpbmtQYXRocy5kZWxldGUoZnVsbFBhdGgpO1xuICB9XG5cbiAgLy8gSWYgd2Ugd2FpdCBmb3IgdGhpcyBmaWxlIHRvIGJlIGZ1bGx5IHdyaXR0ZW4sIGNhbmNlbCB0aGUgd2FpdC5cbiAgbGV0IHJlbFBhdGggPSBwYXRoO1xuICBpZiAodGhpcy5vcHRpb25zLmN3ZCkgcmVsUGF0aCA9IHN5c1BhdGgucmVsYXRpdmUodGhpcy5vcHRpb25zLmN3ZCwgcGF0aCk7XG4gIGlmICh0aGlzLm9wdGlvbnMuYXdhaXRXcml0ZUZpbmlzaCAmJiB0aGlzLl9wZW5kaW5nV3JpdGVzLmhhcyhyZWxQYXRoKSkge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5fcGVuZGluZ1dyaXRlcy5nZXQocmVsUGF0aCkuY2FuY2VsV2FpdCgpO1xuICAgIGlmIChldmVudCA9PT0gRVZfQUREKSByZXR1cm47XG4gIH1cblxuICAvLyBUaGUgRW50cnkgd2lsbCBlaXRoZXIgYmUgYSBkaXJlY3RvcnkgdGhhdCBqdXN0IGdvdCByZW1vdmVkXG4gIC8vIG9yIGEgYm9ndXMgZW50cnkgdG8gYSBmaWxlLCBpbiBlaXRoZXIgY2FzZSB3ZSBoYXZlIHRvIHJlbW92ZSBpdFxuICB0aGlzLl93YXRjaGVkLmRlbGV0ZShwYXRoKTtcbiAgdGhpcy5fd2F0Y2hlZC5kZWxldGUoZnVsbFBhdGgpO1xuICBjb25zdCBldmVudE5hbWUgPSBpc0RpcmVjdG9yeSA/IEVWX1VOTElOS19ESVIgOiBFVl9VTkxJTks7XG4gIGlmICh3YXNUcmFja2VkICYmICF0aGlzLl9pc0lnbm9yZWQocGF0aCkpIHRoaXMuX2VtaXQoZXZlbnROYW1lLCBwYXRoKTtcblxuICAvLyBBdm9pZCBjb25mbGljdHMgaWYgd2UgbGF0ZXIgY3JlYXRlIGFub3RoZXIgZmlsZSB3aXRoIHRoZSBzYW1lIG5hbWVcbiAgaWYgKCF0aGlzLm9wdGlvbnMudXNlRnNFdmVudHMpIHtcbiAgICB0aGlzLl9jbG9zZVBhdGgocGF0aCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDbG9zZXMgYWxsIHdhdGNoZXJzIGZvciBhIHBhdGhcbiAqIEBwYXJhbSB7UGF0aH0gcGF0aFxuICovXG5fY2xvc2VQYXRoKHBhdGgpIHtcbiAgdGhpcy5fY2xvc2VGaWxlKHBhdGgpXG4gIGNvbnN0IGRpciA9IHN5c1BhdGguZGlybmFtZShwYXRoKTtcbiAgdGhpcy5fZ2V0V2F0Y2hlZERpcihkaXIpLnJlbW92ZShzeXNQYXRoLmJhc2VuYW1lKHBhdGgpKTtcbn1cblxuLyoqXG4gKiBDbG9zZXMgb25seSBmaWxlLXNwZWNpZmljIHdhdGNoZXJzXG4gKiBAcGFyYW0ge1BhdGh9IHBhdGhcbiAqL1xuX2Nsb3NlRmlsZShwYXRoKSB7XG4gIGNvbnN0IGNsb3NlcnMgPSB0aGlzLl9jbG9zZXJzLmdldChwYXRoKTtcbiAgaWYgKCFjbG9zZXJzKSByZXR1cm47XG4gIGNsb3NlcnMuZm9yRWFjaChjbG9zZXIgPT4gY2xvc2VyKCkpO1xuICB0aGlzLl9jbG9zZXJzLmRlbGV0ZShwYXRoKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtQYXRofSBwYXRoXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZXJcbiAqL1xuX2FkZFBhdGhDbG9zZXIocGF0aCwgY2xvc2VyKSB7XG4gIGlmICghY2xvc2VyKSByZXR1cm47XG4gIGxldCBsaXN0ID0gdGhpcy5fY2xvc2Vycy5nZXQocGF0aCk7XG4gIGlmICghbGlzdCkge1xuICAgIGxpc3QgPSBbXTtcbiAgICB0aGlzLl9jbG9zZXJzLnNldChwYXRoLCBsaXN0KTtcbiAgfVxuICBsaXN0LnB1c2goY2xvc2VyKTtcbn1cblxuX3JlYWRkaXJwKHJvb3QsIG9wdHMpIHtcbiAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XG4gIGNvbnN0IG9wdGlvbnMgPSB7dHlwZTogRVZfQUxMLCBhbHdheXNTdGF0OiB0cnVlLCBsc3RhdDogdHJ1ZSwgLi4ub3B0c307XG4gIGxldCBzdHJlYW0gPSByZWFkZGlycChyb290LCBvcHRpb25zKTtcbiAgdGhpcy5fc3RyZWFtcy5hZGQoc3RyZWFtKTtcbiAgc3RyZWFtLm9uY2UoU1RSX0NMT1NFLCAoKSA9PiB7XG4gICAgc3RyZWFtID0gdW5kZWZpbmVkO1xuICB9KTtcbiAgc3RyZWFtLm9uY2UoU1RSX0VORCwgKCkgPT4ge1xuICAgIGlmIChzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3N0cmVhbXMuZGVsZXRlKHN0cmVhbSk7XG4gICAgICBzdHJlYW0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxufVxuXG4vLyBFeHBvcnQgRlNXYXRjaGVyIGNsYXNzXG5leHBvcnRzLkZTV2F0Y2hlciA9IEZTV2F0Y2hlcjtcblxuLyoqXG4gKiBJbnN0YW50aWF0ZXMgd2F0Y2hlciB3aXRoIHBhdGhzIHRvIGJlIHRyYWNrZWQuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxTdHJpbmc+fSBwYXRocyBmaWxlL2RpcmVjdG9yeSBwYXRocyBhbmQvb3IgZ2xvYnNcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyBjaG9raWRhciBvcHRzXG4gKiBAcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBGU1dhdGNoZXIgZm9yIGNoYWluaW5nLlxuICovXG5jb25zdCB3YXRjaCA9IChwYXRocywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IEZTV2F0Y2hlcihvcHRpb25zKTtcbiAgd2F0Y2hlci5hZGQocGF0aHMpO1xuICByZXR1cm4gd2F0Y2hlcjtcbn07XG5cbmV4cG9ydHMud2F0Y2ggPSB3YXRjaDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qge3NlcH0gPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7cGxhdGZvcm19ID0gcHJvY2VzcztcblxuZXhwb3J0cy5FVl9BTEwgPSAnYWxsJztcbmV4cG9ydHMuRVZfUkVBRFkgPSAncmVhZHknO1xuZXhwb3J0cy5FVl9BREQgPSAnYWRkJztcbmV4cG9ydHMuRVZfQ0hBTkdFID0gJ2NoYW5nZSc7XG5leHBvcnRzLkVWX0FERF9ESVIgPSAnYWRkRGlyJztcbmV4cG9ydHMuRVZfVU5MSU5LID0gJ3VubGluayc7XG5leHBvcnRzLkVWX1VOTElOS19ESVIgPSAndW5saW5rRGlyJztcbmV4cG9ydHMuRVZfUkFXID0gJ3Jhdyc7XG5leHBvcnRzLkVWX0VSUk9SID0gJ2Vycm9yJztcblxuZXhwb3J0cy5TVFJfREFUQSA9ICdkYXRhJztcbmV4cG9ydHMuU1RSX0VORCA9ICdlbmQnO1xuZXhwb3J0cy5TVFJfQ0xPU0UgPSAnY2xvc2UnO1xuXG5leHBvcnRzLkZTRVZFTlRfQ1JFQVRFRCA9ICdjcmVhdGVkJztcbmV4cG9ydHMuRlNFVkVOVF9NT0RJRklFRCA9ICdtb2RpZmllZCc7XG5leHBvcnRzLkZTRVZFTlRfREVMRVRFRCA9ICdkZWxldGVkJztcbmV4cG9ydHMuRlNFVkVOVF9NT1ZFRCA9ICdtb3ZlZCc7XG5leHBvcnRzLkZTRVZFTlRfQ0xPTkVEID0gJ2Nsb25lZCc7XG5leHBvcnRzLkZTRVZFTlRfVU5LTk9XTiA9ICd1bmtub3duJztcbmV4cG9ydHMuRlNFVkVOVF9UWVBFX0ZJTEUgPSAnZmlsZSc7XG5leHBvcnRzLkZTRVZFTlRfVFlQRV9ESVJFQ1RPUlkgPSAnZGlyZWN0b3J5JztcbmV4cG9ydHMuRlNFVkVOVF9UWVBFX1NZTUxJTksgPSAnc3ltbGluayc7XG5cbmV4cG9ydHMuS0VZX0xJU1RFTkVSUyA9ICdsaXN0ZW5lcnMnO1xuZXhwb3J0cy5LRVlfRVJSID0gJ2VyckhhbmRsZXJzJztcbmV4cG9ydHMuS0VZX1JBVyA9ICdyYXdFbWl0dGVycyc7XG5leHBvcnRzLkhBTkRMRVJfS0VZUyA9IFtleHBvcnRzLktFWV9MSVNURU5FUlMsIGV4cG9ydHMuS0VZX0VSUiwgZXhwb3J0cy5LRVlfUkFXXTtcblxuZXhwb3J0cy5ET1RfU0xBU0ggPSBgLiR7c2VwfWA7XG5cbmV4cG9ydHMuQkFDS19TTEFTSF9SRSA9IC9cXFxcL2c7XG5leHBvcnRzLkRPVUJMRV9TTEFTSF9SRSA9IC9cXC9cXC8vO1xuZXhwb3J0cy5TTEFTSF9PUl9CQUNLX1NMQVNIX1JFID0gL1svXFxcXF0vO1xuZXhwb3J0cy5ET1RfUkUgPSAvXFwuLipcXC4oc3dbcHhdKSR8fiR8XFwuc3VibC4qXFwudG1wLztcbmV4cG9ydHMuUkVQTEFDRVJfUkUgPSAvXlxcLlsvXFxcXF0vO1xuXG5leHBvcnRzLlNMQVNIID0gJy8nO1xuZXhwb3J0cy5TTEFTSF9TTEFTSCA9ICcvLyc7XG5leHBvcnRzLkJSQUNFX1NUQVJUID0gJ3snO1xuZXhwb3J0cy5CQU5HID0gJyEnO1xuZXhwb3J0cy5PTkVfRE9UID0gJy4nO1xuZXhwb3J0cy5UV09fRE9UUyA9ICcuLic7XG5leHBvcnRzLlNUQVIgPSAnKic7XG5leHBvcnRzLkdMT0JTVEFSID0gJyoqJztcbmV4cG9ydHMuUk9PVF9HTE9CU1RBUiA9ICcvKiovKic7XG5leHBvcnRzLlNMQVNIX0dMT0JTVEFSID0gJy8qKic7XG5leHBvcnRzLkRJUl9TVUZGSVggPSAnRGlyJztcbmV4cG9ydHMuQU5ZTUFUQ0hfT1BUUyA9IHtkb3Q6IHRydWV9O1xuZXhwb3J0cy5TVFJJTkdfVFlQRSA9ICdzdHJpbmcnO1xuZXhwb3J0cy5GVU5DVElPTl9UWVBFID0gJ2Z1bmN0aW9uJztcbmV4cG9ydHMuRU1QVFlfU1RSID0gJyc7XG5leHBvcnRzLkVNUFRZX0ZOID0gKCkgPT4ge307XG5leHBvcnRzLklERU5USVRZX0ZOID0gdmFsID0+IHZhbDtcblxuZXhwb3J0cy5pc1dpbmRvd3MgPSBwbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmV4cG9ydHMuaXNNYWNvcyA9IHBsYXRmb3JtID09PSAnZGFyd2luJztcbmV4cG9ydHMuaXNMaW51eCA9IHBsYXRmb3JtID09PSAnbGludXgnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBzeXNQYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgeyBwcm9taXNpZnkgfSA9IHJlcXVpcmUoJ3V0aWwnKTtcblxubGV0IGZzZXZlbnRzO1xudHJ5IHtcbiAgZnNldmVudHMgPSByZXF1aXJlKCdmc2V2ZW50cycpO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkNIT0tJREFSX1BSSU5UX0ZTRVZFTlRTX1JFUVVJUkVfRVJST1IpIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5pZiAoZnNldmVudHMpIHtcbiAgLy8gVE9ETzogcmVhbCBjaGVja1xuICBjb25zdCBtdGNoID0gcHJvY2Vzcy52ZXJzaW9uLm1hdGNoKC92KFxcZCspXFwuKFxcZCspLyk7XG4gIGlmIChtdGNoICYmIG10Y2hbMV0gJiYgbXRjaFsyXSkge1xuICAgIGNvbnN0IG1haiA9IE51bWJlci5wYXJzZUludChtdGNoWzFdLCAxMCk7XG4gICAgY29uc3QgbWluID0gTnVtYmVyLnBhcnNlSW50KG10Y2hbMl0sIDEwKTtcbiAgICBpZiAobWFqID09PSA4ICYmIG1pbiA8IDE2KSB7XG4gICAgICBmc2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qge1xuICBFVl9BREQsXG4gIEVWX0NIQU5HRSxcbiAgRVZfQUREX0RJUixcbiAgRVZfVU5MSU5LLFxuICBFVl9FUlJPUixcbiAgU1RSX0RBVEEsXG4gIFNUUl9FTkQsXG4gIEZTRVZFTlRfQ1JFQVRFRCxcbiAgRlNFVkVOVF9NT0RJRklFRCxcbiAgRlNFVkVOVF9ERUxFVEVELFxuICBGU0VWRU5UX01PVkVELFxuICAvLyBGU0VWRU5UX0NMT05FRCxcbiAgRlNFVkVOVF9VTktOT1dOLFxuICBGU0VWRU5UX1RZUEVfRklMRSxcbiAgRlNFVkVOVF9UWVBFX0RJUkVDVE9SWSxcbiAgRlNFVkVOVF9UWVBFX1NZTUxJTkssXG5cbiAgUk9PVF9HTE9CU1RBUixcbiAgRElSX1NVRkZJWCxcbiAgRE9UX1NMQVNILFxuICBGVU5DVElPTl9UWVBFLFxuICBFTVBUWV9GTixcbiAgSURFTlRJVFlfRk5cbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBEZXB0aCA9ICh2YWx1ZSkgPT4gaXNOYU4odmFsdWUpID8ge30gOiB7ZGVwdGg6IHZhbHVlfTtcblxuY29uc3Qgc3RhdCA9IHByb21pc2lmeShmcy5zdGF0KTtcbmNvbnN0IGxzdGF0ID0gcHJvbWlzaWZ5KGZzLmxzdGF0KTtcbmNvbnN0IHJlYWxwYXRoID0gcHJvbWlzaWZ5KGZzLnJlYWxwYXRoKTtcblxuY29uc3Qgc3RhdE1ldGhvZHMgPSB7IHN0YXQsIGxzdGF0IH07XG5cbi8qKlxuICogQHR5cGVkZWYge1N0cmluZ30gUGF0aFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRnNFdmVudHNXYXRjaENvbnRhaW5lclxuICogQHByb3BlcnR5IHtTZXQ8RnVuY3Rpb24+fSBsaXN0ZW5lcnNcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJhd0VtaXR0ZXJcbiAqIEBwcm9wZXJ0eSB7e3N0b3A6IEZ1bmN0aW9ufX0gd2F0Y2hlclxuICovXG5cbi8vIGZzZXZlbnRzIGluc3RhbmNlIGhlbHBlciBmdW5jdGlvbnNcbi8qKlxuICogT2JqZWN0IHRvIGhvbGQgcGVyLXByb2Nlc3MgZnNldmVudHMgaW5zdGFuY2VzIChtYXkgYmUgc2hhcmVkIGFjcm9zcyBjaG9raWRhciBGU1dhdGNoZXIgaW5zdGFuY2VzKVxuICogQHR5cGUge01hcDxQYXRoLEZzRXZlbnRzV2F0Y2hDb250YWluZXI+fVxuICovXG5jb25zdCBGU0V2ZW50c1dhdGNoZXJzID0gbmV3IE1hcCgpO1xuXG4vLyBUaHJlc2hvbGQgb2YgZHVwbGljYXRlIHBhdGggcHJlZml4ZXMgYXQgd2hpY2ggdG8gc3RhcnRcbi8vIGNvbnNvbGlkYXRpbmcgZ29pbmcgZm9yd2FyZFxuY29uc3QgY29uc29saWRhdGVUaHJlc2hob2xkID0gMTA7XG5cbmNvbnN0IHdyb25nRXZlbnRGbGFncyA9IG5ldyBTZXQoW1xuICA2OTg4OCwgNzA0MDAsIDcxNDI0LCA3MjcwNCwgNzM0NzIsIDEzMTMyOCwgMTMxODQwLCAyNjI5MTJcbl0pO1xuXG4vKipcbiAqIEluc3RhbnRpYXRlcyB0aGUgZnNldmVudHMgaW50ZXJmYWNlXG4gKiBAcGFyYW0ge1BhdGh9IHBhdGggcGF0aCB0byBiZSB3YXRjaGVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsZWQgd2hlbiBmc2V2ZW50cyBpcyBib3VuZCBhbmQgcmVhZHlcbiAqIEByZXR1cm5zIHt7c3RvcDogRnVuY3Rpb259fSBuZXcgZnNldmVudHMgaW5zdGFuY2VcbiAqL1xuY29uc3QgY3JlYXRlRlNFdmVudHNJbnN0YW5jZSA9IChwYXRoLCBjYWxsYmFjaykgPT4ge1xuICBjb25zdCBzdG9wID0gZnNldmVudHMud2F0Y2gocGF0aCwgY2FsbGJhY2spO1xuICByZXR1cm4ge3N0b3B9O1xufTtcblxuLyoqXG4gKiBJbnN0YW50aWF0ZXMgdGhlIGZzZXZlbnRzIGludGVyZmFjZSBvciBiaW5kcyBsaXN0ZW5lcnMgdG8gYW4gZXhpc3Rpbmcgb25lIGNvdmVyaW5nXG4gKiB0aGUgc2FtZSBmaWxlIHRyZWUuXG4gKiBAcGFyYW0ge1BhdGh9IHBhdGggICAgICAgICAgIC0gdG8gYmUgd2F0Y2hlZFxuICogQHBhcmFtIHtQYXRofSByZWFsUGF0aCAgICAgICAtIHJlYWwgcGF0aCBmb3Igc3ltbGlua3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyICAgLSBjYWxsZWQgd2hlbiBmc2V2ZW50cyBlbWl0cyBldmVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJhd0VtaXR0ZXIgLSBwYXNzZXMgZGF0YSB0byBsaXN0ZW5lcnMgb2YgdGhlICdyYXcnIGV2ZW50XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGNsb3NlclxuICovXG5mdW5jdGlvbiBzZXRGU0V2ZW50c0xpc3RlbmVyKHBhdGgsIHJlYWxQYXRoLCBsaXN0ZW5lciwgcmF3RW1pdHRlcikge1xuICBsZXQgd2F0Y2hQYXRoID0gc3lzUGF0aC5leHRuYW1lKHBhdGgpID8gc3lzUGF0aC5kaXJuYW1lKHBhdGgpIDogcGF0aDtcbiAgY29uc3QgcGFyZW50UGF0aCA9IHN5c1BhdGguZGlybmFtZSh3YXRjaFBhdGgpO1xuICBsZXQgY29udCA9IEZTRXZlbnRzV2F0Y2hlcnMuZ2V0KHdhdGNoUGF0aCk7XG5cbiAgLy8gSWYgd2UndmUgYWNjdW11bGF0ZWQgYSBzdWJzdGFudGlhbCBudW1iZXIgb2YgcGF0aHMgdGhhdFxuICAvLyBjb3VsZCBoYXZlIGJlZW4gY29uc29saWRhdGVkIGJ5IHdhdGNoaW5nIG9uZSBkaXJlY3RvcnlcbiAgLy8gYWJvdmUgdGhlIGN1cnJlbnQgb25lLCBjcmVhdGUgYSB3YXRjaGVyIG9uIHRoZSBwYXJlbnRcbiAgLy8gcGF0aCBpbnN0ZWFkLCBzbyB0aGF0IHdlIGRvIGNvbnNvbGlkYXRlIGdvaW5nIGZvcndhcmQuXG4gIGlmIChjb3VsZENvbnNvbGlkYXRlKHBhcmVudFBhdGgpKSB7XG4gICAgd2F0Y2hQYXRoID0gcGFyZW50UGF0aDtcbiAgfVxuXG4gIGNvbnN0IHJlc29sdmVkUGF0aCA9IHN5c1BhdGgucmVzb2x2ZShwYXRoKTtcbiAgY29uc3QgaGFzU3ltbGluayA9IHJlc29sdmVkUGF0aCAhPT0gcmVhbFBhdGg7XG5cbiAgY29uc3QgZmlsdGVyZWRMaXN0ZW5lciA9IChmdWxsUGF0aCwgZmxhZ3MsIGluZm8pID0+IHtcbiAgICBpZiAoaGFzU3ltbGluaykgZnVsbFBhdGggPSBmdWxsUGF0aC5yZXBsYWNlKHJlYWxQYXRoLCByZXNvbHZlZFBhdGgpO1xuICAgIGlmIChcbiAgICAgIGZ1bGxQYXRoID09PSByZXNvbHZlZFBhdGggfHxcbiAgICAgICFmdWxsUGF0aC5pbmRleE9mKHJlc29sdmVkUGF0aCArIHN5c1BhdGguc2VwKVxuICAgICkgbGlzdGVuZXIoZnVsbFBhdGgsIGZsYWdzLCBpbmZvKTtcbiAgfTtcblxuICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgd2F0Y2hlciBvbiBhIHBhcmVudCBwYXRoXG4gIC8vIG1vZGlmaWVzIGB3YXRjaFBhdGhgIHRvIHRoZSBwYXJlbnQgcGF0aCB3aGVuIGl0IGZpbmRzIGEgbWF0Y2hcbiAgbGV0IHdhdGNoZWRQYXJlbnQgPSBmYWxzZTtcbiAgZm9yIChjb25zdCB3YXRjaGVkUGF0aCBvZiBGU0V2ZW50c1dhdGNoZXJzLmtleXMoKSkge1xuICAgIGlmIChyZWFsUGF0aC5pbmRleE9mKHN5c1BhdGgucmVzb2x2ZSh3YXRjaGVkUGF0aCkgKyBzeXNQYXRoLnNlcCkgPT09IDApIHtcbiAgICAgIHdhdGNoUGF0aCA9IHdhdGNoZWRQYXRoO1xuICAgICAgY29udCA9IEZTRXZlbnRzV2F0Y2hlcnMuZ2V0KHdhdGNoUGF0aCk7XG4gICAgICB3YXRjaGVkUGFyZW50ID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb250IHx8IHdhdGNoZWRQYXJlbnQpIHtcbiAgICBjb250Lmxpc3RlbmVycy5hZGQoZmlsdGVyZWRMaXN0ZW5lcik7XG4gIH0gZWxzZSB7XG4gICAgY29udCA9IHtcbiAgICAgIGxpc3RlbmVyczogbmV3IFNldChbZmlsdGVyZWRMaXN0ZW5lcl0pLFxuICAgICAgcmF3RW1pdHRlcixcbiAgICAgIHdhdGNoZXI6IGNyZWF0ZUZTRXZlbnRzSW5zdGFuY2Uod2F0Y2hQYXRoLCAoZnVsbFBhdGgsIGZsYWdzKSA9PiB7XG4gICAgICAgIGlmICghY29udC5saXN0ZW5lcnMuc2l6ZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBpbmZvID0gZnNldmVudHMuZ2V0SW5mbyhmdWxsUGF0aCwgZmxhZ3MpO1xuICAgICAgICBjb250Lmxpc3RlbmVycy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QoZnVsbFBhdGgsIGZsYWdzLCBpbmZvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udC5yYXdFbWl0dGVyKGluZm8uZXZlbnQsIGZ1bGxQYXRoLCBpbmZvKTtcbiAgICAgIH0pXG4gICAgfTtcbiAgICBGU0V2ZW50c1dhdGNoZXJzLnNldCh3YXRjaFBhdGgsIGNvbnQpO1xuICB9XG5cbiAgLy8gcmVtb3ZlcyB0aGlzIGluc3RhbmNlJ3MgbGlzdGVuZXJzIGFuZCBjbG9zZXMgdGhlIHVuZGVybHlpbmcgZnNldmVudHNcbiAgLy8gaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG1vcmUgbGlzdGVuZXJzIGxlZnRcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBsc3QgPSBjb250Lmxpc3RlbmVycztcblxuICAgIGxzdC5kZWxldGUoZmlsdGVyZWRMaXN0ZW5lcik7XG4gICAgaWYgKCFsc3Quc2l6ZSkge1xuICAgICAgRlNFdmVudHNXYXRjaGVycy5kZWxldGUod2F0Y2hQYXRoKTtcbiAgICAgIGlmIChjb250LndhdGNoZXIpIHJldHVybiBjb250LndhdGNoZXIuc3RvcCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb250LnJhd0VtaXR0ZXIgPSBjb250LndhdGNoZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY29udCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbi8vIERlY2lkZSB3aGV0aGVyIG9yIG5vdCB3ZSBzaG91bGQgc3RhcnQgYSBuZXcgaGlnaGVyLWxldmVsXG4vLyBwYXJlbnQgd2F0Y2hlclxuY29uc3QgY291bGRDb25zb2xpZGF0ZSA9IChwYXRoKSA9PiB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3Qgd2F0Y2hQYXRoIG9mIEZTRXZlbnRzV2F0Y2hlcnMua2V5cygpKSB7XG4gICAgaWYgKHdhdGNoUGF0aC5pbmRleE9mKHBhdGgpID09PSAwKSB7XG4gICAgICBjb3VudCsrO1xuICAgICAgaWYgKGNvdW50ID49IGNvbnNvbGlkYXRlVGhyZXNoaG9sZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyByZXR1cm5zIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIGZzZXZlbnRzIGNhbiBiZSB1c2VkXG5jb25zdCBjYW5Vc2UgPSAoKSA9PiBmc2V2ZW50cyAmJiBGU0V2ZW50c1dhdGNoZXJzLnNpemUgPCAxMjg7XG5cbi8vIGRldGVybWluZXMgc3ViZGlyZWN0b3J5IHRyYXZlcnNhbCBsZXZlbHMgZnJvbSByb290IHRvIHBhdGhcbmNvbnN0IGNhbGNEZXB0aCA9IChwYXRoLCByb290KSA9PiB7XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKCFwYXRoLmluZGV4T2Yocm9vdCkgJiYgKHBhdGggPSBzeXNQYXRoLmRpcm5hbWUocGF0aCkpICE9PSByb290KSBpKys7XG4gIHJldHVybiBpO1xufTtcblxuLy8gcmV0dXJucyBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZnNldmVudHMnIGV2ZW50IGluZm8gaGFzIHRoZSBzYW1lIHR5cGVcbi8vIGFzIHRoZSBvbmUgcmV0dXJuZWQgYnkgZnMuc3RhdFxuY29uc3Qgc2FtZVR5cGVzID0gKGluZm8sIHN0YXRzKSA9PiAoXG4gIGluZm8udHlwZSA9PT0gRlNFVkVOVF9UWVBFX0RJUkVDVE9SWSAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpIHx8XG4gIGluZm8udHlwZSA9PT0gRlNFVkVOVF9UWVBFX1NZTUxJTksgJiYgc3RhdHMuaXNTeW1ib2xpY0xpbmsoKSB8fFxuICBpbmZvLnR5cGUgPT09IEZTRVZFTlRfVFlQRV9GSUxFICYmIHN0YXRzLmlzRmlsZSgpXG4pXG5cbi8qKlxuICogQG1peGluXG4gKi9cbmNsYXNzIEZzRXZlbnRzSGFuZGxlciB7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuRlNXYXRjaGVyfSBmc3dcbiAqL1xuY29uc3RydWN0b3IoZnN3KSB7XG4gIHRoaXMuZnN3ID0gZnN3O1xufVxuY2hlY2tJZ25vcmVkKHBhdGgsIHN0YXRzKSB7XG4gIGNvbnN0IGlwYXRocyA9IHRoaXMuZnN3Ll9pZ25vcmVkUGF0aHM7XG4gIGlmICh0aGlzLmZzdy5faXNJZ25vcmVkKHBhdGgsIHN0YXRzKSkge1xuICAgIGlwYXRocy5hZGQocGF0aCk7XG4gICAgaWYgKHN0YXRzICYmIHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIGlwYXRocy5hZGQocGF0aCArIFJPT1RfR0xPQlNUQVIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlwYXRocy5kZWxldGUocGF0aCk7XG4gIGlwYXRocy5kZWxldGUocGF0aCArIFJPT1RfR0xPQlNUQVIpO1xufVxuXG5hZGRPckNoYW5nZShwYXRoLCBmdWxsUGF0aCwgcmVhbFBhdGgsIHBhcmVudCwgd2F0Y2hlZERpciwgaXRlbSwgaW5mbywgb3B0cykge1xuICBjb25zdCBldmVudCA9IHdhdGNoZWREaXIuaGFzKGl0ZW0pID8gRVZfQ0hBTkdFIDogRVZfQUREO1xuICB0aGlzLmhhbmRsZUV2ZW50KGV2ZW50LCBwYXRoLCBmdWxsUGF0aCwgcmVhbFBhdGgsIHBhcmVudCwgd2F0Y2hlZERpciwgaXRlbSwgaW5mbywgb3B0cyk7XG59XG5cbmFzeW5jIGNoZWNrRXhpc3RzKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RhdHMgPSBhd2FpdCBzdGF0KHBhdGgpXG4gICAgaWYgKHRoaXMuZnN3LmNsb3NlZCkgcmV0dXJuO1xuICAgIGlmIChzYW1lVHlwZXMoaW5mbywgc3RhdHMpKSB7XG4gICAgICB0aGlzLmFkZE9yQ2hhbmdlKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVFdmVudChFVl9VTkxJTkssIHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQUNDRVMnKSB7XG4gICAgICB0aGlzLmFkZE9yQ2hhbmdlKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVFdmVudChFVl9VTkxJTkssIHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICB9XG4gIH1cbn1cblxuaGFuZGxlRXZlbnQoZXZlbnQsIHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKSB7XG4gIGlmICh0aGlzLmZzdy5jbG9zZWQgfHwgdGhpcy5jaGVja0lnbm9yZWQocGF0aCkpIHJldHVybjtcblxuICBpZiAoZXZlbnQgPT09IEVWX1VOTElOSykge1xuICAgIGNvbnN0IGlzRGlyZWN0b3J5ID0gaW5mby50eXBlID09PSBGU0VWRU5UX1RZUEVfRElSRUNUT1JZXG4gICAgLy8gc3VwcHJlc3MgdW5saW5rIGV2ZW50cyBvbiBuZXZlciBiZWZvcmUgc2VlbiBmaWxlc1xuICAgIGlmIChpc0RpcmVjdG9yeSB8fCB3YXRjaGVkRGlyLmhhcyhpdGVtKSkge1xuICAgICAgdGhpcy5mc3cuX3JlbW92ZShwYXJlbnQsIGl0ZW0sIGlzRGlyZWN0b3J5KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGV2ZW50ID09PSBFVl9BREQpIHtcbiAgICAgIC8vIHRyYWNrIG5ldyBkaXJlY3Rvcmllc1xuICAgICAgaWYgKGluZm8udHlwZSA9PT0gRlNFVkVOVF9UWVBFX0RJUkVDVE9SWSkgdGhpcy5mc3cuX2dldFdhdGNoZWREaXIocGF0aCk7XG5cbiAgICAgIGlmIChpbmZvLnR5cGUgPT09IEZTRVZFTlRfVFlQRV9TWU1MSU5LICYmIG9wdHMuZm9sbG93U3ltbGlua3MpIHtcbiAgICAgICAgLy8gcHVzaCBzeW1saW5rcyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHN0YWNrIHRvIGdldCBoYW5kbGVkXG4gICAgICAgIGNvbnN0IGN1ckRlcHRoID0gb3B0cy5kZXB0aCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICB1bmRlZmluZWQgOiBjYWxjRGVwdGgoZnVsbFBhdGgsIHJlYWxQYXRoKSArIDE7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRUb0ZzRXZlbnRzKHBhdGgsIGZhbHNlLCB0cnVlLCBjdXJEZXB0aCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRyYWNrIG5ldyBwYXRoc1xuICAgICAgLy8gKG90aGVyIHRoYW4gc3ltbGlua3MgYmVpbmcgZm9sbG93ZWQsIHdoaWNoIHdpbGwgYmUgdHJhY2tlZCBzb29uKVxuICAgICAgdGhpcy5mc3cuX2dldFdhdGNoZWREaXIocGFyZW50KS5hZGQoaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEB0eXBlIHsnYWRkJ3wnYWRkRGlyJ3wndW5saW5rJ3wndW5saW5rRGlyJ31cbiAgICAgKi9cbiAgICBjb25zdCBldmVudE5hbWUgPSBpbmZvLnR5cGUgPT09IEZTRVZFTlRfVFlQRV9ESVJFQ1RPUlkgPyBldmVudCArIERJUl9TVUZGSVggOiBldmVudDtcbiAgICB0aGlzLmZzdy5fZW1pdChldmVudE5hbWUsIHBhdGgpO1xuICAgIGlmIChldmVudE5hbWUgPT09IEVWX0FERF9ESVIpIHRoaXMuX2FkZFRvRnNFdmVudHMocGF0aCwgZmFsc2UsIHRydWUpO1xuICB9XG59XG5cbi8qKlxuICogSGFuZGxlIHN5bWxpbmtzIGVuY291bnRlcmVkIGR1cmluZyBkaXJlY3Rvcnkgc2NhblxuICogQHBhcmFtIHtTdHJpbmd9IHdhdGNoUGF0aCAgLSBmaWxlL2RpciBwYXRoIHRvIGJlIHdhdGNoZWQgd2l0aCBmc2V2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IHJlYWxQYXRoICAgLSByZWFsIHBhdGggKGluIGNhc2Ugb2Ygc3ltbGlua3MpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gIC0gcGF0aCB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2xvYkZpbHRlciAtIHBhdGggZmlsdGVyIGluIGNhc2UgYSBnbG9iIHBhdHRlcm4gd2FzIHByb3ZpZGVkXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGNsb3NlciBmb3IgdGhlIHdhdGNoZXIgaW5zdGFuY2VcbiovXG5fd2F0Y2hXaXRoRnNFdmVudHMod2F0Y2hQYXRoLCByZWFsUGF0aCwgdHJhbnNmb3JtLCBnbG9iRmlsdGVyKSB7XG4gIGlmICh0aGlzLmZzdy5jbG9zZWQgfHwgdGhpcy5mc3cuX2lzSWdub3JlZCh3YXRjaFBhdGgpKSByZXR1cm47XG4gIGNvbnN0IG9wdHMgPSB0aGlzLmZzdy5vcHRpb25zO1xuICBjb25zdCB3YXRjaENhbGxiYWNrID0gYXN5bmMgKGZ1bGxQYXRoLCBmbGFncywgaW5mbykgPT4ge1xuICAgIGlmICh0aGlzLmZzdy5jbG9zZWQpIHJldHVybjtcbiAgICBpZiAoXG4gICAgICBvcHRzLmRlcHRoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGNhbGNEZXB0aChmdWxsUGF0aCwgcmVhbFBhdGgpID4gb3B0cy5kZXB0aFxuICAgICkgcmV0dXJuO1xuICAgIGNvbnN0IHBhdGggPSB0cmFuc2Zvcm0oc3lzUGF0aC5qb2luKFxuICAgICAgd2F0Y2hQYXRoLCBzeXNQYXRoLnJlbGF0aXZlKHdhdGNoUGF0aCwgZnVsbFBhdGgpXG4gICAgKSk7XG4gICAgaWYgKGdsb2JGaWx0ZXIgJiYgIWdsb2JGaWx0ZXIocGF0aCkpIHJldHVybjtcbiAgICAvLyBlbnN1cmUgZGlyZWN0b3JpZXMgYXJlIHRyYWNrZWRcbiAgICBjb25zdCBwYXJlbnQgPSBzeXNQYXRoLmRpcm5hbWUocGF0aCk7XG4gICAgY29uc3QgaXRlbSA9IHN5c1BhdGguYmFzZW5hbWUocGF0aCk7XG4gICAgY29uc3Qgd2F0Y2hlZERpciA9IHRoaXMuZnN3Ll9nZXRXYXRjaGVkRGlyKFxuICAgICAgaW5mby50eXBlID09PSBGU0VWRU5UX1RZUEVfRElSRUNUT1JZID8gcGF0aCA6IHBhcmVudFxuICAgICk7XG5cbiAgICAvLyBjb3JyZWN0IGZvciB3cm9uZyBldmVudHMgZW1pdHRlZFxuICAgIGlmICh3cm9uZ0V2ZW50RmxhZ3MuaGFzKGZsYWdzKSB8fCBpbmZvLmV2ZW50ID09PSBGU0VWRU5UX1VOS05PV04pIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5pZ25vcmVkID09PSBGVU5DVElPTl9UWVBFKSB7XG4gICAgICAgIGxldCBzdGF0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdGF0cyA9IGF3YWl0IHN0YXQocGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSWdub3JlZChwYXRoLCBzdGF0cykpIHJldHVybjtcbiAgICAgICAgaWYgKHNhbWVUeXBlcyhpbmZvLCBzdGF0cykpIHtcbiAgICAgICAgICB0aGlzLmFkZE9yQ2hhbmdlKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50KEVWX1VOTElOSywgcGF0aCwgZnVsbFBhdGgsIHJlYWxQYXRoLCBwYXJlbnQsIHdhdGNoZWREaXIsIGl0ZW0sIGluZm8sIG9wdHMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrRXhpc3RzKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChpbmZvLmV2ZW50KSB7XG4gICAgICBjYXNlIEZTRVZFTlRfQ1JFQVRFRDpcbiAgICAgIGNhc2UgRlNFVkVOVF9NT0RJRklFRDpcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkT3JDaGFuZ2UocGF0aCwgZnVsbFBhdGgsIHJlYWxQYXRoLCBwYXJlbnQsIHdhdGNoZWREaXIsIGl0ZW0sIGluZm8sIG9wdHMpO1xuICAgICAgY2FzZSBGU0VWRU5UX0RFTEVURUQ6XG4gICAgICBjYXNlIEZTRVZFTlRfTU9WRUQ6XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRXhpc3RzKHBhdGgsIGZ1bGxQYXRoLCByZWFsUGF0aCwgcGFyZW50LCB3YXRjaGVkRGlyLCBpdGVtLCBpbmZvLCBvcHRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2xvc2VyID0gc2V0RlNFdmVudHNMaXN0ZW5lcihcbiAgICB3YXRjaFBhdGgsXG4gICAgcmVhbFBhdGgsXG4gICAgd2F0Y2hDYWxsYmFjayxcbiAgICB0aGlzLmZzdy5fZW1pdFJhd1xuICApO1xuXG4gIHRoaXMuZnN3Ll9lbWl0UmVhZHkoKTtcbiAgcmV0dXJuIGNsb3Nlcjtcbn1cblxuLyoqXG4gKiBIYW5kbGUgc3ltbGlua3MgZW5jb3VudGVyZWQgZHVyaW5nIGRpcmVjdG9yeSBzY2FuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGlua1BhdGggcGF0aCB0byBzeW1saW5rXG4gKiBAcGFyYW0ge1N0cmluZ30gZnVsbFBhdGggYWJzb2x1dGUgcGF0aCB0byB0aGUgc3ltbGlua1xuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIHByZS1leGlzdGluZyBwYXRoIHRyYW5zZm9ybWVyXG4gKiBAcGFyYW0ge051bWJlcn0gY3VyRGVwdGggbGV2ZWwgb2Ygc3ViZGlyZWN0b3JpZXMgdHJhdmVyc2VkIHRvIHdoZXJlIHN5bWxpbmsgaXNcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5hc3luYyBfaGFuZGxlRnNFdmVudHNTeW1saW5rKGxpbmtQYXRoLCBmdWxsUGF0aCwgdHJhbnNmb3JtLCBjdXJEZXB0aCkge1xuICAvLyBkb24ndCBmb2xsb3cgdGhlIHNhbWUgc3ltbGluayBtb3JlIHRoYW4gb25jZVxuICBpZiAodGhpcy5mc3cuY2xvc2VkIHx8IHRoaXMuZnN3Ll9zeW1saW5rUGF0aHMuaGFzKGZ1bGxQYXRoKSkgcmV0dXJuO1xuXG4gIHRoaXMuZnN3Ll9zeW1saW5rUGF0aHMuc2V0KGZ1bGxQYXRoLCB0cnVlKTtcbiAgdGhpcy5mc3cuX2luY3JSZWFkeUNvdW50KCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBsaW5rVGFyZ2V0ID0gYXdhaXQgcmVhbHBhdGgobGlua1BhdGgpO1xuICAgIGlmICh0aGlzLmZzdy5jbG9zZWQpIHJldHVybjtcbiAgICBpZiAodGhpcy5mc3cuX2lzSWdub3JlZChsaW5rVGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZnN3Ll9lbWl0UmVhZHkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmZzdy5faW5jclJlYWR5Q291bnQoKTtcblxuICAgIC8vIGFkZCB0aGUgbGlua1RhcmdldCBmb3Igd2F0Y2hpbmcgd2l0aCBhIHdyYXBwZXIgZm9yIHRyYW5zZm9ybVxuICAgIC8vIHRoYXQgY2F1c2VzIGVtaXR0ZWQgcGF0aHMgdG8gaW5jb3Jwb3JhdGUgdGhlIGxpbmsncyBwYXRoXG4gICAgdGhpcy5fYWRkVG9Gc0V2ZW50cyhsaW5rVGFyZ2V0IHx8IGxpbmtQYXRoLCAocGF0aCkgPT4ge1xuICAgICAgbGV0IGFsaWFzZWRQYXRoID0gbGlua1BhdGg7XG4gICAgICBpZiAobGlua1RhcmdldCAmJiBsaW5rVGFyZ2V0ICE9PSBET1RfU0xBU0gpIHtcbiAgICAgICAgYWxpYXNlZFBhdGggPSBwYXRoLnJlcGxhY2UobGlua1RhcmdldCwgbGlua1BhdGgpO1xuICAgICAgfSBlbHNlIGlmIChwYXRoICE9PSBET1RfU0xBU0gpIHtcbiAgICAgICAgYWxpYXNlZFBhdGggPSBzeXNQYXRoLmpvaW4obGlua1BhdGgsIHBhdGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRyYW5zZm9ybShhbGlhc2VkUGF0aCk7XG4gICAgfSwgZmFsc2UsIGN1ckRlcHRoKTtcbiAgfSBjYXRjaChlcnJvcikge1xuICAgIGlmICh0aGlzLmZzdy5faGFuZGxlRXJyb3IoZXJyb3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mc3cuX2VtaXRSZWFkeSgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1BhdGh9IG5ld1BhdGhcbiAqIEBwYXJhbSB7ZnMuU3RhdHN9IHN0YXRzXG4gKi9cbmVtaXRBZGQobmV3UGF0aCwgc3RhdHMsIHByb2Nlc3NQYXRoLCBvcHRzLCBmb3JjZUFkZCkge1xuICBjb25zdCBwcCA9IHByb2Nlc3NQYXRoKG5ld1BhdGgpO1xuICBjb25zdCBpc0RpciA9IHN0YXRzLmlzRGlyZWN0b3J5KCk7XG4gIGNvbnN0IGRpck9iaiA9IHRoaXMuZnN3Ll9nZXRXYXRjaGVkRGlyKHN5c1BhdGguZGlybmFtZShwcCkpO1xuICBjb25zdCBiYXNlID0gc3lzUGF0aC5iYXNlbmFtZShwcCk7XG5cbiAgLy8gZW5zdXJlIGVtcHR5IGRpcnMgZ2V0IHRyYWNrZWRcbiAgaWYgKGlzRGlyKSB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihwcCk7XG4gIGlmIChkaXJPYmouaGFzKGJhc2UpKSByZXR1cm47XG4gIGRpck9iai5hZGQoYmFzZSk7XG5cbiAgaWYgKCFvcHRzLmlnbm9yZUluaXRpYWwgfHwgZm9yY2VBZGQgPT09IHRydWUpIHtcbiAgICB0aGlzLmZzdy5fZW1pdChpc0RpciA/IEVWX0FERF9ESVIgOiBFVl9BREQsIHBwLCBzdGF0cyk7XG4gIH1cbn1cblxuaW5pdFdhdGNoKHJlYWxQYXRoLCBwYXRoLCB3aCwgcHJvY2Vzc1BhdGgpIHtcbiAgaWYgKHRoaXMuZnN3LmNsb3NlZCkgcmV0dXJuO1xuICBjb25zdCBjbG9zZXIgPSB0aGlzLl93YXRjaFdpdGhGc0V2ZW50cyhcbiAgICB3aC53YXRjaFBhdGgsXG4gICAgc3lzUGF0aC5yZXNvbHZlKHJlYWxQYXRoIHx8IHdoLndhdGNoUGF0aCksXG4gICAgcHJvY2Vzc1BhdGgsXG4gICAgd2guZ2xvYkZpbHRlclxuICApO1xuICB0aGlzLmZzdy5fYWRkUGF0aENsb3NlcihwYXRoLCBjbG9zZXIpO1xufVxuXG4vKipcbiAqIEhhbmRsZSBhZGRlZCBwYXRoIHdpdGggZnNldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIGZpbGUvZGlyIHBhdGggb3IgZ2xvYiBwYXR0ZXJuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW49fSB0cmFuc2Zvcm0gY29udmVydHMgd29ya2luZyBwYXRoIHRvIHdoYXQgdGhlIHVzZXIgZXhwZWN0c1xuICogQHBhcmFtIHtCb29sZWFuPX0gZm9yY2VBZGQgZW5zdXJlIGFkZCBpcyBlbWl0dGVkXG4gKiBAcGFyYW0ge051bWJlcj19IHByaW9yRGVwdGggTGV2ZWwgb2Ygc3ViZGlyZWN0b3JpZXMgYWxyZWFkeSB0cmF2ZXJzZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuYXN5bmMgX2FkZFRvRnNFdmVudHMocGF0aCwgdHJhbnNmb3JtLCBmb3JjZUFkZCwgcHJpb3JEZXB0aCkge1xuICBpZiAodGhpcy5mc3cuY2xvc2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG9wdHMgPSB0aGlzLmZzdy5vcHRpb25zO1xuICBjb25zdCBwcm9jZXNzUGF0aCA9IHR5cGVvZiB0cmFuc2Zvcm0gPT09IEZVTkNUSU9OX1RZUEUgPyB0cmFuc2Zvcm0gOiBJREVOVElUWV9GTjtcblxuICBjb25zdCB3aCA9IHRoaXMuZnN3Ll9nZXRXYXRjaEhlbHBlcnMocGF0aCk7XG5cbiAgLy8gZXZhbHVhdGUgd2hhdCBpcyBhdCB0aGUgcGF0aCB3ZSdyZSBiZWluZyBhc2tlZCB0byB3YXRjaFxuICB0cnkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgc3RhdE1ldGhvZHNbd2guc3RhdE1ldGhvZF0od2gud2F0Y2hQYXRoKTtcbiAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZnN3Ll9pc0lnbm9yZWQod2gud2F0Y2hQYXRoLCBzdGF0cykpIHtcbiAgICAgIHRocm93IG51bGw7XG4gICAgfVxuICAgIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAvLyBlbWl0IGFkZERpciB1bmxlc3MgdGhpcyBpcyBhIGdsb2IgcGFyZW50XG4gICAgICBpZiAoIXdoLmdsb2JGaWx0ZXIpIHRoaXMuZW1pdEFkZChwcm9jZXNzUGF0aChwYXRoKSwgc3RhdHMsIHByb2Nlc3NQYXRoLCBvcHRzLCBmb3JjZUFkZCk7XG5cbiAgICAgIC8vIGRvbid0IHJlY3Vyc2UgZnVydGhlciBpZiBpdCB3b3VsZCBleGNlZWQgZGVwdGggc2V0dGluZ1xuICAgICAgaWYgKHByaW9yRGVwdGggJiYgcHJpb3JEZXB0aCA+IG9wdHMuZGVwdGgpIHJldHVybjtcblxuICAgICAgLy8gc2NhbiB0aGUgY29udGVudHMgb2YgdGhlIGRpclxuICAgICAgdGhpcy5mc3cuX3JlYWRkaXJwKHdoLndhdGNoUGF0aCwge1xuICAgICAgICBmaWxlRmlsdGVyOiBlbnRyeSA9PiB3aC5maWx0ZXJQYXRoKGVudHJ5KSxcbiAgICAgICAgZGlyZWN0b3J5RmlsdGVyOiBlbnRyeSA9PiB3aC5maWx0ZXJEaXIoZW50cnkpLFxuICAgICAgICAuLi5EZXB0aChvcHRzLmRlcHRoIC0gKHByaW9yRGVwdGggfHwgMCkpXG4gICAgICB9KS5vbihTVFJfREFUQSwgKGVudHJ5KSA9PiB7XG4gICAgICAgIC8vIG5lZWQgdG8gY2hlY2sgZmlsdGVyUGF0aCBvbiBkaXJzIGIvYyBmaWx0ZXJEaXIgaXMgbGVzcyByZXN0cmljdGl2ZVxuICAgICAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeS5zdGF0cy5pc0RpcmVjdG9yeSgpICYmICF3aC5maWx0ZXJQYXRoKGVudHJ5KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGpvaW5lZFBhdGggPSBzeXNQYXRoLmpvaW4od2gud2F0Y2hQYXRoLCBlbnRyeS5wYXRoKTtcbiAgICAgICAgY29uc3Qge2Z1bGxQYXRofSA9IGVudHJ5O1xuXG4gICAgICAgIGlmICh3aC5mb2xsb3dTeW1saW5rcyAmJiBlbnRyeS5zdGF0cy5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAgICAgLy8gcHJlc2VydmUgdGhlIGN1cnJlbnQgZGVwdGggaGVyZSBzaW5jZSBpdCBjYW4ndCBiZSBkZXJpdmVkIGZyb21cbiAgICAgICAgICAvLyByZWFsIHBhdGhzIHBhc3QgdGhlIHN5bWxpbmtcbiAgICAgICAgICBjb25zdCBjdXJEZXB0aCA9IG9wdHMuZGVwdGggPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOiBjYWxjRGVwdGgoam9pbmVkUGF0aCwgc3lzUGF0aC5yZXNvbHZlKHdoLndhdGNoUGF0aCkpICsgMTtcblxuICAgICAgICAgIHRoaXMuX2hhbmRsZUZzRXZlbnRzU3ltbGluayhqb2luZWRQYXRoLCBmdWxsUGF0aCwgcHJvY2Vzc1BhdGgsIGN1ckRlcHRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVtaXRBZGQoam9pbmVkUGF0aCwgZW50cnkuc3RhdHMsIHByb2Nlc3NQYXRoLCBvcHRzLCBmb3JjZUFkZCk7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKEVWX0VSUk9SLCBFTVBUWV9GTikub24oU1RSX0VORCwgKCkgPT4ge1xuICAgICAgICB0aGlzLmZzdy5fZW1pdFJlYWR5KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0QWRkKHdoLndhdGNoUGF0aCwgc3RhdHMsIHByb2Nlc3NQYXRoLCBvcHRzLCBmb3JjZUFkZCk7XG4gICAgICB0aGlzLmZzdy5fZW1pdFJlYWR5KCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghZXJyb3IgfHwgdGhpcy5mc3cuX2hhbmRsZUVycm9yKGVycm9yKSkge1xuICAgICAgLy8gVE9ETzogU3RyYW5nZSB0aGluZzogXCJzaG91bGQgbm90IGNob2tlIG9uIGFuIGlnbm9yZWQgd2F0Y2ggcGF0aFwiIHdpbGwgYmUgZmFpbGVkIHdpdGhvdXQgMiByZWFkeSBjYWxscyAtX18tXG4gICAgICB0aGlzLmZzdy5fZW1pdFJlYWR5KCk7XG4gICAgICB0aGlzLmZzdy5fZW1pdFJlYWR5KCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMucGVyc2lzdGVudCAmJiBmb3JjZUFkZCAhPT0gdHJ1ZSkge1xuICAgIGlmICh0eXBlb2YgdHJhbnNmb3JtID09PSBGVU5DVElPTl9UWVBFKSB7XG4gICAgICAvLyByZWFscGF0aCBoYXMgYWxyZWFkeSBiZWVuIHJlc29sdmVkXG4gICAgICB0aGlzLmluaXRXYXRjaCh1bmRlZmluZWQsIHBhdGgsIHdoLCBwcm9jZXNzUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZWFsUGF0aDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxQYXRoID0gYXdhaXQgcmVhbHBhdGgod2gud2F0Y2hQYXRoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB0aGlzLmluaXRXYXRjaChyZWFsUGF0aCwgcGF0aCwgd2gsIHByb2Nlc3NQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZzRXZlbnRzSGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzLmNhblVzZSA9IGNhblVzZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3Qgc3lzUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgcHJvbWlzaWZ5IH0gPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBpc0JpbmFyeVBhdGggPSByZXF1aXJlKCdpcy1iaW5hcnktcGF0aCcpO1xuY29uc3Qge1xuICBpc1dpbmRvd3MsXG4gIGlzTGludXgsXG4gIEVNUFRZX0ZOLFxuICBFTVBUWV9TVFIsXG4gIEtFWV9MSVNURU5FUlMsXG4gIEtFWV9FUlIsXG4gIEtFWV9SQVcsXG4gIEhBTkRMRVJfS0VZUyxcbiAgRVZfQ0hBTkdFLFxuICBFVl9BREQsXG4gIEVWX0FERF9ESVIsXG4gIEVWX0VSUk9SLFxuICBTVFJfREFUQSxcbiAgU1RSX0VORCxcbiAgQlJBQ0VfU1RBUlQsXG4gIFNUQVJcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBUSFJPVFRMRV9NT0RFX1dBVENIID0gJ3dhdGNoJztcblxuY29uc3Qgb3BlbiA9IHByb21pc2lmeShmcy5vcGVuKTtcbmNvbnN0IHN0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XG5jb25zdCBsc3RhdCA9IHByb21pc2lmeShmcy5sc3RhdCk7XG5jb25zdCBjbG9zZSA9IHByb21pc2lmeShmcy5jbG9zZSk7XG5jb25zdCBmc3JlYWxwYXRoID0gcHJvbWlzaWZ5KGZzLnJlYWxwYXRoKTtcblxuY29uc3Qgc3RhdE1ldGhvZHMgPSB7IGxzdGF0LCBzdGF0IH07XG5cbi8vIFRPRE86IGVtaXQgZXJyb3JzIHByb3Blcmx5LiBFeGFtcGxlOiBFTUZJTEUgb24gTWFjb3MuXG5jb25zdCBmb3JlYWNoID0gKHZhbCwgZm4pID0+IHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIFNldCkge1xuICAgIHZhbC5mb3JFYWNoKGZuKTtcbiAgfSBlbHNlIHtcbiAgICBmbih2YWwpO1xuICB9XG59O1xuXG5jb25zdCBhZGRBbmRDb252ZXJ0ID0gKG1haW4sIHByb3AsIGl0ZW0pID0+IHtcbiAgbGV0IGNvbnRhaW5lciA9IG1haW5bcHJvcF07XG4gIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIFNldCkpIHtcbiAgICBtYWluW3Byb3BdID0gY29udGFpbmVyID0gbmV3IFNldChbY29udGFpbmVyXSk7XG4gIH1cbiAgY29udGFpbmVyLmFkZChpdGVtKTtcbn07XG5cbmNvbnN0IGNsZWFySXRlbSA9IGNvbnQgPT4ga2V5ID0+IHtcbiAgY29uc3Qgc2V0ID0gY29udFtrZXldO1xuICBpZiAoc2V0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgc2V0LmNsZWFyKCk7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGNvbnRba2V5XTtcbiAgfVxufTtcblxuY29uc3QgZGVsRnJvbVNldCA9IChtYWluLCBwcm9wLCBpdGVtKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IG1haW5bcHJvcF07XG4gIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICBjb250YWluZXIuZGVsZXRlKGl0ZW0pO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5lciA9PT0gaXRlbSkge1xuICAgIGRlbGV0ZSBtYWluW3Byb3BdO1xuICB9XG59O1xuXG5jb25zdCBpc0VtcHR5U2V0ID0gKHZhbCkgPT4gdmFsIGluc3RhbmNlb2YgU2V0ID8gdmFsLnNpemUgPT09IDAgOiAhdmFsO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtTdHJpbmd9IFBhdGhcbiAqL1xuXG4vLyBmc193YXRjaCBoZWxwZXJzXG5cbi8vIG9iamVjdCB0byBob2xkIHBlci1wcm9jZXNzIGZzX3dhdGNoIGluc3RhbmNlc1xuLy8gKG1heSBiZSBzaGFyZWQgYWNyb3NzIGNob2tpZGFyIEZTV2F0Y2hlciBpbnN0YW5jZXMpXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRnNXYXRjaENvbnRhaW5lclxuICogQHByb3BlcnR5IHtTZXR9IGxpc3RlbmVyc1xuICogQHByb3BlcnR5IHtTZXR9IGVyckhhbmRsZXJzXG4gKiBAcHJvcGVydHkge1NldH0gcmF3RW1pdHRlcnNcbiAqIEBwcm9wZXJ0eSB7ZnMuRlNXYXRjaGVyPX0gd2F0Y2hlclxuICogQHByb3BlcnR5IHtCb29sZWFuPX0gd2F0Y2hlclVudXNhYmxlXG4gKi9cblxuLyoqXG4gKiBAdHlwZSB7TWFwPFN0cmluZyxGc1dhdGNoQ29udGFpbmVyPn1cbiAqL1xuY29uc3QgRnNXYXRjaEluc3RhbmNlcyA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBJbnN0YW50aWF0ZXMgdGhlIGZzX3dhdGNoIGludGVyZmFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdG8gYmUgd2F0Y2hlZFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIGZzX3dhdGNoXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBtYWluIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVyckhhbmRsZXIgZW1pdHMgaW5mbyBhYm91dCBlcnJvcnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVtaXRSYXcgZW1pdHMgcmF3IGV2ZW50IGRhdGFcbiAqIEByZXR1cm5zIHtmcy5GU1dhdGNoZXJ9IG5ldyBmc2V2ZW50cyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBjcmVhdGVGc1dhdGNoSW5zdGFuY2UocGF0aCwgb3B0aW9ucywgbGlzdGVuZXIsIGVyckhhbmRsZXIsIGVtaXRSYXcpIHtcbiAgY29uc3QgaGFuZGxlRXZlbnQgPSAocmF3RXZlbnQsIGV2UGF0aCkgPT4ge1xuICAgIGxpc3RlbmVyKHBhdGgpO1xuICAgIGVtaXRSYXcocmF3RXZlbnQsIGV2UGF0aCwge3dhdGNoZWRQYXRoOiBwYXRofSk7XG5cbiAgICAvLyBlbWl0IGJhc2VkIG9uIGV2ZW50cyBvY2N1cnJpbmcgZm9yIGZpbGVzIGZyb20gYSBkaXJlY3RvcnkncyB3YXRjaGVyIGluXG4gICAgLy8gY2FzZSB0aGUgZmlsZSdzIHdhdGNoZXIgbWlzc2VzIGl0IChhbmQgcmVseSBvbiB0aHJvdHRsaW5nIHRvIGRlLWR1cGUpXG4gICAgaWYgKGV2UGF0aCAmJiBwYXRoICE9PSBldlBhdGgpIHtcbiAgICAgIGZzV2F0Y2hCcm9hZGNhc3QoXG4gICAgICAgIHN5c1BhdGgucmVzb2x2ZShwYXRoLCBldlBhdGgpLCBLRVlfTElTVEVORVJTLCBzeXNQYXRoLmpvaW4ocGF0aCwgZXZQYXRoKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLndhdGNoKHBhdGgsIG9wdGlvbnMsIGhhbmRsZUV2ZW50KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlcnJIYW5kbGVyKGVycm9yKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgcGFzc2luZyBmc193YXRjaCBldmVudCBkYXRhIHRvIGEgY29sbGVjdGlvbiBvZiBsaXN0ZW5lcnNcbiAqIEBwYXJhbSB7UGF0aH0gZnVsbFBhdGggYWJzb2x1dGUgcGF0aCBib3VuZCB0byBmc193YXRjaCBpbnN0YW5jZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgbGlzdGVuZXIgdHlwZVxuICogQHBhcmFtIHsqPX0gdmFsMSBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGxpc3RlbmVyc1xuICogQHBhcmFtIHsqPX0gdmFsMlxuICogQHBhcmFtIHsqPX0gdmFsM1xuICovXG5jb25zdCBmc1dhdGNoQnJvYWRjYXN0ID0gKGZ1bGxQYXRoLCB0eXBlLCB2YWwxLCB2YWwyLCB2YWwzKSA9PiB7XG4gIGNvbnN0IGNvbnQgPSBGc1dhdGNoSW5zdGFuY2VzLmdldChmdWxsUGF0aCk7XG4gIGlmICghY29udCkgcmV0dXJuO1xuICBmb3JlYWNoKGNvbnRbdHlwZV0sIChsaXN0ZW5lcikgPT4ge1xuICAgIGxpc3RlbmVyKHZhbDEsIHZhbDIsIHZhbDMpO1xuICB9KTtcbn07XG5cbi8qKlxuICogSW5zdGFudGlhdGVzIHRoZSBmc193YXRjaCBpbnRlcmZhY2Ugb3IgYmluZHMgbGlzdGVuZXJzXG4gKiB0byBhbiBleGlzdGluZyBvbmUgY292ZXJpbmcgdGhlIHNhbWUgZmlsZSBzeXN0ZW0gZW50cnlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge1N0cmluZ30gZnVsbFBhdGggYWJzb2x1dGUgcGF0aFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIGZzX3dhdGNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlcnMgY29udGFpbmVyIGZvciBldmVudCBsaXN0ZW5lciBmdW5jdGlvbnNcbiAqL1xuY29uc3Qgc2V0RnNXYXRjaExpc3RlbmVyID0gKHBhdGgsIGZ1bGxQYXRoLCBvcHRpb25zLCBoYW5kbGVycykgPT4ge1xuICBjb25zdCB7bGlzdGVuZXIsIGVyckhhbmRsZXIsIHJhd0VtaXR0ZXJ9ID0gaGFuZGxlcnM7XG4gIGxldCBjb250ID0gRnNXYXRjaEluc3RhbmNlcy5nZXQoZnVsbFBhdGgpO1xuXG4gIC8qKiBAdHlwZSB7ZnMuRlNXYXRjaGVyPX0gKi9cbiAgbGV0IHdhdGNoZXI7XG4gIGlmICghb3B0aW9ucy5wZXJzaXN0ZW50KSB7XG4gICAgd2F0Y2hlciA9IGNyZWF0ZUZzV2F0Y2hJbnN0YW5jZShcbiAgICAgIHBhdGgsIG9wdGlvbnMsIGxpc3RlbmVyLCBlcnJIYW5kbGVyLCByYXdFbWl0dGVyXG4gICAgKTtcbiAgICByZXR1cm4gd2F0Y2hlci5jbG9zZS5iaW5kKHdhdGNoZXIpO1xuICB9XG4gIGlmIChjb250KSB7XG4gICAgYWRkQW5kQ29udmVydChjb250LCBLRVlfTElTVEVORVJTLCBsaXN0ZW5lcik7XG4gICAgYWRkQW5kQ29udmVydChjb250LCBLRVlfRVJSLCBlcnJIYW5kbGVyKTtcbiAgICBhZGRBbmRDb252ZXJ0KGNvbnQsIEtFWV9SQVcsIHJhd0VtaXR0ZXIpO1xuICB9IGVsc2Uge1xuICAgIHdhdGNoZXIgPSBjcmVhdGVGc1dhdGNoSW5zdGFuY2UoXG4gICAgICBwYXRoLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIGZzV2F0Y2hCcm9hZGNhc3QuYmluZChudWxsLCBmdWxsUGF0aCwgS0VZX0xJU1RFTkVSUyksXG4gICAgICBlcnJIYW5kbGVyLCAvLyBubyBuZWVkIHRvIHVzZSBicm9hZGNhc3QgaGVyZVxuICAgICAgZnNXYXRjaEJyb2FkY2FzdC5iaW5kKG51bGwsIGZ1bGxQYXRoLCBLRVlfUkFXKVxuICAgICk7XG4gICAgaWYgKCF3YXRjaGVyKSByZXR1cm47XG4gICAgd2F0Y2hlci5vbihFVl9FUlJPUiwgYXN5bmMgKGVycm9yKSA9PiB7XG4gICAgICBjb25zdCBicm9hZGNhc3RFcnIgPSBmc1dhdGNoQnJvYWRjYXN0LmJpbmQobnVsbCwgZnVsbFBhdGgsIEtFWV9FUlIpO1xuICAgICAgY29udC53YXRjaGVyVW51c2FibGUgPSB0cnVlOyAvLyBkb2N1bWVudGVkIHNpbmNlIE5vZGUgMTAuNC4xXG4gICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzQzMzdcbiAgICAgIGlmIChpc1dpbmRvd3MgJiYgZXJyb3IuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGZkID0gYXdhaXQgb3BlbihwYXRoLCAncicpO1xuICAgICAgICAgIGF3YWl0IGNsb3NlKGZkKTtcbiAgICAgICAgICBicm9hZGNhc3RFcnIoZXJyb3IpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicm9hZGNhc3RFcnIoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnQgPSB7XG4gICAgICBsaXN0ZW5lcnM6IGxpc3RlbmVyLFxuICAgICAgZXJySGFuZGxlcnM6IGVyckhhbmRsZXIsXG4gICAgICByYXdFbWl0dGVyczogcmF3RW1pdHRlcixcbiAgICAgIHdhdGNoZXJcbiAgICB9O1xuICAgIEZzV2F0Y2hJbnN0YW5jZXMuc2V0KGZ1bGxQYXRoLCBjb250KTtcbiAgfVxuICAvLyBjb25zdCBpbmRleCA9IGNvbnQubGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuXG4gIC8vIHJlbW92ZXMgdGhpcyBpbnN0YW5jZSdzIGxpc3RlbmVycyBhbmQgY2xvc2VzIHRoZSB1bmRlcmx5aW5nIGZzX3dhdGNoXG4gIC8vIGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBtb3JlIGxpc3RlbmVycyBsZWZ0XG4gIHJldHVybiAoKSA9PiB7XG4gICAgZGVsRnJvbVNldChjb250LCBLRVlfTElTVEVORVJTLCBsaXN0ZW5lcik7XG4gICAgZGVsRnJvbVNldChjb250LCBLRVlfRVJSLCBlcnJIYW5kbGVyKTtcbiAgICBkZWxGcm9tU2V0KGNvbnQsIEtFWV9SQVcsIHJhd0VtaXR0ZXIpO1xuICAgIGlmIChpc0VtcHR5U2V0KGNvbnQubGlzdGVuZXJzKSkge1xuICAgICAgLy8gQ2hlY2sgdG8gcHJvdGVjdCBhZ2FpbnN0IGlzc3VlIGdoLTczMC5cbiAgICAgIC8vIGlmIChjb250LndhdGNoZXJVbnVzYWJsZSkge1xuICAgICAgY29udC53YXRjaGVyLmNsb3NlKCk7XG4gICAgICAvLyB9XG4gICAgICBGc1dhdGNoSW5zdGFuY2VzLmRlbGV0ZShmdWxsUGF0aCk7XG4gICAgICBIQU5ETEVSX0tFWVMuZm9yRWFjaChjbGVhckl0ZW0oY29udCkpO1xuICAgICAgY29udC53YXRjaGVyID0gdW5kZWZpbmVkO1xuICAgICAgT2JqZWN0LmZyZWV6ZShjb250KTtcbiAgICB9XG4gIH07XG59O1xuXG4vLyBmc193YXRjaEZpbGUgaGVscGVyc1xuXG4vLyBvYmplY3QgdG8gaG9sZCBwZXItcHJvY2VzcyBmc193YXRjaEZpbGUgaW5zdGFuY2VzXG4vLyAobWF5IGJlIHNoYXJlZCBhY3Jvc3MgY2hva2lkYXIgRlNXYXRjaGVyIGluc3RhbmNlcylcbmNvbnN0IEZzV2F0Y2hGaWxlSW5zdGFuY2VzID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEluc3RhbnRpYXRlcyB0aGUgZnNfd2F0Y2hGaWxlIGludGVyZmFjZSBvciBiaW5kcyBsaXN0ZW5lcnNcbiAqIHRvIGFuIGV4aXN0aW5nIG9uZSBjb3ZlcmluZyB0aGUgc2FtZSBmaWxlIHN5c3RlbSBlbnRyeVxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdG8gYmUgd2F0Y2hlZFxuICogQHBhcmFtIHtTdHJpbmd9IGZ1bGxQYXRoIGFic29sdXRlIHBhdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIGZzX3dhdGNoRmlsZVxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXJzIGNvbnRhaW5lciBmb3IgZXZlbnQgbGlzdGVuZXIgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGNsb3NlclxuICovXG5jb25zdCBzZXRGc1dhdGNoRmlsZUxpc3RlbmVyID0gKHBhdGgsIGZ1bGxQYXRoLCBvcHRpb25zLCBoYW5kbGVycykgPT4ge1xuICBjb25zdCB7bGlzdGVuZXIsIHJhd0VtaXR0ZXJ9ID0gaGFuZGxlcnM7XG4gIGxldCBjb250ID0gRnNXYXRjaEZpbGVJbnN0YW5jZXMuZ2V0KGZ1bGxQYXRoKTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycywgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbiAgbGV0IGxpc3RlbmVycyA9IG5ldyBTZXQoKTtcbiAgbGV0IHJhd0VtaXR0ZXJzID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0IGNvcHRzID0gY29udCAmJiBjb250Lm9wdGlvbnM7XG4gIGlmIChjb3B0cyAmJiAoY29wdHMucGVyc2lzdGVudCA8IG9wdGlvbnMucGVyc2lzdGVudCB8fCBjb3B0cy5pbnRlcnZhbCA+IG9wdGlvbnMuaW50ZXJ2YWwpKSB7XG4gICAgLy8gXCJVcGdyYWRlXCIgdGhlIHdhdGNoZXIgdG8gcGVyc2lzdGVuY2Ugb3IgYSBxdWlja2VyIGludGVydmFsLlxuICAgIC8vIFRoaXMgY3JlYXRlcyBzb21lIHVubGlrZWx5IGVkZ2UgY2FzZSBpc3N1ZXMgaWYgdGhlIHVzZXIgbWl4ZXNcbiAgICAvLyBzZXR0aW5ncyBpbiBhIHZlcnkgd2VpcmQgd2F5LCBidXQgc29sdmluZyBmb3IgdGhvc2UgY2FzZXNcbiAgICAvLyBkb2Vzbid0IHNlZW0gd29ydGh3aGlsZSBmb3IgdGhlIGFkZGVkIGNvbXBsZXhpdHkuXG4gICAgbGlzdGVuZXJzID0gY29udC5saXN0ZW5lcnM7XG4gICAgcmF3RW1pdHRlcnMgPSBjb250LnJhd0VtaXR0ZXJzO1xuICAgIGZzLnVud2F0Y2hGaWxlKGZ1bGxQYXRoKTtcbiAgICBjb250ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycywgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cblxuICBpZiAoY29udCkge1xuICAgIGFkZEFuZENvbnZlcnQoY29udCwgS0VZX0xJU1RFTkVSUywgbGlzdGVuZXIpO1xuICAgIGFkZEFuZENvbnZlcnQoY29udCwgS0VZX1JBVywgcmF3RW1pdHRlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ET1xuICAgIC8vIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICAgIC8vIHJhd0VtaXR0ZXJzLmFkZChyYXdFbWl0dGVyKTtcbiAgICBjb250ID0ge1xuICAgICAgbGlzdGVuZXJzOiBsaXN0ZW5lcixcbiAgICAgIHJhd0VtaXR0ZXJzOiByYXdFbWl0dGVyLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHdhdGNoZXI6IGZzLndhdGNoRmlsZShmdWxsUGF0aCwgb3B0aW9ucywgKGN1cnIsIHByZXYpID0+IHtcbiAgICAgICAgZm9yZWFjaChjb250LnJhd0VtaXR0ZXJzLCAocmF3RW1pdHRlcikgPT4ge1xuICAgICAgICAgIHJhd0VtaXR0ZXIoRVZfQ0hBTkdFLCBmdWxsUGF0aCwge2N1cnIsIHByZXZ9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGN1cnJtdGltZSA9IGN1cnIubXRpbWVNcztcbiAgICAgICAgaWYgKGN1cnIuc2l6ZSAhPT0gcHJldi5zaXplIHx8IGN1cnJtdGltZSA+IHByZXYubXRpbWVNcyB8fCBjdXJybXRpbWUgPT09IDApIHtcbiAgICAgICAgICBmb3JlYWNoKGNvbnQubGlzdGVuZXJzLCAobGlzdGVuZXIpID0+IGxpc3RlbmVyKHBhdGgsIGN1cnIpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9O1xuICAgIEZzV2F0Y2hGaWxlSW5zdGFuY2VzLnNldChmdWxsUGF0aCwgY29udCk7XG4gIH1cbiAgLy8gY29uc3QgaW5kZXggPSBjb250Lmxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcblxuICAvLyBSZW1vdmVzIHRoaXMgaW5zdGFuY2UncyBsaXN0ZW5lcnMgYW5kIGNsb3NlcyB0aGUgdW5kZXJseWluZyBmc193YXRjaEZpbGVcbiAgLy8gaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG1vcmUgbGlzdGVuZXJzIGxlZnQuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgZGVsRnJvbVNldChjb250LCBLRVlfTElTVEVORVJTLCBsaXN0ZW5lcik7XG4gICAgZGVsRnJvbVNldChjb250LCBLRVlfUkFXLCByYXdFbWl0dGVyKTtcbiAgICBpZiAoaXNFbXB0eVNldChjb250Lmxpc3RlbmVycykpIHtcbiAgICAgIEZzV2F0Y2hGaWxlSW5zdGFuY2VzLmRlbGV0ZShmdWxsUGF0aCk7XG4gICAgICBmcy51bndhdGNoRmlsZShmdWxsUGF0aCk7XG4gICAgICBjb250Lm9wdGlvbnMgPSBjb250LndhdGNoZXIgPSB1bmRlZmluZWQ7XG4gICAgICBPYmplY3QuZnJlZXplKGNvbnQpO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQG1peGluXG4gKi9cbmNsYXNzIE5vZGVGc0hhbmRsZXIge1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vaW5kZXhcIikuRlNXYXRjaGVyfSBmc1dcbiAqL1xuY29uc3RydWN0b3IoZnNXKSB7XG4gIHRoaXMuZnN3ID0gZnNXO1xuICB0aGlzLl9ib3VuZEhhbmRsZUVycm9yID0gKGVycm9yKSA9PiBmc1cuX2hhbmRsZUVycm9yKGVycm9yKTtcbn1cblxuLyoqXG4gKiBXYXRjaCBmaWxlIGZvciBjaGFuZ2VzIHdpdGggZnNfd2F0Y2hGaWxlIG9yIGZzX3dhdGNoLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdG8gZmlsZSBvciBkaXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIG9uIGZzIGNoYW5nZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBjbG9zZXIgZm9yIHRoZSB3YXRjaGVyIGluc3RhbmNlXG4gKi9cbl93YXRjaFdpdGhOb2RlRnMocGF0aCwgbGlzdGVuZXIpIHtcbiAgY29uc3Qgb3B0cyA9IHRoaXMuZnN3Lm9wdGlvbnM7XG4gIGNvbnN0IGRpcmVjdG9yeSA9IHN5c1BhdGguZGlybmFtZShwYXRoKTtcbiAgY29uc3QgYmFzZW5hbWUgPSBzeXNQYXRoLmJhc2VuYW1lKHBhdGgpO1xuICBjb25zdCBwYXJlbnQgPSB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihkaXJlY3RvcnkpO1xuICBwYXJlbnQuYWRkKGJhc2VuYW1lKTtcbiAgY29uc3QgYWJzb2x1dGVQYXRoID0gc3lzUGF0aC5yZXNvbHZlKHBhdGgpO1xuICBjb25zdCBvcHRpb25zID0ge3BlcnNpc3RlbnQ6IG9wdHMucGVyc2lzdGVudH07XG4gIGlmICghbGlzdGVuZXIpIGxpc3RlbmVyID0gRU1QVFlfRk47XG5cbiAgbGV0IGNsb3NlcjtcbiAgaWYgKG9wdHMudXNlUG9sbGluZykge1xuICAgIG9wdGlvbnMuaW50ZXJ2YWwgPSBvcHRzLmVuYWJsZUJpbmFyeUludGVydmFsICYmIGlzQmluYXJ5UGF0aChiYXNlbmFtZSkgP1xuICAgICAgb3B0cy5iaW5hcnlJbnRlcnZhbCA6IG9wdHMuaW50ZXJ2YWw7XG4gICAgY2xvc2VyID0gc2V0RnNXYXRjaEZpbGVMaXN0ZW5lcihwYXRoLCBhYnNvbHV0ZVBhdGgsIG9wdGlvbnMsIHtcbiAgICAgIGxpc3RlbmVyLFxuICAgICAgcmF3RW1pdHRlcjogdGhpcy5mc3cuX2VtaXRSYXdcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjbG9zZXIgPSBzZXRGc1dhdGNoTGlzdGVuZXIocGF0aCwgYWJzb2x1dGVQYXRoLCBvcHRpb25zLCB7XG4gICAgICBsaXN0ZW5lcixcbiAgICAgIGVyckhhbmRsZXI6IHRoaXMuX2JvdW5kSGFuZGxlRXJyb3IsXG4gICAgICByYXdFbWl0dGVyOiB0aGlzLmZzdy5fZW1pdFJhd1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBjbG9zZXI7XG59XG5cbi8qKlxuICogV2F0Y2ggYSBmaWxlIGFuZCBlbWl0IGFkZCBldmVudCBpZiB3YXJyYW50ZWQuXG4gKiBAcGFyYW0ge1BhdGh9IGZpbGUgUGF0aFxuICogQHBhcmFtIHtmcy5TdGF0c30gc3RhdHMgcmVzdWx0IG9mIGZzX3N0YXRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5pdGlhbEFkZCB3YXMgdGhlIGZpbGUgYWRkZWQgYXQgd2F0Y2ggaW5zdGFudGlhdGlvbj9cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gY2xvc2VyIGZvciB0aGUgd2F0Y2hlciBpbnN0YW5jZVxuICovXG5faGFuZGxlRmlsZShmaWxlLCBzdGF0cywgaW5pdGlhbEFkZCkge1xuICBpZiAodGhpcy5mc3cuY2xvc2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGRpcm5hbWUgPSBzeXNQYXRoLmRpcm5hbWUoZmlsZSk7XG4gIGNvbnN0IGJhc2VuYW1lID0gc3lzUGF0aC5iYXNlbmFtZShmaWxlKTtcbiAgY29uc3QgcGFyZW50ID0gdGhpcy5mc3cuX2dldFdhdGNoZWREaXIoZGlybmFtZSk7XG4gIC8vIHN0YXRzIGlzIGFsd2F5cyBwcmVzZW50XG4gIGxldCBwcmV2U3RhdHMgPSBzdGF0cztcblxuICAvLyBpZiB0aGUgZmlsZSBpcyBhbHJlYWR5IGJlaW5nIHdhdGNoZWQsIGRvIG5vdGhpbmdcbiAgaWYgKHBhcmVudC5oYXMoYmFzZW5hbWUpKSByZXR1cm47XG5cbiAgY29uc3QgbGlzdGVuZXIgPSBhc3luYyAocGF0aCwgbmV3U3RhdHMpID0+IHtcbiAgICBpZiAoIXRoaXMuZnN3Ll90aHJvdHRsZShUSFJPVFRMRV9NT0RFX1dBVENILCBmaWxlLCA1KSkgcmV0dXJuO1xuICAgIGlmICghbmV3U3RhdHMgfHwgbmV3U3RhdHMubXRpbWVNcyA9PT0gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmV3U3RhdHMgPSBhd2FpdCBzdGF0KGZpbGUpO1xuICAgICAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSByZXR1cm47XG4gICAgICAgIC8vIENoZWNrIHRoYXQgY2hhbmdlIGV2ZW50IHdhcyBub3QgZmlyZWQgYmVjYXVzZSBvZiBjaGFuZ2VkIG9ubHkgYWNjZXNzVGltZS5cbiAgICAgICAgY29uc3QgYXQgPSBuZXdTdGF0cy5hdGltZU1zO1xuICAgICAgICBjb25zdCBtdCA9IG5ld1N0YXRzLm10aW1lTXM7XG4gICAgICAgIGlmICghYXQgfHwgYXQgPD0gbXQgfHwgbXQgIT09IHByZXZTdGF0cy5tdGltZU1zKSB7XG4gICAgICAgICAgdGhpcy5mc3cuX2VtaXQoRVZfQ0hBTkdFLCBmaWxlLCBuZXdTdGF0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTGludXggJiYgcHJldlN0YXRzLmlubyAhPT0gbmV3U3RhdHMuaW5vKSB7XG4gICAgICAgICAgdGhpcy5mc3cuX2Nsb3NlRmlsZShwYXRoKVxuICAgICAgICAgIHByZXZTdGF0cyA9IG5ld1N0YXRzO1xuICAgICAgICAgIHRoaXMuZnN3Ll9hZGRQYXRoQ2xvc2VyKHBhdGgsIHRoaXMuX3dhdGNoV2l0aE5vZGVGcyhmaWxlLCBsaXN0ZW5lcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZTdGF0cyA9IG5ld1N0YXRzO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBGaXggaXNzdWVzIHdoZXJlIG10aW1lIGlzIG51bGwgYnV0IGZpbGUgaXMgc3RpbGwgcHJlc2VudFxuICAgICAgICB0aGlzLmZzdy5fcmVtb3ZlKGRpcm5hbWUsIGJhc2VuYW1lKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBpcyBhYm91dCB0byBiZSBlbWl0dGVkIGlmIGZpbGUgbm90IGFscmVhZHkgdHJhY2tlZCBpbiBwYXJlbnRcbiAgICB9IGVsc2UgaWYgKHBhcmVudC5oYXMoYmFzZW5hbWUpKSB7XG4gICAgICAvLyBDaGVjayB0aGF0IGNoYW5nZSBldmVudCB3YXMgbm90IGZpcmVkIGJlY2F1c2Ugb2YgY2hhbmdlZCBvbmx5IGFjY2Vzc1RpbWUuXG4gICAgICBjb25zdCBhdCA9IG5ld1N0YXRzLmF0aW1lTXM7XG4gICAgICBjb25zdCBtdCA9IG5ld1N0YXRzLm10aW1lTXM7XG4gICAgICBpZiAoIWF0IHx8IGF0IDw9IG10IHx8IG10ICE9PSBwcmV2U3RhdHMubXRpbWVNcykge1xuICAgICAgICB0aGlzLmZzdy5fZW1pdChFVl9DSEFOR0UsIGZpbGUsIG5ld1N0YXRzKTtcbiAgICAgIH1cbiAgICAgIHByZXZTdGF0cyA9IG5ld1N0YXRzO1xuICAgIH1cbiAgfVxuICAvLyBraWNrIG9mZiB0aGUgd2F0Y2hlclxuICBjb25zdCBjbG9zZXIgPSB0aGlzLl93YXRjaFdpdGhOb2RlRnMoZmlsZSwgbGlzdGVuZXIpO1xuXG4gIC8vIGVtaXQgYW4gYWRkIGV2ZW50IGlmIHdlJ3JlIHN1cHBvc2VkIHRvXG4gIGlmICghKGluaXRpYWxBZGQgJiYgdGhpcy5mc3cub3B0aW9ucy5pZ25vcmVJbml0aWFsKSAmJiB0aGlzLmZzdy5faXNudElnbm9yZWQoZmlsZSkpIHtcbiAgICBpZiAoIXRoaXMuZnN3Ll90aHJvdHRsZShFVl9BREQsIGZpbGUsIDApKSByZXR1cm47XG4gICAgdGhpcy5mc3cuX2VtaXQoRVZfQURELCBmaWxlLCBzdGF0cyk7XG4gIH1cblxuICByZXR1cm4gY2xvc2VyO1xufVxuXG4vKipcbiAqIEhhbmRsZSBzeW1saW5rcyBlbmNvdW50ZXJlZCB3aGlsZSByZWFkaW5nIGEgZGlyLlxuICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IHJldHVybmVkIGJ5IHJlYWRkaXJwXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHBhdGggb2YgZGlyIGJlaW5nIHJlYWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIG9mIHRoaXMgaXRlbVxuICogQHBhcmFtIHtTdHJpbmd9IGl0ZW0gYmFzZW5hbWUgb2YgdGhpcyBpdGVtXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCb29sZWFuPn0gdHJ1ZSBpZiBubyBtb3JlIHByb2Nlc3NpbmcgaXMgbmVlZGVkIGZvciB0aGlzIGVudHJ5LlxuICovXG5hc3luYyBfaGFuZGxlU3ltbGluayhlbnRyeSwgZGlyZWN0b3J5LCBwYXRoLCBpdGVtKSB7XG4gIGlmICh0aGlzLmZzdy5jbG9zZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZnVsbCA9IGVudHJ5LmZ1bGxQYXRoO1xuICBjb25zdCBkaXIgPSB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihkaXJlY3RvcnkpO1xuXG4gIGlmICghdGhpcy5mc3cub3B0aW9ucy5mb2xsb3dTeW1saW5rcykge1xuICAgIC8vIHdhdGNoIHN5bWxpbmsgZGlyZWN0bHkgKGRvbid0IGZvbGxvdykgYW5kIGRldGVjdCBjaGFuZ2VzXG4gICAgdGhpcy5mc3cuX2luY3JSZWFkeUNvdW50KCk7XG4gICAgY29uc3QgbGlua1BhdGggPSBhd2FpdCBmc3JlYWxwYXRoKHBhdGgpO1xuICAgIGlmICh0aGlzLmZzdy5jbG9zZWQpIHJldHVybjtcbiAgICBpZiAoZGlyLmhhcyhpdGVtKSkge1xuICAgICAgaWYgKHRoaXMuZnN3Ll9zeW1saW5rUGF0aHMuZ2V0KGZ1bGwpICE9PSBsaW5rUGF0aCkge1xuICAgICAgICB0aGlzLmZzdy5fc3ltbGlua1BhdGhzLnNldChmdWxsLCBsaW5rUGF0aCk7XG4gICAgICAgIHRoaXMuZnN3Ll9lbWl0KEVWX0NIQU5HRSwgcGF0aCwgZW50cnkuc3RhdHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXIuYWRkKGl0ZW0pO1xuICAgICAgdGhpcy5mc3cuX3N5bWxpbmtQYXRocy5zZXQoZnVsbCwgbGlua1BhdGgpO1xuICAgICAgdGhpcy5mc3cuX2VtaXQoRVZfQURELCBwYXRoLCBlbnRyeS5zdGF0cyk7XG4gICAgfVxuICAgIHRoaXMuZnN3Ll9lbWl0UmVhZHkoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGRvbid0IGZvbGxvdyB0aGUgc2FtZSBzeW1saW5rIG1vcmUgdGhhbiBvbmNlXG4gIGlmICh0aGlzLmZzdy5fc3ltbGlua1BhdGhzLmhhcyhmdWxsKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdGhpcy5mc3cuX3N5bWxpbmtQYXRocy5zZXQoZnVsbCwgdHJ1ZSk7XG59XG5cbl9oYW5kbGVSZWFkKGRpcmVjdG9yeSwgaW5pdGlhbEFkZCwgd2gsIHRhcmdldCwgZGlyLCBkZXB0aCwgdGhyb3R0bGVyKSB7XG4gIC8vIE5vcm1hbGl6ZSB0aGUgZGlyZWN0b3J5IG5hbWUgb24gV2luZG93c1xuICBkaXJlY3RvcnkgPSBzeXNQYXRoLmpvaW4oZGlyZWN0b3J5LCBFTVBUWV9TVFIpO1xuXG4gIGlmICghd2guaGFzR2xvYikge1xuICAgIHRocm90dGxlciA9IHRoaXMuZnN3Ll90aHJvdHRsZSgncmVhZGRpcicsIGRpcmVjdG9yeSwgMTAwMCk7XG4gICAgaWYgKCF0aHJvdHRsZXIpIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHByZXZpb3VzID0gdGhpcy5mc3cuX2dldFdhdGNoZWREaXIod2gucGF0aCk7XG4gIGNvbnN0IGN1cnJlbnQgPSBuZXcgU2V0KCk7XG5cbiAgbGV0IHN0cmVhbSA9IHRoaXMuZnN3Ll9yZWFkZGlycChkaXJlY3RvcnksIHtcbiAgICBmaWxlRmlsdGVyOiBlbnRyeSA9PiB3aC5maWx0ZXJQYXRoKGVudHJ5KSxcbiAgICBkaXJlY3RvcnlGaWx0ZXI6IGVudHJ5ID0+IHdoLmZpbHRlckRpcihlbnRyeSksXG4gICAgZGVwdGg6IDBcbiAgfSkub24oU1RSX0RBVEEsIGFzeW5jIChlbnRyeSkgPT4ge1xuICAgIGlmICh0aGlzLmZzdy5jbG9zZWQpIHtcbiAgICAgIHN0cmVhbSA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXRlbSA9IGVudHJ5LnBhdGg7XG4gICAgbGV0IHBhdGggPSBzeXNQYXRoLmpvaW4oZGlyZWN0b3J5LCBpdGVtKTtcbiAgICBjdXJyZW50LmFkZChpdGVtKTtcblxuICAgIGlmIChlbnRyeS5zdGF0cy5pc1N5bWJvbGljTGluaygpICYmIGF3YWl0IHRoaXMuX2hhbmRsZVN5bWxpbmsoZW50cnksIGRpcmVjdG9yeSwgcGF0aCwgaXRlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSB7XG4gICAgICBzdHJlYW0gPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEZpbGVzIHRoYXQgcHJlc2VudCBpbiBjdXJyZW50IGRpcmVjdG9yeSBzbmFwc2hvdFxuICAgIC8vIGJ1dCBhYnNlbnQgaW4gcHJldmlvdXMgYXJlIGFkZGVkIHRvIHdhdGNoIGxpc3QgYW5kXG4gICAgLy8gZW1pdCBgYWRkYCBldmVudC5cbiAgICBpZiAoaXRlbSA9PT0gdGFyZ2V0IHx8ICF0YXJnZXQgJiYgIXByZXZpb3VzLmhhcyhpdGVtKSkge1xuICAgICAgdGhpcy5mc3cuX2luY3JSZWFkeUNvdW50KCk7XG5cbiAgICAgIC8vIGVuc3VyZSByZWxhdGl2ZW5lc3Mgb2YgcGF0aCBpcyBwcmVzZXJ2ZWQgaW4gY2FzZSBvZiB3YXRjaGVyIHJldXNlXG4gICAgICBwYXRoID0gc3lzUGF0aC5qb2luKGRpciwgc3lzUGF0aC5yZWxhdGl2ZShkaXIsIHBhdGgpKTtcblxuICAgICAgdGhpcy5fYWRkVG9Ob2RlRnMocGF0aCwgaW5pdGlhbEFkZCwgd2gsIGRlcHRoICsgMSk7XG4gICAgfVxuICB9KS5vbihFVl9FUlJPUiwgdGhpcy5fYm91bmRIYW5kbGVFcnJvcik7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICBzdHJlYW0ub25jZShTVFJfRU5ELCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSB7XG4gICAgICAgIHN0cmVhbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2FzVGhyb3R0bGVkID0gdGhyb3R0bGVyID8gdGhyb3R0bGVyLmNsZWFyKCkgOiBmYWxzZTtcblxuICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAvLyBGaWxlcyB0aGF0IGFic2VudCBpbiBjdXJyZW50IGRpcmVjdG9yeSBzbmFwc2hvdFxuICAgICAgLy8gYnV0IHByZXNlbnQgaW4gcHJldmlvdXMgZW1pdCBgcmVtb3ZlYCBldmVudFxuICAgICAgLy8gYW5kIGFyZSByZW1vdmVkIGZyb20gQHdhdGNoZWRbZGlyZWN0b3J5XS5cbiAgICAgIHByZXZpb3VzLmdldENoaWxkcmVuKCkuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBkaXJlY3RvcnkgJiZcbiAgICAgICAgICAhY3VycmVudC5oYXMoaXRlbSkgJiZcbiAgICAgICAgICAvLyBpbiBjYXNlIG9mIGludGVyc2VjdGluZyBnbG9icztcbiAgICAgICAgICAvLyBhIHBhdGggbWF5IGhhdmUgYmVlbiBmaWx0ZXJlZCBvdXQgb2YgdGhpcyByZWFkZGlyLCBidXRcbiAgICAgICAgICAvLyBzaG91bGRuJ3QgYmUgcmVtb3ZlZCBiZWNhdXNlIGl0IG1hdGNoZXMgYSBkaWZmZXJlbnQgZ2xvYlxuICAgICAgICAgICghd2guaGFzR2xvYiB8fCB3aC5maWx0ZXJQYXRoKHtcbiAgICAgICAgICAgIGZ1bGxQYXRoOiBzeXNQYXRoLnJlc29sdmUoZGlyZWN0b3J5LCBpdGVtKVxuICAgICAgICAgIH0pKTtcbiAgICAgIH0pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdGhpcy5mc3cuX3JlbW92ZShkaXJlY3RvcnksIGl0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIHN0cmVhbSA9IHVuZGVmaW5lZDtcblxuICAgICAgLy8gb25lIG1vcmUgdGltZSBmb3IgYW55IG1pc3NlZCBpbiBjYXNlIGNoYW5nZXMgY2FtZSBpbiBleHRyZW1lbHkgcXVpY2tseVxuICAgICAgaWYgKHdhc1Rocm90dGxlZCkgdGhpcy5faGFuZGxlUmVhZChkaXJlY3RvcnksIGZhbHNlLCB3aCwgdGFyZ2V0LCBkaXIsIGRlcHRoLCB0aHJvdHRsZXIpO1xuICAgIH0pXG4gICk7XG59XG5cbi8qKlxuICogUmVhZCBkaXJlY3RvcnkgdG8gYWRkIC8gcmVtb3ZlIGZpbGVzIGZyb20gYEB3YXRjaGVkYCBsaXN0IGFuZCByZS1yZWFkIGl0IG9uIGNoYW5nZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkaXIgZnMgcGF0aFxuICogQHBhcmFtIHtmcy5TdGF0c30gc3RhdHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5pdGlhbEFkZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIHJlbGF0aXZlIHRvIHVzZXItc3VwcGxpZWQgcGF0aFxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCBjaGlsZCBwYXRoIHRhcmdldGVkIGZvciB3YXRjaFxuICogQHBhcmFtIHtPYmplY3R9IHdoIENvbW1vbiB3YXRjaCBoZWxwZXJzIGZvciB0aGlzIHBhdGhcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFscGF0aFxuICogQHJldHVybnMge1Byb21pc2U8RnVuY3Rpb24+fSBjbG9zZXIgZm9yIHRoZSB3YXRjaGVyIGluc3RhbmNlLlxuICovXG5hc3luYyBfaGFuZGxlRGlyKGRpciwgc3RhdHMsIGluaXRpYWxBZGQsIGRlcHRoLCB0YXJnZXQsIHdoLCByZWFscGF0aCkge1xuICBjb25zdCBwYXJlbnREaXIgPSB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihzeXNQYXRoLmRpcm5hbWUoZGlyKSk7XG4gIGNvbnN0IHRyYWNrZWQgPSBwYXJlbnREaXIuaGFzKHN5c1BhdGguYmFzZW5hbWUoZGlyKSk7XG4gIGlmICghKGluaXRpYWxBZGQgJiYgdGhpcy5mc3cub3B0aW9ucy5pZ25vcmVJbml0aWFsKSAmJiAhdGFyZ2V0ICYmICF0cmFja2VkKSB7XG4gICAgaWYgKCF3aC5oYXNHbG9iIHx8IHdoLmdsb2JGaWx0ZXIoZGlyKSkgdGhpcy5mc3cuX2VtaXQoRVZfQUREX0RJUiwgZGlyLCBzdGF0cyk7XG4gIH1cblxuICAvLyBlbnN1cmUgZGlyIGlzIHRyYWNrZWQgKGhhcm1sZXNzIGlmIHJlZHVuZGFudClcbiAgcGFyZW50RGlyLmFkZChzeXNQYXRoLmJhc2VuYW1lKGRpcikpO1xuICB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihkaXIpO1xuICBsZXQgdGhyb3R0bGVyO1xuICBsZXQgY2xvc2VyO1xuXG4gIGNvbnN0IG9EZXB0aCA9IHRoaXMuZnN3Lm9wdGlvbnMuZGVwdGg7XG4gIGlmICgob0RlcHRoID09IG51bGwgfHwgZGVwdGggPD0gb0RlcHRoKSAmJiAhdGhpcy5mc3cuX3N5bWxpbmtQYXRocy5oYXMocmVhbHBhdGgpKSB7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZVJlYWQoZGlyLCBpbml0aWFsQWRkLCB3aCwgdGFyZ2V0LCBkaXIsIGRlcHRoLCB0aHJvdHRsZXIpO1xuICAgICAgaWYgKHRoaXMuZnN3LmNsb3NlZCkgcmV0dXJuO1xuICAgIH1cblxuICAgIGNsb3NlciA9IHRoaXMuX3dhdGNoV2l0aE5vZGVGcyhkaXIsIChkaXJQYXRoLCBzdGF0cykgPT4ge1xuICAgICAgLy8gaWYgY3VycmVudCBkaXJlY3RvcnkgaXMgcmVtb3ZlZCwgZG8gbm90aGluZ1xuICAgICAgaWYgKHN0YXRzICYmIHN0YXRzLm10aW1lTXMgPT09IDApIHJldHVybjtcblxuICAgICAgdGhpcy5faGFuZGxlUmVhZChkaXJQYXRoLCBmYWxzZSwgd2gsIHRhcmdldCwgZGlyLCBkZXB0aCwgdGhyb3R0bGVyKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY2xvc2VyO1xufVxuXG4vKipcbiAqIEhhbmRsZSBhZGRlZCBmaWxlLCBkaXJlY3RvcnksIG9yIGdsb2IgcGF0dGVybi5cbiAqIERlbGVnYXRlcyBjYWxsIHRvIF9oYW5kbGVGaWxlIC8gX2hhbmRsZURpciBhZnRlciBjaGVja3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCB0byBmaWxlIG9yIGlyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGluaXRpYWxBZGQgd2FzIHRoZSBmaWxlIGFkZGVkIGF0IHdhdGNoIGluc3RhbnRpYXRpb24/XG4gKiBAcGFyYW0ge09iamVjdH0gcHJpb3JXaCBkZXB0aCByZWxhdGl2ZSB0byB1c2VyLXN1cHBsaWVkIHBhdGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBDaGlsZCBwYXRoIGFjdHVhbGx5IHRhcmdldGVkIGZvciB3YXRjaFxuICogQHBhcmFtIHtTdHJpbmc9fSB0YXJnZXQgQ2hpbGQgcGF0aCBhY3R1YWxseSB0YXJnZXRlZCBmb3Igd2F0Y2hcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5hc3luYyBfYWRkVG9Ob2RlRnMocGF0aCwgaW5pdGlhbEFkZCwgcHJpb3JXaCwgZGVwdGgsIHRhcmdldCkge1xuICBjb25zdCByZWFkeSA9IHRoaXMuZnN3Ll9lbWl0UmVhZHk7XG4gIGlmICh0aGlzLmZzdy5faXNJZ25vcmVkKHBhdGgpIHx8IHRoaXMuZnN3LmNsb3NlZCkge1xuICAgIHJlYWR5KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgd2ggPSB0aGlzLmZzdy5fZ2V0V2F0Y2hIZWxwZXJzKHBhdGgsIGRlcHRoKTtcbiAgaWYgKCF3aC5oYXNHbG9iICYmIHByaW9yV2gpIHtcbiAgICB3aC5oYXNHbG9iID0gcHJpb3JXaC5oYXNHbG9iO1xuICAgIHdoLmdsb2JGaWx0ZXIgPSBwcmlvcldoLmdsb2JGaWx0ZXI7XG4gICAgd2guZmlsdGVyUGF0aCA9IGVudHJ5ID0+IHByaW9yV2guZmlsdGVyUGF0aChlbnRyeSk7XG4gICAgd2guZmlsdGVyRGlyID0gZW50cnkgPT4gcHJpb3JXaC5maWx0ZXJEaXIoZW50cnkpO1xuICB9XG5cbiAgLy8gZXZhbHVhdGUgd2hhdCBpcyBhdCB0aGUgcGF0aCB3ZSdyZSBiZWluZyBhc2tlZCB0byB3YXRjaFxuICB0cnkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgc3RhdE1ldGhvZHNbd2guc3RhdE1ldGhvZF0od2gud2F0Y2hQYXRoKTtcbiAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZnN3Ll9pc0lnbm9yZWQod2gud2F0Y2hQYXRoLCBzdGF0cykpIHtcbiAgICAgIHJlYWR5KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZm9sbG93ID0gdGhpcy5mc3cub3B0aW9ucy5mb2xsb3dTeW1saW5rcyAmJiAhcGF0aC5pbmNsdWRlcyhTVEFSKSAmJiAhcGF0aC5pbmNsdWRlcyhCUkFDRV9TVEFSVCk7XG4gICAgbGV0IGNsb3NlcjtcbiAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgY29uc3QgYWJzUGF0aCA9IHN5c1BhdGgucmVzb2x2ZShwYXRoKTtcbiAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBmb2xsb3cgPyBhd2FpdCBmc3JlYWxwYXRoKHBhdGgpIDogcGF0aDtcbiAgICAgIGlmICh0aGlzLmZzdy5jbG9zZWQpIHJldHVybjtcbiAgICAgIGNsb3NlciA9IGF3YWl0IHRoaXMuX2hhbmRsZURpcih3aC53YXRjaFBhdGgsIHN0YXRzLCBpbml0aWFsQWRkLCBkZXB0aCwgdGFyZ2V0LCB3aCwgdGFyZ2V0UGF0aCk7XG4gICAgICBpZiAodGhpcy5mc3cuY2xvc2VkKSByZXR1cm47XG4gICAgICAvLyBwcmVzZXJ2ZSB0aGlzIHN5bWxpbmsncyB0YXJnZXQgcGF0aFxuICAgICAgaWYgKGFic1BhdGggIT09IHRhcmdldFBhdGggJiYgdGFyZ2V0UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZnN3Ll9zeW1saW5rUGF0aHMuc2V0KGFic1BhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdHMuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IGZvbGxvdyA/IGF3YWl0IGZzcmVhbHBhdGgocGF0aCkgOiBwYXRoO1xuICAgICAgaWYgKHRoaXMuZnN3LmNsb3NlZCkgcmV0dXJuO1xuICAgICAgY29uc3QgcGFyZW50ID0gc3lzUGF0aC5kaXJuYW1lKHdoLndhdGNoUGF0aCk7XG4gICAgICB0aGlzLmZzdy5fZ2V0V2F0Y2hlZERpcihwYXJlbnQpLmFkZCh3aC53YXRjaFBhdGgpO1xuICAgICAgdGhpcy5mc3cuX2VtaXQoRVZfQURELCB3aC53YXRjaFBhdGgsIHN0YXRzKTtcbiAgICAgIGNsb3NlciA9IGF3YWl0IHRoaXMuX2hhbmRsZURpcihwYXJlbnQsIHN0YXRzLCBpbml0aWFsQWRkLCBkZXB0aCwgcGF0aCwgd2gsIHRhcmdldFBhdGgpO1xuICAgICAgaWYgKHRoaXMuZnN3LmNsb3NlZCkgcmV0dXJuO1xuXG4gICAgICAvLyBwcmVzZXJ2ZSB0aGlzIHN5bWxpbmsncyB0YXJnZXQgcGF0aFxuICAgICAgaWYgKHRhcmdldFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZzdy5fc3ltbGlua1BhdGhzLnNldChzeXNQYXRoLnJlc29sdmUocGF0aCksIHRhcmdldFBhdGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbG9zZXIgPSB0aGlzLl9oYW5kbGVGaWxlKHdoLndhdGNoUGF0aCwgc3RhdHMsIGluaXRpYWxBZGQpO1xuICAgIH1cbiAgICByZWFkeSgpO1xuXG4gICAgdGhpcy5mc3cuX2FkZFBhdGhDbG9zZXIocGF0aCwgY2xvc2VyKTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAodGhpcy5mc3cuX2hhbmRsZUVycm9yKGVycm9yKSkge1xuICAgICAgcmVhZHkoKTtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgfVxufVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZUZzSGFuZGxlcjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHRpbWVab25lID0gcmVxdWlyZSgndGltZS16b25lJyk7XG5cbmNvbnN0IGRhdGVUaW1lID0gb3B0aW9ucyA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkYXRlOiBuZXcgRGF0ZSgpLFxuXHRcdGxvY2FsOiB0cnVlLFxuXHRcdHNob3dUaW1lWm9uZTogZmFsc2UsXG5cdFx0c2hvd01pbGxpc2Vjb25kczogZmFsc2Vcblx0fSwgb3B0aW9ucyk7XG5cblx0bGV0IHtkYXRlfSA9IG9wdGlvbnM7XG5cblx0aWYgKG9wdGlvbnMubG9jYWwpIHtcblx0XHQvLyBPZmZzZXQgdGhlIGRhdGUgc28gaXQgd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgd2hlbiBnZXR0aW5nIHRoZSBJU08gc3RyaW5nXG5cdFx0ZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpIC0gKGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKSk7XG5cdH1cblxuXHRsZXQgZW5kID0gJyc7XG5cblx0aWYgKG9wdGlvbnMuc2hvd1RpbWVab25lKSB7XG5cdFx0ZW5kID0gJyBVVEMnICsgKG9wdGlvbnMubG9jYWwgPyB0aW1lWm9uZShkYXRlKSA6ICcnKTtcblx0fVxuXG5cdGlmIChvcHRpb25zLnNob3dNaWxsaXNlY29uZHMgJiYgZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSA+IDApIHtcblx0XHRlbmQgPSBgICR7ZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKX1tcyR7ZW5kfWA7XG5cdH1cblxuXHRyZXR1cm4gZGF0ZVxuXHRcdC50b0lTT1N0cmluZygpXG5cdFx0LnJlcGxhY2UoL1QvLCAnICcpXG5cdFx0LnJlcGxhY2UoL1xcLi4rLywgZW5kKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZVRpbWU7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBmb3IgdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGRhdGVUaW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZWxlY3Ryb24gPSByZXF1aXJlKCdlbGVjdHJvbicpO1xuXG5pZiAodHlwZW9mIGVsZWN0cm9uID09PSAnc3RyaW5nJykge1xuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgcnVubmluZyBpbiBhbiBFbGVjdHJvbiBlbnZpcm9ubWVudCEnKTtcbn1cblxuY29uc3QgYXBwID0gZWxlY3Ryb24uYXBwIHx8IGVsZWN0cm9uLnJlbW90ZS5hcHA7XG5cbmNvbnN0IGlzRW52U2V0ID0gJ0VMRUNUUk9OX0lTX0RFVicgaW4gcHJvY2Vzcy5lbnY7XG5jb25zdCBnZXRGcm9tRW52ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuRUxFQ1RST05fSVNfREVWLCAxMCkgPT09IDE7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbnZTZXQgPyBnZXRGcm9tRW52IDogIWFwcC5pc1BhY2thZ2VkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge2luc3BlY3R9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGVsZWN0cm9uID0gcmVxdWlyZSgnZWxlY3Ryb24nKTtcbmNvbnN0IGNob2tpZGFyID0gcmVxdWlyZSgnY2hva2lkYXInKTtcbmNvbnN0IGlzRGV2ID0gcmVxdWlyZSgnZWxlY3Ryb24taXMtZGV2Jyk7XG5jb25zdCBkYXRlVGltZSA9IHJlcXVpcmUoJ2RhdGUtdGltZScpO1xuY29uc3QgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpO1xuY29uc3QgZmluZFVwID0gcmVxdWlyZSgnZmluZC11cCcpO1xuXG5mdW5jdGlvbiBnZXRNYWluUHJvY2Vzc1BhdGhzKHRvcE1vZHVsZU9iamVjdCwgY3dkKSB7XG5cdGNvbnN0IHBhdGhzID0gbmV3IFNldChbdG9wTW9kdWxlT2JqZWN0LmZpbGVuYW1lXSk7XG5cblx0Y29uc3QgZ2V0UGF0aHMgPSBtb2R1bGVPYmplY3QgPT4ge1xuXHRcdGZvciAoY29uc3QgY2hpbGQgb2YgbW9kdWxlT2JqZWN0LmNoaWxkcmVuKSB7XG5cdFx0XHRpZiAocGF0aC5yZWxhdGl2ZShjd2QsIGNoaWxkLmZpbGVuYW1lKS5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHBhdGhzLmFkZChjaGlsZC5maWxlbmFtZSk7XG5cdFx0XHRnZXRQYXRocyhjaGlsZCk7XG5cdFx0fVxuXHR9O1xuXG5cdGdldFBhdGhzKHRvcE1vZHVsZU9iamVjdCk7XG5cblx0cmV0dXJuIHBhdGhzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChtb2R1bGVPYmplY3QsIG9wdGlvbnMpID0+IHtcblx0Ly8gVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGEgZGV2IGRlcGVuZGVuY3ksIGJ1dCBndWFyZFxuXHQvLyB0aGlzIGluIGNhc2UgdGhlIHVzZXIgaW5jbHVkZWQgaXQgYXMgYSBkZXBlbmRlbmN5LlxuXHRpZiAoIWlzRGV2KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKCFtb2R1bGVPYmplY3QpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIHBhc3MgdGhlIGBtb2R1bGVgIG9iamVjdCcpO1xuXHR9XG5cblx0b3B0aW9ucyA9IHtcblx0XHR3YXRjaFJlbmRlcmVyOiB0cnVlLFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRjb25zdCBtYWluUHJvY2Vzc0RpcmVjdG9yeSA9IHBhdGguZGlybmFtZShtb2R1bGVPYmplY3QuZmlsZW5hbWUpO1xuXHRjb25zdCBwYWNrYWdlRGlyZWN0b3J5ID0gZmluZFVwLnN5bmMoJ3BhY2thZ2UuanNvbicsIHtjd2Q6IG1haW5Qcm9jZXNzRGlyZWN0b3J5fSk7XG5cdGNvbnN0IGN3ZCA9IHBhY2thZ2VEaXJlY3RvcnkgPyBwYXRoLmRpcm5hbWUocGFja2FnZURpcmVjdG9yeSkgOiBtYWluUHJvY2Vzc0RpcmVjdG9yeTtcblx0Y29uc3QgbWFpblByb2Nlc3NQYXRocyA9IGdldE1haW5Qcm9jZXNzUGF0aHMobW9kdWxlT2JqZWN0LCBjd2QpO1xuXHRjb25zdCB3YXRjaFBhdGhzID0gb3B0aW9ucy53YXRjaFJlbmRlcmVyID8gY3dkIDogWy4uLm1haW5Qcm9jZXNzUGF0aHNdO1xuXHRsZXQgaXNSZWxhdW5jaGluZyA9IGZhbHNlO1xuXG5cdGNvbnN0IHdhdGNoZXIgPSBjaG9raWRhci53YXRjaCh3YXRjaFBhdGhzLCB7XG5cdFx0Y3dkLFxuXHRcdGRpc2FibGVHbG9iYmluZzogdHJ1ZSxcblx0XHRpZ25vcmVkOiBbXG5cdFx0XHQvKF58Wy9cXFxcXSlcXC4uLywgLy8gRG90ZmlsZXNcblx0XHRcdCdub2RlX21vZHVsZXMnLFxuXHRcdFx0JyoqLyoubWFwJ1xuXHRcdF0uY29uY2F0KG9wdGlvbnMuaWdub3JlKVxuXHR9KTtcblxuXHRlbGVjdHJvbi5hcHAub24oJ3F1aXQnLCAoKSA9PiB7XG5cdFx0d2F0Y2hlci5jbG9zZSgpO1xuXHR9KTtcblxuXHRpZiAob3B0aW9ucy5kZWJ1Zykge1xuXHRcdHdhdGNoZXIub24oJ3JlYWR5JywgKCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ1dhdGNoZWQgcGF0aHM6JywgaW5zcGVjdCh3YXRjaGVyLmdldFdhdGNoZWQoKSwge2NvbXBhY3Q6IGZhbHNlLCBjb2xvcnM6IHRydWV9KSk7XG5cdFx0fSk7XG5cdH1cblxuXHR3YXRjaGVyLm9uKCdjaGFuZ2UnLCBmaWxlUGF0aCA9PiB7XG5cdFx0aWYgKG9wdGlvbnMuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdGaWxlIGNoYW5nZWQ6JywgY2hhbGsuYm9sZChmaWxlUGF0aCksIGNoYWxrLmRpbShgKCR7ZGF0ZVRpbWUoKS5zcGxpdCgnICcpWzFdfSlgKSk7XG5cdFx0fVxuXG5cdFx0aWYgKG1haW5Qcm9jZXNzUGF0aHMuaGFzKHBhdGguam9pbihjd2QsIGZpbGVQYXRoKSkpIHtcblx0XHRcdC8vIFByZXZlbnQgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIEVsZWN0cm9uIGZyb20gYmVpbmcgc3RhcnRlZCBkdWUgdG8gdGhlIGNoYW5nZVxuXHRcdFx0Ly8gaGFuZGxlciBiZWluZyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgYmVmb3JlIHRoZSBvcmlnaW5hbCBpbnN0YW5jZSBleGl0cy5cblx0XHRcdGlmICghaXNSZWxhdW5jaGluZykge1xuXHRcdFx0XHRlbGVjdHJvbi5hcHAucmVsYXVuY2goKTtcblx0XHRcdFx0ZWxlY3Ryb24uYXBwLmV4aXQoMCk7XG5cdFx0XHR9XG5cblx0XHRcdGlzUmVsYXVuY2hpbmcgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGNvbnN0IHdpbmRvd18gb2YgZWxlY3Ryb24uQnJvd3NlcldpbmRvdy5nZXRBbGxXaW5kb3dzKCkpIHtcblx0XHRcdFx0d2luZG93Xy53ZWJDb250ZW50cy5yZWxvYWRJZ25vcmluZ0NhY2hlKCk7XG5cblx0XHRcdFx0Zm9yIChjb25zdCB2aWV3XyBvZiB3aW5kb3dfLmdldEJyb3dzZXJWaWV3cygpKSB7XG5cdFx0XHRcdFx0dmlld18ud2ViQ29udGVudHMucmVsb2FkSWdub3JpbmdDYWNoZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAoZm4sIG9mZnNldCkgPT4gKC4uLmFyZ3MpID0+IHtcblx0Y29uc3QgY29kZSA9IGZuKC4uLmFyZ3MpO1xuXHRyZXR1cm4gYFxcdTAwMUJbJHtjb2RlICsgb2Zmc2V0fW1gO1xufTtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAoZm4sIG9mZnNldCkgPT4gKC4uLmFyZ3MpID0+IHtcblx0Y29uc3QgY29kZSA9IGZuKC4uLmFyZ3MpO1xuXHRyZXR1cm4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG59O1xuXG5jb25zdCB3cmFwQW5zaTE2bSA9IChmbiwgb2Zmc2V0KSA9PiAoLi4uYXJncykgPT4ge1xuXHRjb25zdCByZ2IgPSBmbiguLi5hcmdzKTtcblx0cmV0dXJuIGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZ2JbMF19OyR7cmdiWzFdfTske3JnYlsyXX1tYDtcbn07XG5cbmNvbnN0IGFuc2kyYW5zaSA9IG4gPT4gbjtcbmNvbnN0IHJnYjJyZ2IgPSAociwgZywgYikgPT4gW3IsIGcsIGJdO1xuXG5jb25zdCBzZXRMYXp5UHJvcGVydHkgPSAob2JqZWN0LCBwcm9wZXJ0eSwgZ2V0KSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCB7XG5cdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGdldCgpO1xuXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwge1xuXHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRjb25maWd1cmFibGU6IHRydWVcblx0fSk7XG59O1xuXG4vKiogQHR5cGUge3R5cGVvZiBpbXBvcnQoJ2NvbG9yLWNvbnZlcnQnKX0gKi9cbmxldCBjb2xvckNvbnZlcnQ7XG5jb25zdCBtYWtlRHluYW1pY1N0eWxlcyA9ICh3cmFwLCB0YXJnZXRTcGFjZSwgaWRlbnRpdHksIGlzQmFja2dyb3VuZCkgPT4ge1xuXHRpZiAoY29sb3JDb252ZXJ0ID09PSB1bmRlZmluZWQpIHtcblx0XHRjb2xvckNvbnZlcnQgPSByZXF1aXJlKCdjb2xvci1jb252ZXJ0Jyk7XG5cdH1cblxuXHRjb25zdCBvZmZzZXQgPSBpc0JhY2tncm91bmQgPyAxMCA6IDA7XG5cdGNvbnN0IHN0eWxlcyA9IHt9O1xuXG5cdGZvciAoY29uc3QgW3NvdXJjZVNwYWNlLCBzdWl0ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29sb3JDb252ZXJ0KSkge1xuXHRcdGNvbnN0IG5hbWUgPSBzb3VyY2VTcGFjZSA9PT0gJ2Fuc2kxNicgPyAnYW5zaScgOiBzb3VyY2VTcGFjZTtcblx0XHRpZiAoc291cmNlU3BhY2UgPT09IHRhcmdldFNwYWNlKSB7XG5cdFx0XHRzdHlsZXNbbmFtZV0gPSB3cmFwKGlkZW50aXR5LCBvZmZzZXQpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHN1aXRlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0c3R5bGVzW25hbWVdID0gd3JhcChzdWl0ZVt0YXJnZXRTcGFjZV0sIG9mZnNldCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn07XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3R5bGVzKCkge1xuXHRjb25zdCBjb2RlcyA9IG5ldyBNYXAoKTtcblx0Y29uc3Qgc3R5bGVzID0ge1xuXHRcdG1vZGlmaWVyOiB7XG5cdFx0XHRyZXNldDogWzAsIDBdLFxuXHRcdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdFx0Ym9sZDogWzEsIDIyXSxcblx0XHRcdGRpbTogWzIsIDIyXSxcblx0XHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHRcdHVuZGVybGluZTogWzQsIDI0XSxcblx0XHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0XHRoaWRkZW46IFs4LCAyOF0sXG5cdFx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdFx0cmVkOiBbMzEsIDM5XSxcblx0XHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0XHRibHVlOiBbMzQsIDM5XSxcblx0XHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0XHR3aGl0ZTogWzM3LCAzOV0sXG5cblx0XHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHRcdHllbGxvd0JyaWdodDogWzkzLCAzOV0sXG5cdFx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdFx0Y3lhbkJyaWdodDogWzk2LCAzOV0sXG5cdFx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV1cblx0XHR9LFxuXHRcdGJnQ29sb3I6IHtcblx0XHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdFx0YmdSZWQ6IFs0MSwgNDldLFxuXHRcdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0XHRiZ0JsdWU6IFs0NCwgNDldLFxuXHRcdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0XHRiZ1doaXRlOiBbNDcsIDQ5XSxcblxuXHRcdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdFx0YmdHcmVlbkJyaWdodDogWzEwMiwgNDldLFxuXHRcdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdFx0YmdNYWdlbnRhQnJpZ2h0OiBbMTA1LCA0OV0sXG5cdFx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XVxuXHRcdH1cblx0fTtcblxuXHQvLyBBbGlhcyBicmlnaHQgYmxhY2sgYXMgZ3JheSAoYW5kIGdyZXkpXG5cdHN0eWxlcy5jb2xvci5ncmF5ID0gc3R5bGVzLmNvbG9yLmJsYWNrQnJpZ2h0O1xuXHRzdHlsZXMuYmdDb2xvci5iZ0dyYXkgPSBzdHlsZXMuYmdDb2xvci5iZ0JsYWNrQnJpZ2h0O1xuXHRzdHlsZXMuY29sb3IuZ3JleSA9IHN0eWxlcy5jb2xvci5ibGFja0JyaWdodDtcblx0c3R5bGVzLmJnQ29sb3IuYmdHcmV5ID0gc3R5bGVzLmJnQ29sb3IuYmdCbGFja0JyaWdodDtcblxuXHRmb3IgKGNvbnN0IFtncm91cE5hbWUsIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZ3JvdXApKSB7XG5cdFx0XHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRcdFx0b3BlbjogYFxcdTAwMUJbJHtzdHlsZVswXX1tYCxcblx0XHRcdFx0Y2xvc2U6IGBcXHUwMDFCWyR7c3R5bGVbMV19bWBcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHR9KTtcblxuXHRzdHlsZXMuY29sb3IuY2xvc2UgPSAnXFx1MDAxQlszOW0nO1xuXHRzdHlsZXMuYmdDb2xvci5jbG9zZSA9ICdcXHUwMDFCWzQ5bSc7XG5cblx0c2V0TGF6eVByb3BlcnR5KHN0eWxlcy5jb2xvciwgJ2Fuc2knLCAoKSA9PiBtYWtlRHluYW1pY1N0eWxlcyh3cmFwQW5zaTE2LCAnYW5zaTE2JywgYW5zaTJhbnNpLCBmYWxzZSkpO1xuXHRzZXRMYXp5UHJvcGVydHkoc3R5bGVzLmNvbG9yLCAnYW5zaTI1NicsICgpID0+IG1ha2VEeW5hbWljU3R5bGVzKHdyYXBBbnNpMjU2LCAnYW5zaTI1NicsIGFuc2kyYW5zaSwgZmFsc2UpKTtcblx0c2V0TGF6eVByb3BlcnR5KHN0eWxlcy5jb2xvciwgJ2Fuc2kxNm0nLCAoKSA9PiBtYWtlRHluYW1pY1N0eWxlcyh3cmFwQW5zaTE2bSwgJ3JnYicsIHJnYjJyZ2IsIGZhbHNlKSk7XG5cdHNldExhenlQcm9wZXJ0eShzdHlsZXMuYmdDb2xvciwgJ2Fuc2knLCAoKSA9PiBtYWtlRHluYW1pY1N0eWxlcyh3cmFwQW5zaTE2LCAnYW5zaTE2JywgYW5zaTJhbnNpLCB0cnVlKSk7XG5cdHNldExhenlQcm9wZXJ0eShzdHlsZXMuYmdDb2xvciwgJ2Fuc2kyNTYnLCAoKSA9PiBtYWtlRHluYW1pY1N0eWxlcyh3cmFwQW5zaTI1NiwgJ2Fuc2kyNTYnLCBhbnNpMmFuc2ksIHRydWUpKTtcblx0c2V0TGF6eVByb3BlcnR5KHN0eWxlcy5iZ0NvbG9yLCAnYW5zaTE2bScsICgpID0+IG1ha2VEeW5hbWljU3R5bGVzKHdyYXBBbnNpMTZtLCAncmdiJywgcmdiMnJnYiwgdHJ1ZSkpO1xuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbi8vIE1ha2UgdGhlIGV4cG9ydCBpbW11dGFibGVcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRnZXQ6IGFzc2VtYmxlU3R5bGVzXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGFuc2lTdHlsZXMgPSByZXF1aXJlKCdhbnNpLXN0eWxlcycpO1xuY29uc3Qge3N0ZG91dDogc3Rkb3V0Q29sb3IsIHN0ZGVycjogc3RkZXJyQ29sb3J9ID0gcmVxdWlyZSgnc3VwcG9ydHMtY29sb3InKTtcbmNvbnN0IHtcblx0c3RyaW5nUmVwbGFjZUFsbCxcblx0c3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4XG59ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJ1xuXTtcblxuY29uc3Qgc3R5bGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuY29uc3QgYXBwbHlPcHRpb25zID0gKG9iamVjdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmIChvcHRpb25zLmxldmVsICYmICEoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxldmVsKSAmJiBvcHRpb25zLmxldmVsID49IDAgJiYgb3B0aW9ucy5sZXZlbCA8PSAzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBsZXZlbGAgb3B0aW9uIHNob3VsZCBiZSBhbiBpbnRlZ2VyIGZyb20gMCB0byAzJyk7XG5cdH1cblxuXHQvLyBEZXRlY3QgbGV2ZWwgaWYgbm90IHNldCBtYW51YWxseVxuXHRjb25zdCBjb2xvckxldmVsID0gc3Rkb3V0Q29sb3IgPyBzdGRvdXRDb2xvci5sZXZlbCA6IDA7XG5cdG9iamVjdC5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgPT09IHVuZGVmaW5lZCA/IGNvbG9yTGV2ZWwgOiBvcHRpb25zLmxldmVsO1xufTtcblxuY2xhc3MgQ2hhbGtDbGFzcyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSB7fTtcblx0YXBwbHlPcHRpb25zKGNoYWxrLCBvcHRpb25zKTtcblxuXHRjaGFsay50ZW1wbGF0ZSA9ICguLi5hcmd1bWVudHNfKSA9PiBjaGFsa1RhZyhjaGFsay50ZW1wbGF0ZSwgLi4uYXJndW1lbnRzXyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBDaGFsay5wcm90b3R5cGUpO1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhbGsudGVtcGxhdGUsIGNoYWxrKTtcblxuXHRjaGFsay50ZW1wbGF0ZS5jb25zdHJ1Y3RvciA9ICgpID0+IHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2BjaGFsay5jb25zdHJ1Y3RvcigpYCBpcyBkZXByZWNhdGVkLiBVc2UgYG5ldyBjaGFsay5JbnN0YW5jZSgpYCBpbnN0ZWFkLicpO1xuXHR9O1xuXG5cdGNoYWxrLnRlbXBsYXRlLkluc3RhbmNlID0gQ2hhbGtDbGFzcztcblxuXHRyZXR1cm4gY2hhbGsudGVtcGxhdGU7XG59O1xuXG5mdW5jdGlvbiBDaGFsayhvcHRpb25zKSB7XG5cdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbmZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGFuc2lTdHlsZXMpKSB7XG5cdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIGNyZWF0ZVN0eWxlcihzdHlsZS5vcGVuLCBzdHlsZS5jbG9zZSwgdGhpcy5fc3R5bGVyKSwgdGhpcy5faXNFbXB0eSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH1cblx0fTtcbn1cblxuc3R5bGVzLnZpc2libGUgPSB7XG5cdGdldCgpIHtcblx0XHRjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcih0aGlzLCB0aGlzLl9zdHlsZXIsIHRydWUpO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmlzaWJsZScsIHt2YWx1ZTogYnVpbGRlcn0pO1xuXHRcdHJldHVybiBidWlsZGVyO1xuXHR9XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2tleXdvcmQnLCAnaHNsJywgJ2hzdicsICdod2InLCAnYW5zaScsICdhbnNpMjU2J107XG5cbmZvciAoY29uc3QgbW9kZWwgb2YgdXNlZE1vZGVscykge1xuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihhbnNpU3R5bGVzLmNvbG9yW2xldmVsTWFwcGluZ1tsZXZlbF1dW21vZGVsXSguLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5jb2xvci5jbG9zZSwgdGhpcy5fc3R5bGVyKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzLl9pc0VtcHR5KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xufVxuXG5mb3IgKGNvbnN0IG1vZGVsIG9mIHVzZWRNb2RlbHMpIHtcblx0Y29uc3QgYmdNb2RlbCA9ICdiZycgKyBtb2RlbFswXS50b1VwcGVyQ2FzZSgpICsgbW9kZWwuc2xpY2UoMSk7XG5cdHN0eWxlc1tiZ01vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCB7bGV2ZWx9ID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdFx0XHRjb25zdCBzdHlsZXIgPSBjcmVhdGVTdHlsZXIoYW5zaVN0eWxlcy5iZ0NvbG9yW2xldmVsTWFwcGluZ1tsZXZlbF1dW21vZGVsXSguLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzLl9zdHlsZXIpO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXMuX2lzRW1wdHkpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHtcblx0Li4uc3R5bGVzLFxuXHRsZXZlbDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2dlbmVyYXRvci5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0dGhpcy5fZ2VuZXJhdG9yLmxldmVsID0gbGV2ZWw7XG5cdFx0fVxuXHR9XG59KTtcblxuY29uc3QgY3JlYXRlU3R5bGVyID0gKG9wZW4sIGNsb3NlLCBwYXJlbnQpID0+IHtcblx0bGV0IG9wZW5BbGw7XG5cdGxldCBjbG9zZUFsbDtcblx0aWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3BlbkFsbCA9IG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZTtcblx0fSBlbHNlIHtcblx0XHRvcGVuQWxsID0gcGFyZW50Lm9wZW5BbGwgKyBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2UgKyBwYXJlbnQuY2xvc2VBbGw7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9wZW4sXG5cdFx0Y2xvc2UsXG5cdFx0b3BlbkFsbCxcblx0XHRjbG9zZUFsbCxcblx0XHRwYXJlbnRcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJ1aWxkZXIgPSAoc2VsZiwgX3N0eWxlciwgX2lzRW1wdHkpID0+IHtcblx0Y29uc3QgYnVpbGRlciA9ICguLi5hcmd1bWVudHNfKSA9PiB7XG5cdFx0aWYgKGlzQXJyYXkoYXJndW1lbnRzX1swXSkgJiYgaXNBcnJheShhcmd1bWVudHNfWzBdLnJhdykpIHtcblx0XHRcdC8vIENhbGxlZCBhcyBhIHRlbXBsYXRlIGxpdGVyYWwsIGZvciBleGFtcGxlOiBjaGFsay5yZWRgMiArIDMgPSB7Ym9sZCAkezIrM319YFxuXHRcdFx0cmV0dXJuIGFwcGx5U3R5bGUoYnVpbGRlciwgY2hhbGtUYWcoYnVpbGRlciwgLi4uYXJndW1lbnRzXykpO1xuXHRcdH1cblxuXHRcdC8vIFNpbmdsZSBhcmd1bWVudCBpcyBob3QgcGF0aCwgaW1wbGljaXQgY29lcmNpb24gaXMgZmFzdGVyIHRoYW4gYW55dGhpbmdcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0XHRyZXR1cm4gYXBwbHlTdHlsZShidWlsZGVyLCAoYXJndW1lbnRzXy5sZW5ndGggPT09IDEpID8gKCcnICsgYXJndW1lbnRzX1swXSkgOiBhcmd1bWVudHNfLmpvaW4oJyAnKSk7XG5cdH07XG5cblx0Ly8gV2UgYWx0ZXIgdGhlIHByb3RvdHlwZSBiZWNhdXNlIHdlIG11c3QgcmV0dXJuIGEgZnVuY3Rpb24sIGJ1dCB0aGVyZSBpc1xuXHQvLyBubyB3YXkgdG8gY3JlYXRlIGEgZnVuY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBwcm90b3R5cGVcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1aWxkZXIsIHByb3RvKTtcblxuXHRidWlsZGVyLl9nZW5lcmF0b3IgPSBzZWxmO1xuXHRidWlsZGVyLl9zdHlsZXIgPSBfc3R5bGVyO1xuXHRidWlsZGVyLl9pc0VtcHR5ID0gX2lzRW1wdHk7XG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59O1xuXG5jb25zdCBhcHBseVN0eWxlID0gKHNlbGYsIHN0cmluZykgPT4ge1xuXHRpZiAoc2VsZi5sZXZlbCA8PSAwIHx8ICFzdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VsZi5faXNFbXB0eSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGYuX3N0eWxlcjtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmRleE9mKCdcXHUwMDFCJykgIT09IC0xKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxubGV0IHRlbXBsYXRlO1xuY29uc3QgY2hhbGtUYWcgPSAoY2hhbGssIC4uLnN0cmluZ3MpID0+IHtcblx0Y29uc3QgW2ZpcnN0U3RyaW5nXSA9IHN0cmluZ3M7XG5cblx0aWYgKCFpc0FycmF5KGZpcnN0U3RyaW5nKSB8fCAhaXNBcnJheShmaXJzdFN0cmluZy5yYXcpKSB7XG5cdFx0Ly8gSWYgY2hhbGsoKSB3YXMgY2FsbGVkIGJ5IGl0c2VsZiBvciB3aXRoIGEgc3RyaW5nLFxuXHRcdC8vIHJldHVybiB0aGUgc3RyaW5nIGl0c2VsZiBhcyBhIHN0cmluZy5cblx0XHRyZXR1cm4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdH1cblxuXHRjb25zdCBhcmd1bWVudHNfID0gc3RyaW5ncy5zbGljZSgxKTtcblx0Y29uc3QgcGFydHMgPSBbZmlyc3RTdHJpbmcucmF3WzBdXTtcblxuXHRmb3IgKGxldCBpID0gMTsgaSA8IGZpcnN0U3RyaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0cGFydHMucHVzaChcblx0XHRcdFN0cmluZyhhcmd1bWVudHNfW2kgLSAxXSkucmVwbGFjZSgvW3t9XFxcXF0vZywgJ1xcXFwkJicpLFxuXHRcdFx0U3RyaW5nKGZpcnN0U3RyaW5nLnJhd1tpXSlcblx0XHQpO1xuXHR9XG5cblx0aWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcblx0XHR0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzJyk7XG5cdH1cblxuXHRyZXR1cm4gdGVtcGxhdGUoY2hhbGssIHBhcnRzLmpvaW4oJycpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxuY29uc3QgY2hhbGsgPSBDaGFsaygpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbmNoYWxrLnN1cHBvcnRzQ29sb3IgPSBzdGRvdXRDb2xvcjtcbmNoYWxrLnN0ZGVyciA9IENoYWxrKHtsZXZlbDogc3RkZXJyQ29sb3IgPyBzdGRlcnJDb2xvci5sZXZlbCA6IDB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG5jaGFsay5zdGRlcnIuc3VwcG9ydHNDb2xvciA9IHN0ZGVyckNvbG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYWxrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgVEVNUExBVEVfUkVHRVggPSAvKD86XFxcXCh1KD86W2EtZlxcZF17NH18XFx7W2EtZlxcZF17MSw2fVxcfSl8eFthLWZcXGRdezJ9fC4pKXwoPzpcXHsofik/KFxcdysoPzpcXChbXildKlxcKSk/KD86XFwuXFx3Kyg/OlxcKFteKV0qXFwpKT8pKikoPzpbIFxcdF18KD89XFxyP1xcbikpKXwoXFx9KXwoKD86LnxbXFxyXFxuXFxmXSkrPykvZ2k7XG5jb25zdCBTVFlMRV9SRUdFWCA9IC8oPzpefFxcLikoXFx3KykoPzpcXCgoW14pXSopXFwpKT8vZztcbmNvbnN0IFNUUklOR19SRUdFWCA9IC9eKFsnXCJdKSgoPzpcXFxcLnwoPyFcXDEpW15cXFxcXSkqKVxcMSQvO1xuY29uc3QgRVNDQVBFX1JFR0VYID0gL1xcXFwodSg/OlthLWZcXGRdezR9fHtbYS1mXFxkXXsxLDZ9fSl8eFthLWZcXGRdezJ9fC4pfChbXlxcXFxdKS9naTtcblxuY29uc3QgRVNDQVBFUyA9IG5ldyBNYXAoW1xuXHRbJ24nLCAnXFxuJ10sXG5cdFsncicsICdcXHInXSxcblx0Wyd0JywgJ1xcdCddLFxuXHRbJ2InLCAnXFxiJ10sXG5cdFsnZicsICdcXGYnXSxcblx0Wyd2JywgJ1xcdiddLFxuXHRbJzAnLCAnXFwwJ10sXG5cdFsnXFxcXCcsICdcXFxcJ10sXG5cdFsnZScsICdcXHUwMDFCJ10sXG5cdFsnYScsICdcXHUwMDA3J11cbl0pO1xuXG5mdW5jdGlvbiB1bmVzY2FwZShjKSB7XG5cdGNvbnN0IHUgPSBjWzBdID09PSAndSc7XG5cdGNvbnN0IGJyYWNrZXQgPSBjWzFdID09PSAneyc7XG5cblx0aWYgKCh1ICYmICFicmFja2V0ICYmIGMubGVuZ3RoID09PSA1KSB8fCAoY1swXSA9PT0gJ3gnICYmIGMubGVuZ3RoID09PSAzKSkge1xuXHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGMuc2xpY2UoMSksIDE2KSk7XG5cdH1cblxuXHRpZiAodSAmJiBicmFja2V0KSB7XG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KHBhcnNlSW50KGMuc2xpY2UoMiwgLTEpLCAxNikpO1xuXHR9XG5cblx0cmV0dXJuIEVTQ0FQRVMuZ2V0KGMpIHx8IGM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJndW1lbnRzKG5hbWUsIGFyZ3VtZW50c18pIHtcblx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRjb25zdCBjaHVua3MgPSBhcmd1bWVudHNfLnRyaW0oKS5zcGxpdCgvXFxzKixcXHMqL2cpO1xuXHRsZXQgbWF0Y2hlcztcblxuXHRmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuXHRcdGNvbnN0IG51bWJlciA9IE51bWJlcihjaHVuayk7XG5cdFx0aWYgKCFOdW1iZXIuaXNOYU4obnVtYmVyKSkge1xuXHRcdFx0cmVzdWx0cy5wdXNoKG51bWJlcik7XG5cdFx0fSBlbHNlIGlmICgobWF0Y2hlcyA9IGNodW5rLm1hdGNoKFNUUklOR19SRUdFWCkpKSB7XG5cdFx0XHRyZXN1bHRzLnB1c2gobWF0Y2hlc1syXS5yZXBsYWNlKEVTQ0FQRV9SRUdFWCwgKG0sIGVzY2FwZSwgY2hhcmFjdGVyKSA9PiBlc2NhcGUgPyB1bmVzY2FwZShlc2NhcGUpIDogY2hhcmFjdGVyKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBDaGFsayB0ZW1wbGF0ZSBzdHlsZSBhcmd1bWVudDogJHtjaHVua30gKGluIHN0eWxlICcke25hbWV9JylgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gcGFyc2VTdHlsZShzdHlsZSkge1xuXHRTVFlMRV9SRUdFWC5sYXN0SW5kZXggPSAwO1xuXG5cdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0bGV0IG1hdGNoZXM7XG5cblx0d2hpbGUgKChtYXRjaGVzID0gU1RZTEVfUkVHRVguZXhlYyhzdHlsZSkpICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgbmFtZSA9IG1hdGNoZXNbMV07XG5cblx0XHRpZiAobWF0Y2hlc1syXSkge1xuXHRcdFx0Y29uc3QgYXJncyA9IHBhcnNlQXJndW1lbnRzKG5hbWUsIG1hdGNoZXNbMl0pO1xuXHRcdFx0cmVzdWx0cy5wdXNoKFtuYW1lXS5jb25jYXQoYXJncykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRzLnB1c2goW25hbWVdKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gYnVpbGRTdHlsZShjaGFsaywgc3R5bGVzKSB7XG5cdGNvbnN0IGVuYWJsZWQgPSB7fTtcblxuXHRmb3IgKGNvbnN0IGxheWVyIG9mIHN0eWxlcykge1xuXHRcdGZvciAoY29uc3Qgc3R5bGUgb2YgbGF5ZXIuc3R5bGVzKSB7XG5cdFx0XHRlbmFibGVkW3N0eWxlWzBdXSA9IGxheWVyLmludmVyc2UgPyBudWxsIDogc3R5bGUuc2xpY2UoMSk7XG5cdFx0fVxuXHR9XG5cblx0bGV0IGN1cnJlbnQgPSBjaGFsaztcblx0Zm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVuYWJsZWQpKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICghKHN0eWxlTmFtZSBpbiBjdXJyZW50KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIENoYWxrIHN0eWxlOiAke3N0eWxlTmFtZX1gKTtcblx0XHR9XG5cblx0XHRjdXJyZW50ID0gc3R5bGVzLmxlbmd0aCA+IDAgPyBjdXJyZW50W3N0eWxlTmFtZV0oLi4uc3R5bGVzKSA6IGN1cnJlbnRbc3R5bGVOYW1lXTtcblx0fVxuXG5cdHJldHVybiBjdXJyZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChjaGFsaywgdGVtcG9yYXJ5KSA9PiB7XG5cdGNvbnN0IHN0eWxlcyA9IFtdO1xuXHRjb25zdCBjaHVua3MgPSBbXTtcblx0bGV0IGNodW5rID0gW107XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0dGVtcG9yYXJ5LnJlcGxhY2UoVEVNUExBVEVfUkVHRVgsIChtLCBlc2NhcGVDaGFyYWN0ZXIsIGludmVyc2UsIHN0eWxlLCBjbG9zZSwgY2hhcmFjdGVyKSA9PiB7XG5cdFx0aWYgKGVzY2FwZUNoYXJhY3Rlcikge1xuXHRcdFx0Y2h1bmsucHVzaCh1bmVzY2FwZShlc2NhcGVDaGFyYWN0ZXIpKTtcblx0XHR9IGVsc2UgaWYgKHN0eWxlKSB7XG5cdFx0XHRjb25zdCBzdHJpbmcgPSBjaHVuay5qb2luKCcnKTtcblx0XHRcdGNodW5rID0gW107XG5cdFx0XHRjaHVua3MucHVzaChzdHlsZXMubGVuZ3RoID09PSAwID8gc3RyaW5nIDogYnVpbGRTdHlsZShjaGFsaywgc3R5bGVzKShzdHJpbmcpKTtcblx0XHRcdHN0eWxlcy5wdXNoKHtpbnZlcnNlLCBzdHlsZXM6IHBhcnNlU3R5bGUoc3R5bGUpfSk7XG5cdFx0fSBlbHNlIGlmIChjbG9zZSkge1xuXHRcdFx0aWYgKHN0eWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGb3VuZCBleHRyYW5lb3VzIH0gaW4gQ2hhbGsgdGVtcGxhdGUgbGl0ZXJhbCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRjaHVua3MucHVzaChidWlsZFN0eWxlKGNoYWxrLCBzdHlsZXMpKGNodW5rLmpvaW4oJycpKSk7XG5cdFx0XHRjaHVuayA9IFtdO1xuXHRcdFx0c3R5bGVzLnBvcCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaHVuay5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHR9KTtcblxuXHRjaHVua3MucHVzaChjaHVuay5qb2luKCcnKSk7XG5cblx0aWYgKHN0eWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgZXJyTWVzc2FnZSA9IGBDaGFsayB0ZW1wbGF0ZSBsaXRlcmFsIGlzIG1pc3NpbmcgJHtzdHlsZXMubGVuZ3RofSBjbG9zaW5nIGJyYWNrZXQke3N0eWxlcy5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gKFxcYH1cXGApYDtcblx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyTWVzc2FnZSk7XG5cdH1cblxuXHRyZXR1cm4gY2h1bmtzLmpvaW4oJycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3RyaW5nUmVwbGFjZUFsbCA9IChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpID0+IHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zdWJzdHIoZW5kSW5kZXgsIGluZGV4IC0gZW5kSW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zdWJzdHIoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59O1xuXG5jb25zdCBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXggPSAoc3RyaW5nLCBwcmVmaXgsIHBvc3RmaXgsIGluZGV4KSA9PiB7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0Y29uc3QgZ290Q1IgPSBzdHJpbmdbaW5kZXggLSAxXSA9PT0gJ1xccic7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnN1YnN0cihlbmRJbmRleCwgKGdvdENSID8gaW5kZXggLSAxIDogaW5kZXgpIC0gZW5kSW5kZXgpICsgcHJlZml4ICsgKGdvdENSID8gJ1xcclxcbicgOiAnXFxuJykgKyBwb3N0Zml4O1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyAxO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc3Vic3RyKGVuZEluZGV4KTtcblx0cmV0dXJuIHJldHVyblZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleFxufTtcbiIsIi8qIE1JVCBsaWNlbnNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmNvbnN0IGNzc0tleXdvcmRzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpO1xuXG4vLyBOT1RFOiBjb252ZXJzaW9ucyBzaG91bGQgb25seSByZXR1cm4gcHJpbWl0aXZlIHZhbHVlcyAoaS5lLiBhcnJheXMsIG9yXG4vLyAgICAgICB2YWx1ZXMgdGhhdCBnaXZlIGNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cykuXG4vLyAgICAgICBkbyBub3QgdXNlIGJveCB2YWx1ZXMgdHlwZXMgKGkuZS4gTnVtYmVyKCksIFN0cmluZygpLCBldGMuKVxuXG5jb25zdCByZXZlcnNlS2V5d29yZHMgPSB7fTtcbmZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRyZXZlcnNlS2V5d29yZHNbY3NzS2V5d29yZHNba2V5XV0gPSBrZXk7XG59XG5cbmNvbnN0IGNvbnZlcnQgPSB7XG5cdHJnYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdyZ2InfSxcblx0aHNsOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzbCd9LFxuXHRoc3Y6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHN2J30sXG5cdGh3Yjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdod2InfSxcblx0Y215azoge2NoYW5uZWxzOiA0LCBsYWJlbHM6ICdjbXlrJ30sXG5cdHh5ejoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICd4eXonfSxcblx0bGFiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xhYid9LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdGhleDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnaGV4J119LFxuXHRrZXl3b3JkOiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydrZXl3b3JkJ119LFxuXHRhbnNpMTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kxNiddfSxcblx0YW5zaTI1Njoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTI1NiddfSxcblx0aGNnOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydoJywgJ2MnLCAnZyddfSxcblx0YXBwbGU6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ3IxNicsICdnMTYnLCAnYjE2J119LFxuXHRncmF5OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydncmF5J119XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG5cbi8vIEhpZGUgLmNoYW5uZWxzIGFuZCAubGFiZWxzIHByb3BlcnRpZXNcbmZvciAoY29uc3QgbW9kZWwgb2YgT2JqZWN0LmtleXMoY29udmVydCkpIHtcblx0aWYgKCEoJ2NoYW5uZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoISgnbGFiZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbCBsYWJlbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoY29udmVydFttb2RlbF0ubGFiZWxzLmxlbmd0aCAhPT0gY29udmVydFttb2RlbF0uY2hhbm5lbHMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NoYW5uZWwgYW5kIGxhYmVsIGNvdW50cyBtaXNtYXRjaDogJyArIG1vZGVsKTtcblx0fVxuXG5cdGNvbnN0IHtjaGFubmVscywgbGFiZWxzfSA9IGNvbnZlcnRbbW9kZWxdO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGxhYmVsc30pO1xufVxuXG5jb252ZXJ0LnJnYi5oc2wgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHRjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0Y29uc3QgZGVsdGEgPSBtYXggLSBtaW47XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fSBlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXHR9XG5cblx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGNvbnN0IGwgPSAobWluICsgbWF4KSAvIDI7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSBpZiAobCA8PSAwLjUpIHtcblx0XHRzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcblx0fSBlbHNlIHtcblx0XHRzID0gZGVsdGEgLyAoMiAtIG1heCAtIG1pbik7XG5cdH1cblxuXHRyZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuaHN2ID0gZnVuY3Rpb24gKHJnYikge1xuXHRsZXQgcmRpZjtcblx0bGV0IGdkaWY7XG5cdGxldCBiZGlmO1xuXHRsZXQgaDtcblx0bGV0IHM7XG5cblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgdiA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHRjb25zdCBkaWZmID0gdiAtIE1hdGgubWluKHIsIGcsIGIpO1xuXHRjb25zdCBkaWZmYyA9IGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuICh2IC0gYykgLyA2IC8gZGlmZiArIDEgLyAyO1xuXHR9O1xuXG5cdGlmIChkaWZmID09PSAwKSB7XG5cdFx0aCA9IDA7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRpZmYgLyB2O1xuXHRcdHJkaWYgPSBkaWZmYyhyKTtcblx0XHRnZGlmID0gZGlmZmMoZyk7XG5cdFx0YmRpZiA9IGRpZmZjKGIpO1xuXG5cdFx0aWYgKHIgPT09IHYpIHtcblx0XHRcdGggPSBiZGlmIC0gZ2RpZjtcblx0XHR9IGVsc2UgaWYgKGcgPT09IHYpIHtcblx0XHRcdGggPSAoMSAvIDMpICsgcmRpZiAtIGJkaWY7XG5cdFx0fSBlbHNlIGlmIChiID09PSB2KSB7XG5cdFx0XHRoID0gKDIgLyAzKSArIGdkaWYgLSByZGlmO1xuXHRcdH1cblxuXHRcdGlmIChoIDwgMCkge1xuXHRcdFx0aCArPSAxO1xuXHRcdH0gZWxzZSBpZiAoaCA+IDEpIHtcblx0XHRcdGggLT0gMTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdGggKiAzNjAsXG5cdFx0cyAqIDEwMCxcblx0XHR2ICogMTAwXG5cdF07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF07XG5cdGNvbnN0IGcgPSByZ2JbMV07XG5cdGxldCBiID0gcmdiWzJdO1xuXHRjb25zdCBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdGNvbnN0IHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHRjb25zdCBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGNvbnN0IGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0Y29uc3QgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHQvKlxuXHRcdFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuXHQqL1xuXHRyZXR1cm4gKFxuXHRcdCgoeFswXSAtIHlbMF0pICoqIDIpICtcblx0XHQoKHhbMV0gLSB5WzFdKSAqKiAyKSArXG5cdFx0KCh4WzJdIC0geVsyXSkgKiogMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0bGV0IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblx0bGV0IGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcblxuXHRmb3IgKGNvbnN0IGtleXdvcmQgb2YgT2JqZWN0LmtleXMoY3NzS2V5d29yZHMpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcblxuXHRcdC8vIENvbXB1dGUgY29tcGFyYXRpdmUgZGlzdGFuY2Vcblx0XHRjb25zdCBkaXN0YW5jZSA9IGNvbXBhcmF0aXZlRGlzdGFuY2UocmdiLCB2YWx1ZSk7XG5cblx0XHQvLyBDaGVjayBpZiBpdHMgbGVzcywgaWYgc28gc2V0IGFzIGNsb3Nlc3Rcblx0XHRpZiAoZGlzdGFuY2UgPCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdEtleXdvcmQgPSBrZXl3b3JkO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG59O1xuXG5jb252ZXJ0LmtleXdvcmQucmdiID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0cmV0dXJuIGNzc0tleXdvcmRzW2tleXdvcmRdO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHRsZXQgciA9IHJnYlswXSAvIDI1NTtcblx0bGV0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGxldCBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdC8vIEFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wNDA0NSA/ICgoKHIgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChyIC8gMTIuOTIpO1xuXHRnID0gZyA+IDAuMDQwNDUgPyAoKChnICsgMC4wNTUpIC8gMS4wNTUpICoqIDIuNCkgOiAoZyAvIDEyLjkyKTtcblx0YiA9IGIgPiAwLjA0MDQ1ID8gKCgoYiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKGIgLyAxMi45Mik7XG5cblx0Y29uc3QgeCA9IChyICogMC40MTI0KSArIChnICogMC4zNTc2KSArIChiICogMC4xODA1KTtcblx0Y29uc3QgeSA9IChyICogMC4yMTI2KSArIChnICogMC43MTUyKSArIChiICogMC4wNzIyKTtcblx0Y29uc3QgeiA9IChyICogMC4wMTkzKSArIChnICogMC4xMTkyKSArIChiICogMC45NTA1KTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0bGV0IHggPSB4eXpbMF07XG5cdGxldCB5ID0geHl6WzFdO1xuXHRsZXQgeiA9IHh5elsyXTtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyAoeSAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/ICh6ICoqICgxIC8gMykpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNjtcblx0Y29uc3QgYSA9IDUwMCAqICh4IC0geSk7XG5cdGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF0gLyAzNjA7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cdGxldCB0Mjtcblx0bGV0IHQzO1xuXHRsZXQgdmFsO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsID0gbCAqIDI1NTtcblx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHR9XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHR9IGVsc2Uge1xuXHRcdHQyID0gbCArIHMgLSBsICogcztcblx0fVxuXG5cdGNvbnN0IHQxID0gMiAqIGwgLSB0MjtcblxuXHRjb25zdCByZ2IgPSBbMCwgMCwgMF07XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0dDMgPSBoICsgMSAvIDMgKiAtKGkgLSAxKTtcblx0XHRpZiAodDMgPCAwKSB7XG5cdFx0XHR0MysrO1xuXHRcdH1cblxuXHRcdGlmICh0MyA+IDEpIHtcblx0XHRcdHQzLS07XG5cdFx0fVxuXG5cdFx0aWYgKDYgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdH0gZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbCA9IHQxO1xuXHRcdH1cblxuXHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF07XG5cdGxldCBzID0gaHNsWzFdIC8gMTAwO1xuXHRsZXQgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHNtaW4gPSBzO1xuXHRjb25zdCBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0Y29uc3QgdiA9IChsICsgcykgLyAyO1xuXHRjb25zdCBzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdIC8gNjA7XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGxldCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdGNvbnN0IGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0Y29uc3QgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHRjb25zdCBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdGNvbnN0IHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBbdiwgdCwgcF07XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cmV0dXJuIFtxLCB2LCBwXTtcblx0XHRjYXNlIDI6XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdGNhc2UgMzpcblx0XHRcdHJldHVybiBbcCwgcSwgdl07XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cmV0dXJuIFt0LCBwLCB2XTtcblx0XHRjYXNlIDU6XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHR9XG59O1xuXG5jb252ZXJ0Lmhzdi5oc2wgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF07XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGNvbnN0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IHZtaW4gPSBNYXRoLm1heCh2LCAwLjAxKTtcblx0bGV0IHNsO1xuXHRsZXQgbDtcblxuXHRsID0gKDIgLSBzKSAqIHY7XG5cdGNvbnN0IGxtaW4gPSAoMiAtIHMpICogdm1pbjtcblx0c2wgPSBzICogdm1pbjtcblx0c2wgLz0gKGxtaW4gPD0gMSkgPyBsbWluIDogMiAtIGxtaW47XG5cdHNsID0gc2wgfHwgMDtcblx0bCAvPSAyO1xuXG5cdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5jb252ZXJ0Lmh3Yi5yZ2IgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdGNvbnN0IGggPSBod2JbMF0gLyAzNjA7XG5cdGxldCB3aCA9IGh3YlsxXSAvIDEwMDtcblx0bGV0IGJsID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCByYXRpbyA9IHdoICsgYmw7XG5cdGxldCBmO1xuXG5cdC8vIFdoICsgYmwgY2FudCBiZSA+IDFcblx0aWYgKHJhdGlvID4gMSkge1xuXHRcdHdoIC89IHJhdGlvO1xuXHRcdGJsIC89IHJhdGlvO1xuXHR9XG5cblx0Y29uc3QgaSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuXHRjb25zdCB2ID0gMSAtIGJsO1xuXHRmID0gNiAqIGggLSBpO1xuXG5cdGlmICgoaSAmIDB4MDEpICE9PSAwKSB7XG5cdFx0ZiA9IDEgLSBmO1xuXHR9XG5cblx0Y29uc3QgbiA9IHdoICsgZiAqICh2IC0gd2gpOyAvLyBMaW5lYXIgaW50ZXJwb2xhdGlvblxuXG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lLG5vLW11bHRpLXNwYWNlcyAqL1xuXHRzd2l0Y2ggKGkpIHtcblx0XHRkZWZhdWx0OlxuXHRcdGNhc2UgNjpcblx0XHRjYXNlIDA6IHIgPSB2OyAgZyA9IG47ICBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMTogciA9IG47ICBnID0gdjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0Y2FzZSAyOiByID0gd2g7IGcgPSB2OyAgYiA9IG47IGJyZWFrO1xuXHRcdGNhc2UgMzogciA9IHdoOyBnID0gbjsgIGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDQ6IHIgPSBuOyAgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSA1OiByID0gdjsgIGcgPSB3aDsgYiA9IG47IGJyZWFrO1xuXHR9XG5cdC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzICovXG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQuY215ay5yZ2IgPSBmdW5jdGlvbiAoY215aykge1xuXHRjb25zdCBjID0gY215a1swXSAvIDEwMDtcblx0Y29uc3QgbSA9IGNteWtbMV0gLyAxMDA7XG5cdGNvbnN0IHkgPSBjbXlrWzJdIC8gMTAwO1xuXHRjb25zdCBrID0gY215a1szXSAvIDEwMDtcblxuXHRjb25zdCByID0gMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGcgPSAxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKTtcblx0Y29uc3QgYiA9IDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5yZ2IgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGNvbnN0IHggPSB4eXpbMF0gLyAxMDA7XG5cdGNvbnN0IHkgPSB4eXpbMV0gLyAxMDA7XG5cdGNvbnN0IHogPSB4eXpbMl0gLyAxMDA7XG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cblx0ciA9ICh4ICogMy4yNDA2KSArICh5ICogLTEuNTM3MikgKyAoeiAqIC0wLjQ5ODYpO1xuXHRnID0gKHggKiAtMC45Njg5KSArICh5ICogMS44NzU4KSArICh6ICogMC4wNDE1KTtcblx0YiA9ICh4ICogMC4wNTU3KSArICh5ICogLTAuMjA0MCkgKyAoeiAqIDEuMDU3MCk7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAociAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiByICogMTIuOTI7XG5cblx0ZyA9IGcgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAoZyAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBnICogMTIuOTI7XG5cblx0YiA9IGIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiAoYiAqKiAoMS4wIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBiICogMTIuOTI7XG5cblx0ciA9IE1hdGgubWluKE1hdGgubWF4KDAsIHIpLCAxKTtcblx0ZyA9IE1hdGgubWluKE1hdGgubWF4KDAsIGcpLCAxKTtcblx0YiA9IE1hdGgubWluKE1hdGgubWF4KDAsIGIpLCAxKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyAoeCAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQubGFiLnh5eiA9IGZ1bmN0aW9uIChsYWIpIHtcblx0Y29uc3QgbCA9IGxhYlswXTtcblx0Y29uc3QgYSA9IGxhYlsxXTtcblx0Y29uc3QgYiA9IGxhYlsyXTtcblx0bGV0IHg7XG5cdGxldCB5O1xuXHRsZXQgejtcblxuXHR5ID0gKGwgKyAxNikgLyAxMTY7XG5cdHggPSBhIC8gNTAwICsgeTtcblx0eiA9IHkgLSBiIC8gMjAwO1xuXG5cdGNvbnN0IHkyID0geSAqKiAzO1xuXHRjb25zdCB4MiA9IHggKiogMztcblx0Y29uc3QgejIgPSB6ICoqIDM7XG5cdHkgPSB5MiA+IDAuMDA4ODU2ID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiAwLjAwODg1NiA/IHgyIDogKHggLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eiA9IHoyID4gMC4wMDg4NTYgPyB6MiA6ICh6IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cblx0eCAqPSA5NS4wNDc7XG5cdHkgKj0gMTAwO1xuXHR6ICo9IDEwOC44ODM7XG5cblx0cmV0dXJuIFt4LCB5LCB6XTtcbn07XG5cbmNvbnZlcnQubGFiLmxjaCA9IGZ1bmN0aW9uIChsYWIpIHtcblx0Y29uc3QgbCA9IGxhYlswXTtcblx0Y29uc3QgYSA9IGxhYlsxXTtcblx0Y29uc3QgYiA9IGxhYlsyXTtcblx0bGV0IGg7XG5cblx0Y29uc3QgaHIgPSBNYXRoLmF0YW4yKGIsIGEpO1xuXHRoID0gaHIgKiAzNjAgLyAyIC8gTWF0aC5QSTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGNvbnN0IGMgPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG5cblx0cmV0dXJuIFtsLCBjLCBoXTtcbn07XG5cbmNvbnZlcnQubGNoLmxhYiA9IGZ1bmN0aW9uIChsY2gpIHtcblx0Y29uc3QgbCA9IGxjaFswXTtcblx0Y29uc3QgYyA9IGxjaFsxXTtcblx0Y29uc3QgaCA9IGxjaFsyXTtcblxuXHRjb25zdCBociA9IGggLyAzNjAgKiAyICogTWF0aC5QSTtcblx0Y29uc3QgYSA9IGMgKiBNYXRoLmNvcyhocik7XG5cdGNvbnN0IGIgPSBjICogTWF0aC5zaW4oaHIpO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncywgc2F0dXJhdGlvbiA9IG51bGwpIHtcblx0Y29uc3QgW3IsIGcsIGJdID0gYXJncztcblx0bGV0IHZhbHVlID0gc2F0dXJhdGlvbiA9PT0gbnVsbCA/IGNvbnZlcnQucmdiLmhzdihhcmdzKVsyXSA6IHNhdHVyYXRpb247IC8vIEhzdiAtPiBhbnNpMTYgb3B0aW1pemF0aW9uXG5cblx0dmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gNTApO1xuXG5cdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdHJldHVybiAzMDtcblx0fVxuXG5cdGxldCBhbnNpID0gMzBcblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIE9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgciA9IGFyZ3NbMF07XG5cdGNvbnN0IGcgPSBhcmdzWzFdO1xuXHRjb25zdCBiID0gYXJnc1syXTtcblxuXHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0aWYgKHIgPT09IGcgJiYgZyA9PT0gYikge1xuXHRcdGlmIChyIDwgOCkge1xuXHRcdFx0cmV0dXJuIDE2O1xuXHRcdH1cblxuXHRcdGlmIChyID4gMjQ4KSB7XG5cdFx0XHRyZXR1cm4gMjMxO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLnJvdW5kKCgociAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0fVxuXG5cdGNvbnN0IGFuc2kgPSAxNlxuXHRcdCsgKDM2ICogTWF0aC5yb3VuZChyIC8gMjU1ICogNSkpXG5cdFx0KyAoNiAqIE1hdGgucm91bmQoZyAvIDI1NSAqIDUpKVxuXHRcdCsgTWF0aC5yb3VuZChiIC8gMjU1ICogNSk7XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0LmFuc2kxNi5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRsZXQgY29sb3IgPSBhcmdzICUgMTA7XG5cblx0Ly8gSGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoY29sb3IgPT09IDAgfHwgY29sb3IgPT09IDcpIHtcblx0XHRpZiAoYXJncyA+IDUwKSB7XG5cdFx0XHRjb2xvciArPSAzLjU7XG5cdFx0fVxuXG5cdFx0Y29sb3IgPSBjb2xvciAvIDEwLjUgKiAyNTU7XG5cblx0XHRyZXR1cm4gW2NvbG9yLCBjb2xvciwgY29sb3JdO1xuXHR9XG5cblx0Y29uc3QgbXVsdCA9ICh+fihhcmdzID4gNTApICsgMSkgKiAwLjU7XG5cdGNvbnN0IHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5hbnNpMjU2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIEhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGFyZ3MgPj0gMjMyKSB7XG5cdFx0Y29uc3QgYyA9IChhcmdzIC0gMjMyKSAqIDEwICsgODtcblx0XHRyZXR1cm4gW2MsIGMsIGNdO1xuXHR9XG5cblx0YXJncyAtPSAxNjtcblxuXHRsZXQgcmVtO1xuXHRjb25zdCByID0gTWF0aC5mbG9vcihhcmdzIC8gMzYpIC8gNSAqIDI1NTtcblx0Y29uc3QgZyA9IE1hdGguZmxvb3IoKHJlbSA9IGFyZ3MgJSAzNikgLyA2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGIgPSAocmVtICUgNikgLyA1ICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oZXggPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZjAtOV17Nn18W2EtZjAtOV17M30vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0bGV0IGNvbG9yU3RyaW5nID0gbWF0Y2hbMF07XG5cblx0aWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMykge1xuXHRcdGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcuc3BsaXQoJycpLm1hcChjaGFyID0+IHtcblx0XHRcdHJldHVybiBjaGFyICsgY2hhcjtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdGNvbnN0IGludGVnZXIgPSBwYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXHRjb25zdCByID0gKGludGVnZXIgPj4gMTYpICYgMHhGRjtcblx0Y29uc3QgZyA9IChpbnRlZ2VyID4+IDgpICYgMHhGRjtcblx0Y29uc3QgYiA9IGludGVnZXIgJiAweEZGO1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oY2cgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IG1heCA9IE1hdGgubWF4KE1hdGgubWF4KHIsIGcpLCBiKTtcblx0Y29uc3QgbWluID0gTWF0aC5taW4oTWF0aC5taW4ociwgZyksIGIpO1xuXHRjb25zdCBjaHJvbWEgPSAobWF4IC0gbWluKTtcblx0bGV0IGdyYXlzY2FsZTtcblx0bGV0IGh1ZTtcblxuXHRpZiAoY2hyb21hIDwgMSkge1xuXHRcdGdyYXlzY2FsZSA9IG1pbiAvICgxIC0gY2hyb21hKTtcblx0fSBlbHNlIHtcblx0XHRncmF5c2NhbGUgPSAwO1xuXHR9XG5cblx0aWYgKGNocm9tYSA8PSAwKSB7XG5cdFx0aHVlID0gMDtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IHIpIHtcblx0XHRodWUgPSAoKGcgLSBiKSAvIGNocm9tYSkgJSA2O1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gZykge1xuXHRcdGh1ZSA9IDIgKyAoYiAtIHIpIC8gY2hyb21hO1xuXHR9IGVsc2Uge1xuXHRcdGh1ZSA9IDQgKyAociAtIGcpIC8gY2hyb21hO1xuXHR9XG5cblx0aHVlIC89IDY7XG5cdGh1ZSAlPSAxO1xuXG5cdHJldHVybiBbaHVlICogMzYwLCBjaHJvbWEgKiAxMDAsIGdyYXlzY2FsZSAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhzbC5oY2cgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cblx0Y29uc3QgYyA9IGwgPCAwLjUgPyAoMi4wICogcyAqIGwpIDogKDIuMCAqIHMgKiAoMS4wIC0gbCkpO1xuXG5cdGxldCBmID0gMDtcblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKGwgLSAwLjUgKiBjKSAvICgxLjAgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gcyAqIHY7XG5cdGxldCBmID0gMDtcblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHN2WzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLnJnYiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgaCA9IGhjZ1swXSAvIDM2MDtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRpZiAoYyA9PT0gMC4wKSB7XG5cdFx0cmV0dXJuIFtnICogMjU1LCBnICogMjU1LCBnICogMjU1XTtcblx0fVxuXG5cdGNvbnN0IHB1cmUgPSBbMCwgMCwgMF07XG5cdGNvbnN0IGhpID0gKGggJSAxKSAqIDY7XG5cdGNvbnN0IHYgPSBoaSAlIDE7XG5cdGNvbnN0IHcgPSAxIC0gdjtcblx0bGV0IG1nID0gMDtcblxuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXHRzd2l0Y2ggKE1hdGguZmxvb3IoaGkpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSB2OyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSB3OyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IHc7XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXG5cdG1nID0gKDEuMCAtIGMpICogZztcblxuXHRyZXR1cm4gW1xuXHRcdChjICogcHVyZVswXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMV0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzJdICsgbWcpICogMjU1XG5cdF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc3YgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0Y29uc3QgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHRsZXQgZiA9IDA7XG5cblx0aWYgKHYgPiAwLjApIHtcblx0XHRmID0gYyAvIHY7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgZiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc2wgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0Y29uc3QgbCA9IGcgKiAoMS4wIC0gYykgKyAwLjUgKiBjO1xuXHRsZXQgcyA9IDA7XG5cblx0aWYgKGwgPiAwLjAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlXG5cdGlmIChsID49IDAuNSAmJiBsIDwgMS4wKSB7XG5cdFx0cyA9IGMgLyAoMiAqICgxIC0gbCkpO1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHdiID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHJldHVybiBbaGNnWzBdLCAodiAtIGMpICogMTAwLCAoMSAtIHYpICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHdiLmhjZyA9IGZ1bmN0aW9uIChod2IpIHtcblx0Y29uc3QgdyA9IGh3YlsxXSAvIDEwMDtcblx0Y29uc3QgYiA9IGh3YlsyXSAvIDEwMDtcblx0Y29uc3QgdiA9IDEgLSBiO1xuXHRjb25zdCBjID0gdiAtIHc7XG5cdGxldCBnID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRnID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2h3YlswXSwgYyAqIDEwMCwgZyAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmFwcGxlLnJnYiA9IGZ1bmN0aW9uIChhcHBsZSkge1xuXHRyZXR1cm4gWyhhcHBsZVswXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMl0gLyA2NTUzNSkgKiAyNTVdO1xufTtcblxuY29udmVydC5yZ2IuYXBwbGUgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHJldHVybiBbKHJnYlswXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NTUzNSwgKHJnYlsyXSAvIDI1NSkgKiA2NTUzNV07XG59O1xuXG5jb252ZXJ0LmdyYXkucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFthcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1LCBhcmdzWzBdIC8gMTAwICogMjU1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc2wgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gWzAsIDAsIGFyZ3NbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmhzdiA9IGNvbnZlcnQuZ3JheS5oc2w7XG5cbmNvbnZlcnQuZ3JheS5od2IgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDEwMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuY215ayA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMCwgMCwgZ3JheVswXV07XG59O1xuXG5jb252ZXJ0LmdyYXkubGFiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFtncmF5WzBdLCAwLCAwXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oZXggPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRjb25zdCB2YWwgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0Y29uc3QgaW50ZWdlciA9ICh2YWwgPDwgMTYpICsgKHZhbCA8PCA4KSArIHZhbDtcblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgdmFsID0gKHJnYlswXSArIHJnYlsxXSArIHJnYlsyXSkgLyAzO1xuXHRyZXR1cm4gW3ZhbCAvIDI1NSAqIDEwMF07XG59O1xuIiwiY29uc3QgY29udmVyc2lvbnMgPSByZXF1aXJlKCcuL2NvbnZlcnNpb25zJyk7XG5jb25zdCByb3V0ZSA9IHJlcXVpcmUoJy4vcm91dGUnKTtcblxuY29uc3QgY29udmVydCA9IHt9O1xuXG5jb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIHdyYXBSYXcoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbihhcmdzKTtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbmZ1bmN0aW9uIHdyYXBSb3VuZGVkKGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0Y29uc3QgYXJnMCA9IGFyZ3NbMF07XG5cblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gV2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAobGV0IGxlbiA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gUHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5tb2RlbHMuZm9yRWFjaChmcm9tTW9kZWwgPT4ge1xuXHRjb252ZXJ0W2Zyb21Nb2RlbF0gPSB7fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnY2hhbm5lbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0uY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5sYWJlbHN9KTtcblxuXHRjb25zdCByb3V0ZXMgPSByb3V0ZShmcm9tTW9kZWwpO1xuXHRjb25zdCByb3V0ZU1vZGVscyA9IE9iamVjdC5rZXlzKHJvdXRlcyk7XG5cblx0cm91dGVNb2RlbHMuZm9yRWFjaCh0b01vZGVsID0+IHtcblx0XHRjb25zdCBmbiA9IHJvdXRlc1t0b01vZGVsXTtcblxuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXSA9IHdyYXBSb3VuZGVkKGZuKTtcblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0ucmF3ID0gd3JhcFJhdyhmbik7XG5cdH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDtcbiIsImNvbnN0IGNvbnZlcnNpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9ucycpO1xuXG4vKlxuXHRUaGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0Y29uc3QgZ3JhcGggPSB7fTtcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cblx0Zm9yIChsZXQgbGVuID0gbW9kZWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdGdyYXBoW21vZGVsc1tpXV0gPSB7XG5cdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS8xLXZzLWluZmluaXR5XG5cdFx0XHQvLyBtaWNyby1vcHQsIGJ1dCB0aGlzIGlzIHNpbXBsZS5cblx0XHRcdGRpc3RhbmNlOiAtMSxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZWFkdGgtZmlyc3Rfc2VhcmNoXG5mdW5jdGlvbiBkZXJpdmVCRlMoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHRjb25zdCBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyBVbnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gcXVldWUucG9wKCk7XG5cdFx0Y29uc3QgYWRqYWNlbnRzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnNbY3VycmVudF0pO1xuXG5cdFx0Zm9yIChsZXQgbGVuID0gYWRqYWNlbnRzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0Y29uc3QgYWRqYWNlbnQgPSBhZGphY2VudHNbaV07XG5cdFx0XHRjb25zdCBub2RlID0gZ3JhcGhbYWRqYWNlbnRdO1xuXG5cdFx0XHRpZiAobm9kZS5kaXN0YW5jZSA9PT0gLTEpIHtcblx0XHRcdFx0bm9kZS5kaXN0YW5jZSA9IGdyYXBoW2N1cnJlbnRdLmRpc3RhbmNlICsgMTtcblx0XHRcdFx0bm9kZS5wYXJlbnQgPSBjdXJyZW50O1xuXHRcdFx0XHRxdWV1ZS51bnNoaWZ0KGFkamFjZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbmZ1bmN0aW9uIGxpbmsoZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0cmV0dXJuIHRvKGZyb20oYXJncykpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCkge1xuXHRjb25zdCBwYXRoID0gW2dyYXBoW3RvTW9kZWxdLnBhcmVudCwgdG9Nb2RlbF07XG5cdGxldCBmbiA9IGNvbnZlcnNpb25zW2dyYXBoW3RvTW9kZWxdLnBhcmVudF1bdG9Nb2RlbF07XG5cblx0bGV0IGN1ciA9IGdyYXBoW3RvTW9kZWxdLnBhcmVudDtcblx0d2hpbGUgKGdyYXBoW2N1cl0ucGFyZW50KSB7XG5cdFx0cGF0aC51bnNoaWZ0KGdyYXBoW2N1cl0ucGFyZW50KTtcblx0XHRmbiA9IGxpbmsoY29udmVyc2lvbnNbZ3JhcGhbY3VyXS5wYXJlbnRdW2N1cl0sIGZuKTtcblx0XHRjdXIgPSBncmFwaFtjdXJdLnBhcmVudDtcblx0fVxuXG5cdGZuLmNvbnZlcnNpb24gPSBwYXRoO1xuXHRyZXR1cm4gZm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHRjb25zdCBncmFwaCA9IGRlcml2ZUJGUyhmcm9tTW9kZWwpO1xuXHRjb25zdCBjb252ZXJzaW9uID0ge307XG5cblx0Y29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoZ3JhcGgpO1xuXHRmb3IgKGxldCBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Y29uc3QgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHRjb25zdCBub2RlID0gZ3JhcGhbdG9Nb2RlbF07XG5cblx0XHRpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblx0XHRcdC8vIE5vIHBvc3NpYmxlIGNvbnZlcnNpb24sIG9yIHRoaXMgbm9kZSBpcyB0aGUgc291cmNlIG1vZGVsLlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udmVyc2lvblt0b01vZGVsXSA9IHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKTtcblx0fVxuXG5cdHJldHVybiBjb252ZXJzaW9uO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXHJcblx0XCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxyXG5cdFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXHJcblx0XCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXHJcblx0XCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXHJcblx0XCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxyXG5cdFwiYmxhY2tcIjogWzAsIDAsIDBdLFxyXG5cdFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxyXG5cdFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcclxuXHRcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXHJcblx0XCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxyXG5cdFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcclxuXHRcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcclxuXHRcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcclxuXHRcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcclxuXHRcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxyXG5cdFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxyXG5cdFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxyXG5cdFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxyXG5cdFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXHJcblx0XCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxyXG5cdFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcclxuXHRcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcclxuXHRcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXHJcblx0XCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxyXG5cdFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcclxuXHRcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcclxuXHRcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXHJcblx0XCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxyXG5cdFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXHJcblx0XCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxyXG5cdFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxyXG5cdFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcclxuXHRcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcclxuXHRcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxyXG5cdFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcclxuXHRcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxyXG5cdFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXHJcblx0XCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXHJcblx0XCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxyXG5cdFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcclxuXHRcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxyXG5cdFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxyXG5cdFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxyXG5cdFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJncmVlblwiOiBbMCwgMTI4LCAwXSxcclxuXHRcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxyXG5cdFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXHJcblx0XCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcclxuXHRcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxyXG5cdFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcclxuXHRcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcclxuXHRcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcclxuXHRcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcclxuXHRcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxyXG5cdFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXHJcblx0XCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxyXG5cdFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcclxuXHRcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxyXG5cdFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcclxuXHRcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcclxuXHRcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcclxuXHRcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxyXG5cdFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxyXG5cdFwibGlnaHRzZWFncmVlblwiOiBbMzIsIDE3OCwgMTcwXSxcclxuXHRcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXHJcblx0XCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXHJcblx0XCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXHJcblx0XCJsaW1lXCI6IFswLCAyNTUsIDBdLFxyXG5cdFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXHJcblx0XCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXHJcblx0XCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXHJcblx0XCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcclxuXHRcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXHJcblx0XCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXHJcblx0XCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTldLFxyXG5cdFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXHJcblx0XCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxyXG5cdFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcclxuXHRcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcclxuXHRcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcclxuXHRcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxyXG5cdFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcclxuXHRcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXHJcblx0XCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXHJcblx0XCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXHJcblx0XCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxyXG5cdFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXHJcblx0XCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxyXG5cdFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxyXG5cdFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXHJcblx0XCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxyXG5cdFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcclxuXHRcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxyXG5cdFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcclxuXHRcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxyXG5cdFwicGFsZXZpb2xldHJlZFwiOiBbMjE5LCAxMTIsIDE0N10sXHJcblx0XCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcclxuXHRcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXHJcblx0XCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxyXG5cdFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXHJcblx0XCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcclxuXHRcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxyXG5cdFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXHJcblx0XCJyZWJlY2NhcHVycGxlXCI6IFsxMDIsIDUxLCAxNTNdLFxyXG5cdFwicmVkXCI6IFsyNTUsIDAsIDBdLFxyXG5cdFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcclxuXHRcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcclxuXHRcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXHJcblx0XCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxyXG5cdFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcclxuXHRcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXHJcblx0XCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXHJcblx0XCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcclxuXHRcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXHJcblx0XCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcclxuXHRcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcclxuXHRcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXHJcblx0XCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxyXG5cdFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxyXG5cdFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcclxuXHRcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcclxuXHRcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxyXG5cdFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXHJcblx0XCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXHJcblx0XCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxyXG5cdFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxyXG5cdFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdLFxyXG5cdFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXHJcblx0XCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcclxuXHRcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2NhdGVQYXRoID0gcmVxdWlyZSgnbG9jYXRlLXBhdGgnKTtcbmNvbnN0IHBhdGhFeGlzdHMgPSByZXF1aXJlKCdwYXRoLWV4aXN0cycpO1xuXG5jb25zdCBzdG9wID0gU3ltYm9sKCdmaW5kVXAuc3RvcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChuYW1lLCBvcHRpb25zID0ge30pID0+IHtcblx0bGV0IGRpcmVjdG9yeSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCB8fCAnJyk7XG5cdGNvbnN0IHtyb290fSA9IHBhdGgucGFyc2UoZGlyZWN0b3J5KTtcblx0Y29uc3QgcGF0aHMgPSBbXS5jb25jYXQobmFtZSk7XG5cblx0Y29uc3QgcnVuTWF0Y2hlciA9IGFzeW5jIGxvY2F0ZU9wdGlvbnMgPT4ge1xuXHRcdGlmICh0eXBlb2YgbmFtZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIGxvY2F0ZVBhdGgocGF0aHMsIGxvY2F0ZU9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZvdW5kUGF0aCA9IGF3YWl0IG5hbWUobG9jYXRlT3B0aW9ucy5jd2QpO1xuXHRcdGlmICh0eXBlb2YgZm91bmRQYXRoID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGxvY2F0ZVBhdGgoW2ZvdW5kUGF0aF0sIGxvY2F0ZU9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmb3VuZFBhdGg7XG5cdH07XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0Y29uc3QgZm91bmRQYXRoID0gYXdhaXQgcnVuTWF0Y2hlcih7Li4ub3B0aW9ucywgY3dkOiBkaXJlY3Rvcnl9KTtcblxuXHRcdGlmIChmb3VuZFBhdGggPT09IHN0b3ApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZm91bmRQYXRoKSB7XG5cdFx0XHRyZXR1cm4gcGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgZm91bmRQYXRoKTtcblx0XHR9XG5cblx0XHRpZiAoZGlyZWN0b3J5ID09PSByb290KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGRpcmVjdG9yeSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLnN5bmMgPSAobmFtZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGxldCBkaXJlY3RvcnkgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QgfHwgJycpO1xuXHRjb25zdCB7cm9vdH0gPSBwYXRoLnBhcnNlKGRpcmVjdG9yeSk7XG5cdGNvbnN0IHBhdGhzID0gW10uY29uY2F0KG5hbWUpO1xuXG5cdGNvbnN0IHJ1bk1hdGNoZXIgPSBsb2NhdGVPcHRpb25zID0+IHtcblx0XHRpZiAodHlwZW9mIG5hbWUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBsb2NhdGVQYXRoLnN5bmMocGF0aHMsIGxvY2F0ZU9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZvdW5kUGF0aCA9IG5hbWUobG9jYXRlT3B0aW9ucy5jd2QpO1xuXHRcdGlmICh0eXBlb2YgZm91bmRQYXRoID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGxvY2F0ZVBhdGguc3luYyhbZm91bmRQYXRoXSwgbG9jYXRlT3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZvdW5kUGF0aDtcblx0fTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0Y29uc3QgZm91bmRQYXRoID0gcnVuTWF0Y2hlcih7Li4ub3B0aW9ucywgY3dkOiBkaXJlY3Rvcnl9KTtcblxuXHRcdGlmIChmb3VuZFBhdGggPT09IHN0b3ApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZm91bmRQYXRoKSB7XG5cdFx0XHRyZXR1cm4gcGF0aC5yZXNvbHZlKGRpcmVjdG9yeSwgZm91bmRQYXRoKTtcblx0XHR9XG5cblx0XHRpZiAoZGlyZWN0b3J5ID09PSByb290KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGRpcmVjdG9yeSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmV4aXN0cyA9IHBhdGhFeGlzdHM7XG5cbm1vZHVsZS5leHBvcnRzLnN5bmMuZXhpc3RzID0gcGF0aEV4aXN0cy5zeW5jO1xuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gc3RvcDtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCB7cHJvbWlzaWZ5fSA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IHBMb2NhdGUgPSByZXF1aXJlKCdwLWxvY2F0ZScpO1xuXG5jb25zdCBmc1N0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XG5jb25zdCBmc0xTdGF0ID0gcHJvbWlzaWZ5KGZzLmxzdGF0KTtcblxuY29uc3QgdHlwZU1hcHBpbmdzID0ge1xuXHRkaXJlY3Rvcnk6ICdpc0RpcmVjdG9yeScsXG5cdGZpbGU6ICdpc0ZpbGUnXG59O1xuXG5mdW5jdGlvbiBjaGVja1R5cGUoe3R5cGV9KSB7XG5cdGlmICh0eXBlIGluIHR5cGVNYXBwaW5ncykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0eXBlIHNwZWNpZmllZDogJHt0eXBlfWApO1xufVxuXG5jb25zdCBtYXRjaFR5cGUgPSAodHlwZSwgc3RhdCkgPT4gdHlwZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRbdHlwZU1hcHBpbmdzW3R5cGVdXSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChwYXRocywgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0ge1xuXHRcdGN3ZDogcHJvY2Vzcy5jd2QoKSxcblx0XHR0eXBlOiAnZmlsZScsXG5cdFx0YWxsb3dTeW1saW5rczogdHJ1ZSxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0Y2hlY2tUeXBlKG9wdGlvbnMpO1xuXG5cdGNvbnN0IHN0YXRGbiA9IG9wdGlvbnMuYWxsb3dTeW1saW5rcyA/IGZzU3RhdCA6IGZzTFN0YXQ7XG5cblx0cmV0dXJuIHBMb2NhdGUocGF0aHMsIGFzeW5jIHBhdGhfID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qgc3RhdCA9IGF3YWl0IHN0YXRGbihwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIHBhdGhfKSk7XG5cdFx0XHRyZXR1cm4gbWF0Y2hUeXBlKG9wdGlvbnMudHlwZSwgc3RhdCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9LCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnN5bmMgPSAocGF0aHMsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IHtcblx0XHRjd2Q6IHByb2Nlc3MuY3dkKCksXG5cdFx0YWxsb3dTeW1saW5rczogdHJ1ZSxcblx0XHR0eXBlOiAnZmlsZScsXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXG5cdGNoZWNrVHlwZShvcHRpb25zKTtcblxuXHRjb25zdCBzdGF0Rm4gPSBvcHRpb25zLmFsbG93U3ltbGlua3MgPyBmcy5zdGF0U3luYyA6IGZzLmxzdGF0U3luYztcblxuXHRmb3IgKGNvbnN0IHBhdGhfIG9mIHBhdGhzKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHN0YXQgPSBzdGF0Rm4ocGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkLCBwYXRoXykpO1xuXG5cdFx0XHRpZiAobWF0Y2hUeXBlKG9wdGlvbnMudHlwZSwgc3RhdCkpIHtcblx0XHRcdFx0cmV0dXJuIHBhdGhfO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2gge31cblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IFF1ZXVlID0gcmVxdWlyZSgneW9jdG8tcXVldWUnKTtcblxuY29uc3QgcExpbWl0ID0gY29uY3VycmVuY3kgPT4ge1xuXHRpZiAoISgoTnVtYmVyLmlzSW50ZWdlcihjb25jdXJyZW5jeSkgfHwgY29uY3VycmVuY3kgPT09IEluZmluaXR5KSAmJiBjb25jdXJyZW5jeSA+IDApKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGNvbmN1cnJlbmN5YCB0byBiZSBhIG51bWJlciBmcm9tIDEgYW5kIHVwJyk7XG5cdH1cblxuXHRjb25zdCBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXHRsZXQgYWN0aXZlQ291bnQgPSAwO1xuXG5cdGNvbnN0IG5leHQgPSAoKSA9PiB7XG5cdFx0YWN0aXZlQ291bnQtLTtcblxuXHRcdGlmIChxdWV1ZS5zaXplID4gMCkge1xuXHRcdFx0cXVldWUuZGVxdWV1ZSgpKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHJ1biA9IGFzeW5jIChmbiwgcmVzb2x2ZSwgLi4uYXJncykgPT4ge1xuXHRcdGFjdGl2ZUNvdW50Kys7XG5cblx0XHRjb25zdCByZXN1bHQgPSAoYXN5bmMgKCkgPT4gZm4oLi4uYXJncykpKCk7XG5cblx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgcmVzdWx0O1xuXHRcdH0gY2F0Y2gge31cblxuXHRcdG5leHQoKTtcblx0fTtcblxuXHRjb25zdCBlbnF1ZXVlID0gKGZuLCByZXNvbHZlLCAuLi5hcmdzKSA9PiB7XG5cdFx0cXVldWUuZW5xdWV1ZShydW4uYmluZChudWxsLCBmbiwgcmVzb2x2ZSwgLi4uYXJncykpO1xuXG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdC8vIFRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gd2FpdCB1bnRpbCB0aGUgbmV4dCBtaWNyb3Rhc2sgYmVmb3JlIGNvbXBhcmluZ1xuXHRcdFx0Ly8gYGFjdGl2ZUNvdW50YCB0byBgY29uY3VycmVuY3lgLCBiZWNhdXNlIGBhY3RpdmVDb3VudGAgaXMgdXBkYXRlZCBhc3luY2hyb25vdXNseVxuXHRcdFx0Ly8gd2hlbiB0aGUgcnVuIGZ1bmN0aW9uIGlzIGRlcXVldWVkIGFuZCBjYWxsZWQuIFRoZSBjb21wYXJpc29uIGluIHRoZSBpZi1zdGF0ZW1lbnRcblx0XHRcdC8vIG5lZWRzIHRvIGhhcHBlbiBhc3luY2hyb25vdXNseSBhcyB3ZWxsIHRvIGdldCBhbiB1cC10by1kYXRlIHZhbHVlIGZvciBgYWN0aXZlQ291bnRgLlxuXHRcdFx0YXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7XG5cblx0XHRcdGlmIChhY3RpdmVDb3VudCA8IGNvbmN1cnJlbmN5ICYmIHF1ZXVlLnNpemUgPiAwKSB7XG5cdFx0XHRcdHF1ZXVlLmRlcXVldWUoKSgpO1xuXHRcdFx0fVxuXHRcdH0pKCk7XG5cdH07XG5cblx0Y29uc3QgZ2VuZXJhdG9yID0gKGZuLCAuLi5hcmdzKSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRlbnF1ZXVlKGZuLCByZXNvbHZlLCAuLi5hcmdzKTtcblx0fSk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZ2VuZXJhdG9yLCB7XG5cdFx0YWN0aXZlQ291bnQ6IHtcblx0XHRcdGdldDogKCkgPT4gYWN0aXZlQ291bnRcblx0XHR9LFxuXHRcdHBlbmRpbmdDb3VudDoge1xuXHRcdFx0Z2V0OiAoKSA9PiBxdWV1ZS5zaXplXG5cdFx0fSxcblx0XHRjbGVhclF1ZXVlOiB7XG5cdFx0XHR2YWx1ZTogKCkgPT4ge1xuXHRcdFx0XHRxdWV1ZS5jbGVhcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGdlbmVyYXRvcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcExpbWl0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgcExpbWl0ID0gcmVxdWlyZSgncC1saW1pdCcpO1xuXG5jbGFzcyBFbmRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVxufVxuXG4vLyBUaGUgaW5wdXQgY2FuIGFsc28gYmUgYSBwcm9taXNlLCBzbyB3ZSBhd2FpdCBpdFxuY29uc3QgdGVzdEVsZW1lbnQgPSBhc3luYyAoZWxlbWVudCwgdGVzdGVyKSA9PiB0ZXN0ZXIoYXdhaXQgZWxlbWVudCk7XG5cbi8vIFRoZSBpbnB1dCBjYW4gYWxzbyBiZSBhIHByb21pc2UsIHNvIHdlIGBQcm9taXNlLmFsbCgpYCB0aGVtIGJvdGhcbmNvbnN0IGZpbmRlciA9IGFzeW5jIGVsZW1lbnQgPT4ge1xuXHRjb25zdCB2YWx1ZXMgPSBhd2FpdCBQcm9taXNlLmFsbChlbGVtZW50KTtcblx0aWYgKHZhbHVlc1sxXSA9PT0gdHJ1ZSkge1xuXHRcdHRocm93IG5ldyBFbmRFcnJvcih2YWx1ZXNbMF0pO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgcExvY2F0ZSA9IGFzeW5jIChpdGVyYWJsZSwgdGVzdGVyLCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0Y29uY3VycmVuY3k6IEluZmluaXR5LFxuXHRcdHByZXNlcnZlT3JkZXI6IHRydWUsXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXG5cdGNvbnN0IGxpbWl0ID0gcExpbWl0KG9wdGlvbnMuY29uY3VycmVuY3kpO1xuXG5cdC8vIFN0YXJ0IGFsbCB0aGUgcHJvbWlzZXMgY29uY3VycmVudGx5IHdpdGggb3B0aW9uYWwgbGltaXRcblx0Y29uc3QgaXRlbXMgPSBbLi4uaXRlcmFibGVdLm1hcChlbGVtZW50ID0+IFtlbGVtZW50LCBsaW1pdCh0ZXN0RWxlbWVudCwgZWxlbWVudCwgdGVzdGVyKV0pO1xuXG5cdC8vIENoZWNrIHRoZSBwcm9taXNlcyBlaXRoZXIgc2VyaWFsbHkgb3IgY29uY3VycmVudGx5XG5cdGNvbnN0IGNoZWNrTGltaXQgPSBwTGltaXQob3B0aW9ucy5wcmVzZXJ2ZU9yZGVyID8gMSA6IEluZmluaXR5KTtcblxuXHR0cnkge1xuXHRcdGF3YWl0IFByb21pc2UuYWxsKGl0ZW1zLm1hcChlbGVtZW50ID0+IGNoZWNrTGltaXQoZmluZGVyLCBlbGVtZW50KSkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEVuZEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gZXJyb3IudmFsdWU7XG5cdFx0fVxuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcExvY2F0ZTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdGRvdXQ6IGZhbHNlLFxuXHRzdGRlcnI6IGZhbHNlXG59O1xuIiwiLyohXG4gKiBmaWxsLXJhbmdlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9maWxsLXJhbmdlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCB0b1JlZ2V4UmFuZ2UgPSByZXF1aXJlKCd0by1yZWdleC1yYW5nZScpO1xuXG5jb25zdCBpc09iamVjdCA9IHZhbCA9PiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKTtcblxuY29uc3QgdHJhbnNmb3JtID0gdG9OdW1iZXIgPT4ge1xuICByZXR1cm4gdmFsdWUgPT4gdG9OdW1iZXIgPT09IHRydWUgPyBOdW1iZXIodmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn07XG5cbmNvbnN0IGlzVmFsaWRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKTtcbn07XG5cbmNvbnN0IGlzTnVtYmVyID0gbnVtID0+IE51bWJlci5pc0ludGVnZXIoK251bSk7XG5cbmNvbnN0IHplcm9zID0gaW5wdXQgPT4ge1xuICBsZXQgdmFsdWUgPSBgJHtpbnB1dH1gO1xuICBsZXQgaW5kZXggPSAtMTtcbiAgaWYgKHZhbHVlWzBdID09PSAnLScpIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIGlmICh2YWx1ZSA9PT0gJzAnKSByZXR1cm4gZmFsc2U7XG4gIHdoaWxlICh2YWx1ZVsrK2luZGV4XSA9PT0gJzAnKTtcbiAgcmV0dXJuIGluZGV4ID4gMDtcbn07XG5cbmNvbnN0IHN0cmluZ2lmeSA9IChzdGFydCwgZW5kLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3RyaW5naWZ5ID09PSB0cnVlO1xufTtcblxuY29uc3QgcGFkID0gKGlucHV0LCBtYXhMZW5ndGgsIHRvTnVtYmVyKSA9PiB7XG4gIGlmIChtYXhMZW5ndGggPiAwKSB7XG4gICAgbGV0IGRhc2ggPSBpbnB1dFswXSA9PT0gJy0nID8gJy0nIDogJyc7XG4gICAgaWYgKGRhc2gpIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgaW5wdXQgPSAoZGFzaCArIGlucHV0LnBhZFN0YXJ0KGRhc2ggPyBtYXhMZW5ndGggLSAxIDogbWF4TGVuZ3RoLCAnMCcpKTtcbiAgfVxuICBpZiAodG9OdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIFN0cmluZyhpbnB1dCk7XG4gIH1cbiAgcmV0dXJuIGlucHV0O1xufTtcblxuY29uc3QgdG9NYXhMZW4gPSAoaW5wdXQsIG1heExlbmd0aCkgPT4ge1xuICBsZXQgbmVnYXRpdmUgPSBpbnB1dFswXSA9PT0gJy0nID8gJy0nIDogJyc7XG4gIGlmIChuZWdhdGl2ZSkge1xuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgbWF4TGVuZ3RoLS07XG4gIH1cbiAgd2hpbGUgKGlucHV0Lmxlbmd0aCA8IG1heExlbmd0aCkgaW5wdXQgPSAnMCcgKyBpbnB1dDtcbiAgcmV0dXJuIG5lZ2F0aXZlID8gKCctJyArIGlucHV0KSA6IGlucHV0O1xufTtcblxuY29uc3QgdG9TZXF1ZW5jZSA9IChwYXJ0cywgb3B0aW9ucykgPT4ge1xuICBwYXJ0cy5uZWdhdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuICBwYXJ0cy5wb3NpdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuXG4gIGxldCBwcmVmaXggPSBvcHRpb25zLmNhcHR1cmUgPyAnJyA6ICc/Oic7XG4gIGxldCBwb3NpdGl2ZXMgPSAnJztcbiAgbGV0IG5lZ2F0aXZlcyA9ICcnO1xuICBsZXQgcmVzdWx0O1xuXG4gIGlmIChwYXJ0cy5wb3NpdGl2ZXMubGVuZ3RoKSB7XG4gICAgcG9zaXRpdmVzID0gcGFydHMucG9zaXRpdmVzLmpvaW4oJ3wnKTtcbiAgfVxuXG4gIGlmIChwYXJ0cy5uZWdhdGl2ZXMubGVuZ3RoKSB7XG4gICAgbmVnYXRpdmVzID0gYC0oJHtwcmVmaXh9JHtwYXJ0cy5uZWdhdGl2ZXMuam9pbignfCcpfSlgO1xuICB9XG5cbiAgaWYgKHBvc2l0aXZlcyAmJiBuZWdhdGl2ZXMpIHtcbiAgICByZXN1bHQgPSBgJHtwb3NpdGl2ZXN9fCR7bmVnYXRpdmVzfWA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gcG9zaXRpdmVzIHx8IG5lZ2F0aXZlcztcbiAgfVxuXG4gIGlmIChvcHRpb25zLndyYXApIHtcbiAgICByZXR1cm4gYCgke3ByZWZpeH0ke3Jlc3VsdH0pYDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCB0b1JhbmdlID0gKGEsIGIsIGlzTnVtYmVycywgb3B0aW9ucykgPT4ge1xuICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgcmV0dXJuIHRvUmVnZXhSYW5nZShhLCBiLCB7IHdyYXA6IGZhbHNlLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShhKTtcbiAgaWYgKGEgPT09IGIpIHJldHVybiBzdGFydDtcblxuICBsZXQgc3RvcCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYik7XG4gIHJldHVybiBgWyR7c3RhcnR9LSR7c3RvcH1dYDtcbn07XG5cbmNvbnN0IHRvUmVnZXggPSAoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdGFydCkpIHtcbiAgICBsZXQgd3JhcCA9IG9wdGlvbnMud3JhcCA9PT0gdHJ1ZTtcbiAgICBsZXQgcHJlZml4ID0gb3B0aW9ucy5jYXB0dXJlID8gJycgOiAnPzonO1xuICAgIHJldHVybiB3cmFwID8gYCgke3ByZWZpeH0ke3N0YXJ0LmpvaW4oJ3wnKX0pYCA6IHN0YXJ0LmpvaW4oJ3wnKTtcbiAgfVxuICByZXR1cm4gdG9SZWdleFJhbmdlKHN0YXJ0LCBlbmQsIG9wdGlvbnMpO1xufTtcblxuY29uc3QgcmFuZ2VFcnJvciA9ICguLi5hcmdzKSA9PiB7XG4gIHJldHVybiBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCByYW5nZSBhcmd1bWVudHM6ICcgKyB1dGlsLmluc3BlY3QoLi4uYXJncykpO1xufTtcblxuY29uc3QgaW52YWxpZFJhbmdlID0gKHN0YXJ0LCBlbmQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMuc3RyaWN0UmFuZ2VzID09PSB0cnVlKSB0aHJvdyByYW5nZUVycm9yKFtzdGFydCwgZW5kXSk7XG4gIHJldHVybiBbXTtcbn07XG5cbmNvbnN0IGludmFsaWRTdGVwID0gKHN0ZXAsIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMuc3RyaWN0UmFuZ2VzID09PSB0cnVlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgc3RlcCBcIiR7c3RlcH1cIiB0byBiZSBhIG51bWJlcmApO1xuICB9XG4gIHJldHVybiBbXTtcbn07XG5cbmNvbnN0IGZpbGxOdW1iZXJzID0gKHN0YXJ0LCBlbmQsIHN0ZXAgPSAxLCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IGEgPSBOdW1iZXIoc3RhcnQpO1xuICBsZXQgYiA9IE51bWJlcihlbmQpO1xuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihhKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihiKSkge1xuICAgIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkgdGhyb3cgcmFuZ2VFcnJvcihbc3RhcnQsIGVuZF0pO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIGZpeCBuZWdhdGl2ZSB6ZXJvXG4gIGlmIChhID09PSAwKSBhID0gMDtcbiAgaWYgKGIgPT09IDApIGIgPSAwO1xuXG4gIGxldCBkZXNjZW5kaW5nID0gYSA+IGI7XG4gIGxldCBzdGFydFN0cmluZyA9IFN0cmluZyhzdGFydCk7XG4gIGxldCBlbmRTdHJpbmcgPSBTdHJpbmcoZW5kKTtcbiAgbGV0IHN0ZXBTdHJpbmcgPSBTdHJpbmcoc3RlcCk7XG4gIHN0ZXAgPSBNYXRoLm1heChNYXRoLmFicyhzdGVwKSwgMSk7XG5cbiAgbGV0IHBhZGRlZCA9IHplcm9zKHN0YXJ0U3RyaW5nKSB8fCB6ZXJvcyhlbmRTdHJpbmcpIHx8IHplcm9zKHN0ZXBTdHJpbmcpO1xuICBsZXQgbWF4TGVuID0gcGFkZGVkID8gTWF0aC5tYXgoc3RhcnRTdHJpbmcubGVuZ3RoLCBlbmRTdHJpbmcubGVuZ3RoLCBzdGVwU3RyaW5nLmxlbmd0aCkgOiAwO1xuICBsZXQgdG9OdW1iZXIgPSBwYWRkZWQgPT09IGZhbHNlICYmIHN0cmluZ2lmeShzdGFydCwgZW5kLCBvcHRpb25zKSA9PT0gZmFsc2U7XG4gIGxldCBmb3JtYXQgPSBvcHRpb25zLnRyYW5zZm9ybSB8fCB0cmFuc2Zvcm0odG9OdW1iZXIpO1xuXG4gIGlmIChvcHRpb25zLnRvUmVnZXggJiYgc3RlcCA9PT0gMSkge1xuICAgIHJldHVybiB0b1JhbmdlKHRvTWF4TGVuKHN0YXJ0LCBtYXhMZW4pLCB0b01heExlbihlbmQsIG1heExlbiksIHRydWUsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IHBhcnRzID0geyBuZWdhdGl2ZXM6IFtdLCBwb3NpdGl2ZXM6IFtdIH07XG4gIGxldCBwdXNoID0gbnVtID0+IHBhcnRzW251bSA8IDAgPyAnbmVnYXRpdmVzJyA6ICdwb3NpdGl2ZXMnXS5wdXNoKE1hdGguYWJzKG51bSkpO1xuICBsZXQgcmFuZ2UgPSBbXTtcbiAgbGV0IGluZGV4ID0gMDtcblxuICB3aGlsZSAoZGVzY2VuZGluZyA/IGEgPj0gYiA6IGEgPD0gYikge1xuICAgIGlmIChvcHRpb25zLnRvUmVnZXggPT09IHRydWUgJiYgc3RlcCA+IDEpIHtcbiAgICAgIHB1c2goYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnB1c2gocGFkKGZvcm1hdChhLCBpbmRleCksIG1heExlbiwgdG9OdW1iZXIpKTtcbiAgICB9XG4gICAgYSA9IGRlc2NlbmRpbmcgPyBhIC0gc3RlcCA6IGEgKyBzdGVwO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHN0ZXAgPiAxXG4gICAgICA/IHRvU2VxdWVuY2UocGFydHMsIG9wdGlvbnMpXG4gICAgICA6IHRvUmVnZXgocmFuZ2UsIG51bGwsIHsgd3JhcDogZmFsc2UsIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5jb25zdCBmaWxsTGV0dGVycyA9IChzdGFydCwgZW5kLCBzdGVwID0gMSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICgoIWlzTnVtYmVyKHN0YXJ0KSAmJiBzdGFydC5sZW5ndGggPiAxKSB8fCAoIWlzTnVtYmVyKGVuZCkgJiYgZW5kLmxlbmd0aCA+IDEpKSB7XG4gICAgcmV0dXJuIGludmFsaWRSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgbGV0IGZvcm1hdCA9IG9wdGlvbnMudHJhbnNmb3JtIHx8ICh2YWwgPT4gU3RyaW5nLmZyb21DaGFyQ29kZSh2YWwpKTtcbiAgbGV0IGEgPSBgJHtzdGFydH1gLmNoYXJDb2RlQXQoMCk7XG4gIGxldCBiID0gYCR7ZW5kfWAuY2hhckNvZGVBdCgwKTtcblxuICBsZXQgZGVzY2VuZGluZyA9IGEgPiBiO1xuICBsZXQgbWluID0gTWF0aC5taW4oYSwgYik7XG4gIGxldCBtYXggPSBNYXRoLm1heChhLCBiKTtcblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ICYmIHN0ZXAgPT09IDEpIHtcbiAgICByZXR1cm4gdG9SYW5nZShtaW4sIG1heCwgZmFsc2UsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IHJhbmdlID0gW107XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgd2hpbGUgKGRlc2NlbmRpbmcgPyBhID49IGIgOiBhIDw9IGIpIHtcbiAgICByYW5nZS5wdXNoKGZvcm1hdChhLCBpbmRleCkpO1xuICAgIGEgPSBkZXNjZW5kaW5nID8gYSAtIHN0ZXAgOiBhICsgc3RlcDtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB0b1JlZ2V4KHJhbmdlLCBudWxsLCB7IHdyYXA6IGZhbHNlLCBvcHRpb25zIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuY29uc3QgZmlsbCA9IChzdGFydCwgZW5kLCBzdGVwLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKGVuZCA9PSBudWxsICYmIGlzVmFsaWRWYWx1ZShzdGFydCkpIHtcbiAgICByZXR1cm4gW3N0YXJ0XTtcbiAgfVxuXG4gIGlmICghaXNWYWxpZFZhbHVlKHN0YXJ0KSB8fCAhaXNWYWxpZFZhbHVlKGVuZCkpIHtcbiAgICByZXR1cm4gaW52YWxpZFJhbmdlKHN0YXJ0LCBlbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZpbGwoc3RhcnQsIGVuZCwgMSwgeyB0cmFuc2Zvcm06IHN0ZXAgfSk7XG4gIH1cblxuICBpZiAoaXNPYmplY3Qoc3RlcCkpIHtcbiAgICByZXR1cm4gZmlsbChzdGFydCwgZW5kLCAwLCBzdGVwKTtcbiAgfVxuXG4gIGxldCBvcHRzID0geyAuLi5vcHRpb25zIH07XG4gIGlmIChvcHRzLmNhcHR1cmUgPT09IHRydWUpIG9wdHMud3JhcCA9IHRydWU7XG4gIHN0ZXAgPSBzdGVwIHx8IG9wdHMuc3RlcCB8fCAxO1xuXG4gIGlmICghaXNOdW1iZXIoc3RlcCkpIHtcbiAgICBpZiAoc3RlcCAhPSBudWxsICYmICFpc09iamVjdChzdGVwKSkgcmV0dXJuIGludmFsaWRTdGVwKHN0ZXAsIG9wdHMpO1xuICAgIHJldHVybiBmaWxsKHN0YXJ0LCBlbmQsIDEsIHN0ZXApO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKHN0YXJ0KSAmJiBpc051bWJlcihlbmQpKSB7XG4gICAgcmV0dXJuIGZpbGxOdW1iZXJzKHN0YXJ0LCBlbmQsIHN0ZXAsIG9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIGZpbGxMZXR0ZXJzKHN0YXJ0LCBlbmQsIE1hdGgubWF4KE1hdGguYWJzKHN0ZXApLCAxKSwgb3B0cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0dsb2IgPSByZXF1aXJlKCdpcy1nbG9iJyk7XG52YXIgcGF0aFBvc2l4RGlybmFtZSA9IHJlcXVpcmUoJ3BhdGgnKS5wb3NpeC5kaXJuYW1lO1xudmFyIGlzV2luMzIgPSByZXF1aXJlKCdvcycpLnBsYXRmb3JtKCkgPT09ICd3aW4zMic7XG5cbnZhciBzbGFzaCA9ICcvJztcbnZhciBiYWNrc2xhc2ggPSAvXFxcXC9nO1xudmFyIGVuY2xvc3VyZSA9IC9bXFx7XFxbXS4qW1xcfVxcXV0kLztcbnZhciBnbG9iYnkgPSAvKF58W15cXFxcXSkoW1xce1xcW118XFwoW15cXCldKyQpLztcbnZhciBlc2NhcGVkID0gL1xcXFwoW1xcIVxcKlxcP1xcfFxcW1xcXVxcKFxcKVxce1xcfV0pL2c7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuZmxpcEJhY2tzbGFzaGVzPXRydWVdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdsb2JQYXJlbnQoc3RyLCBvcHRzKSB7XG4gIHZhciBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IGZsaXBCYWNrc2xhc2hlczogdHJ1ZSB9LCBvcHRzKTtcblxuICAvLyBmbGlwIHdpbmRvd3MgcGF0aCBzZXBhcmF0b3JzXG4gIGlmIChvcHRpb25zLmZsaXBCYWNrc2xhc2hlcyAmJiBpc1dpbjMyICYmIHN0ci5pbmRleE9mKHNsYXNoKSA8IDApIHtcbiAgICBzdHIgPSBzdHIucmVwbGFjZShiYWNrc2xhc2gsIHNsYXNoKTtcbiAgfVxuXG4gIC8vIHNwZWNpYWwgY2FzZSBmb3Igc3RyaW5ncyBlbmRpbmcgaW4gZW5jbG9zdXJlIGNvbnRhaW5pbmcgcGF0aCBzZXBhcmF0b3JcbiAgaWYgKGVuY2xvc3VyZS50ZXN0KHN0cikpIHtcbiAgICBzdHIgKz0gc2xhc2g7XG4gIH1cblxuICAvLyBwcmVzZXJ2ZXMgZnVsbCBwYXRoIGluIGNhc2Ugb2YgdHJhaWxpbmcgcGF0aCBzZXBhcmF0b3JcbiAgc3RyICs9ICdhJztcblxuICAvLyByZW1vdmUgcGF0aCBwYXJ0cyB0aGF0IGFyZSBnbG9iYnlcbiAgZG8ge1xuICAgIHN0ciA9IHBhdGhQb3NpeERpcm5hbWUoc3RyKTtcbiAgfSB3aGlsZSAoaXNHbG9iKHN0cikgfHwgZ2xvYmJ5LnRlc3Qoc3RyKSk7XG5cbiAgLy8gcmVtb3ZlIGVzY2FwZSBjaGFycyBhbmQgcmV0dXJuIHJlc3VsdFxuICByZXR1cm4gc3RyLnJlcGxhY2UoZXNjYXBlZCwgJyQxJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGJpbmFyeUV4dGVuc2lvbnMgPSByZXF1aXJlKCdiaW5hcnktZXh0ZW5zaW9ucycpO1xuXG5jb25zdCBleHRlbnNpb25zID0gbmV3IFNldChiaW5hcnlFeHRlbnNpb25zKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlUGF0aCA9PiBleHRlbnNpb25zLmhhcyhwYXRoLmV4dG5hbWUoZmlsZVBhdGgpLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpO1xuIiwiLyohXG4gKiBpcy1leHRnbG9iIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1leHRnbG9iPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE2LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXh0Z2xvYihzdHIpIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnIHx8IHN0ciA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSAvKFxcXFwpLnwoW0A/ISsqXVxcKC4qXFwpKS9nLmV4ZWMoc3RyKSkpIHtcbiAgICBpZiAobWF0Y2hbMl0pIHJldHVybiB0cnVlO1xuICAgIHN0ciA9IHN0ci5zbGljZShtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLyohXG4gKiBpcy1nbG9iIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1nbG9iPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG52YXIgaXNFeHRnbG9iID0gcmVxdWlyZSgnaXMtZXh0Z2xvYicpO1xudmFyIGNoYXJzID0geyAneyc6ICd9JywgJygnOiAnKScsICdbJzogJ10nfTtcbnZhciBzdHJpY3RSZWdleCA9IC9cXFxcKC4pfCheIXxcXCp8W1xcXS4rKV1cXD98XFxbW15cXFxcXFxdXStcXF18XFx7W15cXFxcfV0rXFx9fFxcKFxcP1s6IT1dW15cXFxcKV0rXFwpfFxcKFtefF0rXFx8W15cXFxcKV0rXFwpKS87XG52YXIgcmVsYXhlZFJlZ2V4ID0gL1xcXFwoLil8KF4hfFsqP3t9KClbXFxdXXxcXChcXD8pLztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0dsb2Ioc3RyLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCBzdHIgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzRXh0Z2xvYihzdHIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgcmVnZXggPSBzdHJpY3RSZWdleDtcbiAgdmFyIG1hdGNoO1xuXG4gIC8vIG9wdGlvbmFsbHkgcmVsYXggcmVnZXhcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zdHJpY3QgPT09IGZhbHNlKSB7XG4gICAgcmVnZXggPSByZWxheGVkUmVnZXg7XG4gIH1cblxuICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhzdHIpKSkge1xuICAgIGlmIChtYXRjaFsyXSkgcmV0dXJuIHRydWU7XG4gICAgdmFyIGlkeCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgLy8gaWYgYW4gb3BlbiBicmFja2V0L2JyYWNlL3BhcmVuIGlzIGVzY2FwZWQsXG4gICAgLy8gc2V0IHRoZSBpbmRleCB0byB0aGUgbmV4dCBjbG9zaW5nIGNoYXJhY3RlclxuICAgIHZhciBvcGVuID0gbWF0Y2hbMV07XG4gICAgdmFyIGNsb3NlID0gb3BlbiA/IGNoYXJzW29wZW5dIDogbnVsbDtcbiAgICBpZiAob3BlbiAmJiBjbG9zZSkge1xuICAgICAgdmFyIG4gPSBzdHIuaW5kZXhPZihjbG9zZSwgaWR4KTtcbiAgICAgIGlmIChuICE9PSAtMSkge1xuICAgICAgICBpZHggPSBuICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdHIgPSBzdHIuc2xpY2UoaWR4KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLyohXG4gKiBpcy1udW1iZXIgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzLW51bWJlcj5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG51bSkge1xuICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbnVtIC0gbnVtID09PSAwO1xuICB9XG4gIGlmICh0eXBlb2YgbnVtID09PSAnc3RyaW5nJyAmJiBudW0udHJpbSgpICE9PSAnJykge1xuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUgPyBOdW1iZXIuaXNGaW5pdGUoK251bSkgOiBpc0Zpbml0ZSgrbnVtKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLyohXG4gKiBub3JtYWxpemUtcGF0aCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvbm9ybWFsaXplLXBhdGg+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTgsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocGF0aCwgc3RyaXBUcmFpbGluZykge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgcGF0aCB0byBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKHBhdGggPT09ICdcXFxcJyB8fCBwYXRoID09PSAnLycpIHJldHVybiAnLyc7XG5cbiAgdmFyIGxlbiA9IHBhdGgubGVuZ3RoO1xuICBpZiAobGVuIDw9IDEpIHJldHVybiBwYXRoO1xuXG4gIC8vIGVuc3VyZSB0aGF0IHdpbjMyIG5hbWVzcGFjZXMgaGFzIHR3byBsZWFkaW5nIHNsYXNoZXMsIHNvIHRoYXQgdGhlIHBhdGggaXNcbiAgLy8gaGFuZGxlZCBwcm9wZXJseSBieSB0aGUgd2luMzIgdmVyc2lvbiBvZiBwYXRoLnBhcnNlKCkgYWZ0ZXIgYmVpbmcgbm9ybWFsaXplZFxuICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9saWJyYXJ5L3dpbmRvd3MvZGVza3RvcC9hYTM2NTI0Nyh2PXZzLjg1KS5hc3B4I25hbWVzcGFjZXNcbiAgdmFyIHByZWZpeCA9ICcnO1xuICBpZiAobGVuID4gNCAmJiBwYXRoWzNdID09PSAnXFxcXCcpIHtcbiAgICB2YXIgY2ggPSBwYXRoWzJdO1xuICAgIGlmICgoY2ggPT09ICc/JyB8fCBjaCA9PT0gJy4nKSAmJiBwYXRoLnNsaWNlKDAsIDIpID09PSAnXFxcXFxcXFwnKSB7XG4gICAgICBwYXRoID0gcGF0aC5zbGljZSgyKTtcbiAgICAgIHByZWZpeCA9ICcvLyc7XG4gICAgfVxuICB9XG5cbiAgdmFyIHNlZ3MgPSBwYXRoLnNwbGl0KC9bL1xcXFxdKy8pO1xuICBpZiAoc3RyaXBUcmFpbGluZyAhPT0gZmFsc2UgJiYgc2Vnc1tzZWdzLmxlbmd0aCAtIDFdID09PSAnJykge1xuICAgIHNlZ3MucG9wKCk7XG4gIH1cbiAgcmV0dXJuIHByZWZpeCArIHNlZ3Muam9pbignLycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHtwcm9taXNpZnl9ID0gcmVxdWlyZSgndXRpbCcpO1xuXG5jb25zdCBwQWNjZXNzID0gcHJvbWlzaWZ5KGZzLmFjY2Vzcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgcGF0aCA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgcEFjY2VzcyhwYXRoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoXykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMuc3luYyA9IHBhdGggPT4ge1xuXHR0cnkge1xuXHRcdGZzLmFjY2Vzc1N5bmMocGF0aCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKF8pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvcGljb21hdGNoJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBXSU5fU0xBU0ggPSAnXFxcXFxcXFwvJztcbmNvbnN0IFdJTl9OT19TTEFTSCA9IGBbXiR7V0lOX1NMQVNIfV1gO1xuXG4vKipcbiAqIFBvc2l4IGdsb2IgcmVnZXhcbiAqL1xuXG5jb25zdCBET1RfTElURVJBTCA9ICdcXFxcLic7XG5jb25zdCBQTFVTX0xJVEVSQUwgPSAnXFxcXCsnO1xuY29uc3QgUU1BUktfTElURVJBTCA9ICdcXFxcPyc7XG5jb25zdCBTTEFTSF9MSVRFUkFMID0gJ1xcXFwvJztcbmNvbnN0IE9ORV9DSEFSID0gJyg/PS4pJztcbmNvbnN0IFFNQVJLID0gJ1teL10nO1xuY29uc3QgRU5EX0FOQ0hPUiA9IGAoPzoke1NMQVNIX0xJVEVSQUx9fCQpYDtcbmNvbnN0IFNUQVJUX0FOQ0hPUiA9IGAoPzpefCR7U0xBU0hfTElURVJBTH0pYDtcbmNvbnN0IERPVFNfU0xBU0ggPSBgJHtET1RfTElURVJBTH17MSwyfSR7RU5EX0FOQ0hPUn1gO1xuY29uc3QgTk9fRE9UID0gYCg/ISR7RE9UX0xJVEVSQUx9KWA7XG5jb25zdCBOT19ET1RTID0gYCg/ISR7U1RBUlRfQU5DSE9SfSR7RE9UU19TTEFTSH0pYDtcbmNvbnN0IE5PX0RPVF9TTEFTSCA9IGAoPyEke0RPVF9MSVRFUkFMfXswLDF9JHtFTkRfQU5DSE9SfSlgO1xuY29uc3QgTk9fRE9UU19TTEFTSCA9IGAoPyEke0RPVFNfU0xBU0h9KWA7XG5jb25zdCBRTUFSS19OT19ET1QgPSBgW14uJHtTTEFTSF9MSVRFUkFMfV1gO1xuY29uc3QgU1RBUiA9IGAke1FNQVJLfSo/YDtcblxuY29uc3QgUE9TSVhfQ0hBUlMgPSB7XG4gIERPVF9MSVRFUkFMLFxuICBQTFVTX0xJVEVSQUwsXG4gIFFNQVJLX0xJVEVSQUwsXG4gIFNMQVNIX0xJVEVSQUwsXG4gIE9ORV9DSEFSLFxuICBRTUFSSyxcbiAgRU5EX0FOQ0hPUixcbiAgRE9UU19TTEFTSCxcbiAgTk9fRE9ULFxuICBOT19ET1RTLFxuICBOT19ET1RfU0xBU0gsXG4gIE5PX0RPVFNfU0xBU0gsXG4gIFFNQVJLX05PX0RPVCxcbiAgU1RBUixcbiAgU1RBUlRfQU5DSE9SXG59O1xuXG4vKipcbiAqIFdpbmRvd3MgZ2xvYiByZWdleFxuICovXG5cbmNvbnN0IFdJTkRPV1NfQ0hBUlMgPSB7XG4gIC4uLlBPU0lYX0NIQVJTLFxuXG4gIFNMQVNIX0xJVEVSQUw6IGBbJHtXSU5fU0xBU0h9XWAsXG4gIFFNQVJLOiBXSU5fTk9fU0xBU0gsXG4gIFNUQVI6IGAke1dJTl9OT19TTEFTSH0qP2AsXG4gIERPVFNfU0xBU0g6IGAke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JClgLFxuICBOT19ET1Q6IGAoPyEke0RPVF9MSVRFUkFMfSlgLFxuICBOT19ET1RTOiBgKD8hKD86XnxbJHtXSU5fU0xBU0h9XSkke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgTk9fRE9UX1NMQVNIOiBgKD8hJHtET1RfTElURVJBTH17MCwxfSg/Olske1dJTl9TTEFTSH1dfCQpKWAsXG4gIE5PX0RPVFNfU0xBU0g6IGAoPyEke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgUU1BUktfTk9fRE9UOiBgW14uJHtXSU5fU0xBU0h9XWAsXG4gIFNUQVJUX0FOQ0hPUjogYCg/Ol58WyR7V0lOX1NMQVNIfV0pYCxcbiAgRU5EX0FOQ0hPUjogYCg/Olske1dJTl9TTEFTSH1dfCQpYFxufTtcblxuLyoqXG4gKiBQT1NJWCBCcmFja2V0IFJlZ2V4XG4gKi9cblxuY29uc3QgUE9TSVhfUkVHRVhfU09VUkNFID0ge1xuICBhbG51bTogJ2EtekEtWjAtOScsXG4gIGFscGhhOiAnYS16QS1aJyxcbiAgYXNjaWk6ICdcXFxceDAwLVxcXFx4N0YnLFxuICBibGFuazogJyBcXFxcdCcsXG4gIGNudHJsOiAnXFxcXHgwMC1cXFxceDFGXFxcXHg3RicsXG4gIGRpZ2l0OiAnMC05JyxcbiAgZ3JhcGg6ICdcXFxceDIxLVxcXFx4N0UnLFxuICBsb3dlcjogJ2EteicsXG4gIHByaW50OiAnXFxcXHgyMC1cXFxceDdFICcsXG4gIHB1bmN0OiAnXFxcXC0hXCIjJCUmXFwnKClcXFxcKissLi86Ozw9Pj9AW1xcXFxdXl9ge3x9ficsXG4gIHNwYWNlOiAnIFxcXFx0XFxcXHJcXFxcblxcXFx2XFxcXGYnLFxuICB1cHBlcjogJ0EtWicsXG4gIHdvcmQ6ICdBLVphLXowLTlfJyxcbiAgeGRpZ2l0OiAnQS1GYS1mMC05J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1BWF9MRU5HVEg6IDEwMjQgKiA2NCxcbiAgUE9TSVhfUkVHRVhfU09VUkNFLFxuXG4gIC8vIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgUkVHRVhfQkFDS1NMQVNIOiAvXFxcXCg/IVsqKz9eJHt9KHwpW1xcXV0pL2csXG4gIFJFR0VYX05PTl9TUEVDSUFMX0NIQVJTOiAvXlteQCFbXFxdLiwkKis/Xnt9KCl8XFxcXC9dKy8sXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlM6IC9bLSorPy5eJHt9KHwpW1xcXV0vLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUY6IC8oXFxcXD8pKChcXFcpKFxcMyopKS9nLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTDogLyhbLSorPy5eJHt9KHwpW1xcXV0pL2csXG4gIFJFR0VYX1JFTU9WRV9CQUNLU0xBU0g6IC8oPzpcXFsuKj9bXlxcXFxdXFxdfFxcXFwoPz0uKSkvZyxcblxuICAvLyBSZXBsYWNlIGdsb2JzIHdpdGggZXF1aXZhbGVudCBwYXR0ZXJucyB0byByZWR1Y2UgcGFyc2luZyB0aW1lLlxuICBSRVBMQUNFTUVOVFM6IHtcbiAgICAnKioqJzogJyonLFxuICAgICcqKi8qKic6ICcqKicsXG4gICAgJyoqLyoqLyoqJzogJyoqJ1xuICB9LFxuXG4gIC8vIERpZ2l0c1xuICBDSEFSXzA6IDQ4LCAvKiAwICovXG4gIENIQVJfOTogNTcsIC8qIDkgKi9cblxuICAvLyBBbHBoYWJldCBjaGFycy5cbiAgQ0hBUl9VUFBFUkNBU0VfQTogNjUsIC8qIEEgKi9cbiAgQ0hBUl9MT1dFUkNBU0VfQTogOTcsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogOTAsIC8qIFogKi9cbiAgQ0hBUl9MT1dFUkNBU0VfWjogMTIyLCAvKiB6ICovXG5cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTOiA0MCwgLyogKCAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTOiA0MSwgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6IDQyLCAvKiAqICovXG5cbiAgLy8gTm9uLWFscGhhYmV0aWMgY2hhcnMuXG4gIENIQVJfQU1QRVJTQU5EOiAzOCwgLyogJiAqL1xuICBDSEFSX0FUOiA2NCwgLyogQCAqL1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNIOiA5MiwgLyogXFwgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46IDEzLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogOTQsIC8qIF4gKi9cbiAgQ0hBUl9DT0xPTjogNTgsIC8qIDogKi9cbiAgQ0hBUl9DT01NQTogNDQsIC8qICwgKi9cbiAgQ0hBUl9ET1Q6IDQ2LCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAzNCwgLyogXCIgKi9cbiAgQ0hBUl9FUVVBTDogNjEsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAzMywgLyogISAqL1xuICBDSEFSX0ZPUk1fRkVFRDogMTIsIC8qIFxcZiAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0g6IDQ3LCAvKiAvICovXG4gIENIQVJfR1JBVkVfQUNDRU5UOiA5NiwgLyogYCAqL1xuICBDSEFSX0hBU0g6IDM1LCAvKiAjICovXG4gIENIQVJfSFlQSEVOX01JTlVTOiA0NSwgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogNjAsIC8qIDwgKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFOiAxMjMsIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUOiA5MSwgLyogWyAqL1xuICBDSEFSX0xJTkVfRkVFRDogMTAsIC8qIFxcbiAqL1xuICBDSEFSX05PX0JSRUFLX1NQQUNFOiAxNjAsIC8qIFxcdTAwQTAgKi9cbiAgQ0hBUl9QRVJDRU5UOiAzNywgLyogJSAqL1xuICBDSEFSX1BMVVM6IDQzLCAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSzogNjMsIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9BTkdMRV9CUkFDS0VUOiA2MiwgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAxMjUsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogOTMsIC8qIF0gKi9cbiAgQ0hBUl9TRU1JQ09MT046IDU5LCAvKiA7ICovXG4gIENIQVJfU0lOR0xFX1FVT1RFOiAzOSwgLyogJyAqL1xuICBDSEFSX1NQQUNFOiAzMiwgLyogICAqL1xuICBDSEFSX1RBQjogOSwgLyogXFx0ICovXG4gIENIQVJfVU5ERVJTQ09SRTogOTUsIC8qIF8gKi9cbiAgQ0hBUl9WRVJUSUNBTF9MSU5FOiAxMjQsIC8qIHwgKi9cbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0U6IDY1Mjc5LCAvKiBcXHVGRUZGICovXG5cbiAgU0VQOiBwYXRoLnNlcCxcblxuICAvKipcbiAgICogQ3JlYXRlIEVYVEdMT0JfQ0hBUlNcbiAgICovXG5cbiAgZXh0Z2xvYkNoYXJzKGNoYXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICchJzogeyB0eXBlOiAnbmVnYXRlJywgb3BlbjogJyg/Oig/ISg/OicsIGNsb3NlOiBgKSkke2NoYXJzLlNUQVJ9KWAgfSxcbiAgICAgICc/JzogeyB0eXBlOiAncW1hcmsnLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpPycgfSxcbiAgICAgICcrJzogeyB0eXBlOiAncGx1cycsIG9wZW46ICcoPzonLCBjbG9zZTogJykrJyB9LFxuICAgICAgJyonOiB7IHR5cGU6ICdzdGFyJywgb3BlbjogJyg/OicsIGNsb3NlOiAnKSonIH0sXG4gICAgICAnQCc6IHsgdHlwZTogJ2F0Jywgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBHTE9CX0NIQVJTXG4gICAqL1xuXG4gIGdsb2JDaGFycyh3aW4zMikge1xuICAgIHJldHVybiB3aW4zMiA9PT0gdHJ1ZSA/IFdJTkRPV1NfQ0hBUlMgOiBQT1NJWF9DSEFSUztcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IHtcbiAgTUFYX0xFTkdUSCxcbiAgUE9TSVhfUkVHRVhfU09VUkNFLFxuICBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19CQUNLUkVGLFxuICBSRVBMQUNFTUVOVFNcbn0gPSBjb25zdGFudHM7XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmNvbnN0IGV4cGFuZFJhbmdlID0gKGFyZ3MsIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmV4cGFuZFJhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZXhwYW5kUmFuZ2UoLi4uYXJncywgb3B0aW9ucyk7XG4gIH1cblxuICBhcmdzLnNvcnQoKTtcbiAgY29uc3QgdmFsdWUgPSBgWyR7YXJncy5qb2luKCctJyl9XWA7XG5cbiAgdHJ5IHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3ICovXG4gICAgbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0dXJuIGFyZ3MubWFwKHYgPT4gdXRpbHMuZXNjYXBlUmVnZXgodikpLmpvaW4oJy4uJyk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgbWVzc2FnZSBmb3IgYSBzeW50YXggZXJyb3JcbiAqL1xuXG5jb25zdCBzeW50YXhFcnJvciA9ICh0eXBlLCBjaGFyKSA9PiB7XG4gIHJldHVybiBgTWlzc2luZyAke3R5cGV9OiBcIiR7Y2hhcn1cIiAtIHVzZSBcIlxcXFxcXFxcJHtjaGFyfVwiIHRvIG1hdGNoIGxpdGVyYWwgY2hhcmFjdGVyc2A7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBpbnB1dCBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuY29uc3QgcGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuICB9XG5cbiAgaW5wdXQgPSBSRVBMQUNFTUVOVFNbaW5wdXRdIHx8IGlucHV0O1xuXG4gIGNvbnN0IG9wdHMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG5cbiAgbGV0IGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgaWYgKGxlbiA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoOiAke2xlbn0sIGV4Y2VlZHMgbWF4aW11bSBhbGxvd2VkIGxlbmd0aDogJHttYXh9YCk7XG4gIH1cblxuICBjb25zdCBib3MgPSB7IHR5cGU6ICdib3MnLCB2YWx1ZTogJycsIG91dHB1dDogb3B0cy5wcmVwZW5kIHx8ICcnIH07XG4gIGNvbnN0IHRva2VucyA9IFtib3NdO1xuXG4gIGNvbnN0IGNhcHR1cmUgPSBvcHRzLmNhcHR1cmUgPyAnJyA6ICc/Oic7XG4gIGNvbnN0IHdpbjMyID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuXG4gIC8vIGNyZWF0ZSBjb25zdGFudHMgYmFzZWQgb24gcGxhdGZvcm0sIGZvciB3aW5kb3dzIG9yIHBvc2l4XG4gIGNvbnN0IFBMQVRGT1JNX0NIQVJTID0gY29uc3RhbnRzLmdsb2JDaGFycyh3aW4zMik7XG4gIGNvbnN0IEVYVEdMT0JfQ0hBUlMgPSBjb25zdGFudHMuZXh0Z2xvYkNoYXJzKFBMQVRGT1JNX0NIQVJTKTtcblxuICBjb25zdCB7XG4gICAgRE9UX0xJVEVSQUwsXG4gICAgUExVU19MSVRFUkFMLFxuICAgIFNMQVNIX0xJVEVSQUwsXG4gICAgT05FX0NIQVIsXG4gICAgRE9UU19TTEFTSCxcbiAgICBOT19ET1QsXG4gICAgTk9fRE9UX1NMQVNILFxuICAgIE5PX0RPVFNfU0xBU0gsXG4gICAgUU1BUkssXG4gICAgUU1BUktfTk9fRE9ULFxuICAgIFNUQVIsXG4gICAgU1RBUlRfQU5DSE9SXG4gIH0gPSBQTEFURk9STV9DSEFSUztcblxuICBjb25zdCBnbG9ic3RhciA9IG9wdHMgPT4ge1xuICAgIHJldHVybiBgKCR7Y2FwdHVyZX0oPzooPyEke1NUQVJUX0FOQ0hPUn0ke29wdHMuZG90ID8gRE9UU19TTEFTSCA6IERPVF9MSVRFUkFMfSkuKSo/KWA7XG4gIH07XG5cbiAgY29uc3Qgbm9kb3QgPSBvcHRzLmRvdCA/ICcnIDogTk9fRE9UO1xuICBjb25zdCBxbWFya05vRG90ID0gb3B0cy5kb3QgPyBRTUFSSyA6IFFNQVJLX05PX0RPVDtcbiAgbGV0IHN0YXIgPSBvcHRzLmJhc2ggPT09IHRydWUgPyBnbG9ic3RhcihvcHRzKSA6IFNUQVI7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgIHN0YXIgPSBgKCR7c3Rhcn0pYDtcbiAgfVxuXG4gIC8vIG1pbmltYXRjaCBvcHRpb25zIHN1cHBvcnRcbiAgaWYgKHR5cGVvZiBvcHRzLm5vZXh0ID09PSAnYm9vbGVhbicpIHtcbiAgICBvcHRzLm5vZXh0Z2xvYiA9IG9wdHMubm9leHQ7XG4gIH1cblxuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBpbnB1dCxcbiAgICBpbmRleDogLTEsXG4gICAgc3RhcnQ6IDAsXG4gICAgZG90OiBvcHRzLmRvdCA9PT0gdHJ1ZSxcbiAgICBjb25zdW1lZDogJycsXG4gICAgb3V0cHV0OiAnJyxcbiAgICBwcmVmaXg6ICcnLFxuICAgIGJhY2t0cmFjazogZmFsc2UsXG4gICAgbmVnYXRlZDogZmFsc2UsXG4gICAgYnJhY2tldHM6IDAsXG4gICAgYnJhY2VzOiAwLFxuICAgIHBhcmVuczogMCxcbiAgICBxdW90ZXM6IDAsXG4gICAgZ2xvYnN0YXI6IGZhbHNlLFxuICAgIHRva2Vuc1xuICB9O1xuXG4gIGlucHV0ID0gdXRpbHMucmVtb3ZlUHJlZml4KGlucHV0LCBzdGF0ZSk7XG4gIGxlbiA9IGlucHV0Lmxlbmd0aDtcblxuICBjb25zdCBleHRnbG9icyA9IFtdO1xuICBjb25zdCBicmFjZXMgPSBbXTtcbiAgY29uc3Qgc3RhY2sgPSBbXTtcbiAgbGV0IHByZXYgPSBib3M7XG4gIGxldCB2YWx1ZTtcblxuICAvKipcbiAgICogVG9rZW5pemluZyBoZWxwZXJzXG4gICAqL1xuXG4gIGNvbnN0IGVvcyA9ICgpID0+IHN0YXRlLmluZGV4ID09PSBsZW4gLSAxO1xuICBjb25zdCBwZWVrID0gc3RhdGUucGVlayA9IChuID0gMSkgPT4gaW5wdXRbc3RhdGUuaW5kZXggKyBuXTtcbiAgY29uc3QgYWR2YW5jZSA9IHN0YXRlLmFkdmFuY2UgPSAoKSA9PiBpbnB1dFsrK3N0YXRlLmluZGV4XSB8fCAnJztcbiAgY29uc3QgcmVtYWluaW5nID0gKCkgPT4gaW5wdXQuc2xpY2Uoc3RhdGUuaW5kZXggKyAxKTtcbiAgY29uc3QgY29uc3VtZSA9ICh2YWx1ZSA9ICcnLCBudW0gPSAwKSA9PiB7XG4gICAgc3RhdGUuY29uc3VtZWQgKz0gdmFsdWU7XG4gICAgc3RhdGUuaW5kZXggKz0gbnVtO1xuICB9O1xuXG4gIGNvbnN0IGFwcGVuZCA9IHRva2VuID0+IHtcbiAgICBzdGF0ZS5vdXRwdXQgKz0gdG9rZW4ub3V0cHV0ICE9IG51bGwgPyB0b2tlbi5vdXRwdXQgOiB0b2tlbi52YWx1ZTtcbiAgICBjb25zdW1lKHRva2VuLnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBuZWdhdGUgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMTtcblxuICAgIHdoaWxlIChwZWVrKCkgPT09ICchJyAmJiAocGVlaygyKSAhPT0gJygnIHx8IHBlZWsoMykgPT09ICc/JykpIHtcbiAgICAgIGFkdmFuY2UoKTtcbiAgICAgIHN0YXRlLnN0YXJ0Kys7XG4gICAgICBjb3VudCsrO1xuICAgIH1cblxuICAgIGlmIChjb3VudCAlIDIgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5uZWdhdGVkID0gdHJ1ZTtcbiAgICBzdGF0ZS5zdGFydCsrO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGluY3JlbWVudCA9IHR5cGUgPT4ge1xuICAgIHN0YXRlW3R5cGVdKys7XG4gICAgc3RhY2sucHVzaCh0eXBlKTtcbiAgfTtcblxuICBjb25zdCBkZWNyZW1lbnQgPSB0eXBlID0+IHtcbiAgICBzdGF0ZVt0eXBlXS0tO1xuICAgIHN0YWNrLnBvcCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIHRva2VucyBvbnRvIHRoZSB0b2tlbnMgYXJyYXkuIFRoaXMgaGVscGVyIHNwZWVkcyB1cFxuICAgKiB0b2tlbml6aW5nIGJ5IDEpIGhlbHBpbmcgdXMgYXZvaWQgYmFja3RyYWNraW5nIGFzIG11Y2ggYXMgcG9zc2libGUsXG4gICAqIGFuZCAyKSBoZWxwaW5nIHVzIGF2b2lkIGNyZWF0aW5nIGV4dHJhIHRva2VucyB3aGVuIGNvbnNlY3V0aXZlXG4gICAqIGNoYXJhY3RlcnMgYXJlIHBsYWluIHRleHQuIFRoaXMgaW1wcm92ZXMgcGVyZm9ybWFuY2UgYW5kIHNpbXBsaWZpZXNcbiAgICogbG9va2JlaGluZHMuXG4gICAqL1xuXG4gIGNvbnN0IHB1c2ggPSB0b2sgPT4ge1xuICAgIGlmIChwcmV2LnR5cGUgPT09ICdnbG9ic3RhcicpIHtcbiAgICAgIGNvbnN0IGlzQnJhY2UgPSBzdGF0ZS5icmFjZXMgPiAwICYmICh0b2sudHlwZSA9PT0gJ2NvbW1hJyB8fCB0b2sudHlwZSA9PT0gJ2JyYWNlJyk7XG4gICAgICBjb25zdCBpc0V4dGdsb2IgPSB0b2suZXh0Z2xvYiA9PT0gdHJ1ZSB8fCAoZXh0Z2xvYnMubGVuZ3RoICYmICh0b2sudHlwZSA9PT0gJ3BpcGUnIHx8IHRvay50eXBlID09PSAncGFyZW4nKSk7XG5cbiAgICAgIGlmICh0b2sudHlwZSAhPT0gJ3NsYXNoJyAmJiB0b2sudHlwZSAhPT0gJ3BhcmVuJyAmJiAhaXNCcmFjZSAmJiAhaXNFeHRnbG9iKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi5vdXRwdXQubGVuZ3RoKTtcbiAgICAgICAgcHJldi50eXBlID0gJ3N0YXInO1xuICAgICAgICBwcmV2LnZhbHVlID0gJyonO1xuICAgICAgICBwcmV2Lm91dHB1dCA9IHN0YXI7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2Lm91dHB1dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0Z2xvYnMubGVuZ3RoICYmIHRvay50eXBlICE9PSAncGFyZW4nKSB7XG4gICAgICBleHRnbG9ic1tleHRnbG9icy5sZW5ndGggLSAxXS5pbm5lciArPSB0b2sudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKHRvay52YWx1ZSB8fCB0b2sub3V0cHV0KSBhcHBlbmQodG9rKTtcbiAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICd0ZXh0JyAmJiB0b2sudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBwcmV2LnZhbHVlICs9IHRvay52YWx1ZTtcbiAgICAgIHByZXYub3V0cHV0ID0gKHByZXYub3V0cHV0IHx8ICcnKSArIHRvay52YWx1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2sucHJldiA9IHByZXY7XG4gICAgdG9rZW5zLnB1c2godG9rKTtcbiAgICBwcmV2ID0gdG9rO1xuICB9O1xuXG4gIGNvbnN0IGV4dGdsb2JPcGVuID0gKHR5cGUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSB7IC4uLkVYVEdMT0JfQ0hBUlNbdmFsdWVdLCBjb25kaXRpb25zOiAxLCBpbm5lcjogJycgfTtcblxuICAgIHRva2VuLnByZXYgPSBwcmV2O1xuICAgIHRva2VuLnBhcmVucyA9IHN0YXRlLnBhcmVucztcbiAgICB0b2tlbi5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQ7XG4gICAgY29uc3Qgb3V0cHV0ID0gKG9wdHMuY2FwdHVyZSA/ICcoJyA6ICcnKSArIHRva2VuLm9wZW47XG5cbiAgICBpbmNyZW1lbnQoJ3BhcmVucycpO1xuICAgIHB1c2goeyB0eXBlLCB2YWx1ZSwgb3V0cHV0OiBzdGF0ZS5vdXRwdXQgPyAnJyA6IE9ORV9DSEFSIH0pO1xuICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZTogYWR2YW5jZSgpLCBvdXRwdXQgfSk7XG4gICAgZXh0Z2xvYnMucHVzaCh0b2tlbik7XG4gIH07XG5cbiAgY29uc3QgZXh0Z2xvYkNsb3NlID0gdG9rZW4gPT4ge1xuICAgIGxldCBvdXRwdXQgPSB0b2tlbi5jbG9zZSArIChvcHRzLmNhcHR1cmUgPyAnKScgOiAnJyk7XG4gICAgbGV0IHJlc3Q7XG5cbiAgICBpZiAodG9rZW4udHlwZSA9PT0gJ25lZ2F0ZScpIHtcbiAgICAgIGxldCBleHRnbG9iU3RhciA9IHN0YXI7XG5cbiAgICAgIGlmICh0b2tlbi5pbm5lciAmJiB0b2tlbi5pbm5lci5sZW5ndGggPiAxICYmIHRva2VuLmlubmVyLmluY2x1ZGVzKCcvJykpIHtcbiAgICAgICAgZXh0Z2xvYlN0YXIgPSBnbG9ic3RhcihvcHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV4dGdsb2JTdGFyICE9PSBzdGFyIHx8IGVvcygpIHx8IC9eXFwpKyQvLnRlc3QocmVtYWluaW5nKCkpKSB7XG4gICAgICAgIG91dHB1dCA9IHRva2VuLmNsb3NlID0gYCkkKSkke2V4dGdsb2JTdGFyfWA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5pbm5lci5pbmNsdWRlcygnKicpICYmIChyZXN0ID0gcmVtYWluaW5nKCkpICYmIC9eXFwuW15cXFxcLy5dKyQvLnRlc3QocmVzdCkpIHtcbiAgICAgICAgb3V0cHV0ID0gdG9rZW4uY2xvc2UgPSBgKSR7cmVzdH0pJHtleHRnbG9iU3Rhcn0pYDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnByZXYudHlwZSA9PT0gJ2JvcycpIHtcbiAgICAgICAgc3RhdGUubmVnYXRlZEV4dGdsb2IgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgIGRlY3JlbWVudCgncGFyZW5zJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZhc3QgcGF0aHNcbiAgICovXG5cbiAgaWYgKG9wdHMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAhLyheWyohXXxbLygpW1xcXXt9XCJdKS8udGVzdChpbnB1dCkpIHtcbiAgICBsZXQgYmFja3NsYXNoZXMgPSBmYWxzZTtcblxuICAgIGxldCBvdXRwdXQgPSBpbnB1dC5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRiwgKG0sIGVzYywgY2hhcnMsIGZpcnN0LCByZXN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGZpcnN0ID09PSAnXFxcXCcpIHtcbiAgICAgICAgYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnPycpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gcW1hcmtOb0RvdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUU1BUksucmVwZWF0KGNoYXJzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJy4nKSB7XG4gICAgICAgIHJldHVybiBET1RfTElURVJBTC5yZXBlYXQoY2hhcnMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnKicpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gc3RhciA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlc2MgPyBtIDogYFxcXFwke219YDtcbiAgICB9KTtcblxuICAgIGlmIChiYWNrc2xhc2hlcyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwrL2csIG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLmxlbmd0aCAlIDIgPT09IDAgPyAnXFxcXFxcXFwnIDogKG0gPyAnXFxcXCcgOiAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvdXRwdXQgPT09IGlucHV0ICYmIG9wdHMuY29udGFpbnMgPT09IHRydWUpIHtcbiAgICAgIHN0YXRlLm91dHB1dCA9IGlucHV0O1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHN0YXRlLm91dHB1dCA9IHV0aWxzLndyYXBPdXRwdXQob3V0cHV0LCBzdGF0ZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRva2VuaXplIGlucHV0IHVudGlsIHdlIHJlYWNoIGVuZC1vZi1zdHJpbmdcbiAgICovXG5cbiAgd2hpbGUgKCFlb3MoKSkge1xuICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFx1MDAwMCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVzY2FwZWQgY2hhcmFjdGVyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFxcXCcpIHtcbiAgICAgIGNvbnN0IG5leHQgPSBwZWVrKCk7XG5cbiAgICAgIGlmIChuZXh0ID09PSAnLycgJiYgb3B0cy5iYXNoICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCA9PT0gJy4nIHx8IG5leHQgPT09ICc7Jykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHZhbHVlICs9ICdcXFxcJztcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsYXBzZSBzbGFzaGVzIHRvIHJlZHVjZSBwb3RlbnRpYWwgZm9yIGV4cGxvaXRzXG4gICAgICBjb25zdCBtYXRjaCA9IC9eXFxcXCsvLmV4ZWMocmVtYWluaW5nKCkpO1xuICAgICAgbGV0IHNsYXNoZXMgPSAwO1xuXG4gICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMF0ubGVuZ3RoID4gMikge1xuICAgICAgICBzbGFzaGVzID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBzdGF0ZS5pbmRleCArPSBzbGFzaGVzO1xuICAgICAgICBpZiAoc2xhc2hlcyAlIDIgIT09IDApIHtcbiAgICAgICAgICB2YWx1ZSArPSAnXFxcXCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgdmFsdWUgPSBhZHZhbmNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSBhZHZhbmNlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5icmFja2V0cyA9PT0gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgd2UncmUgaW5zaWRlIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGJyYWNrZXQuXG4gICAgICovXG5cbiAgICBpZiAoc3RhdGUuYnJhY2tldHMgPiAwICYmICh2YWx1ZSAhPT0gJ10nIHx8IHByZXYudmFsdWUgPT09ICdbJyB8fCBwcmV2LnZhbHVlID09PSAnW14nKSkge1xuICAgICAgaWYgKG9wdHMucG9zaXggIT09IGZhbHNlICYmIHZhbHVlID09PSAnOicpIHtcbiAgICAgICAgY29uc3QgaW5uZXIgPSBwcmV2LnZhbHVlLnNsaWNlKDEpO1xuICAgICAgICBpZiAoaW5uZXIuaW5jbHVkZXMoJ1snKSkge1xuICAgICAgICAgIHByZXYucG9zaXggPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKGlubmVyLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHByZXYudmFsdWUubGFzdEluZGV4T2YoJ1snKTtcbiAgICAgICAgICAgIGNvbnN0IHByZSA9IHByZXYudmFsdWUuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3QgPSBwcmV2LnZhbHVlLnNsaWNlKGlkeCArIDIpO1xuICAgICAgICAgICAgY29uc3QgcG9zaXggPSBQT1NJWF9SRUdFWF9TT1VSQ0VbcmVzdF07XG4gICAgICAgICAgICBpZiAocG9zaXgpIHtcbiAgICAgICAgICAgICAgcHJldi52YWx1ZSA9IHByZSArIHBvc2l4O1xuICAgICAgICAgICAgICBzdGF0ZS5iYWNrdHJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICBhZHZhbmNlKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCFib3Mub3V0cHV0ICYmIHRva2Vucy5pbmRleE9mKHByZXYpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9zLm91dHB1dCA9IE9ORV9DSEFSO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKHZhbHVlID09PSAnWycgJiYgcGVlaygpICE9PSAnOicpIHx8ICh2YWx1ZSA9PT0gJy0nICYmIHBlZWsoKSA9PT0gJ10nKSkge1xuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPT09ICddJyAmJiAocHJldi52YWx1ZSA9PT0gJ1snIHx8IHByZXYudmFsdWUgPT09ICdbXicpKSB7XG4gICAgICAgIHZhbHVlID0gYFxcXFwke3ZhbHVlfWA7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnBvc2l4ID09PSB0cnVlICYmIHZhbHVlID09PSAnIScgJiYgcHJldi52YWx1ZSA9PT0gJ1snKSB7XG4gICAgICAgIHZhbHVlID0gJ14nO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB3ZSdyZSBpbnNpZGUgYSBxdW90ZWQgc3RyaW5nLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGRvdWJsZSBxdW90ZS5cbiAgICAgKi9cblxuICAgIGlmIChzdGF0ZS5xdW90ZXMgPT09IDEgJiYgdmFsdWUgIT09ICdcIicpIHtcbiAgICAgIHZhbHVlID0gdXRpbHMuZXNjYXBlUmVnZXgodmFsdWUpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG91YmxlIHF1b3Rlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXCInKSB7XG4gICAgICBzdGF0ZS5xdW90ZXMgPSBzdGF0ZS5xdW90ZXMgPT09IDEgPyAwIDogMTtcbiAgICAgIGlmIChvcHRzLmtlZXBRdW90ZXMgPT09IHRydWUpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJlbnRoZXNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKCcpIHtcbiAgICAgIGluY3JlbWVudCgncGFyZW5zJyk7XG4gICAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICcpJykge1xuICAgICAgaWYgKHN0YXRlLnBhcmVucyA9PT0gMCAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignb3BlbmluZycsICcoJykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRnbG9iID0gZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAoZXh0Z2xvYiAmJiBzdGF0ZS5wYXJlbnMgPT09IGV4dGdsb2IucGFyZW5zICsgMSkge1xuICAgICAgICBleHRnbG9iQ2xvc2UoZXh0Z2xvYnMucG9wKCkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIHZhbHVlLCBvdXRwdXQ6IHN0YXRlLnBhcmVucyA/ICcpJyA6ICdcXFxcKScgfSk7XG4gICAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3F1YXJlIGJyYWNrZXRzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICdbJykge1xuICAgICAgaWYgKG9wdHMubm9icmFja2V0ID09PSB0cnVlIHx8ICFyZW1haW5pbmcoKS5pbmNsdWRlcygnXScpKSB7XG4gICAgICAgIGlmIChvcHRzLm5vYnJhY2tldCAhPT0gdHJ1ZSAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ10nKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5jcmVtZW50KCdicmFja2V0cycpO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2JyYWNrZXQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJ10nKSB7XG4gICAgICBpZiAob3B0cy5ub2JyYWNrZXQgPT09IHRydWUgfHwgKHByZXYgJiYgcHJldi50eXBlID09PSAnYnJhY2tldCcgJiYgcHJldi52YWx1ZS5sZW5ndGggPT09IDEpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQ6IGBcXFxcJHt2YWx1ZX1gIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmJyYWNrZXRzID09PSAwKSB7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdvcGVuaW5nJywgJ1snKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiBgXFxcXCR7dmFsdWV9YCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGRlY3JlbWVudCgnYnJhY2tldHMnKTtcblxuICAgICAgY29uc3QgcHJldlZhbHVlID0gcHJldi52YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlmIChwcmV2LnBvc2l4ICE9PSB0cnVlICYmIHByZXZWYWx1ZVswXSA9PT0gJ14nICYmICFwcmV2VmFsdWUuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICB2YWx1ZSA9IGAvJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgICAgLy8gYXNzdW1lIHdlIHNob3VsZCBtYXRjaCB3aXRoIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IGZhbHNlIHx8IHV0aWxzLmhhc1JlZ2V4Q2hhcnMocHJldlZhbHVlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXNjYXBlZCA9IHV0aWxzLmVzY2FwZVJlZ2V4KHByZXYudmFsdWUpO1xuICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC1wcmV2LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBlbmFibGVkXG4gICAgICAvLyBhc3N1bWUgd2Ugc2hvdWxkIGVzY2FwZSB0aGUgYnJhY2tldHMgdG8gbWF0Y2ggbGl0ZXJhbCBjaGFyYWN0ZXJzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IGVzY2FwZWQ7XG4gICAgICAgIHByZXYudmFsdWUgPSBlc2NhcGVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBzcGVjaWZpZXMgbm90aGluZywgdHJ5IHRvIG1hdGNoIGJvdGhcbiAgICAgIHByZXYudmFsdWUgPSBgKCR7Y2FwdHVyZX0ke2VzY2FwZWR9fCR7cHJldi52YWx1ZX0pYDtcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2LnZhbHVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJhY2VzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICd7JyAmJiBvcHRzLm5vYnJhY2UgIT09IHRydWUpIHtcbiAgICAgIGluY3JlbWVudCgnYnJhY2VzJyk7XG5cbiAgICAgIGNvbnN0IG9wZW4gPSB7XG4gICAgICAgIHR5cGU6ICdicmFjZScsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvdXRwdXQ6ICcoJyxcbiAgICAgICAgb3V0cHV0SW5kZXg6IHN0YXRlLm91dHB1dC5sZW5ndGgsXG4gICAgICAgIHRva2Vuc0luZGV4OiBzdGF0ZS50b2tlbnMubGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICBicmFjZXMucHVzaChvcGVuKTtcbiAgICAgIHB1c2gob3Blbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICd9Jykge1xuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAob3B0cy5ub2JyYWNlID09PSB0cnVlIHx8ICFicmFjZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSAnKSc7XG5cbiAgICAgIGlmIChicmFjZS5kb3RzID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRva2Vucy5zbGljZSgpO1xuICAgICAgICBjb25zdCByYW5nZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlID09PSAnYnJhY2UnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlICE9PSAnZG90cycpIHtcbiAgICAgICAgICAgIHJhbmdlLnVuc2hpZnQoYXJyW2ldLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQgPSBleHBhbmRSYW5nZShyYW5nZSwgb3B0cyk7XG4gICAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChicmFjZS5jb21tYSAhPT0gdHJ1ZSAmJiBicmFjZS5kb3RzICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG91dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCBicmFjZS5vdXRwdXRJbmRleCk7XG4gICAgICAgIGNvbnN0IHRva3MgPSBzdGF0ZS50b2tlbnMuc2xpY2UoYnJhY2UudG9rZW5zSW5kZXgpO1xuICAgICAgICBicmFjZS52YWx1ZSA9IGJyYWNlLm91dHB1dCA9ICdcXFxceyc7XG4gICAgICAgIHZhbHVlID0gb3V0cHV0ID0gJ1xcXFx9JztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gb3V0O1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgdG9rcykge1xuICAgICAgICAgIHN0YXRlLm91dHB1dCArPSAodC5vdXRwdXQgfHwgdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdicmFjZScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBkZWNyZW1lbnQoJ2JyYWNlcycpO1xuICAgICAgYnJhY2VzLnBvcCgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlwZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ3wnKSB7XG4gICAgICBpZiAoZXh0Z2xvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBleHRnbG9ic1tleHRnbG9icy5sZW5ndGggLSAxXS5jb25kaXRpb25zKys7XG4gICAgICB9XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbW1hc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnLCcpIHtcbiAgICAgIGxldCBvdXRwdXQgPSB2YWx1ZTtcblxuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGJyYWNlICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID09PSAnYnJhY2VzJykge1xuICAgICAgICBicmFjZS5jb21tYSA9IHRydWU7XG4gICAgICAgIG91dHB1dCA9ICd8JztcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdjb21tYScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGFzaGVzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICcvJykge1xuICAgICAgLy8gaWYgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2xvYiBpcyBcIi4vXCIsIGFkdmFuY2UgdGhlIHN0YXJ0XG4gICAgICAvLyB0byB0aGUgY3VycmVudCBpbmRleCwgYW5kIGRvbid0IGFkZCB0aGUgXCIuL1wiIGNoYXJhY3RlcnNcbiAgICAgIC8vIHRvIHRoZSBzdGF0ZS4gVGhpcyBncmVhdGx5IHNpbXBsaWZpZXMgbG9va2JlaGluZHMgd2hlblxuICAgICAgLy8gY2hlY2tpbmcgZm9yIEJPUyBjaGFyYWN0ZXJzIGxpa2UgXCIhXCIgYW5kIFwiLlwiIChub3QgXCIuL1wiKVxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcgJiYgc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0ICsgMSkge1xuICAgICAgICBzdGF0ZS5zdGFydCA9IHN0YXRlLmluZGV4ICsgMTtcbiAgICAgICAgc3RhdGUuY29uc3VtZWQgPSAnJztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gJyc7XG4gICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgcHJldiA9IGJvczsgLy8gcmVzZXQgXCJwcmV2XCIgdG8gdGhlIGZpcnN0IHRva2VuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWUsIG91dHB1dDogU0xBU0hfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdHNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJy4nKSB7XG4gICAgICBpZiAoc3RhdGUuYnJhY2VzID4gMCAmJiBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICAgIGlmIChwcmV2LnZhbHVlID09PSAnLicpIHByZXYub3V0cHV0ID0gRE9UX0xJVEVSQUw7XG4gICAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgcHJldi50eXBlID0gJ2RvdHMnO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSB2YWx1ZTtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgYnJhY2UuZG90cyA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHN0YXRlLmJyYWNlcyArIHN0YXRlLnBhcmVucykgPT09IDAgJiYgcHJldi50eXBlICE9PSAnYm9zJyAmJiBwcmV2LnR5cGUgIT09ICdzbGFzaCcpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogRE9UX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2RvdCcsIHZhbHVlLCBvdXRwdXQ6IERPVF9MSVRFUkFMIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVlc3Rpb24gbWFya3NcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJz8nKSB7XG4gICAgICBjb25zdCBpc0dyb3VwID0gcHJldiAmJiBwcmV2LnZhbHVlID09PSAnKCc7XG4gICAgICBpZiAoIWlzR3JvdXAgJiYgb3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIGV4dGdsb2JPcGVuKCdxbWFyaycsIHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3BhcmVuJykge1xuICAgICAgICBjb25zdCBuZXh0ID0gcGVlaygpO1xuICAgICAgICBsZXQgb3V0cHV0ID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICc8JyAmJiAhdXRpbHMuc3VwcG9ydHNMb29rYmVoaW5kcygpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmpzIHYxMCBvciBoaWdoZXIgaXMgcmVxdWlyZWQgZm9yIHJlZ2V4IGxvb2tiZWhpbmRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXYudmFsdWUgPT09ICcoJyAmJiAhL1shPTw6XS8udGVzdChuZXh0KSkgfHwgKG5leHQgPT09ICc8JyAmJiAhLzwoWyE9XXxcXHcrPikvLnRlc3QocmVtYWluaW5nKCkpKSkge1xuICAgICAgICAgIG91dHB1dCA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLmRvdCAhPT0gdHJ1ZSAmJiAocHJldi50eXBlID09PSAnc2xhc2gnIHx8IHByZXYudHlwZSA9PT0gJ2JvcycpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncW1hcmsnLCB2YWx1ZSwgb3V0cHV0OiBRTUFSS19OT19ET1QgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3FtYXJrJywgdmFsdWUsIG91dHB1dDogUU1BUksgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGNsYW1hdGlvblxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnIScpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJykge1xuICAgICAgICBpZiAocGVlaygyKSAhPT0gJz8nIHx8ICEvWyE9PDpdLy50ZXN0KHBlZWsoMykpKSB7XG4gICAgICAgICAgZXh0Z2xvYk9wZW4oJ25lZ2F0ZScsIHZhbHVlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5ub25lZ2F0ZSAhPT0gdHJ1ZSAmJiBzdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICBuZWdhdGUoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGx1c1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKycpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJyAmJiBwZWVrKDIpICE9PSAnPycpIHtcbiAgICAgICAgZXh0Z2xvYk9wZW4oJ3BsdXMnLCB2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgcHJldi52YWx1ZSA9PT0gJygnKSB8fCBvcHRzLnJlZ2V4ID09PSBmYWxzZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3BsdXMnLCB2YWx1ZSwgb3V0cHV0OiBQTFVTX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgKHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnIHx8IHByZXYudHlwZSA9PT0gJ3BhcmVuJyB8fCBwcmV2LnR5cGUgPT09ICdicmFjZScpKSB8fCBzdGF0ZS5wYXJlbnMgPiAwKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncGx1cycsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwbHVzJywgdmFsdWU6IFBMVVNfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHRcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ0AnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnYXQnLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhaW4gdGV4dFxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlICE9PSAnKicpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJyQnIHx8IHZhbHVlID09PSAnXicpIHtcbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF0Y2ggPSBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUy5leGVjKHJlbWFpbmluZygpKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB2YWx1ZSArPSBtYXRjaFswXTtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJzXG4gICAgICovXG5cbiAgICBpZiAocHJldiAmJiAocHJldi50eXBlID09PSAnZ2xvYnN0YXInIHx8IHByZXYuc3RhciA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByZXYudHlwZSA9ICdzdGFyJztcbiAgICAgIHByZXYuc3RhciA9IHRydWU7XG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSBzdGFyO1xuICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3QgPSByZW1haW5pbmcoKTtcbiAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgL15cXChbXj9dLy50ZXN0KHJlc3QpKSB7XG4gICAgICBleHRnbG9iT3Blbignc3RhcicsIHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2LnR5cGUgPT09ICdzdGFyJykge1xuICAgICAgaWYgKG9wdHMubm9nbG9ic3RhciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByaW9yID0gcHJldi5wcmV2O1xuICAgICAgY29uc3QgYmVmb3JlID0gcHJpb3IucHJldjtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBwcmlvci50eXBlID09PSAnc2xhc2gnIHx8IHByaW9yLnR5cGUgPT09ICdib3MnO1xuICAgICAgY29uc3QgYWZ0ZXJTdGFyID0gYmVmb3JlICYmIChiZWZvcmUudHlwZSA9PT0gJ3N0YXInIHx8IGJlZm9yZS50eXBlID09PSAnZ2xvYnN0YXInKTtcblxuICAgICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSAmJiAoIWlzU3RhcnQgfHwgKHJlc3RbMF0gJiYgcmVzdFswXSAhPT0gJy8nKSkpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0JyYWNlID0gc3RhdGUuYnJhY2VzID4gMCAmJiAocHJpb3IudHlwZSA9PT0gJ2NvbW1hJyB8fCBwcmlvci50eXBlID09PSAnYnJhY2UnKTtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYiA9IGV4dGdsb2JzLmxlbmd0aCAmJiAocHJpb3IudHlwZSA9PT0gJ3BpcGUnIHx8IHByaW9yLnR5cGUgPT09ICdwYXJlbicpO1xuICAgICAgaWYgKCFpc1N0YXJ0ICYmIHByaW9yLnR5cGUgIT09ICdwYXJlbicgJiYgIWlzQnJhY2UgJiYgIWlzRXh0Z2xvYikge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3N0YXInLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHN0cmlwIGNvbnNlY3V0aXZlIGAvKiovYFxuICAgICAgd2hpbGUgKHJlc3Quc2xpY2UoMCwgMykgPT09ICcvKionKSB7XG4gICAgICAgIGNvbnN0IGFmdGVyID0gaW5wdXRbc3RhdGUuaW5kZXggKyA0XTtcbiAgICAgICAgaWYgKGFmdGVyICYmIGFmdGVyICE9PSAnLycpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN0ID0gcmVzdC5zbGljZSgzKTtcbiAgICAgICAgY29uc3VtZSgnLyoqJywgMyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiBlb3MoKSkge1xuICAgICAgICBwcmV2LnR5cGUgPSAnZ2xvYnN0YXInO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgIWFmdGVyU3RhciAmJiBlb3MoKSkge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKSArIChvcHRzLnN0cmljdFNsYXNoZXMgPyAnKScgOiAnfCQpJyk7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByaW9yLm91dHB1dCArIHByZXYub3V0cHV0O1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgcmVzdFswXSA9PT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHJlc3RbMV0gIT09IHZvaWQgMCA/ICd8JCcgOiAnJztcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgJHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9fCR7U0xBU0hfTElURVJBTH0ke2VuZH0pYDtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcblxuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWU6ICcvJywgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiByZXN0WzBdID09PSAnLycpIHtcbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgKD86Xnwke1NMQVNIX0xJVEVSQUx9fCR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSlgO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlOiAnLycsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgc2luZ2xlIHN0YXIgZnJvbSBvdXRwdXRcbiAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi5vdXRwdXQubGVuZ3RoKTtcblxuICAgICAgLy8gcmVzZXQgcHJldmlvdXMgdG9rZW4gdG8gZ2xvYnN0YXJcbiAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgLy8gcmVzZXQgb3V0cHV0IHdpdGggZ2xvYnN0YXJcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2Lm91dHB1dDtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSB7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogc3RhciB9O1xuXG4gICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSkge1xuICAgICAgdG9rZW4ub3V0cHV0ID0gJy4qPyc7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnYm9zJyB8fCBwcmV2LnR5cGUgPT09ICdzbGFzaCcpIHtcbiAgICAgICAgdG9rZW4ub3V0cHV0ID0gbm9kb3QgKyB0b2tlbi5vdXRwdXQ7XG4gICAgICB9XG4gICAgICBwdXNoKHRva2VuKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIChwcmV2LnR5cGUgPT09ICdicmFja2V0JyB8fCBwcmV2LnR5cGUgPT09ICdwYXJlbicpICYmIG9wdHMucmVnZXggPT09IHRydWUpIHtcbiAgICAgIHRva2VuLm91dHB1dCA9IHZhbHVlO1xuICAgICAgcHVzaCh0b2tlbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0IHx8IHByZXYudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gTk9fRE9UX1NMQVNIO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBOT19ET1RfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kb3QgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBub2RvdDtcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gbm9kb3Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChwZWVrKCkgIT09ICcqJykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gT05FX0NIQVI7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE9ORV9DSEFSO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2godG9rZW4pO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNrZXRzID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnXScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJ1snKTtcbiAgICBkZWNyZW1lbnQoJ2JyYWNrZXRzJyk7XG4gIH1cblxuICB3aGlsZSAoc3RhdGUucGFyZW5zID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnKScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJygnKTtcbiAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNlcyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ30nKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICd7Jyk7XG4gICAgZGVjcmVtZW50KCdicmFjZXMnKTtcbiAgfVxuXG4gIGlmIChvcHRzLnN0cmljdFNsYXNoZXMgIT09IHRydWUgJiYgKHByZXYudHlwZSA9PT0gJ3N0YXInIHx8IHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnKSkge1xuICAgIHB1c2goeyB0eXBlOiAnbWF5YmVfc2xhc2gnLCB2YWx1ZTogJycsIG91dHB1dDogYCR7U0xBU0hfTElURVJBTH0/YCB9KTtcbiAgfVxuXG4gIC8vIHJlYnVpbGQgdGhlIG91dHB1dCBpZiB3ZSBoYWQgdG8gYmFja3RyYWNrIGF0IGFueSBwb2ludFxuICBpZiAoc3RhdGUuYmFja3RyYWNrID09PSB0cnVlKSB7XG4gICAgc3RhdGUub3V0cHV0ID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHN0YXRlLnRva2Vucykge1xuICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLm91dHB1dCAhPSBudWxsID8gdG9rZW4ub3V0cHV0IDogdG9rZW4udmFsdWU7XG5cbiAgICAgIGlmICh0b2tlbi5zdWZmaXgpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLnN1ZmZpeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEZhc3QgcGF0aHMgZm9yIGNyZWF0aW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIGNvbW1vbiBnbG9iIHBhdHRlcm5zLlxuICogVGhpcyBjYW4gc2lnbmlmaWNhbnRseSBzcGVlZCB1cCBwcm9jZXNzaW5nIGFuZCBoYXMgdmVyeSBsaXR0bGUgZG93bnNpZGVcbiAqIGltcGFjdCB3aGVuIG5vbmUgb2YgdGhlIGZhc3QgcGF0aHMgbWF0Y2guXG4gKi9cblxucGFyc2UuZmFzdHBhdGhzID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG4gIGNvbnN0IGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgaWYgKGxlbiA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoOiAke2xlbn0sIGV4Y2VlZHMgbWF4aW11bSBhbGxvd2VkIGxlbmd0aDogJHttYXh9YCk7XG4gIH1cblxuICBpbnB1dCA9IFJFUExBQ0VNRU5UU1tpbnB1dF0gfHwgaW5wdXQ7XG4gIGNvbnN0IHdpbjMyID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuXG4gIC8vIGNyZWF0ZSBjb25zdGFudHMgYmFzZWQgb24gcGxhdGZvcm0sIGZvciB3aW5kb3dzIG9yIHBvc2l4XG4gIGNvbnN0IHtcbiAgICBET1RfTElURVJBTCxcbiAgICBTTEFTSF9MSVRFUkFMLFxuICAgIE9ORV9DSEFSLFxuICAgIERPVFNfU0xBU0gsXG4gICAgTk9fRE9ULFxuICAgIE5PX0RPVFMsXG4gICAgTk9fRE9UU19TTEFTSCxcbiAgICBTVEFSLFxuICAgIFNUQVJUX0FOQ0hPUlxuICB9ID0gY29uc3RhbnRzLmdsb2JDaGFycyh3aW4zMik7XG5cbiAgY29uc3Qgbm9kb3QgPSBvcHRzLmRvdCA/IE5PX0RPVFMgOiBOT19ET1Q7XG4gIGNvbnN0IHNsYXNoRG90ID0gb3B0cy5kb3QgPyBOT19ET1RTX1NMQVNIIDogTk9fRE9UO1xuICBjb25zdCBjYXB0dXJlID0gb3B0cy5jYXB0dXJlID8gJycgOiAnPzonO1xuICBjb25zdCBzdGF0ZSA9IHsgbmVnYXRlZDogZmFsc2UsIHByZWZpeDogJycgfTtcbiAgbGV0IHN0YXIgPSBvcHRzLmJhc2ggPT09IHRydWUgPyAnLio/JyA6IFNUQVI7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgIHN0YXIgPSBgKCR7c3Rhcn0pYDtcbiAgfVxuXG4gIGNvbnN0IGdsb2JzdGFyID0gb3B0cyA9PiB7XG4gICAgaWYgKG9wdHMubm9nbG9ic3RhciA9PT0gdHJ1ZSkgcmV0dXJuIHN0YXI7XG4gICAgcmV0dXJuIGAoJHtjYXB0dXJlfSg/Oig/ISR7U1RBUlRfQU5DSE9SfSR7b3B0cy5kb3QgPyBET1RTX1NMQVNIIDogRE9UX0xJVEVSQUx9KS4pKj8pYDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGUgPSBzdHIgPT4ge1xuICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgcmV0dXJuIGAke25vZG90fSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJy4qJzpcbiAgICAgICAgcmV0dXJuIGAke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyouKic6XG4gICAgICAgIHJldHVybiBgJHtub2RvdH0ke3N0YXJ9JHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqLyonOlxuICAgICAgICByZXR1cm4gYCR7bm9kb3R9JHtzdGFyfSR7U0xBU0hfTElURVJBTH0ke09ORV9DSEFSfSR7c2xhc2hEb3R9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqJzpcbiAgICAgICAgcmV0dXJuIG5vZG90ICsgZ2xvYnN0YXIob3B0cyk7XG5cbiAgICAgIGNhc2UgJyoqLyonOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke3NsYXNoRG90fSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqLyouKic6XG4gICAgICAgIHJldHVybiBgKD86JHtub2RvdH0ke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pPyR7c2xhc2hEb3R9JHtzdGFyfSR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKiovLionOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSAvXiguKj8pXFwuKFxcdyspJC8uZXhlYyhzdHIpO1xuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gY3JlYXRlKG1hdGNoWzFdKTtcbiAgICAgICAgaWYgKCFzb3VyY2UpIHJldHVybjtcblxuICAgICAgICByZXR1cm4gc291cmNlICsgRE9UX0xJVEVSQUwgKyBtYXRjaFsyXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb3V0cHV0ID0gdXRpbHMucmVtb3ZlUHJlZml4KGlucHV0LCBzdGF0ZSk7XG4gIGxldCBzb3VyY2UgPSBjcmVhdGUob3V0cHV0KTtcblxuICBpZiAoc291cmNlICYmIG9wdHMuc3RyaWN0U2xhc2hlcyAhPT0gdHJ1ZSkge1xuICAgIHNvdXJjZSArPSBgJHtTTEFTSF9MSVRFUkFMfT9gO1xuICB9XG5cbiAgcmV0dXJuIHNvdXJjZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBzY2FuID0gcmVxdWlyZSgnLi9zY2FuJyk7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IGlzT2JqZWN0ID0gdmFsID0+IHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRjaGVyIGZ1bmN0aW9uIGZyb20gb25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucy4gVGhlXG4gKiByZXR1cm5lZCBmdW5jdGlvbiB0YWtlcyBhIHN0cmluZyB0byBtYXRjaCBhcyBpdHMgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgcmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaXMgYSBtYXRjaC4gVGhlIHJldHVybmVkIG1hdGNoZXJcbiAqIGZ1bmN0aW9uIGFsc28gdGFrZXMgYSBib29sZWFuIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdGhhdCwgd2hlbiB0cnVlLFxuICogcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaChnbG9iWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goJyouISgqYSknKTtcbiAqIGNvbnNvbGUubG9nKGlzTWF0Y2goJ2EuYScpKTsgLy89PiBmYWxzZVxuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5iJykpOyAvLz0+IHRydWVcbiAqIGBgYFxuICogQG5hbWUgcGljb21hdGNoXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYGdsb2JzYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLlxuICogQHBhcmFtIHtPYmplY3Q9fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge0Z1bmN0aW9uPX0gUmV0dXJucyBhIG1hdGNoZXIgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmNvbnN0IHBpY29tYXRjaCA9IChnbG9iLCBvcHRpb25zLCByZXR1cm5TdGF0ZSA9IGZhbHNlKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGdsb2IpKSB7XG4gICAgY29uc3QgZm5zID0gZ2xvYi5tYXAoaW5wdXQgPT4gcGljb21hdGNoKGlucHV0LCBvcHRpb25zLCByZXR1cm5TdGF0ZSkpO1xuICAgIGNvbnN0IGFycmF5TWF0Y2hlciA9IHN0ciA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGlzTWF0Y2ggb2YgZm5zKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gaXNNYXRjaChzdHIpO1xuICAgICAgICBpZiAoc3RhdGUpIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheU1hdGNoZXI7XG4gIH1cblxuICBjb25zdCBpc1N0YXRlID0gaXNPYmplY3QoZ2xvYikgJiYgZ2xvYi50b2tlbnMgJiYgZ2xvYi5pbnB1dDtcblxuICBpZiAoZ2xvYiA9PT0gJycgfHwgKHR5cGVvZiBnbG9iICE9PSAnc3RyaW5nJyAmJiAhaXNTdGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBwYXR0ZXJuIHRvIGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHBvc2l4ID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuICBjb25zdCByZWdleCA9IGlzU3RhdGVcbiAgICA/IHBpY29tYXRjaC5jb21waWxlUmUoZ2xvYiwgb3B0aW9ucylcbiAgICA6IHBpY29tYXRjaC5tYWtlUmUoZ2xvYiwgb3B0aW9ucywgZmFsc2UsIHRydWUpO1xuXG4gIGNvbnN0IHN0YXRlID0gcmVnZXguc3RhdGU7XG4gIGRlbGV0ZSByZWdleC5zdGF0ZTtcblxuICBsZXQgaXNJZ25vcmVkID0gKCkgPT4gZmFsc2U7XG4gIGlmIChvcHRzLmlnbm9yZSkge1xuICAgIGNvbnN0IGlnbm9yZU9wdHMgPSB7IC4uLm9wdGlvbnMsIGlnbm9yZTogbnVsbCwgb25NYXRjaDogbnVsbCwgb25SZXN1bHQ6IG51bGwgfTtcbiAgICBpc0lnbm9yZWQgPSBwaWNvbWF0Y2gob3B0cy5pZ25vcmUsIGlnbm9yZU9wdHMsIHJldHVyblN0YXRlKTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoZXIgPSAoaW5wdXQsIHJldHVybk9iamVjdCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBpc01hdGNoLCBtYXRjaCwgb3V0cHV0IH0gPSBwaWNvbWF0Y2gudGVzdChpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHsgZ2xvYiwgcG9zaXggfSk7XG4gICAgY29uc3QgcmVzdWx0ID0geyBnbG9iLCBzdGF0ZSwgcmVnZXgsIHBvc2l4LCBpbnB1dCwgb3V0cHV0LCBtYXRjaCwgaXNNYXRjaCB9O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLm9uUmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRzLm9uUmVzdWx0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc0lnbm9yZWQoaW5wdXQpKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdHMub25JZ25vcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0cy5vbklnbm9yZShyZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgIHJldHVybiByZXR1cm5PYmplY3QgPyByZXN1bHQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMub25NYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0cy5vbk1hdGNoKHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3QgPyByZXN1bHQgOiB0cnVlO1xuICB9O1xuXG4gIGlmIChyZXR1cm5TdGF0ZSkge1xuICAgIG1hdGNoZXIuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVyO1xufTtcblxuLyoqXG4gKiBUZXN0IGBpbnB1dGAgd2l0aCB0aGUgZ2l2ZW4gYHJlZ2V4YC4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBtYWluXG4gKiBgcGljb21hdGNoKClgIGZ1bmN0aW9uIHRvIHRlc3QgdGhlIGlucHV0IHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2gudGVzdChpbnB1dCwgcmVnZXhbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cocGljb21hdGNoLnRlc3QoJ2Zvby9iYXInLCAvXig/OihbXi9dKj8pXFwvKFteL10qPykpJC8pKTtcbiAqIC8vIHsgaXNNYXRjaDogdHJ1ZSwgbWF0Y2g6IFsgJ2Zvby8nLCAnZm9vJywgJ2JhcicgXSwgb3V0cHV0OiAnZm9vL2JhcicgfVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBTdHJpbmcgdG8gdGVzdC5cbiAqIEBwYXJhbSB7UmVnRXhwfSBgcmVnZXhgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggbWF0Y2hpbmcgaW5mby5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnRlc3QgPSAoaW5wdXQsIHJlZ2V4LCBvcHRpb25zLCB7IGdsb2IsIHBvc2l4IH0gPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGlucHV0IHRvIGJlIGEgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoaW5wdXQgPT09ICcnKSB7XG4gICAgcmV0dXJuIHsgaXNNYXRjaDogZmFsc2UsIG91dHB1dDogJycgfTtcbiAgfVxuXG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBmb3JtYXQgPSBvcHRzLmZvcm1hdCB8fCAocG9zaXggPyB1dGlscy50b1Bvc2l4U2xhc2hlcyA6IG51bGwpO1xuICBsZXQgbWF0Y2ggPSBpbnB1dCA9PT0gZ2xvYjtcbiAgbGV0IG91dHB1dCA9IChtYXRjaCAmJiBmb3JtYXQpID8gZm9ybWF0KGlucHV0KSA6IGlucHV0O1xuXG4gIGlmIChtYXRjaCA9PT0gZmFsc2UpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXQgPyBmb3JtYXQoaW5wdXQpIDogaW5wdXQ7XG4gICAgbWF0Y2ggPSBvdXRwdXQgPT09IGdsb2I7XG4gIH1cblxuICBpZiAobWF0Y2ggPT09IGZhbHNlIHx8IG9wdHMuY2FwdHVyZSA9PT0gdHJ1ZSkge1xuICAgIGlmIChvcHRzLm1hdGNoQmFzZSA9PT0gdHJ1ZSB8fCBvcHRzLmJhc2VuYW1lID09PSB0cnVlKSB7XG4gICAgICBtYXRjaCA9IHBpY29tYXRjaC5tYXRjaEJhc2UoaW5wdXQsIHJlZ2V4LCBvcHRpb25zLCBwb3NpeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhvdXRwdXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGlzTWF0Y2g6IEJvb2xlYW4obWF0Y2gpLCBtYXRjaCwgb3V0cHV0IH07XG59O1xuXG4vKipcbiAqIE1hdGNoIHRoZSBiYXNlbmFtZSBvZiBhIGZpbGVwYXRoLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC5tYXRjaEJhc2UoaW5wdXQsIGdsb2JbLCBvcHRpb25zXSk7XG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2gubWF0Y2hCYXNlKCdmb28vYmFyLmpzJywgJyouanMnKTsgLy8gdHJ1ZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBTdHJpbmcgdG8gdGVzdC5cbiAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gYGdsb2JgIEdsb2IgcGF0dGVybiBvciByZWdleCBjcmVhdGVkIGJ5IFsubWFrZVJlXSgjbWFrZVJlKS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5tYXRjaEJhc2UgPSAoaW5wdXQsIGdsb2IsIG9wdGlvbnMsIHBvc2l4ID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpKSA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gZ2xvYiBpbnN0YW5jZW9mIFJlZ0V4cCA/IGdsb2IgOiBwaWNvbWF0Y2gubWFrZVJlKGdsb2IsIG9wdGlvbnMpO1xuICByZXR1cm4gcmVnZXgudGVzdChwYXRoLmJhc2VuYW1lKGlucHV0KSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiAqKmFueSoqIG9mIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuc2AgbWF0Y2ggdGhlIHNwZWNpZmllZCBgc3RyaW5nYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2guaXNNYXRjaChzdHJpbmcsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5pc01hdGNoKCdhLmEnLCBbJ2IuKicsICcqLmEnXSkpOyAvLz0+IHRydWVcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5pc01hdGNoKCdhLmEnLCAnYi4qJykpOyAvLz0+IGZhbHNlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBzdHIgVGhlIHN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHBhdHRlcm5zIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpLlxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFueSBwYXR0ZXJucyBtYXRjaCBgc3RyYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2guaXNNYXRjaCA9IChzdHIsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiBwaWNvbWF0Y2gocGF0dGVybnMsIG9wdGlvbnMpKHN0cik7XG5cbi8qKlxuICogUGFyc2UgYSBnbG9iIHBhdHRlcm4gdG8gY3JlYXRlIHRoZSBzb3VyY2Ugc3RyaW5nIGZvciBhIHJlZ3VsYXJcbiAqIGV4cHJlc3Npb24uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogY29uc3QgcmVzdWx0ID0gcGljb21hdGNoLnBhcnNlKHBhdHRlcm5bLCBvcHRpb25zXSk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB1c2VmdWwgcHJvcGVydGllcyBhbmQgb3V0cHV0IHRvIGJlIHVzZWQgYXMgYSByZWdleCBzb3VyY2Ugc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gucGFyc2UgPSAocGF0dGVybiwgb3B0aW9ucykgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXR0ZXJuKSkgcmV0dXJuIHBhdHRlcm4ubWFwKHAgPT4gcGljb21hdGNoLnBhcnNlKHAsIG9wdGlvbnMpKTtcbiAgcmV0dXJuIHBhcnNlKHBhdHRlcm4sIHsgLi4ub3B0aW9ucywgZmFzdHBhdGhzOiBmYWxzZSB9KTtcbn07XG5cbi8qKlxuICogU2NhbiBhIGdsb2IgcGF0dGVybiB0byBzZXBhcmF0ZSB0aGUgcGF0dGVybiBpbnRvIHNlZ21lbnRzLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC5zY2FuKGlucHV0Wywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IHJlc3VsdCA9IHBpY29tYXRjaC5zY2FuKCchLi9mb28vKi5qcycpO1xuICogY29uc29sZS5sb2cocmVzdWx0KTtcbiAqIHsgcHJlZml4OiAnIS4vJyxcbiAqICAgaW5wdXQ6ICchLi9mb28vKi5qcycsXG4gKiAgIHN0YXJ0OiAzLFxuICogICBiYXNlOiAnZm9vJyxcbiAqICAgZ2xvYjogJyouanMnLFxuICogICBpc0JyYWNlOiBmYWxzZSxcbiAqICAgaXNCcmFja2V0OiBmYWxzZSxcbiAqICAgaXNHbG9iOiB0cnVlLFxuICogICBpc0V4dGdsb2I6IGZhbHNlLFxuICogICBpc0dsb2JzdGFyOiBmYWxzZSxcbiAqICAgbmVnYXRlZDogdHJ1ZSB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIEdsb2IgcGF0dGVybiB0byBzY2FuLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5zY2FuID0gKGlucHV0LCBvcHRpb25zKSA9PiBzY2FuKGlucHV0LCBvcHRpb25zKTtcblxuLyoqXG4gKiBDb21waWxlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIGBzdGF0ZWAgb2JqZWN0IHJldHVybmVkIGJ5IHRoZVxuICogW3BhcnNlKCldKCNwYXJzZSkgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBgc3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5PdXRwdXRgIEludGVuZGVkIGZvciBpbXBsZW1lbnRvcnMsIHRoaXMgYXJndW1lbnQgYWxsb3dzIHlvdSB0byByZXR1cm4gdGhlIHJhdyBvdXRwdXQgZnJvbSB0aGUgcGFyc2VyLlxuICogQHBhcmFtIHtCb29sZWFufSBgcmV0dXJuU3RhdGVgIEFkZHMgdGhlIHN0YXRlIHRvIGEgYHN0YXRlYCBwcm9wZXJ0eSBvbiB0aGUgcmV0dXJuZWQgcmVnZXguIFVzZWZ1bCBmb3IgaW1wbGVtZW50b3JzIGFuZCBkZWJ1Z2dpbmcuXG4gKiBAcmV0dXJuIHtSZWdFeHB9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5jb21waWxlUmUgPSAoc3RhdGUsIG9wdGlvbnMsIHJldHVybk91dHB1dCA9IGZhbHNlLCByZXR1cm5TdGF0ZSA9IGZhbHNlKSA9PiB7XG4gIGlmIChyZXR1cm5PdXRwdXQgPT09IHRydWUpIHtcbiAgICByZXR1cm4gc3RhdGUub3V0cHV0O1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHByZXBlbmQgPSBvcHRzLmNvbnRhaW5zID8gJycgOiAnXic7XG4gIGNvbnN0IGFwcGVuZCA9IG9wdHMuY29udGFpbnMgPyAnJyA6ICckJztcblxuICBsZXQgc291cmNlID0gYCR7cHJlcGVuZH0oPzoke3N0YXRlLm91dHB1dH0pJHthcHBlbmR9YDtcbiAgaWYgKHN0YXRlICYmIHN0YXRlLm5lZ2F0ZWQgPT09IHRydWUpIHtcbiAgICBzb3VyY2UgPSBgXig/ISR7c291cmNlfSkuKiRgO1xuICB9XG5cbiAgY29uc3QgcmVnZXggPSBwaWNvbWF0Y2gudG9SZWdleChzb3VyY2UsIG9wdGlvbnMpO1xuICBpZiAocmV0dXJuU3RhdGUgPT09IHRydWUpIHtcbiAgICByZWdleC5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2V4O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSBhIHBhcnNlZCBnbG9iIHBhdHRlcm4uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogY29uc3Qgc3RhdGUgPSBwaWNvbWF0Y2gucGFyc2UoJyouanMnKTtcbiAqIC8vIHBpY29tYXRjaC5jb21waWxlUmUoc3RhdGVbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cocGljb21hdGNoLmNvbXBpbGVSZShzdGF0ZSkpO1xuICogLy89PiAvXig/Oig/IVxcLikoPz0uKVteL10qP1xcLmpzKSQvXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RhdGVgIFRoZSBvYmplY3QgcmV0dXJuZWQgZnJvbSB0aGUgYC5wYXJzZWAgbWV0aG9kLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHBhcmFtIHtCb29sZWFufSBgcmV0dXJuT3V0cHV0YCBJbXBsZW1lbnRvcnMgbWF5IHVzZSB0aGlzIGFyZ3VtZW50IHRvIHJldHVybiB0aGUgY29tcGlsZWQgb3V0cHV0LCBpbnN0ZWFkIG9mIGEgcmVndWxhciBleHByZXNzaW9uLiBUaGlzIGlzIG5vdCBleHBvc2VkIG9uIHRoZSBvcHRpb25zIHRvIHByZXZlbnQgZW5kLXVzZXJzIGZyb20gbXV0YXRpbmcgdGhlIHJlc3VsdC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYHJldHVyblN0YXRlYCBJbXBsZW1lbnRvcnMgbWF5IHVzZSB0aGlzIGFyZ3VtZW50IHRvIHJldHVybiB0aGUgc3RhdGUgZnJvbSB0aGUgcGFyc2VkIGdsb2Igd2l0aCB0aGUgcmV0dXJuZWQgcmVndWxhciBleHByZXNzaW9uLlxuICogQHJldHVybiB7UmVnRXhwfSBSZXR1cm5zIGEgcmVnZXggY3JlYXRlZCBmcm9tIHRoZSBnaXZlbiBwYXR0ZXJuLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gubWFrZVJlID0gKGlucHV0LCBvcHRpb25zID0ge30sIHJldHVybk91dHB1dCA9IGZhbHNlLCByZXR1cm5TdGF0ZSA9IGZhbHNlKSA9PiB7XG4gIGlmICghaW5wdXQgfHwgdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICB9XG5cbiAgbGV0IHBhcnNlZCA9IHsgbmVnYXRlZDogZmFsc2UsIGZhc3RwYXRoczogdHJ1ZSB9O1xuXG4gIGlmIChvcHRpb25zLmZhc3RwYXRocyAhPT0gZmFsc2UgJiYgKGlucHV0WzBdID09PSAnLicgfHwgaW5wdXRbMF0gPT09ICcqJykpIHtcbiAgICBwYXJzZWQub3V0cHV0ID0gcGFyc2UuZmFzdHBhdGhzKGlucHV0LCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmICghcGFyc2VkLm91dHB1dCkge1xuICAgIHBhcnNlZCA9IHBhcnNlKGlucHV0LCBvcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiBwaWNvbWF0Y2guY29tcGlsZVJlKHBhcnNlZCwgb3B0aW9ucywgcmV0dXJuT3V0cHV0LCByZXR1cm5TdGF0ZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIHRoZSBnaXZlbiByZWdleCBzb3VyY2Ugc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC50b1JlZ2V4KHNvdXJjZVssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCB7IG91dHB1dCB9ID0gcGljb21hdGNoLnBhcnNlKCcqLmpzJyk7XG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2gudG9SZWdleChvdXRwdXQpKTtcbiAqIC8vPT4gL14oPzooPyFcXC4pKD89LilbXi9dKj9cXC5qcykkL1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHNvdXJjZWAgUmVndWxhciBleHByZXNzaW9uIHNvdXJjZSBzdHJpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtSZWdFeHB9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC50b1JlZ2V4ID0gKHNvdXJjZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHNvdXJjZSwgb3B0cy5mbGFncyB8fCAob3B0cy5ub2Nhc2UgPyAnaScgOiAnJykpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRlYnVnID09PSB0cnVlKSB0aHJvdyBlcnI7XG4gICAgcmV0dXJuIC8kXi87XG4gIH1cbn07XG5cbi8qKlxuICogUGljb21hdGNoIGNvbnN0YW50cy5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5waWNvbWF0Y2guY29uc3RhbnRzID0gY29uc3RhbnRzO1xuXG4vKipcbiAqIEV4cG9zZSBcInBpY29tYXRjaFwiXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNvbWF0Y2g7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3Qge1xuICBDSEFSX0FTVEVSSVNLLCAgICAgICAgICAgICAvKiAqICovXG4gIENIQVJfQVQsICAgICAgICAgICAgICAgICAgIC8qIEAgKi9cbiAgQ0hBUl9CQUNLV0FSRF9TTEFTSCwgICAgICAgLyogXFwgKi9cbiAgQ0hBUl9DT01NQSwgICAgICAgICAgICAgICAgLyogLCAqL1xuICBDSEFSX0RPVCwgICAgICAgICAgICAgICAgICAvKiAuICovXG4gIENIQVJfRVhDTEFNQVRJT05fTUFSSywgICAgIC8qICEgKi9cbiAgQ0hBUl9GT1JXQVJEX1NMQVNILCAgICAgICAgLyogLyAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UsICAgICAvKiB7ICovXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUywgICAgIC8qICggKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VULCAgLyogWyAqL1xuICBDSEFSX1BMVVMsICAgICAgICAgICAgICAgICAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSywgICAgICAgIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSwgICAgLyogfSAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTLCAgICAvKiApICovXG4gIENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgIC8qIF0gKi9cbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBpc1BhdGhTZXBhcmF0b3IgPSBjb2RlID0+IHtcbiAgcmV0dXJuIGNvZGUgPT09IENIQVJfRk9SV0FSRF9TTEFTSCB8fCBjb2RlID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIO1xufTtcblxuY29uc3QgZGVwdGggPSB0b2tlbiA9PiB7XG4gIGlmICh0b2tlbi5pc1ByZWZpeCAhPT0gdHJ1ZSkge1xuICAgIHRva2VuLmRlcHRoID0gdG9rZW4uaXNHbG9ic3RhciA/IEluZmluaXR5IDogMTtcbiAgfVxufTtcblxuLyoqXG4gKiBRdWlja2x5IHNjYW5zIGEgZ2xvYiBwYXR0ZXJuIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgaGFuZGZ1bCBvZlxuICogdXNlZnVsIHByb3BlcnRpZXMsIGxpa2UgYGlzR2xvYmAsIGBwYXRoYCAodGhlIGxlYWRpbmcgbm9uLWdsb2IsIGlmIGl0IGV4aXN0cyksXG4gKiBgZ2xvYmAgKHRoZSBhY3R1YWwgcGF0dGVybiksIGBuZWdhdGVkYCAodHJ1ZSBpZiB0aGUgcGF0aCBzdGFydHMgd2l0aCBgIWAgYnV0IG5vdFxuICogd2l0aCBgIShgKSBhbmQgYG5lZ2F0ZWRFeHRnbG9iYCAodHJ1ZSBpZiB0aGUgcGF0aCBzdGFydHMgd2l0aCBgIShgKS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcG0gPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIGNvbnNvbGUubG9nKHBtLnNjYW4oJ2Zvby9iYXIvKi5qcycpKTtcbiAqIHsgaXNHbG9iOiB0cnVlLCBpbnB1dDogJ2Zvby9iYXIvKi5qcycsIGJhc2U6ICdmb28vYmFyJywgZ2xvYjogJyouanMnIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJgXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggdG9rZW5zIGFuZCByZWdleCBzb3VyY2Ugc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBzY2FuID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIDE7XG4gIGNvbnN0IHNjYW5Ub0VuZCA9IG9wdHMucGFydHMgPT09IHRydWUgfHwgb3B0cy5zY2FuVG9FbmQgPT09IHRydWU7XG4gIGNvbnN0IHNsYXNoZXMgPSBbXTtcbiAgY29uc3QgdG9rZW5zID0gW107XG4gIGNvbnN0IHBhcnRzID0gW107XG5cbiAgbGV0IHN0ciA9IGlucHV0O1xuICBsZXQgaW5kZXggPSAtMTtcbiAgbGV0IHN0YXJ0ID0gMDtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGxldCBpc0JyYWNlID0gZmFsc2U7XG4gIGxldCBpc0JyYWNrZXQgPSBmYWxzZTtcbiAgbGV0IGlzR2xvYiA9IGZhbHNlO1xuICBsZXQgaXNFeHRnbG9iID0gZmFsc2U7XG4gIGxldCBpc0dsb2JzdGFyID0gZmFsc2U7XG4gIGxldCBicmFjZUVzY2FwZWQgPSBmYWxzZTtcbiAgbGV0IGJhY2tzbGFzaGVzID0gZmFsc2U7XG4gIGxldCBuZWdhdGVkID0gZmFsc2U7XG4gIGxldCBuZWdhdGVkRXh0Z2xvYiA9IGZhbHNlO1xuICBsZXQgZmluaXNoZWQgPSBmYWxzZTtcbiAgbGV0IGJyYWNlcyA9IDA7XG4gIGxldCBwcmV2O1xuICBsZXQgY29kZTtcbiAgbGV0IHRva2VuID0geyB2YWx1ZTogJycsIGRlcHRoOiAwLCBpc0dsb2I6IGZhbHNlIH07XG5cbiAgY29uc3QgZW9zID0gKCkgPT4gaW5kZXggPj0gbGVuZ3RoO1xuICBjb25zdCBwZWVrID0gKCkgPT4gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgY29uc3QgYWR2YW5jZSA9ICgpID0+IHtcbiAgICBwcmV2ID0gY29kZTtcbiAgICByZXR1cm4gc3RyLmNoYXJDb2RlQXQoKytpbmRleCk7XG4gIH07XG5cbiAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICBsZXQgbmV4dDtcblxuICAgIGlmIChjb2RlID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIKSB7XG4gICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBhZHZhbmNlKCk7XG5cbiAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgYnJhY2VFc2NhcGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChicmFjZUVzY2FwZWQgPT09IHRydWUgfHwgY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICBicmFjZXMrKztcblxuICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgICBicmFjZXMrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChicmFjZUVzY2FwZWQgIT09IHRydWUgJiYgY29kZSA9PT0gQ0hBUl9ET1QgJiYgKGNvZGUgPSBhZHZhbmNlKCkpID09PSBDSEFSX0RPVCkge1xuICAgICAgICAgIGlzQnJhY2UgPSB0b2tlbi5pc0JyYWNlID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJyYWNlRXNjYXBlZCAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0NPTU1BKSB7XG4gICAgICAgICAgaXNCcmFjZSA9IHRva2VuLmlzQnJhY2UgPSB0cnVlO1xuICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSkge1xuICAgICAgICAgIGJyYWNlcy0tO1xuXG4gICAgICAgICAgaWYgKGJyYWNlcyA9PT0gMCkge1xuICAgICAgICAgICAgYnJhY2VFc2NhcGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0JyYWNlID0gdG9rZW4uaXNCcmFjZSA9IHRydWU7XG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IENIQVJfRk9SV0FSRF9TTEFTSCkge1xuICAgICAgc2xhc2hlcy5wdXNoKGluZGV4KTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIHRva2VuID0geyB2YWx1ZTogJycsIGRlcHRoOiAwLCBpc0dsb2I6IGZhbHNlIH07XG5cbiAgICAgIGlmIChmaW5pc2hlZCA9PT0gdHJ1ZSkgY29udGludWU7XG4gICAgICBpZiAocHJldiA9PT0gQ0hBUl9ET1QgJiYgaW5kZXggPT09IChzdGFydCArIDEpKSB7XG4gICAgICAgIHN0YXJ0ICs9IDI7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub2V4dCAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgaXNFeHRnbG9iQ2hhciA9IGNvZGUgPT09IENIQVJfUExVU1xuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0FUXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfQVNURVJJU0tcbiAgICAgICAgfHwgY29kZSA9PT0gQ0hBUl9RVUVTVElPTl9NQVJLXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSztcblxuICAgICAgaWYgKGlzRXh0Z2xvYkNoYXIgPT09IHRydWUgJiYgcGVlaygpID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgICAgaXNFeHRnbG9iID0gdG9rZW4uaXNFeHRnbG9iID0gdHJ1ZTtcbiAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9FWENMQU1BVElPTl9NQVJLICYmIGluZGV4ID09PSBzdGFydCkge1xuICAgICAgICAgIG5lZ2F0ZWRFeHRnbG9iID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKGNvZGUgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX0FTVEVSSVNLKSB7XG4gICAgICBpZiAocHJldiA9PT0gQ0hBUl9BU1RFUklTSykgaXNHbG9ic3RhciA9IHRva2VuLmlzR2xvYnN0YXIgPSB0cnVlO1xuICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX1FVRVNUSU9OX01BUkspIHtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKG5leHQgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIKSB7XG4gICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgYWR2YW5jZSgpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQpIHtcbiAgICAgICAgICBpc0JyYWNrZXQgPSB0b2tlbi5pc0JyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChvcHRzLm5vbmVnYXRlICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSyAmJiBpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgIG5lZ2F0ZWQgPSB0b2tlbi5uZWdhdGVkID0gdHJ1ZTtcbiAgICAgIHN0YXJ0Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub3BhcmVuICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKGNvZGUgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICBjb2RlID0gYWR2YW5jZSgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChpc0dsb2IgPT09IHRydWUpIHtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMubm9leHQgPT09IHRydWUpIHtcbiAgICBpc0V4dGdsb2IgPSBmYWxzZTtcbiAgICBpc0dsb2IgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCBiYXNlID0gc3RyO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGxldCBnbG9iID0gJyc7XG5cbiAgaWYgKHN0YXJ0ID4gMCkge1xuICAgIHByZWZpeCA9IHN0ci5zbGljZSgwLCBzdGFydCk7XG4gICAgc3RyID0gc3RyLnNsaWNlKHN0YXJ0KTtcbiAgICBsYXN0SW5kZXggLT0gc3RhcnQ7XG4gIH1cblxuICBpZiAoYmFzZSAmJiBpc0dsb2IgPT09IHRydWUgJiYgbGFzdEluZGV4ID4gMCkge1xuICAgIGJhc2UgPSBzdHIuc2xpY2UoMCwgbGFzdEluZGV4KTtcbiAgICBnbG9iID0gc3RyLnNsaWNlKGxhc3RJbmRleCk7XG4gIH0gZWxzZSBpZiAoaXNHbG9iID09PSB0cnVlKSB7XG4gICAgYmFzZSA9ICcnO1xuICAgIGdsb2IgPSBzdHI7XG4gIH0gZWxzZSB7XG4gICAgYmFzZSA9IHN0cjtcbiAgfVxuXG4gIGlmIChiYXNlICYmIGJhc2UgIT09ICcnICYmIGJhc2UgIT09ICcvJyAmJiBiYXNlICE9PSBzdHIpIHtcbiAgICBpZiAoaXNQYXRoU2VwYXJhdG9yKGJhc2UuY2hhckNvZGVBdChiYXNlLmxlbmd0aCAtIDEpKSkge1xuICAgICAgYmFzZSA9IGJhc2Uuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgaWYgKGdsb2IpIGdsb2IgPSB1dGlscy5yZW1vdmVCYWNrc2xhc2hlcyhnbG9iKTtcblxuICAgIGlmIChiYXNlICYmIGJhY2tzbGFzaGVzID09PSB0cnVlKSB7XG4gICAgICBiYXNlID0gdXRpbHMucmVtb3ZlQmFja3NsYXNoZXMoYmFzZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgcHJlZml4LFxuICAgIGlucHV0LFxuICAgIHN0YXJ0LFxuICAgIGJhc2UsXG4gICAgZ2xvYixcbiAgICBpc0JyYWNlLFxuICAgIGlzQnJhY2tldCxcbiAgICBpc0dsb2IsXG4gICAgaXNFeHRnbG9iLFxuICAgIGlzR2xvYnN0YXIsXG4gICAgbmVnYXRlZCxcbiAgICBuZWdhdGVkRXh0Z2xvYlxuICB9O1xuXG4gIGlmIChvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLm1heERlcHRoID0gMDtcbiAgICBpZiAoIWlzUGF0aFNlcGFyYXRvcihjb2RlKSkge1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgIH1cbiAgICBzdGF0ZS50b2tlbnMgPSB0b2tlbnM7XG4gIH1cblxuICBpZiAob3B0cy5wYXJ0cyA9PT0gdHJ1ZSB8fCBvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIGxldCBwcmV2SW5kZXg7XG5cbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzbGFzaGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGNvbnN0IG4gPSBwcmV2SW5kZXggPyBwcmV2SW5kZXggKyAxIDogc3RhcnQ7XG4gICAgICBjb25zdCBpID0gc2xhc2hlc1tpZHhdO1xuICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dC5zbGljZShuLCBpKTtcbiAgICAgIGlmIChvcHRzLnRva2Vucykge1xuICAgICAgICBpZiAoaWR4ID09PSAwICYmIHN0YXJ0ICE9PSAwKSB7XG4gICAgICAgICAgdG9rZW5zW2lkeF0uaXNQcmVmaXggPSB0cnVlO1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gcHJlZml4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVwdGgodG9rZW5zW2lkeF0pO1xuICAgICAgICBzdGF0ZS5tYXhEZXB0aCArPSB0b2tlbnNbaWR4XS5kZXB0aDtcbiAgICAgIH1cbiAgICAgIGlmIChpZHggIT09IDAgfHwgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgcHJldkluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBpZiAocHJldkluZGV4ICYmIHByZXZJbmRleCArIDEgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQuc2xpY2UocHJldkluZGV4ICsgMSk7XG4gICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcblxuICAgICAgaWYgKG9wdHMudG9rZW5zKSB7XG4gICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZGVwdGgodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHN0YXRlLm1heERlcHRoICs9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0uZGVwdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUuc2xhc2hlcyA9IHNsYXNoZXM7XG4gICAgc3RhdGUucGFydHMgPSBwYXJ0cztcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2NhbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHdpbjMyID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmNvbnN0IHtcbiAgUkVHRVhfQkFDS1NMQVNILFxuICBSRUdFWF9SRU1PVkVfQkFDS1NMQVNILFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmV4cG9ydHMuaXNPYmplY3QgPSB2YWwgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5leHBvcnRzLmhhc1JlZ2V4Q2hhcnMgPSBzdHIgPT4gUkVHRVhfU1BFQ0lBTF9DSEFSUy50ZXN0KHN0cik7XG5leHBvcnRzLmlzUmVnZXhDaGFyID0gc3RyID0+IHN0ci5sZW5ndGggPT09IDEgJiYgZXhwb3J0cy5oYXNSZWdleENoYXJzKHN0cik7XG5leHBvcnRzLmVzY2FwZVJlZ2V4ID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfR0xPQkFMLCAnXFxcXCQxJyk7XG5leHBvcnRzLnRvUG9zaXhTbGFzaGVzID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX0JBQ0tTTEFTSCwgJy8nKTtcblxuZXhwb3J0cy5yZW1vdmVCYWNrc2xhc2hlcyA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWF9SRU1PVkVfQkFDS1NMQVNILCBtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoID09PSAnXFxcXCcgPyAnJyA6IG1hdGNoO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuc3VwcG9ydHNMb29rYmVoaW5kcyA9ICgpID0+IHtcbiAgY29uc3Qgc2VncyA9IHByb2Nlc3MudmVyc2lvbi5zbGljZSgxKS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICBpZiAoc2Vncy5sZW5ndGggPT09IDMgJiYgc2Vnc1swXSA+PSA5IHx8IChzZWdzWzBdID09PSA4ICYmIHNlZ3NbMV0gPj0gMTApKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5pc1dpbmRvd3MgPSBvcHRpb25zID0+IHtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMud2luZG93cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMud2luZG93cztcbiAgfVxuICByZXR1cm4gd2luMzIgPT09IHRydWUgfHwgcGF0aC5zZXAgPT09ICdcXFxcJztcbn07XG5cbmV4cG9ydHMuZXNjYXBlTGFzdCA9IChpbnB1dCwgY2hhciwgbGFzdElkeCkgPT4ge1xuICBjb25zdCBpZHggPSBpbnB1dC5sYXN0SW5kZXhPZihjaGFyLCBsYXN0SWR4KTtcbiAgaWYgKGlkeCA9PT0gLTEpIHJldHVybiBpbnB1dDtcbiAgaWYgKGlucHV0W2lkeCAtIDFdID09PSAnXFxcXCcpIHJldHVybiBleHBvcnRzLmVzY2FwZUxhc3QoaW5wdXQsIGNoYXIsIGlkeCAtIDEpO1xuICByZXR1cm4gYCR7aW5wdXQuc2xpY2UoMCwgaWR4KX1cXFxcJHtpbnB1dC5zbGljZShpZHgpfWA7XG59O1xuXG5leHBvcnRzLnJlbW92ZVByZWZpeCA9IChpbnB1dCwgc3RhdGUgPSB7fSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gaW5wdXQ7XG4gIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgIG91dHB1dCA9IG91dHB1dC5zbGljZSgyKTtcbiAgICBzdGF0ZS5wcmVmaXggPSAnLi8nO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLndyYXBPdXRwdXQgPSAoaW5wdXQsIHN0YXRlID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBwcmVwZW5kID0gb3B0aW9ucy5jb250YWlucyA/ICcnIDogJ14nO1xuICBjb25zdCBhcHBlbmQgPSBvcHRpb25zLmNvbnRhaW5zID8gJycgOiAnJCc7XG5cbiAgbGV0IG91dHB1dCA9IGAke3ByZXBlbmR9KD86JHtpbnB1dH0pJHthcHBlbmR9YDtcbiAgaWYgKHN0YXRlLm5lZ2F0ZWQgPT09IHRydWUpIHtcbiAgICBvdXRwdXQgPSBgKD86Xig/ISR7b3V0cHV0fSkuKiQpYDtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyBSZWFkYWJsZSB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCBzeXNQYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgeyBwcm9taXNpZnkgfSA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuXG5jb25zdCByZWFkZGlyID0gcHJvbWlzaWZ5KGZzLnJlYWRkaXIpO1xuY29uc3Qgc3RhdCA9IHByb21pc2lmeShmcy5zdGF0KTtcbmNvbnN0IGxzdGF0ID0gcHJvbWlzaWZ5KGZzLmxzdGF0KTtcbmNvbnN0IHJlYWxwYXRoID0gcHJvbWlzaWZ5KGZzLnJlYWxwYXRoKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBFbnRyeUluZm9cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwYXRoXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZnVsbFBhdGhcbiAqIEBwcm9wZXJ0eSB7ZnMuU3RhdHM9fSBzdGF0c1xuICogQHByb3BlcnR5IHtmcy5EaXJlbnQ9fSBkaXJlbnRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBiYXNlbmFtZVxuICovXG5cbmNvbnN0IEJBTkcgPSAnISc7XG5jb25zdCBOT1JNQUxfRkxPV19FUlJPUlMgPSBuZXcgU2V0KFsnRU5PRU5UJywgJ0VQRVJNJywgJ0VBQ0NFUycsICdFTE9PUCddKTtcbmNvbnN0IEZJTEVfVFlQRSA9ICdmaWxlcyc7XG5jb25zdCBESVJfVFlQRSA9ICdkaXJlY3Rvcmllcyc7XG5jb25zdCBGSUxFX0RJUl9UWVBFID0gJ2ZpbGVzX2RpcmVjdG9yaWVzJztcbmNvbnN0IEVWRVJZVEhJTkdfVFlQRSA9ICdhbGwnO1xuY29uc3QgQUxMX1RZUEVTID0gW0ZJTEVfVFlQRSwgRElSX1RZUEUsIEZJTEVfRElSX1RZUEUsIEVWRVJZVEhJTkdfVFlQRV07XG5cbmNvbnN0IGlzTm9ybWFsRmxvd0Vycm9yID0gZXJyb3IgPT4gTk9STUFMX0ZMT1dfRVJST1JTLmhhcyhlcnJvci5jb2RlKTtcblxuY29uc3Qgbm9ybWFsaXplRmlsdGVyID0gZmlsdGVyID0+IHtcbiAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSByZXR1cm4gZmlsdGVyO1xuXG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGdsb2IgPSBwaWNvbWF0Y2goZmlsdGVyLnRyaW0oKSk7XG4gICAgcmV0dXJuIGVudHJ5ID0+IGdsb2IoZW50cnkuYmFzZW5hbWUpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgIGNvbnN0IHBvc2l0aXZlID0gW107XG4gICAgY29uc3QgbmVnYXRpdmUgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZmlsdGVyKSB7XG4gICAgICBjb25zdCB0cmltbWVkID0gaXRlbS50cmltKCk7XG4gICAgICBpZiAodHJpbW1lZC5jaGFyQXQoMCkgPT09IEJBTkcpIHtcbiAgICAgICAgbmVnYXRpdmUucHVzaChwaWNvbWF0Y2godHJpbW1lZC5zbGljZSgxKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpdmUucHVzaChwaWNvbWF0Y2godHJpbW1lZCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZWdhdGl2ZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAocG9zaXRpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZW50cnkgPT5cbiAgICAgICAgICBwb3NpdGl2ZS5zb21lKGYgPT4gZihlbnRyeS5iYXNlbmFtZSkpICYmICFuZWdhdGl2ZS5zb21lKGYgPT4gZihlbnRyeS5iYXNlbmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVudHJ5ID0+ICFuZWdhdGl2ZS5zb21lKGYgPT4gZihlbnRyeS5iYXNlbmFtZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkgPT4gcG9zaXRpdmUuc29tZShmID0+IGYoZW50cnkuYmFzZW5hbWUpKTtcbiAgfVxufTtcblxuY2xhc3MgUmVhZGRpcnBTdHJlYW0gZXh0ZW5kcyBSZWFkYWJsZSB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvb3Q6ICcuJyxcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICBmaWxlRmlsdGVyOiAocGF0aCkgPT4gdHJ1ZSxcbiAgICAgIGRpcmVjdG9yeUZpbHRlcjogKHBhdGgpID0+IHRydWUsXG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICB0eXBlOiBGSUxFX1RZUEUsXG4gICAgICBsc3RhdDogZmFsc2UsXG4gICAgICBkZXB0aDogMjE0NzQ4MzY0OCxcbiAgICAgIGFsd2F5c1N0YXQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHtcbiAgICAgIG9iamVjdE1vZGU6IHRydWUsXG4gICAgICBhdXRvRGVzdHJveTogdHJ1ZSxcbiAgICAgIGhpZ2hXYXRlck1hcms6IG9wdGlvbnMuaGlnaFdhdGVyTWFyayB8fCA0MDk2XG4gICAgfSk7XG4gICAgY29uc3Qgb3B0cyA9IHsgLi4uUmVhZGRpcnBTdHJlYW0uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICBjb25zdCB7IHJvb3QsIHR5cGUgfSA9IG9wdHM7XG5cbiAgICB0aGlzLl9maWxlRmlsdGVyID0gbm9ybWFsaXplRmlsdGVyKG9wdHMuZmlsZUZpbHRlcik7XG4gICAgdGhpcy5fZGlyZWN0b3J5RmlsdGVyID0gbm9ybWFsaXplRmlsdGVyKG9wdHMuZGlyZWN0b3J5RmlsdGVyKTtcblxuICAgIGNvbnN0IHN0YXRNZXRob2QgPSBvcHRzLmxzdGF0ID8gbHN0YXQgOiBzdGF0O1xuICAgIC8vIFVzZSBiaWdpbnQgc3RhdHMgaWYgaXQncyB3aW5kb3dzIGFuZCBzdGF0KCkgc3VwcG9ydHMgb3B0aW9ucyAobm9kZSAxMCspLlxuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIHN0YXQubGVuZ3RoID09PSAzKSB7XG4gICAgICB0aGlzLl9zdGF0ID0gcGF0aCA9PiBzdGF0TWV0aG9kKHBhdGgsIHsgYmlnaW50OiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdGF0ID0gc3RhdE1ldGhvZDtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXhEZXB0aCA9IG9wdHMuZGVwdGg7XG4gICAgdGhpcy5fd2FudHNEaXIgPSBbRElSX1RZUEUsIEZJTEVfRElSX1RZUEUsIEVWRVJZVEhJTkdfVFlQRV0uaW5jbHVkZXModHlwZSk7XG4gICAgdGhpcy5fd2FudHNGaWxlID0gW0ZJTEVfVFlQRSwgRklMRV9ESVJfVFlQRSwgRVZFUllUSElOR19UWVBFXS5pbmNsdWRlcyh0eXBlKTtcbiAgICB0aGlzLl93YW50c0V2ZXJ5dGhpbmcgPSB0eXBlID09PSBFVkVSWVRISU5HX1RZUEU7XG4gICAgdGhpcy5fcm9vdCA9IHN5c1BhdGgucmVzb2x2ZShyb290KTtcbiAgICB0aGlzLl9pc0RpcmVudCA9ICgnRGlyZW50JyBpbiBmcykgJiYgIW9wdHMuYWx3YXlzU3RhdDtcbiAgICB0aGlzLl9zdGF0c1Byb3AgPSB0aGlzLl9pc0RpcmVudCA/ICdkaXJlbnQnIDogJ3N0YXRzJztcbiAgICB0aGlzLl9yZE9wdGlvbnMgPSB7IGVuY29kaW5nOiAndXRmOCcsIHdpdGhGaWxlVHlwZXM6IHRoaXMuX2lzRGlyZW50IH07XG5cbiAgICAvLyBMYXVuY2ggc3RyZWFtIHdpdGggb25lIHBhcmVudCwgdGhlIHJvb3QgZGlyLlxuICAgIHRoaXMucGFyZW50cyA9IFt0aGlzLl9leHBsb3JlRGlyKHJvb3QsIDEpXTtcbiAgICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFzeW5jIF9yZWFkKGJhdGNoKSB7XG4gICAgaWYgKHRoaXMucmVhZGluZykgcmV0dXJuO1xuICAgIHRoaXMucmVhZGluZyA9IHRydWU7XG5cbiAgICB0cnkge1xuICAgICAgd2hpbGUgKCF0aGlzLmRlc3Ryb3llZCAmJiBiYXRjaCA+IDApIHtcbiAgICAgICAgY29uc3QgeyBwYXRoLCBkZXB0aCwgZmlsZXMgPSBbXSB9ID0gdGhpcy5wYXJlbnQgfHwge307XG5cbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBzbGljZSA9IGZpbGVzLnNwbGljZSgwLCBiYXRjaCkubWFwKGRpcmVudCA9PiB0aGlzLl9mb3JtYXRFbnRyeShkaXJlbnQsIHBhdGgpKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGF3YWl0IFByb21pc2UuYWxsKHNsaWNlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGF3YWl0IHRoaXMuX2dldEVudHJ5VHlwZShlbnRyeSk7XG4gICAgICAgICAgICBpZiAoZW50cnlUeXBlID09PSAnZGlyZWN0b3J5JyAmJiB0aGlzLl9kaXJlY3RvcnlGaWx0ZXIoZW50cnkpKSB7XG4gICAgICAgICAgICAgIGlmIChkZXB0aCA8PSB0aGlzLl9tYXhEZXB0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50cy5wdXNoKHRoaXMuX2V4cGxvcmVEaXIoZW50cnkuZnVsbFBhdGgsIGRlcHRoICsgMSkpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX3dhbnRzRGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICBiYXRjaC0tO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChlbnRyeVR5cGUgPT09ICdmaWxlJyB8fCB0aGlzLl9pbmNsdWRlQXNGaWxlKGVudHJ5KSkgJiYgdGhpcy5fZmlsZUZpbHRlcihlbnRyeSkpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX3dhbnRzRmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgYmF0Y2gtLTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudHMucG9wKCk7XG4gICAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChudWxsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBhcmVudCA9IGF3YWl0IHBhcmVudDtcbiAgICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmRlc3Ryb3koZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfZXhwbG9yZURpcihwYXRoLCBkZXB0aCkge1xuICAgIGxldCBmaWxlcztcbiAgICB0cnkge1xuICAgICAgZmlsZXMgPSBhd2FpdCByZWFkZGlyKHBhdGgsIHRoaXMuX3JkT3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuX29uRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4ge2ZpbGVzLCBkZXB0aCwgcGF0aH07XG4gIH1cblxuICBhc3luYyBfZm9ybWF0RW50cnkoZGlyZW50LCBwYXRoKSB7XG4gICAgbGV0IGVudHJ5O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYXNlbmFtZSA9IHRoaXMuX2lzRGlyZW50ID8gZGlyZW50Lm5hbWUgOiBkaXJlbnQ7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IHN5c1BhdGgucmVzb2x2ZShzeXNQYXRoLmpvaW4ocGF0aCwgYmFzZW5hbWUpKTtcbiAgICAgIGVudHJ5ID0ge3BhdGg6IHN5c1BhdGgucmVsYXRpdmUodGhpcy5fcm9vdCwgZnVsbFBhdGgpLCBmdWxsUGF0aCwgYmFzZW5hbWV9O1xuICAgICAgZW50cnlbdGhpcy5fc3RhdHNQcm9wXSA9IHRoaXMuX2lzRGlyZW50ID8gZGlyZW50IDogYXdhaXQgdGhpcy5fc3RhdChmdWxsUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLl9vbkVycm9yKGVycik7XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIF9vbkVycm9yKGVycikge1xuICAgIGlmIChpc05vcm1hbEZsb3dFcnJvcihlcnIpICYmICF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgdGhpcy5lbWl0KCd3YXJuJywgZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0cm95KGVycik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2dldEVudHJ5VHlwZShlbnRyeSkge1xuICAgIC8vIGVudHJ5IG1heSBiZSB1bmRlZmluZWQsIGJlY2F1c2UgYSB3YXJuaW5nIG9yIGFuIGVycm9yIHdlcmUgZW1pdHRlZFxuICAgIC8vIGFuZCB0aGUgc3RhdHNQcm9wIGlzIHVuZGVmaW5lZFxuICAgIGNvbnN0IHN0YXRzID0gZW50cnkgJiYgZW50cnlbdGhpcy5fc3RhdHNQcm9wXTtcbiAgICBpZiAoIXN0YXRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGF0cy5pc0ZpbGUoKSkge1xuICAgICAgcmV0dXJuICdmaWxlJztcbiAgICB9XG4gICAgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHJldHVybiAnZGlyZWN0b3J5JztcbiAgICB9XG4gICAgaWYgKHN0YXRzICYmIHN0YXRzLmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgIGNvbnN0IGZ1bGwgPSBlbnRyeS5mdWxsUGF0aDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVudHJ5UmVhbFBhdGggPSBhd2FpdCByZWFscGF0aChmdWxsKTtcbiAgICAgICAgY29uc3QgZW50cnlSZWFsUGF0aFN0YXRzID0gYXdhaXQgbHN0YXQoZW50cnlSZWFsUGF0aCk7XG4gICAgICAgIGlmIChlbnRyeVJlYWxQYXRoU3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICByZXR1cm4gJ2ZpbGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeVJlYWxQYXRoU3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgIGNvbnN0IGxlbiA9IGVudHJ5UmVhbFBhdGgubGVuZ3RoO1xuICAgICAgICAgIGlmIChmdWxsLnN0YXJ0c1dpdGgoZW50cnlSZWFsUGF0aCkgJiYgZnVsbC5zdWJzdHIobGVuLCAxKSA9PT0gc3lzUGF0aC5zZXApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkVycm9yKG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYENpcmN1bGFyIHN5bWxpbmsgZGV0ZWN0ZWQ6IFwiJHtmdWxsfVwiIHBvaW50cyB0byBcIiR7ZW50cnlSZWFsUGF0aH1cImBcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2RpcmVjdG9yeSc7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuX29uRXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbmNsdWRlQXNGaWxlKGVudHJ5KSB7XG4gICAgY29uc3Qgc3RhdHMgPSBlbnRyeSAmJiBlbnRyeVt0aGlzLl9zdGF0c1Byb3BdO1xuXG4gICAgcmV0dXJuIHN0YXRzICYmIHRoaXMuX3dhbnRzRXZlcnl0aGluZyAmJiAhc3RhdHMuaXNEaXJlY3RvcnkoKTtcbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJlYWRkaXJwQXJndW1lbnRzXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9uPX0gZmlsZUZpbHRlclxuICogQHByb3BlcnR5IHtGdW5jdGlvbj19IGRpcmVjdG9yeUZpbHRlclxuICogQHByb3BlcnR5IHtTdHJpbmc9fSB0eXBlXG4gKiBAcHJvcGVydHkge051bWJlcj19IGRlcHRoXG4gKiBAcHJvcGVydHkge1N0cmluZz19IHJvb3RcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbj19IGxzdGF0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW49fSBiaWdpbnRcbiAqL1xuXG4vKipcbiAqIE1haW4gZnVuY3Rpb24gd2hpY2ggZW5kcyB1cCBjYWxsaW5nIHJlYWRkaXJSZWMgYW5kIHJlYWRzIGFsbCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgaW4gZ2l2ZW4gcm9vdCByZWN1cnNpdmVseS5cbiAqIEBwYXJhbSB7U3RyaW5nfSByb290IFJvb3QgZGlyZWN0b3J5XG4gKiBAcGFyYW0ge1JlYWRkaXJwQXJndW1lbnRzPX0gb3B0aW9ucyBPcHRpb25zIHRvIHNwZWNpZnkgcm9vdCAoc3RhcnQgZGlyZWN0b3J5KSwgZmlsdGVycyBhbmQgcmVjdXJzaW9uIGRlcHRoXG4gKi9cbmNvbnN0IHJlYWRkaXJwID0gKHJvb3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBsZXQgdHlwZSA9IG9wdGlvbnMuZW50cnlUeXBlIHx8IG9wdGlvbnMudHlwZTtcbiAgaWYgKHR5cGUgPT09ICdib3RoJykgdHlwZSA9IEZJTEVfRElSX1RZUEU7IC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5XG4gIGlmICh0eXBlKSBvcHRpb25zLnR5cGUgPSB0eXBlO1xuICBpZiAoIXJvb3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlYWRkaXJwOiByb290IGFyZ3VtZW50IGlzIHJlcXVpcmVkLiBVc2FnZTogcmVhZGRpcnAocm9vdCwgb3B0aW9ucyknKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygcm9vdCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWFkZGlycDogcm9vdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLiBVc2FnZTogcmVhZGRpcnAocm9vdCwgb3B0aW9ucyknKTtcbiAgfSBlbHNlIGlmICh0eXBlICYmICFBTExfVFlQRVMuaW5jbHVkZXModHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHJlYWRkaXJwOiBJbnZhbGlkIHR5cGUgcGFzc2VkLiBVc2Ugb25lIG9mICR7QUxMX1RZUEVTLmpvaW4oJywgJyl9YCk7XG4gIH1cblxuICBvcHRpb25zLnJvb3QgPSByb290O1xuICByZXR1cm4gbmV3IFJlYWRkaXJwU3RyZWFtKG9wdGlvbnMpO1xufTtcblxuY29uc3QgcmVhZGRpcnBQcm9taXNlID0gKHJvb3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gW107XG4gICAgcmVhZGRpcnAocm9vdCwgb3B0aW9ucylcbiAgICAgIC5vbignZGF0YScsIGVudHJ5ID0+IGZpbGVzLnB1c2goZW50cnkpKVxuICAgICAgLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKGZpbGVzKSlcbiAgICAgIC5vbignZXJyb3InLCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgfSk7XG59O1xuXG5yZWFkZGlycC5wcm9taXNlID0gcmVhZGRpcnBQcm9taXNlO1xucmVhZGRpcnAuUmVhZGRpcnBTdHJlYW0gPSBSZWFkZGlycFN0cmVhbTtcbnJlYWRkaXJwLmRlZmF1bHQgPSByZWFkZGlycDtcblxubW9kdWxlLmV4cG9ydHMgPSByZWFkZGlycDtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZGF0ZSA9PiB7XG5cdGNvbnN0IG9mZnNldCA9IChkYXRlIHx8IG5ldyBEYXRlKCkpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cdGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cdGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG5cdGNvbnN0IG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcblx0Y29uc3QgbWludXRlc091dCA9IG1pbnV0ZXMgPiAwID8gJzonICsgKCcwJyArIG1pbnV0ZXMpLnNsaWNlKC0yKSA6ICcnO1xuXG5cdHJldHVybiAob2Zmc2V0IDwgMCA/ICcrJyA6ICctJykgKyBob3VycyArIG1pbnV0ZXNPdXQ7XG59O1xuIiwiLyohXG4gKiB0by1yZWdleC1yYW5nZSA8aHR0cHM6Ly9naXRodWIuY29tL21pY3JvbWF0Y2gvdG8tcmVnZXgtcmFuZ2U+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNOdW1iZXIgPSByZXF1aXJlKCdpcy1udW1iZXInKTtcblxuY29uc3QgdG9SZWdleFJhbmdlID0gKG1pbiwgbWF4LCBvcHRpb25zKSA9PiB7XG4gIGlmIChpc051bWJlcihtaW4pID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvUmVnZXhSYW5nZTogZXhwZWN0ZWQgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGEgbnVtYmVyJyk7XG4gIH1cblxuICBpZiAobWF4ID09PSB2b2lkIDAgfHwgbWluID09PSBtYXgpIHtcbiAgICByZXR1cm4gU3RyaW5nKG1pbik7XG4gIH1cblxuICBpZiAoaXNOdW1iZXIobWF4KSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0b1JlZ2V4UmFuZ2U6IGV4cGVjdGVkIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSBudW1iZXIuJyk7XG4gIH1cblxuICBsZXQgb3B0cyA9IHsgcmVsYXhaZXJvczogdHJ1ZSwgLi4ub3B0aW9ucyB9O1xuICBpZiAodHlwZW9mIG9wdHMuc3RyaWN0WmVyb3MgPT09ICdib29sZWFuJykge1xuICAgIG9wdHMucmVsYXhaZXJvcyA9IG9wdHMuc3RyaWN0WmVyb3MgPT09IGZhbHNlO1xuICB9XG5cbiAgbGV0IHJlbGF4ID0gU3RyaW5nKG9wdHMucmVsYXhaZXJvcyk7XG4gIGxldCBzaG9ydGhhbmQgPSBTdHJpbmcob3B0cy5zaG9ydGhhbmQpO1xuICBsZXQgY2FwdHVyZSA9IFN0cmluZyhvcHRzLmNhcHR1cmUpO1xuICBsZXQgd3JhcCA9IFN0cmluZyhvcHRzLndyYXApO1xuICBsZXQgY2FjaGVLZXkgPSBtaW4gKyAnOicgKyBtYXggKyAnPScgKyByZWxheCArIHNob3J0aGFuZCArIGNhcHR1cmUgKyB3cmFwO1xuXG4gIGlmICh0b1JlZ2V4UmFuZ2UuY2FjaGUuaGFzT3duUHJvcGVydHkoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHRvUmVnZXhSYW5nZS5jYWNoZVtjYWNoZUtleV0ucmVzdWx0O1xuICB9XG5cbiAgbGV0IGEgPSBNYXRoLm1pbihtaW4sIG1heCk7XG4gIGxldCBiID0gTWF0aC5tYXgobWluLCBtYXgpO1xuXG4gIGlmIChNYXRoLmFicyhhIC0gYikgPT09IDEpIHtcbiAgICBsZXQgcmVzdWx0ID0gbWluICsgJ3wnICsgbWF4O1xuICAgIGlmIChvcHRzLmNhcHR1cmUpIHtcbiAgICAgIHJldHVybiBgKCR7cmVzdWx0fSlgO1xuICAgIH1cbiAgICBpZiAob3B0cy53cmFwID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIGAoPzoke3Jlc3VsdH0pYDtcbiAgfVxuXG4gIGxldCBpc1BhZGRlZCA9IGhhc1BhZGRpbmcobWluKSB8fCBoYXNQYWRkaW5nKG1heCk7XG4gIGxldCBzdGF0ZSA9IHsgbWluLCBtYXgsIGEsIGIgfTtcbiAgbGV0IHBvc2l0aXZlcyA9IFtdO1xuICBsZXQgbmVnYXRpdmVzID0gW107XG5cbiAgaWYgKGlzUGFkZGVkKSB7XG4gICAgc3RhdGUuaXNQYWRkZWQgPSBpc1BhZGRlZDtcbiAgICBzdGF0ZS5tYXhMZW4gPSBTdHJpbmcoc3RhdGUubWF4KS5sZW5ndGg7XG4gIH1cblxuICBpZiAoYSA8IDApIHtcbiAgICBsZXQgbmV3TWluID0gYiA8IDAgPyBNYXRoLmFicyhiKSA6IDE7XG4gICAgbmVnYXRpdmVzID0gc3BsaXRUb1BhdHRlcm5zKG5ld01pbiwgTWF0aC5hYnMoYSksIHN0YXRlLCBvcHRzKTtcbiAgICBhID0gc3RhdGUuYSA9IDA7XG4gIH1cblxuICBpZiAoYiA+PSAwKSB7XG4gICAgcG9zaXRpdmVzID0gc3BsaXRUb1BhdHRlcm5zKGEsIGIsIHN0YXRlLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRlLm5lZ2F0aXZlcyA9IG5lZ2F0aXZlcztcbiAgc3RhdGUucG9zaXRpdmVzID0gcG9zaXRpdmVzO1xuICBzdGF0ZS5yZXN1bHQgPSBjb2xsYXRlUGF0dGVybnMobmVnYXRpdmVzLCBwb3NpdGl2ZXMsIG9wdHMpO1xuXG4gIGlmIChvcHRzLmNhcHR1cmUgPT09IHRydWUpIHtcbiAgICBzdGF0ZS5yZXN1bHQgPSBgKCR7c3RhdGUucmVzdWx0fSlgO1xuICB9IGVsc2UgaWYgKG9wdHMud3JhcCAhPT0gZmFsc2UgJiYgKHBvc2l0aXZlcy5sZW5ndGggKyBuZWdhdGl2ZXMubGVuZ3RoKSA+IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgPSBgKD86JHtzdGF0ZS5yZXN1bHR9KWA7XG4gIH1cblxuICB0b1JlZ2V4UmFuZ2UuY2FjaGVbY2FjaGVLZXldID0gc3RhdGU7XG4gIHJldHVybiBzdGF0ZS5yZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBjb2xsYXRlUGF0dGVybnMobmVnLCBwb3MsIG9wdGlvbnMpIHtcbiAgbGV0IG9ubHlOZWdhdGl2ZSA9IGZpbHRlclBhdHRlcm5zKG5lZywgcG9zLCAnLScsIGZhbHNlLCBvcHRpb25zKSB8fCBbXTtcbiAgbGV0IG9ubHlQb3NpdGl2ZSA9IGZpbHRlclBhdHRlcm5zKHBvcywgbmVnLCAnJywgZmFsc2UsIG9wdGlvbnMpIHx8IFtdO1xuICBsZXQgaW50ZXJzZWN0ZWQgPSBmaWx0ZXJQYXR0ZXJucyhuZWcsIHBvcywgJy0/JywgdHJ1ZSwgb3B0aW9ucykgfHwgW107XG4gIGxldCBzdWJwYXR0ZXJucyA9IG9ubHlOZWdhdGl2ZS5jb25jYXQoaW50ZXJzZWN0ZWQpLmNvbmNhdChvbmx5UG9zaXRpdmUpO1xuICByZXR1cm4gc3VicGF0dGVybnMuam9pbignfCcpO1xufVxuXG5mdW5jdGlvbiBzcGxpdFRvUmFuZ2VzKG1pbiwgbWF4KSB7XG4gIGxldCBuaW5lcyA9IDE7XG4gIGxldCB6ZXJvcyA9IDE7XG5cbiAgbGV0IHN0b3AgPSBjb3VudE5pbmVzKG1pbiwgbmluZXMpO1xuICBsZXQgc3RvcHMgPSBuZXcgU2V0KFttYXhdKTtcblxuICB3aGlsZSAobWluIDw9IHN0b3AgJiYgc3RvcCA8PSBtYXgpIHtcbiAgICBzdG9wcy5hZGQoc3RvcCk7XG4gICAgbmluZXMgKz0gMTtcbiAgICBzdG9wID0gY291bnROaW5lcyhtaW4sIG5pbmVzKTtcbiAgfVxuXG4gIHN0b3AgPSBjb3VudFplcm9zKG1heCArIDEsIHplcm9zKSAtIDE7XG5cbiAgd2hpbGUgKG1pbiA8IHN0b3AgJiYgc3RvcCA8PSBtYXgpIHtcbiAgICBzdG9wcy5hZGQoc3RvcCk7XG4gICAgemVyb3MgKz0gMTtcbiAgICBzdG9wID0gY291bnRaZXJvcyhtYXggKyAxLCB6ZXJvcykgLSAxO1xuICB9XG5cbiAgc3RvcHMgPSBbLi4uc3RvcHNdO1xuICBzdG9wcy5zb3J0KGNvbXBhcmUpO1xuICByZXR1cm4gc3RvcHM7XG59XG5cbi8qKlxuICogQ29udmVydCBhIHJhbmdlIHRvIGEgcmVnZXggcGF0dGVyblxuICogQHBhcmFtIHtOdW1iZXJ9IGBzdGFydGBcbiAqIEBwYXJhbSB7TnVtYmVyfSBgc3RvcGBcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiByYW5nZVRvUGF0dGVybihzdGFydCwgc3RvcCwgb3B0aW9ucykge1xuICBpZiAoc3RhcnQgPT09IHN0b3ApIHtcbiAgICByZXR1cm4geyBwYXR0ZXJuOiBzdGFydCwgY291bnQ6IFtdLCBkaWdpdHM6IDAgfTtcbiAgfVxuXG4gIGxldCB6aXBwZWQgPSB6aXAoc3RhcnQsIHN0b3ApO1xuICBsZXQgZGlnaXRzID0gemlwcGVkLmxlbmd0aDtcbiAgbGV0IHBhdHRlcm4gPSAnJztcbiAgbGV0IGNvdW50ID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZ2l0czsgaSsrKSB7XG4gICAgbGV0IFtzdGFydERpZ2l0LCBzdG9wRGlnaXRdID0gemlwcGVkW2ldO1xuXG4gICAgaWYgKHN0YXJ0RGlnaXQgPT09IHN0b3BEaWdpdCkge1xuICAgICAgcGF0dGVybiArPSBzdGFydERpZ2l0O1xuXG4gICAgfSBlbHNlIGlmIChzdGFydERpZ2l0ICE9PSAnMCcgfHwgc3RvcERpZ2l0ICE9PSAnOScpIHtcbiAgICAgIHBhdHRlcm4gKz0gdG9DaGFyYWN0ZXJDbGFzcyhzdGFydERpZ2l0LCBzdG9wRGlnaXQsIG9wdGlvbnMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvdW50KSB7XG4gICAgcGF0dGVybiArPSBvcHRpb25zLnNob3J0aGFuZCA9PT0gdHJ1ZSA/ICdcXFxcZCcgOiAnWzAtOV0nO1xuICB9XG5cbiAgcmV0dXJuIHsgcGF0dGVybiwgY291bnQ6IFtjb3VudF0sIGRpZ2l0cyB9O1xufVxuXG5mdW5jdGlvbiBzcGxpdFRvUGF0dGVybnMobWluLCBtYXgsIHRvaywgb3B0aW9ucykge1xuICBsZXQgcmFuZ2VzID0gc3BsaXRUb1JhbmdlcyhtaW4sIG1heCk7XG4gIGxldCB0b2tlbnMgPSBbXTtcbiAgbGV0IHN0YXJ0ID0gbWluO1xuICBsZXQgcHJldjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBtYXggPSByYW5nZXNbaV07XG4gICAgbGV0IG9iaiA9IHJhbmdlVG9QYXR0ZXJuKFN0cmluZyhzdGFydCksIFN0cmluZyhtYXgpLCBvcHRpb25zKTtcbiAgICBsZXQgemVyb3MgPSAnJztcblxuICAgIGlmICghdG9rLmlzUGFkZGVkICYmIHByZXYgJiYgcHJldi5wYXR0ZXJuID09PSBvYmoucGF0dGVybikge1xuICAgICAgaWYgKHByZXYuY291bnQubGVuZ3RoID4gMSkge1xuICAgICAgICBwcmV2LmNvdW50LnBvcCgpO1xuICAgICAgfVxuXG4gICAgICBwcmV2LmNvdW50LnB1c2gob2JqLmNvdW50WzBdKTtcbiAgICAgIHByZXYuc3RyaW5nID0gcHJldi5wYXR0ZXJuICsgdG9RdWFudGlmaWVyKHByZXYuY291bnQpO1xuICAgICAgc3RhcnQgPSBtYXggKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHRvay5pc1BhZGRlZCkge1xuICAgICAgemVyb3MgPSBwYWRaZXJvcyhtYXgsIHRvaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb2JqLnN0cmluZyA9IHplcm9zICsgb2JqLnBhdHRlcm4gKyB0b1F1YW50aWZpZXIob2JqLmNvdW50KTtcbiAgICB0b2tlbnMucHVzaChvYmopO1xuICAgIHN0YXJ0ID0gbWF4ICsgMTtcbiAgICBwcmV2ID0gb2JqO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuZnVuY3Rpb24gZmlsdGVyUGF0dGVybnMoYXJyLCBjb21wYXJpc29uLCBwcmVmaXgsIGludGVyc2VjdGlvbiwgb3B0aW9ucykge1xuICBsZXQgcmVzdWx0ID0gW107XG5cbiAgZm9yIChsZXQgZWxlIG9mIGFycikge1xuICAgIGxldCB7IHN0cmluZyB9ID0gZWxlO1xuXG4gICAgLy8gb25seSBwdXNoIGlmIF9ib3RoXyBhcmUgbmVnYXRpdmUuLi5cbiAgICBpZiAoIWludGVyc2VjdGlvbiAmJiAhY29udGFpbnMoY29tcGFyaXNvbiwgJ3N0cmluZycsIHN0cmluZykpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHByZWZpeCArIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gb3IgX2JvdGhfIGFyZSBwb3NpdGl2ZVxuICAgIGlmIChpbnRlcnNlY3Rpb24gJiYgY29udGFpbnMoY29tcGFyaXNvbiwgJ3N0cmluZycsIHN0cmluZykpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHByZWZpeCArIHN0cmluZyk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogWmlwIHN0cmluZ3NcbiAqL1xuXG5mdW5jdGlvbiB6aXAoYSwgYikge1xuICBsZXQgYXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykgYXJyLnB1c2goW2FbaV0sIGJbaV1dKTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIHJldHVybiBhID4gYiA/IDEgOiBiID4gYSA/IC0xIDogMDtcbn1cblxuZnVuY3Rpb24gY29udGFpbnMoYXJyLCBrZXksIHZhbCkge1xuICByZXR1cm4gYXJyLnNvbWUoZWxlID0+IGVsZVtrZXldID09PSB2YWwpO1xufVxuXG5mdW5jdGlvbiBjb3VudE5pbmVzKG1pbiwgbGVuKSB7XG4gIHJldHVybiBOdW1iZXIoU3RyaW5nKG1pbikuc2xpY2UoMCwgLWxlbikgKyAnOScucmVwZWF0KGxlbikpO1xufVxuXG5mdW5jdGlvbiBjb3VudFplcm9zKGludGVnZXIsIHplcm9zKSB7XG4gIHJldHVybiBpbnRlZ2VyIC0gKGludGVnZXIgJSBNYXRoLnBvdygxMCwgemVyb3MpKTtcbn1cblxuZnVuY3Rpb24gdG9RdWFudGlmaWVyKGRpZ2l0cykge1xuICBsZXQgW3N0YXJ0ID0gMCwgc3RvcCA9ICcnXSA9IGRpZ2l0cztcbiAgaWYgKHN0b3AgfHwgc3RhcnQgPiAxKSB7XG4gICAgcmV0dXJuIGB7JHtzdGFydCArIChzdG9wID8gJywnICsgc3RvcCA6ICcnKX19YDtcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHRvQ2hhcmFjdGVyQ2xhc3MoYSwgYiwgb3B0aW9ucykge1xuICByZXR1cm4gYFske2F9JHsoYiAtIGEgPT09IDEpID8gJycgOiAnLSd9JHtifV1gO1xufVxuXG5mdW5jdGlvbiBoYXNQYWRkaW5nKHN0cikge1xuICByZXR1cm4gL14tPygwKylcXGQvLnRlc3Qoc3RyKTtcbn1cblxuZnVuY3Rpb24gcGFkWmVyb3ModmFsdWUsIHRvaywgb3B0aW9ucykge1xuICBpZiAoIXRvay5pc1BhZGRlZCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGxldCBkaWZmID0gTWF0aC5hYnModG9rLm1heExlbiAtIFN0cmluZyh2YWx1ZSkubGVuZ3RoKTtcbiAgbGV0IHJlbGF4ID0gb3B0aW9ucy5yZWxheFplcm9zICE9PSBmYWxzZTtcblxuICBzd2l0Y2ggKGRpZmYpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gJyc7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHJlbGF4ID8gJzA/JyA6ICcwJztcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gcmVsYXggPyAnMHswLDJ9JyA6ICcwMCc7XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHJlbGF4ID8gYDB7MCwke2RpZmZ9fWAgOiBgMHske2RpZmZ9fWA7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FjaGVcbiAqL1xuXG50b1JlZ2V4UmFuZ2UuY2FjaGUgPSB7fTtcbnRvUmVnZXhSYW5nZS5jbGVhckNhY2hlID0gKCkgPT4gKHRvUmVnZXhSYW5nZS5jYWNoZSA9IHt9KTtcblxuLyoqXG4gKiBFeHBvc2UgYHRvUmVnZXhSYW5nZWBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvUmVnZXhSYW5nZTtcbiIsImNsYXNzIE5vZGUge1xuXHQvLy8gdmFsdWU7XG5cdC8vLyBuZXh0O1xuXG5cdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdFx0Ly8gVE9ETzogUmVtb3ZlIHRoaXMgd2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxMi5cblx0XHR0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG5cdH1cbn1cblxuY2xhc3MgUXVldWUge1xuXHQvLyBUT0RPOiBVc2UgcHJpdmF0ZSBjbGFzcyBmaWVsZHMgd2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxMi5cblx0Ly8gI19oZWFkO1xuXHQvLyAjX3RhaWw7XG5cdC8vICNfc2l6ZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNsZWFyKCk7XG5cdH1cblxuXHRlbnF1ZXVlKHZhbHVlKSB7XG5cdFx0Y29uc3Qgbm9kZSA9IG5ldyBOb2RlKHZhbHVlKTtcblxuXHRcdGlmICh0aGlzLl9oZWFkKSB7XG5cdFx0XHR0aGlzLl90YWlsLm5leHQgPSBub2RlO1xuXHRcdFx0dGhpcy5fdGFpbCA9IG5vZGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2hlYWQgPSBub2RlO1xuXHRcdFx0dGhpcy5fdGFpbCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2l6ZSsrO1xuXHR9XG5cblx0ZGVxdWV1ZSgpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gdGhpcy5faGVhZDtcblx0XHRpZiAoIWN1cnJlbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9oZWFkID0gdGhpcy5faGVhZC5uZXh0O1xuXHRcdHRoaXMuX3NpemUtLTtcblx0XHRyZXR1cm4gY3VycmVudC52YWx1ZTtcblx0fVxuXG5cdGNsZWFyKCkge1xuXHRcdHRoaXMuX2hlYWQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5fdGFpbCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLl9zaXplID0gMDtcblx0fVxuXG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiB0aGlzLl9zaXplO1xuXHR9XG5cblx0KiBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQ7XG5cblx0XHR3aGlsZSAoY3VycmVudCkge1xuXHRcdFx0eWllbGQgY3VycmVudC52YWx1ZTtcblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTs7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL21haW4uanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2RhdGEuanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9