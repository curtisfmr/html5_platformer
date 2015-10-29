var glide = glide || {};
glide.CoinBlock = (function(){
	var UNHIT = 1;
	var HIT = 2;
	function CoinBlock(position){
		this.initialize(position);
	}

	var p = CoinBlock.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	p.initialize = function(position){
		this.self = this;
		this.cointCount = 10;
		this.STATE = UNHIT;
		var frames = [
			[0,0,70,70,0,0,0],
			[0,0,70,70,1,0,0],
		];

		var coinBoxImages = glide.loader.getCoinBoxImages();
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


		// start with walking 
		this.gotoAndPlay("unhit");

		// add coin behind block to hide from view
		this.coin = new createjs.Bitmap(glide.loader.getTextureImage("coinGold"));
		this.addChildAt(this.coin,0);

/*
		var rect = {x:this.x + 10, y:this.y + this.height -2,
			width:this.width - 20, height: 1};
		var shape = new createjs.Shape();
		shape.graphics.beginFill("#F0F").drawRect(10, this.height -2,
			this.width - 20, 2);
		this.addChild(shape);
*/
	}

	p.getHitRect = function(){
		// the -2 is so the bounds is inside by the actual squa
		// the + 10 and -20 is so the hit box is inside the box
		var rect = {x:this.x + 5, y:this.y + this.height -2,
			width:this.width - 10, height: 3};
		return rect;
	}

	p.handleHit = function(jumper){
		jumper.coins += 2;
		this.gotoAndPlay("hit");
		this.isCollidable = false;
		console.log("hit coin block");
		createjs.Tween.get(this.self, {loop:false})
					.to({x:this.self.x, y:this.self.y-50}, 200, createjs.Ease.bounceOut)
					.wait(50)
					.to({x:this.self.x, y:this.self.y}, 200, createjs.Ease.bounceIn);
		createjs.Tween.get(this.coin, {loop:false})
					.wait(450)
					.to({x:this.coin.x, y:this.coin.y-70}, 300, createjs.Ease.bounceOut)
					.wait(100)
					.to({x:this.coin.x, y:this.coin.y}, 300, createjs.Ease.bounceIn)
					.call(this.handleComplete);
		that = this;
	}
	var that;
	p.handleComplete = function(){
		console.log("handle complete");
		// remove coin and all references
		that.removeChild(this.coin);
		that.coin = null;
	}



	return CoinBlock;
})();