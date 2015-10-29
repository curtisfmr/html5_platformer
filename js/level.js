var glide = glide || {};

var TILEWIDTH = 70;
var TILEHEIGHT = 70;

// must be mapped
var nonColliableMapping = "abcdefghijklmnop";
var colliableMapping = "ABCDEFGHIJKLMNOP";

var mushroomMapping = "QRSTUV";
//var specialItems = "wxyzWXYZ";
var floatingPlatformMapping = "_=wxyz";

// these tiles shall be drawn on top of enemies and player
// to be used for like water
var drawOnTopMapping = "qrstuv";

// cant be mapped
var candyMapping = "WXYZ|";
// cant be mapped
var specialBlockMapping = "!@#$%^&*()";
// cant be mapped
var enemyMapping = "0123456789";
// cant be mapped
var obstacleMapping = ",./;'[]";
// cant be mapped
var portalMapping = "<{+";
var respawnMapping = ">}-";

glide.Level = (function(){
	function Level(map, mapping, camera, sublevel){
		this.parent = null;
		// prevents updating before game loads
		this.ready = false;
		this.map =  map;
		this.mapping = mapping;
		// the position to start the jumper
		this.jumperPosition = {};
		// empty out board

		// testing begin
/*
		this.map = level1;
		this.mapping = {
			"A":"grassCenter",
			"B":"exitSign",
			"H":"grassCenter",
			"I":"grassMid",
			"J":"boxAlt",
			"K":"brickWall",

		}
*/
		// map camera
		this.camera = camera;
		// used for when warping back to original level.
		this.respawnLocation = {"x":0, "y":0};
//	console.log(camera.addChild);

//		console.log(camera);


		// testing end
		this.sublevels = [];
		// if sublevels exist
		if(sublevel){
//				console.log(sublevel);
			// push each sublevel into this list
			for(var index in sublevel){
				var level = sublevel[index];
				console.log(level);
				this.sublevels[index] = new glide.Level(level["level"], level["mapping"], this.camera);
//				console.log(level.level);
//				console.log(level.mapping);
			}
		}



	}
	var p = Level.prototype;

	p.setParent = function(parent){
		this.parent = parent;
	}

	p.cleanBoard = function(){
		this.ready = false;
		this.isInsideSubLevel = false;
		this.respawnPoints = {};	// associative array
		this.respawnLocation = {};
		this.currentSubLevel = null;
		this.candies = [];
		this.tiles = [];	// array
		this.blocks = [];	// holds all blocks in the level
		this.enemies = [];	// holds all enemies
		this.mushrooms = []; // holds all mushrooms
		this.coins = [];
		this.springs = [];
		this.fences = [];
		this.obstacles = [];
		this.warpZones = [];
		this.specialAttacks = [];	// holds special attacks like fireballs

		// game objects.
		this.gameObjects = [];

		if(this.tilesLayer !== undefined){
			this.tilesLayer.removeAllChildren();
			this.drawLast.removeAllChildren();
		}
		this.tilesLayer = new createjs.Container();
		this.drawLast = new createjs.Container();
		// clear camera. may work
		// doesnt work
//		this.camera = new createjs.Container();

		// this instead
		this.camera.removeAllChildren();
		this.exit = new glide.Tile(glide.loader.getTextureImage("exitSign"),{"x":0,"y":0}, false);
	}

	// just
	p.resumeGame = function(){
		console.log("Resuming level");
		// clear board
		this.camera.removeAllChildren();

		this.isInsideSubLevel = false;
		this.currentSubLevel = null;

		// move jumper roader
		glide.jumper.x = this.respawnLocation.x;
		// -28 to plant feet on ground
		glide.jumper.y = this.respawnLocation.y - 28;

    	//shift camera up a bit
    	this.camera.x = -glide.jumper.x + 420;// need this to align with dude
    	this.camera.y = -(glide.jumper.y - 300);
    	console.log(glide.jumper.x);
    	console.log(this.camera.x);
		this.camera.addChild(this.getTilesLayer());
		this.camera.addChild(glide.jumper);
		// add priority tiles now
		// remove these tiles
		this.camera.removeChild(this.drawLast);
		// and place back on top
		this.camera.addChild(this.drawLast);
		// HUD display
		// start game

		this.HUD = new createjs.Text("Hello World", "40px Arial", "#cccccc"); 
		this.HUD.x = glide.jumper.x - 400;
		this.HUD.y = (glide.jumper.y - 300);
		this.camera.addChild(this.HUD);

	}

	p.getSizeOfStage = function(){
		var width = -1;
		var height = this.map.length * TILEHEIGHT;
		// loop through map and find row with longest width
		for(var y = (this.map.length - 1); y >= 0; y--){
			var brokenLevel = this.map[y].split("");
			width = Math.max(width, brokenLevel.length);
		}
		width = width * TILEWIDTH;

		return {"width":width, "height":height};
	}

	p.setBackground = function(){
		// check if user specified background
		var background = this.mapping["background"];

		var dimens = this.getSizeOfStage();
		this.dimens = dimens;
		if(background !== undefined){
//			console.log(background);
			// check if background is of tile type
			if(background === "castle"){

			}else if(background === "sky"){

			}else{
				var clip = (this.mapping["clip-background"]==="yes"); 
				if(clip){
					var backgroundImg = new createjs.Shape();
					backgroundImg.graphics.beginBitmapFill(glide.loader.getTextureImage(background))
							.drawRect(0, 0, dimens.width, dimens.height);
					this.tilesLayer.addChild(backgroundImg);
					return;
				}else{
					// assume they chose a huge background image
					var backgroundImg = new createjs.Shape();
					var image = glide.loader.getTextureImage(background);
					backgroundImg.graphics.beginBitmapFill(image)
							.drawRect(0, 0, dimens.width, image.height);
					this.tilesLayer.addChild(backgroundImg);
					return;
//					console.log(this.getSizeOfStage());
				}
			}
		}
	}

	p.startGame = function(){
		this.cleanBoard();
		this.setBackground();
		this.createBoardFromFile();

//Testing begin to find 0, 0 to know how to load background

		// move jumper roader
//		glide.jumper.x =0;
		// -28 to plant feet on ground
//		glide.jumper.y = 0;

// testing end

    	//shift camera up a bit
    	this.camera.x = -glide.jumper.x + 420;// need this to align with dude
    	this.camera.y = -(glide.jumper.y - 300);
    	console.log(glide.jumper.x);
    	console.log(this.camera.x);
		this.camera.addChild(this.getTilesLayer());
		/*	Testing - no dice. still lags on big map.
	    	var layer = currentLevel.getTilesLayer();
	    	layer.visible = false;
			this.camera.addChild(layer);
		*/
		this.camera.addChild(glide.jumper);
//		console.log("jumper: " + glide.jumper.x + ", " + glide.jumper.y);
//		console.log("camera: " + this.camera.x + ", " + this.camera.y);
		// HUD display
		// start game
		// add priority tiles now
		this.camera.addChild(this.drawLast);

		this.HUD = new createjs.Text("Hello World", "40px Arial", "#cccccc"); 
		this.HUD.x = glide.jumper.x - 400;
		this.HUD.y = (glide.jumper.y - 300);
		this.camera.addChild(this.HUD);
		this.ready = true;
	}

	p.getTilesLayer = function(){
		return this.tilesLayer;
	}
	
	p.getTiles = function(){
		return this.tiles;
	}
	p.kaka = 0;
	p.WhereCanIGetTo = function(oldPosition, Position, Bounds){
		if(this.kaka > 3){
//			console.log("kaka is: "+this.kaka);
//			return oldPosition;
		}

		// if we are in sublevel do nothing
		if(this.isInsideSubLevel){

			return this.currentSubLevel.WhereCanIGetTo(oldPosition, Position, Bounds);
		}

		oldPosition = oldPosition || {};
		Position = Position || {};
		Bounds = Bounds || {};
		var furthestPosition = {x:0,y:0};
		furthestPosition.x = oldPosition.x;
		furthestPosition.y = oldPosition.y;
		
		var movementToTry = {x:0,y:0};
		movementToTry.x = Position.x - oldPosition.x;
		movementToTry.y = Position.y - oldPosition.y;
		var numberOfSteps = (this.getLength(movementToTry) * 2) + 1;
		var singleStep = {x:0, y:0};
		// number of steps to break movement in to.
		singleStep.x = movementToTry.x / numberOfSteps;
		singleStep.y = movementToTry.y / numberOfSteps;

		// 
		// move as close as we can
		for(var i = 0; i < numberOfSteps; i++){
			var moveToTry = {x:0,y:0};
			moveToTry.x = oldPosition.x + singleStep.x * i;
			moveToTry.y = oldPosition.y + singleStep.y * i;
			// no collision happened
			var rect = this.createBoundingRect(moveToTry.x, moveToTry.y, Bounds);
			if(this.collideWithTiles(rect) === false){
				furthestPosition.x = moveToTry.x;
				furthestPosition.y = moveToTry.y;
			}else{
				// if is diagonal move
				if(movementToTry.x !== 0 && movementToTry.y !== 0){
					// remove the remaining steps
					var remainingSteps = numberOfSteps - (i - 1);
					var move = this.checkDiagonalMovement(furthestPosition, Bounds,
							remainingSteps, singleStep);
					furthestPosition.x = move.x;
					furthestPosition.y = move.y;
				}
				break;
			}
		}
		// update rect with furthest position
		// return furthest movement
		return {x:furthestPosition.x,y:furthestPosition.y};
	}
	p.createBoundingRect = function(x,y,baseRect){
		baseRect = baseRect || {};
		var rect = {x:x,y:y,width:baseRect.width, height:baseRect.height};
		return rect;
	}
	
	p.checkDiagonalMovement = function(furthestPosition, Bounds, remainingSteps, singleStep){
		furthestPosition = furthestPosition || {};
		Bounds = Bounds || {};
		singleStep = singleStep || {};
		// try x movement
		var horizontalMovement = {x:0,y:0};
		horizontalMovement.x = singleStep.x * remainingSteps;
		// add the current position to horizontal movement
		horizontalMovement.x += furthestPosition.x;
		horizontalMovement.y += furthestPosition.y;
		this.kaka++;
		var hrMove = this.WhereCanIGetTo(furthestPosition, horizontalMovement, Bounds);
		var verticalMovement = {x:0,y:0};
		verticalMovement.y = singleStep.y * remainingSteps;
		// add the current position to horizontal movement
		verticalMovement.x += hrMove.x;
		verticalMovement.y += hrMove.y;
		this.kaka++;
		var vrMove = this.WhereCanIGetTo(hrMove, verticalMovement, Bounds);
		// try y movement
		
//		var move = {x:Math.max(vrMove.x, hrMove.x), y:Math.max(vrMove, hrMove.y)};
		
		return vrMove;
	}
	
	p.getLength = function(vector){
		vector = vector || {};
		var a = Math.pow(vector.x, 2);
		var b = Math.pow(vector.y, 2);
		return Math.sqrt(a+b);
	}
	
	p.collideWithTiles = function(rect){
		// if we are in sublevel call right function
		if(this.isInsideSubLevel){
			return this.currentSubLevel.collideWithTiles(rect);
//			console.log("leaving sub level");
		}

		// search all tiles first for collision
		for(var i = 0; i < this.tiles.length;i++){
			// to prevent crashing for when we delete them
			if(!this.tiles[i]){
				continue;
			}
			if((this.tiles[i].distance(rect) < 150)&&this.intersectRect2(rect, this.tiles[i].getCollisionRect())){
				return true;
			}
		}
		// then search all blocks remaining
		for(var i = 0; i < this.blocks.length;i++){
			if((this.blocks[i].distance(rect) < 150)&&this.intersectRect2(rect, this.blocks[i].getCollisionRect())){
				return true;
			}
		}
		// then search all obstacles 
		for(var i = 0; i < this.obstacles.length;i++){
			if((this.obstacles[i].distance(rect) < 150)&&this.intersectRect2(rect, this.obstacles[i].getCollisionRect())){
				return true;
			}
		}
		return false;
	}

	p.collideWithTiles2 = function(rect){
		// pos
		var pos = {x:rect.x, y:rect.y};
		// search all tiles first for collision
		for(var i = 0; i < this.tiles.length;i++){
			// to prevent crashing for when we delete them
			var tile = this.tiles[i];
			if((tile.distance(rect) < 98)&&(this.intersectRect2(rect, tile.getRect()))){
				return true;
			}
		}return false;
		// then search all blocks remaining
		for(var i = 0; i < this.blocks.length;i++){
			var block = this.blocks[i];
			if((block.distance(pos) < 98)&&(this.intersectRect2(rect, block.getRect()))){
				return true;
			}
		}
		return false;
	}



	// check to see if jumper broke any blocks
	p.testHitBlocks = function(jumper){

		// if we are in sublevel wake up parent
		if(this.isInsideSubLevel){
			return this.currentSubLevel.testHitBlocks(jumper);
//			console.log("leaving sub level");
		}


		var rect =  jumper.getCollisionRect();
		var result = false;
		// then search all blocks remaining
		for(var i = 0; i < this.blocks.length;i++){
			if((this.blocks[i].isCollidable)&&
					(this.intersectRect2(rect, this.blocks[i].getHitRect()))){
				this.blocks[i].handleHit(jumper);
				result = true;
				console.log("collision");
//				jump.movementVector.y = 0;
				break;
			}
		}
		this.destroyBlocks();
		return result;
	}

	p.destroyBlocks = function(){
		// index of block to destroy.
		// dont wanna destroy it in the while loop
		var index = -1;
		for(var i = 0; i < this.blocks.length;i++){
			if(this.blocks[i].isAlive === false){
				index = i;
				break;
			}
		}

		if(index !== -1){
			var block = this.blocks[index];
			// remove block from layer
			this.tilesLayer.removeChild(block);
			this.blocks.splice(index, 1);
		}
	}

	p.intersectRect2 = function(r1, r2) {
		return (r1.x <= r2.width  + r2.x&&
          r2.x <= r1.width + r1.x &&
          r1.y <= r2.height + r2.y &&
          r2.y <= r1.height + r1.y)
	}
	p.createBoardFromFile = function(){
		for(var i = 0, y = (this.map.length - 1); y >= 0; y--, i++){
			var brokenLevel = this.map[y].split("");
			for(var x = 0; x < brokenLevel.length; x++){
				piece = brokenLevel[x];

				// the position will similar for most game items
				var posX = x * TILEWIDTH;
				var posY = (y * TILEHEIGHT);

				// handle if piece is a non colliable
				// set display properties:
				// we will handle colliables and non colliables here
				// since they are very similar
				if((nonColliableMapping.indexOf(piece) > -1)||
					(colliableMapping.indexOf(piece) > -1)){

					var collide = (nonColliableMapping.indexOf(piece) > -1) ? false : true;

					// clone the original tile, so we don't need to set shared properties:
					var block = new glide.Tile(glide.loader.getTextureImage(this.mapping[piece]),{"x":posX,"y":posY}, collide);
					
					// add to the display list:
					// add this to the colliables only if it collides
					// this.tiles holds all colliable tiles
					if(collide){
						this.tiles.push(block);
					}
					this.tilesLayer.addChild(block);
				}
				// handle blocks that should be drawn last
				else if(drawOnTopMapping.indexOf(piece) > -1){
					// clone the original tile, so we don't need to set shared properties:
					var block = new glide.Tile(glide.loader.getTextureImage(this.mapping[piece]),{"x":posX,"y":posY}, false);
					
					// add to the display list:
					this.drawLast.addChild(block);
				}
				// handle blocks
				else if(specialBlockMapping.indexOf(piece) > -1){
//					console.log("A special block made");

					// determine which block to make
					// declare block so it exists outside of if statements
					var block = null;
					if(piece === "!"){
						block = new glide.CoinBlock({"x":posX,"y":posY});					
					}else if(piece === "@"){
						block = new glide.PowerBlock({"x":posX,"y":posY});					
					}else if(piece === "#"){
						block = new glide.BreakableBrick({"x":posX,"y":posY});					
					}else if(piece === "$"){
						block = new glide.CoinBrick({"x":posX,"y":posY});					
					}

					// add to the display list:
					// add to blocks array
					if(block !== null){
						this.blocks.push(block);
						this.tilesLayer.addChild(block);
					}
				}
				// handle enemies
				else if(enemyMapping.indexOf(piece) > -1){
//					console.log("An enemy made");

					// clone the original tile, so we don't need to set shared properties:

					// determine which enemy to make
					// declare enemy so it exists outside of if statements
					var enemy = null;
					if(piece === "2"){
						posY = (y * TILEHEIGHT);
						// clone the original tile, so we don't need to set shared properties:
						enemy = new glide.Worm({"x":posX,"y":posY});				
					// test
							
					}else if(piece === "1"){
						posY = (y * TILEHEIGHT);
						// clone the original tile, so we don't need to set shared properties:
						enemy = new glide.Snail({"x":posX,"y":posY});					
					}else if(piece === "3"){
						posY = (y * TILEHEIGHT);
						// clone the original tile, so we don't need to set shared properties:
						enemy = new glide.Bee({"x":posX,"y":posY});				
					}

					// add to the display list:
					// add to enemies array
					if(enemy !== null){
						this.enemies.push(enemy);
						this.tilesLayer.addChild(enemy);
					}
				}
				// handle obstacles
				else if(obstacleMapping.indexOf(piece) > -1){
//					console.log("An enemy made");

					// clone the original tile, so we don't need to set shared properties:

					// determine which enemy to make
					// declare obstacle so it exists outside of if statements
					var obstacle = null;
					if(piece === ","){
						obstacle = new glide.Spikes({"x":posX,"y":posY}, "bottom");					
					}else if(piece === "."){
						obstacle = new glide.Spring({"x":posX,"y":posY}, "bottom");					
					}
					// add to the display list:
					// add to obstacles array
					if(obstacle !== null){
						this.obstacles.push(obstacle);
						this.tilesLayer.addChild(obstacle);
					}
				}
				// handle mushroom tiles
				else if(mushroomMapping.indexOf(piece) > -1){

					// clone the original tile, so we don't need to set shared properties:

					// declare mushroom so it exists outside of if statements
					var mushroom = new glide.MushroomTop({"x":posX,"y":posY}, this.mapping[piece]);					
					// add to the display list:
					if(mushroom !== undefined){
						this.tilesLayer.addChild(mushroom);
					}
					this.tiles.push(mushroom);
				}
				// handle floating platforms tiles
				else if(floatingPlatformMapping.indexOf(piece) > -1){

					// clone the original tile, so we don't need to set shared properties:

					// declare mushroom so it exists outside of if statements
					var mushroom = new glide.FloatingPlatform({"x":posX,"y":posY}, this.mapping[piece]);					
					// add to the display list:
					if(mushroom !== undefined){
						this.tilesLayer.addChild(mushroom);
					}
					this.tiles.push(mushroom);
				}
				// handle floating platforms tiles
				else if(candyMapping.indexOf(piece) > -1){
//var candyMapping = "WXYZ*";

					// clone the original tile, so we don't need to set shared properties:

					// candy mushroom so it exists outside of if statements
					var candy = null;
					if(piece === "W"){
						candy = new glide.GroundCandy({"x":posX,"y":posY}, this.mapping[piece]);					
					}else if(piece === "X"){
						candy = new glide.CherryCandy({"x":posX,"y":posY}, this.mapping[piece]);					
					}else if(piece === "Y"){
						candy = new glide.WafferCandy({"x":posX,"y":posY}, this.mapping[piece]);					
					}else if(piece === "Z"){
						candy = new glide.CookieCandy({"x":posX,"y":posY}, this.mapping[piece]);					
					}else if(piece === "|"){
						console.log("made cupcake!");
						candy = new glide.CupCakeCandy({"x":posX,"y":posY}, this.mapping[piece]);					
					}
					// add to the display list:
					if(candy !== undefined){
						this.tilesLayer.addChild(candy);
					}
					this.candies.push(candy);
				}
				// handle portals
				else if(portalMapping.indexOf(piece) > -1){
					// create two noncolliable tiles
					// one for the door, and the top of the door.
					// position top above the base
					var doorTop = new glide.Tile(glide.loader.getTextureImage("doorOpenTop"),{"x":posX,"y":posY-70}, false);
					var doorBottom = new glide.Tile(glide.loader.getTextureImage("doorOpen"),{"x":posX,"y":posY}, false);
					
					// to be used later to determine which respawn point to use
					doorBottom.spawnValue = piece;

					// add to the display list:
					this.tilesLayer.addChild(doorTop);						
					this.tilesLayer.addChild(doorBottom);

					this.warpZones.push(doorBottom)
				}
				// handle respawn points
				else if(respawnMapping.indexOf(piece) > -1){
					this.respawnPoints[piece] = {"x":posX, "y":posY};
				}
				else if(piece === "~"){
					glide.jumper = glide.jumper || new glide.Jumper({x:0, y:0});
//					console.log("coolA!'");
					// set display properties: - jumper is different
					var posX = x * TILEWIDTH;
					var posY = (TILEHEIGHT-98) + (y * TILEHEIGHT);

					// clone the original tile, so we don't need to set shared properties:
					glide.jumper.x = posX;
					glide.jumper.y = posY;

					// set respawn location to default at the spawn location
					this.respawnLocation.x = glide.jumper.x;
					this.respawnLocation.y = glide.jumper.y;
				}
				if(piece === "`"){

					// clone the original tile, so we don't need to set shared properties:
					this.exit.x = posX;
					this.exit.y = posY;
					this.tilesLayer.addChild(this.exit);	
				}
			}
		}
	}


	p.hitEnemies = function(){
		// if we are in sublevel call right function
		if(this.isInsideSubLevel){
			this.currentSubLevel.hitEnemies();
//			console.log("leaving sub level");
			return;
		}
		for(var i = 0; i < 	this.enemies.length; i++){
			var enemy =  this.enemies[i];
			var rect = glide.jumper.getCollisionRect();
			if((enemy.isAlive)&&
				(enemy.distance(rect) < 150) &&
				(this.intersectRect2(rect, enemy.getCollisionRect()))){

			 	if(glide.jumper.state === FALLING){
			 		console.log("cool");
			 		glide.jumper.bounce();
			 		enemy.kill();
			 	}else if(glide.jumper.isCollidable){
			 		glide.jumper.hit();
			 	}
			 	break;
			}
		}
	}

	p.removeDeadEnemies = function(){
		// index of mushrrom to destroy.
		// dont wanna destroy it in the for loop
		var index = -1;
		for(var i = 0; i < this.enemies.length;i++){
			if(this.enemies[i].isAlive === false){
				index = i;
				break;
			}
		}

		if(index !== -1){
			var enemy = this.enemies[index];
			// remove block from layer
			this.tilesLayer.removeChild(enemy);
			this.enemies.splice(index, 1);
		}
	}

	p.removeCandies = function(){
		// index of mushrrom to destroy.
		// dont wanna destroy it in the for loop
		var index = -1;
		for(var i = 0; i < this.candies.length;i++){
			if(this.candies[i].isEaten === true){
				index = i;
				break;
			}
		}

		if(index !== -1){
			var candy = this.candies[index];
			// remove candy from layer
			this.tilesLayer.removeChild(candy);
			this.candies.splice(index, 1);
		}
	}


	// create a mushroom at above position
	// position should be right above box that
	// created it
	p.createMushroom = function(type, position){
		position = position || {x:0, y:0};
		if(this.isInsideSubLevel){
			this.currentSubLevel.createMushroom(type, position);
//			console.log("leaving sub level");
			return;
		}
		var type = (glide.jumper.level === 1) ? "red" : "brown";
		if(type === "red"){
			mushroom = new glide.RedMushroom(position);
			this.mushrooms.push(mushroom);
			mushroom.isAlive = true;
			this.tilesLayer.addChild(mushroom);
		}else if(type === "brown"){
			mushroom = new glide.BrownMushroom(position);
			this.mushrooms.push(mushroom);
			mushroom.isAlive = true;
			this.tilesLayer.addChild(mushroom);
		}
	}

	p.destroyMushrooms = function(){
		// index of mushrrom to destroy.
		// dont wanna destroy it in the for loop
		var index = -1;
		for(var i = 0; i < this.mushrooms.length;i++){
			if(this.mushrooms[i].isAlive === false){
				index = i;
				break;
			}
		}

		if(index !== -1){
			var mushroom = this.mushrooms[index];
			// remove block from layer
			this.tilesLayer.removeChild(mushroom);
			this.mushrooms.splice(index, 1);
		}
	}

	// create a mushroom at above position
	// position should be right above box that
	// created it
	p.createFireball = function(position){
		if(this.isInsideSubLevel){
			this.currentSubLevel.createFireball(position);
//			console.log("leaving sub level");
			return;
		}
		if(this.specialAttacks.length >= 2){
			return;
		}
		console.log(glide.jumper.x +", " + glide.jumper.y);
		console.log("we are ehre:");
		position = position || {x:0, y:0};
		fireball = new glide.Fireball(position, glide.jumper.direction);
		this.specialAttacks.push(fireball);
		fireball.isAlive = true;
		this.tilesLayer.addChild(fireball);
	}

	p.destroySpecialAttacks = function(){
		// index of mushrrom to destroy.
		// dont wanna destroy it in the for loop
		var index = -1;
		for(var i = 0; i < this.specialAttacks.length;i++){
			if(this.specialAttacks[i].isAlive === false){
				index = i;
				break;
			}
		}

		if(index !== -1){
			var specialAttack = this.specialAttacks[index];
			// remove block from layer
			this.tilesLayer.removeChild(specialAttack);
			this.specialAttacks.splice(index, 1);
		}
	}

	p.repositionCamera = function(position){
		position = position || {x:0, y:0};
		// remove HUD
		this.camera.removeChild(this.HUD);

		// position camera
		this.camera.x = position.x;
		this.camera.y = position.y;

		//  add HUD back on top.
		this.camera.addChild(this.HUD);
	}

	p.update = function(delta){
		if(this.ready === false){
			return;
		}

		// if we are in sublevel do nothing
		if(this.isInsideSubLevel){
			this.currentSubLevel.update(delta);
//			console.log("in sub level");
			return;
		}

		// grab the delta
		glide.jumper.update(delta);
//		console.log(event.delta);
		// update camera's position based on player
	    this.camera.x -= glide.jumper.velocity.x;
	    this.camera.y -= glide.jumper.velocity.y;
	    // update status bar too
	    this.HUD.text = "Coins: " + glide.jumper.coins +
	    			"\nScore: " + glide.jumper.score +
	    			"\nSweets: " + glide.jumper.sweets;
	    this.HUD.x += glide.jumper.velocity.x;
	    this.HUD.y += glide.jumper.velocity.y;

		for(var i = 0; i < this.enemies.length;i++){
			this.enemies[i].update(delta);
		}
		// update mushrooms
		for(var i = 0; i < this.mushrooms.length; i++){
			var mushRect = this.mushrooms[i].update(delta);
			mushRect = mushRect || {};
			// boost power and destroy mushroom
			if(this.intersectRect2(mushRect, glide.jumper.getCollisionRect())){
				glide.jumper.powerUp(this.mushrooms[i].level);
				this.mushrooms[i].visible = false;
				this.mushrooms[i].kill();
			}
		}

		// update special attacls
		for(var i = 0; i < this.specialAttacks.length; i++){
			var attackRect = this.specialAttacks[i].update(delta);
			mushRect = mushRect || {};
/*
			// boost power and destroy mushroom
			if(this.intersectRect2(mushRect, glide.jumper.getCollisionRect())){
				glide.jumper.powerUp(this.mushrooms[i].level);
				this.mushrooms[i].visible = false;
				this.mushrooms[i].kill();
			}
*/
		}

		// check for collision between enemies and fireballs
		for(var i = 0; i < this.specialAttacks.length; i++){
			var attackRect = this.specialAttacks[i].update(delta);
//			console.log(attackRect);
			attackRect = attackRect || {};
			for(var j = 0; j < this.enemies.length;j++){
				var enemy = this.enemies[j];
				if((enemy.distance(attackRect) < 150) &&
					(this.intersectRect2(attackRect, enemy.getCollisionRect()))){
					enemy.kill();
					this.specialAttacks[i].kill();

				}

			}

		}

		// test player against obstacles
		for(var i = 0; i < this.obstacles.length; i++){
			var obstacle = this.obstacles[i];
			// check for hit
			// if not collidable keep moving
			if(!glide.jumper.isCollidable){
				break;
			}
			if(this.intersectRect2(obstacle.getObstacleCollisionRect(), glide.jumper.getCollisionRect())){
				// hit an obstacle
				console.log("hit an obstacle");
				obstacle.handlePlayerCollision(glide.jumper);
			}
		}

		// test player against candies
		for(var i = 0; i < this.candies.length; i++){
			var candy = this.candies[i];

			// check for hit
// this mistake froze everything
//			if(this.intersectRect2(candy.getObstacleCollisionRect(), glide.jumper.getCollisionRect())){
			if(this.intersectRect2(candy.getCollisionRect(), glide.jumper.getCollisionRect())){
				// hit an candy
				console.log("hit an candy");
				candy.handlePlayerCollision(glide.jumper);
			}
		}

		// check for death
//		console.log(glide.jumper.isAlive);
 		if(glide.jumper.isAlive === false){
 			glide.jumper.setup();
 			this.performDeath();
 			return;
 		}
 		// offscreen death
 		if(glide.jumper.y > this.dimens.height + 50){
 			this.performDeath();
 		}

 		// remove all dead stuff
		if(Math.random() > .97){
			this.removeDeadEnemies();
		}
		// always remove eaten candies and mushrooms
		this.removeCandies();
		this.destroyMushrooms();
		this.destroySpecialAttacks();

 		// check to see if we hit a warp
 		this.checkWarpZones();

 		// see if level is over
 		this.stageOver();
	}

	// checks to see if the player collided with a warp zone
	p.checkWarpZones = function(){
		for(var i = 0; i < this.warpZones.length; i++){
			var zone = this.warpZones[i];
//				console.log("zone: "+zone.x + ", " + zone.y);
//				console.log("jumper: "+glide.jumper.x + ", " + glide.jumper.y);
			if((this.intersectRect2(glide.jumper.getCollisionRect(),
				zone.getRect()))
				&&glide.jumper.isWalkingOrStand()){
				console.log("we are in sublevel!");
				var spawnValue = zone.spawnValue;
				var respawnValue;
				if(spawnValue === "+"){
					respawnValue = "-";
				}
				if(spawnValue === "<"){
					respawnValue = ">";
				}
				if(spawnValue === "{"){
					respawnValue = "}";
				}
				this.respawnLocation = this.respawnPoints[respawnValue];
				// assign current sublevel
				this.currentSubLevel = this.sublevels[spawnValue];
//				console.log(this.currentSubLevel);
				this.currentSubLevel.startGame();
				this.isInsideSubLevel = true;
				// attach parent to  sublevel
				this.currentSubLevel.setParent(this);
				return;
			}
		}
	}

	p.stageOver = function(){
		// check for level over
		if(this.exit.intersects(glide.jumper.getCollisionRect())){

			// if we are in sublevel wake up parent
			if(this.parent !== null){
				console.log("leaving sub level");
				this.parent.resumeGame();
				return;
			}
//			this.cleanBoard();
			glide.board.nextStage();
		}
	}

	p.performDeath = function(){
		that = this;
		// pause the updating of the game
		this.ready = false;
		var jumper = glide.jumper;
		createjs.Tween.get(jumper, {loop:false})
			.wait(600)
			.to({x:jumper.x, y:jumper.y-200}, 400, createjs.Ease.linear)
			.to({x:jumper.x, y:jumper.y+500}, 600, createjs.Ease.linear)
			.wait(1000)
			.call(this.callStartGame);

	}

	var that;
	// DO IT  this way so startgame gets the this scope
	p.callStartGame = function(){
		that.startGame();
	}

	p.performFallDeath = function(){
		that = this;
		// pause the updating of the game
		this.ready = false;
		var jumper = glide.jumper;
		createjs.Tween.get(jumper, {loop:false})
			.wait(1000)
			.call(this.callStartGame);
	}

	return Level;
})();

