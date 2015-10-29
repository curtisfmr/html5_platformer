var glide = glide || {};
glide.Snail = (function(){
	function Snail(position){
		this.initialize(position);
	}

	var p = Snail.prototype = new glide.Enemy;
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
			[0,0,54,31,0,0,0],
			[0,0,57,31,1,0,0],
			[0,0,44,30,2,0,0],
			[0,0,44,30,3,0,0],
			[0,0,54,31,4,0,0],
			[0,0,57,31,5,0,0],
			[0,0,44,30,6,0,0],
			[0,0,44,30,7,0,0],
		];

		var spriteSheet = new createjs.SpriteSheet({
			"animations":
				{
				"walk": [0, 1, "walk", .04],
				"shelled": [2, 2, false],
				"upsidedown": [3, 3, false],
				"walk_h": [4, 5, "walk_h", .04],
				"shelled_h": [6, 6, false],
				"upsidedown_h": [7, 7, false],
			},
			"images": glide.loader.getSnailImages(),
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
		this.speed = .3;
//		this.category = "worm";


//		this.collisionOffset.x = 0;
//		this.collisionOffset.y = 13;
//		this.collisionOffset.width = 44;
//		this.collisionOffset.height = 13;

		// start with walking 
		this.gotoAndPlay("walk");

	}
	return Snail;
})();