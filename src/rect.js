var _ = require('./util');
var Node = require('./node');

var Rect = function() {
  Node.apply(this, arguments);
};


Rect.prototype = _.extend(Rect.prototype, Node.prototype, {
  draw: function(ctx) {
    if (!this.visible) {
      return;
    }

    var x = this.x || 0;
    var y = this.y || 0;
    var width = this.width || 0;
    var height = this.height || 0;

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(x, y, width, height);
    }
    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth || 1;
      ctx.lineCap = this.lineCap || 'butt';
      ctx.lineJoin = this.lineJoin || 'miter';
      ctx.miterLimit = this.miterLimit || 10;
      ctx.setLineDash(this.lineDash || NONE);
      ctx.setLineDashOffset(this.lineDashOffset || 0);
      ctx.strokeRect(x, y, width, height);
    }
  },

  pick: function(ctx, x, y, lx, ly) {
    if (!this.visible) {
      return;
    }

    var x = this.x || 0;
    var y = this.y || 0;
    var width = this.width || 0;
    var height = this.height || 0;

    if (lx >= x && lx < x+width && ly >= y && ly < y+height) {
      return this;
    }
  }
});


module.exports = Rect;