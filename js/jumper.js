var glide = glide || {};
glide.input = glide.input || [];	// array of booleans for keypresses
glide.board = glide.board || [];	// array of booleans for keypresses
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_Z = 90;		// used for speed boost
var KEYCODE_F = 70;		// used for speed boost
var horizontalSpeed = 2;

// used as a blank state
// once fall is done we set state to none
// forcing an update of the state
var NONE = -1;
var STANDING = 1;
var FORWARD = 2;
var BACKWARDS = 3;
var JUMPING = 4;
var FALLING = 5;

var LEFT = 1;
var RIGHT = 2;

var NORMAL = 1;
var MUSHROOM = 2;
var BLASTER = 3;
// block height, we want to jump over  blocks
var MAX_JUMP_HEIGHT = 70 * 6; 

var BOUNCE_HEIGHT = 100; // 100 pixels jump
var SHORT_HOP_HEIGHT = 200;

glide.Jumper = (function (){
	function Jumper(position){	
		this.initialize(position);
		this.state = STANDING;
		this.score = 0;
		this.coins = 0;
		this.lives = 5;
		this.sweets = 0;

//		this.
	};
	
	var p = Jumper.prototype = new glide.Entity;
	p.Entity_initialize = p.initialize;
	
	p.setup = function(){
		this.startingJumpY = this.x;
		this.startingJumpTime = 0;
		this.stoppingJumpHeight = 0;
		this.jumpTime = 0;
		this.boost = false;
		this.level = 1;
		this.isAlive = true;
	}

	p.initialize = function(position){
		// used to keep track of where the starting jump begins
		// and how long we jumped for.
		this.setup();

		// jumper sprite sheet information
		var frames = new Array(
			// begin walk
			// row 1
			[0,0,72,97,0,0,0],	//0
			[0,0,72,97,1,0,0],	//0
			[0,0,72,97,2,0,0],	//0
			[0,0,72,97,3,0,0],	//0
			[0,0,72,97,4,0,0],	//0
			[0,0,72,97,5,0,0],	//0
			[0,0,72,97,6,0,0],	//0
			[0,0,72,97,7,0,0],	//0
			[0,0,72,97,8,0,0],	//0
			[0,0,72,97,9,0,0],	//0
			[0,0,72,97,10,0,0],	//10

			// duck
			[0,0,69,71,11,0,0],	//11

			// standing - same as 1
			[0,0,66,92,12,0,0],	//12

			// jump
			[0,0,67,94,13,0,0],	//13

			// hurt
			[0,0,69,92,14,0,0],	//14

			//front
			[0,0,66,92,15,0,0],	//15


			// REVERSE IMAGES!!!!
			// row 1
			[0,0,72,97,16,0,0],	//16
			[0,0,72,97,17,0,0],	//17
			[0,0,72,97,18,0,0],	//18
			[0,0,72,97,19,0,0],	//19
			[0,0,72,97,20,0,0],	//20
			[0,0,72,97,21,0,0],	//21
			[0,0,72,97,22,0,0],	//22
			[0,0,72,97,23,0,0],	//23
			[0,0,72,97,24,0,0],	//24
			[0,0,72,97,25,0,0],	//25
			[0,0,72,97,26,0,0],	//26

			// duck
			[0,0,69,71,27,0,0],	//27

			// standing - same as 1
			[0,0,66,92,28,0,0],	//12

			// jump
			[0,0,67,94,29,0,0],	//13

			// hurt
			[0,0,69,92,30,0,0],	//14

			//front
			[0,0,66,92,31,0,0],	//31

			// level 2 power
			// row 1
			[0,0,70,94,32,0,0],	//0
			[0,0,70,94,33,0,0],	//0
			[0,0,70,94,34,0,0],	//0
			[0,0,70,94,35,0,0],	//0
			[0,0,70,94,36,0,0],	//0
			[0,0,70,94,37,0,0],	//0
			[0,0,70,94,38,0,0],	//0
			[0,0,70,94,39,0,0],	//0
			[0,0,70,94,40,0,0],	//0
			[0,0,70,94,41,0,0],	//0
			[0,0,70,94,42,0,0],	//10

			// duck
			[0,0,67,72,43,0,0],	//11

			// standing - same as 1
			[0,0,66,92,44,0,0],	//12

			// jump
			[0,0,66,94,45,0,0],	//13

			// hurt
			[0,0,67,92,46,0,0],	//14

			//front
			[0,0,66,92,47,0,0],	//15


			// REVERSE IMAGES!!!!
			// row 1
			[0,0,70,94,48,0,0],	//16
			[0,0,70,94,49,0,0],	//17
			[0,0,70,94,50,0,0],	//18
			[0,0,70,94,51,0,0],	//19
			[0,0,70,94,52,0,0],	//20
			[0,0,70,94,53,0,0],	//21
			[0,0,70,94,54,0,0],	//22
			[0,0,70,94,55,0,0],	//23
			[0,0,70,94,56,0,0],	//24
			[0,0,70,94,57,0,0],	//25
			[0,0,70,94,58,0,0],	//26

			// duck
			[0,0,67,72,59,0,0],	//27

			// standing - same as 1
			[0,0,66,92,60,0,0],	//12

			// jump
			[0,0,66,94,61,0,0],	//13

			// hurt
			[0,0,67,92,62,0,0],	//14

			//front
			[0,0,66,92,63,0,0],	//31

			// level 3 power
			// row 1
			[0,0,72,97,64,0,0],	//0
			[0,0,72,97,65,0,0],	//0
			[0,0,72,97,66,0,0],	//0
			[0,0,72,97,67,0,0],	//0
			[0,0,72,97,68,0,0],	//0
			[0,0,72,97,69,0,0],	//0
			[0,0,72,97,70,0,0],	//0
			[0,0,72,97,71,0,0],	//0
			[0,0,72,97,72,0,0],	//0
			[0,0,72,97,73,0,0],	//0
			[0,0,72,97,74,0,0],	//10

			// duck
			[0,0,69,71,75,0,0],	//11

			// standing - same as 1
			[0,0,66,92,76,0,0],	//12

			// jump
			[0,0,67,94,77,0,0],	//13

			// hurt
			[0,0,69,92,78,0,0],	//14

			//front
			[0,0,66,92,79,0,0],	//15


			// REVERSE IMAGES!!!!
			// row 1
			[0,0,72,97,80,0,0],	//16
			[0,0,72,97,81,0,0],	//17
			[0,0,72,97,82,0,0],	//18
			[0,0,72,97,83,0,0],	//19
			[0,0,72,97,84,0,0],	//20
			[0,0,72,97,85,0,0],	//21
			[0,0,72,97,86,0,0],	//22
			[0,0,72,97,87,0,0],	//23
			[0,0,72,97,88,0,0],	//24
			[0,0,72,97,89,0,0],	//25
			[0,0,72,97,90,0,0],	//26

			// duck
			[0,0,69,71,91,0,0],	//27

			// standing - same as 1
			[0,0,66,92,92,0,0],	//12

			// jump
			[0,0,67,94,93,0,0],	//13

			// hurt
			[0,0,69,92,94,0,0],	//14

			//front
			[0,0,66,92,95,0,0]	//31

		);


		var spriteSheet = new createjs.SpriteSheet({
			"animations":
				{
				"p1_walk": [0, 10, "p1_walk", .2],
				"p1_duck": [11, 11, false],
				"p1_stand": [12, 12, false],
				"p1_jump": [13, 13, false],
				"p1_hurt": [14, 14, false],
				"p1_front": [15, 15, false],
				"p1_walk_h": [16, 26, "p1_walk_h", .2],
				"p1_duck_h": [27, 27, false],
				"p1_stand_h": [28, 28, false],
				"p1_jump_h": [29, 29, false],
				"p1_hurt_h": [30, 30, false],
				"p1_front_h": [31, 31, false],

				"p2_walk": [32, 42, "p2_walk", .2],
				"p2_duck": [43, 43, false],
				"p2_stand": [44, 44, false],
				"p2_jump": [45, 45, false],
				"p2_hurt": [46, 46, false],
				"p2_front": [47, 47, false],
				"p2_walk_h": [48, 58, "p2_walk_h", .2],
				"p2_duck_h": [59, 59, false],
				"p2_stand_h": [60, 60, false],
				"p2_jump_h": [61, 61, false],
				"p2_hurt_h": [62, 62, false],
				"p2_front_h": [63, 63, false],

				"p3_walk": [64, 74, "p3_walk", .2],
				"p3_duck": [75, 75, false],
				"p3_stand": [76, 76, false],
				"p3_jump": [77, 77, false],
				"p3_hurt": [78, 78, false],
				"p3_front": [79, 79, false],
				"p3_walk_h": [80, 90, "p3_walk_h", .2],
				"p3_duck_h": [91, 91, false],
				"p3_stand_h": [92, 92, false],
				"p3_jump_h": [93, 93, false],
				"p3_hurt_h": [94, 94, false],
				"p3_front_h": [95, 95, false]

				},
			"images": glide.loader.getPlayerImages(),
			"frames": frames
		});

		this.width = 72;
		this.height = 97;

		var collisionOffset = {x:10, y:14, width:41, height:75};

		// changed to match tile sizes.
		var width = 68;
		var height = 97;
		// call super class constructor
		this.Entity_initialize(spriteSheet, position, frames, collisionOffset, width, height);

		this.gotoAndPlay("p"+this.level+"_front");
		this.category = "jumper";
		this.direction = RIGHT;


//		var index =  this.sprite.currentFrame;
//		this.width = this.frames[index][2] ||72;
//		this.height = this.frames[index][3] ||97;


	}

	// override normal gravity behavior
	p.handleJump = function(gameTime){
		// we dont want to do anything if we are not jumping
		if(this.state !== JUMPING){
			return;
		}
		gameTime = (gameTime)|| 1;

		// divide by a thousand to get percentage of a second
		// instead of number of miliseconds
		this.movementVector.y = -(MAX_JUMP_HEIGHT * gameTime / 1000 * 2);

		// subtract time away from max jump
		this.stoppingJumpHeight -= (MAX_JUMP_HEIGHT * gameTime / 1000 * 2);

//		console.log("game time: "+gameTime);
//		console.log("Max Height: "+MAX_JUMP_HEIGHT);
//		console.log("jump change: "+MAX_JUMP_HEIGHT * gameTime / 1000 * 2);

		// if we hit our max jump, stop jumping
		// have to reverse the sign since jumping is negative
		if(this.stoppingJumpHeight <= 0){
//			console.log("my height: "+(this.y+this.movementVector.y));
//			console.log("stopheight: "+this.stoppingJumpHeight);
			this.movementVector.y = 0;
			this.state = FALLING;
			console.log("jump complete");
		}
	}


	// override normal gravity behavior
	p.applyGravity = function(gameTime){
		// we dont want to apply gravity until the jump finishes
		if(this.state === JUMPING){
			return;
		}
		gameTime = (gameTime)|| 1;
		if(this.movementVector.y < 0){
			this.movementVector.y += .5 * gameTime /15;
		}else{
			this.movementVector.y += 1.2 * gameTime /15;
		}
	}


	// similar to XNA
	p.update = function(gameTime){
		glide.board.kaka = 0;
		this.movementVector.x = 0;
		if(glide.input[KEYCODE_LEFT] === true){
			this.movementVector.x = -1;
			this.direction = LEFT;
//			console.log("vector X: "+this.movementVector.x);
		}
		if(glide.input[KEYCODE_RIGHT] === true){
			this.movementVector.x = 1;
			this.direction = RIGHT;
		}
		if(glide.input[KEYCODE_UP] === true){
			// prevent super just y forcing them to press jump button again
			glide.input[KEYCODE_UP] = false;
			// make sure we aren't falling or jumping
			if(this.isOnFirmGround()){
//				this.movementVector.y = -55;
				this.startingJumpY = this.y;
				this.jumpTime = 0;
				this.stoppingJumpHeight = MAX_JUMP_HEIGHT;
				this.state = JUMPING;
			}
//			this.movementVector.x += -2;
		}else{
			// if we are jumping provide short jump
			// when key iis released
			if(this.state === JUMPING){
//				this.state = FALLING;
//				this.movementVector.y = 0;
//				this.stoppingJumpHeight = 0;
			}
		}
		if(glide.input[KEYCODE_Z] === true){
			this.boost = true;
		}else{
			this.boost = false;
		}
		if(glide.input[KEYCODE_F] === true){
			glide.input[KEYCODE_F] = false;
			if(this.level === 3){
				glide.board.createFireball(this.getCollisionRect());
			}
		}

		if(glide.input[KEYCODE_SPACE] === true){
			// make sure we only do one bounce
			if(this.isOnFirmGround()){
				this.shortHop();
			}
		}



		// apply physics
		// set position to current X and Y
		this.position = this.getCollisionRect();
		// get old position
		this.oldPosition = this.getCollisionRect();
//		this.movementVector = {x:0, y:0};
		this.applyGravity(gameTime);
		this.applyFriction();
		
		// handle jump if we are jumping
		this.handleJump(gameTime);
		
		// update position vector
		if(this.boost){
			this.velocity.x = (this.movementVector.x * gameTime / 1000 * 350 * 2).clamp(-40,40);
			this.velocity.y = (this.movementVector.y).clamp(-40,40);
		}else{
			this.velocity.x = (this.movementVector.x * gameTime / 1000 * 350).clamp(-40,40);
			this.velocity.y = (this.movementVector.y * 1.02).clamp(-40,40);
		}
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		

		// update sprite's actual position
		this.x = this.position.x -this.collisionOffset.x;
		this.y = this.position.y - this.collisionOffset.y;
//		console.log(this.getRect().x + ", " + this.getRect().y);

		if(glide.board.collideWithTiles(this.getCollisionRect()) === true){// undo the changes
			// to see the old way
//			this.x = this.oldPosition.x;
//			this.y = this.oldPosition.y;
//			return;
			// old way over
		
//			this.position = this.oldPosition;
			// update sprite's actual position
			// Move as close as we can.
			var bounds = this.getCollisionRect();
			this.position = glide.board.WhereCanIGetTo(this.oldPosition, this.position, bounds);
			// update position vector for moving camera
			this.velocity.x = this.position.x - this.oldPosition.x;
			this.velocity.y =  this.position.y - this.oldPosition.y;
		this.x = this.position.x -this.collisionOffset.x;
		this.y = this.position.y - this.collisionOffset.y;
		}
		this.StopMovingIfBlocked();

		// check to see if we hit any blocks before moving back
		var result = glide.board.testHitBlocks(this);
		// if we hit any enemies handle here
		glide.board.hitEnemies();
		if(result){
			// in case we hit a block
			this.bump();
		}
//		console.log(this.state);
		if((this.movementVector.x === 0) && (this.movementVector.y === 0)){
			if(this.state !== STANDING){
				this.state = STANDING;
				if(this.direction === RIGHT){
					this.state = STANDING;
					this.gotoAndPlay("p"+this.level+"_stand");
//					console.log("standing right");
				}else{
					this.state = STANDING;
					this.gotoAndPlay("p"+this.level+"_stand_h");
//					console.log("standing left");
				}
			}
		}else if((this.movementVector.x > 0) && (this.movementVector.y === 0)){
			if(this.state !== FORWARD){
				this.state = FORWARD;
				this.gotoAndPlay("p"+this.level+"_walk");
//				console.log("walking right");
			}
		}else if((this.movementVector.x >= -1) && (this.movementVector.y === 0)){
			if(this.state !== FORWARD){
				this.state = FORWARD;
				this.gotoAndPlay("p"+this.level+"_walk_h");
//				console.log("walking left");
			}
		}

		// jumping and falling animations have priority
		if(this.movementVector.y === 0){
			// do nothing.
		}else if(this.movementVector.y > 0){
			// falling
//			if(this.state === FALLING){
				this.state = FALLING;
				if(this.direction === LEFT){
					this.gotoAndPlay("p"+this.level+"_hurt_h");
//					console.log("falling left");
				}else{
					this.gotoAndPlay("p"+this.level+"_hurt");
//					console.log("falling right");
				}
//			}
		}else if(this.movementVector.y < 0){
			// jumping
			if(this.state === JUMPING){
//				this.state = JUMPING;
				if(this.direction === LEFT){
					this.gotoAndPlay("p"+this.level+"_jump_h");
//					console.log("jumping left");
				}else{
					this.gotoAndPlay("p"+this.level+"_jump");
//					console.log("jumping right");
				}
			}
		}

//		console.log(this.movementVector.y);
	}

	p.hit = function(){
		this.level--;
		if(this.level === 0){
			this.level = 1;
			console.log("died");
			this.isAlive = false;
		}else{
			console.log("ouch");
			this.isCollidable = false;
		}
		this.gotoAndPlay("p"+this.level+"_hurt_h");
		that = this;
		new createjs.Tween().wait(3000).call(this.handleComplete);

	}
	var that;
	p.handleComplete = function(){
		that.isCollidable = true;		
	}

	p.powerUp = function(levelBoost){
		if(this.level < levelBoost){
			this.level = levelBoost;
		}else{
			this.storedBoot = levelBoost;
		}
	}

	p.shortHop = function(){
//		this.movementVector.y = -10;
		// bouncing and jumping is the same
		// set jump time and height
		this.jumpTime = 0;
		this.stoppingJumpHeight = SHORT_HOP_HEIGHT;
		this.state = JUMPING;
	}

	p.bounce = function(){
		//  movement vector just needs to not be positive
		// or state will be set to falling
		this.movementVector.y = -.1;
		// bouncing and jumping is the same
		// set jump time and height
		this.jumpTime = 0;
		this.stoppingJumpHeight = BOUNCE_HEIGHT;
		this.state = JUMPING;
	}

	p.spring = function(level){
//		this.startingJumpY = this.y;
		this.jumpTime = 0;
		this.stoppingJumpHeight = MAX_JUMP_HEIGHT*level;
		this.state = JUMPING;
	}

	p.bump = function(){
		this.state = FALLING;
		this.movementVector.y = 0;
		this.movementVector.x = 0;
	}

	p.isWalkingOrStand = function(){
		return (this.state === STANDING) || (this.state === FORWARD);
	}
	
	return Jumper;	
})();

/*

		if(glide.board.collideWithTiles(this.getCollisionRect()) === true){// undo the changes
			// to see the old way
//			this.x = this.oldPosition.x;
//			this.y = this.oldPosition.y;
//			return;
			// old way over
		
//			this.position = this.oldPosition;
			// update sprite's actual position
			// Move as close as we can.
			var bounds = this.getCollisionRect();
			this.position = glide.board.WhereCanIGetTo(this.oldPosition, this.position, bounds);
			// update position vector for moving camera
			this.velocity.x = this.position.x - this.oldPosition.x;
			this.velocity.y =  this.position.y - this.oldPosition.y;
			this.x = this.position.x;
			this.y = this.position.y;
		}
*/