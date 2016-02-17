(function(namespace) {
  var Callbacks = LNXCommons.CallbackHelper;
  var Timing = LNXCommons.Timing;

  namespace.StateMachine = function(opts) {
    var callbacks = Callbacks.initializeFor(this);
    var states = opts && opts.states;
    var passiveTransitions = opts && opts.passiveTransitions || {};
    var activeTransitions = opts && opts.activeTransitions || {};
    var timedTransitions = opts && opts.timedTransitions || {};
    var current = opts && opts.start;
    var chains = {};
    var self = this;

    for(chainName in timedTransitions) {
      var timedChain = timedTransitions[chainName];
      startTimedChain(chainName, timedChain);
    }

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


    this.stopTimedTransition = function(name) {
      // Need to evolve Timing module
      // clearInterval(chains[name].intervalId);
      // chains[name].intervalId = null;
    };

    this.restartTimedTransition = function(name) {
      // Need to evolve Timing module
      // chains[name].nextTransition = 0;
      // executeNextOnChain(name);
    };

    function startTimedChain(name, chain) {
      chains[name] = {
        "nextTransition" : 0,
        "intervalId" : null,
        "transitions" : chain
      };
      executeNextOnChain(name);
    }

    function executeNextOnChain(name) {
      var chain = chains[name];
      var transition = timedTransitionFrom(chain.transitions[chain.nextTransition]);
      Timing.timeout(function() {
        self.applyTransition(transition.name);
        chain.nextTransition = (chain.nextTransition + 1) % chain.transitions.length;
        executeNextOnChain(name)
      }, transition.time);
    }

    function timedTransitionFrom(transitionDSL) {
      for(var timeStr in transitionDSL) {
        var name = transitionDSL[timeStr];
      }
      var seconds = parseFloat(timeStr.match(/([\d.]+)s/)[1]);
      return {
        name: name,
        time: seconds
      };
    }
  };
}(LNXGames = window.LNXGames || {}));
