# path.js

> A minimal retained mode wrapper with picking support around the Canvas API

### Usage


Basic usage
```
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
```
```


Picking and data support
```
rect.data(myDataObj);
rect.on('click', function(e) {
	console.log('My data: ' + e.targetNode.data());
});
```


Mouse enter/leave detection, modify properties directly
```
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
```
rect.tweenAttr({
	strokeWidth: 10
}, {
	duration: 1000,
	easing: 'ease-in-out'
});

// Start all scene animations, update() will be called automatically until animation completes
scene.update();
```


Groups and basic transform support
```
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


### Notes

SVG path to canvas path sketching, taken and adapted from:
- Vega: github.com/trifacta/vega
 License: https://github.com/trifacta/vega/blob/master/LICENSE
- Fabric.js: github.com/kangax/fabric.js/blob/master/src/shapes/path.class.js
 License: https://github.com/kangax/fabric.js/blob/master/LICENSE
