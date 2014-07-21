var _ = require('./util');
var Group = require('./group');
var Renderer = require('./renderer');

var Path = function(element) {
  // Autoinstantiate
  if (!(this instanceof Path)) {
    return new Path(element);
  }

  var self = this;

  Group.apply(this);

  this.el = element;
  this.context = element.getContext("2d");
  this.renderer = new Renderer(this.context);};
};


_.extend(Path.prototype, Group.prototype, {
  render: function() {
    this.context.clearRect(0, 0, this.el.width, this.el.height);
    this.renderer.render(this);
  }
});



// STATIC

// Create
var attributes = {
  rect: require('./rect'),
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