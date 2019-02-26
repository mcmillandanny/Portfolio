

let app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720, 
	transparent: true
});

let rgb = new PIXI.filters.RGBSplitFilter({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0});

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




  

function godRayFilter() {


	// let displace = new PIXI.Sprite(app.loader.resources.displace.texture, 2048, 2560)
	// app.stage.addChild(displace);
	// app.loader.resources.displace.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

	// let godRay = new PIXI.filters.GodrayFilter()
	

	let godRay = new PIXI.filters.GodrayFilter()

	// displace.filters = [godRay];
	app.stage.filters = [godRay];

	// TweenMax.from(godRay, 10,
	// 	{
	// 		angle: 20,
	// 		gain: 0.1,
	// 		lacunarity: 5, 
	// 		x: 100,
	// 		y: 100, 
	// 		repeat: -1 
			
	// 	});

		TweenMax.fromTo(godRay, 10,
			{
				time: .4,
				angle: 0,
				gain: 0.5,
				lacunarity: 4, 
				x: 100,
				y: 100, 
			},
			{
				time: .4,
				angle: 0,
				gain: 0.,
				lacunarity: 5, 
				x: 100,
				y: 100, 
				repeat: -1
				
			});
	

	
	// window.addEventListener("mousemove", (e) => {

	// 	let mouseXcord = e.x - 400;
	// 	console.log(e)

	// 	TweenMax.from(godRay, 10,
	// 		{
	// 			angle: mouseXcord,
	// 			gain: 0.6,
	// 			lacunarity: 5, 
	// 			x: 100
				
	// 		});
	// })

	// window.addEventListener("mouseleave", (e) => {
	// 	let mouseXcord = e.x
	// 	TweenMax.to(godRay, 10,
	// 		{
	// 			angle: 30,
	// 			gain: 0.6,
	// 			lacunarity: 5, 
	// 			x: 200
				
	// 		});
	// })
	




	// let filter = new PIXI.filters.GodrayFilter()
	// displace.filters = [filter];

	

	// TweenMax.fromTo(displace, 10,
	// 	{
	// 		x: 0,
	// 		y: 0,
	// 	},
	// 	{
	// 		x: -1024,
	// 		y: -1280,
	// 		repeat: -1,
	// 		ease: Linear.easeNone
	// 	});


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

	// app.letters[0].filters = [new PIXI.filters.GodrayFilter()];

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
			x: -1450, 
			y:	-1200
		}

		letter.x = letter.intiPos.x;
		letter.y = letter.intiPos.y;

		

		letter.activatedText = false;

		app.stage.addChild(letter);

		letter.interactive = true;
		letter.on('mouseover', function(interaction) {
			
			letter.x = Math.random() * window.innerWidth;
			letter.y = Math.random() * window.innerHeight;

			letter.activatedText = true;


		})
	})
}




function update(e) {
	let html = document.scrollingElement;
	let percentScrolled = html.scrollTop / (html.scrollHeight - html.offsetHeight);
	// console.log(percentScrolled);
	app.scrollProgress.scale.set(1, percentScrolled);

	app.letters.forEach(function(letter) {
		if (letter.activatedText === true) {
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

	})


	// change filter amt based on scroll
	// rgb.red = {x: 20 * percentScrolled, y: 10 * percentScrolled};

	// lerp position

	// for (let i = 0; i < app.letters.length; i++) {
	// 	let letter = app.letters[i];

	// 	letter.x = lerp(letter.intiPos.x, letter.endPoint.x, percentScrolled);
	// 	letter.y = lerp(letter.intiPos.y, letter.endPoint.y, percentScrolled);
	// }

	
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
		console.log("clicked")      
    });
};
hamburger.addEventListener("click", hamburgerToggle);
//materialize text in/ pull content in on load possabilitys for portfolio site
//use mousedown, touchstart for mobile
