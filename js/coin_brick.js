var glide = glide || {};
glide.CoinBrick = (function(){
	var UNHIT = 1;
	var HIT = 2;
	function CoinBrick(position){
		this.initialize(position);
	}

	var p = CoinBrick.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	p.initialize = function(position){
		this.coins = 10;
		this.self = this;
		this.STATE = UNHIT;
		var frames = [
			[0,0,70,70,0,0,0],
			[0,0,70,70,1,0,0],
		];

		var coinBoxImages = glide.loader.getCoinBrickImages();
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
		// add coin behind block to hide from view
		this.coin = new createjs.Bitmap(glide.loader.getTextureImage("coinGold"));
		this.addChildAt(this.coin,0);



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
		console.log("huh?");
		this.coins--;
		if(this.coins >= 0){
			this.isCollidable = false;		
			jumper.coins += 1;
			console.log("hit coin brick");
			that = this.self;
			createjs.Tween.get(this.self, {loop:false})
						.to({x:this.self.x, y:this.self.y-50}, 100, createjs.Ease.bounceOut)
						.to({x:this.self.x, y:this.self.y}, 100, createjs.Ease.bounceIn);
			createjs.Tween.get(this.coin, {loop:false})
						.wait(200)
						.to({x:this.coin.x, y:this.coin.y-70}, 300, createjs.Ease.bounceOut)
						.wait(100)
						.to({x:this.coin.x, y:this.coin.y}, 300, createjs.Ease.bounceIn)
						.call(this.handleComplete);
		}else{
			this.isCollidable = false;
			this.gotoAndPlay("hit");
			// remove coin and all references
			this.removeChild(this.coin);
			this.coin = null;
		}
	}
	var that;
	p.handleComplete = function(){
		console.log("handle complete");
		that.isCollidable = true;		
	}

	return CoinBrick;
})();