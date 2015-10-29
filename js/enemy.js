glide.Enemy = (function(){
	var LEFT = -1;
	var RIGHT = 1;
	function Enemy(){

	}

	var p = Enemy.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;

	p.initialize = function(spriteSheet, position, frames, collisionOffset, width, height){
		// call super class constructor
		this.Entity_initialize(spriteSheet, position, frames, collisionOffset, width, height);
		this.category = "enemy";
		this.direction = LEFT;
		this.speed = .3;
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


		this.StopMovingIfBlocked();
	}

	return Enemy;
})();