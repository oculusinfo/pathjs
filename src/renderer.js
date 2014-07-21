
var Renderer = function(context) {
  this.context = context;
}


Renderer.prototype = {
  render: function(node) {
    var ctx = this.context;
    // TODO tweens

    ctx.save();
    ctx.translate(node.x || 0, node.y || 0);

    node.draw(ctx);

    node.forEachChild(this.render, this);

    ctx.restore();
  }
};


module.exports = Renderer;