var _ = require('./util');
var Group = require('./group');


var Path = function(element) {
  // Autoinstantiate
  if (!(this instanceof Path)) {
    return new Path(element);
  }
  Group.apply(this);

  var self = this;

  this.el = element;
  this.context = element.getContext("2d");

  // Offset by 1/2 pixel to align with pixel edges
  this.x = 0.5;
  this.y = 0.5;

  // Register event listeners on canvas that use picker to hittest
  this._handle = this._handle.bind(this);
  this._mousemove = this._mousemove.bind(this);

  ['click', 'dblclick', 'mousedown', 'mouseup'].forEach(function(type) {
    self.el.addEventListener(type, self._handle);
  });
  this.el.addEventListener('mousemove', this._mousemove);
};


_.extend(Path.prototype, Group.prototype, {
  render: function() {
    var self = this;
    var activeAnimation = window.TWEEN && TWEEN.getAll().length > 0;

    // Update size + clear
    var width = this.el.clientWidth;
    var height = this.el.clientHeight;
    this.context.canvas.width = width;
    this.context.canvas.height = height;

    // TODO pixel ratio support
    // var pixelRatio = 2;
    // this.context.canvas.width = width*pixelRatio;
    // this.context.canvas.height = height*pixelRatio;
    // this.context.scale(pixelRatio,pixelRatio);

    if (activeAnimation) {
      requestAnimationFrame(function() {
        TWEEN.update();
        self.render();
      });
    }

    this.draw(this.context);
  },

  // General handler for simple events (click, mousedown, etc)
  _handle: function(e) {
    var hit = this.pick(this.context, e.offsetX, e.offsetY, e.offsetX, e.offsetY);
    if (hit) {
      e.targetNode = hit;
      hit.trigger(e.type, e);
    }
  },

  _mousemove: function(e) {
    var hit = this.pick(this.context, e.offsetX, e.offsetY, e.offsetX, e.offsetY);
    if (hit) {
      e.targetNode = hit;
    }
    // Manage mouseout/mouseover
    if (this._lastover != hit) {
      if (this._lastover) {
        this._lastover.trigger('mouseout', e);
      }
      this._lastover = hit;
      if (hit) {
        hit.trigger('mouseover', e);
      }
    }
    // Always send mousemove last
    if (hit) {
      hit.trigger('mousemove', e);
    }
  }
});



// STATIC

// Create
var attributes = {
  rect: require('./rect'),
  path: require('./path'),
  text: require('./text'),
  group: Group
};

for (attr in attributes) {
  Path[attr] = (function(attr) {
    return function(props) {
      return new attributes[attr](props);
    };
  }(attr));
}


module.exports = Path;