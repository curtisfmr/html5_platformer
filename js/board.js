var glide = glide || {};
var currentLevel;
glide.Board = (function (){
	function Board(camera){
		// Array of levels
		this.levels = [];

		// load levels
		this.loadLevels();

		// current level is the first
		currentLevel = this.levels[0];
		this.camera =  camera;

		this.levelCounter = 0;
		currentLevel.startGame();
	};

	var p = Board.prototype;

	p.loadLevels = function(){
		this.levels.push(new glide.Level(level1, level1Mapping, camera, level1Sublevels));
		this.levels.push(new glide.Level(level2, level2Mapping, camera, level1Sublevels));
//		this.levels.push(new glide.Level(level3, level3Mapping, camera));
//		this.levels.push(new glide.Level(level4, level4Mapping, camera));
	}

	p.nextStage = function(){
		this.levelCounter++;
		// the % allows us to wrap arround
		var index = this.levelCounter % this.levels.length;
		currentLevel = this.levels[index];
		currentLevel.startGame();
	}
	
	p.getTilesLayer = function(){
		return currentLevel.getTilesLayer();
	}
	
	p.getTiles = function(){
		return currentLevel.getTiles();
	}
	p.WhereCanIGetTo = function(oldPosition, Position, Bounds){
		return currentLevel.WhereCanIGetTo(oldPosition, Position, Bounds);
	}

	p.collideWithTiles = function(rect){
		return currentLevel.collideWithTiles(rect);
	}

	// check to see if jumper broke any blocks
	p.testHitBlocks = function(jumper){
		return currentLevel.testHitBlocks(jumper);
	}

	p.hitEnemies = function(){
		return currentLevel.hitEnemies();
	}

	p.update = function(delta){
		currentLevel.update(delta);
		stage.update();
	}
	
		// create a mushroom at above position
	// position should be right above box that
	// created it
	p.createMushroom = function(type, position){
		currentLevel.createMushroom(type, position);
	}
	p.createFireball = function(position){
		currentLevel.createFireball(position);
	}
	return Board;
})();

//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=723
//http://www.youtube.com/watch?v=4Bb9fAzFsuI
//http://www.youtube.com/watch?feature=player_detailpage&v=GKDp8aNTbrU#t=723



