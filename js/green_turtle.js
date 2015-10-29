glide.GreenTurtle = (function(){
	function GreenTurtle(position){
		this.initialize(position);
	}

	var p = GreenTurtle.prototype = new Enemy;
	p.Enemy_initialize = p.initialize;

	p.initialize = function(){
//		this.category = "GreenTurtle";
		this.spriteSheet = 

		this.Enemy_initialize(this.spriteSheet, position);
	}

	return GreenTurtle;
})();