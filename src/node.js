var _ = require('./util');

var ID = 0;

var Node = function(attributes) {
  this.id = ID++;
  this.parent = null;
  this.visible = true;
  this.handlers = {};

  _.extend(this, attributes);
};

Node.prototype = {
  data: function(data) {
    if (arguments.length === 0) {
      return this._data;
    } else {
      this._data = data;
    }
  },

  attr: function(attributes) {
    _.extend(this, attributes);
    return this;
  },

  tweenAttr: function(attributes, transition) {
    var self = this;
    var key, statics;
    transition = transition || {};

    // Only support tweening numbers - statically set everything else
    for (key in attributes) {
      if (attributes.hasOwnProperty(key) && typeof attributes[key] != 'number') {
        statics = statics || {};
        statics[key] = attributes[key];
        delete attributes[key];
      }
    }

    if (statics) {
      this.attr(statics);
    }

    this.tween = new TWEEN.Tween(this)
      .to(attributes, transition.duration || 1000)
      .onStop(function() {
        self.tween = null;
        if (transition.callback) {
          transition.callback(this, attributes);
        }
      })
      .start();
  },

  on: function(type, handler) {
    var handlers = this.handlers[type];
    if (!handlers) {
      handlers = this.handlers[type] = [];
    }
    handlers.push(handler);
  },

  off: function(type, handler) {
    if (!handler) {
      this.handlers[type] = [];
    } else {
      var handlers = this.handlers[type];
      var idx = handlers.indexOf(handler);
      if (idx >= 0) {
        handlers.splice(idx, 1);
      }
    }
  },

  trigger: function(type, event) {
    var handled = false;
    var handlers = this.handlers[type];

    if (handlers) {
      handlers.forEach(function(handler) {
        handled = handler(event) || handled;
      });
    }

    if (!handled && this.parent) {
      handled = this.parent.trigger(type, event);
    }

    return handled;
  },

  remove: function() {
    if (this.parent) {
      this.parent.remove(this);
    }
  },

  draw: function(ctx) {
  },

  pick: function(ctx, x, y, lx, ly) {
  }
}

module.exports = Node;