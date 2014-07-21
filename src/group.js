var _ = require('./util');
var Node = require('./node');

var Group = function() {
  Node.apply(this, arguments);

  this.children = [];
};


Group.prototype = _.extend(Group.prototype, Node.prototype, {

  add: function(child) {
    this.children.push(child);
    return this;
  },

  remove: function(child) {
    var idx = this.children.indexOf(child);
    if (idx >= 0) {
      this.children.splice(idx, 1);
    }
    return this;
  },

  forEachChild: function(fn, context) {
    this.children.forEach(fn, context);
  }
});


module.exports = Group;