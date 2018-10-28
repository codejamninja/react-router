(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("react"))
    : typeof define === "function" && define.amd
      ? define(["exports", "react"], factory)
      : factory((global.ReactRouter = {}), global.React);
})(this, function(exports, React) {
  "use strict";

  React = React && React.hasOwnProperty("default") ? React["default"] : React;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var commonjsGlobal =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
          ? self
          : {};

  function unwrapExports(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, "default")
      ? x.default
      : x;
  }

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (
        Object.keys(Object.assign({}, test3)).join("") !==
        "abcdefghijklmnopqrst"
      ) {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative()
    ? Object.assign
    : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }

          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }

        return to;
      };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};

    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(
    typeSpecs,
    values,
    location,
    componentName,
    getStack
  ) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error(
                (componentName || "React class") +
                  ": " +
                  location +
                  " type `" +
                  typeSpecName +
                  "` is invalid; " +
                  "it must be a function, usually from the `prop-types` package, but received `" +
                  typeof typeSpecs[typeSpecName] +
                  "`."
              );
              err.name = "Invariant Violation";
              throw err;
            }
            error = typeSpecs[typeSpecName](
              values,
              typeSpecName,
              componentName,
              location,
              null,
              ReactPropTypesSecret$1
            );
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || "React class") +
                ": type specification of " +
                location +
                " `" +
                typeSpecName +
                "` is invalid; the type checker " +
                "function must return `null` or an `Error` but returned a " +
                typeof error +
                ". " +
                "You may have forgotten to pass an argument to the type checker " +
                "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                "shape all require an argument)."
            );
          }
          if (
            error instanceof Error &&
            !(error.message in loggedTypeFailures)
          ) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : "";

            printWarning(
              "Failed " +
                location +
                " type: " +
                error.message +
                (stack != null ? stack : "")
            );
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;

  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn =
        maybeIterable &&
        ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
          maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === "function") {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = "<<anonymous>>";

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker("array"),
      bool: createPrimitiveTypeChecker("boolean"),
      func: createPrimitiveTypeChecker("function"),
      number: createPrimitiveTypeChecker("number"),
      object: createPrimitiveTypeChecker("object"),
      string: createPrimitiveTypeChecker("string"),
      symbol: createPrimitiveTypeChecker("symbol"),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = "";
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(
        isRequired,
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                "Use `PropTypes.checkPropTypes()` to call them. " +
                "Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
          } else if (typeof console !== "undefined") {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ":" + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                "You are manually calling a React.PropTypes validation " +
                  "function for the `" +
                  propFullName +
                  "` prop on `" +
                  componentName +
                  "`. This is deprecated " +
                  "and will throw in the standalone `prop-types` package. " +
                  "You may be seeing this warning due to a third-party PropTypes " +
                  "library. See https://fb.me/react-warning-dont-call-proptypes " +
                  "for details."
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError(
                "The " +
                  location +
                  " `" +
                  propFullName +
                  "` is marked as required " +
                  ("in `" + componentName + "`, but its value is `null`.")
              );
            }
            return new PropTypeError(
              "The " +
                location +
                " `" +
                propFullName +
                "` is marked as required in " +
                ("`" + componentName + "`, but its value is `undefined`.")
            );
          }
          return null;
        } else {
          return validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          );
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName,
        secret
      ) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type " +
              ("`" +
                preciseType +
                "` supplied to `" +
                componentName +
                "`, expected ") +
              ("`" + expectedType + "`.")
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError(
            "Property `" +
              propFullName +
              "` of component `" +
              componentName +
              "` has invalid PropType notation inside arrayOf."
          );
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type " +
              ("`" +
                propType +
                "` supplied to `" +
                componentName +
                "`, expected an array.")
          );
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(
            propValue,
            i,
            componentName,
            location,
            propFullName + "[" + i + "]",
            ReactPropTypesSecret_1
          );
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type " +
              ("`" +
                propType +
                "` supplied to `" +
                componentName +
                "`, expected a single ReactElement.")
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type " +
              ("`" +
                actualClassName +
                "` supplied to `" +
                componentName +
                "`, expected ") +
              ("instance of `" + expectedClassName + "`.")
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        printWarning$1(
          "Invalid argument supplied to oneOf, expected an instance of array."
        );
        return emptyFunctionThatReturnsNull;
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of value `" +
            propValue +
            "` " +
            ("supplied to `" +
              componentName +
              "`, expected one of " +
              valuesString +
              ".")
        );
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError(
            "Property `" +
              propFullName +
              "` of component `" +
              componentName +
              "` has invalid PropType notation inside objectOf."
          );
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type " +
              ("`" +
                propType +
                "` supplied to `" +
                componentName +
                "`, expected an object.")
          );
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(
              propValue,
              key,
              componentName,
              location,
              propFullName + "." + key,
              ReactPropTypesSecret_1
            );
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1(
          "Invalid argument supplied to oneOfType, expected an instance of array."
        );
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== "function") {
          printWarning$1(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
              "received " +
              getPostfixForTypeWarning(checker) +
              " at index " +
              i +
              "."
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (
            checker(
              props,
              propName,
              componentName,
              location,
              propFullName,
              ReactPropTypesSecret_1
            ) == null
          ) {
            return null;
          }
        }

        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` supplied to " +
            ("`" + componentName + "`.")
        );
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        if (!isNode(props[propName])) {
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` supplied to " +
              ("`" + componentName + "`, expected a ReactNode.")
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type `" +
              propType +
              "` " +
              ("supplied to `" + componentName + "`, expected `object`.")
          );
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + "." + key,
            ReactPropTypesSecret_1
          );
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(
        props,
        propName,
        componentName,
        location,
        propFullName
      ) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` of type `" +
              propType +
              "` " +
              ("supplied to `" + componentName + "`, expected `object`.")
          );
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              "Invalid " +
                location +
                " `" +
                propFullName +
                "` key `" +
                key +
                "` supplied to `" +
                componentName +
                "`." +
                "\nBad object: " +
                JSON.stringify(props[propName], null, "  ") +
                "\nValid keys: " +
                JSON.stringify(Object.keys(shapeTypes), null, "  ")
            );
          }
          var error = checker(
            propValue,
            key,
            componentName,
            location,
            propFullName + "." + key,
            ReactPropTypesSecret_1
          );
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case "number":
        case "string":
        case "undefined":
          return true;
        case "boolean":
          return !propValue;
        case "object":
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === "symbol") {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue["@@toStringTag"] === "Symbol") {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === "function" && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return "array";
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return "object";
      }
      if (isSymbol(propType, propValue)) {
        return "symbol";
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === "undefined" || propValue === null) {
        return "" + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === "object") {
        if (propValue instanceof Date) {
          return "date";
        } else if (propValue instanceof RegExp) {
          return "regexp";
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case "array":
        case "object":
          return "an " + type;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function(module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    {
      var REACT_ELEMENT_TYPE =
        (typeof Symbol === "function" &&
          Symbol.for &&
          Symbol.for("react.element")) ||
        0xeac7;

      var isValidElement = function(object) {
        return (
          typeof object === "object" &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        );
      };

      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true;
      module.exports = factoryWithTypeCheckers(
        isValidElement,
        throwOnDirectAccess
      );
    }
  });

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  var warning = function() {};

  {
    warning = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning " +
            "message argument"
        );
      }

      if (format.length < 10 || /^[s\W]*$/.test(format)) {
        throw new Error(
          "The warning format should be able to uniquely identify this " +
            "warning. Please, use a more descriptive format than: " +
            format
        );
      }

      if (!condition) {
        var argIndex = 0;
        var message =
          "Warning: " +
          format.replace(/%s/g, function() {
            return args[argIndex++];
          });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      }
    };
  }

  var warning_1 = warning;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var invariant = function(condition, format, a, b, c, d, e, f) {
    {
      if (format === undefined) {
        throw new Error("invariant requires an error message argument");
      }
    }

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          "Minified exception occurred; use the non-minified dev environment " +
            "for the full error message and additional helpful warnings."
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() {
            return args[argIndex++];
          })
        );
        error.name = "Invariant Violation";
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };

  var invariant_1 = invariant;

  function isAbsolute(pathname) {
    return pathname.charAt(0) === "/";
  }

  // About 1.5x faster than the two-arg version of Array#splice()
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k];
    }

    list.pop();
  }

  // This implementation is based heavily on node's url.parse
  function resolvePathname(to) {
    var from =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var toParts = (to && to.split("/")) || [];
    var fromParts = (from && from.split("/")) || [];

    var isToAbs = to && isAbsolute(to);
    var isFromAbs = from && isAbsolute(from);
    var mustEndAbs = isToAbs || isFromAbs;

    if (to && isAbsolute(to)) {
      // to is absolute
      fromParts = toParts;
    } else if (toParts.length) {
      // to is relative, drop the filename
      fromParts.pop();
      fromParts = fromParts.concat(toParts);
    }

    if (!fromParts.length) return "/";

    var hasTrailingSlash = void 0;
    if (fromParts.length) {
      var last = fromParts[fromParts.length - 1];
      hasTrailingSlash = last === "." || last === ".." || last === "";
    } else {
      hasTrailingSlash = false;
    }

    var up = 0;
    for (var i = fromParts.length; i >= 0; i--) {
      var part = fromParts[i];

      if (part === ".") {
        spliceOne(fromParts, i);
      } else if (part === "..") {
        spliceOne(fromParts, i);
        up++;
      } else if (up) {
        spliceOne(fromParts, i);
        up--;
      }
    }

    if (!mustEndAbs)
      for (; up--; up) {
        fromParts.unshift("..");
      }
    if (
      mustEndAbs &&
      fromParts[0] !== "" &&
      (!fromParts[0] || !isAbsolute(fromParts[0]))
    )
      fromParts.unshift("");

    var result = fromParts.join("/");

    if (hasTrailingSlash && result.substr(-1) !== "/") result += "/";

    return result;
  }

  var _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };

  function valueEqual(a, b) {
    if (a === b) return true;

    if (a == null || b == null) return false;

    if (Array.isArray(a)) {
      return (
        Array.isArray(b) &&
        a.length === b.length &&
        a.every(function(item, index) {
          return valueEqual(item, b[index]);
        })
      );
    }

    var aType = typeof a === "undefined" ? "undefined" : _typeof(a);
    var bType = typeof b === "undefined" ? "undefined" : _typeof(b);

    if (aType !== bType) return false;

    if (aType === "object") {
      var aValue = a.valueOf();
      var bValue = b.valueOf();

      if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

      var aKeys = Object.keys(a);
      var bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) return false;

      return aKeys.every(function(key) {
        return valueEqual(a[key], b[key]);
      });
    }

    return false;
  }

  var parsePath = function parsePath(path) {
    var pathname = path || "/";
    var search = "";
    var hash = "";

    var hashIndex = pathname.indexOf("#");
    if (hashIndex !== -1) {
      hash = pathname.substr(hashIndex);
      pathname = pathname.substr(0, hashIndex);
    }

    var searchIndex = pathname.indexOf("?");
    if (searchIndex !== -1) {
      search = pathname.substr(searchIndex);
      pathname = pathname.substr(0, searchIndex);
    }

    return {
      pathname: pathname,
      search: search === "?" ? "" : search,
      hash: hash === "#" ? "" : hash
    };
  };

  var createPath = function createPath(location) {
    var pathname = location.pathname,
      search = location.search,
      hash = location.hash;

    var path = pathname || "/";

    if (search && search !== "?")
      path += search.charAt(0) === "?" ? search : "?" + search;

    if (hash && hash !== "#")
      path += hash.charAt(0) === "#" ? hash : "#" + hash;

    return path;
  };

  var _extends =
    Object.assign ||
    function(target) {
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

  var createLocation = function createLocation(
    path,
    state,
    key,
    currentLocation
  ) {
    var location = void 0;
    if (typeof path === "string") {
      // Two-arg form: push(path, state)
      location = parsePath(path);
      location.state = state;
    } else {
      // One-arg form: push(location)
      location = _extends({}, path);

      if (location.pathname === undefined) location.pathname = "";

      if (location.search) {
        if (location.search.charAt(0) !== "?")
          location.search = "?" + location.search;
      } else {
        location.search = "";
      }

      if (location.hash) {
        if (location.hash.charAt(0) !== "#")
          location.hash = "#" + location.hash;
      } else {
        location.hash = "";
      }

      if (state !== undefined && location.state === undefined)
        location.state = state;
    }

    try {
      location.pathname = decodeURI(location.pathname);
    } catch (e) {
      if (e instanceof URIError) {
        throw new URIError(
          'Pathname "' +
            location.pathname +
            '" could not be decoded. ' +
            "This is likely caused by an invalid percent-encoding."
        );
      } else {
        throw e;
      }
    }

    if (key) location.key = key;

    if (currentLocation) {
      // Resolve incomplete/relative pathname relative to current location.
      if (!location.pathname) {
        location.pathname = currentLocation.pathname;
      } else if (location.pathname.charAt(0) !== "/") {
        location.pathname = resolvePathname(
          location.pathname,
          currentLocation.pathname
        );
      }
    } else {
      // When there is no prior location and pathname is empty, set it to /
      if (!location.pathname) {
        location.pathname = "/";
      }
    }

    return location;
  };

  var locationsAreEqual = function locationsAreEqual(a, b) {
    return (
      a.pathname === b.pathname &&
      a.search === b.search &&
      a.hash === b.hash &&
      a.key === b.key &&
      valueEqual(a.state, b.state)
    );
  };

  var createTransitionManager = function createTransitionManager() {
    var prompt = null;

    var setPrompt = function setPrompt(nextPrompt) {
      warning_1(prompt == null, "A history supports only one prompt at a time");

      prompt = nextPrompt;

      return function() {
        if (prompt === nextPrompt) prompt = null;
      };
    };

    var confirmTransitionTo = function confirmTransitionTo(
      location,
      action,
      getUserConfirmation,
      callback
    ) {
      // TODO: If another transition starts while we're still confirming
      // the previous one, we may end up in a weird state. Figure out the
      // best way to handle this.
      if (prompt != null) {
        var result =
          typeof prompt === "function" ? prompt(location, action) : prompt;

        if (typeof result === "string") {
          if (typeof getUserConfirmation === "function") {
            getUserConfirmation(result, callback);
          } else {
            warning_1(
              false,
              "A history needs a getUserConfirmation function in order to use a prompt message"
            );

            callback(true);
          }
        } else {
          // Return false from a transition hook to cancel the transition.
          callback(result !== false);
        }
      } else {
        callback(true);
      }
    };

    var listeners = [];

    var appendListener = function appendListener(fn) {
      var isActive = true;

      var listener = function listener() {
        if (isActive) fn.apply(undefined, arguments);
      };

      listeners.push(listener);

      return function() {
        isActive = false;
        listeners = listeners.filter(function(item) {
          return item !== listener;
        });
      };
    };

    var notifyListeners = function notifyListeners() {
      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      listeners.forEach(function(listener) {
        return listener.apply(undefined, args);
      });
    };

    return {
      setPrompt: setPrompt,
      confirmTransitionTo: confirmTransitionTo,
      appendListener: appendListener,
      notifyListeners: notifyListeners
    };
  };

  var canUseDOM = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

  var _typeof$2 =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };

  var _extends$3 =
    Object.assign ||
    function(target) {
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

  var clamp = function clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
  };

  /**
   * Creates a history object that stores locations in memory.
   */
  var createMemoryHistory = function createMemoryHistory() {
    var props =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries =
        _props$initialEntries === undefined ? ["/"] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex =
        _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

    var transitionManager = createTransitionManager();

    var setState = function setState(nextState) {
      _extends$3(history, nextState);

      history.length = history.entries.length;

      transitionManager.notifyListeners(history.location, history.action);
    };

    var createKey = function createKey() {
      return Math.random()
        .toString(36)
        .substr(2, keyLength);
    };

    var index = clamp(initialIndex, 0, initialEntries.length - 1);
    var entries = initialEntries.map(function(entry) {
      return typeof entry === "string"
        ? createLocation(entry, undefined, createKey())
        : createLocation(entry, undefined, entry.key || createKey());
    });

    // Public interface

    var createHref = createPath;

    var push = function push(path, state) {
      warning_1(
        !(
          (typeof path === "undefined" ? "undefined" : _typeof$2(path)) ===
            "object" &&
          path.state !== undefined &&
          state !== undefined
        ),
        "You should avoid providing a 2nd state argument to push when the 1st " +
          "argument is a location-like object that already has state; it is ignored"
      );

      var action = "PUSH";
      var location = createLocation(path, state, createKey(), history.location);

      transitionManager.confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        function(ok) {
          if (!ok) return;

          var prevIndex = history.index;
          var nextIndex = prevIndex + 1;

          var nextEntries = history.entries.slice(0);
          if (nextEntries.length > nextIndex) {
            nextEntries.splice(
              nextIndex,
              nextEntries.length - nextIndex,
              location
            );
          } else {
            nextEntries.push(location);
          }

          setState({
            action: action,
            location: location,
            index: nextIndex,
            entries: nextEntries
          });
        }
      );
    };

    var replace = function replace(path, state) {
      warning_1(
        !(
          (typeof path === "undefined" ? "undefined" : _typeof$2(path)) ===
            "object" &&
          path.state !== undefined &&
          state !== undefined
        ),
        "You should avoid providing a 2nd state argument to replace when the 1st " +
          "argument is a location-like object that already has state; it is ignored"
      );

      var action = "REPLACE";
      var location = createLocation(path, state, createKey(), history.location);

      transitionManager.confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        function(ok) {
          if (!ok) return;

          history.entries[history.index] = location;

          setState({ action: action, location: location });
        }
      );
    };

    var go = function go(n) {
      var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

      var action = "POP";
      var location = history.entries[nextIndex];

      transitionManager.confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        function(ok) {
          if (ok) {
            setState({
              action: action,
              location: location,
              index: nextIndex
            });
          } else {
            // Mimic the behavior of DOM histories by
            // causing a render after a cancelled POP.
            setState();
          }
        }
      );
    };

    var goBack = function goBack() {
      return go(-1);
    };

    var goForward = function goForward() {
      return go(1);
    };

    var canGo = function canGo(n) {
      var nextIndex = history.index + n;
      return nextIndex >= 0 && nextIndex < history.entries.length;
    };

    var block = function block() {
      var prompt =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : false;
      return transitionManager.setPrompt(prompt);
    };

    var listen = function listen(listener) {
      return transitionManager.appendListener(listener);
    };

    var history = {
      length: entries.length,
      action: "POP",
      location: entries[index],
      index: index,
      entries: entries,
      createHref: createHref,
      push: push,
      replace: replace,
      go: go,
      goBack: goBack,
      goForward: goForward,
      canGo: canGo,
      block: block,
      listen: listen
    };

    return history;
  };

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning$1 = function() {};

  {
    var printWarning$2 = function printWarning(format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      var argIndex = 0;
      var message =
        "Warning: " +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning$1 = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning " +
            "message argument"
        );
      }
      if (!condition) {
        printWarning$2.apply(null, [format].concat(args));
      }
    };
  }

  var warning_1$1 = warning$1;

  function _extends$4() {
    _extends$4 =
      Object.assign ||
      function(target) {
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

    return _extends$4.apply(this, arguments);
  }

  var key = "__global_unique_id__";

  var gud = function() {
    return (commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1);
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   *
   */

  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  var emptyFunction$1 = function emptyFunction() {};

  emptyFunction$1.thatReturns = makeEmptyFunction;
  emptyFunction$1.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction$1.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction$1.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction$1.thatReturnsThis = function() {
    return this;
  };
  emptyFunction$1.thatReturnsArgument = function(arg) {
    return arg;
  };

  var emptyFunction_1 = emptyFunction$1;

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning$2 = emptyFunction_1;

  {
    var printWarning$3 = function printWarning(format) {
      for (
        var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message =
        "Warning: " +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning$2 = function warning(condition, format) {
      if (format === undefined) {
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning " +
            "message argument"
        );
      }

      if (format.indexOf("Failed Composite propType: ") === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (
          var _len2 = arguments.length,
            args = Array(_len2 > 2 ? _len2 - 2 : 0),
            _key2 = 2;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning$3.apply(undefined, [format].concat(args));
      }
    };
  }

  var warning_1$2 = warning$2;

  var implementation = createCommonjsModule(function(module, exports) {
    exports.__esModule = true;

    var _react2 = _interopRequireDefault(React);

    var _propTypes2 = _interopRequireDefault(propTypes);

    var _gud2 = _interopRequireDefault(gud);

    var _warning2 = _interopRequireDefault(warning_1$2);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var MAX_SIGNED_31_BIT_INT = 1073741823;

    // Inlined Object.is polyfill.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    function objectIs(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }

    function createEventEmitter(value) {
      var handlers = [];
      return {
        on: function on(handler) {
          handlers.push(handler);
        },
        off: function off(handler) {
          handlers = handlers.filter(function(h) {
            return h !== handler;
          });
        },
        get: function get() {
          return value;
        },
        set: function set(newValue, changedBits) {
          value = newValue;
          handlers.forEach(function(handler) {
            return handler(value, changedBits);
          });
        }
      };
    }

    function onlyChild(children) {
      return Array.isArray(children) ? children[0] : children;
    }

    function createReactContext(defaultValue, calculateChangedBits) {
      var _Provider$childContex, _Consumer$contextType;

      var contextProp = "__create-react-context-" + (0, _gud2.default)() + "__";

      var Provider = (function(_Component) {
        _inherits(Provider, _Component);

        function Provider() {
          var _temp, _this, _ret;

          _classCallCheck(this, Provider);

          for (
            var _len = arguments.length, args = Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
              this,
              _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.emitter = createEventEmitter(_this.props.value)),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
          );
        }

        Provider.prototype.getChildContext = function getChildContext() {
          var _ref;

          return (_ref = {}), (_ref[contextProp] = this.emitter), _ref;
        };

        Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(
          nextProps
        ) {
          if (this.props.value !== nextProps.value) {
            var oldValue = this.props.value;
            var newValue = nextProps.value;
            var changedBits = void 0;

            if (objectIs(oldValue, newValue)) {
              changedBits = 0; // No change
            } else {
              changedBits =
                typeof calculateChangedBits === "function"
                  ? calculateChangedBits(oldValue, newValue)
                  : MAX_SIGNED_31_BIT_INT;
              {
                (0, _warning2.default)(
                  (changedBits & MAX_SIGNED_31_BIT_INT) === changedBits,
                  "calculateChangedBits: Expected the return value to be a " +
                    "31-bit integer. Instead received: %s",
                  changedBits
                );
              }

              changedBits |= 0;

              if (changedBits !== 0) {
                this.emitter.set(nextProps.value, changedBits);
              }
            }
          }
        };

        Provider.prototype.render = function render() {
          return this.props.children;
        };

        return Provider;
      })(React.Component);

      Provider.childContextTypes = ((_Provider$childContex = {}),
      (_Provider$childContex[contextProp] =
        _propTypes2.default.object.isRequired),
      _Provider$childContex);

      var Consumer = (function(_Component2) {
        _inherits(Consumer, _Component2);

        function Consumer() {
          var _temp2, _this2, _ret2;

          _classCallCheck(this, Consumer);

          for (
            var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            args[_key2] = arguments[_key2];
          }

          return (
            (_ret2 = ((_temp2 = ((_this2 = _possibleConstructorReturn(
              this,
              _Component2.call.apply(_Component2, [this].concat(args))
            )),
            _this2)),
            (_this2.state = {
              value: _this2.getValue()
            }),
            (_this2.onUpdate = function(newValue, changedBits) {
              var observedBits = _this2.observedBits | 0;
              if ((observedBits & changedBits) !== 0) {
                _this2.setState({ value: _this2.getValue() });
              }
            }),
            _temp2)),
            _possibleConstructorReturn(_this2, _ret2)
          );
        }

        Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(
          nextProps
        ) {
          var observedBits = nextProps.observedBits;

          this.observedBits =
            observedBits === undefined || observedBits === null
              ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
              : observedBits;
        };

        Consumer.prototype.componentDidMount = function componentDidMount() {
          if (this.context[contextProp]) {
            this.context[contextProp].on(this.onUpdate);
          }
          var observedBits = this.props.observedBits;

          this.observedBits =
            observedBits === undefined || observedBits === null
              ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
              : observedBits;
        };

        Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
          if (this.context[contextProp]) {
            this.context[contextProp].off(this.onUpdate);
          }
        };

        Consumer.prototype.getValue = function getValue() {
          if (this.context[contextProp]) {
            return this.context[contextProp].get();
          } else {
            return defaultValue;
          }
        };

        Consumer.prototype.render = function render() {
          return onlyChild(this.props.children)(this.state.value);
        };

        return Consumer;
      })(React.Component);

      Consumer.contextTypes = ((_Consumer$contextType = {}),
      (_Consumer$contextType[contextProp] = _propTypes2.default.object),
      _Consumer$contextType);

      return {
        Provider: Provider,
        Consumer: Consumer
      };
    }

    exports.default = createReactContext;
    module.exports = exports["default"];
  });

  unwrapExports(implementation);

  var lib = createCommonjsModule(function(module, exports) {
    exports.__esModule = true;

    var _react2 = _interopRequireDefault(React);

    var _implementation2 = _interopRequireDefault(implementation);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.default = _react2.default.createContext || _implementation2.default;
    module.exports = exports["default"];
  });

  var createContext = unwrapExports(lib);

  // TODO: Replace with React.createContext once we can assume React 16+
  var context = createContext();
  context.Provider.displayName = "Router.Provider";
  context.Consumer.displayName = "Router.Consumer";

  var warnAboutGettingProperty = function warnAboutGettingProperty() {};

  {
    warnAboutGettingProperty = function warnAboutGettingProperty(
      object,
      key,
      message
    ) {
      var didIssueWarning = false;
      var value = object[key];
      Object.defineProperty(object, key, {
        get: function get() {
          if (!didIssueWarning) {
            warning_1$1(false, message);
            didIssueWarning = true;
          }

          return value;
        },
        configurable: true
      });
    };
  }

  var warnAboutGettingProperty$1 = warnAboutGettingProperty;

  function getContext(props, state) {
    return {
      history: props.history,
      location: state.location,
      match: Router.computeRootMatch(state.location.pathname),
      staticContext: props.staticContext
    };
  }
  /**
   * The public API for putting history on context.
   */

  var Router =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Router, _React$Component);

      Router.computeRootMatch = function computeRootMatch(pathname) {
        return {
          path: "/",
          url: "/",
          params: {},
          isExact: pathname === "/"
        };
      };

      function Router(props) {
        var _this;

        _this = _React$Component.call(this, props) || this;
        _this.state = {
          location: props.history.location
        }; // This is a bit of a hack. We have to start listening for location
        // changes here in the constructor in case there are any <Redirect>s
        // on the initial render. If there are, they will replace/push when
        // they mount and since cDM fires in children before parents, we may
        // get a new location before the <Router> is mounted.

        _this._isMounted = false;
        _this._pendingLocation = null;

        if (!props.staticContext) {
          _this.unlisten = props.history.listen(function(location) {
            if (_this._isMounted) {
              _this.setState({
                location: location
              });
            } else {
              _this._pendingLocation = location;
            }
          });
        }

        return _this;
      }

      var _proto = Router.prototype;

      _proto.componentDidMount = function componentDidMount() {
        this._isMounted = true;

        if (this._pendingLocation) {
          this.setState({
            location: this._pendingLocation
          });
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.unlisten) this.unlisten();
      };

      _proto.render = function render() {
        var context$$1 = getContext(this.props, this.state);
        return React.createElement(context.Provider, {
          children: this.props.children || null,
          value: context$$1
        });
      };

      return Router;
    })(React.Component); // TODO: Remove this in v5

  if (!React.createContext) {
    Router.childContextTypes = {
      router: propTypes.object.isRequired
    };

    Router.prototype.getChildContext = function() {
      var context$$1 = getContext(this.props, this.state);

      {
        var contextWithoutWarnings = _extends$4({}, context$$1);

        Object.keys(context$$1).forEach(function(key) {
          warnAboutGettingProperty$1(
            context$$1,
            key,
            "You should not be using this.context.router." +
              key +
              " directly. It is private API " +
              "for internal use only and is subject to change at any time. Instead, use " +
              "a <Route> or withRouter() to access the current location, match, etc."
          );
        });
        context$$1._withoutWarnings = contextWithoutWarnings;
      }

      return {
        router: context$$1
      };
    };
  }

  {
    Router.propTypes = {
      children: propTypes.node,
      history: propTypes.object.isRequired,
      staticContext: propTypes.object
    };

    Router.prototype.componentDidUpdate = function(prevProps) {
      warning_1$1(
        prevProps.history === this.props.history,
        "You cannot change <Router history>"
      );
    };
  }

  /**
   * The public API for a <Router> that stores location in memory.
   */

  var MemoryRouter =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(MemoryRouter, _React$Component);

      function MemoryRouter() {
        var _this;

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this;
        _this.history = createMemoryHistory(_this.props);
        return _this;
      }

      var _proto = MemoryRouter.prototype;

      _proto.render = function render() {
        return React.createElement(Router, {
          history: this.history,
          children: this.props.children
        });
      };

      return MemoryRouter;
    })(React.Component);

  {
    MemoryRouter.propTypes = {
      initialEntries: propTypes.array,
      initialIndex: propTypes.number,
      getUserConfirmation: propTypes.func,
      keyLength: propTypes.number,
      children: propTypes.node
    };

    MemoryRouter.prototype.componentDidMount = function() {
      warning_1$1(
        !this.props.history,
        "<MemoryRouter> ignores the history prop. To use a custom history, " +
          "use `import { Router }` instead of `import { MemoryRouter as Router }`."
      );
    };
  }

  var Lifecycle =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Lifecycle, _React$Component);

      function Lifecycle() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = Lifecycle.prototype;

      _proto.componentDidMount = function componentDidMount() {
        if (this.props.onMount) this.props.onMount.call(this, this);
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.onUpdate)
          this.props.onUpdate.call(this, this, prevProps);
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.props.onUnmount) this.props.onUnmount.call(this, this);
      };

      _proto.render = function render() {
        return null;
      };

      return Lifecycle;
    })(React.Component);

  /**
   * The public API for prompting the user before navigating away from a screen.
   */

  function Prompt(props) {
    return React.createElement(context.Consumer, null, function(context$$1) {
      !context$$1
        ? invariant_1(false, "You should not use <Prompt> outside a <Router>")
        : void 0;
      if (!props.when || context$$1.staticContext) return null;
      var method = context$$1.history.block;
      var message = props.message;
      return React.createElement(Lifecycle, {
        onMount: function onMount(self) {
          self.release = method(message);
        },
        onUpdate: function onUpdate(self, prevProps) {
          if (prevProps.message !== message) {
            self.release();
            self.release = method(message);
          }
        },
        onUnmount: function onUnmount(self) {
          self.release();
        }
      });
    });
  }

  Prompt.defaultProps = {
    when: true
  };

  {
    var messageType = propTypes.oneOfType([propTypes.func, propTypes.string]);
    Prompt.propTypes = {
      when: propTypes.bool,
      message: messageType.isRequired
    };
  }

  var isarray =
    Array.isArray ||
    function(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    };

  /**
   * Expose `pathToRegexp`.
   */
  var pathToRegexp_1 = pathToRegexp;
  var parse_1 = parse;
  var compile_1 = compile;
  var tokensToFunction_1 = tokensToFunction;
  var tokensToRegExp_1 = tokensToRegExp;

  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp(
    [
      // Match escaped characters that would otherwise appear in future matches.
      // This allows the user to escape special characters that won't transform.
      "(\\\\.)",
      // Match Express-style parameters and un-named parameters with a prefix
      // and optional suffixes. Matches appear as:
      //
      // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
      // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
      // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
      "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
    ].join("|"),
    "g"
  );

  /**
   * Parse a string for the raw tokens.
   *
   * @param  {string}  str
   * @param  {Object=} options
   * @return {!Array}
   */
  function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = "";
    var defaultDelimiter = (options && options.delimiter) || "/";
    var res;

    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index, offset);
      index = offset + m.length;

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1];
        continue;
      }

      var next = str[index];
      var prefix = res[2];
      var name = res[3];
      var capture = res[4];
      var group = res[5];
      var modifier = res[6];
      var asterisk = res[7];

      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path);
        path = "";
      }

      var partial = prefix != null && next != null && next !== prefix;
      var repeat = modifier === "+" || modifier === "*";
      var optional = modifier === "?" || modifier === "*";
      var delimiter = res[2] || defaultDelimiter;
      var pattern = capture || group;

      tokens.push({
        name: name || key++,
        prefix: prefix || "",
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        asterisk: !!asterisk,
        pattern: pattern
          ? escapeGroup(pattern)
          : asterisk
            ? ".*"
            : "[^" + escapeString(delimiter) + "]+?"
      });
    }

    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index);
    }

    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path);
    }

    return tokens;
  }

  /**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @param  {Object=}            options
   * @return {!function(Object=, Object=)}
   */
  function compile(str, options) {
    return tokensToFunction(parse(str, options));
  }

  /**
   * Prettier encoding of URI path segments.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeURIComponentPretty(str) {
    return encodeURI(str).replace(/[\/?#]/g, function(c) {
      return (
        "%" +
        c
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
      );
    });
  }

  /**
   * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeAsterisk(str) {
    return encodeURI(str).replace(/[?#]/g, function(c) {
      return (
        "%" +
        c
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
      );
    });
  }

  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction(tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length);

    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === "object") {
        matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$");
      }
    }

    return function(obj, opts) {
      var path = "";
      var data = obj || {};
      var options = opts || {};
      var encode = options.pretty
        ? encodeURIComponentPretty
        : encodeURIComponent;

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === "string") {
          path += token;

          continue;
        }

        var value = data[token.name];
        var segment;

        if (value == null) {
          if (token.optional) {
            // Prepend partial segment prefixes.
            if (token.partial) {
              path += token.prefix;
            }

            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined');
          }
        }

        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError(
              'Expected "' +
                token.name +
                '" to not repeat, but received `' +
                JSON.stringify(value) +
                "`"
            );
          }

          if (value.length === 0) {
            if (token.optional) {
              continue;
            } else {
              throw new TypeError(
                'Expected "' + token.name + '" to not be empty'
              );
            }
          }

          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j]);

            if (!matches[i].test(segment)) {
              throw new TypeError(
                'Expected all "' +
                  token.name +
                  '" to match "' +
                  token.pattern +
                  '", but received `' +
                  JSON.stringify(segment) +
                  "`"
              );
            }

            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }

          continue;
        }

        segment = token.asterisk ? encodeAsterisk(value) : encode(value);

        if (!matches[i].test(segment)) {
          throw new TypeError(
            'Expected "' +
              token.name +
              '" to match "' +
              token.pattern +
              '", but received "' +
              segment +
              '"'
          );
        }

        path += token.prefix + segment;
      }

      return path;
    };
  }

  /**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }

  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */
  function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, "\\$1");
  }

  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */
  function attachKeys(re, keys) {
    re.keys = keys;
    return re;
  }

  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */
  function flags(options) {
    return options.sensitive ? "" : "i";
  }

  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
   */
  function regexpToRegexp(path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);

    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        });
      }
    }

    return attachKeys(path, keys);
  }

  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function arrayToRegexp(path, keys, options) {
    var parts = [];

    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source);
    }

    var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));

    return attachKeys(regexp, keys);
  }

  /**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
  }

  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}          tokens
   * @param  {(Array|Object)=} keys
   * @param  {Object=}         options
   * @return {!RegExp}
   */
  function tokensToRegExp(tokens, keys, options) {
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys || options);
      keys = [];
    }

    options = options || {};

    var strict = options.strict;
    var end = options.end !== false;
    var route = "";

    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === "string") {
        route += escapeString(token);
      } else {
        var prefix = escapeString(token.prefix);
        var capture = "(?:" + token.pattern + ")";

        keys.push(token);

        if (token.repeat) {
          capture += "(?:" + prefix + capture + ")*";
        }

        if (token.optional) {
          if (!token.partial) {
            capture = "(?:" + prefix + "(" + capture + "))?";
          } else {
            capture = prefix + "(" + capture + ")?";
          }
        } else {
          capture = prefix + "(" + capture + ")";
        }

        route += capture;
      }
    }

    var delimiter = escapeString(options.delimiter || "/");
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route =
        (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) +
        "(?:" +
        delimiter +
        "(?=$))?";
    }

    if (end) {
      route += "$";
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
    }

    return attachKeys(new RegExp("^" + route, flags(options)), keys);
  }

  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */
  function pathToRegexp(path, keys, options) {
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys || options);
      keys = [];
    }

    options = options || {};

    if (path instanceof RegExp) {
      return regexpToRegexp(path, /** @type {!Array} */ (keys));
    }

    if (isarray(path)) {
      return arrayToRegexp(
        /** @type {!Array} */ (path),
        /** @type {!Array} */ (keys),
        options
      );
    }

    return stringToRegexp(
      /** @type {string} */ (path),
      /** @type {!Array} */ (keys),
      options
    );
  }
  pathToRegexp_1.parse = parse_1;
  pathToRegexp_1.compile = compile_1;
  pathToRegexp_1.tokensToFunction = tokensToFunction_1;
  pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

  var cache = {};
  var cacheLimit = 10000;
  var cacheCount = 0;

  function compilePath(path) {
    if (cache[path]) return cache[path];
    var generator = pathToRegexp_1.compile(path);

    if (cacheCount < cacheLimit) {
      cache[path] = generator;
      cacheCount++;
    }

    return generator;
  }
  /**
   * Public API for generating a URL pathname from a path and parameters.
   */

  function generatePath(path, params) {
    if (path === void 0) {
      path = "/";
    }

    if (params === void 0) {
      params = {};
    }

    return path === "/"
      ? path
      : compilePath(path)(params, {
          pretty: true
        });
  }

  /**
   * The public API for navigating programmatically with a component.
   */

  function Redirect(props) {
    return React.createElement(context.Consumer, null, function(context$$1) {
      !context$$1
        ? invariant_1(false, "You should not use <Redirect> outside a <Router>")
        : void 0;
      var method = props.push
        ? context$$1.history.push
        : context$$1.history.replace;
      var to = createLocation(
        props.computedMatch
          ? typeof props.to === "string"
            ? generatePath(props.to, props.computedMatch.params)
            : _extends$4({}, props.to, {
                pathname: generatePath(
                  props.to.pathname,
                  props.computedMatch.params
                )
              })
          : props.to
      ); // When rendering in a static context,
      // set the new location immediately.

      if (context$$1.staticContext) {
        method(to);
        return null;
      }

      return React.createElement(Lifecycle, {
        onMount: function onMount() {
          method(to);
        },
        onUpdate: function onUpdate(self, prevProps) {
          if (!locationsAreEqual(prevProps.to, to)) {
            method(to);
          }
        },
        to: to
      });
    });
  }

  Redirect.defaultProps = {
    push: false
  };

  {
    Redirect.propTypes = {
      push: propTypes.bool,
      from: propTypes.string,
      to: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired
    };
  }

  var runtime = createCommonjsModule(function(module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    !(function(global) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined; // More compressible than void 0.
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      var runtime = global.regeneratorRuntime;
      if (runtime) {
        {
          // If regeneratorRuntime is defined globally and we're in a module,
          // make the exports object identical to regeneratorRuntime.
          module.exports = runtime;
        }
        // Don't bother evaluating the rest of this file if the runtime was
        // already defined globally.
        return;
      }

      // Define the runtime globally (as expected by generated code) as either
      // module.exports (if we're in a module) or a new, empty object.
      runtime = global.regeneratorRuntime = module.exports;

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator =
          outerFn && outerFn.prototype instanceof Generator
            ? outerFn
            : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      runtime.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function() {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
        IteratorPrototype
      ));
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[
        toStringTagSymbol
      ] = GeneratorFunction.displayName = "GeneratorFunction";

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          prototype[method] = function(arg) {
            return this._invoke(method, arg);
          };
        });
      }

      runtime.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false;
      };

      runtime.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      runtime.awrap = function(arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (
              value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")
            ) {
              return Promise.resolve(value.__await).then(
                function(value) {
                  invoke("next", value, resolve, reject);
                },
                function(err) {
                  invoke("throw", err, resolve, reject);
                }
              );
            }

            return Promise.resolve(value).then(
              function(unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              },
              function(error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke("throw", error, resolve, reject);
              }
            );
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return (previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise
              ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                )
              : callInvokeWithMethodAndArg());
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function() {
        return this;
      };
      runtime.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      runtime.async = function(innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

        return runtime.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function(result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            if (delegate.iterator.return) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method"
            );
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      Gp[toStringTagSymbol] = "Generator";

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function() {
        return this;
      };

      Gp.toString = function() {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      runtime.keys = function(object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

            return (next.next = next);
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      runtime.values = values;

      function doneResult() {
        return { value: undefined, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;

          this.method = "next";
          this.arg = undefined;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (
                name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))
              ) {
                this[name] = undefined;
              }
            }
          }
        },

        stop: function() {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },

        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === "break" || type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch: function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error("illegal catch attempt");
        },

        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
          }

          return ContinueSentinel;
        }
      };
    })(
      // In sloppy mode, unbound `this` refers to the global object, fallback to
      // Function constructor if we're in global strict mode. That is sadly a form
      // of indirect eval which violates Content Security Policy.
      (function() {
        return this || (typeof self === "object" && self);
      })() || Function("return this")()
    );
  });

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g =
    (function() {
      return this || (typeof self === "object" && self);
    })() || Function("return this")();

  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime =
    g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;

  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;

  var runtimeModule = runtime;

  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch (e) {
      g.regeneratorRuntime = undefined;
    }
  }

  var regenerator = runtimeModule;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function() {
      var self = this,
        args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            "next",
            value
          );
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var reactIs_production_min = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.forward_ref") : 60112,
      n = b ? Symbol.for("react.placeholder") : 60113;
    function q(a) {
      if ("object" === typeof a && null !== a) {
        var p = a.$$typeof;
        switch (p) {
          case c:
            switch (((a = a.type), a)) {
              case l:
              case e:
              case g:
              case f:
                return a;
              default:
                switch (((a = a && a.$$typeof), a)) {
                  case k:
                  case m:
                  case h:
                    return a;
                  default:
                    return p;
                }
            }
          case d:
            return p;
        }
      }
    }
    exports.typeOf = q;
    exports.AsyncMode = l;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c;
    exports.ForwardRef = m;
    exports.Fragment = e;
    exports.Profiler = g;
    exports.Portal = d;
    exports.StrictMode = f;
    exports.isValidElementType = function(a) {
      return (
        "string" === typeof a ||
        "function" === typeof a ||
        a === e ||
        a === l ||
        a === g ||
        a === f ||
        a === n ||
        ("object" === typeof a &&
          null !== a &&
          ("function" === typeof a.then ||
            a.$$typeof === h ||
            a.$$typeof === k ||
            a.$$typeof === m))
      );
    };
    exports.isAsyncMode = function(a) {
      return q(a) === l;
    };
    exports.isContextConsumer = function(a) {
      return q(a) === k;
    };
    exports.isContextProvider = function(a) {
      return q(a) === h;
    };
    exports.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === c;
    };
    exports.isForwardRef = function(a) {
      return q(a) === m;
    };
    exports.isFragment = function(a) {
      return q(a) === e;
    };
    exports.isProfiler = function(a) {
      return q(a) === g;
    };
    exports.isPortal = function(a) {
      return q(a) === d;
    };
    exports.isStrictMode = function(a) {
      return q(a) === f;
    };
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_4 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_5 = reactIs_production_min.Element;
  var reactIs_production_min_6 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_7 = reactIs_production_min.Fragment;
  var reactIs_production_min_8 = reactIs_production_min.Profiler;
  var reactIs_production_min_9 = reactIs_production_min.Portal;
  var reactIs_production_min_10 = reactIs_production_min.StrictMode;
  var reactIs_production_min_11 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_12 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_13 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_14 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_15 = reactIs_production_min.isElement;
  var reactIs_production_min_16 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_17 = reactIs_production_min.isFragment;
  var reactIs_production_min_18 = reactIs_production_min.isProfiler;
  var reactIs_production_min_19 = reactIs_production_min.isPortal;
  var reactIs_production_min_20 = reactIs_production_min.isStrictMode;

  var reactIs_development = createCommonjsModule(function(module, exports) {
    {
      (function() {
        Object.defineProperty(exports, "__esModule", { value: true });

        // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
        // nor polyfill, then a plain number is used for performance.
        var hasSymbol = typeof Symbol === "function" && Symbol.for;

        var REACT_ELEMENT_TYPE = hasSymbol
          ? Symbol.for("react.element")
          : 0xeac7;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
        var REACT_FRAGMENT_TYPE = hasSymbol
          ? Symbol.for("react.fragment")
          : 0xeacb;
        var REACT_STRICT_MODE_TYPE = hasSymbol
          ? Symbol.for("react.strict_mode")
          : 0xeacc;
        var REACT_PROFILER_TYPE = hasSymbol
          ? Symbol.for("react.profiler")
          : 0xead2;
        var REACT_PROVIDER_TYPE = hasSymbol
          ? Symbol.for("react.provider")
          : 0xeacd;
        var REACT_CONTEXT_TYPE = hasSymbol
          ? Symbol.for("react.context")
          : 0xeace;
        var REACT_ASYNC_MODE_TYPE = hasSymbol
          ? Symbol.for("react.async_mode")
          : 0xeacf;
        var REACT_FORWARD_REF_TYPE = hasSymbol
          ? Symbol.for("react.forward_ref")
          : 0xead0;
        var REACT_PLACEHOLDER_TYPE = hasSymbol
          ? Symbol.for("react.placeholder")
          : 0xead1;

        function isValidElementType(type) {
          return (
            typeof type === "string" ||
            typeof type === "function" ||
            // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE ||
            type === REACT_ASYNC_MODE_TYPE ||
            type === REACT_PROFILER_TYPE ||
            type === REACT_STRICT_MODE_TYPE ||
            type === REACT_PLACEHOLDER_TYPE ||
            (typeof type === "object" &&
              type !== null &&
              (typeof type.then === "function" ||
                type.$$typeof === REACT_PROVIDER_TYPE ||
                type.$$typeof === REACT_CONTEXT_TYPE ||
                type.$$typeof === REACT_FORWARD_REF_TYPE))
          );
        }

        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;

            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;

                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;

                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }

          return undefined;
        }

        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;

        function isAsyncMode(object) {
          return typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return (
            typeof object === "object" &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE
          );
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }

        exports.typeOf = typeOf;
        exports.AsyncMode = AsyncMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Profiler = Profiler;
        exports.Portal = Portal;
        exports.StrictMode = StrictMode;
        exports.isValidElementType = isValidElementType;
        exports.isAsyncMode = isAsyncMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isProfiler = isProfiler;
        exports.isPortal = isPortal;
        exports.isStrictMode = isStrictMode;
      })();
    }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Profiler;
  var reactIs_development_9 = reactIs_development.Portal;
  var reactIs_development_10 = reactIs_development.StrictMode;
  var reactIs_development_11 = reactIs_development.isValidElementType;
  var reactIs_development_12 = reactIs_development.isAsyncMode;
  var reactIs_development_13 = reactIs_development.isContextConsumer;
  var reactIs_development_14 = reactIs_development.isContextProvider;
  var reactIs_development_15 = reactIs_development.isElement;
  var reactIs_development_16 = reactIs_development.isForwardRef;
  var reactIs_development_17 = reactIs_development.isFragment;
  var reactIs_development_18 = reactIs_development.isProfiler;
  var reactIs_development_19 = reactIs_development.isPortal;
  var reactIs_development_20 = reactIs_development.isStrictMode;

  var reactIs = createCommonjsModule(function(module) {
    {
      module.exports = reactIs_development;
    }
  });

  var cache$1 = {};
  var cacheLimit$1 = 10000;
  var cacheCount$1 = 0;

  function compilePath$1(path, options) {
    var cacheKey = "" + options.end + options.strict + options.sensitive;
    var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
    if (pathCache[path]) return pathCache[path];
    var keys = [];
    var regexp = pathToRegexp_1(path, keys, options);
    var result = {
      regexp: regexp,
      keys: keys
    };

    if (cacheCount$1 < cacheLimit$1) {
      pathCache[path] = result;
      cacheCount$1++;
    }

    return result;
  }
  /**
   * Public API for matching a URL pathname to a path.
   */

  function matchPath(pathname, options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof options === "string")
      options = {
        path: options
      };
    var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
    var paths = [].concat(path);
    return paths.reduce(function(matched, path) {
      if (matched) return matched;

      var _compilePath = compilePath$1(path, {
          end: exact,
          strict: strict,
          sensitive: sensitive
        }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

      var match = regexp.exec(pathname);
      if (!match) return null;
      var url = match[0],
        values = match.slice(1);
      var isExact = pathname === url;
      if (exact && !isExact) return null;
      return {
        path: path,
        // the path used to match
        url: path === "/" && url === "" ? "/" : url,
        // the matched portion of the URL
        isExact: isExact,
        // whether or not we matched exactly
        params: keys.reduce(function(memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {})
      };
    }, null);
  }

  function isEmptyChildren(children) {
    return React.Children.count(children) === 0;
  }

  function getContext$1(props, context$$1) {
    var location = props.location || context$$1.location;
    var match = props.computedMatch
      ? props.computedMatch // <Switch> already computed the match for us
      : props.path
        ? matchPath(location.pathname, props)
        : context$$1.match;
    return _extends$4({}, context$$1, {
      location: location,
      match: match
    });
  }
  /**
   * The public API for matching a single path and rendering.
   */

  var Route =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Route, _React$Component);

      function Route() {
        var _this;

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this;
        _this.state = {
          renderedAsync: null
        };
        _this.renderingAsync = false;
        return _this;
      }

      var _proto = Route.prototype;

      _proto.getRenderedAsyncState = function getRenderedAsyncState() {
        if (!this.renderingAsync) this.renderAsync.apply(this, arguments);
        return this.state.renderedAsync;
      };

      _proto.renderAsync =
        /*#__PURE__*/
        (function() {
          var _renderAsync = _asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee(render, props) {
              var renderedAsync;
              return regenerator.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        this.renderingAsync = true;
                        _context.next = 3;
                        return render(props);

                      case 3:
                        renderedAsync = _context.sent;
                        this.setState({
                          renderedAsync: renderedAsync
                        });
                        this.renderingAsync = false;

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this
              );
            })
          );

          return function renderAsync(_x, _x2) {
            return _renderAsync.apply(this, arguments);
          };
        })();

      _proto.render = function render() {
        var _this2 = this;

        return React.createElement(context.Consumer, null, function(
          context$$1
        ) {
          !context$$1
            ? invariant_1(
                false,
                "You should not use <Route> outside a <Router>"
              )
            : void 0;
          var props = getContext$1(_this2.props, context$$1);
          var _this2$props = _this2.props,
            children = _this2$props.children,
            component = _this2$props.component,
            render = _this2$props.render; // Preact uses an empty array as children by
          // default, so use null if that's the case.

          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }

          if (typeof children === "function") {
            children = children(props);

            if (children === undefined) {
              {
                var path = _this2.props.path;
                warning_1$1(
                  false,
                  "You returned `undefined` from the `children` function of " +
                    ("<Route" +
                      (path ? ' path="' + path + '"' : "") +
                      ">, but you ") +
                    "should have returned a React element or `null`"
                );
              }

              children = null;
            }
          }

          return React.createElement(
            context.Provider,
            {
              value: props
            },
            children && !isEmptyChildren(children)
              ? children
              : props.match
                ? component
                  ? React.createElement(component, props)
                  : render
                    ? _this2.getRenderedAsyncState(render, props)
                    : null
                : null
          );
        });
      };

      return Route;
    })(React.Component); // TODO: Remove this in v5

  if (!React.createContext) {
    Route.contextTypes = {
      router: propTypes.object.isRequired
    };
    Route.childContextTypes = {
      router: propTypes.object.isRequired
    };

    Route.prototype.getChildContext = function() {
      !this.context.router
        ? invariant_1(false, "You should not use <Route> outside a <Router>")
        : void 0;
      var parentContext = this.context.router;

      {
        parentContext = parentContext._withoutWarnings;
      }

      var context$$1 = getContext$1(this.props, parentContext);

      {
        var contextWithoutWarnings = _extends$4({}, context$$1);

        Object.keys(context$$1).forEach(function(key) {
          warnAboutGettingProperty$1(
            context$$1,
            key,
            "You should not be using this.context.router." +
              key +
              " directly. It is private API " +
              "for internal use only and is subject to change at any time. Instead, use " +
              "a <Route> or withRouter() to access the current location, match, etc."
          );
        });
        context$$1._withoutWarnings = contextWithoutWarnings;
      }

      return {
        router: context$$1
      };
    };
  }

  {
    Route.propTypes = {
      children: propTypes.oneOfType([propTypes.func, propTypes.node]),
      component: function component(props, propName) {
        if (props[propName] && !reactIs.isValidElementType(props[propName])) {
          return new Error(
            "Invalid prop 'component' supplied to 'Route': the prop is not a valid React component"
          );
        }
      },
      exact: propTypes.bool,
      location: propTypes.object,
      path: propTypes.oneOfType([
        propTypes.string,
        propTypes.arrayOf(propTypes.string)
      ]),
      render: propTypes.func,
      sensitive: propTypes.bool,
      strict: propTypes.bool
    };

    Route.prototype.componentDidMount = function() {
      warning_1$1(
        !(
          this.props.children &&
          !isEmptyChildren(this.props.children) &&
          this.props.component
        ),
        "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"
      );
      warning_1$1(
        !(
          this.props.children &&
          !isEmptyChildren(this.props.children) &&
          this.props.render
        ),
        "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"
      );
      warning_1$1(
        !(this.props.component && this.props.render),
        "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
      );
    };

    Route.prototype.componentDidUpdate = function(prevProps) {
      warning_1$1(
        !(this.props.location && !prevProps.location),
        '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
      );
      warning_1$1(
        !(!this.props.location && prevProps.location),
        '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
      );
    };
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

  function addLeadingSlash$1(path) {
    return path.charAt(0) === "/" ? path : "/" + path;
  }

  function addBasename(basename, location) {
    if (!basename) return location;
    return _extends$4({}, location, {
      pathname: addLeadingSlash$1(basename) + location.pathname
    });
  }

  function stripBasename$1(basename, location) {
    if (!basename) return location;
    var base = addLeadingSlash$1(basename);
    if (location.pathname.indexOf(base) !== 0) return location;
    return _extends$4({}, location, {
      pathname: location.pathname.substr(base.length)
    });
  }

  function createURL(location) {
    return typeof location === "string" ? location : createPath(location);
  }

  function staticHandler(methodName) {
    return function() {
      invariant_1(false, "You cannot %s with <StaticRouter>", methodName);
    };
  }

  function noop() {}
  /**
   * The public top-level API for a "static" <Router>, so-called because it
   * can't actually change the current location. Instead, it just records
   * location changes in a context object. Useful mainly in testing and
   * server-rendering scenarios.
   */

  var StaticRouter =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(StaticRouter, _React$Component);

      function StaticRouter() {
        var _this;

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this;

        _this.createHref = function(path) {
          return addLeadingSlash$1(_this.props.basename + createURL(path));
        };

        _this.handlePush = function(location) {
          var _this$props = _this.props,
            basename = _this$props.basename,
            context = _this$props.context;
          context.action = "PUSH";
          context.location = addBasename(basename, createLocation(location));
          context.url = createURL(context.location);
        };

        _this.handleReplace = function(location) {
          var _this$props2 = _this.props,
            basename = _this$props2.basename,
            context = _this$props2.context;
          context.action = "REPLACE";
          context.location = addBasename(basename, createLocation(location));
          context.url = createURL(context.location);
        };

        _this.handleListen = function() {
          return noop;
        };

        _this.handleBlock = function() {
          return noop;
        };

        return _this;
      }

      var _proto = StaticRouter.prototype;

      _proto.render = function render() {
        var _this$props3 = this.props,
          basename = _this$props3.basename,
          context = _this$props3.context,
          location = _this$props3.location,
          rest = _objectWithoutPropertiesLoose(_this$props3, [
            "basename",
            "context",
            "location"
          ]);

        var history = {
          createHref: this.createHref,
          action: "POP",
          location: stripBasename$1(basename, createLocation(location)),
          push: this.handlePush,
          replace: this.handleReplace,
          go: staticHandler("go"),
          goBack: staticHandler("goBack"),
          goForward: staticHandler("goForward"),
          listen: this.handleListen,
          block: this.handleBlock
        };
        return React.createElement(
          Router,
          _extends$4({}, rest, {
            history: history,
            staticContext: this.props.context || {}
          })
        );
      };

      return StaticRouter;
    })(React.Component);

  StaticRouter.defaultProps = {
    basename: "",
    location: "/"
  };

  {
    StaticRouter.propTypes = {
      basename: propTypes.string,
      context: propTypes.object,
      location: propTypes.oneOfType([propTypes.string, propTypes.object])
    };

    StaticRouter.prototype.componentDidMount = function() {
      warning_1$1(
        !this.props.history,
        "<StaticRouter> ignores the history prop. To use a custom history, " +
          "use `import { Router }` instead of `import { StaticRouter as Router }`."
      );
    };
  }

  /**
   * The public API for rendering the first <Route> that matches.
   */

  var Switch =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(Switch, _React$Component);

      function Switch() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = Switch.prototype;

      _proto.render = function render() {
        var _this = this;

        return React.createElement(context.Consumer, null, function(
          context$$1
        ) {
          !context$$1
            ? invariant_1(
                false,
                "You should not use <Switch> outside a <Router>"
              )
            : void 0;
          var location = _this.props.location || context$$1.location;
          var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
          // here because toArray adds keys to all child elements and we do not want
          // to trigger an unmount/remount for two <Route>s that render the same
          // component at different URLs.

          React.Children.forEach(_this.props.children, function(child) {
            if (match == null && React.isValidElement(child)) {
              element = child;
              var path = child.props.path || child.props.from;
              match = path
                ? matchPath(
                    location.pathname,
                    _extends$4({}, child.props, {
                      path: path
                    })
                  )
                : context$$1.match;
            }
          });
          return match
            ? React.cloneElement(element, {
                location: location,
                computedMatch: match
              })
            : null;
        });
      };

      return Switch;
    })(React.Component);

  {
    Switch.propTypes = {
      children: propTypes.node,
      location: propTypes.object
    };

    Switch.prototype.componentDidUpdate = function(prevProps) {
      warning_1$1(
        !(this.props.location && !prevProps.location),
        '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
      );
      warning_1$1(
        !(!this.props.location && prevProps.location),
        '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
      );
    };
  }

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };

  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== "string") {
      // don't hoist over string (html) components

      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols$1) {
        keys = keys.concat(getOwnPropertySymbols$1(sourceComponent));
      }

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (
          !REACT_STATICS[key] &&
          !KNOWN_STATICS[key] &&
          (!blacklist || !blacklist[key])
        ) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }

      return targetComponent;
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  /**
   * A public higher-order component to access the imperative API
   */

  function withRouter(Component) {
    var C = function C(props) {
      var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutPropertiesLoose(props, [
          "wrappedComponentRef"
        ]);

      return React.createElement(Route, {
        children: function children(routeComponentProps) {
          return React.createElement(
            Component,
            _extends$4({}, remainingProps, routeComponentProps, {
              ref: wrappedComponentRef
            })
          );
        }
      });
    };

    C.displayName =
      "withRouter(" + (Component.displayName || Component.name) + ")";
    C.WrappedComponent = Component;

    {
      C.propTypes = {
        wrappedComponentRef: propTypes.func
      };
    }

    return hoistNonReactStatics_cjs(C, Component);
  }

  exports.MemoryRouter = MemoryRouter;
  exports.Prompt = Prompt;
  exports.Redirect = Redirect;
  exports.Route = Route;
  exports.Router = Router;
  exports.StaticRouter = StaticRouter;
  exports.Switch = Switch;
  exports.generatePath = generatePath;
  exports.matchPath = matchPath;
  exports.withRouter = withRouter;
  exports.__RouterContext = context;

  Object.defineProperty(exports, "__esModule", { value: true });
});
