
var canvas = document.getElementById("meuCanvas");
var color = "red"; 
var ctx= canvas.getContext("2d");

//Circulo inicial presente na tela
//Nota: "canvas.getContext("2d")" foi substituído por "ctx"
ctx.beginPath(); //Gatilho para iniciar o desenho
ctx.strokeStyle = color;
ctx.lineWidth = 2;

//Sintaxe = arc(x, y, r, startAngle, endAngle)
ctx.arc(200, 200, 40 ,0 , 2*Math.PI); //Math.PI = metado do círculo, onde PI = 180°, por isso multiplicamos por 2
ctx.stroke(); //Efetivamente desenha o caminho definido


//addEventListener = monitorar evento
canvas.addEventListener("mousedown", myMousedown);

//Demonstração da função
/*function myMousedown(e)
{
    console.log("Sou um botão");  
}*/

function myMousedown(e)
{
    //ATIVIDADE ADICIONAL
    //Início
        //obtém a cor da caixa de inserção
        color = document.getElementById("color").value;
        console.log(color);
    //fim da atividade adicional
    

    //Obtendo as coordenadas X e Y quando o mouse for pressionado

    //NOTA: o canvas pode ser alocado em qualquer lugar na tela, então apenas o "e.clientX" não fornecerá a real coordenada de x. Sendo assim, vamos usar "e.clientX - canvas.offsetLeft"
    var mouseX = e.clientX - canvas.offsetLeft;
    var mouseY = e.clientY - canvas.offsetTop;
    console.log("X = " + mouseX + " ,Y =  " + mouseY);

    //Repassando os valores para a função
    circle(mouseX , mouseY);    
}

function circle(mouseX , mouseY)
{
    //NOTA: Código já feito anteriormente
    ctx.beginPath(); //Gatilho para iniciar o desenho
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(mouseX, mouseY, 40 ,0 , 2*Math.PI); //Mudamos apenas as coordenadas
    ctx.stroke();
}



//ATIVIDADE ADICIONAL

function clearArea()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}