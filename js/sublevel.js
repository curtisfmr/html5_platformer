var glide =  glide || {};

glide.SubLevel = (function(){
	function SubLevel(){

	}

	var p = SubLevel.prototype = glide.Level;

	p.initialize = function(){

	}

	// override when exit sign is hit
	p.stageOver = function(){
		// check for level over
		if(this.exit.intersects(glide.jumper.getRect())){
			parent.resumeGame();
		}
	}


	return SubLevel;

})();