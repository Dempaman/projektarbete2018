// This document holds the loginModal to be displayed on any page that uses this function!

//Eventlistener to authStateChange
firebase.auth().onAuthStateChanged(user => {
  console.log('AUTH STATE CHANGE FOUND!');
  if(user) {
    //window.location = 'eventpage.html'; //After successful login, user will be redirected to home.html

    // The user is logged in.
    console.log('User data:',user);

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

  } else {
    console.log('wubalubadub dub');
    localStorage.removeItem('loggedInUser');
  }
});

function toggleLoginModal(){

  let lmw = document.getElementById('lmw');

  if(lmw){ // Om LoginModalWrapper finns i dom:en behöver vi bara visa den.
    if(lmw.className == 'hidden'){
      lmw.className = '';
      setBodyScroll('hidden');
      addLoginModalListeners();
    } else {
      lmw.className = 'hidden';
      setBodyScroll('auto');
      removeLoginModalListeners();
    }
  } else {
    retrieveLoginModalContent();
  }

}


// Set the body scroll
function setBodyScroll(value){
  let body = document.getElementsByTagName('body')[0];
  body.style.overflow = value;
}

// Retrieve the modal content!
function retrieveLoginModalContent(){

  let lmw = document.createElement('div'); // LoginModalWrapper
  let lmc = document.createElement('div'); // LoginModalContent
  let btnHolder = document.createElement('div'); // ButtonHolder div

  let headerDiv = document.createElement('div');
  headerDiv.className = 'header';

  let headerTitle = document.createElement('h2');
  headerTitle.innerText = 'Logga in';

  let closeButton = document.createElement('span');
  closeButton.className = 'loginModalCloseButton';
  closeButton.innerHTML = '<i class="mdi mdi-close mdi-36px"></i>';

  headerDiv.appendChild(headerTitle);
  headerDiv.appendChild(closeButton);

  // Create button Wrappers
  let googleButtonWrapper = document.createElement('div');
  let facebookButtonWrapper = document.createElement('div');

  let googleButton = document.createElement('button');
  let facebookButton = document.createElement('button');

  googleButton.setAttribute('id', 'googleLoginBtn');
  facebookButton.setAttribute('id', 'facebookLoginBtn');


  // Set the text!
  googleButton.innerHTML = '<i class="mdi mdi-google mdi-24px"></i> <span>Logga in</span>';
  facebookButton.innerHTML = '<i class="mdi mdi-facebook-box mdi-24px"></i> <span>Logga in</span>';


  // Append the buttons into the wrapper
  googleButtonWrapper.appendChild(googleButton);
  facebookButtonWrapper.appendChild(facebookButton);

  // Append the buttonWrappers into the ButtonHolder
  btnHolder.appendChild(googleButtonWrapper);
  btnHolder.appendChild(facebookButtonWrapper);



  lmc.appendChild(headerDiv)
  lmc.appendChild(btnHolder);

  lmw.appendChild(lmc);
  lmw.setAttribute('id', 'lmw');

  body = document.getElementsByTagName('body')[0];
  body.insertBefore(lmw, body.firstChild);

  // Hide the scroll!
  setBodyScroll('hidden');

  // add eventlisteners to the buttons!
  addBtnListeners(googleButton, facebookButton, closeButton);
}


function addBtnListeners(googleButton, facebookButton, closeButton){

  googleButton.addEventListener('click', loginGoogle);
  facebookButton.addEventListener('click', loginFacebook);

  closeButton.addEventListener('click', function(){
    toggleLoginModal();
    navigation.className = '';
    console.log('closed!');

  });

}

function loginGoogle(){
  var providerGoogle = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(providerGoogle)
  console.log('Google button pressed!');
}
function loginFacebook(){
  var providerGoogle = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(providerFacebook)
  console.log('Facebook button pressed!');
}

function addLoginModalListeners(){
  let googleButton = document.getElementById('googleLoginBtn');
  let facebookButton = document.getElementById('facebookLoginBtn');

  googleButton.addEventListener('click', loginGoogle);
  facebookButton.addEventListener('click', loginFacebook);
}

function removeLoginModalListeners(){
  let googleButton = document.getElementById('googleLoginBtn');
  let facebookButton = document.getElementById('facebookLoginBtn');

  googleButton.removeEventListener('click', loginGoogle);
  facebookButton.removeEventListener('click', loginFacebook);
}
