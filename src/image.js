var _ = require('./util');
var Node = require('./node');

var ImageNode = function() {
  Node.apply(this, arguments);

  this._loaded = false;
};


ImageNode.prototype = _.extend(ImageNode.prototype, Node.prototype, {
  draw: function(ctx) {
    var self;
    var width = this.width || 0;
    var height = this.height || 0;

    // Image has changed, reset state
    if (this._image && this._image.src !== this.url) {
      this._image = null;
    }

    if (this._image && this._image.loaded) {
      // Image
      ctx.drawImage(this._image, 0, 0, width, height);
    } else if (!this._image) {
      self = this;
      this._image = new Image();
      this._image.onload = function() {
        self._image.loaded = true;
        self.trigger('update');
      };
      this._image.src = this.url;
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


module.exports = ImageNode;