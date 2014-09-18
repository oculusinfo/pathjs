var _ = require('./util');
var Node = require('./node');
var svg = require('./svg');


var NONE = [];


var Path = function() {
  Node.apply(this, arguments);
};


Path.prototype = _.extend(Path.prototype, Node.prototype, {

  // Much from Fabric.js - https://github.com/kangax/fabric.js/blob/master/src/shapes/path.class.js
  sketch: function(ctx) {
    var path = this.path;
    if (path && path.length > 0) {
      var pathCommands = this._commandCache || (this._commandCache = svg.parse(path));
      svg.render(ctx, pathCommands);
    }
  },

  draw: function(ctx) {
    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
    }

    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth || 1;
      ctx.lineCap = this.lineCap || 'butt';
      ctx.lineJoin = this.lineJoin || 'miter';
      ctx.miterLimit = this.miterLimit || 10;
      ctx.setLineDash(this.lineDash || NONE);
      ctx.setLineDashOffset(this.lineDashOffset || 0);
    }

    this.sketch(ctx);

    if (this.strokeStyle) {
      ctx.stroke();
    }
    if (this.fillStyle) {
      ctx.fill();
    }
  },

  hitTest: function(ctx, x, y, lx, ly) {
    this.sketch(ctx);

    if (this.fillStyle && ctx.isPointInPath(x,y)) {
      return this;
    }
    if (this.stroke && ctx.isPointInStroke(x,y)) {
      return this;
    }
  }
});


Object.defineProperty(Path.prototype, 'path', {
  get: function() {
    return this._path;
  },
  set: function(value) {
    if (this._path !== value) {
      this._path = value;
      this._commandCache = null;
    }
  }
});


module.exports = Path;