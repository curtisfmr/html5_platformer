/*
// tiles
// grass
"grassLeft"
"grassMid"
"grassRight"
"grassCenter"

"stoneLeft"
"stoneMid"
"stoneRight"
"stoneCenter"

"snowLeft"
"snowMid"
"snowRight"
"snowCenter"

"sandLeft"
"sandMid"
"sandRight"
"sandCenter"

"castleLeft"
"castleMid"
"castleRight"
"castleCenter"

"dirtLeft"
"dirtMid"
"dirtRight"
"dirtCenter"

"sandLeft"
"sandMid"
"sandRight"
"sandCenter"

// Extended tiles - used the same way, just in different folder
"cakeLeft"
"cakeMid"
"cakeRight"
"cakeCenter"

"chocoLeft"
"chocoMid"
"chocoRight"
"chocoCenter"

"tundraLeft"
"tundraMid"
"tundraRight"
"tundraCenter"



// random ice block
"iceBlock" 

// ice water tiles
"iceWater"
"iceWaterDeep"
"iceWaterDeepStars"
"iceWaterMid"

// ice water Alt tiles
"iceWaterAlt"
"iceWaterDeepAlt"
"iceWaterDeepStarsAlt"
"iceWaterMidAlt"

// random bush
"bush"

// door - may be used for hidden stages - for now just decoration
"doorOpen"
"doorOpenTop"

// Brown mushroom 1
"shroomBrownLeft"
"shroomBrownMid"
"shroomBrownMidAlt"
"shroomBrownRight"

// Brown mushroom 2 - Alt
// CAREFUL!!!!!!!! THE ID NAMING ISNT CONSISTEN WITH THIS ONE!
"shroomBrownAltLeft"
"shroomBrownAltMidAlt"
"shroomBrownAltMid"
"shroomBrownAltRight"

// Brown mushroom 3 - spotted
"shroomBrownSpotsLeft"
"shroomBrownSpotsMid"
"shroomBrownSpotsMidAlt"
"shroomBrownSpotsRight"

// Brown mushroom 4 - spotted Alt
"shroomBrownAltSpotsLeft"
"shroomBrownAltSpotsMid"
"shroomBrownAltSpotsMidAlt"
"shroomBrownAltSpotsRight"

// Red mushroom 1
"shroomRedLeft"
"shroomRedMid"
"shroomRedMidAlt"
"shroomRedRight"

// Red mushroom 2 - alt
"shroomRedAltLeft"
"shroomRedAltMid"
"shroomRedAltMidAlt"
"shroomRedAltRight"

// Tan mushroom 1
"shroomTanLeft"
"shroomTanMid"
"shroomTanMidAlt"
"shroomTanRight"

// Tan mushroom 2 - alt
"shroomTanAltLeft"
"shroomTanAltMid"
"shroomTanAltMidAlt"
"shroomTanAltRight"

// Spikes
"spikesTop"
"spikesBottom"
"spikesBottomAlt"

// Stem Base
"stemBaseAlt"
//  Stem Shroom
"stemShroom"
// Stem Crown
"stemCrown"
// Stem Vine
"stemVine"
// Stem Top
"stemTop"
// Stem Top - Alt
"stemTopAlt"

// Tree build
// Tree trunk
"treeTrunkBottom"

// Tree Left sides
"treeBranchesLeft"
"treeBranchesLeftAlt"
"treeBranchesSnowLeft"
"treeBranchesLeftSnowAlt"

// Tre center
"tree"

// Tree Right Sides
"treeBranchesRight"
"treeBranchesRightAlt"
"treeBranchesSnowRight"
"treeBranchesRightSnowAlt"

// Tree Tops
"treeTop"
"treeTopSnow"

// must be mapped
var nonColliableMapping = "abcdefghijklmnop";
var colliableMapping = "ABCDEFGHIJKLMNOP";

var mushroomMapping = "QRSTUV";
//var specialItems = "wxyzWXYZ";
var floatingPlatformMapping = "_=wxyz";

// cant be mapped
var specialItems = "wxyzQRSTUVWXYZ";

// cant be mapped
var candyMapping = "WXYZ|";
// these tiles shall be drawn on top of enemies and player
// to be used for like water
var drawOnTopMapping = "qrstuv";

// cant be mapped
var enemyMapping = "0123456789";
// cant be mapped
var specialItemMapping = "!@#$%^&*()";
// cant be mapped
var obstacles = ",./;'[]";

// Blocks
! - Coin Block
@ - Power Block
# - BreakableBrick
$ - CoinBrick 

// Enemies
1 - Snail
2 - Slime
3 - bee

// locations
~ - start location
` - exit sign

// Obstacles
, - Spikes

todo
finish spring evenually

Portals: - take you from a level to a sub level. like pipes in mario
they work in pairs. Each level can have 3 sub levels

portal pair 1 - curly braces
{} - { takes you from the main level. } - is the position the player returns to when exit is hit in sub level
portal pair 2 - angle brackets
<> - < takes you from the main level. > - is the position the player returns to when exit is hit in sub level
portal pair 3 - plus and minus
+- - + takes you from the main level. '-' - is the position the player returns to when exit is hit in sub level

*/


///*
var level1 = [
	"J    }  .                                                                                                              J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J           .                                                                                                          J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J         .                                                                                                            J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                   2 2                                                                                J",
	"J                !              #######    ###!                             !                                          J",
	"J       W.                                                                                                        K    J",
	"J                     - 1                                                                                        KK    J",
	"J        1  1    +       1                                    <                                                 KKK    J",
	"J  @      QRS  #!#@#         #@#              $              #$          !  !  !                 K  K          KKKK    J",
	"J          L       i              p                                                             KK  KK        KKKKK    J",
	"J          L                     nmo                                                           KKK  KKK      KKKKKK    J",
	"J  ~ , .   P ab  2                l               a    2 2       1  2 2     2  2    2 2  >    KKKK{ KKKK    KKKKKKK   `J",
	"JIIIIIIIIIIIIIIIIIIIrrrrrrrIIIIIIIIIII      IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIJ",
	"JccccccccccccccccccHsssssssHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHsssssssHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHsssssssHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHsssssssHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHIIIIIIIHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHsssssssHcccccccccH      HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccHIIIIIIIHcccccccccH  .   HccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccccccccccccccccccccHIIIIIIHccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",
	"JccccccccccccccccccccccccccccccccccccHccccccHccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccJ",

];
//*/
level1Mapping = {
	"background":"bg1",
	"clip-background":"yes",
	"c":"grassCenter",
	"_":"exitSign",
	"H":"grassCenter",
	"I":"grassMid",
	"J":"boxAlt",
	"K":"brickWall",
	"P":"stemBaseAlt",
	"R":"shroomTanMid",
	"S":"shroomTanRight",
	"Q":"shroomTanLeft",
	"L":"stemVine",
	"l":"treeTrunkBottom",
	"m":"tree",
	"n":"treeBranchesLeft",
	"o":"treeBranchesRight",
	"p":"treeTop",
	"a":"spikesBottom",
	"b":"bush",
	"s":"iceWaterDeep",
	"r":"iceWaterMid",
	"i":"spikesTop",
}

///*
var level2 = [
	"P                                                                                                                                                                                                                                                                                       ",
	"P                                                                                                                                                                                                                                                                                       ",
	"P                                                                                                                                                                                                                                                                                       ",
	"P                                                                                                                                                                                                                                                                                                                                                                           ",
	"P                                                                                                                                                                                                                                BXXXXXB EFFFG B     B                                                                                                                                                                                                             Bbbbbbbbb",
	"P                                                                                                                                                                                                                                BXXXXXB       B     BEG                                                                                                                                                                                                           Bbbbbbbbb",
	"P                                                                                                                                                                                                                                BXXXXXB       B  +  B                                                                                                                                                                                                             Bbbbbbbbb",
	"P                                                                             XX  XX                             Y Z Y                                                                                                           AAAAAAA       AAAAAAA   EG                                                                                                                                                                                                        Bbbbbbbbb",
	"P                                   XX                                                                                                                                                                                                                                                                                                                                                                                                         ####                Bbbbbbbbb",
	"P                                  X  X                                                                                                                                                                                                                     EG                                                                                                                                                              -                                      Bbbbbbbbb",
	"P                                                                           EFG  EFG                                                                                                                                                                                                                      ####### ####                                                                     !!!                          HAAAAAAAAI                                 Bbbbbbbbb",
	"P                         !!@ !!                                                                HAAAAAAAAAAAAAAAI         HAAAAAAAI                        HAAAAAAAAAAAAAAAAI    HAAAAAAAAAAAAAAAAAI    HAAAAAAAAAAAAAAAAAI                                HAAAAAAAAAAAI          = = =HAAAAI                                                                                                                           BbbbbbbbbB        ####                     AAAAAAAAA",
	"P                                                    W                                         HbbbbbbbbbbbbbbbbB        HbbbbbbbbB                        BbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB  EFG                   = =  == BbbbbbbbbbbbB               BbbbbB                                              !!!!!!!!!!!                 !!!!                                       !!!   BbbbbbbbbB                  ##        }             ",
	"P                      YYYYYYYYY                    WW               !!!!    $                HbbbbbbbbbbbbbbbbbB       HbbbbbbbbbB                        BbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB     _                          BbbbbbbbbbbbBEFG  #####     BbbbbB                                                                                                               !!!         BbbbbbbbbbAAAAAAI                              `    ",
	"P                      YYYYYYYYY                   WWW                                       HbbbbbbbbbbbbbbbbbbbI     HbbbbbbbbbbB                 EFG    BbbbbbbbbbbbbbbbbBEFFGBbbbbbbbbbbbbbbbbbB EG BbbbbbbbbbbbbbbbbbB             EFFFFG             BbbbbbbbbbbbB               BbbbbbAAI                         HAAAAAAAAAAAI                                          HAAAAAAAAAAI                            BbbbbbbbbbbbbbbbB              HAAAAAAAAAAAAAAAAAAAI",
	"P  ~    W  X  Y Z | HAAAAAAAAAAAAAI               WWWW  JC                                   BbbbbbbbbbbbbbbbbbbbB    HbbbbbbbbbbbB                        BbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB       EFFFG         ########   BbbbbbbbbbbbB               BbbbbbbbbAAAAAAAAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbB                                          BbbbbbbbbbbB                            BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"AAAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbB            HAAAAAAAAbLI                       JK       ##BbbbbbbbbbbbbbbbbbbbB   HbbbbbbbbbbbbbAAI                  HAAbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB                                BbbbbbbbbbbbB               BbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbB   EFFFFFFFG  ###AA   EFG EFFG  ########  BbbbbbbbbbbB############################BbbbbbbbbbbbbbbbB      ####    Bbbbbbbbbbbbbbbbbbbbb",
	"BbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbAAAAAAAAAAAABbbbbbbbbbBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA##bbbbbbbbbbbbbbbbbbbbBAAAbbbbbbbbbbbbbbbbbAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB    BbbbbbbbbbbbbbbbbbB                                BbbbbbbbbbbbB               BbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbB                 BB         BB            BbbbbbbbbbbB                            BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB              Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbB      {       Bbbbbbbbbbbbbbbbbbbbb",
	"                                                                                                                                                                                                                                                                                                                                                                                                                        BbbbbbbbbbbbbbbbAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbbbbbbb",

];

//*/
level2Mapping = {
	"background":"bg2",
//	"clip-background":"yes",
	"A":"cakeMid",
	"B":"cakeCenter",
	"b":"cakeCenter",
	"H":"snowCenter",
	"I":"snowMid",
	"P":"castleCenter",
	"C":"cakeHillRight",
	"E":"cakeLeft",
	"F":"cakeMid",
	"G":"cakeRight",
	"H":"cakeLeft",
	"I":"cakeRight",
	"J":"cakeLeft",
	"K":"cakeRight",
	"L":"cakeHillRight2",
	"_":"cakeHalfAlt",
	"=":"castleHalf",
}




///*
var sublevel1 = [
	"# ~  ######    #",
	"#              #",
	"#              #",
	"#     @        #",
	"#     WWWWW    #",
	"#     XXXXX    #",
	"#              #",
	"#       |      #",
	"#     #####    #",
	"#     #####    #",
	"#     #####   `#",
	"AAAAAAAAAAAAAAAA",
	"BBBBBBBBBBBBBBBB",
];
//*/
var sublevel1Mapping = {
	"background":"bg3",
	"clip-background":"yes",
	"A":"grassMid",
	"B":"grassCenter",
};

var sublevel2 = [
	"# ~  ###############          ",
	"#                  #          ",
	"#                  #          ",
	"###########    X   #          ",
	"          #    Y   #          ",
	"          #    Z   #          ",
	"          #    |   #          ",
	"          #    X   #          ",
	"          #    Y   #          ",
	"          #    Z   #          ",
	"          #    |   #          ",
	"          #    X   #          ",
	"          #    Y   #          ",
	"          #    Z   #          ",
	"          #    |   #          ",
	"          #    X   #          ",
	"          #    Y   #          ",
	"          #    Z   #          ",
	"          #    |   #          ",
	"          #    X   #          ",
	"          #    Y   #          ",
	"          #    Z   #          ",
	"          #    |   #          ",
	"          #    X   #######    ",
	"          #     XXXXX    #",
	"          #     ZZZZZ    #",
	"          #     #####   `#",
	"          AAAAAAAAAAAAAAAA",
	"          BBBBBBBBBBBBBBBB",
];
//*/
var sublevel2Mapping = {
//	"background":"bg12",
//	"clip-background":"yes",
	"A":"grassMid",
	"B":"grassCenter",
};

var sublevel3 = [
	"# ~  ######    #         ##############",
	"#              #         #            #",
	"#              #         #            #",
	"#              ###########            #",
	"#                                     #",
	"#                                     #",
	"#                                     #                                 #",
	"#              ###########            #                                 #",
	"#     #####    #         #            #                                 #",
	"#     #####    #         #            #                                 #",
	"#     #####    #         #            #                                 #",
	"AAAAAAAAAAAAAAAA         #ssssssssssss########                         `#",
	"BBBBBBBBBBBBBBBB         #rrrrrrrrrrrrrrrrrrrrrrrrrrrrAAAAAAAAAAAAAAAAAAA",
	"                         #rrrrrrrrrrrrrrrrrrrrrrrrrrrr#",
	"                         #rrrrrrrrrrrrrrrrrrrrrrrrrrrr#",
	"                         #PPPPPPPPPPPPPPPPPPPPPPPPPPPP#",
];
//*/
var sublevel3Mapping = {
	"background":"bg3",
	"clip-background":"yes",
	"A":"tundraMid",
	"B":"tundraCenter",
	"s":"iceWaterMid",
	"r":"iceWaterDeep",
	"P":"iceWaterDeep",
};

// this sublevel is mapped to the plus sign
// So when the portal that is connected to the plus
// is touched, we will enter this map.
var level1Sublevels = {
	"+":{
		"level":sublevel1,
		"mapping":sublevel1Mapping,
	},
	"<":{
		"level":sublevel2,
		"mapping":sublevel2Mapping,
	},
	"{":{
		"level":sublevel3,
		"mapping":sublevel3Mapping,
	},

};
///*
var level3 = [
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                   U U                                                                                J",
	"J                O              QQQQQQQ    QQQO                             O                                          J",
	"J                                                                                                                 K    J",
	"J                       V                                                                                        KK    J",
	"J        V  V            V                                                                                      KKK    J",
	"J          O   QOQPQ         QPQ              R              QR          O  O  O                 K  K          KKKK    J",
	"J                                                                                               KK  KK        KKKKK    J",
	"J                                                                                              KKK  KKK      KKKKKK    J",
	"J     #          U              V                      U U       V  U U     U  U    U U       KKKK  KKKK    KKKKKKK   !J",
	"JIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII      IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIIIIIIHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",

];
//*/
level3Mapping = {
	"A":"dirtCenter",
	"B":"exitSign",
	"H":"dirtCenter",
	"I":"dirtMid",
	"J":"boxAlt",
	"K":"brickWall",
}

///*
var level4 = [
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                                                                                                      J",
	"J                                   U U                                                                                J",
	"J                O              QQQQQQQ    QQQO                             O                                          J",
	"J                                                                                                                 K    J",
	"J                       V                                                                                        KK    J",
	"J        V  V            V                                                                                      KKK    J",
	"J          O   QOQPQ         QPQ              R              QR          O  O  O                 K  K          KKKK    J",
	"J                                                                                               KK  KK        KKKKK    J",
	"J                                                                                              KKK  KKK      KKKKKK    J",
	"J     #          U              V                      U U       V  U U     U  U    U U       KKKK  KKKK    KKKKKKK   !J",
	"JIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII      IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH      HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIIIIIIHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",
	"JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ",

];
//*/
level4Mapping = {
	"A":"grassCenter",
	"B":"exitSign",
	"H":"grassCenter",
	"I":"grassMid",
	"J":"boxAlt",
	"K":"brickWall",
}






