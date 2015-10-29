var glide = glide || {};
glide.input = glide.input || [];	// array of booleans for keypresses
glide.board = glide.board || {};
glide.mathHelper = glide.mathHelper || {};
// Init math helper
var tileImage = new Image();
var jumperImage = new Image();
var numberOfImagesLoaded = 0;	// cant use resources before they have been loaded or we get an error
var tiles = new Array();		// will hold all our tiles
var background
var preload;

// screen to be used by board class and levels
// global variable since the function that calls handleImages
// takes over the 'this' for that function
var camera;

window.onload = function() {

	// find canvas and load images, wait for last image to load
	canvas = document.getElementById('game-canvas');
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas)
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
//	jumperImage.onload = handleImages;
	jumperImage.src = "img/jumper.png";
//	tileImage.onload = handleImages;
	tileImage.src = "img/qblock_strips.png";

	// Camera
	// camera based movement.
    camera = new createjs.Container();
    this.stage.addChild(camera);
	
	// corn flower blue background
//	background = new createjs.Shape();
//	background.graphics.beginFill("#6495ED").drawRect(0,0,screen_width,screen_height).endFill();
//	this.camera.addChild(background);
//	var sky = new createjs.Shape();
//	sky.graphics.beginBitmapFill(glide.loader.getTextureImage("brickWall")).drawRect(0,0,1400,3000);
//	this.camera.addChild(sky);
	glide.stage = stage;
	// Load up all images
	glide.loader = new glide.Loader(handleImages);
}

function tick(event){
    glide.board.update(event.delta);
//    glide.board.updateScreen();
}

function handleImages(){
//	var sky = new createjs.Shape();
//	sky.graphics.beginBitmapFill(glide.loader.getTextureImage("sky")).drawRect(0,0,1400,3000);
//	this.camera.addChild(sky);

	glide.board = new glide.Board(camera);
//	this.camera.addChild(layer);
	
//	glide.jumper = new glide.Jumper({x:300, y:80});
	stage.update();

//	return;

	// We want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addEventListener("tick", tick);
	// Best frame rate targeted (60 FPS)
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(30);
//	glide.mathHelper = new glide.MathHelper();

}

var lastEvent;


// set the flag for that key to false
document.onkeyup = function (e) {
	if (!e) { var e = window.event; }
	glide.input[e.keyCode] = false;
	e.returnValue = false;

	// we can press space again
    lastEvent = null;
	return false;

};

// set key in input array to true;
document.onkeydown = function (event) {
	var F5_KEY = 116;
	if (!event) { var e = window.event; }
	// prevents key from firing more than once
    if (lastEvent && lastEvent.keyCode === event.keyCode && event.keyCode === 38) {
    	// 116 is the keycode for F5
        return event.keyCode === F5_KEY;
    }
    lastEvent = event;

	glide.input[event.keyCode] = true;
	console.log(event.keyCode);
	event.returnValue = false;
	return event.keyCode === F5_KEY;
};




/*
function distance(h, b){
	var x,y, x1, y1;
	x = h.x;
	x1 = b.x;
	y = h.y;
	y1 = b.y;
	var dist = Math.floor(Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)));
	return dist;
}
*/
