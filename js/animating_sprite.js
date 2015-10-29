var glide = glide || {};

glide.AnimationSprite = (function(){

	function AnimationSprite(){
	};

//	var p = AnimationSprite.prototype = new createjs.Sprite();
//	p.Sprite_initialize = p.initialize;
	var p = AnimationSprite.prototype = new createjs.Container();	
	// super class' initialization
	p.Container_initialize = p.initialize;

	p.initialize = function(spriteSheet, position, frames, width, height){
		spriteSheet = spriteSheet || {};
		position = position || {};
		frames = frames || {};
//		this.Sprite_initialize(spriteSheet);
		this.Container_initialize(spriteSheet);

		// add sprite to container
		this.sprite = new createjs.Sprite(spriteSheet);
		this.addChild(this.sprite);

		this.frames = frames;

		this.x = position.x;
		this.y = position.y;
		this.position = position;

		this.spriteWidth = 0;
		this.spriteHeight = 0;

		// set width and height if it exists
		if(width && height){
			this.width = width;
			this.height = height;
		}else{
			this.width = 0;
			this.height = 0;
		}


		this.category = "";

	}

	p.gotoAndPlay = function(frame){
		this.sprite.gotoAndStop(frame);
		this.sprite.paused = false;
	}

	p.getRect = function(){
		var rect = {x:this.x, y:this.y, width:this.width, height:this.height};
		return rect;

	}

	p.scaleSprite = function(width, height){
		this.sprite.scaleX = width/this.spriteWidth;
		this.sprite.scaleY = height/this.spriteHeight;
	}

	return AnimationSprite;

})();