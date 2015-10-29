var glide = glide || {};

glide.Entity = (function(){

	function Entity(){
	};

	var p = Entity.prototype = new glide.AnimationSprite;
	p.AnimationSprite_initialize = p.initialize;

	p.initialize = function(spriteSheet, position, frames, collisionOffset, width, height, collidable){
		spriteSheet = spriteSheet || {};
		position = position || {};
		collisionOffset = collisionOffset || {x:0,y:0,width:width,height:height};
		// we want a custom collision box so we offset from real box
		this.collisionOffset = collisionOffset;
//		console.log(collisionOffset);
		this.AnimationSprite_initialize(spriteSheet, position, frames, width, height);

		// init all position related vectors
		this.isOnGround = false;

		this.movementVector = {x:0, y:0};

		this.position = {x:this.x, y:this.y};

		this.oldPosition = {x: this.position.x, y: this.position.y};

		if(collidable === false){
			this.isCollidable = false;
		}else{
			this.isCollidable = true;
		}
		this.isAlive = true;


		if(this.isCollidable && false){
			// draw collision recttangles
			var shape = new createjs.Shape();
			shape.graphics.beginStroke("F0F").drawRect(collisionOffset.x, collisionOffset.y, collisionOffset.width, collisionOffset.height);
			this.addChild(shape);
			this.collisionRectangle = shape;
			var body = new createjs.Shape();
			body.graphics.beginStroke("00F").drawRect(0, 0, this.width, this.height);
			this.addChild(body);
			this.body = body;
		}
		this.velocity = {x:0, y:0};
	}

	p.getCollisionRect = function(){
		var index = this.currentFrame;
		var rect = {x:this.x+this.collisionOffset.x,
					 y:this.y+this.collisionOffset.y,
					 width:this.collisionOffset.width,
					 height:this.collisionOffset.height};
		return rect;
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
	
	p.isAgainstWall = function()
	{
		// create a rect
		// shift it one pixel to the left
		// create a second rect and shift that one pixel to the left
		// see if either is against the walls
		var onePixelLeft = this.getRect();
		onePixelLeft.x -= 1;
		var onePixelRight = this.getRect();
		onePixelLeft.x += 1;
		return glide.board.collideWithTiles(onePixelLeft);//||glide.board.collideWithTiles(onePixelRight);
	}
	
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};

	p.StopMovingIfBlocked = function(){
		var lastMovement = {x:this.position.x - this.oldPosition.x,
							y:this.position.y - this.oldPosition.y};
		
		if(lastMovement.x === 0){
			this.movementVector.x = 0;
		}
		if(lastMovement.y === 0){
			this.movementVector.y = 0;
		}
	}
	
	p.applyGravity = function(gameTime){
		gameTime = (gameTime)|| 1;
		if(this.movementVector.y < 0){
			this.movementVector.y += .5 * gameTime /15;
		}else{
			this.movementVector.y += 1.2 * gameTime /15;
		}
	}
	
	p.applyFriction = function(){
		this.movementVector.x -= this.movementVector.x * .1;
		this.movementVector.y -= this.movementVector.y * .1;
	}

	p.distance = function (vector){
		var dist = Math.floor(Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2)));
//		console.log("x: " + this.x + ", y: " + this.y);
//		console.log("x1: " + vector.x + ", y1: " + vector.y);
//		console.log(dist);
		return dist;
	}

	p.kill = function(){
		this.isAlive = false;
		this.isCollidable = false;
//		this.visible = false;
	}

	p.intersects = function(r1) {
		return (r1.x <= this.width  + this.x&&
          this.x <= r1.width + r1.x &&
          r1.y <= this.height + this.y &&
          this.y <= r1.height + r1.y)
	}

	return Entity;

})();