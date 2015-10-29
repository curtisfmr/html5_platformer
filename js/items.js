// This file will keep all classes that are items

var glide = glide || {};
glide.Obstacle = (function(){
	function Obstacle(){
	}

	var p = Obstacle.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(spriteSheet, position, collisionOffset, obstacleCollisionOffset, width, height){

		this.obstacleCollisionOffset = obstacleCollisionOffset;

		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);


		if(true){
			// draw collision recttangles
			var shape = new createjs.Shape();
			shape.graphics.beginStroke("0F0").drawRect(obstacleCollisionOffset.x, obstacleCollisionOffset.y,
						 obstacleCollisionOffset.width, obstacleCollisionOffset.height);
			this.addChild(shape);
		}
	}

	p.getObstacleCollisionRect = function(){
		var rect = {x:this.x+this.obstacleCollisionOffset.x,
					 y:this.y+this.obstacleCollisionOffset.y,
					 width:this.obstacleCollisionOffset.width,
					 height:this.obstacleCollisionOffset.height};
		return rect;
	}

	p.handlePlayerCollision = function(player){
		player.hit();
	}

	p.handleEnemyCollision = function(enemy){
		// do nothing
	}

	return Obstacle;
})();



glide.Spikes = (function(){
	function Spikes(position, type){
		// bottom spikes will be the default
		type = type || "bottom";
		this.initialize(position, type);
	}

	var p = Spikes.prototype = new glide.Obstacle;
	p.Obstacle_initialize = p.initialize;

	p.initialize = function(position, type){
		var spikeImage;

		// create bottom spikes
		if(type === "bottom"){
			spikeImage = glide.loader.getTextureImage("spikesBottom");			
		}else if(type === "top"){
			spikeImage = glide.loader.getTextureImage("spikesTop");			
		}

//		console.log(spikeImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [spikeImage],
			"frames": 
			{
				"height": spikeImage.height,
				"width":spikeImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 7;
		collisionOffset.y = 60;
		collisionOffset.width = 62 - 7;
		collisionOffset.height = 69 - 50;

		var obstacleCollisionOffset = {};
		obstacleCollisionOffset.x = 11;
		obstacleCollisionOffset.y = 50;
		obstacleCollisionOffset.width = 62 - 11;
		obstacleCollisionOffset.height = 20; // 20 pixel hit box for height


		var width = spikeImage.width;
		var height = spikeImage.height;

		// call super class constructor
		this.Obstacle_initialize(spriteSheet, position, collisionOffset, obstacleCollisionOffset, width, height);

		this.gotoAndPlay("idle");
	}

	p.handlePlayerCollision = function(player){
//		var state = player.state;

		// hurt player if falling on spikes
//		if(state === FALLING){
		player.hit();
//		}
	}

	return Spikes;
})();



glide.Spring = (function(){
	function Spring(position, level){
		// bottom spikes will be the default
		this.initialize(position, level);
	}

	var p = Spring.prototype = new glide.Obstacle;
	p.Obstacle_initialize = p.initialize;

	p.initialize = function(position, level){
		var springImages = glide.loader.getSpringImages();		


//		console.log(spikeImage);
		var frames = [
			[0,0,70,70,0,0,0],
			[0,0,70,70,1,0,0],
		];


		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"down": [0, 0, false],
				"up": [1, 1, false],	// wait 3 frames
			},
			"images": springImages,
			"frames": frames
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 44;
		collisionOffset.width = 62 - 7;
		collisionOffset.height = 69 - 44;

		var obstacleCollisionOffset = {};
		obstacleCollisionOffset.x = 11;
		obstacleCollisionOffset.y = 30;
		obstacleCollisionOffset.width = 54 - 15;	// with of spring part
		obstacleCollisionOffset.height = 20; // 20 pixel hit box for height


		var width = 70;
		var height = 70;

		// call super class constructor
		this.Obstacle_initialize(spriteSheet, position, collisionOffset, obstacleCollisionOffset, width, height);

		this.gotoAndPlay("down");
	}

	p.handlePlayerCollision = function(player){
		console.log("Sping!");
		this.gotoAndPlay("up");
		player.spring(1.5);
	}

	return Spring;
})();


glide.MushroomTop = (function(){
	function MushroomTop(position, type){
		this.initialize(position, type);
	}

	var p = MushroomTop.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(position, type){
		var mushImage = glide.loader.getTextureImage(type);			
//		console.log(mushImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [mushImage],
			"frames": 
			{
				"height": mushImage.height,
				"width":mushImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 0;
		collisionOffset.width = 70;
		collisionOffset.height = 40;

		var width = mushImage.width;
		var height = mushImage.height;

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);

		// move mushroom down 30 pixels so that it sits on top of 
		// stem
		this.y += 30;
		this.gotoAndPlay("idle");
	}

	return MushroomTop;
})();


glide.FloatingPlatform = (function(){
	function FloatingPlatform(position, type){
		this.initialize(position, type);
	}

	var p = FloatingPlatform.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(position, type){
		var mushImage = glide.loader.getTextureImage(type);			
//		console.log(mushImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [mushImage],
			"frames": 
			{
				"height": mushImage.height,
				"width":mushImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 0;
		collisionOffset.width = 70;
		collisionOffset.height = 40;

		var width = mushImage.width;
		var height = mushImage.height;

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);

		this.gotoAndPlay("idle");
	}

	return FloatingPlatform;
})();





////////////////////////////////////////////// CANDY!!!!!!!!!!!!!!!!


glide.Candy = (function(){
	function Candy(){
	}

	var p = Candy.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(candyImageName, position, collisionOffset){

		var candyImage = glide.loader.getTextureImage(candyImageName);	
//		console.log(mushImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [candyImage],
			"frames": 
			{
				"height": candyImage.height,
				"width":candyImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});

		var width = candyImage.width;
		var height = candyImage.height;
		// amount to increase player's score by
		this.candyValue = 0;
		this.isEaten = false;

		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);
	}

	p.handlePlayerCollision = function(player){
		// dont want to add points multiple times
		if(this.isEaten){
			return;
		}
		player.sweets += this.candyValue;
		this.isEaten = true;
	}

	return Candy;
})();









glide.GroundCandy = (function(){
	function GroundCandy(position, candyType){
		this.initialize(position, candyType);
	}

	var p = GroundCandy.prototype = new glide.Candy;
	p.Candy_initialize = p.initialize;

	p.initialize = function(position, candyType){

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 23;
		collisionOffset.y = 43;
		collisionOffset.width = 26;
		collisionOffset.height = 26;

		var candyImages = ["candyBlue", "candyGreen", "candyRed", "candyYellow"];
		// trick to get random index from 0 - 2
		var index = (Math.round((Math.random())+1));

		// call super class constructor
		this.Candy_initialize(candyImages[index], position, collisionOffset);

		// set candy value
		this.candyValue = 5;

		this.gotoAndPlay("idle");
	}

	return GroundCandy;
})();

glide.CherryCandy = (function(){
	function CherryCandy(position){
		this.initialize(position);
	}

	var p = CherryCandy.prototype = new glide.Candy;
	p.Candy_initialize = p.initialize;

	p.initialize = function(position){

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 15;
		collisionOffset.y = 30;
		collisionOffset.width = 50 - 15;
		collisionOffset.height = 63 - 30;

		var cherryName = "cherry";

		// call super class constructor
		this.Candy_initialize(cherryName, position, collisionOffset);

		// set candy value
		this.candyValue = 25;

		this.gotoAndPlay("idle");
	}

	return CherryCandy;
})();


glide.WafferCandy = (function(){
	function WafferCandy(position){
		this.initialize(position);
	}

	var p = WafferCandy.prototype = new glide.Candy;
	p.Candy_initialize = p.initialize;

	p.initialize = function(position){

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 18;
		collisionOffset.y = 16;
		collisionOffset.width = 53 - 18;
		collisionOffset.height = 60 - 16;


		var waffleImages = ["waffleChoco", "wafflePink", "waffleWhite"];
		// trick to get random index from 0 - 2
		var index = (Math.round((Math.random())+1));
		// call super class constructor
		this.Candy_initialize(waffleImages[index], position, collisionOffset);

		// set candy value
		this.candyValue = 15;

		this.gotoAndPlay("idle");
	}

	return WafferCandy;
})();


glide.CookieCandy = (function(){
	function CookieCandy(position, candyType){
		this.initialize(position, candyType);
	}

	var p = CookieCandy.prototype = new glide.Candy;
	p.Candy_initialize = p.initialize;

	p.initialize = function(position, candyType){

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 0;
		collisionOffset.width = 70;
		collisionOffset.height = 40;


		var cookieImages = ["cookieBrown", "cookieChoco", "cookiePink"];
		// trick to get random index from 0 - 2
		var index = (Math.round((Math.random())+1));
		// call super class constructor
		this.Candy_initialize(cookieImages[index], position, collisionOffset);

		// set candy value
		this.candyValue = 20;

		this.gotoAndPlay("idle");
	}

	return CookieCandy;
})();


glide.CupCakeCandy = (function(){
	function CupCakeCandy(position, candyType){
		this.initialize(position, candyType);
	}

	var p = CupCakeCandy.prototype = new glide.Candy;
	p.Candy_initialize = p.initialize;

	p.initialize = function(position, candyType){

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 12;
		collisionOffset.y = 0;
		collisionOffset.width = 57-12;
		collisionOffset.height = 70;


		// call super class constructor
		this.Candy_initialize("cupCake", position, collisionOffset);

		var frostingImages = ["creamChoco", "creamMocca", "creamPink", "creamVanilla"];
		// trick to get random index from 0 - 3
		var index = (Math.round((Math.random()*2)+1));

		// create a tile which is the top of the cupcake
		// coordinates for frosting relative to cupcake
		var posX = 0;
		var posY = -70;
		var frosting = new glide.Tile(glide.loader.getTextureImage(frostingImages[index]),{"x":posX,"y":posY}, false);
		this.addChild(frosting);

		// set candy value
		this.candyValue = 50;

		this.gotoAndPlay("idle");
	}

	return CupCakeCandy;
})();


// Lollipop, does not get collected
glide.LollipopCandy = (function(){
	function LollipopCandy(position, candyType){
		this.initialize(position, candyType);
	}

	var p = LollipopCandy.prototype = new glide.Tile;
	p.Tile_initialize = p.initialize;

	p.initialize = function(position, candyType){
		var lollipopImages = ["lollipopBase", "lollipopBaseBeige", "lollipopBaseBrown"];
		// trick to get random index from 0 - 2
		var strickIndex = (Math.round((Math.random())+1));

		// call super class constructor
		this.Tile_initialize(glide.loader.getTextureImage(lollipopImages[strickIndex]), position, false);

		var lollipopImages = ["lollipopFruitGreen", "lollipopFruitRed", "lollipopFruitYellow", "lollipopGreen",
								"lollipopRed", "lollipopWhiteGreen", "lollipopWhiteRed"];
		// trick to get random index from 0 - 6
		var index = (Math.round((Math.random()*5)+1));

		// create a tile which is the top of the lollipop
		var top = new glide.Tile(glide.loader.getTextureImage(lollipopImages[index]),{"x":posX,"y":posY - 70}, false);
		this.addChild(top);

		this.gotoAndPlay("idle");
	}

	return LollipopCandy;
})();


// Lollipop, does not get collected
glide.CandyCane = (function(){
	function CandyCane(position, candyType){
		this.initialize(position, candyType);
	}

	var p = CandyCane.prototype = new glide.Tile;
	p.Tile_initialize = p.initialize;

	p.initialize = function(position, candyType){
		var lollipopImages = ["lollipopBase", "lollipopBaseBeige", "lollipopBaseBrown"];
		// trick to get random index from 0 - 2
		var strickIndex = (Math.round((Math.random())+1));

		// call super class constructor
		this.Tile_initialize(glide.loader.getTextureImage("canePink"), position, false);

		var lollipopImages = ["canePinkTopAlt", "canePinkTop"];
		// trick to get random index from 0 - 6
		var index = (Math.round((Math.random()*5)+1));

		// create a tile which is the top of the lollipop
		var top = new glide.Tile(glide.loader.getTextureImage(lollipopImages[index]),{"x":posX,"y":posY - 70}, false);
		this.addChild(top);

		this.gotoAndPlay("idle");
	}

	return CandyCane;
})();

// Bridge

glide.Bridge = (function(){
	function Bridge(position, type){
		this.initialize(position, type);
	}

	var p = Bridge.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(position, type){
		var bridgeImage = glide.loader.getTextureImage(type);			
//		console.log(mushImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [bridgeImage],
			"frames": 
			{
				"height": bridgeImage.height,
				"width":bridgeImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 50;
		collisionOffset.width = 70;
		collisionOffset.height = 20;

		var width = bridgeImage.width;
		var height = bridgeImage.height;

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);



		this.gotoAndPlay("idle");
	}

	return Bridge;
})();





// Fireball
glide.Fireball = (function(){
	function Fireball(position, direction){
		this.initialize(position);
		this.launchAngle = 305;
		this.radians = this.launchAngle * Math.PI / 180;
		this.speed = .7;
		this.direction = direction || LEFT;
	}

	var p = Fireball.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(position){
		var fireballImage = glide.loader.getTextureImage("fireball");			
//		console.log(mushImage);

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [fireballImage],
			"frames": 
			{
				"height": fireballImage.height,
				"width":fireballImage.width,
				"regX": fireballImage/2,
				"regY": fireballImage/2,
				"count": 1,
			}
		});

		// modify collision offset based on spike's position
		var collisionOffset = {};
		collisionOffset.x = 27;
		collisionOffset.y = 28;
		collisionOffset.width = 70 - 40;
		collisionOffset.height = 70 - 44;

		var width = fireballImage.width;
		var height = fireballImage.height;

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, null, collisionOffset, width, height);



		this.gotoAndPlay("idle");
	}

	p.update = function(gameTime){
		if(this.isAlive === false){
			return;
		}
		glide.board.kaka = 0;

		if(this.direction === LEFT){
			this.movementVector.x = -this.speed;
		}else{
			this.movementVector.x = this.speed;
		}

		// apply physics
		// set position to current X and Y
		this.position = this.getCollisionRect();
		// get old position
		this.oldPosition = this.getCollisionRect();
//		this.movementVector = {x:0, y:0};
		this.applyGravity(gameTime);
		this.applyFriction();
		
		
		
		// update position vector
		this.velocity.x = (this.movementVector.x * gameTime / 20*4).clamp(-40,40);
		this.velocity.y = (this.movementVector.y).clamp(-40,40);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		// update sprite's actual position
		this.x = this.position.x -this.collisionOffset.x;
		this.y = this.position.y - this.collisionOffset.y;

		if(glide.board.collideWithTiles(this.getCollisionRect()) === true){// undo the changes
			// to see the old way
//			this.x = this.oldPosition.x;
//			this.y = this.oldPosition.y;
//			return;
			// old way over
			var bounds = this.getCollisionRect();
			this.position = glide.board.WhereCanIGetTo(this.oldPosition, this.position, bounds);
			// update position vector for moving camera
			this.velocity.x = this.position.x - this.oldPosition.x;
			this.velocity.y =  this.position.y - this.oldPosition.y;
		this.x = this.position.x -this.collisionOffset.x;
		this.y = this.position.y - this.collisionOffset.y;
		}


		// check if we hit A  wall and turn around if we do.
//		var turnAround = this.isAgainstWall();

		// if we didnt move this update turn around
		if((this.position.x === this.oldPosition.x)&&(this.position.y === this.oldPosition.y)){
			this.direction *= -1;
		}

		// perform bounce if on ground
		if(this.isOnFirmGround()){
			// give static bounce value
			this.movementVector.y = -20;
		}

		// if we hit a wall kill
		if(this.oldPosition.x === this.position.x){
			this.kill();
		}


		this.StopMovingIfBlocked();
		return this.getCollisionRect();
	}
	p.isOnFirmGround = function()
	{
		// normally we are one pixel above the ground due to
		// our prediction collision detection.
		// so we take our current location and make a similar
		// rectangle but move it one pixel lower. this allows us
		// to test if we would be colliding with the ground
		// since our current collision detection doesn't allow us to.
		var onePixelLower = this.getCollisionRect();
		onePixelLower.y += 1;
		var lastPositionRect = {x:this.oldPosition.x, y:this.oldPosition.y, width:this.width, height:this.height};
		lastPositionRect.y += 1;
		return glide.board.collideWithTiles(onePixelLower);//||glide.board.collideWithTiles(lastPositionRect);
	}

	return Fireball;
})();

