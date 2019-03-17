
// mcmillandanny@gmail.com

let app = new PIXI.Application({
	view: document.getElementById("backgroundCanvas"),
	width: 1280,
	height: 720, 
	transparent: true
});

let hanselCanvas = new PIXI.Application({
	view: document.getElementById("project1"),
	width: 1280,
	height: 720, 
	transparent: true
});

let vueCanvas = new PIXI.Application({
	view: document.getElementById("project3"),
	width: 1280,
	height: 720, 
	transparent: true
});

let slimePireCanvas = new PIXI.Application({
	view: document.getElementById("project2"),
	width: 1280,
	height: 720, 
	transparent: true
});

let skCanvas = new PIXI.Application({
	view: document.getElementById("project4"),
	width: 1280,
	height: 720, 
	transparent: true
});

let rxbarCanvas = new PIXI.Application({
	view: document.getElementById("project5"),
	width: 1280,
	height: 720, 
	transparent: true
});


let zelpCanvas = new PIXI.Application({
	view: document.getElementById("project6"),
	width: 1280,
	height: 720, 
	transparent: true
});

let hipsterCanvas = new PIXI.Application({
	view: document.getElementById("project7"),
	width: 1280,
	height: 720, 
	transparent: true
});

let drumCanvas = new PIXI.Application({
	view: document.getElementById("project8"),
	width: 1280,
	height: 720, 
	transparent: true
});


let manifest = [
	{"key" : "hanselProject", "url" : "dist/img/hanselproject.jpg"},
	{"key" : "displacement", "url" : "dist/img/displacement2.png"},
	{"key" : "vueProject", "url" : "dist/img/IGDB.jpg"},
	{"key" : "slimePireProject", "url" : "dist/img/slimepire.jpg"},
	{"key" : "skProject", "url" : "dist/img/shakyknees.jpg"},
	{"key" : "rxbarProject", "url" : "dist/img/rxbar.jpg"},
	{"key" : "zelpProject", "url" : "dist/img/zelp.jpg"},
	{"key" : "nodeProject", "url" : "dist/img/nodeProject.jpg"},
	{"key" : "drumProject", "url" : "dist/img/drum.jpg"}


];



function loadAssets() {
	app.loader.add(manifest);

	app.loader.load(onAssetsLoaded);
	
}

function onAssetsLoaded(loader, resources) {

	godRayFilter();

	imageFilter();

	setupTextDecompose();



	app.ticker.add((e) => update(e));
}



	

function imageFilter() {

	let hanselProjectImg = new PIXI.Sprite(app.loader.resources.hanselProject.texture);
	hanselCanvas.stage.addChild(hanselProjectImg);

	
	let vueProject = new PIXI.Sprite(app.loader.resources. vueProject.texture);
	vueCanvas.stage.addChild(vueProject);

	let slimePireProject = new PIXI.Sprite(app.loader.resources.slimePireProject.texture);
	slimePireCanvas.stage.addChild(slimePireProject);

	let skProject = new PIXI.Sprite(app.loader.resources.skProject.texture);
	skCanvas.stage.addChild(skProject);

	let rxbarProject = new PIXI.Sprite(app.loader.resources.rxbarProject.texture);
	rxbarCanvas.stage.addChild(rxbarProject);
	
	let zelpProject = new PIXI.Sprite(app.loader.resources.zelpProject.texture);
	zelpCanvas.stage.addChild(zelpProject);

	let nodeProjectImg = new PIXI.Sprite(app.loader.resources.nodeProject.texture);
	hipsterCanvas.stage.addChild(nodeProjectImg);

	let drumProjectImg = new PIXI.Sprite(app.loader.resources.drumProject.texture);
	drumCanvas.stage.addChild(drumProjectImg);


	let displace = new PIXI.Sprite(app.loader.resources.displacement.texture);
	
	
	
	
	// let displaceFilter = new PIXI.filters.DisplacementFilter(displace);
	// displaceFilter.scale.set(0);
	// hanselCanvas.stage.filters = [displaceFilter];
	
	let blurFilter = new PIXI.filters.BlurFilter(displace);
	blurFilter.blur = 0;
	slimePireCanvas.stage.filters = [blurFilter];

	let blurFilterHansel = new PIXI.filters.BlurFilter(displace);
	blurFilterHansel.blur = 0;
	hanselCanvas.stage.filters = [blurFilterHansel];


	let blurFilterVue = new PIXI.filters.BlurFilter(displace);
	blurFilterVue.blur = 0;
	vueCanvas.stage.filters = [blurFilterVue];

	let blurFilterSk = new PIXI.filters.BlurFilter(displace);
	blurFilterSk.blur = 0;
	skCanvas.stage.filters = [blurFilterSk];
	
	let blurFilterRx = new PIXI.filters.BlurFilter(displace);
	blurFilterRx.blur = 0;
	rxbarCanvas.stage.filters = [blurFilterRx];
	
	let blurFilterZelp = new PIXI.filters.BlurFilter(displace);
	blurFilterZelp.blur = 0;
	zelpCanvas.stage.filters = [blurFilterZelp];

	let blurFilterNode = new PIXI.filters.BlurFilter(displace);
	blurFilterNode.blur = 0;
	hipsterCanvas.stage.filters = [blurFilterNode];

	let blurFilterDrum = new PIXI.filters.BlurFilter(displace);
	blurFilterDrum.blur = 0;
	drumCanvas.stage.filters = [blurFilterDrum];
	


	hanselCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterHansel, 1, {
			blur: 40,
		}, 
		{	
			blur: 0,
			ease: Elastic.easeOut,
		});

	});


	slimePireCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilter, 2, {
			blur: 40, 
		}, 
		{	blur: 0, 
			ease: Elastic.easeOut,
		});

	});


	vueCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterVue, 1, {
			blur: 40,
		}, 
		{	
			blur: 0,
			ease: Elastic.easeOut,
		});

	});

	skCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterSk, 2, {
			blur: 40, 
		}, 
		{	blur: 0, 
			ease: Elastic.easeOut,
		});

	});

	rxbarCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterRx, 1, {
			blur: 40,
		}, 
		{	
			blur: 0,
			ease: Elastic.easeOut,
		});

	});

	zelpCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterZelp, 2, {
			blur: 40, 
		}, 
		{	blur: 0, 
			ease: Elastic.easeOut,
		});

	});

	hipsterCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterNode, 1, {
			blur: 40,
		}, 
		{	
			blur: 0,
			ease: Elastic.easeOut,
		});

	});

	drumCanvas.view.addEventListener("mouseover", function(){
		TweenMax.fromTo(blurFilterDrum, 2, {
			blur: 40, 
		}, 
		{	blur: 0, 
			ease: Elastic.easeOut,
		});

	});


}
	



let godRay = new PIXI.filters.GodrayFilter()
let bgImage = new PIXI.Graphics();
var renderer = new PIXI.autoDetectRenderer();

godRay.lacunarity = 4;

function godRayFilter() {

	bgImage.beginFill(0X4f6d7a);
	bgImage.drawRect(0, 0, 3000, 3000);
	bgImage.endFill();	
	app.stage.addChild(bgImage)

	bgImage.filters = [godRay];
	
	
	window.addEventListener("mousemove", (e) => {

		let mouseXcord = e.x - 500;
		godRay.angle = mouseXcord * 0.01;
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

	const styleTagLine = new PIXI.TextStyle({
		fill: "#c3771c",
		fontFamily: "\"Lucida Console\", Monaco, monospace",
		fontSize: 50,
		fontVariant: "small-caps",
		fontWeight: "bold",
	});

	const styleEmail = new PIXI.TextStyle({
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
	}

	app.email.endPos = {
		x : 5000,
		y : 0
	}

	app.tagLine.pos = {
		x : 400,
		y : 300
	}

	app.tagLine.style.opacity = "0"

	app.tagLine.endPos = {
		x : -5000,
		y : -0
	}

	console.log(app.tagLine);



	let fadeTextIn = new TimelineMax({delay: 1});

	fadeTextIn.from(app.tagLine, 1, {
		alpha: 0
	})

	fadeTextIn.from(app.email, 1, {
		alpha: 0
	})

	

	

	app.tagLine.x = app.tagLine.pos.x;
	app.tagLine.y = app.tagLine.pos.y;

	app.email.x = app.email.pos.x;
	app.email.y = app.email.pos.y;



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

	let kerning = [
		0,0,0,0,0,0,0,0,0,-5,-12,-15,-15
	]


	app.letters.forEach(function(letter, i) {

		letter.velocity = {
			x: (Math.random() * 10) - 5,
			y: (Math.random() * 10) - 5
		}

		letter.initPos = {
			x : 330 + 50 * i + kerning[i],
			y : 220
		}

		letter.endPoint = {
			x: 500, 
			y: -2000
		}

		

		letter.x = letter.initPos.x;
		letter.y = letter.initPos.y;

		letter.activatedText = false;
		app.stage.addChild(letter);
		letter.interactive = true;
		letter.tweening = true;


		if (letter.tweening === true) {

			TweenMax.fromTo(letter, 1.2, 
			{
				y: Math.random() * window.innerHeight,
				ease: Power2.easeIn,
			}, 
			{
				y: letter.initPos.y,
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
			}	
			else {
				letter.x = lerp(letter.initPos.x, letter.endPoint.x, percentScrolled);
				letter.y = lerp(letter.initPos.y, letter.endPoint.y, percentScrolled);
				
			}

				app.tagLine.x = lerp(app.tagLine.pos.x, app.tagLine.endPos.x, percentScrolled);
				app.tagLine.y =lerp(app.tagLine.pos.y, app.tagLine.endPos.y, percentScrolled);

				app.email.x = lerp(app.email.pos.x, app.email.endPos.x, percentScrolled);
				app.email.y =lerp(app.email.pos.y, app.email.endPos.y, percentScrolled);
	})


	godRay.time += .001;

}

function lerp(start, end, t) {
	return (1 - t) * start + t * end;
}

window.onload = function() {

	loadAssets();
}


const lines = document.querySelectorAll('.lines');
let shaderBlock1 = document.querySelector(".shader-block1");
let shaderBlock2 = document.querySelector(".shader-block2");

let width = Math.ceil(Math.random() * 1000);
let height = Math.ceil(Math.random() * 1000);


let slideOutTextP1 = document.querySelector('.slide-out-text');
let slideOutTextP2 = document.querySelector('.slide-out-text2');
let slideOutTextP3 = document.querySelector('.slide-out-text3');
let slideOutTextP4 = document.querySelector('.slide-out-text4');
let slideOutTextP5 = document.querySelector('.slide-out-text5');
let slideOutTextP6 = document.querySelector('.slide-out-text6');
let slideOutTextP7 = document.querySelector('.slide-out-text7');
let slideOutTextP8 = document.querySelector('.slide-out-text8');


//waypoints

var waypoint = new Waypoint({
	element: slideOutTextP1,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP1, .3, {
				left: '5%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP1, .3, {
				left: '50%'
			})
		}
	}
  })

  var waypoint2 = new Waypoint({
	element: slideOutTextP2,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP2, .3, {
				left: '55%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP2, .3, {
				left: '5%'
			})
		}
	}
  })

  var waypoint3 = new Waypoint({
	element: slideOutTextP3,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP3, .3, {
				left: '5%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP3, .3, {
				left: '50%'
			})
		}
	}
  })

  var waypoint4 = new Waypoint({
	element: slideOutTextP4,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP4, .3, {
				left: '55%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP4, .3, {
				left: '4%'
			})
		}
	}
  })

  var waypoint5 = new Waypoint({
	element: slideOutTextP5,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP5, .3, {
				left: '5%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP5, .3, {
				left: '55%'
			})
		}
	}
  })

  var waypoint6 = new Waypoint({
	element: slideOutTextP6,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP6, .3, {
				left: '55%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP6, .3, {
				left: '5%'
			})
		}
	}
  })

  var waypoint7 = new Waypoint({
	element: slideOutTextP7,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP7, .3, {
				left: '5%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP7, .3, {
				left: '55%'
			})
		}
	}
  })


  var waypoint8 = new Waypoint({
	element: slideOutTextP8,
	offset: "50%",
	handler: function(direction) {
		if (direction === 'down') {
			TweenMax.to(slideOutTextP8, .3, {
				left: '55%'
			})
		}
		else if (direction === "up") {
			TweenMax.to(slideOutTextP8, .3, {
				left: '5%'
			})
		}
	}
  })

