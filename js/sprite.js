var glide = glide || {};

glide.Sprite = (function(){
	function Sprite(imageTexture, position){
		this.initialize(imageTexture, position);
	};
	
	var p = Sprite.prototype = new createjs.Container();
	
	//http://www.javascriptkit.com/jsref/image.shtml
	//http://www.createjs.com/Docs/EaselJS/classes/Bitmap.html
	
	// super class' initialization
	p.Container_initialize = p.initialize;
	p.initialize = function(imageTexture, position){
		position = position || {};
		imageTexture = imageTexture || {};
		// call initialize before doing anything else
		this.Container_initialize();
		// position is a 2d vector with x and y ex.{x:21, y:12}
		this.position = position;
		this.bitmap = new createjs.Bitmap(imageTexture);
		
		// assign width and height to the size of the bitmap.
		// dimensions
		this.width = imageTexture.width;
		this.height = imageTexture.height;

		// add bitmap to self;
		// so that it can be displayed
		this.addChild(this.bitmap);
		
		// our origin will be the top left corner
		// relocate self based on the position passed in
		this.x = position.x;
		this.y = position.y;
	}

	// allows all subclasses to easily obtain their rectangle
	p.getRect = function(){
		var myRect = {x:this.x, y:this.y, width:this.width, height:this.height};
		return myRect;
	}	
	return Sprite;
})();