//Armazenar a API Web Speech (Converte voz em texto)
//OBS: SpeechRecognition = Recohecimento de fala
var SpeechRecognition = window.webkitSpeechRecognition; 

//Nova API (Usar exemplo do João API Humano)
var recognition = new SpeechRecognition();


function start()
{
    //Manter a caixa de texto vazia
    document.getElementById("textbox").innerHTML = "";

    //Chamar função (pré-definida) da API Web Speech 
    recognition.start();
} 
 
// Função que contém a conversão (voz em texto)
recognition.onresult = function(event) {

    //Exibir o evento no console
    console.log(event); 

    //Acessando a frase convertida localizada dentro da API
    var Content = event.results[0][0].transcript;

    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    


    // PARTE 2
    


}
