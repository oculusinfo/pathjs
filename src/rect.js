var _ = require('./util');
var Node = require('./node');

var Rect = function() {
  Node.apply(this, arguments);
};


Rect.prototype = _.extend(Rect.prototype, Node.prototype, {
  draw: function(ctx) {
    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(0, 0, this.width || 0, this.height || 0);
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = this.lineWidth || 1;
      ctx.lineCap = this.lineCap || 'butt';
      ctx.lineJoin = this.lineJoin || 'miter';
      ctx.strokeRect(0, 0, this.width || 0, this.height || 0);
    }
  },

  pick: function(ctx, x, y, lx, ly) {
    return lx >= 0 && lx < this.width && ly >= 0 && ly < this.height;
  }
});


module.exports = Rect;