function preload() {
	mario_gameover = loadSound("gameover.wav");
	mario_jump = loadSound("jump.wav");
	mario_coin = loadSound("coin.wav");
	mario_kick = loadSound("kick.wav");
	mario_die = loadSound("mariodie.wav");
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

//AULA 139
function setup() {
	canvas = createCanvas(1240,336); //Dimensões específicas do jogo
	//Inserir o canvas dentro da div reservada no HTML
	canvas.parent('canvas'); //Sintaxe: componenteP5.parent(“ID HTML”)

	instializeInSetup(mario); //Organizará as variáveis e funções necessárias para o jogo
	
	video = createCapture(VIDEO);
	video.size(800,400);
	video.parent('gameConsole');

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function draw() {
	game();
}

function modelLoaded() {
	console.log('Modelo Carregado!');
}

function gotPoses(results){
	if(results.length > 0)	{
	  console.log(results);
	  noseX = results[0].pose.nose.x;
	  noseY = results[0].pose.nose.y;
	}
}






