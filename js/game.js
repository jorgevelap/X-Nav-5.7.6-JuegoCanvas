// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";


// princess image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var p = 1;
var q = 1;

var p= localStorage.getItem("princessesCaught");
if(p==null){
	p=0;
}


var q= localStorage.getItem("numberStones");
if(q==null){
	q=1;
}

var r= localStorage.getItem("tenlevels");
if(r==null){
	r=0;
}


var princess = {};
var princessesCaught = p;

var tenlevels=r;
var numelements=q;

var stonex=[];
var stoney=[];

var stone = {};
var monster = {};
var monster2 = {};
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;


	monster.x=32 + (Math.random() * (canvas.width - 64));
	monster.y=32 + (Math.random() * (canvas.width - 64));
	if(monster.x<35){
		monster.x=35;
	}else if(monster.x>canvas.width-70){
		monster.x=canvas.width-70;
	}

	if(monster.y<35){
		monster.y=35;
	}else if(monster.y>canvas.height-70){
		monster.y=canvas.height-70;
	}

	monster2.x=32 + (Math.random() * (canvas.width - 64));
	monster2.y=32 + (Math.random() * (canvas.width - 64));

	if(monster2.x<35){
		monster2.x=35;
	}else if(monster2.x>canvas.width-70){
		monster2.x=canvas.width-70;
	}

	if(monster2.y<35){
		monster2.y=35;
	}else if(monster2.y>canvas.height-70){
		monster2.y=canvas.height-70;
	}


	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 64));
	princess.y = 32 + (Math.random() * (canvas.height - 64));



	if(princess.x<35){
		princess.x=35;
	}else if(princess.x>canvas.width-70){
		princess.x=canvas.width-70;
	}

	if(princess.y<35){
		princess.y=35;
	}else if(princess.y>canvas.height-70){
		princess.y=canvas.height-70;
	}



	var bucle;
	for(bucle=0;bucle<numelements;bucle++){
		stone.x=32 + (Math.random() * (canvas.width - 64));
		stone.y=32 + (Math.random() * (canvas.width - 64));
		if(stone.x<35){
			stone.x=35;
		}else if(stone.x>canvas.width-70){
			stone.x=canvas.width-70;
		}
		if(stone.y<35){
			stone.y=35;
		}else if(stone.y>canvas.height-70){
			stone.y=canvas.height-70;
		}	

	 	stonex[bucle]=(stone.x);
		stoney[bucle]=(stone.y);
	}	


	var buclePrincess;

	for (buclePrincess=0;buclePrincess<numelements;buclePrincess++){
		if( Math.abs(princess.x-stonex[buclePrincess])<16 &   Math.abs(princess.x-stonex[buclePrincess])<16){
			princess.x = 32 + (Math.random() * (canvas.width - 64));
			princess.y = 32 + (Math.random() * (canvas.height - 64));

			if(princess.x<35){
				princess.x=35;
			}else if(princess.x>canvas.width-70){
				princess.x=canvas.width-70;
			}

			if(princess.y<35){
				princess.y=35;
			}else if(princess.y>canvas.height-70){
				princess.y=canvas.height-70;
			}
			buclePrincess=0;
		}
	}


};

// Update game objects
var update = function (modifier) {
	if(q==1){
		monster2.y +=hero.speed/5 * modifier;
		if(monster2.y > canvas.height-70){
			q=0;
		}
	}else{
		monster2.y -=hero.speed/5*modifier;
		if(monster2.y < 35){
			q=1;
		}
	}


	if(p==1){
		monster.x +=hero.speed/5 * modifier;
		if(monster.x > canvas.width-70){
			p=0;
		}
	}else{
		monster.x -=hero.speed/5*modifier;
		if(monster.x < 35){
			p=1;
		}
	}

	if (38 in keysDown) { // Player holding up

		var x2=1;
		var b2;
		for(b2=0;b2<numelements;b2++){
			if (hero.y <=stoney[b2] + 25 && hero.x<=stonex[b2]+25 && hero.x>=stonex[b2]-25 && hero.y>=stoney[b2]+10) {
				x2=0;
			}
		}

		if(hero.y>35){
			hero.y -= hero.speed * modifier *x2;
		}
	}
	if (40 in keysDown) { // Player holding down
		var x1=1;
		var b1;
		for(b1=0;b1<numelements;b1++){
			if (hero.x<=stonex[b1]+25  && hero.y >=stoney[b1] - 25 && hero.x>=stonex[b1]-25 && hero.y<=stoney[b1]-10) {
				x1=0;
			}
		}

		if(hero.y<canvas.height-70){
			hero.y += hero.speed * modifier *x1;
		}
	}
	if (37 in keysDown) { // Player holding left..hero.x <= (stone.x + 32) && stone.x <= (hero.x + 32) && hero.y <= (stone.y + 32) && stone.y <= (hero.y + 32)
	var x=1;
	var b;
		for(b=0;b<numelements;b++){
			if (hero.x <= (stonex[b] + 25)  && hero.y <= (stoney[b] + 25) && stoney[b] <= (hero.y + 25) && hero.x >= stonex[b]+10) {
				x=0;
			}
		}
		if(hero.x>35){
			hero.x -= hero.speed * modifier *x;
		}
	}
	if (39 in keysDown) { // Player holding right


		var x3=1;
		var b3;
		for(b3=0;b3<numelements;b3++){
			if (hero.x >= stonex[b3]-25 && hero.y>stoney[b3]-25 && hero.y<stoney[b3]+25 && hero.x <= stonex[b3]-10) {
				x3=0;
			}
		}
		if(hero.x<canvas.width-70){
			hero.x += hero.speed * modifier *x3;
		}	
	}

	if (
		hero.x <= (monster.x + 16)
		&& monster.x <= (hero.x + 16)
		&& hero.y <= (monster.y + 16)
		&& monster.y <= (hero.y + 32)
	) {
		reset();
	}

	if (
		hero.x <= (monster2.x + 16)
		&& monster2.x <= (hero.x + 16)
		&& hero.y <= (monster2.y + 16)
		&& monster2.y <= (hero.y + 32)
	) {
		reset();
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		++tenlevels;
		// Store
		localStorage.setItem("princessesCaught", princessesCaught);
		localStorage.setItem("tenlevels", tenlevels);
		if(tenlevels == 10){
			++numelements;
			localStorage.setItem("numberStones", numelements);
			tenlevels=0;
		}
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
	}

	if (stoneReady) {
		for(bucle=0;bucle<numelements;bucle++){
			ctx.drawImage(stoneImage,stonex[bucle], stoney[bucle]);
		}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
