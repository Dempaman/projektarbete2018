window.addEventListener('load', function(event){

  //** FACEBOOK LOGIN SCRIPT **//
  var providerFB = new firebase.auth.FacebookAuthProvider();

  //** POPUP FACEBOOK LOGIN **//
  let loginFb = document.getElementsByClassName('loginBtn--facebook')[0];
  loginFb.addEventListener('click', function(event){

  firebase.auth().signInWithPopup(providerFB).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
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
  });
  //*** GOOGLE SIGN IN SCRIPT***//
  var providerGoogle = new firebase.auth.GoogleAuthProvider();

  //** POPUP GOOGLE LOGIN**//
  let popupButtonGoogle = document.getElementsByClassName('loginBtn--google')[0];
  popupButtonGoogle.addEventListener('click', function(event){

    firebase.auth().signInWithPopup(providerGoogle).then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('Popup result: logged in as ', result.user.uid);


      db.ref("users/" + user.uid).once("value", function(snapshot){

        let result = snapshot.val();

        if(result){
          // Print this if the user exists in the database.
          console.log(result);

          // Put the user information into the localStorage db
          localStorage.setItem('loggedInUser', JSON.stringify(result));



        } else {
          console.log(user);
          //(uniqueID, fullname, mail, verified, age, sex, avatarURL, admin, meetups, information)
          let newUser = new UserClass(user.uid, user.displayName, user.email, user.emailVerified, null, null, user.photoURL, false, null, null);
          console.log('IS THIS SHIT UPDATED?!?!??!?! AGIN AGIN AIAIGNIAINGAINGNIAINGNIGINNIGANIAGNIGAIN');
          console.log('No user here. Creating user in database.');

          newUser.push();

          localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        }

        // Function to hide the login modal
        console.log('THE USER IS NOOOOOOW LOGGED IN');
        let loginWrapShow = document.getElementsByClassName('loginWrapShow')[0];
        loginWrapShow.className = 'loginWrap';

        /*//Funktion som rensar input fälten
        document.getElementById('nameInput').value = '';
        document.getElementById('addressInput').value = '';
        document.getElementById('timeInput').value = '';
        document.getElementById('spotsInput').value = '';
        document.getElementById('placeNameInput').value = ''; */

        document.getElementById('createMeetupButton').innerText = 'Skicka'
        document.getElementById('createMeetupButton').className = 'verifySend';

        let sendApproveWrapDiv = document.createElement('div');
        let sendApproveText = document.createElement('p');


        sendApproveText.innerText = 'Ditt Meetup är nu skapat!'
        sendApproveText.className = 'approvedBlockText'
        sendApproveWrapDiv.className = 'approvedBlock'
        document.getElementById('putApproveWrapHere').appendChild(sendApproveWrapDiv);
        sendApproveWrapDiv.appendChild(sendApproveText);
      });


      //** LOGGING OUT OTHERS IF ANY **//
        firebase.auth().signOut().then(function() {
          console.log("Facebook sign out was successful")
        }).catch(function(error) {
          // An error happened.
        });

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



})//window.load
