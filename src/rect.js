var _ = require('./util');
var Node = require('./node');

var NONE = [];

/**
 * Rectangle Node
 *
 * Properties inherited from Node: visible, x, y, rotation, scaleX, scaleY, opacity
 *
 * width: width of the rectangle
 * height: height of the rectangle
 * fillStyle, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit:
 *   as specified in the HTML5 Canvas API
 * lineDash: an array specifying on/off pixel pattern
 *   (e.g. [10, 5] = 10 pixels on, 5 pixels off) (not supported in all browsers)
 * lineDashOffset: a pixel offset to start the dashes (not supported in all browsers)
 *
 * Note: picking is always enabled on the entire rect (no stroke-only picking) at
 * the moment.
 */
var Rect = function() {
  Node.apply(this, arguments);
};


Rect.prototype = _.extend(Rect.prototype, Node.prototype, {
  draw: function(ctx) {
    var width = this.width || 0;
    var height = this.height || 0;

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(0, 0, width, height);
    }
    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth || 1;
      ctx.lineCap = this.lineCap || 'butt';
      ctx.lineJoin = this.lineJoin || 'miter';
      ctx.miterLimit = this.miterLimit || 10;
      ctx.setLineDash(this.lineDash || NONE);
      ctx.setLineDashOffset(this.lineDashOffset || 0);
      ctx.strokeRect(0, 0, width, height);
    }
  },

  hitTest: function(ctx, x, y, lx, ly) {
    var width = this.width || 0;
    var height = this.height || 0;

    if (lx >= 0 && lx < width && ly >= 0 && ly < height) {
      return this;
    }
  }
});


module.exports = Rect;