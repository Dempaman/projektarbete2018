window.addEventListener('load', function(event){


  // DO THIS TO LOG IN
  firebase.auth().getRedirectResult()
  .then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user;
      console.log('Google user hittades');

      db.ref("users/" + user.uid).once("value", function(snapshot){

        let result = snapshot.val();

        if(result){
          // Print this if the user exists in the database.
          console.log(result);

          // Put the user information into the localStorage db
          localStorage.setItem('loggedInUser', JSON.stringify(result));

        } else {

          let newUser = new UserClass(user.uid, user.displayName, user.email, user.emailVerified, null, null, user.photoURL, false, null, null);
          console.log('No user here. Creating user in database.');

          newUser.push();

          localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        }
        console.log('THE USER IS NOOOOOOW LOGGED IN');
      });

    }
    // The signed-in user info.
    var user = result.user;
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

  // END OF LOG IN SHIT -----




  //** FACEBOOK LOGIN SCRIPT **//
  var providerFB = new firebase.auth.FacebookAuthProvider();

  //** POPUP FACEBOOK LOGIN **//
  let loginFb = document.getElementsByClassName('loginBtn--facebook')[0];

  loginFb.addEventListener('click', function(event){
    firebase.auth().signInWithRedirect(providerFB)
  });


  //*** GOOGLE SIGN IN SCRIPT***//
  var providerGoogle = new firebase.auth.GoogleAuthProvider();

  //** POPUP GOOGLE LOGIN**//
  let popupButtonGoogle = document.getElementsByClassName('loginBtn--google')[0];

  popupButtonGoogle.addEventListener('click', function(){
    firebase.auth().signInWithRedirect(providerGoogle)
  });

})//window.load
