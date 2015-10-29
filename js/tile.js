var glide = glide || {};

glide.Tile = (function (){
	function Tile(tileImage, position, isCollidable){
		this.initialize(tileImage, position, isCollidable);
	}
	
	var p = Tile.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	// in case image isnt the desired dimensions, this allows scaling
	p.initialize = function(tileImage, position, isCollidable, desiredWidth, desiredHeight){
		tileImage = tileImage || {};
		var spriteSheet = new createjs.SpriteSheet({
			"animations":
			{
				"static": [0, 0, false],
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
		this.Entity_initialize(spriteSheet, position, null, null, width, height, isCollidable);

		// some tiles are just there for appearance and cant collide
		this.isCollidable = isCollidable || true;

		if(desiredWidth && desiredHeight){
			// scale  image to fit desired size
			this.sprite.scaleX = desiredWidth / tileImage.width;
			this.sprite.scaleY = desiredHeight / tileImage.height;

			this.width = desiredWidth;
			this.height = desiredHeight;
		}
//		console.log(this.height);
	}


	
	return Tile;
})();

//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=723
//http://www.youtube.com/watch?v=4Bb9fAzFsuI
//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=723



