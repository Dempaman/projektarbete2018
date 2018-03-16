// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBISgoM6Nlg9SMg8mwki7SmYCj2wsrbMzY",
    authDomain: "projekt-2018-mewent.firebaseapp.com",
    databaseURL: "https://projekt-2018-mewent.firebaseio.com",
    projectId: "projekt-2018-mewent",
    storageBucket: "projekt-2018-mewent.appspot.com",
    messagingSenderId: "42705428709"
  };
  firebase.initializeApp(config);

window.addEventListener('load', function(event){


//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtPassword2 = document.getElementById('txtPassword2');
const btnCLogin = document.getElementById('btnCLogin');
const btnCSignUp = document.getElementById('btnCSignUp');
const btnCLogout = document.getElementById('btnCLogout');

//Add login event
btnCLogin.addEventListener('click', function(event){
  //get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  //Sign in
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));

});

//Add signup event
  btnCSignUp.addEventListener('click', function(event){
    //get email and password
    //Todo: Check for real email!!!!!!!
    const email = txtEmail.value;
    const password = txtPassword.value;
    //Sign in
    passwordMatch();
  });

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log(user);
      console.log("Now logged in");
      btnCLogout.classList.remove('hide');
    }else{
      console.log('not logged in');
      btnCLogout.classList.add('hide');
    }
  });

  btnCLogout.addEventListener('click', function(event){
    firebase.auth().signOut();
    console.log('Tack för du loggade ut!!');
  });

  

});//window.load
