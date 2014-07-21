# path.js

### Usage

```
var canvas = document.getElementById('my-canvas');
var scene = path(canvas);

var circle = path.path({
	path: 'M',
	strokeColor: '#777',
	strokeWidth: 3
});
scene.add(circle);

scene.render();
```

```
var circle = path.path();
circle.attr({
	path: 'M',
	strokeColor: '#777',
	strokeWidth: 3
});
circle.data(myDataObj);
circle.on('click', function(e) {
	console.log('My data: ' + e.target.data);
});
```


```
circle.attr({
	strokeWidth: 10
}, {
	duration: 1000,
	easing: 'ease-in-out'
});

// Start all scene animations
scene.render();
```

```
var group = path.group({
	translate: {x: -100, y:200}
});
scene.add(group);

var circle = path.path();
group.add(circle);
```