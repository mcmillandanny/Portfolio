"use strict";

var app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720,
	transparent: true
});

var rgb = new PIXI.filters.RGBSplitFilter({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });

var manifest = [{ "key": "ball", "url": "dist/img/logo.png" }, { "key": "displace", "url": "dist/img/displacement.png" }];

function loadAssets() {
	app.loader.add(manifest);

	app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {

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
	start.x = 50;
	start.y = 100;
	app.stage.addChild(start);

	var end = new PIXI.Graphics();
	end.beginFill(0xffffff);
	end.drawCircle(0, 0, 4);
	end.x = 50;
	end.y = 500;
	app.stage.addChild(end);

	// draw progress bar
	app.scrollProgress = new PIXI.Graphics();
	app.scrollProgress.beginFill(0xffffff);
	app.scrollProgress.drawRect(-2, 0, 4, 400);

	app.scrollProgress.x = 50;
	app.scrollProgress.y = 100;

	app.stage.addChild(app.scrollProgress);
}

function setupTextDecompose() {
	var style = new PIXI.TextStyle({
		fill: "white",
		fontFamily: "Helvetica",
		fontSize: 60,
		fontVariant: "small-caps",
		fontWeight: "bold"
	});

	app.letters = [new PIXI.Text('D', style), new PIXI.Text('A', style), new PIXI.Text('N', style), new PIXI.Text('N', style), new PIXI.Text('Y', style), new PIXI.Text('M', style), new PIXI.Text('C', style), new PIXI.Text('M', style), new PIXI.Text('I', style), new PIXI.Text('L', style), new PIXI.Text('L', style), new PIXI.Text('A', style), new PIXI.Text('N', style)];

	app.letters.forEach(function (letter, i) {

		letter.x = 350 + 50 * i;
		letter.y = 120;

		app.stage.addChild(letter);

		letter.interactive = true;
		letter.on('mouseover', function (interaction) {

			letter.x = Math.random() * window.innerWidth;
			letter.y = Math.random() * window.innerHeight;

			console.log(letter.x, letter.y);
		});
	});
}

function update(e) {
	var html = document.scrollingElement;
	var percentScrolled = html.scrollTop / (html.scrollHeight - html.offsetHeight);

	// console.log(percentScrolled);

	app.scrollProgress.scale.set(1, percentScrolled);

	// change filter amt based on scroll
	rgb.red = { x: 20 * percentScrolled, y: 10 * percentScrolled };

	// lerp position
	// for (let i = 0; i < app.letters.length; i++) {
	// 	let letter = app.letters[i];

	// 	letter.x = lerp(letter.startPt.x, letter.endPt.x, percentScrolled);
	// 	letter.y = lerp(letter.startPt.y, letter.endPt.y, percentScrolled);
	// }
}

function lerp(start, end, t) {
	return (1 - t) * start + t * end;
}

window.onload = function () {

	loadAssets();
};
//# sourceMappingURL=main.js.map
