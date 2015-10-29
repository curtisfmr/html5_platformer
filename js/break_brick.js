var glide = glide || {};
glide.BreakableBrick = (function(){
	function BreakableBrick(position){
		this.initialize(position);
	}

	var p = BreakableBrick.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	p.initialize = function(position){
		this.self = this;
		var tileImage = glide.loader.getTextureImage("box");
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

		// call super class constructor
		this.Entity_initialize(spriteSheet, position, null, null, width, height);
		this.spriteWidth = tileImage.width;
		this.spriteHeight = tileImage.height;

//		this.scaleSprite(width, height);

//		this.category = "worm";


//		this.collisionOffset.x = 0;
//		this.collisionOffset.y = 13;
//		this.collisionOffset.width = 44;
//		this.collisionOffset.height = 13;

		// start with walking 
		this.gotoAndPlay("idle");
	}

	p.getHitRect = function(){
		// the -2 is so the bounds is inside by the actual squa
		// the + 10 and -20 is so the hit box is inside the box
		var rect = {x:this.x + 5, y:this.y + this.height -2,
			width:this.width - 10, height: 3};
		return rect;
	}

	p.handleHit = function(jumper){
		if(jumper.level === 1){
			that = this.self;
			console.log("hit break brick");
			this.isCollidable = false;
			createjs.Tween.get(this.self, {loop:false})
					.to({x:this.self.x, y:this.self.y-50}, 200, createjs.Ease.bounceOut)
					.wait(50)
					.to({x:this.self.x, y:this.self.y}, 200, createjs.Ease.bounceIn)
					.call(this.handleComplete);
		}
		if(jumper.level > 1){
			jumper.score += 100;
			this.isAlive = false;
			this.isCollidable = false;
			console.log("hit break brick");
		}
	}
	var that;
	p.handleComplete = function(){
		console.log("handle complete");
		that.isCollidable = true;
	}


	return BreakableBrick;
})();