var _ = require('./util');
var polyfill = require('./polyfills');
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

  // Add helper polyfills to context instance
  polyfill.dashSupport(this.context);

  // Offset by 1/2 pixel to align with pixel edges
  // http://diveintohtml5.info/canvas.html#pixel-madness
  this.x = 0.5;
  this.y = 0.5;

  // Bind members for convenient callback
  this.update = this.update.bind(this);
  this._handle = this._handle.bind(this);
  this._mousemove = this._mousemove.bind(this);

  // Register event listeners on canvas that use picker to hittest
  ['click', 'dblclick', 'mousedown', 'mouseup'].forEach(function(type) {
    self.el.addEventListener(type, self._handle);
  });
  this.el.addEventListener('mousemove', this._mousemove);

  // Listen for update requests from scenegraph, defer by a frame, coalesce
  this._pendingUpdate = null;
  this.on('update', function() {
    if (!self._pendingUpdate) {
      self._pendingUpdate = polyfill.requestAnimationFrame( self.update );
    }
  });

  // Resize to current DOM-specified sizing
  this.resize();
};


_.extend(Path.prototype, Group.prototype, {
  resize: function(w, h) {
    this.width = w || this.el.clientWidth;
    this.height = h || this.el.clientHeight;

    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';
  },


  update: function() {
    var self = this;
    // TODO this may not be reliable on mobile
    var devicePixelRatio = window.devicePixelRatio || 1;

    // Update size to equal displayed pixel size + clear
    this.context.canvas.width = this.width * devicePixelRatio;
    this.context.canvas.height = this.height * devicePixelRatio;
    if (devicePixelRatio != 1) {
      this.context.save();
      this.context.scale(devicePixelRatio,devicePixelRatio);
    }

    this._pendingUpdate = null;

    // Active animations? schedule tween update + render on next frame
    if (window.TWEEN && TWEEN.getAll().length > 0) {
      // XXX Could be an existing pending update
      this._pendingUpdate = polyfill.requestAnimationFrame(function() {
        TWEEN.update();
        self.update();
      });
    }

    this.render(this.context);

    if (devicePixelRatio != 1) {
      this.context.restore();
    }
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
    // TODO Handle mouse leaving canvas
  }
});



// STATIC

// Create
var namespaceConstructors = {
  rect: require('./rect'),
  path: require('./path'),
  text: require('./text'),
  image: require('./image'),
  group: Group
};

for (attr in namespaceConstructors) {
  Path[attr] = (function(attr) {
    return function(props) {
      return new namespaceConstructors[attr](props);
    };
  }(attr));
}


module.exports = Path;