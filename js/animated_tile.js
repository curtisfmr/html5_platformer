var glide = glide || {};

glide.AnimatedTile = (function (){
	function AnimatedTile(spriteSheet, position){
		position = position || {};
		this.position = position;		
		console.log(this.position.x);

		this.initialize(spriteSheet, position);

		//delete
		this.width =64;
		this.height = 64;
		this.scaleX = 64/24;
		this.scaleY = 64/24;

	};
	
	var p = AnimatedTile.prototype = new glide.AnimationSprite();
	p.AnimationSprite_initialize = p.initialize;
	
	p.initialize = function(spriteSheet, position){
		// call super class constructor
		this.AnimationSprite_initialize(spriteSheet, position);
	}

//--- delete!!!!!!!!!!!!!!!!
	// allows all subclasses to easily obtain their rectangle
	p.getRect = function(){
		var myRect = {x:this.x, y:this.y, width:this.width, height:this.height};
		return myRect;
	}
	
	return AnimatedTile;
})();

//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=2186
//http://www.youtube.com/watch?v=4Bb9fAzFsuI
//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=723



