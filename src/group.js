var _ = require('./util');
var Node = require('./node');

var Group = function() {
  Node.apply(this, arguments);

  this.children = [];
};


Group.prototype = _.extend(Group.prototype, Node.prototype, {

  add: function(child) {
    child.parent = this;
    this.children.push(child);
    return this;
  },

  remove: function(child) {
    if (child) {
      // Remove child
      var idx = this.children.indexOf(child);
      if (idx >= 0) {
        this.children.splice(idx, 1);
        child.parent = null;
        return child;
      }
    } else {
      // Remove self
      return Node.prototype.remove.call(this);
    }
  },

  pick: function(ctx, x, y, lx, ly) {
    var children = this.children;
    var tx = this.x || 0;
    var ty = this.y || 0;
    var result;

    if (!this.visible) {
      return;
    }

    ctx.save();
    ctx.translate(tx, ty);

    // Apply transform to local coordinate values
    lx -= tx;
    ly -= ty;

    for (var i=children.length-1; i>=0; i--) {
      result = children[i].pick(ctx, x, y, lx, ly);
      if (result) {
        break;
      }
    }

    ctx.restore();
    return result;
  },

  draw: function(ctx) {
    var children = this.children;
    for (var i=0, l=children.length; i<l; i++) {
      children[i].render(ctx);
    };
  }
});


module.exports = Group;