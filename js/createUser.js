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
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//Add login event
btnLogin.addEventListener('click', function(event){
  //get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  //Sign in
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));

});

//Add signup event
  btnSignUp.addEventListener('click', function(event){
    //get email and password
    //Todo: Check for real email!!!!!!!
    const email = txtEmail.value;
    const password = txtPassword.value;
    //Sign in
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise
      .catch(e => console.log(e.message));
  });

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log(user);
      console.log("Now logged in")
      btnLogout.classList.remove('hide');
    }else{
      console.log('not logged in');
      btnLogout.classList.add('hide')
    }
  });

  btnLogout.addEventListener('click', function(event){
    firebase.auth().signOut();
    console.log('Tack för du loggade ut!!')
  });

});//window.load
