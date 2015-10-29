var glide = glide || {};
glide.Bee = (function(){
	function Bee(position){
		this.initialize(position);
	}

	var p = Bee.prototype = new glide.Enemy;
	p.Enemy_initialize = p.initialize;
	p.Enemy_kill = p.kill;

	p.kill = function(){
		this.Enemy_kill();

		if(this.direction === LEFT){
			this.gotoAndPlay("shelled");
		}else{
			this.gotoAndPlay("shelled_h");			
		}
	}	
	p.initialize = function(position){

		var frames = [
		// fly
			[0,0,56,48,0,0,0],
			[0,0,61,42,1,0,0],
		// hit
			[0,0,56,48,2,0,0],
		// dead
			[0,0,56,48,3,0,0],
		// fly_h
			[0,0,56,48,4,0,0],
			[0,0,61,42,5,0,0],
		// hit_h
			[0,0,56,48,6,0,0],
		// dead_h
			[0,0,56,48,7,0,0],
		];

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
				{
				"fly": [0, 1, "fly", .04],
				"dead": [2, 3, false],
				"fly_h": [4, 5, "fly_h", .04],
				"dead_h": [6, 7, false],
			},
			"images": glide.loader.getBeeImages(),
			"frames": frames
		});

		var width = 56;
		var height = 48;

		var collisionOffset = {};
		collisionOffset.x = 7;
		collisionOffset.y = 14;
		collisionOffset.width = 44 - 7;
		collisionOffset.height = 40 - 14;

		// call super class constructor
		this.Enemy_initialize(spriteSheet, position, frames, collisionOffset, width, height);
		this.speed = 1;
//		this.category = "worm";

		this.gotoAndPlay("fly");

	}

	// bees only move left and right
	p.update = function(gameTime){
		if(this.isAlive === false){
			return;
		}
		glide.board.kaka = 0;

		// determine whether to move left or right based on player's positon
		if(this.x < glide.jumper.x){
			// move right
			this.direction = RIGHT;
		}else{
			// move left
			this.direction = LEFT;
		}

		if(this.direction === LEFT){
			this.movementVector.x = -this.speed;
		}else{
			this.movementVector.x = this.speed;
		}

		// set position to current X and Y
		this.position = this.getCollisionRect();		
		
		
		// update position vector
		this.velocity.x = (this.movementVector.x * gameTime / 20*4).clamp(-40,40);
		this.position.x += this.velocity.x;
		
		// update sprite's actual position
		this.x = this.position.x -this.collisionOffset.x;
	}


	return Bee;
})();








