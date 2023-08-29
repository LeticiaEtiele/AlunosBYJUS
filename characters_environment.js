
/*=================================
=            Variáveis            =
=================================*/

/* variáveis do personagem principal */
var mario, bricks,clouds,mountains,enemyMushrooms,pipes,platforms,coins;

/* Variáveis ​​de controle */
var control={
  up: "UP_ARROW", // 32=spaceBar
  left: 'LEFT_ARROW',
  right: 'RIGHT_ARROW',
  revive: 32
}

// Status do jogo interno, que pode afetar o equilíbrio ou a jogabilidade do jogo.
var gameConfig={
  
  // start, playing, over
  status: "start", 
  
  // vidas iniciais de mario
  initialLifes: 4,

  // velocidade de movimento do personagem
  moveSpeed: 5,
  enemyMoveSpeed: 1,

  // gravidade e velocidade de salto para todos os personagens
  gravity: 1,
  gravityEnemy: 10,
  jump:-15,

  // ponto de partida do personagem
  startingPointX: 500,
  startingPointY: 0,

  // tamanho padrão da tela
  screenX:1240,
  screenY:336,

  // pontuações
  timeScores: 0,
  scores: 0
}


/*=====  Fim das Variáveis  ======*/


/*====================================
=            Game Status             =
====================================*/

function game(){

  instializeInDraw();
  moveEnvironment(mario);
  drawSprites();
  
  if(gameConfig.status==='start'){

    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("Pressione qualquer tecla de seta para iniciar e jogar", gameConfig.screenX/2, gameConfig.screenY/2);
    textSize(40);

    stroke(255);
    strokeWeight(7);
    noFill();

    changeGameStatud();
  }
  
  if(gameConfig.status==='play'){
    positionOfCharacter(mario);
    enemys(enemyMushrooms);
    checkStatus(mario);
    scores(mario);
    manualControl(mario);
  
    // optional control version of game
    // autoControl(mario);
  
  }

    // if game is over 
  if(gameConfig.status==='gameover'){
    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2+105);
    textSize(15);
    text("Pressione ESPAÇO para reiniciar", gameConfig.screenX/2, gameConfig.screenY/2+135);
    textSize(40);
    text(round(gameConfig.scores),gameConfig.screenX/2,gameConfig.screenY/2-35);
    text("pontos",gameConfig.screenX/2,gameConfig.screenY/2);

    stroke(255);
    strokeWeight(7);
    noFill();
    ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,160,160)
    changeGameStatud(mario)
  }
}  


// change game status if any key is pressed
function changeGameStatud(character){
  if((keyDown(control.up) ||keyDown(control.left)||keyDown(control.right) )&& gameConfig.status==="start") {
    world_start.play();
    initializeCharacterStatus(mario);
    gameConfig.status= "play";
  }
  if(gameConfig.status==="gameover" && keyDown(control.revive)) {
    gameConfig.status= "start";        
  }
}




/*=====  Status do fim do jogo   ======*/


/*=============================================
=                 Instialize                  =
=============================================*/

//inicializar
function instializeInSetup(character){
	frameRate(120);
	
	character.scale=0.35;
	initializeCharacterStatus(character)

  bricks.displace(bricks);
	platforms.displace(platforms);
	coins.displace(coins);
	coins.displace(platforms);
	coins.collide(pipes);
	coins.displace(bricks);		

  // mudar a escala das nuvens
	clouds.forEach(function(element){
		element.scale=random(1,2);
	})
}

function initializeCharacterStatus(character){
  // definir a configuração inicial do personagem
  character.scale=0.35;
  character["killing"]=0; //enquanto está matando o inimigo
  character["kills"]=0;
  character["live"]=true;
  character["liveNumber"]=gameConfig.initialLifes;
  character["status"]='live';
  character["coins"]=0;
  character["dying"]=0;
  character.position.x=gameConfig.startingPointX;
  character.position.y=gameConfig.startingPointY;
}

function instializeInDraw(){
  background(109,143,252);
  
  // enquanto mata
  if(mario.killing>0){
    mario.killing-=1;
  }else{
    mario.killing=0;
  }
  
  // faz com que os objetos não se sobreponham.
  pipes.displace(pipes);
  enemyMushrooms.displace(enemyMushrooms);
  enemyMushrooms.collide(pipes);
  clouds.displace(clouds);

  // faz com que o personagem não se sobreponha a outros objetos
  if(mario.live){
    bricks.displace(mario);
    pipes.displace(mario);
    enemyMushrooms.displace(mario);
    platforms.displace(mario);
  }
  
  // inicialização da configuração do personagem
  mario["standOnObj"]=false;
  mario.velocity.x=0;
  mario.maxSpeed=20;

}

/*=====       Fim da instalação        ======*/



/*============================================
=            Elementos interativos           =
============================================*/

// Personagem pega moedas
function getCoins(coin,character){
  if( character.overlap(coin) && character.live && coin.get==false){
    character.coins+=1;
    coin.get=true;
  };
}
    
// Reaparece a moeda depois que o goin é obtido.
function coinVanish(coin){
  if(coin.get){
    coin.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
    coin.get=false;
  };
}

/*=====  Fim dos elementos interativos  ======*/


/*=========================================================
=    Configuração e controle do personagem principal      =
===========================================================*/

/* Faça o personagem principal ficar em objs */
function positionOfCharacter(character){
  
  // Não está na plataforma
  if(character.live){
    
    // Veja se está pisando em tijolos
    platforms.forEach(function(element){ standOnObjs(character,element); });
    bricks.forEach(function(element){ standOnObjs(character,element); });
    pipes.forEach(function(element){ standOnObjs(character,element); });
    
    // Personagem afetado pela gravidade
    falling(character);

    // Se o personagem consegue pular apenas se estiver sobre objetos
    if(character.standOnObj) jumping(character);
      
  }

  // Evento de interação com moedas
  coins.forEach(function(element){
    getCoins(element,mario);
    coinVanish(element);
  });

  // Evento de interação com os inimigos enemyMushrooms
  enemyMushrooms.forEach(function(element){
    StepOnEnemy(character,element);
    if((element.touching.left||element.touching.right)&&character.live&&character.killing===0) die(mario);
    
  })

  // Faz com que fique visível na tela
  dontGetOutOfScreen(mario);

}

/* Movimentação automática dos personagens  */
function autoControl(character){
    character.velocity.x+=gameConfig.moveSpeed;
    character.changeAnimation('move');
    character.mirrorX(1);
}

/* Controle manual do personagem */
function manualControl(character){
  
  if(character.live){
    if(keyDown(control.left)){
      character.velocity.x-=gameConfig.moveSpeed;
      character.changeAnimation('move');
      character.mirrorX(-1);
    }

    if(keyDown(control.right)){
      character.velocity.x+=gameConfig.moveSpeed;
      character.changeAnimation('move');
      character.mirrorX(1);
    }

    if(!keyDown(control.left)&&!keyDown(control.right)&&!keyDown(control.up)){ 
      character.changeAnimation('stand');
    }
  }
 
}

/* movimentos do personagem */
function jumping(character){
	if((keyDown(control.up)&&character.live) || (touchIsDown&&character.live) ){
		character.velocity.y+=gameConfig.jump;
	}
}


/* movimentos do personagem */
function falling(character){
	character.velocity.y += gameConfig.gravity;
  character.changeAnimation('jump');
}


/* Veja se o obj1 está no obj2, principalmente para ver se está nos objcs */
function standOnObjs(obj1,obj2){
  
	var obj1_Left=leftSide(obj1);
	var obj1_Right=rightSide(obj1);
	var obj1_Up=upSide(obj1);
	var obj1_Down=downSide(obj1);

	var obj2_Left=leftSide(obj2);
	var obj2_Right=rightSide(obj2);
	var obj2_Up=upSide(obj2);
	var obj2_Down=downSide(obj2);

	if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7){
		// println("YES");
		obj1.velocity.y = 0;
		obj1.position.y=obj2_Up-(obj1.height/2)-1;
		obj1.standOnObj= true;
	}
}

/* Veja se o obj1 pisa no obj2 para matá-lo */
function StepOnEnemy(obj1,obj2){
  
	var obj1_Left=leftSide(obj1);
	var obj1_Right=rightSide(obj1);
	var obj1_Up=upSide(obj1);
	var obj1_Down=downSide(obj1);

	var obj2_Left=leftSide(obj2);
	var obj2_Right=rightSide(obj2);
	var obj2_Up=upSide(obj2);
	var obj2_Down=downSide(obj2);

	if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7 && obj2.live==true && obj2.touching.top){
		obj2.live=false;
    obj1.killing=30;
    obj1.kills++;
    if(obj1.velocity.y>=gameConfig.jump*0.8){
      obj1.velocity.y=gameConfig.jump*0.8;
    }else{
      obj1.velocity.y+=gameConfig.jump*0.8;
    }
	}
}


// fazer o personagem morrer se ele for tocado pelo inimigo
function die(character){
    character.live=false;
    character.dying+=120;
    character.liveNumber--;
    character.status="dead";
    character.changeAnimation('dead');
    character.velocity.y-=2;
}

// verifique o status do personagem e a resposta ao sprite e ao status do jogo
function checkStatus(character){    
  if(character.live==false){
    character.changeAnimation('dead');
    character.dying-=1;
    reviveAfterMusic(character);
  }
  if(character.live==false && character.liveNumber==0){
    gameConfig.status="gameover"
  }

}

// reviver depois de morrer musica terminada
function reviveAfterMusic(character){
  if( character.live === false && mario.liveNumber !==0 && character.dying===0 ){
    character.live=true;
    character.status="live";
    character.position.x=500;
    character.position.y=40;
    character.velocity.y=0;
  }
}


/* Faça o personagem permanecer na tela */
function dontGetOutOfScreen(character){
  
  // se o mario cair nos buracos
  if(character.position.y>gameConfig.screenY&&character.live && character==mario){
  	die(mario);
  }

  if(character.position.x>gameConfig.screenX-(character.width*0.5)){
  	character.position.x=gameConfig.screenX-(character.width*0.5);
  }else if(character.position.x<character.width*0.5){
    if(character==mario){
      character.position.x=character.width*0.5;
    }else{ 
      character.live=false; 
    }
  }

}

/*=====  Fim da configuração e controle do personagem principal ======*/


/*=============================================
=          Configuração e controle do inimigo         =
=============================================*/


function enemys(enemys){
    enemys.forEach(function(enemy){
      stateOfEnemy(enemy);
	    positionOfEnemy(enemy);
	    enemy.position.x-=gameConfig.enemyMoveSpeed;
  });
} 

// Verifica o status do inimigo
function stateOfEnemy(enemy){
  if (enemy.live==false||enemy.position.y>gameConfig.screenY+50){
    enemy.position.x=random(gameConfig.screenX*1.5,2*gameConfig.screenX+50);
    enemy.position.y=random(gameConfig.screenY*0.35,gameConfig.screenY*0.75);
    enemy.live=true;
  }
}

/* Deixa o inimigo parado em objs */
function positionOfEnemy(enemy){

	platforms.forEach(function(element){ enemyStandOnObjs(enemy, element); });
	bricks.forEach(function(element){ enemyStandOnObjs(enemy, element);});
  pipes.forEach(function(element){ enemyStandOnObjs(enemy, element); })
	
	enemy.position.y+=gameConfig.gravityEnemy;

	dontGetOutOfScreen(enemy);
}


/* Ver se obj1 está sobre obj2, principalmente para ver se está sobre os objcs*/
function enemyStandOnObjs(obj1,obj2){
  
  var obj1_Left=leftSide(obj1);
  var obj1_Right=rightSide(obj1);
  var obj1_Up=upSide(obj1);
  var obj1_Down=downSide(obj1);

  var obj2_Left=leftSide(obj2);
  var obj2_Right=rightSide(obj2);
  var obj2_Up=upSide(obj2);
  var obj2_Down=downSide(obj2);

  if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7){
    // println("YES");
    obj1.velocity.y = 0;
    obj1.position.y=obj2_Up-(obj1.height);
  }
}



/*======= Fim da configuração e controle do inimigo ====*/


/*===================================
=            Ambiente            =
===================================*/

// chama todas as funções de rolagem do ambiente
function moveEnvironment(character){
  var environmentScrollingSpeed=gameConfig.moveSpeed*0.3; 
  
  if(gameConfig.status==='play'){
    environmentScrolling(platforms,environmentScrollingSpeed);
    environmentScrolling(bricks,environmentScrollingSpeed);
    environmentScrolling(clouds,environmentScrollingSpeed*0.5);
    environmentScrolling(mountains,environmentScrollingSpeed*0.3); 
    environmentScrolling(pipes,environmentScrollingSpeed); 
    environmentScrolling(coins,environmentScrollingSpeed); 
    environmentScrolling(enemyMushrooms,environmentScrollingSpeed); 
    character.position.x-=environmentScrollingSpeed;
  }
}

// rolar elemento diferente na tela
function environmentScrolling(group,environmentScrollingSpeed){
  group.forEach(function(element){
    if(element.position.x>-50){
      element.position.x-=environmentScrollingSpeed;
    }else{
      element.position.x=gameConfig.screenX+50;
      
      //se o grupo for tijolos, randomiza sua posição y
      if(group===bricks){
        element.position.y=random(gameConfig.screenY*0.35,gameConfig.screenY*0.75);
      }

      //se o grupo for tijolos ou montanhas, randomize sua posição x
      if(group===pipes||group===mountains){
        element.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
      }

      //se o grupo for nuvens, randomize sua posição x e y
      if(group===clouds){
        element.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
        element.position.y=random(0,gameConfig.screenY*0.5);
        element.scale=random(0.3,1.5);
      }

      if(group===coins){
        element.position.x=random(0,gameConfig.screenX)+gameConfig.screenX;
        element.position.y=random(gameConfig.screenY*0.2,gameConfig.screenY*0.8);
      }

    }

  })
}

/*=====  Fim do ambiente  ======*/


/*=====================================
=            Para depuração           =
=====================================*/

/* para estado de posição do personagem */
function debugging(character){
	strokeWeight(1);
	fill(255);
	textSize(12);
  text(character.dying, 20,20);
	text(gameConfig.status, 20,80);
	// text("v: "+character.velocity.y,150,20);
	noFill();
	// outline(tube01);
	stroke(251);
	strokeWeight(2);
	outline(character);

	pipes.forEach(function(element){ outline(element); });
  enemyMushrooms.forEach(function(element){ outline(element); });

}


// calcula pontuações de cada jogo
function scores(character){

  strokeWeight(0);
  fill(255, 255, 255, 71);
  textSize(40);

  gameConfig.scores=character.coins+character.kills+gameConfig.timeScores;


  if(character.live&&gameConfig.status==='play') gameConfig.timeScores+=0.05;
  
  text("scores: "+round(gameConfig.scores),20,40);
  text("lives: "+character.liveNumber,20,80);

  if(mario.live==false && mario.liveNumber!=0){
    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);
    
    strokeWeight(7);
    noFill();
    
    stroke(255);
    ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,150,150)

    stroke("red");
    var ratio=(character.liveNumber/gameConfig.initialLifes);
    arc(gameConfig.screenX/2,gameConfig.screenY/2-30,150,150, PI+HALF_PI,(PI+HALF_PI)+(TWO_PI*ratio));
    fill(255, 255, 255);
    noStroke();
    textAlign(CENTER);
    textSize(40);
    text(round(character.liveNumber),gameConfig.screenX/2,gameConfig.screenY/2-35);
    text("lives",gameConfig.screenX/2,gameConfig.screenY/2);

    
  }


}

/* make outline of obj*/
function outline(obj){ rect(leftSide(obj),upSide(obj),rightSide(obj)-leftSide(obj),downSide(obj)-upSide(obj));}

/* obtém cada posição lateral de obj*/
function leftSide(obj){ return obj.position.x-(obj.width/2);}
function rightSide(obj){ return obj.position.x+(obj.width/2);}
function upSide(obj){ return obj.position.y-(obj.height/2);}
function downSide(obj){ return obj.position.y+(obj.height/2);}

/*======= Fim do For Debugging ====*/


