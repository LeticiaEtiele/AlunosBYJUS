//https://teachablemachine.withgoogle.com/models/gY5ZjsrH0/
var  camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach( '#camera' );
 function xis() {
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById("resultado").innerHTML = 
         '<img src="'+data_uri+'"/>';
    } );

 }
        console.log("ml5 versao",ml5.version );
        var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gY5ZjsrH0/model.json",modelcharged);
        function modelcharged() {
         console.log("modelocarregado")
        }