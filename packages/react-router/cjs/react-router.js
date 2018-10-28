"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var createContext = _interopDefault(require("create-react-context"));
var warning = _interopDefault(require("warning"));
var React = _interopDefault(require("react"));
var PropTypes = _interopDefault(require("prop-types"));
var history = require("history");
var invariant = _interopDefault(require("invariant"));
var pathToRegexp = _interopDefault(require("path-to-regexp"));
var ReactIs = _interopDefault(require("react-is"));
var hoistStatics = _interopDefault(require("hoist-non-react-statics"));

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
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends =
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

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
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
          warning(false, message);
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
    router: PropTypes.object.isRequired
  };

  Router.prototype.getChildContext = function() {
    var context$$1 = getContext(this.props, this.state);

    {
      var contextWithoutWarnings = _extends({}, context$$1);

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
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    staticContext: PropTypes.object
  };

  Router.prototype.componentDidUpdate = function(prevProps) {
    warning(
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
      _this.history = history.createMemoryHistory(_this.props);
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
    initialEntries: PropTypes.array,
    initialIndex: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  };

  MemoryRouter.prototype.componentDidMount = function() {
    warning(
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
      if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
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
      ? invariant(false, "You should not use <Prompt> outside a <Router>")
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
  var messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);
  Prompt.propTypes = {
    when: PropTypes.bool,
    message: messageType.isRequired
  };
}

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = pathToRegexp.compile(path);

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
      ? invariant(false, "You should not use <Redirect> outside a <Router>")
      : void 0;
    var method = props.push
      ? context$$1.history.push
      : context$$1.history.replace;
    var to = history.createLocation(
      props.computedMatch
        ? typeof props.to === "string"
          ? generatePath(props.to, props.computedMatch.params)
          : _extends({}, props.to, {
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
        if (!history.locationsAreEqual(prevProps.to, to)) {
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
    push: PropTypes.bool,
    from: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };
}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = pathToRegexp(path, keys, options);
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
  return _extends({}, context$$1, {
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
          regeneratorRuntime.mark(function _callee(render, props) {
            var renderedAsync;
            return regeneratorRuntime.wrap(
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

      return React.createElement(context.Consumer, null, function(context$$1) {
        !context$$1
          ? invariant(false, "You should not use <Route> outside a <Router>")
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
              warning(
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
    router: PropTypes.object.isRequired
  };
  Route.childContextTypes = {
    router: PropTypes.object.isRequired
  };

  Route.prototype.getChildContext = function() {
    !this.context.router
      ? invariant(false, "You should not use <Route> outside a <Router>")
      : void 0;
    var parentContext = this.context.router;

    {
      parentContext = parentContext._withoutWarnings;
    }

    var context$$1 = getContext$1(this.props, parentContext);

    {
      var contextWithoutWarnings = _extends({}, context$$1);

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
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: function component(props, propName) {
      if (props[propName] && !ReactIs.isValidElementType(props[propName])) {
        return new Error(
          "Invalid prop 'component' supplied to 'Route': the prop is not a valid React component"
        );
      }
    },
    exact: PropTypes.bool,
    location: PropTypes.object,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    render: PropTypes.func,
    sensitive: PropTypes.bool,
    strict: PropTypes.bool
  };

  Route.prototype.componentDidMount = function() {
    warning(
      !(
        this.props.children &&
        !isEmptyChildren(this.props.children) &&
        this.props.component
      ),
      "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"
    );
    warning(
      !(
        this.props.children &&
        !isEmptyChildren(this.props.children) &&
        this.props.render
      ),
      "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"
    );
    warning(
      !(this.props.component && this.props.render),
      "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
    );
  };

  Route.prototype.componentDidUpdate = function(prevProps) {
    warning(
      !(this.props.location && !prevProps.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );
    warning(
      !(!this.props.location && prevProps.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  };
}

function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return _extends({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
}

function stripBasename(basename, location) {
  if (!basename) return location;
  var base = addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : history.createPath(location);
}

function staticHandler(methodName) {
  return function() {
    invariant(false, "You cannot %s with <StaticRouter>", methodName);
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
        return addLeadingSlash(_this.props.basename + createURL(path));
      };

      _this.handlePush = function(location) {
        var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;
        context.action = "PUSH";
        context.location = addBasename(
          basename,
          history.createLocation(location)
        );
        context.url = createURL(context.location);
      };

      _this.handleReplace = function(location) {
        var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;
        context.action = "REPLACE";
        context.location = addBasename(
          basename,
          history.createLocation(location)
        );
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

      var history$$1 = {
        createHref: this.createHref,
        action: "POP",
        location: stripBasename(basename, history.createLocation(location)),
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
        _extends({}, rest, {
          history: history$$1,
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
    basename: PropTypes.string,
    context: PropTypes.object,
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  StaticRouter.prototype.componentDidMount = function() {
    warning(
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

      return React.createElement(context.Consumer, null, function(context$$1) {
        !context$$1
          ? invariant(false, "You should not use <Switch> outside a <Router>")
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
                  _extends({}, child.props, {
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
    children: PropTypes.node,
    location: PropTypes.object
  };

  Switch.prototype.componentDidUpdate = function(prevProps) {
    warning(
      !(this.props.location && !prevProps.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );
    warning(
      !(!this.props.location && prevProps.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  };
}

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
          _extends({}, remainingProps, routeComponentProps, {
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
      wrappedComponentRef: PropTypes.func
    };
  }

  return hoistStatics(C, Component);
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
