//LINKS FIREBASE


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Pegar nome usuário e sala da memória local


function send(){
  
}

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
       

//Fim do código
      } });  }); }
getData();

function updateLike(messageId){
  

}

function logout() {

}
