var _ = require('./util');
var Node = require('./node');

var Text = function() {
  Node.apply(this, arguments);
};


Text.prototype = _.extend(Text.prototype, Node.prototype, {
  draw: function(ctx) {
    if (!this.visible) {
      return;
    }

    var x = this.x || 0;
    var y = this.y || 0;

    ctx.font = this.font || '10px sans-serif';
    ctx.textAlign = this.textAlign || 'start';
    ctx.textBaseline = this.textBaseline || 'alphabetic';

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.text, x, y);
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = this.lineWidth || 1;
      ctx.lineCap = this.lineCap || 'butt';
      ctx.lineJoin = this.lineJoin || 'miter';
      ctx.strokeText(this.text, x, y);
    }
  },

  pick: function(ctx, x, y, lx, ly) {
    if (!this.visible) {
      return;
    }

    var x = this.x || 0;
    var y = this.y || 0;
    var width = ctx.measureText(this.text);
    // XXX Height
    if (lx >= x && lx < x+width && ly >= y && ly < y+10) {
      return this;
    }
  }
});


module.exports = Text;