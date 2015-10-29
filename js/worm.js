glide.Worm = (function(){
	function Worm(position){
		this.initialize(position);
	}

	var p = Worm.prototype = new glide.Enemy;
	p.Enemy_initialize = p.initialize;
	p.Enemy_kill = p.kill;

	p.kill = function(){
		this.Enemy_kill();

		if(this.direction === LEFT){
			this.gotoAndPlay("dead");
		}else{
			this.gotoAndPlay("dead_h");			
		}
	}
	
	p.initialize = function(position){

		var frames = [
			[0,0,50,28,0,0,0],
			[0,0,51,26,1,0,0],
			[0,0,59,12,2,0,0],
			[0,0,50,28,3,0,0],
			[0,0,51,26,4,0,0],
			[0,0,59,12,5,0,0],
		];

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
				{
				"walk": [0, 1, "walk", .04],
				"dead": [2, 2, "dead"],
				"walk_h": [3, 3, "walk_h", .04],
				"dead_h": [4, 4, "dead_h"],
			},
			"images": glide.loader.getWormImages(),
			"frames": frames
		});

		var width = 51;
		var height = 28;

		var collisionOffset = {};
		collisionOffset.x = 0;
		collisionOffset.y = 13;
		collisionOffset.width = 44;
		collisionOffset.height = 13;

		// call super class constructor
		this.Enemy_initialize(spriteSheet, position, frames, collisionOffset, width, height);
		this.speed = .6;
//		this.category = "worm";


//		this.collisionOffset.x = 0;
//		this.collisionOffset.y = 13;
//		this.collisionOffset.width = 44;
//		this.collisionOffset.height = 13;

		// start with walking 
		this.gotoAndPlay("walk");

	}

	return Worm;
})();