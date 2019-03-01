

let app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720, 
	transparent: true
});


let manifest = [
	{"key" : "displace", "url" : "dist/img/stars.jpg"}
];




function loadAssets() {
	app.loader.add(manifest);

	app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {

	godRayFilter();

	setupScrollProgress();

	setupTextDecompose();



	app.ticker.add((e) => update(e));
}

function setupScrollProgress() {
	// draw range circles
	let start = new PIXI.Graphics();
	start.beginFill(0xffffff);
	start.drawCircle(0, 0, 4);
	start.x = 50;
	start.y = 100;
	app.stage.addChild(start);

	let end = new PIXI.Graphics();
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

let godRay = new PIXI.filters.GodrayFilter()
let bgImage = new PIXI.Graphics();
var renderer = new PIXI.autoDetectRenderer();

godRay.lacunarity = 5;

function godRayFilter() {

	bgImage.beginFill(0X4f6d7a);
	bgImage.drawRect(0, 0, 3000, 3000);
	bgImage.endFill();	
	app.stage.addChild(bgImage)

	bgImage.filters = [godRay];
	
	
	window.addEventListener("mousemove", (e) => {

		let mouseXcord = e.x - 400;
		godRay.angle = mouseXcord * 0.02;
	})
}

function setupTextDecompose() {
	const style = new PIXI.TextStyle({
		fill: "white",
		fontFamily: "\"Lucida Console\", Monaco, monospace",
		fontSize: 60,
		fontVariant: "small-caps",
		fontWeight: "bold", 
		fill: "#eadbb0",
	});

	app.letters = [
		new PIXI.Text('D', style),
		new PIXI.Text('A', style),
		new PIXI.Text('N', style),
		new PIXI.Text('N', style),
		new PIXI.Text('Y ', style),
		new PIXI.Text('M', style),
		new PIXI.Text('C', style),
		new PIXI.Text('M', style),
		new PIXI.Text('I', style),
		new PIXI.Text('L', style),
		new PIXI.Text('L', style),
		new PIXI.Text('A', style),
		new PIXI.Text('N', style),

	];


	app.letters.forEach(function(letter, i) {

		letter.velocity = {
			x: (Math.random() * 10) - 5,
			y: (Math.random() * 10) - 5
		}

		letter.intiPos = {
			x : 320 + 50 * i,
			y : 120
		}

		letter.endPoint = {
			x: 1000, 
			y: 2000
		}

		letter.x = letter.intiPos.x;
		letter.y = letter.intiPos.y;

		letter.activatedText = false;
		app.stage.addChild(letter);
		letter.interactive = true;
		letter.tweening = true;


		if (letter.tweening === true) {

			TweenMax.fromTo(letter, .5, 
			{
				y: Math.random() * window.innerHeight,
				ease: Power2.easeIn,
			}, 
			{
				y: letter.intiPos.y,
				onComplete: ()=> {
					letter.tweening= false;
				}
			}); 
		}
		
		
		letter.on('mouseover', function(interaction) {
			
			letter.tweening = true;

			TweenMax.to(letter, 1, {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				ease: Power1.easeIn,
				onComplete: () => {
					letter.tweening = false;
					letter.activatedText = true;
				}
			});
		})
	})
}




function update(e) {

	let html = document.scrollingElement;
	let percentScrolled = html.scrollTop / (html.scrollHeight - html.offsetHeight);
	// console.log(percentScrolled);
	app.scrollProgress.scale.set(1, percentScrolled);
	app.letters.forEach(function(letter) {
		if (letter.tweening === true) {
			// tween max has control
		}
		else if (letter.activatedText === true) {
			letter.velocity.x += (Math.random() * 2) - 1;
			letter.velocity.y += (Math.random() * 2) - 1;
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
			}	
			else {
				letter.x = lerp(letter.intiPos.x, letter.endPoint.x, percentScrolled);
				letter.y = lerp(letter.intiPos.y, letter.endPoint.y, percentScrolled);
			}
	})

	godRay.time += .01;
	
}

function lerp(start, end, t) {
	return (1 - t) * start + t * end;
}

window.onload = function() {

	loadAssets();
}



const hamburger = document.getElementById('hamburger');
const lines = document.querySelectorAll('.lines');



function hamburgerToggle() {
    lines.forEach(function(line) {
		line.classList.toggle("change"); 
		
    });
};
hamburger.addEventListener("click", hamburgerToggle);

