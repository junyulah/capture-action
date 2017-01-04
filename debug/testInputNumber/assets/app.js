/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let ActionCapture = __webpack_require__(2);

	let {
	    capture
	} = ActionCapture({
	    eventTypeList: ['click']
	});

	capture((action) => {
	    console.log(action.attachedUIStates.current.number);
	});

	document.getElementById('number').value = 100;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let captureEvent = __webpack_require__(4);

	let {
	    serializeEvent, serializeNode, serializePath
	} = __webpack_require__(5);

	let NodeUnique = __webpack_require__(23);

	let nodeUnique = NodeUnique();

	module.exports = (opts = {}) => {
	    opts.eventTypeList = opts.eventTypeList || [];

	    if (opts.onlyUserAction === undefined) {
	        opts.onlyUserAction = true;
	    }

	    if (opts.textContent === undefined) {
	        opts.textContent = true;
	    }

	    if (opts.style === undefined) {
	        opts.style = true;
	    }

	    let getAction = (event) => {
	        let node = event.target;
	        let path = serializePath(node);

	        let nodeInfo = serializeNode(node, {
	            textContent: opts.textContent,
	            style: opts.style,
	            styleOption: opts.styleOption
	        });

	        return {
	            event: serializeEvent(event),
	            time: new Date().getTime(),
	            attachedUIStates: getAttachedUIStates(event),
	            source: {
	                node: nodeInfo,
	                domNodeId: nodeUnique(node),
	                path
	            },
	            extra: {
	                url: window.location.href,
	                pageTitle: window.document.title
	            }
	        };
	    };

	    let getAttachedUIStates = (event) => {
	        let node = event.target;

	        let number = {};

	        if (event.type === 'click') {
	            if (event.target.type === 'number') {
	                if (lastMouseDownValue === event.target.value) {
	                    // TODO what if min or max?
	                    number.direction = 'nochange';
	                } else if (lastMouseDownValue > event.target.value) {
	                    number.direction = 'down';
	                } else {
	                    number.direction = 'up';
	                }
	            }
	        }

	        return {
	            window: {
	                pageYOffset: window.pageYOffset,
	                pageXOffset: window.pageXOffset
	            },

	            current: {
	                value: node.value,
	                scrollTop: node.scrollTop,
	                scrollLeft: node.scrollLeft,
	                number
	            }
	        };
	    };

	    let lastMouseDownValue = null;

	    return {
	        capture: (handle) => {
	            captureEvent(['mousedown'], (event) => {
	                lastMouseDownValue = event.target.value;
	            });

	            captureEvent(opts.eventTypeList, (event) => {
	                let action = getAction(event);
	                handle(action, event);
	            }, {
	                onlyUserAction: opts.onlyUserAction
	            });
	        }
	    };
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * capture event
	 *
	 * opts = {
	 *      onlyUserAction: true
	 * }
	 *
	 * !!!use this script at the head of the page, so we can guarentee our event handler will run at the first time.
	 */

	// TODO bug: proxy iframe events
	// proxy all documents?
	module.exports = (eventList, callback, opts = {}) => {
	    // TODO window close event
	    let captureUIAction = (document) => {
	        // dom event
	        eventList.forEach((item) => {
	            document.addEventListener(item, (e) => {
	                //console.log(e.target.defaultValue, e.target.value);
	                //e.preventDefault();
	                if (opts.onlyUserAction) {
	                    if (e.isTrusted ||
	                        // TODO
	                        // hack for library like fastclick
	                        e.forwardedTouchEvent) {
	                        callback && callback(e);
	                    }
	                } else {
	                    callback && callback(e);
	                }
	            }, true); // capture model
	        });
	    };

	    captureUIAction(window.document);
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let serializeNode = __webpack_require__(7);
	let serializePath = __webpack_require__(17);
	let serializeEvent = __webpack_require__(18);
	let serializeNodeStructure = __webpack_require__(15);
	let serializeNodes = __webpack_require__(20);
	let getAttributes = __webpack_require__(16);
	let serializeStyle = __webpack_require__(10);

	module.exports = {
	    serializeEvent,
	    serializeNode,
	    serializePath,
	    serializeNodeStructure,
	    serializeNodes,
	    getAttributes,
	    serializeStyle
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    getDisplayText
	} = __webpack_require__(8);

	let serializeStyle = __webpack_require__(10);

	let serializeStructure = __webpack_require__(15);

	module.exports = (node, opts = {}) => {
	    let ret = serializeStructure(node);

	    if (opts.textContent) {
	        ret.textContent = getDisplayText(node);
	    }

	    if (opts.style) {
	        ret.style = serializeStyle(node, opts.styleOption);
	    }

	    return ret;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	let getDisplayText = (node) => {
	    if (node.nodeType === 3) {
	        return node.textContent || '';
	    }

	    if (node.nodeType !== 1) {
	        return '';
	    }

	    if (node.tagName === 'INPUT' ||
	        node.tagName === 'SELECT') {
	        return node.value || '';
	    }

	    if (node.tagName === 'HEAD' ||
	        node.tagName === 'LINK' ||
	        node.tagName === 'SCRIPT' ||
	        node.tagName === 'NOSCRIPT' ||
	        node.tagName === 'CANVAS' ||
	        node.tagName === 'STYLE' ||
	        node.tagName === 'META') {
	        return '';
	    }

	    let style = window.getComputedStyle(node);
	    let display = style.display;

	    if (display === 'none') {
	        return '';
	    } else {
	        let text = '';
	        let children = node.childNodes;
	        for (let i = 0; i < children.length; i++) {
	            let child = children[i];
	            text += getDisplayText(child);
	        }

	        return text;
	    }
	};

	module.exports = {
	    getDisplayText
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    reduce
	} = __webpack_require__(11);

	// only some important styles because of performance consideration
	const STYLE_PROPS = ['color', 'background-color', 'display', 'visibility', 'content', 'font-size'];

	let getStyleMap = (styles, props) => {
	    if (!styles) return {};

	    return reduce(props, (prev, name) => {
	        prev[name] = styles.getPropertyValue(name);
	        return prev;
	    }, {});
	};

	module.exports = (node, props) => {
	    props = props || STYLE_PROPS;
	    if (node === document) return null;
	    let bound = node.getBoundingClientRect();
	    let computedStyle = window.getComputedStyle ? window.getComputedStyle(node) : null;
	    let computedBeforeStyle = window.getComputedStyle ? window.getComputedStyle(node, ':before') : null;
	    let computedAfterStyle = window.getComputedStyle ? window.getComputedStyle(node, ':after') : null;

	    return {
	        style: getStyleMap(computedStyle, props),
	        beforeStyle: getStyleMap(computedBeforeStyle, props),
	        afterStyle: getStyleMap(computedAfterStyle, props),
	        shape: {
	            offsetLeft: node.offsetLeft,
	            offsetTop: node.offsetTop,
	            clientLeft: node.clientLeft,
	            clientTop: node.clientTop,
	            offsetWidth: node.offsetWidth,
	            offsetHeight: node.offsetHeight,
	            clientWidth: node.clientWidth,
	            clientHeight: node.clientHeight,
	            rect: {
	                bottom: bound.bottom,
	                top: bound.top,
	                left: bound.left,
	                right: bound.right,
	                height: bound.height,
	                width: bound.width
	            }
	        }
	    };
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    isObject, funType, or, isString, isFalsy, likeArray
	} = __webpack_require__(12);

	let iterate = __webpack_require__(13);

	let {
	    map, reduce, find, findIndex, forEach, filter, any, exist, compact, reverse
	} = __webpack_require__(14);

	let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

	let difference = (list1, list2, fopts) => {
	    return reduce(list1, (prev, item) => {
	        if (!contain(list2, item, fopts) &&
	            !contain(prev, item, fopts)) {
	            prev.push(item);
	        }
	        return prev;
	    }, []);
	};

	let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

	let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

	let setValueKey = (obj, value, key) => {
	    obj[key] = value;
	    return obj;
	};

	let interset = (list1, list2, fopts) => {
	    return reduce(list1, (prev, cur) => {
	        if (contain(list2, cur, fopts)) {
	            prev.push(cur);
	        }
	        return prev;
	    }, []);
	};

	let deRepeat = (list, fopts, init = []) => {
	    return reduce(list, (prev, cur) => {
	        if (!contain(prev, cur, fopts)) {
	            prev.push(cur);
	        }
	        return prev;
	    }, init);
	};

	/**
	 * a.b.c
	 */
	let get = funType((sandbox, name = '') => {
	    name = name.trim();
	    let parts = !name ? [] : name.split('.');
	    return reduce(parts, getValue, sandbox, invertLogic);
	}, [
	    isObject,
	    or(isString, isFalsy)
	]);

	let getValue = (obj, key) => obj[key];

	let invertLogic = v => !v;

	let delay = (time) => new Promise((resolve) => {
	    setTimeout(resolve, time);
	});

	let flat = (list) => {
	    if (likeArray(list) && !isString(list)) {
	        return reduce(list, (prev, item) => {
	            prev = prev.concat(flat(item));
	            return prev;
	        }, []);
	    } else {
	        return [list];
	    }
	};

	module.exports = {
	    flat,
	    contain,
	    difference,
	    union,
	    interset,
	    map,
	    reduce,
	    iterate,
	    find,
	    findIndex,
	    deRepeat,
	    forEach,
	    filter,
	    any,
	    exist,
	    get,
	    delay,
	    mergeMap,
	    compact,
	    reverse
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * basic types
	 */

	let isUndefined = v => v === undefined;

	let isNull = v => v === null;

	let isFalsy = v => !v;

	let likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);

	let isArray = v => Array.isArray(v);

	let isString = v => typeof v === 'string';

	let isObject = v => !!(v && typeof v === 'object');

	let isFunction = v => typeof v === 'function';

	let isNumber = v => typeof v === 'number' && !isNaN(v);

	let isBool = v => typeof v === 'boolean';

	let isNode = (o) => {
	    return (
	        typeof Node === 'object' ? o instanceof Node :
	        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
	    );
	};

	let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

	let isRegExp = v => v instanceof RegExp;

	let isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);

	let isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);

	/**
	 * check type
	 *
	 * types = [typeFun]
	 */
	let funType = (fun, types = []) => {
	    if (!isFunction(fun)) {
	        throw new TypeError(typeErrorText(fun, 'function'));
	    }

	    if (!likeArray(types)) {
	        throw new TypeError(typeErrorText(types, 'array'));
	    }

	    for (let i = 0; i < types.length; i++) {
	        let typeFun = types[i];
	        if (typeFun) {
	            if (!isFunction(typeFun)) {
	                throw new TypeError(typeErrorText(typeFun, 'function'));
	            }
	        }
	    }

	    return function() {
	        // check type
	        for (let i = 0; i < types.length; i++) {
	            let typeFun = types[i];
	            let arg = arguments[i];
	            if (typeFun && !typeFun(arg)) {
	                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);
	            }
	        }
	        // result
	        return fun.apply(this, arguments);
	    };
	};

	let and = (...args) => {
	    if (!any(args, isFunction)) {
	        throw new TypeError('The argument of and must be function.');
	    }
	    return (v) => {
	        for (let i = 0; i < args.length; i++) {
	            let typeFun = args[i];
	            if (!typeFun(v)) {
	                return false;
	            }
	        }
	        return true;
	    };
	};

	let or = (...args) => {
	    if (!any(args, isFunction)) {
	        throw new TypeError('The argument of and must be function.');
	    }

	    return (v) => {
	        for (let i = 0; i < args.length; i++) {
	            let typeFun = args[i];
	            if (typeFun(v)) {
	                return true;
	            }
	        }
	        return false;
	    };
	};

	let not = (type) => {
	    if (!isFunction(type)) {
	        throw new TypeError('The argument of and must be function.');
	    }
	    return (v) => !type(v);
	};

	let any = (list, type) => {
	    if (!likeArray(list)) {
	        throw new TypeError(typeErrorText(list, 'list'));
	    }
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    for (let i = 0; i < list.length; i++) {
	        if (!type(list[i])) {
	            return false;
	        }
	    }
	    return true;
	};

	let exist = (list, type) => {
	    if (!likeArray(list)) {
	        throw new TypeError(typeErrorText(list, 'array'));
	    }
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    for (let i = 0; i < list.length; i++) {
	        if (type(list[i])) {
	            return true;
	        }
	    }
	    return false;
	};

	let mapType = (map) => {
	    if (!isObject(map)) {
	        throw new TypeError(typeErrorText(map, 'obj'));
	    }

	    for (let name in map) {
	        let type = map[name];
	        if (!isFunction(type)) {
	            throw new TypeError(typeErrorText(type, 'function'));
	        }
	    }

	    return (v) => {
	        if (!isObject(v)) {
	            return false;
	        }

	        for (let name in map) {
	            let type = map[name];
	            let attr = v[name];
	            if (!type(attr)) {
	                return false;
	            }
	        }

	        return true;
	    };
	};

	let listType = (type) => {
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    return (list) => any(list, type);
	};

	let typeErrorText = (v, expect) => {
	    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;
	};

	module.exports = {
	    isArray,
	    likeArray,
	    isString,
	    isObject,
	    isFunction,
	    isNumber,
	    isBool,
	    isNode,
	    isPromise,
	    isNull,
	    isUndefined,
	    isFalsy,
	    isRegExp,
	    isReadableStream,
	    isWritableStream,

	    funType,
	    any,
	    exist,

	    and,
	    or,
	    not,
	    mapType,
	    listType
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    isPromise, likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, isReadableStream, mapType
	} = __webpack_require__(12);

	/**
	 * @param opts
	 *      preidcate: chose items to iterate
	 *      limit: when to stop iteration
	 *      transfer: transfer item
	 *      output
	 *      def: default result
	 */
	let iterate = funType((domain, opts = {}) => {
	    domain = domain || [];
	    if (isPromise(domain)) {
	        return domain.then(list => {
	            return iterate(list, opts);
	        });
	    }
	    return iterateList(domain, opts);
	}, [
	    or(isPromise, isObject, isFunction, isFalsy),
	    or(isUndefined, mapType({
	        predicate: or(isFunction, isFalsy),
	        transfer: or(isFunction, isFalsy),
	        output: or(isFunction, isFalsy),
	        limit: or(isUndefined, isNumber, isFunction)
	    }))
	]);

	let iterateList = (domain, opts) => {
	    opts = initOpts(opts, domain);

	    let rets = opts.def;
	    let count = 0; // iteration times

	    if (isReadableStream(domain)) {
	        let index = -1;

	        return new Promise((resolve, reject) => {
	            domain.on('data', (chunk) => {
	                // TODO try cache error
	                let itemRet = iterateItem(chunk, domain, ++index, count, rets, opts);
	                rets = itemRet.rets;
	                count = itemRet.count;
	                if (itemRet.stop) {
	                    resolve(rets);
	                }
	            });
	            domain.on('end', () => {
	                resolve(rets);
	            });
	            domain.on('error', (err) => {
	                reject(err);
	            });
	        });
	    } else if (likeArray(domain)) {
	        for (let i = 0; i < domain.length; i++) {
	            let item = domain[i];
	            let itemRet = iterateItem(item, domain, i, count, rets, opts);
	            rets = itemRet.rets;
	            count = itemRet.count;
	            if (itemRet.stop) return rets;
	        }
	    } else if (isObject(domain)) {
	        for (let name in domain) {
	            let item = domain[name];
	            let itemRet = iterateItem(item, domain, name, count, rets, opts);
	            rets = itemRet.rets;
	            count = itemRet.count;
	            if (itemRet.stop) return rets;
	        }
	    }

	    return rets;
	};

	let initOpts = (opts, domain) => {
	    let {
	        predicate, transfer, output, limit
	    } = opts;

	    opts.predicate = predicate || truthy;
	    opts.transfer = transfer || id;
	    opts.output = output || toList;
	    if (limit === undefined) limit = domain && domain.length;
	    limit = opts.limit = stopCondition(limit);
	    return opts;
	};

	let iterateItem = (item, domain, name, count, rets, {
	    predicate, transfer, output, limit
	}) => {
	    if (limit(rets, item, name, domain, count)) {
	        // stop
	        return {
	            stop: true,
	            count,
	            rets
	        };
	    }

	    if (predicate(item)) {
	        rets = output(rets, transfer(item, name, domain, rets), name, domain);
	        count++;
	    }
	    return {
	        stop: false,
	        count,
	        rets
	    };
	};

	let stopCondition = (limit) => {
	    if (isUndefined(limit)) {
	        return falsy;
	    } else if (isNumber(limit)) {
	        return (rets, item, name, domain, count) => count >= limit;
	    } else {
	        return limit;
	    }
	};

	let toList = (prev, v) => {
	    prev.push(v);
	    return prev;
	};

	let truthy = () => true;

	let falsy = () => false;

	let id = v => v;

	module.exports = {
	    iterate
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    iterate
	} = __webpack_require__(13);

	let defauls = {
	    eq: (v1, v2) => v1 === v2
	};

	let setDefault = (opts, defauls) => {
	    for (let name in defauls) {
	        opts[name] = opts[name] || defauls[name];
	    }
	};

	let forEach = (list, handler) => iterate(list, {
	    limit: (rets) => {
	        if (rets === true) return true;
	        return false;
	    },
	    transfer: handler,
	    output: (prev, cur) => cur,
	    def: false
	});

	let map = (list, handler, limit) => iterate(list, {
	    transfer: handler,
	    def: [],
	    limit
	});

	let reduce = (list, handler, def, limit) => iterate(list, {
	    output: handler,
	    def,
	    limit
	});

	let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
	    handler && handler(cur, index, list) && prev.push(cur);
	    return prev;
	}, [], limit);

	let find = (list, item, fopts) => {
	    let index = findIndex(list, item, fopts);
	    if (index === -1) return undefined;
	    return list[index];
	};

	let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
	    let curLogic = handler && handler(cur, index, list);
	    return prev && originLogic(curLogic);
	}, true, falsyIt);

	let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
	    let curLogic = handler && handler(cur, index, list);
	    return prev || originLogic(curLogic);
	}, false, originLogic);

	let findIndex = (list, item, fopts = {}) => {
	    setDefault(fopts, defauls);

	    let {
	        eq
	    } = fopts;
	    let predicate = (v) => eq(item, v);
	    let ret = iterate(list, {
	        transfer: indexTransfer,
	        limit: onlyOne,
	        predicate,
	        def: []
	    });
	    if (!ret.length) return -1;
	    return ret[0];
	};

	let compact = (list) => reduce(list, (prev, cur) => {
	    if (cur) prev.push(cur);
	    return prev;
	}, []);

	let reverse = (list) => reduce(list, (prev, cur) => {
	    prev.unshift(cur);
	    return prev;
	}, []);

	let indexTransfer = (item, index) => index;

	let onlyOne = (rets, item, name, domain, count) => count >= 1;

	let falsyIt = v => !v;

	let originLogic = v => !!v;

	module.exports = {
	    map,
	    forEach,
	    reduce,
	    find,
	    findIndex,
	    filter,
	    any,
	    exist,
	    compact,
	    reverse
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let getAttributes = __webpack_require__(16);

	module.exports = (node) => {
	    return {
	        tagName: node.tagName || node.nodeName,
	        nodeType: node.nodeType,
	        index: getOrder(node),
	        attributes: getAttributes(node)
	    };
	};

	let getOrder = (node) => {
	    let parentNode = node.parentNode;
	    if (!parentNode) return 0;
	    for (let i = 0; i < parentNode.childNodes.length; i++) {
	        let item = parentNode.childNodes[i];
	        if (item === node) {
	            return i;
	        }
	    }
	    return -1;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = (node) => {
	    let attributes = {};

	    let nodeAttribute = node.attributes || [];
	    for (let i = 0; i < nodeAttribute.length; i++) {
	        let attr = node.attributes[i];
	        attributes[attr.nodeName] = attr.nodeValue;
	    }

	    return attributes;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let serializeNode = __webpack_require__(7);

	let serializePath = (target) => {
	    let json = [];
	    let index = 0;

	    target = target && target.parentNode;
	    while (target) {

	        if (index < 2) {
	            json.push(serializeNode(target, {
	                textContent: true
	            }));
	        } else {
	            json.push(serializeNode(target));
	        }

	        target = target.parentNode;

	        index++;
	    }
	    return json;
	};

	module.exports = serializePath;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let {
	    likeArray, isObject
	} = __webpack_require__(19);

	let serializeEvent = (e) => {
	    let json = {
	        __proto__source: getClassName(e)
	    };
	    for (let name in e) {
	        let value = e[name];
	        if (isAtom(value)) {
	            json[name] = value;
	        } else if ((name === 'touches' ||
	                name === 'changedTouches' ||
	                name === 'targetTouches') &&
	            likeArray(value)) {
	            json[name] = serializeTouches(value);
	        }
	    }
	    return json;
	};

	let serializeTouches = (value) => {
	    let touches = [];
	    for (let i = 0; i < value.length; i++) {
	        let touch = value[i];
	        let copy = {};
	        if (isObject(touch)) {
	            for (let name in touch) {
	                if (isAtom(touch[name])) {
	                    copy[name] = touch[name];
	                }
	            }
	        }
	        touches.push(copy);
	    }
	    return touches;
	};

	const classNameReg = /\[object (.*)\]/;

	let getClassName = (e) => {
	    let cons = Object.getPrototypeOf(e);
	    return cons.toString().match(classNameReg)[1];
	};

	let isAtom = v => !v || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';

	module.exports = serializeEvent;


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * basic types
	 */

	let isUndefined = v => v === undefined;

	let isNull = v => v === null;

	let isFalsy = v => !v;

	let likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);

	let isArray = v => Array.isArray(v);

	let isString = v => typeof v === 'string';

	let isObject = v => !!(v && typeof v === 'object');

	let isFunction = v => typeof v === 'function';

	let isNumber = v => typeof v === 'number' && !isNaN(v);

	let isBool = v => typeof v === 'boolean';

	let isNode = (o) => {
	    return (
	        typeof Node === 'object' ? o instanceof Node :
	        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
	    );
	};

	let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

	let isRegExp = v => v instanceof RegExp;

	let isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);

	let isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);

	/**
	 * check type
	 *
	 * types = [typeFun]
	 */
	let funType = (fun, types = []) => {
	    if (!isFunction(fun)) {
	        throw new TypeError(typeErrorText(fun, 'function'));
	    }

	    if (!likeArray(types)) {
	        throw new TypeError(typeErrorText(types, 'array'));
	    }

	    for (let i = 0; i < types.length; i++) {
	        let typeFun = types[i];
	        if (typeFun) {
	            if (!isFunction(typeFun)) {
	                throw new TypeError(typeErrorText(typeFun, 'function'));
	            }
	        }
	    }

	    return function() {
	        // check type
	        for (let i = 0; i < types.length; i++) {
	            let typeFun = types[i];
	            let arg = arguments[i];
	            if (typeFun && !typeFun(arg)) {
	                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);
	            }
	        }
	        // result
	        return fun.apply(this, arguments);
	    };
	};

	let and = (...args) => {
	    if (!any(args, isFunction)) {
	        throw new TypeError('The argument of and must be function.');
	    }
	    return (v) => {
	        for (let i = 0; i < args.length; i++) {
	            let typeFun = args[i];
	            if (!typeFun(v)) {
	                return false;
	            }
	        }
	        return true;
	    };
	};

	let or = (...args) => {
	    if (!any(args, isFunction)) {
	        throw new TypeError('The argument of and must be function.');
	    }

	    return (v) => {
	        for (let i = 0; i < args.length; i++) {
	            let typeFun = args[i];
	            if (typeFun(v)) {
	                return true;
	            }
	        }
	        return false;
	    };
	};

	let not = (type) => {
	    if (!isFunction(type)) {
	        throw new TypeError('The argument of and must be function.');
	    }
	    return (v) => !type(v);
	};

	let any = (list, type) => {
	    if (!likeArray(list)) {
	        throw new TypeError(typeErrorText(list, 'list'));
	    }
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    for (let i = 0; i < list.length; i++) {
	        if (!type(list[i])) {
	            return false;
	        }
	    }
	    return true;
	};

	let exist = (list, type) => {
	    if (!likeArray(list)) {
	        throw new TypeError(typeErrorText(list, 'array'));
	    }
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    for (let i = 0; i < list.length; i++) {
	        if (type(list[i])) {
	            return true;
	        }
	    }
	    return false;
	};

	let mapType = (map) => {
	    if (!isObject(map)) {
	        throw new TypeError(typeErrorText(map, 'obj'));
	    }

	    for (let name in map) {
	        let type = map[name];
	        if (!isFunction(type)) {
	            throw new TypeError(typeErrorText(type, 'function'));
	        }
	    }

	    return (v) => {
	        if (!isObject(v)) {
	            return false;
	        }

	        for (let name in map) {
	            let type = map[name];
	            let attr = v[name];
	            if (!type(attr)) {
	                return false;
	            }
	        }

	        return true;
	    };
	};

	let listType = (type) => {
	    if (!isFunction(type)) {
	        throw new TypeError(typeErrorText(type, 'function'));
	    }

	    return (list) => any(list, type);
	};

	let typeErrorText = (v, expect) => {
	    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;
	};

	module.exports = {
	    isArray,
	    likeArray,
	    isString,
	    isObject,
	    isFunction,
	    isNumber,
	    isBool,
	    isNode,
	    isPromise,
	    isNull,
	    isUndefined,
	    isFalsy,
	    isRegExp,
	    isReadableStream,
	    isWritableStream,

	    funType,
	    any,
	    exist,

	    and,
	    or,
	    not,
	    mapType,
	    listType
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let serializeStructure = __webpack_require__(15);

	let serializeStyle = __webpack_require__(10);

	let idgener = __webpack_require__(21);

	let {
	    getDisplayText
	} = __webpack_require__(8);

	let cache = () => {
	    let hashKey = '__hash_key__';
	    let map = {};

	    let setCache = (node, name, value) => {
	        let key = null;
	        if (!node[hashKey]) {
	            key = idgener();
	            node[hashKey] = key;
	        } else {
	            key = node[hashKey];
	        }
	        map[key] = map[key] || {};
	        map[key][name] = {
	            value
	        };
	    };

	    let getCache = (node, name) => {
	        let key = node[hashKey];
	        if (key === undefined) return;
	        if (!map[key]) return;
	        return map[key][name];
	    };

	    return {
	        setCache,
	        getCache
	    };
	};

	module.exports = (nodes, {
	    style = true, textContent = true
	} = {}) => {
	    let {
	        getCache, setCache
	    } = cache();

	    let serializeStructureWithCache = (node) => {
	        let v = getCache(node, 'nodeStructure');
	        if (v) {
	            return v.value;
	        } else {
	            let ret = serializeStructure(node);
	            setCache(node, 'nodeStructure', ret);
	            return ret;
	        }
	    };

	    let getDisplayTextWithCache = (node) => {
	        let v = getCache(node, 'displayText');
	        if (v) {
	            return v.value;
	        } else {
	            let ret = getDisplayText(node);
	            setCache(node, 'displayText', ret);
	            return ret;
	        }
	    };

	    let serializeNode = (node, opts = {}) => {
	        let ret = serializeStructureWithCache(node);

	        if (opts.textContent) {
	            ret.textContent = getDisplayTextWithCache(node);
	        }

	        if (opts.style) {
	            ret.style = serializeStyle(node);
	        }
	        return ret;
	    };

	    let serializePath = (target) => {
	        let json = [];
	        let index = 0;

	        target = target && target.parentNode;
	        while (target) {
	            if (index < 2) {
	                json.push(serializeNode(target, {
	                    textContent: true
	                }));
	            } else {
	                json.push(serializeNode(target));
	            }

	            target = target.parentNode;

	            index++;
	        }
	        return json;
	    };

	    let getNodeInfo = (node) => {
	        let nodeInfo = serializeNode(node, {
	            textContent,
	            style
	        });
	        let path = serializePath(node);

	        let ret = {
	            node: nodeInfo,
	            path
	        };

	        return ret;
	    };

	    let nodeInfos = [];
	    for (let i = 0; i < nodes.length; i++) {
	        let node = nodes[i];
	        let nodeInfo = getNodeInfo(node);
	        nodeInfos.push(nodeInfo);
	    }

	    return nodeInfos;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	let count = 0;

	module.exports = ({
	    timeVisual = false
	} = {}) => {
	    count++;
	    if (count > 10e6) {
	        count = 0;
	    }
	    let rand = Math.random(Math.random()) + '';

	    let time = timeVisual ? getTimeStr() : new Date().getTime();

	    return `${time}-${count}-${rand}`;
	};

	let getTimeStr = () => {
	    let date = new Date();
	    return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let idgener = __webpack_require__(21);

	let {
	    find
	} = __webpack_require__(11);

	module.exports = () => {
	    /**
	     * cacheMap = [[node, id]]
	     */
	    let cacheMap = [];

	    return (node) => {
	        if (!node) return null;
	        let ret = find(cacheMap, node, {
	            eq: (node, item) => node === item[0]
	        });
	        if (ret) return ret[1];

	        let id = idgener();
	        cacheMap.push([node, id]);
	        return id;
	    };
	};


/***/ }
/******/ ]);