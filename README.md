# path.js

> A minimal retained mode wrapper with picking support around the Canvas API

**Features:**
 - Retained mode\*: A light "scene graph"-style interface for grouping, transforming, drawing, and picking
 - SVG path interpolation: give a path object an SVG string and it will be interpolated into lines, beziers, and arcs as necessary
 - Picking: All drawn glyphs support DOM-style event listeners for handling mouse input

\* Some may argue that retained mode isn't a feature and immediate mode is better suited to canvas-based applications...so what's the point? This is likely true for many cases, particularly for scenes that change significantly from frame-to-frame. However, if retained mode makes sense for your application (such as in [ApertureJS](https://github.com/oculusinfo/aperturejs)) path.js provides a simple abstraction. Think of it as an easy way to record and batch canvas commands to be replayed on demand.


### Building

Requires [node, npm](http://nodejs.org/). Setup:
```bash
npm install
```

To compile the project to `path.js` and `path.min.js` in the `dist/` directory:
```bash
npm run build
```

### Developing

To compile, watch-reload, and serve the project including examples:
```bash
npm run watch
```

Under the hood `gulp` is used for build/watch so if you have `gulp` installed globally you can also run:
```bash
# Build the project
gulp build

# Build/watch and serve
gulp watch
```


### Usage

Basic usage
```javascript
var canvas = document.getElementById('my-canvas');
var scene = path(canvas);

var rect = path.rect({
	x: 100,
	y: 200,
	width: 50,
	height: 50,
	strokeColor: '#777',
	strokeWidth: 3
});
scene.add(rect);

scene.update();
```


SVG path support
```javascript
// Draw a 40px diameter ring
var ring = path.path({
	path: 'M-20,0A20,20,0,0,1,20,0A20,20,0,0,1,-20,0ZM-10,0A10,10,0,0,0,10,0A10,10,0,0,0,-10,0Z',
	fillStyle: '#7ad',
	strokeStyle: '#000',
});
scene.add(ring);

scene.update();
```


Picking and associated data
```javascript
rect.data(myDataObj);
rect.on('click', function(e) {
	console.log('My data: ' + e.targetNode.data());
});
```


Mouse enter/leave detection, modify properties directly
```javascript
rect.on('mouseover', function(e) {
	rect.fillStyle = '#f00';
	scene.update();
});
rect.on('mouseout', function(e) {
	rect.fillStyle = null;
	scene.update();
});
```


Animation support for numeric attributes
```javascript
rect.attr({
	x: 0,
	y: 0,
	strokeWidth: 5
}).tweenAttr({
	x: 100,
	y: 100,
	strokeWidth: 10
}, {
	duration: 1000,
	easing: 'ease-in-out'
});

// Start all scene animations, update() will be called automatically until animation completes (1 second)
scene.update();
```


Groups and basic transform support
```javascript
var group = path.group({
	x: -100,
	y: 200,
	rotation: Math.PI / 4,
	scaleX: 2,
	scaleY: 0.5
});
scene.add(group);

group.add(rect);
```

### To Do

 - Stroke vs fill picking on Rect
 - Proper font-height calculation for picking
 - Implement bounding box calculation to improve picking speed
 - Tweening between paths
 - Drag event support
 - Touch support
 - Documentation
 - Unit tests

### Notes

SVG path to canvas path sketching, taken and adapted from:
- Vega: github.com/trifacta/vega
 License: https://github.com/trifacta/vega/blob/master/LICENSE
- Fabric.js: github.com/kangax/fabric.js/blob/master/src/shapes/path.class.js
 License: https://github.com/kangax/fabric.js/blob/master/LICENSE
