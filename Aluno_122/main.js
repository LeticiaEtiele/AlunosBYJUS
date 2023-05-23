//Armazenar as coordenadas
var x = 0;
var y = 0;

//Armazenar a forma escolhida
var drawShape="";

//Acionar a API para converter voz em texto
var reconhecerFala = window.webkitSpeechRecognition;

//Usando o modelo para criar uma nova API de fala
var reconhecer = new reconhecerFala();

//funções P5