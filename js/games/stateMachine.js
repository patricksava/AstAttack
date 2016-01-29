(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;

  namespace.StateMachine = function(opts) {
    var callbacks = Callbacks.initializeFor(this);
    var states = opts && opts.states;
    var passiveTransitions = opts && opts.passiveTransitions;
    var activeTransitions = opts && opts.activeTransitions;
    var current = opts && opts.start;

    this.applyTransition = function(transition) {
      var availableTransitions = states[current].transitions;
      var nextState = availableTransitions && availableTransitions[transition];
      if(nextState) {
        activeTransitions[transition] && activeTransitions[transition]();
        var previousState = current;
        current = nextState;
        callbacks.emit("stateChange", [current, transition, previousState]);
      }
    }

    this.state = function() { return current; };
    
    this.executeCurrentState = function() {
      executeState(current);
    };

    function executeState(theState) {
      var stateAction = states[theState].action;
      if(typeof(stateAction) === "function") {
        stateAction();
      } else {
        states[stateAction].action();
      }
      current = states[theState].immediateTransition || current;
    };
  };
}(LNXGames = window.LNXGames || {}));
