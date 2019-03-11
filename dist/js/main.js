"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720,
	transparent: true
});

var hanselCanvas = new PIXI.Application({
	view: document.getElementById("project1"),
	width: 1280,
	height: 720,
	transparent: true
});

var vueCanvas = new PIXI.Application({
	view: document.getElementById("project3"),
	width: 1280,
	height: 720,
	transparent: true
});

var slimePireCanvas = new PIXI.Application({
	view: document.getElementById("project2"),
	width: 1280,
	height: 720,
	transparent: true
});

var skCanvas = new PIXI.Application({
	view: document.getElementById("project4"),
	width: 1280,
	height: 720,
	transparent: true
});

var rxbarCanvas = new PIXI.Application({
	view: document.getElementById("project5"),
	width: 1280,
	height: 720,
	transparent: true
});

var zelpCanvas = new PIXI.Application({
	view: document.getElementById("project6"),
	width: 1280,
	height: 720,
	transparent: true
});

var manifest = [{ "key": "hanselProject", "url": "dist/img/hanselproject.jpg" }, { "key": "displacement", "url": "dist/img/displacement2.png" }, { "key": "vueProject", "url": "dist/img/IGDB.jpg" }, { "key": "slimePireProject", "url": "dist/img/slimepire.jpg" }, { "key": "skProject", "url": "dist/img/shakyknees.jpg" }, { "key": "rxbarProject", "url": "dist/img/rxbar.jpg" }, { "key": "zelpProject", "url": "dist/img/zelp.jpg" }];

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
	hanselCanvas.stage.addChild(hanselProjectImg);

	var vueProject = new PIXI.Sprite(app.loader.resources.vueProject.texture);
	vueCanvas.stage.addChild(vueProject);

	var slimePireProject = new PIXI.Sprite(app.loader.resources.slimePireProject.texture);
	slimePireCanvas.stage.addChild(slimePireProject);

	var skProject = new PIXI.Sprite(app.loader.resources.skProject.texture);
	skCanvas.stage.addChild(skProject);

	var rxbarProject = new PIXI.Sprite(app.loader.resources.rxbarProject.texture);
	rxbarCanvas.stage.addChild(rxbarProject);

	var zelpProject = new PIXI.Sprite(app.loader.resources.zelpProject.texture);
	zelpCanvas.stage.addChild(zelpProject);

	var displace = new PIXI.Sprite(app.loader.resources.displacement.texture);
	var displaceFilter = new PIXI.filters.DisplacementFilter(displace);
	displaceFilter.scale.set(0);

	vueCanvas.stage.filters = [displaceFilter];
	hanselCanvas.stage.filters = [displaceFilter];
	slimePireCanvas.stage.filters = [displaceFilter];
	skCanvas.stage.filters = [displaceFilter];
	rxbarCanvas.stage.filters = [displaceFilter];
	zelpCanvas.stage.filters = [displaceFilter];

	hanselCanvas.view.addEventListener("mouseover", function () {
		TweenMax.fromTo(displaceFilter.scale, 1, {
			x: 50,
			y: 50
		}, { x: 0,
			y: 0,
			ease: Elastic.easeOut
		});
	});

	vueCanvas.view.addEventListener("mouseover", function () {
		TweenMax.fromTo(displaceFilter.scale, 1, {
			x: 50,
			y: 50
		}, { x: 0,
			y: 0,
			ease: Elastic.easeOut
		});
	});

	slimePireCanvas.view.addEventListener("mouseover", function () {
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

		var mouseXcord = e.x - 500;
		godRay.angle = mouseXcord * 0.01;
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
		fontSize: 50,
		fontVariant: "small-caps",
		fontWeight: "bold"
	});

	var styleEmail = new PIXI.TextStyle({
		fill: "#f1a91c",
		fontFamily: "\"Lucida Console\", Monaco, monospace",
		fontSize: 35,
		fontVariant: "small-caps",
		fontWeight: "bold"
	});

	app.tagLine = new PIXI.Text("Interactive Developer", styleTagLine);
	app.stage.addChild(app.tagLine);
	app.email = new PIXI.Text("mcmillandanny@gmail.com", styleEmail);
	app.stage.addChild(app.email);

	app.email.pos = {
		x: 450,
		y: 370
	};

	app.email.endPos = {
		x: 5000,
		y: 0
	};

	app.tagLine.pos = {
		x: 400,
		y: 300
	};

	app.tagLine.endPos = {
		x: -5000,
		y: -0
	};

	TweenMax.fromTo(app.email.pos, 1.1, {
		x: 470,
		y: 1000
	}, {
		x: app.email.pos.x,
		y: app.email.pos.y,
		ease: Bounce.easeOut
	});

	TweenMax.fromTo(app.tagLine.pos, 2, {
		x: -1000,
		y: 300
	}, {
		x: app.tagLine.pos.x,
		y: app.tagLine.pos.y,
		ease: Elastic.easeOut.config(1, 0.3)
	});

	app.tagLine.x = app.tagLine.pos.x;
	app.tagLine.y = app.tagLine.pos.y;

	app.email.x = app.email.pos.x;
	app.email.y = app.email.pos.y;

	app.letters = [new PIXI.Text('D', style), new PIXI.Text('A', style), new PIXI.Text('N', style), new PIXI.Text('N', style), new PIXI.Text('Y ', style), new PIXI.Text('M', style), new PIXI.Text('C', style), new PIXI.Text('M', style), new PIXI.Text('I', style), new PIXI.Text('L', style), new PIXI.Text('L', style), new PIXI.Text('A', style), new PIXI.Text('N', style)];

	var kerning = [0, 0, 0, 0, 0, 0, 0, 0, 0, -5, -12, -15, -15];

	app.letters.forEach(function (letter, i) {

		letter.velocity = {
			x: Math.random() * 10 - 5,
			y: Math.random() * 10 - 5
		};

		letter.initPos = {
			x: 330 + 50 * i + kerning[i],
			y: 220
		};

		letter.endPoint = {
			x: 500,
			y: -2000
		};

		letter.x = letter.initPos.x;
		letter.y = letter.initPos.y;

		letter.activatedText = false;
		app.stage.addChild(letter);
		letter.interactive = true;
		letter.tweening = true;

		if (letter.tweening === true) {

			TweenMax.fromTo(letter, 1.2, {
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

		app.tagLine.x = lerp(app.tagLine.pos.x, app.tagLine.endPos.x, percentScrolled);
		app.tagLine.y = lerp(app.tagLine.pos.y, app.tagLine.endPos.y, percentScrolled);

		app.email.x = lerp(app.email.pos.x, app.email.endPos.x, percentScrolled);
		app.email.y = lerp(app.email.pos.y, app.email.endPos.y, percentScrolled);
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
var slideOutText = document.querySelector('.slide-out-text');

//waypoints

var waypoint = new Waypoint({
	element: slideOutText,
	offset: "50%",
	handler: function handler(direction) {
		if (direction === 'down') {
			console.log('triggerd down scroll');
			TweenMax.to(slideOutText, .3, {
				left: '0%'
			});
		} else if (direction === "up") {
			TweenMax.to(slideOutText, .3, {
				left: '50%'
			});
		}
	}
});
//# sourceMappingURL=main.js.map
