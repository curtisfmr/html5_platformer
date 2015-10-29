var glide = glide || {};
glide.PowerBlock = (function(){
	var UNHIT = 1;
	var HIT = 2;
	function PowerBlock(position){
		this.initialize(position);
	}

	var p = PowerBlock.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	var that;
	p.initialize = function(position, type){
		this.STATE = UNHIT;
		var frames = [
			[0,0,70,70,0,0,0],
			[0,0,70,70,1,0,0],
		];

		var coinBoxImages = glide.loader.getItemBoxImages();
		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"unhit": [0, 0, false],
				"hit": [1, 1, false],
			},
			"images": coinBoxImages,
			"frames": frames
		});

		var width = 70;
		var height = 70;

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, frames, null, width, height);
		this.spriteWidth = 70;
		this.spriteHeight = 70;
		var mushroom;
		if(type === "red"){
			mushroom = new glide.RedMushroom({x:0, y:0}, position);
		}else{
			mushroom = new glide.RedMushroom({x:0, y:0}, position);
//			mushroom = new glide.BrownMushroom({x:this.x, y:this.y});
		}

		this.mushroom = mushroom;
		this.addChildAt(this.mushroom, 0);

		// start with walking 
		this.gotoAndPlay("unhit");

	}

	p.getHitRect = function(){
		// the -2 is so the bounds is inside by the actual squa
		// the + 10 and -20 is so the hit box is inside the box
		var rect = {x:this.x + 5, y:this.y + this.height -2,
			width:this.width - 10, height: 3};
		return rect;
	}

	p.handleHit = function(jumper){
		// do nothing with jumper
		this.gotoAndPlay("hit");
		this.isCollidable = false;
		createjs.Tween.get(this, {loop:false})
					.to({x:this.x, y:this.y-50}, 200, createjs.Ease.bounceOut)
					.wait(50)
					.to({x:this.x, y:this.y}, 200, createjs.Ease.bounceIn)
					.call(this.handleComplete);
		console.log("hit power block");
		// emerge mushroom
/*
		createjs.Tween.get(this.mushroom, {loop:false})
					.wait(450)
					.to({x:this.mushroom.x, y:this.mushroom.y-75}, 200, createjs.Ease.bounceOut)
					.wait(50)
					.call(this.handleComplete);
*/
		this.mushroom.y = -75;
		// this only keeps a reference to the
		// last brick that calls this function
		that = this;
//		this.handleComplete();
	}
	p.handleComplete = function(){
		console.log("moving mushroom");
		// delete the mushroom. dont need it.
		that.removeChildAt(0);
		that.mushroom = null;

		var postionToCreateMushroom = that.getRect();
		// push it up 75 pixel
		postionToCreateMushroom.y -= 75;
		glide.board.createMushroom("red", postionToCreateMushroom);
	}

	p.getMushroom = function(){
		return this.mushroom;
	}

	return PowerBlock;
})();