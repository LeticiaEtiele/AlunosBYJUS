var camera = document.getElementById("camera");

//LINK API
//https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/

//Ajustar a altura, largura e o id
Webcam.set({
  width:350,
  height:300,
  image_format : 'jpeg',
  png_quality:90
});
Webcam.attach( '#camera' );

//Código para capturar a imagem   
function takeSnapshot() {
    //Acionar função da API e
    //solicitar a pré-visualização da imagem após a captura (data_uri)
    Webcam.snap(function(data_uri) {
      document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="imagem_capturada"/>';
    });
}


//BIBLIOTECA ML5 (demonstrar a biblioteca)
//https://amadolucas.github.io/C135-137/


//Testar o Ml5
console.log('ml5 version:', ml5.version);

//Importar nosso Ml (Teachable Machine) treinado para o Ml5
//*** IMPORTANTE *** Escrever "model.json" no final do link
//"imageClassifier" aciona a função de classificação
//"modelLoaded" iniciar a classificação de imagem
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modeloCarregado);
