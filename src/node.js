var _ = require('./util');

var ID = 0;

var Node = function(attributes) {
  this.id = ID++;
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

  on: function(type, handler) {

  },

  off: function(type, handler) {

  },

  trigger: function(event) {

  },

  // noop implementations
  draw: function() {},
  pick: function() { return false; },
  forEachChild: function() {}
}

module.exports = Node;