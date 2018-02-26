window.addEventListener('load', function(event){

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

  //** FACEBOOK LOGIN SCRIPT **//
  var providerFB = new firebase.auth.FacebookAuthProvider();

  //** POPUP FACEBOOK LOGIN **//
  let loginBtn = document.getElementsByClassName('loginBtn')[0];
  loginBtn.addEventListener('click', function(event){

  firebase.auth().signInWithPopup(providerFB).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('Popup result: logged in as ', user.displayName);

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  });
  
  signoutButtonfb.addEventListener('click', function(event){
  firebase.auth().signOut().then(function() {
    let userInfoWrapperShow = document.getElementsByClassName('userInfoWrapperShow')[0]; //HIDES THE USER INFO
    userInfoWrapperShow.className = "userInfoWrapper";
    let hideButtons = document.getElementsByClassName("hideButtons")[0]; //SHOWS THE LOGIN BUTTONS
    hideButtons.className = "containerLoginButtons";
    let so3Show = document.getElementsByClassName("so3Show")[0];
    so3Show.className = "so3";
    console.log("Facebook sign out was successful")// Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });



})//window.load

