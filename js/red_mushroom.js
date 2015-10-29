glide = glide || {};

glide.RedMushroom = (function(){
	function RedMushroom(position){
		this.initialize(position);
		// default to false until we exit box
		this.isAlive = false;
	}

	// make another class in the future to hold auto moving
	// since this isnt an enemy.
	var p = RedMushroom.prototype = new glide.Enemy;
	p.Enemy_update = p.update;
	p.Enemy_initialize = p.initialize;


	p.update = function(delta){
		if(this.isAlive === false){
			return;
		}
//		console.log("cocoo");
		this.Enemy_update(delta);

		return this.getRect();
	}

	p.initialize = function(position){
		// second stage
		this.level = 2;
//		this.x = 200;
		var tileImage = glide.loader.getTextureImage("mushroomRed");
		var frames = [
			[0,0,70,70,0,0,0],
		];
		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [tileImage],
			"frames": 
			{
				"height": tileImage.height,
				"width":tileImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});
		var width = tileImage.width;
		var height = tileImage.height;
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 0;
		collisionOffset.width = width;
		collisionOffset.height = height;


		// call super class constructor
//		this.Entity_initialize(spriteSheet, position, null, null, width, height);
		this.Enemy_initialize(spriteSheet, position, null, null, width, height);
		this.spriteWidth = tileImage.width;
		this.spriteHeight = tileImage.height;

//		this.scaleSprite(width, height);

		this.category = "power up";


		// start with walking 
		this.gotoAndPlay("idle");
	}

	return RedMushroom;

})();


glide.BrownMushroom = (function(){
	function BrownMushroom(position){
		this.initialize(position);
		// default to false until we exit box
		this.isAlive = false;
	}

	// make another class in the future to hold auto moving
	// since this isnt an enemy.
	var p = BrownMushroom.prototype = new glide.Enemy;
	p.Enemy_update = p.update;
	p.Enemy_initialize = p.initialize;


	p.update = function(delta){
		if(this.isAlive === false){
			return;
		}
//		console.log("cocoo");
		this.Enemy_update(delta);

		return this.getRect();
	}

	p.initialize = function(position){
		// second stage
		this.level = 3;
//		this.x = 200;
		var tileImage = glide.loader.getTextureImage("mushroomBrown");
		var frames = [
			[0,0,70,70,0,0,0],
		];
		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"idle": [0, 0, false],
			},
			"images": [tileImage],
			"frames": 
			{
				"height": tileImage.height,
				"width":tileImage.width,
				"regX": 0,
				"regY": 0,
				"count": 1,
			}
		});
		var width = tileImage.width;
		var height = tileImage.height;
		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 0;
		collisionOffset.width = width;
		collisionOffset.height = height;


		// call super class constructor
//		this.Entity_initialize(spriteSheet, position, null, null, width, height);
		this.Enemy_initialize(spriteSheet, position, null, null, width, height);
		this.spriteWidth = tileImage.width;
		this.spriteHeight = tileImage.height;

//		this.scaleSprite(width, height);

		this.category = "power up";


		// start with walking 
		this.gotoAndPlay("idle");
	}

	return BrownMushroom;

})();