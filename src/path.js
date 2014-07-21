var _ = require('./util');
var Node = require('./node');
var svg = require('./svg');



var Path = function() {
  Node.apply(this, arguments);
};


Path.prototype = _.extend(Path.prototype, Node.prototype, {

  // Much from Fabric.js - https://github.com/kangax/fabric.js/blob/master/src/shapes/path.class.js
  sketch: function(ctx) {
    var pathCommands = this.commandCache || (this.commandCache = svg.parse(this.path));
    svg.render(ctx, pathCommands);
  },

  draw: function(ctx) {
    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
    }

    if (this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = this.lineWidth || 1;
    }

    this.sketch(ctx);

    if (this.stroke) {
      ctx.stroke();
    }
    if (this.fillStyle) {
      ctx.fill();
    }
  },

  pick: function(ctx, x, y, lx, ly) {
    this.sketch(ctx);
    return ctx.isPointInPath(x,y);
  }
});


module.exports = Path;