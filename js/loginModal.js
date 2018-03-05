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
        //console.log(result);
        console.log('Setting the loggedInUser here #1!');
        // Put the user information into the  localStorage db
        localStorage.setItem('loggedInUser', JSON.stringify(result));

      } else {

        let newUser = new UserClass(user.uid, user.displayName, user.email, user.emailVerified, null, null, user.photoURL, false, null, null);
        //console.log('No user here. Creating user in database.');

        newUser.push();
        console.log('Setting the loggedInUser here!');
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      }
      // retrieveEventInfo after we've logged in!
      if(window.location.pathname.includes('eventpage.html')){
        retrieveEventInfo();
      }

      //console.log('THE USER IS NOOOOOOW LOGGED IN');
    });

    //Eftersom google sign-in redirect'ar oss så kollar vi om vi är inloggade eller inte. Kan de göras bättre????

    for( let loginInMenu of document.getElementsByClassName('loginInMenu')){
        if(loginInMenu){
            loginInMenu.innerText = "LOGGA UT";
        }
    }



  } else {
    console.log('wubalubadub dub');

    let localUser = localStorage.getItem('loggedInUser');
    if(localUser != undefined){
      localStorage.removeItem('loggedInUser');
      console.log('Removed logged in user');
    } else {
      console.log('Nothing to remove');
    }

    if(window.location.pathname.includes('eventpage.html')){
      removeEditBtn();

      let creatorDivArray = document.getElementsByClassName('creatorDiv');

      if(creatorDivArray.length == 0){
        console.log('Length is 0! Posting!!!');
        retrieveEventInfo();
      } else {
        console.log('Nah I ain\'t posting that again!');
      }


      // Om det existerar några meetups. Det vill säga personen loggade ut med sidan uppe.

      let meetupArray = document.getElementById('meetupWrapper').children;
      if(meetupArray){
        for(let meetup of meetupArray){
          if(meetup.lastChild.className.includes('moreMeetupInfoDiv')){

            let btnDiv = document.createElement('div');
            btnDiv.className = 'btnHolder';
            let joinMeetupBtn = document.createElement('button');

            joinMeetupBtn.className = 'purple';
            joinMeetupBtn.innerText = 'Gå med i meetup';

            btnDiv.appendChild(joinMeetupBtn);


            meetup.removeChild(meetup.lastChild);
            meetup.appendChild(btnDiv);
            // Console.log('APPEND BTN');
            let meetupKey = meetup.getAttribute('id').replace('-', '&');
            meetupKey = meetupKey.split('&')[1];
            joinBtnListener(joinMeetupBtn, meetupKey);
          } else {
            console.log('We should not remove this joinMeetupBtn!');
          }
        }
      }
    }
  }
}); //firebase.auth END...

function toggleLoginModal(){

  let lmw = document.getElementById('lmw');

  if(lmw){ // Om LoginModalWrapper finns i dom:en behöver vi bara visa den.
    if(lmw.className == 'hidden'){
      lmw.className = '';
      setBodyScroll('hidden');
      //addLoginModalListeners();
      addWindowClosed();
    } else {
      lmw.className = 'hidden';
      setBodyScroll('auto');
      //removeLoginModalListeners();
    }
  } else {
    retrieveLoginModalContent();
  }

}


// Set the body scroll
function setBodyScroll(value){
  let body = document.getElementsByTagName('body')[0];
  //body.style.overflowY = value;
  if(value == 'hidden'){
    body.className = 'hiddenBody';
  } else {
    body.className = '';
  }
}

// Retrieve the modal content!
function retrieveLoginModalContent(){

  let lmw = document.createElement('div'); // LoginModalWrapper
  let lmc = document.createElement('div'); // LoginModalContent
  let btnHolder = document.createElement('div'); // ButtonHolder div
  let btnHolderInside = document.createElement('div'); // ButtonHolderInside div.
  btnHolder.className = 'centered';

  let headerDiv = document.createElement('div');
  headerDiv.className = 'header';

  let headerTitle = document.createElement('h2');
  headerTitle.innerText = 'Logga in';

  let closeButton = document.createElement('span');
  closeButton.className = 'loginModalCloseButton';
  closeButton.innerHTML = '<i class="mdi mdi-close mdi-36px"></i>';

  let closeCenteredBtn = document.createElement('span');
  closeCenteredBtn.className = 'loginModalCloseCenteredBtn';
  closeCenteredBtn.innerHTML = '<i class="mdi mdi-close mdi-36px"></i>';

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
  googleButton.className = 'doNotCloseThis';
  googleButton.className = 'doNotCloseThis';

  // Append the buttonWrappers into the ButtonHolder & inside
  btnHolderInside.appendChild(googleButtonWrapper);
  btnHolderInside.appendChild(facebookButtonWrapper);

  btnHolder.appendChild(btnHolderInside);
  btnHolderInside.className = 'loginModalButtonHolder';


  lmc.appendChild(headerDiv);
  btnHolder.appendChild(closeCenteredBtn);
  lmc.appendChild(btnHolder);

  lmw.appendChild(lmc);
  lmw.setAttribute('id', 'lmw');

  body = document.getElementsByTagName('body')[0];
  body.insertBefore(lmw, body.firstChild);

  // Hide the scroll!
  setBodyScroll('hidden');

  // add eventlisteners to the buttons!
  addBtnListeners(googleButton, facebookButton, closeButton, closeCenteredBtn);
}


function addBtnListeners(googleButton, facebookButton){

  googleButton.addEventListener('click', loginGoogle);
  facebookButton.addEventListener('click', loginFacebook);

  //closeButton.addEventListener('click', closeModal);
  //closeCenteredBtn.addEventListener('click', closeModal);

  // If you press outside the centered we close the modal!

  addWindowClosed();

}

function addWindowClosed(){

  function closeIfNotCenter(event){

    console.log('This:', event.target);
    console.log('The class name of target is: ' + event.target.className);
    console.log('NodeName: ' + event.target.nodeName);

    if(event.target.className != 'centered'){
      if(event.target.className != 'loginModalButtonHolder'){
        if(event.target.className != 'doNotCloseThis'){
          closeModal();
          window.removeEventListener('click', closeIfNotCenter);
          console.log('Closeeed with closeIfNotCenter');
        }
      }
    }
  }

  setTimeout(function(){
    window.addEventListener('click', closeIfNotCenter);
  },100);
}

function closeModal(){
  toggleLoginModal();
  let btns = document.getElementsByClassName('purple');
  if(btns){
    for(let btn of btns){
      btn.disabled = false;
      btn.style.backgroundColor = '';
    }
  }
}

function loginGoogle(){
  var providerGoogle = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(providerGoogle)
  console.log('Google button pressed!');
}

function loginFacebook(){
  var providerFacebook = new firebase.auth.FacebookAuthProvider();
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
