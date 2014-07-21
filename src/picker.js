
var Picker = function(context) {
  this.context = context;
}


Picker.prototype = {
  pick: function(node, x, y, lx, ly) {
    var ctx = this.context;

    var tx = node.x || 0;
    var ty = node.y || 0;

    ctx.save();
    ctx.translate(tx, ty);

    // Apply transform to local coordinate values
    lx -= tx;
    ly -= ty;

    var result = node.pick(ctx, x, y, lx, ly);
    if (result) {
      return node;
    }

    if (node.children) {
      for (var i=node.children.length-1; i>=0; i--) {
        result = this.pick(node.children[i], x, y, lx, ly);
        if (result) {
          break;
        }
      }
    }

    ctx.restore();
    return result;
  }
};


module.exports = Picker;