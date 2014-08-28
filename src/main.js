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
  this.events.forEach(function(type) {
    self.el.addEventListener(type, function(e) {
      var hit = self.pick(self.context, e.offsetX, e.offsetY, e.offsetX, e.offsetY);
      while (hit) {
        if (hit.trigger(type, e)) {
          hit = null;
        } else {
          hit = hit.parent;
        }
      }
    });
  });
};


_.extend(Path.prototype, Group.prototype, {
  events: [
    'click',
    'mousemove'
  ],

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
      TWEEN.update();

      requestAnimationFrame(function() {
        self.render();
      });
    }

    this.draw(this.context);
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