var glide = glide || {};
glide.Loader = (function(){
	var functionToCall;
	var loader;
	var progressBar;
	function Loader(callbackFunction){
		callbackFunction = callbackFunction || console.log("bad");
		functionToCall = callbackFunction;

		manifest = [
			// worm
			{src:"img/Slime/slime_walk/slimeWalk1.png", id:"worm_walk_1"},
			{src:"img/Slime/slime_walk/slimeWalk2.png", id:"worm_walk_2"},
			{src:"img/Slime/slime_walk/slimeDead.png", id:"worm_dead"},
			{src:"img/Slime/slime_walk_rev/slimeWalk1.png", id:"worm_walk_1_rev"},
			{src:"img/Slime/slime_walk_rev/slimeWalk2.png", id:"worm_walk_2_rev"},
			{src:"img/Slime/slime_walk_rev/slimeDead.png", id:"worm_dead_rev"},
			// snail
			{src:"img/Snail/snail_walk/snailWalk1.png", id:"snail_walk_1"},
			{src:"img/Snail/snail_walk/snailWalk2.png", id:"snail_walk_2"},
			{src:"img/Snail/snail_walk/snailShell.png", id:"snail_shell"},
			{src:"img/Snail/snail_walk/snailShell_upsidedown.png", id:"snail_shell_up"},
			{src:"img/Snail/snail_walk_rev/snailWalk1.png", id:"snail_walk_1_rev"},
			{src:"img/Snail/snail_walk_rev/snailWalk2.png", id:"snail_walk_2_rev"},
			{src:"img/Snail/snail_walk_rev/snailShell.png", id:"snail_shell_rev"},
			{src:"img/Snail/snail_walk_rev/snailShell_upsidedown.png", id:"snail_shell_up_rev"},
			// Player 1 
			{src:"img/p1_walk/p1_walk01.png", id:"p1_walk01"},
			{src:"img/p1_walk/p1_walk02.png", id:"p1_walk02"},
			{src:"img/p1_walk/p1_walk03.png", id:"p1_walk03"},
			{src:"img/p1_walk/p1_walk04.png", id:"p1_walk04"},
			{src:"img/p1_walk/p1_walk05.png", id:"p1_walk05"},
			{src:"img/p1_walk/p1_walk06.png", id:"p1_walk06"},
			{src:"img/p1_walk/p1_walk07.png", id:"p1_walk07"},
			{src:"img/p1_walk/p1_walk08.png", id:"p1_walk08"},
			{src:"img/p1_walk/p1_walk09.png", id:"p1_walk09"},
			{src:"img/p1_walk/p1_walk10.png", id:"p1_walk10"},
			{src:"img/p1_walk/p1_walk11.png", id:"p1_walk11"},
			{src:"img/p1_walk/p1_duck.png", id:"p1_duck"},
			{src:"img/p1_walk/p1_stand.png", id:"p1_stand"},
			{src:"img/p1_walk/p1_jump.png", id:"p1_jump"},
			{src:"img/p1_walk/p1_hurt.png", id:"p1_hurt"},
			{src:"img/p1_walk/p1_front.png", id:"p1_front"},
			{src:"img/p1_walk/p1_falling.png", id:"p1_falling"},
			// Player 1 reverse
			{src:"img/p1_walk_rev/p1_walk01.png", id:"p1_walk01_rev"},
			{src:"img/p1_walk_rev/p1_walk02.png", id:"p1_walk02_rev"},
			{src:"img/p1_walk_rev/p1_walk03.png", id:"p1_walk03_rev"},
			{src:"img/p1_walk_rev/p1_walk04.png", id:"p1_walk04_rev"},
			{src:"img/p1_walk_rev/p1_walk05.png", id:"p1_walk05_rev"},
			{src:"img/p1_walk_rev/p1_walk06.png", id:"p1_walk06_rev"},
			{src:"img/p1_walk_rev/p1_walk07.png", id:"p1_walk07_rev"},
			{src:"img/p1_walk_rev/p1_walk08.png", id:"p1_walk08_rev"},
			{src:"img/p1_walk_rev/p1_walk09.png", id:"p1_walk09_rev"},
			{src:"img/p1_walk_rev/p1_walk10.png", id:"p1_walk10_rev"},
			{src:"img/p1_walk_rev/p1_walk11.png", id:"p1_walk11_rev"},
			{src:"img/p1_walk_rev/p1_duck.png", id:"p1_duck_rev"},
			{src:"img/p1_walk_rev/p1_stand.png", id:"p1_stand_rev"},
			{src:"img/p1_walk_rev/p1_jump.png", id:"p1_jump_rev"},
			{src:"img/p1_walk_rev/p1_hurt.png", id:"p1_hurt_rev"},
			{src:"img/p1_walk_rev/p1_front.png", id:"p1_front_rev"},
			{src:"img/p1_walk_rev/p1_falling.png", id:"p1_falling_rev"},

			// Player 2
			{src:"img/p2_walk/p2_walk01.png", id:"p2_walk01"},
			{src:"img/p2_walk/p2_walk02.png", id:"p2_walk02"},
			{src:"img/p2_walk/p2_walk03.png", id:"p2_walk03"},
			{src:"img/p2_walk/p2_walk04.png", id:"p2_walk04"},
			{src:"img/p2_walk/p2_walk05.png", id:"p2_walk05"},
			{src:"img/p2_walk/p2_walk06.png", id:"p2_walk06"},
			{src:"img/p2_walk/p2_walk07.png", id:"p2_walk07"},
			{src:"img/p2_walk/p2_walk08.png", id:"p2_walk08"},
			{src:"img/p2_walk/p2_walk09.png", id:"p2_walk09"},
			{src:"img/p2_walk/p2_walk10.png", id:"p2_walk10"},
			{src:"img/p2_walk/p2_walk11.png", id:"p2_walk11"},
			{src:"img/p2_walk/p2_duck.png", id:"p2_duck"},
			{src:"img/p2_walk/p2_stand.png", id:"p2_stand"},
			{src:"img/p2_walk/p2_jump.png", id:"p2_jump"},
			{src:"img/p2_walk/p2_hurt.png", id:"p2_hurt"},
			{src:"img/p2_walk/p2_front.png", id:"p2_front"},
			{src:"img/p2_walk/p2_falling.png", id:"p2_falling"},
			// Player 2 reverse
			{src:"img/p2_walk_rev/p2_walk01.png", id:"p2_walk01_rev"},
			{src:"img/p2_walk_rev/p2_walk02.png", id:"p2_walk02_rev"},
			{src:"img/p2_walk_rev/p2_walk03.png", id:"p2_walk03_rev"},
			{src:"img/p2_walk_rev/p2_walk04.png", id:"p2_walk04_rev"},
			{src:"img/p2_walk_rev/p2_walk05.png", id:"p2_walk05_rev"},
			{src:"img/p2_walk_rev/p2_walk06.png", id:"p2_walk06_rev"},
			{src:"img/p2_walk_rev/p2_walk07.png", id:"p2_walk07_rev"},
			{src:"img/p2_walk_rev/p2_walk08.png", id:"p2_walk08_rev"},
			{src:"img/p2_walk_rev/p2_walk09.png", id:"p2_walk09_rev"},
			{src:"img/p2_walk_rev/p2_walk10.png", id:"p2_walk10_rev"},
			{src:"img/p2_walk_rev/p2_walk11.png", id:"p2_walk11_rev"},
			{src:"img/p2_walk_rev/p2_duck.png", id:"p2_duck_rev"},
			{src:"img/p2_walk_rev/p2_stand.png", id:"p2_stand_rev"},
			{src:"img/p2_walk_rev/p2_jump.png", id:"p2_jump_rev"},
			{src:"img/p2_walk_rev/p2_hurt.png", id:"p2_hurt_rev"},
			{src:"img/p2_walk_rev/p2_front.png", id:"p2_front_rev"},
			{src:"img/p2_walk_rev/p2_falling.png", id:"p2_falling_rev"},

			// Player 3
			{src:"img/p3_walk/p3_walk01.png", id:"p3_walk01"},
			{src:"img/p3_walk/p3_walk02.png", id:"p3_walk02"},
			{src:"img/p3_walk/p3_walk03.png", id:"p3_walk03"},
			{src:"img/p3_walk/p3_walk04.png", id:"p3_walk04"},
			{src:"img/p3_walk/p3_walk05.png", id:"p3_walk05"},
			{src:"img/p3_walk/p3_walk06.png", id:"p3_walk06"},
			{src:"img/p3_walk/p3_walk07.png", id:"p3_walk07"},
			{src:"img/p3_walk/p3_walk08.png", id:"p3_walk08"},
			{src:"img/p3_walk/p3_walk09.png", id:"p3_walk09"},
			{src:"img/p3_walk/p3_walk10.png", id:"p3_walk10"},
			{src:"img/p3_walk/p3_walk11.png", id:"p3_walk11"},
			{src:"img/p3_walk/p3_duck.png", id:"p3_duck"},
			{src:"img/p3_walk/p3_stand.png", id:"p3_stand"},
			{src:"img/p3_walk/p3_jump.png", id:"p3_jump"},
			{src:"img/p3_walk/p3_hurt.png", id:"p3_hurt"},
			{src:"img/p3_walk/p3_front.png", id:"p3_front"},
			{src:"img/p3_walk/p3_falling.png", id:"p3_falling"},
			// Player 3 reverse
			{src:"img/p3_walk_rev/p3_walk01.png", id:"p3_walk01_rev"},
			{src:"img/p3_walk_rev/p3_walk02.png", id:"p3_walk02_rev"},
			{src:"img/p3_walk_rev/p3_walk03.png", id:"p3_walk03_rev"},
			{src:"img/p3_walk_rev/p3_walk04.png", id:"p3_walk04_rev"},
			{src:"img/p3_walk_rev/p3_walk05.png", id:"p3_walk05_rev"},
			{src:"img/p3_walk_rev/p3_walk06.png", id:"p3_walk06_rev"},
			{src:"img/p3_walk_rev/p3_walk07.png", id:"p3_walk07_rev"},
			{src:"img/p3_walk_rev/p3_walk08.png", id:"p3_walk08_rev"},
			{src:"img/p3_walk_rev/p3_walk09.png", id:"p3_walk09_rev"},
			{src:"img/p3_walk_rev/p3_walk10.png", id:"p3_walk10_rev"},
			{src:"img/p3_walk_rev/p3_walk11.png", id:"p3_walk11_rev"},
			{src:"img/p3_walk_rev/p3_duck.png", id:"p3_duck_rev"},
			{src:"img/p3_walk_rev/p3_stand.png", id:"p3_stand_rev"},
			{src:"img/p3_walk_rev/p3_jump.png", id:"p3_jump_rev"},
			{src:"img/p3_walk_rev/p3_hurt.png", id:"p3_hurt_rev"},
			{src:"img/p3_walk_rev/p3_front.png", id:"p3_front_rev"},
			{src:"img/p3_walk_rev/p3_falling.png", id:"p3_falling_rev"},


			// box wall
			{src:"img/Tiles/boxAlt.png", id:"boxAlt"},
			{src:"img/Tiles/brickWall.png", id:"brickWall"},

			// item boxes
			{src:"img/Tiles/box.png", id:"box"},
			{src:"img/Tiles/boxCoin.png", id:"coinBox"},
			{src:"img/Tiles/boxCoin_disabled.png", id:"coinBoxDisabled"},
			{src:"img/Tiles/boxItem.png", id:"boxItem"},
			{src:"img/Tiles/boxItem_disabled.png", id:"boxItem_disabled"},
			{src:"img/Tiles/boxCoinAlt.png", id:"boxCoinAlt"},
			{src:"img/Tiles/boxCoinAlt_disabled.png", id:"boxCoinAlt_disabled"},

			// Mushrooms
			{src:"img/Items/mushroomRed.png", id:"mushroomRed"},
			{src:"img/Items/mushroomBrown.png", id:"mushroomBrown"},

			// gold coin
			{src:"img/Items/coinGold.png", id:"coinGold"},
			// exit sign
			{src:"img/Tiles/signExit.png", id:"exitSign"},
			// sky
			{src:"img/sky1.png", id:"sky"},

			// tiles
			// grass
			{src:"img/Tiles/grassLeft.png", id:"grassLeft"},
			{src:"img/Tiles/grassMid.png", id:"grassMid"},
			{src:"img/Tiles/grassRight.png", id:"grassRight"},
			{src:"img/Tiles/grassCenter.png", id:"grassCenter"},

			{src:"img/Tiles/stoneLeft.png", id:"stoneLeft"},
			{src:"img/Tiles/stoneMid.png", id:"stoneMid"},
			{src:"img/Tiles/stoneRight.png", id:"stoneRight"},
			{src:"img/Tiles/stoneCenter.png", id:"stoneCenter"},

			{src:"img/Tiles/snowLeft.png", id:"snowLeft"},
			{src:"img/Tiles/snowMid.png", id:"snowMid"},
			{src:"img/Tiles/snowRight.png", id:"snowRight"},
			{src:"img/Tiles/snowCenter.png", id:"snowCenter"},

			{src:"img/Tiles/sandLeft.png", id:"sandLeft"},
			{src:"img/Tiles/sandMid.png", id:"sandMid"},
			{src:"img/Tiles/sandRight.png", id:"sandRight"},
			{src:"img/Tiles/sandCenter.png", id:"sandCenter"},

			{src:"img/Tiles/castleLeft.png", id:"castleLeft"},
			{src:"img/Tiles/castleMid.png", id:"castleMid"},
			{src:"img/Tiles/castleRight.png", id:"castleRight"},
			{src:"img/Tiles/castleCenter.png", id:"castleCenter"},

			{src:"img/Tiles/dirtLeft.png", id:"dirtLeft"},
			{src:"img/Tiles/dirtMid.png", id:"dirtMid"},
			{src:"img/Tiles/dirtRight.png", id:"dirtRight"},
			{src:"img/Tiles/dirtCenter.png", id:"dirtCenter"},

			{src:"img/Tiles/sandLeft.png", id:"sandLeft"},
			{src:"img/Tiles/sandMid.png", id:"sandMid"},
			{src:"img/Tiles/sandRight.png", id:"sandRight"},
			{src:"img/Tiles/sandCenter.png", id:"sandCenter"},

			// Extended tiles - used the same way, just in different folder
			{src:"img/Tiles_Extended/cakeLeft.png", id:"cakeLeft"},
			{src:"img/Tiles_Extended/cakeMid.png", id:"cakeMid"},
			{src:"img/Tiles_Extended/cakeRight.png", id:"cakeRight"},
			{src:"img/Tiles_Extended/cakeCenter.png", id:"cakeCenter"},

			{src:"img/Tiles_Extended/chocoLeft.png", id:"chocoLeft"},
			{src:"img/Tiles_Extended/chocoMid.png", id:"chocoMid"},
			{src:"img/Tiles_Extended/chocoRight.png", id:"chocoRight"},
			{src:"img/Tiles_Extended/chocoCenter.png", id:"chocoCenter"},

			{src:"img/Tiles_Extended/tundraLeft.png", id:"tundraLeft"},
			{src:"img/Tiles_Extended/tundraMid.png", id:"tundraMid"},
			{src:"img/Tiles_Extended/tundraRight.png", id:"tundraRight"},
			{src:"img/Tiles_Extended/tundraCenter.png", id:"tundraCenter"},

			// testy begin
			{src:"img/Tiles_Extended/cakeHillRight.png", id:"cakeHillRight"},
			{src:"img/Tiles_Extended/cakeHillRight2.png", id:"cakeHillRight2"},
			// test end

			// random ice block
			{src:"img/Tiles_Extended/iceBlock.png", id:"iceBlock"}, 

			// ice water tiles
			{src:"img/Tiles_Extended/iceWater.png", id:"iceWater"},
			{src:"img/Tiles_Extended/iceWaterDeep.png", id:"iceWaterDeep"},
			{src:"img/Tiles_Extended/iceWaterDeepStars.png", id:"iceWaterDeepStars"},
			{src:"img/Tiles_Extended/iceWaterMid.png", id:"iceWaterMid"},

			// ice water Alt tiles
			{src:"img/Tiles_Extended/iceWaterAlt.png", id:"iceWaterAlt"},
			{src:"img/Tiles_Extended/iceWaterDeepAlt.png", id:"iceWaterDeepAlt"},
			{src:"img/Tiles_Extended/iceWaterDeepStarsAlt.png", id:"iceWaterDeepStarsAlt"},
			{src:"img/Tiles_Extended/iceWaterMidAlt.png", id:"iceWaterMidAlt"},

			// random bush
			{src:"img/Items_Extended/bush.png", id:"bush"},

			// door - may be used for hidden stages - for now just decoration
			{src:"img/Items_Extended/doorOpen.png", id:"doorOpen"},
			{src:"img/Items_Extended/doorOpenTop.png", id:"doorOpenTop"},

			// Brown mushroom 1
			{src:"img/Items_Extended/shroomBrownLeft.png", id:"shroomBrownLeft"},
			{src:"img/Items_Extended/shroomBrownMid.png", id:"shroomBrownMid"},
			{src:"img/Items_Extended/shroomBrownMidAlt.png", id:"shroomBrownMidAlt"},
			{src:"img/Items_Extended/shroomBrownRight.png", id:"shroomBrownRight"},

			// Brown mushroom 2 - Alt
			// CAREFUL!!!!!!!! THE ID NAMING ISNT CONSISTEN WITH THIS ONE!
			{src:"img/Items_Extended/shroomBrownAltLeft.png", id:"shroomBrownAltLeft"},
			{src:"img/Items_Extended/shroomBrownAltMidAlt.png", id:"shroomBrownAltMidAlt"},
			{src:"img/Items_Extended/shroomBrownAltMid.png", id:"shroomBrownAltMid"},
			{src:"img/Items_Extended/shroomBrownAltRight.png", id:"shroomBrownAltRight"},

			// Brown mushroom 3 - spotted
			{src:"img/Items_Extended/shroomBrownSpotsLeft.png", id:"shroomBrownSpotsLeft"},
			{src:"img/Items_Extended/shroomBrownSpotsMid.png", id:"shroomBrownSpotsMid"},
			{src:"img/Items_Extended/shroomBrownSpotsMidAlt.png", id:"shroomBrownSpotsMidAlt"},
			{src:"img/Items_Extended/shroomBrownSpotsRight.png", id:"shroomBrownSpotsRight"},

			// Brown mushroom 4 - spotted Alt
			{src:"img/Items_Extended/shroomBrownAltSpotsLeft.png", id:"shroomBrownAltSpotsLeft"},
			{src:"img/Items_Extended/shroomBrownAltSpotsMid.png", id:"shroomBrownAltSpotsMid"},
			{src:"img/Items_Extended/shroomBrownAltSpotsMidAlt.png", id:"shroomBrownAltSpotsMidAlt"},
			{src:"img/Items_Extended/shroomBrownAltSpotsRight.png", id:"shroomBrownAltSpotsRight"},

			// Red mushroom 1
			{src:"img/Items_Extended/shroomRedLeft.png", id:"shroomRedLeft"},
			{src:"img/Items_Extended/shroomRedMid.png", id:"shroomRedMid"},
			{src:"img/Items_Extended/shroomRedMidAlt.png", id:"shroomRedMidAlt"},
			{src:"img/Items_Extended/shroomRedRight.png", id:"shroomRedRight"},

			// Red mushroom 2 - alt
			{src:"img/Items_Extended/shroomRedAltLeft.png", id:"shroomRedAltLeft"},
			{src:"img/Items_Extended/shroomRedAltMid.png", id:"shroomRedAltMid"},
			{src:"img/Items_Extended/shroomRedAltMidAlt.png", id:"shroomRedAltMidAlt"},
			{src:"img/Items_Extended/shroomRedAltRight.png", id:"shroomRedAltRight"},

			// Tan mushroom 1
			{src:"img/Items_Extended/shroomTanLeft.png", id:"shroomTanLeft"},
			{src:"img/Items_Extended/shroomTanMid.png", id:"shroomTanMid"},
			{src:"img/Items_Extended/shroomTanMidAlt.png", id:"shroomTanMidAlt"},
			{src:"img/Items_Extended/shroomTanRight.png", id:"shroomTanRight"},

			// Tan mushroom 2 - alt
			{src:"img/Items_Extended/shroomTanAltLeft.png", id:"shroomTanAltLeft"},
			{src:"img/Items_Extended/shroomTanAltMid.png", id:"shroomTanAltMid"},
			{src:"img/Items_Extended/shroomTanAltMidAlt.png", id:"shroomTanAltMidAlt"},
			{src:"img/Items_Extended/shroomTanAltRight.png", id:"shroomTanAltRight"},

			// Spikes
			{src:"img/Items_Extended/spikesTop.png", id:"spikesTop"},
			{src:"img/Items_Extended/spikesBottom.png", id:"spikesBottom"},
			{src:"img/Items_Extended/spikesBottomAlt.png", id:"spikesBottomAlt"},

			// Stem Base
			{src:"img/Items_Extended/stemBaseAlt.png", id:"stemBaseAlt"},
			//  Stem Shroom
			{src:"img/Items_Extended/stemShroom.png", id:"stemShroom"},
			// Stem Crown
			{src:"img/Items_Extended/stemCrown.png", id:"stemCrown"},
			// Stem Vine
			{src:"img/Items_Extended/stemVine.png", id:"stemVine"},
			// Stem Top
			{src:"img/Items_Extended/stemTop.png", id:"stemTop"},
			// Stem Top - Alt
			{src:"img/Items_Extended/stemTopAlt.png", id:"stemTopAlt"},

			// Tree build
			// Tree trunk
			{src:"img/Items_Extended/treeTrunkBottom.png", id:"treeTrunkBottom"},

			// Tree Left sides
			{src:"img/Items_Extended/treeBranchesLeft.png", id:"treeBranchesLeft"},
			{src:"img/Items_Extended/treeBranchesLeftAlt.png", id:"treeBranchesLeftAlt"},
			{src:"img/Items_Extended/treeBranchesSnowLeft.png", id:"treeBranchesSnowLeft"},
			{src:"img/Items_Extended/treeBranchesLeftSnowAlt.png", id:"treeBranchesLeftSnowAlt"},

			// Tre center
			{src:"img/Items_Extended/tree.png", id:"tree"},

			// Tree Right Sides
			{src:"img/Items_Extended/treeBranchesRight.png", id:"treeBranchesRight"},
			{src:"img/Items_Extended/treeBranchesRightAlt.png", id:"treeBranchesRightAlt"},
			{src:"img/Items_Extended/treeBranchesSnowRight.png", id:"treeBranchesSnowRight"},
			{src:"img/Items_Extended/treeBranchesRightSnowAlt.png", id:"treeBranchesRightSnowAlt"},

			// Tree Tops
			{src:"img/Items_Extended/treeTop.png", id:"treeTop"},
			{src:"img/Items_Extended/treeTopSnow.png", id:"treeTopSnow"},

			// Items - regular folder
			//Spring
			{src:"img/Items/springboardDown.png", id:"springboardDown"},
			{src:"img/Items/springboardUp.png", id:"springboardUp"},

			// Backgrounds
			{src:"img/Backgrounds/bg1.jpg", id:"bg1"},
			{src:"img/Backgrounds/bg2.jpg", id:"bg2"},
			{src:"img/Backgrounds/bg3.jpg", id:"bg3"},
//			{src:"img/Backgrounds/bg4.jpg", id:"bg4"},
//			{src:"img/Backgrounds/bg5.jpg", id:"bg5"},
//			{src:"img/Backgrounds/bg6.jpg", id:"bg6"},
//			{src:"img/Backgrounds/bg7.jpg", id:"bg7"},
//			{src:"img/Backgrounds/bg8.jpg", id:"bg8"},
//			{src:"img/Backgrounds/bg9.jpg", id:"bg9"},
//			{src:"img/Backgrounds/bg10.jpg", id:"bg10"},
//			{src:"img/Backgrounds/bg11.jpg", id:"bg11"},
//			{src:"img/Backgrounds/bg12.jpg", id:"bg12"},
//			{src:"img/Backgrounds/bg13.jpg", id:"bg13"},
//			{src:"img/Backgrounds/bg14.jpg", id:"bg14"},

			// Candy Images
			{src:"img/Candy_Tiles/candyBlue.png", id:"candyBlue"},
			{src:"img/Candy_Tiles/candyGreen.png", id:"candyGreen"},
			{src:"img/Candy_Tiles/candyRed.png", id:"candyRed"},
			{src:"img/Candy_Tiles/candyYellow.png", id:"candyYellow"},
			{src:"img/Candy_Tiles/canePink.png", id:"canePink"},
			{src:"img/Candy_Tiles/canePinkTop.png", id:"canePinkTop"},
			{src:"img/Candy_Tiles/canePinkTopAlt.png", id:"canePinkTopAlt"},
			{src:"img/Candy_Tiles/cherry.png", id:"cherry"},
			{src:"img/Candy_Tiles/cookieBrown.png", id:"cookieBrown"},
			{src:"img/Candy_Tiles/cookieChoco.png", id:"cookieChoco"},
			{src:"img/Candy_Tiles/cookiePink.png", id:"cookiePink"},
			{src:"img/Candy_Tiles/creamChoco.png", id:"creamChoco"},
			{src:"img/Candy_Tiles/creamMocca.png", id:"creamMocca"},
			{src:"img/Candy_Tiles/creamPink.png", id:"creamPink"},
			{src:"img/Candy_Tiles/creamVanilla.png", id:"creamVanilla"},
			{src:"img/Candy_Tiles/cupCake.png", id:"cupCake"},
			{src:"img/Candy_Tiles/lollipopBase.png", id:"lollipopBase"},
			{src:"img/Candy_Tiles/lollipopBaseBeige.png", id:"lollipopBaseBeige"},
			{src:"img/Candy_Tiles/lollipopBaseBrown.png", id:"lollipopBaseBrown"},
			{src:"img/Candy_Tiles/lollipopFruitGreen.png", id:"lollipopFruitGreen"},
			{src:"img/Candy_Tiles/lollipopFruitRed.png", id:"lollipopFruitRed"},
			{src:"img/Candy_Tiles/lollipopFruitYellow.png", id:"lollipopFruitYellow"},
			{src:"img/Candy_Tiles/lollipopGreen.png", id:"lollipopGreen"},
			{src:"img/Candy_Tiles/lollipopRed.png", id:"lollipopRed"},
			{src:"img/Candy_Tiles/lollipopWhiteGreen.png", id:"lollipopWhiteGreen"},
			{src:"img/Candy_Tiles/lollipopWhiteRed.png", id:"lollipopWhiteRed"},
			{src:"img/Candy_Tiles/waffleChoco.png", id:"waffleChoco"},
			{src:"img/Candy_Tiles/wafflePink.png", id:"wafflePink"},
			{src:"img/Candy_Tiles/waffleWhite.png", id:"waffleWhite"},

			// floating platforms
			{src:"img/Floating_Platforms/cakeHalf.png", id:"cakeHalf"},
			{src:"img/Floating_Platforms/cakeHalfAlt.png", id:"cakeHalfAlt"},
			{src:"img/Floating_Platforms/cakeHalfAltLeft.png", id:"cakeHalfAltLeft"},
			{src:"img/Floating_Platforms/cakeHalfAltMid.png", id:"cakeHalfAltMid"},
			{src:"img/Floating_Platforms/cakeHalfAltRight.png", id:"cakeHalfAltRight"},
			{src:"img/Floating_Platforms/cakeHalfLeft.png", id:"cakeHalfLeft"},
			{src:"img/Floating_Platforms/cakeHalfMid.png", id:"cakeHalfMid"},
			{src:"img/Floating_Platforms/cakeHalfRight.png", id:"cakeHalfRight"},
			{src:"img/Floating_Platforms/castleHalf.png", id:"castleHalf"},
			{src:"img/Floating_Platforms/castleHalfLeft.png", id:"castleHalfLeft"},
			{src:"img/Floating_Platforms/castleHalfMid.png", id:"castleHalfMid"},
			{src:"img/Floating_Platforms/castleHalfRight.png", id:"castleHalfRight"},
			{src:"img/Floating_Platforms/chocoHalf.png", id:"chocoHalf"},
			{src:"img/Floating_Platforms/chocoHalfAlt.png", id:"chocoHalfAlt"},
			{src:"img/Floating_Platforms/chocoHalfAltLeft.png", id:"chocoHalfAltLeft"},
			{src:"img/Floating_Platforms/chocoHalfAltMid.png", id:"chocoHalfAltMid"},
			{src:"img/Floating_Platforms/chocoHalfAltRight.png", id:"chocoHalfAltRight"},
			{src:"img/Floating_Platforms/chocoHalfLeft.png", id:"chocoHalfLeft"},
			{src:"img/Floating_Platforms/chocoHalfMid.png", id:"chocoHalfMid"},
			{src:"img/Floating_Platforms/chocoHalfRight.png", id:"chocoHalfRight"},
			{src:"img/Floating_Platforms/dirtHalf.png", id:"dirtHalf"},
			{src:"img/Floating_Platforms/dirtHalfLeft.png", id:"dirtHalfLeft"},
			{src:"img/Floating_Platforms/dirtHalfMid.png", id:"dirtHalfMid"},
			{src:"img/Floating_Platforms/dirtHalfRight.png", id:"dirtHalfRight"},
			{src:"img/Floating_Platforms/grassHalf.png", id:"grassHalf"},
			{src:"img/Floating_Platforms/grassHalfLeft.png", id:"grassHalfLeft"},
			{src:"img/Floating_Platforms/grassHalfMid.png", id:"grassHalfMid"},
			{src:"img/Floating_Platforms/grassHalfRight.png", id:"grassHalfRight"},
			{src:"img/Floating_Platforms/iceBlockHalf.png", id:"iceBlockHalf"},
			{src:"img/Floating_Platforms/iceBlockHalfAlt.png", id:"iceBlockHalfAlt"},
			{src:"img/Floating_Platforms/sandHalf.png", id:"sandHalf"},
			{src:"img/Floating_Platforms/sandHalfLeft.png", id:"sandHalfLeft"},
			{src:"img/Floating_Platforms/sandHalfMid.png", id:"sandHalfMid"},
			{src:"img/Floating_Platforms/sandHalfRight.png", id:"sandHalfRight"},
			{src:"img/Floating_Platforms/snowHalf.png", id:"snowHalf"},
			{src:"img/Floating_Platforms/snowHalfLeft.png", id:"snowHalfLeft"},
			{src:"img/Floating_Platforms/snowHalfMid.png", id:"snowHalfMid"},
			{src:"img/Floating_Platforms/snowHalfRight.png", id:"snowHalfRight"},
			{src:"img/Floating_Platforms/stoneHalf.png", id:"stoneHalf"},
			{src:"img/Floating_Platforms/stoneHalfLeft.png", id:"stoneHalfLeft"},
			{src:"img/Floating_Platforms/stoneHalfMid.png", id:"stoneHalfMid"},
			{src:"img/Floating_Platforms/stoneHalfRight.png", id:"stoneHalfRight"},
			{src:"img/Floating_Platforms/tundraHalf.png", id:"tundraHalf"},
			{src:"img/Floating_Platforms/tundraHalfLeft.png", id:"tundraHalfLeft"},
			{src:"img/Floating_Platforms/tundraHalfMid.png", id:"tundraHalfMid"},
			{src:"img/Floating_Platforms/tundraHalfRight.png", id:"tundraHalfRight"},

			// fireball
			{src:"img/Items/fireball.png", id:"fireball"},

			// bee
			{src:"img/Enemy Sets/Bee/bee/bee.png", id:"bee"},
			{src:"img/Enemy Sets/Bee/bee/bee_dead.png", id:"bee_dead"},
			{src:"img/Enemy Sets/Bee/bee/bee_fly.png", id:"bee_fly"},
			{src:"img/Enemy Sets/Bee/bee/bee_hit.png", id:"bee_hit"},
			// bee_rev
			{src:"img/Enemy Sets/Bee/bee_rev/bee.png", id:"bee_h"},
			{src:"img/Enemy Sets/Bee/bee_rev/bee_dead.png", id:"bee_dead_h"},
			{src:"img/Enemy Sets/Bee/bee_rev/bee_fly.png", id:"bee_fly_h"},
			{src:"img/Enemy Sets/Bee/bee_rev/bee_hit.png", id:"bee_hit_h"},

		];
		progressBar = new createjs.Shape();
		glide.stage.addChild(progressBar);
		loader = new createjs.LoadQueue(false);
		loader.on("progress", this.handleOverallProgress);
		loader.addEventListener("complete", this.handleComplete);
		loader.loadManifest(manifest);
		this.loader = loader;
	};

	var p = Loader.prototype; 

	p.getTextureImage = function(textureName){
		return this.loader.getResult(textureName);
	}

	p.getCoinBoxImages = function(){
		var coinImages = [
			this.loader.getResult("coinBox"),
			this.loader.getResult("coinBoxDisabled"),
		];
		return coinImages;
	}

	p.getBeeImages = function(){
		var springImages = [
			this.loader.getResult("bee"),
			this.loader.getResult("bee_fly"),
			this.loader.getResult("bee_hit"),
			this.loader.getResult("bee_dead"),
			this.loader.getResult("bee_h"),
			this.loader.getResult("bee_fly_h"),
			this.loader.getResult("bee_hit_h"),
			this.loader.getResult("bee_dead_h"),
		];
		return springImages;
	}

	p.getSpringImages = function(){
		var springImages = [
			this.loader.getResult("springboardDown"),
			this.loader.getResult("springboardUp"),
		];
		return springImages;
	}

	p.getItemBoxImages = function(){
		var coinImages = [
			this.loader.getResult("boxItem"),
			this.loader.getResult("boxItem_disabled"),
		];
		return coinImages;
	}

	p.getCoinBrickImages = function(){
		var coinImages = [
			this.loader.getResult("boxCoinAlt"),
			this.loader.getResult("boxCoinAlt_disabled"),
		];
		return coinImages;
	}

	// Overall progress handler
	p.handleOverallProgress = function(event) {
		var height = glide.stage.canvas.height;
		var width = glide.stage.canvas.width;
//		this.progressBar = new createjs.Shape();
		progressBar.graphics.clear();
		progressBar.graphics.beginStroke("#F00").drawRect(0, height/2, width, 30);
		progressBar.graphics.beginFill("#F0F").drawRect(1, height/2, width * loader.progress - 2, 30);
		glide.stage.update();
	}


	p.getWormImages = function(){
		var wormImages =[
			this.loader.getResult("worm_walk_1"),
			this.loader.getResult("worm_walk_2"),
			this.loader.getResult("worm_dead"),
			this.loader.getResult("worm_walk_1_rev"),
			this.loader.getResult("worm_walk_2_rev"),
			this.loader.getResult("worm_dead_rev"),
		];
		return wormImages;
	}

	p.getSnailImages = function(){
		var wormImages =[
			this.loader.getResult("snail_walk_1"),
			this.loader.getResult("snail_walk_2"),
			this.loader.getResult("snail_shell"),
			this.loader.getResult("snail_shell_up"),
			this.loader.getResult("snail_walk_1_rev"),
			this.loader.getResult("snail_walk_2_rev"),
			this.loader.getResult("snail_shell_rev"),
			this.loader.getResult("snail_shell_up_rev"),
		];
		return wormImages;
	}

	p.getPlayerImages = function(){
		var playerImages =[
		// Player 1 norm
			this.loader.getResult("p1_walk01"),
			this.loader.getResult("p1_walk02"),
			this.loader.getResult("p1_walk03"),
			this.loader.getResult("p1_walk04"),
			this.loader.getResult("p1_walk05"),
			this.loader.getResult("p1_walk06"),
			this.loader.getResult("p1_walk07"),
			this.loader.getResult("p1_walk08"),
			this.loader.getResult("p1_walk09"),
			this.loader.getResult("p1_walk10"),
			this.loader.getResult("p1_walk11"),
			this.loader.getResult("p1_duck"),
			this.loader.getResult("p1_stand"),
			this.loader.getResult("p1_jump"),
			this.loader.getResult("p1_hurt"),
			this.loader.getResult("p1_front"),
//			this.loader.getResult("p1_falling"),
		// player 1 reverse
			this.loader.getResult("p1_walk01_rev"),
			this.loader.getResult("p1_walk02_rev"),
			this.loader.getResult("p1_walk03_rev"),
			this.loader.getResult("p1_walk04_rev"),
			this.loader.getResult("p1_walk05_rev"),
			this.loader.getResult("p1_walk06_rev"),
			this.loader.getResult("p1_walk07_rev"),
			this.loader.getResult("p1_walk08_rev"),
			this.loader.getResult("p1_walk09_rev"),
			this.loader.getResult("p1_walk10_rev"),
			this.loader.getResult("p1_walk11_rev"),
			this.loader.getResult("p1_duck_rev"),
			this.loader.getResult("p1_stand_rev"),
			this.loader.getResult("p1_jump_rev"),
			this.loader.getResult("p1_hurt_rev"),
			this.loader.getResult("p1_front_rev"),
//			this.loader.getResult("p1_falling_rev"),


			// Player 2 
		// Player 2 norm
			this.loader.getResult("p2_walk01"),
			this.loader.getResult("p2_walk02"),
			this.loader.getResult("p2_walk03"),
			this.loader.getResult("p2_walk04"),
			this.loader.getResult("p2_walk05"),
			this.loader.getResult("p2_walk06"),
			this.loader.getResult("p2_walk07"),
			this.loader.getResult("p2_walk08"),
			this.loader.getResult("p2_walk09"),
			this.loader.getResult("p2_walk10"),
			this.loader.getResult("p2_walk11"),
			this.loader.getResult("p2_duck"),
			this.loader.getResult("p2_stand"),
			this.loader.getResult("p2_jump"),
			this.loader.getResult("p2_hurt"),
			this.loader.getResult("p2_front"),
//			this.loader.getResult("p2_falling"),
		// player 2 reverse
			this.loader.getResult("p2_walk01_rev"),
			this.loader.getResult("p2_walk02_rev"),
			this.loader.getResult("p2_walk03_rev"),
			this.loader.getResult("p2_walk04_rev"),
			this.loader.getResult("p2_walk05_rev"),
			this.loader.getResult("p2_walk06_rev"),
			this.loader.getResult("p2_walk07_rev"),
			this.loader.getResult("p2_walk08_rev"),
			this.loader.getResult("p2_walk09_rev"),
			this.loader.getResult("p2_walk10_rev"),
			this.loader.getResult("p2_walk11_rev"),
			this.loader.getResult("p2_duck_rev"),
			this.loader.getResult("p2_stand_rev"),
			this.loader.getResult("p2_jump_rev"),
			this.loader.getResult("p2_hurt_rev"),
			this.loader.getResult("p2_front_rev"),
//			this.loader.getResult("p2_falling_rev"),

		// Player 3 norm
			this.loader.getResult("p3_walk01"),
			this.loader.getResult("p3_walk02"),
			this.loader.getResult("p3_walk03"),
			this.loader.getResult("p3_walk04"),
			this.loader.getResult("p3_walk05"),
			this.loader.getResult("p3_walk06"),
			this.loader.getResult("p3_walk07"),
			this.loader.getResult("p3_walk08"),
			this.loader.getResult("p3_walk09"),
			this.loader.getResult("p3_walk10"),
			this.loader.getResult("p3_walk11"),
			this.loader.getResult("p3_duck"),
			this.loader.getResult("p3_stand"),
			this.loader.getResult("p3_jump"),
			this.loader.getResult("p3_hurt"),
			this.loader.getResult("p3_front"),
//			this.loader.getResult("p3_falling"),
		// player 3 reverse
			this.loader.getResult("p3_walk01_rev"),
			this.loader.getResult("p3_walk02_rev"),
			this.loader.getResult("p3_walk03_rev"),
			this.loader.getResult("p3_walk04_rev"),
			this.loader.getResult("p3_walk05_rev"),
			this.loader.getResult("p3_walk06_rev"),
			this.loader.getResult("p3_walk07_rev"),
			this.loader.getResult("p3_walk08_rev"),
			this.loader.getResult("p3_walk09_rev"),
			this.loader.getResult("p3_walk10_rev"),
			this.loader.getResult("p3_walk11_rev"),
			this.loader.getResult("p3_duck_rev"),
			this.loader.getResult("p3_stand_rev"),
			this.loader.getResult("p3_jump_rev"),
			this.loader.getResult("p3_hurt_rev"),
			this.loader.getResult("p3_front_rev"),
//			this.loader.getResult("p3_falling_rev"),

		];
		return playerImages;
	}

	p.handleComplete = function() {

//		var groundImg = loader.getResult("ground");
//		ground = new createjs.Shape();
//		ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w+groundImg.width, groundImg.height);
//		ground.tileW = groundImg.width;
//		ground.y = h-groundImg.height;

		// give all other classes access to the loader
		// remove progress bar
		glide.stage.removeChild(progressBar);
		functionToCall();
	}

	return Loader;
})();

