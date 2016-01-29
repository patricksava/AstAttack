(function(namespace) {
  namespace.CallbackHelper = function(obj) {
    var functions = {};

    this.listen = function(callbackName, func) {
      if(typeof(functions[callbackName]) === "undefined") {
        functions[callbackName] = [];
      }
      functions[callbackName].push(func);
    };

    this.emit = function(callbackName, params) {
      if(typeof(params) === "undefined") {
        params = [];
      } else if(!params.constructor || params.constructor !== window.Array) {
        params = [params];
      }
      var cbFunctions = functions[callbackName];
      if(typeof(cbFunctions) !== "undefined") {
        for(var i = 0; i < cbFunctions.length; i++) {
          cbFunctions[i].apply(obj, params);
        }
      }
    };
  };

  namespace.CallbackHelper.initializeFor = function(obj) {
    var callbacks = new namespace.CallbackHelper(obj);
    obj.listen = callbacks.listen;
    return callbacks;
  };
}(LNXCommons = window.LNXCommons || {}));
