"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720,
	transparent: true
});

var manifest = [{ "key": "displace", "url": "dist/img/stars.jpg" }];

function loadAssets() {
	app.loader.add(manifest);

	app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {

	godRayFilter();

	setupScrollProgress();

	setupTextDecompose();

	app.ticker.add(function (e) {
		return update(e);
	});
}

function setupScrollProgress() {
	// draw range circles
	var start = new PIXI.Graphics();
	start.beginFill(0xffffff);
	start.drawCircle(0, 0, 4);
	start.x = 1250;
	start.y = 100;
	app.stage.addChild(start);

	var end = new PIXI.Graphics();
	end.beginFill(0xffffff);
	end.drawCircle(0, 0, 4);
	end.x = 1250;
	end.y = 500;
	app.stage.addChild(end);

	// draw progress bar
	app.scrollProgress = new PIXI.Graphics();
	app.scrollProgress.beginFill(0xe16d3b);
	app.scrollProgress.drawRect(-2, 0, 4, 400);

	app.scrollProgress.x = 1250;
	app.scrollProgress.y = 100;

	app.stage.addChild(app.scrollProgress);
}

var godRay = new PIXI.filters.GodrayFilter();
var bgImage = new PIXI.Graphics();
var renderer = new PIXI.autoDetectRenderer();

godRay.lacunarity = 4;

function godRayFilter() {

	bgImage.beginFill(0X4f6d7a);
	bgImage.drawRect(0, 0, 3000, 3000);
	bgImage.endFill();
	app.stage.addChild(bgImage);

	bgImage.filters = [godRay];

	window.addEventListener("mousemove", function (e) {

		var mouseXcord = e.x - 400;
		godRay.angle = mouseXcord * 0.02;
	});
}

function setupTextDecompose() {
	var style = new PIXI.TextStyle(_defineProperty({
		fill: "white",
		fontFamily: "\"Lucida Console\", Monaco, monospace",
		fontSize: 60,
		fontVariant: "small-caps",
		fontWeight: "bold"
	}, "fill", "#eadbb0"));

	app.letters = [new PIXI.Text('D', style), new PIXI.Text('A', style), new PIXI.Text('N', style), new PIXI.Text('N', style), new PIXI.Text('Y ', style), new PIXI.Text('M', style), new PIXI.Text('C', style), new PIXI.Text('M', style), new PIXI.Text('I', style), new PIXI.Text('L', style), new PIXI.Text('L', style), new PIXI.Text('A', style), new PIXI.Text('N', style)];

	app.letters.forEach(function (letter, i) {

		letter.velocity = {
			x: Math.random() * 10 - 5,
			y: Math.random() * 10 - 5
		};

		letter.intiPos = {
			x: 320 + 50 * i,
			y: 120
		};

		letter.endPoint = {
			x: 500,
			y: -1000
		};

		letter.x = letter.intiPos.x;
		letter.y = letter.intiPos.y;

		letter.activatedText = false;
		app.stage.addChild(letter);
		letter.interactive = true;
		letter.tweening = true;

		if (letter.tweening === true) {

			TweenMax.fromTo(letter, .5, {
				y: Math.random() * window.innerHeight,
				ease: Power2.easeIn
			}, {
				y: letter.intiPos.y,
				onComplete: function onComplete() {
					letter.tweening = false;
				}
			});
		}

		letter.on('mouseover', function (interaction) {

			letter.tweening = true;

			TweenMax.to(letter, 1, {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				ease: Power1.easeIn,
				onComplete: function onComplete() {
					letter.tweening = false;
					letter.activatedText = true;
				}
			});
		});
	});
}

function update(e) {

	var html = document.scrollingElement;
	var percentScrolled = html.scrollTop / (html.scrollHeight - html.offsetHeight);
	// console.log(percentScrolled);
	app.scrollProgress.scale.set(1, percentScrolled);
	app.letters.forEach(function (letter) {
		if (letter.tweening === true) {
			// tween max has control
		} else if (letter.activatedText === true) {
			letter.velocity.x += Math.random() * 2 - 1;
			letter.velocity.y += Math.random() * 2 - 1;
			letter.x += letter.velocity.x;
			letter.y += letter.velocity.y;

			if (letter.y > 720) {
				letter.velocity.y *= -0.8;
				letter.y = letter.intiPos.y;
				letter.x = letter.intiPos.x;
				letter.activatedText = false;
			}

			if (letter.y < 0) {
				letter.velocity.y *= -0.8;
				letter.y = letter.intiPos.y;
				letter.x = letter.intiPos.x;
				letter.activatedText = false;
			}

			if (letter.x > 1280) {
				letter.velocity.x *= -0.8;
				letter.x = letter.intiPos.x;
				letter.y = letter.intiPos.y;
				letter.activatedText = false;
			}

			if (letter.x < 0) {
				letter.velocity.x *= -0.8;
				letter.x = letter.intiPos.x;
				letter.y = letter.intiPos.y;
				letter.activatedText = false;
			}
		} else {
			letter.x = lerp(letter.intiPos.x, letter.endPoint.x, percentScrolled);
			letter.y = lerp(letter.intiPos.y, letter.endPoint.y, percentScrolled);
		}
	});

	godRay.time += .001;
}

function lerp(start, end, t) {
	return (1 - t) * start + t * end;
}

window.onload = function () {

	loadAssets();
};

var hamburger = document.getElementById('hamburger');
var lines = document.querySelectorAll('.lines');
var shaderBlock1 = document.querySelector(".shader-block1");
var shaderBlock2 = document.querySelector(".shader-block2");

var width = Math.random(2) * 2000;
var height = Math.random(2) * 2000;
console.log(width);

function hamburgerToggle() {
	lines.forEach(function (line) {
		line.classList.toggle("change");
		console.log('clicked');
	});
	TweenMax.fromTo(shaderBlock1, .3, {
		width: 0,
		height: 0,
		x: 0,
		y: 0

	}, {
		width: width,
		height: height,
		x: 0,
		y: 0
	});
	TweenMax.fromTo(shaderBlock2, .3, {
		width: 0,
		height: 0,
		x: 0,
		y: 0

	}, {
		width: width,
		height: height,
		x: 0,
		y: 0
	});
};
hamburger.addEventListener("click", hamburgerToggle);

// shader blocks exp
//# sourceMappingURL=main.js.map
