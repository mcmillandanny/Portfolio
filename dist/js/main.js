"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720,
	transparent: true
});

var imageFilterApp = new PIXI.Application({
	view: document.getElementById("project1"),
	width: 1280,
	height: 720,
	transparent: true
});

var manifest = [{ "key": "hanselProject", "url": "dist/img/hanselproject.jpg" }, { "key": "displacement", "url": "dist/img/displacement2.png" }];

function loadAssets() {
	app.loader.add(manifest);

	app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {

	godRayFilter();

	imageFilter();

	setupScrollProgress();

	setupTextDecompose();

	app.ticker.add(function (e) {
		return update(e);
	});
}

function imageFilter() {
	var hanselProjectImg = new PIXI.Sprite(app.loader.resources.hanselProject.texture);
	imageFilterApp.stage.addChild(hanselProjectImg);

	var displace = new PIXI.Sprite(app.loader.resources.displacement.texture);
	var displaceFilter = new PIXI.filters.DisplacementFilter(displace);

	imageFilterApp.stage.filters = [displaceFilter];
	displaceFilter.scale.set(0);

	imageFilterApp.view.addEventListener("mouseover", function () {
		TweenMax.fromTo(displaceFilter.scale, 1, {
			x: 50,
			y: 50
		}, { x: 0,
			y: 0,
			ease: Elastic.easeOut
		});
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

	var styleTagLine = new PIXI.TextStyle({
		fill: "#c3771c",
		fontFamily: "\"Lucida Console\", Monaco, monospace",
		fontSize: 30,
		fontVariant: "small-caps",
		fontWeight: "bold"
	});

	var tagLine = new PIXI.Text("Interactive Developer", styleTagLine);
	app.stage.addChild(tagLine);

	app.letters = [new PIXI.Text('D', style), new PIXI.Text('A', style), new PIXI.Text('N', style), new PIXI.Text('N', style), new PIXI.Text('Y ', style), new PIXI.Text('M', style), new PIXI.Text('C', style), new PIXI.Text('M', style), new PIXI.Text('I', style), new PIXI.Text('L', style), new PIXI.Text('L', style), new PIXI.Text('A', style), new PIXI.Text('N', style)];

	var kerning = [0, 0, 0, 0, 0, 0, 0, 0, 0, -5, -12, -15, -15];

	app.letters.forEach(function (letter, i) {

		letter.velocity = {
			x: Math.random() * 10 - 5,
			y: Math.random() * 10 - 5
		};

		letter.initPos = {
			x: 330 + 50 * i + kerning[i],
			y: 120
		};

		letter.endPoint = {
			x: 500,
			y: -1000
		};

		letter.x = letter.initPos.x;
		letter.y = letter.initPos.y;

		letter.activatedText = false;
		app.stage.addChild(letter);
		letter.interactive = true;
		letter.tweening = true;

		if (letter.tweening === true) {

			TweenMax.fromTo(letter, .5, {
				y: Math.random() * window.innerHeight,
				ease: Power2.easeIn
			}, {
				y: letter.initPos.y,
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
				letter.y = letter.initPos.y;
				letter.x = letter.initPos.x;
				letter.activatedText = false;
			}

			if (letter.y < 0) {
				letter.velocity.y *= -0.8;
				letter.y = letter.initPos.y;
				letter.x = letter.initPos.x;
				letter.activatedText = false;
			}

			if (letter.x > 1280) {
				letter.velocity.x *= -0.8;
				letter.x = letter.initPos.x;
				letter.y = letter.initPos.y;
				letter.activatedText = false;
			}

			if (letter.x < 0) {
				letter.velocity.x *= -0.8;
				letter.x = letter.initPos.x;
				letter.y = letter.initPos.y;
				letter.activatedText = false;
			}
		} else {
			letter.x = lerp(letter.initPos.x, letter.endPoint.x, percentScrolled);
			letter.y = lerp(letter.initPos.y, letter.endPoint.y, percentScrolled);
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

var width = Math.ceil(Math.random() * 1000);
var height = Math.ceil(Math.random() * 1000);

//make random number between 200-500
//each div width/height should be different
//clear the results when hamburger is closed


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

var waypoint = new Waypoint({
	element: document.querySelector('.p1'),
	handler: function handler() {
		alert('Basic waypoint triggered');
	}
});
//# sourceMappingURL=main.js.map
