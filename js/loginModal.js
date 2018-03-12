// This document holds the loginModal to be displayed on any page that uses this function!
firebase.auth().getRedirectResult().then(function(result) {
  console.log('Login Results: ', result);
}).catch(function(err){
  if(err.code == 'auth/account-exists-with-different-credential'){
    printMessage('error', 'Oops! Ett konto med din angivna mail existerar redan på denna webbplats! Logga in med ett annat konto.', 10000);
  }
})


//Eventlistener to authStateChange
firebase.auth().onAuthStateChanged(user => {
  console.log('AUTH STATE CHANGE FOUND!');
  if(user) {
    if(document.getElementById('lmw')){
      location.reload();
    }
    //window.location = 'eventpage.html'; //After successful login, user will be redirected to home.html


    /* start to listen for invites for this person */
    let initTime = new Date().getTime();
    db.ref('users/' + user.uid + '/invites').on('child_added', function(snapshot){
      let data = snapshot.val();

      if(initTime > data.time){
        console.log('This is an old invite.');
      } else {
        printMessage('success','Du fick precis en inbjudan till ett meetup av ' + data.fullname);
      }


    });
    // The user is logged in.
    console.log('User data:',user);
    //Annas magic
    let helloUser = document.getElementById('helloUser');
    helloUser.classList.remove('hidden');
    let usersName = document.getElementById('userName');
    // let firstName = user.displayName.split(" ",1);
    usersName.innerText = user.displayName;


    db.ref("users/" + user.uid).once("value", function(snapshot){

      let result = snapshot.val();

      if(result){
        // Print this if the user exists in the database.

        //console.log(result);
        console.log('Setting the loggedInUser here #1!');
        // Put the user information into the  localStorage db
        localStorage.setItem('loggedInUser', JSON.stringify(result));

        /* Skapar SID ifall du inte har en! */
        if(!result.sid){
          printMessage('default', 'You do not seem to have a SID. Creating one for you now!');
          requestsid(result);
        }

      } else {

        let newUser = new UserClass(user.uid, user.displayName, user.email, user.emailVerified, null, null, user.photoURL, false, null, null);

        //console.log('No user here. Creating user in database.');
        newUser.push();
        //console.log('Creating the user for the first time in the database! Welcome message printed.');

        /* Welcome Message */
        printMessage('success', 'Välkommen ' + user.displayName + '!', 8000, 300);

        /* Setting localStorage */
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      }
      // retrieveEventInfo after we've logged in!
      if(window.location.pathname.includes('eventpage.html')){
        retrieveEventInfo();
      }

      //console.log('THE USER IS NOOOOOOW LOGGED IN');
    });

    //Eftersom google sign-in redirect'ar oss så kollar vi om vi är inloggade eller inte.
    //Är vi detta så skriver vi ut att vi kan logga ut och visar samt "Min profil" i Nav.

    let myProfile =  document.getElementById('myProfile');
    let myProfileMob = document.getElementById('myProfileMob');
    myProfile.classList.remove('hidden')
    myProfileMob.classList.remove('hidden')

    for( let loginInMenu of document.getElementsByClassName('loginInMenu')){
        if(loginInMenu){
            loginInMenu.innerText = "LOGGA UT";
        };
    };



  } else {
    console.log('wubalubadub dub');
    let helloUser = document.getElementById('helloUser');
    helloUser.classList.add('hidden');
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
  //let btnHolderUser = document.createElement('div'); // ButtonHolder div for created Users
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



  //create user part
  let containerUser = document.createElement('div');
  let containerUserInput = document.createElement('div');
  let txtEmail = document.createElement('input');
  let txtPassword = document.createElement('input');
  let btnCuHolder = document.createElement('div');
  let switchHolder = document.createElement('div');
  let btnCuLogin = document.createElement('button');
  let btnCuSignUp = document.createElement('button');
  let btnCuLogout = document.createElement('button');
  let paragE = document.createElement('p');
  let paragP = document.createElement('p');
  let paragSignIn = document.createElement('p');
  let paragSignUp = document.createElement('p');
  let switchInput = document.createElement('input');
  let label = document.createElement('label');
  let divBorder = document.createElement('div');
  const email = txtEmail.value;
  const password = txtPassword.value;

  containerUser.className = 'containerUser doNotCloseThis';//container for create user and login user
  btnHolder.appendChild(containerUser);

  containerUserInput.className = 'containerUserInput doNotCloseThis';
  containerUser.appendChild(containerUserInput);

  containerUser.appendChild(switchHolder);
  switchHolder.className = 'switchHolder';//Container for switch and paragrafs

  switchHolder.appendChild(paragSignIn);//sign in text
  paragSignIn.className = 'paragSignIn highlight';
  paragSignIn.innerText = 'Logga in';

  //switch here
  switchInput.className = 'switchInput doNotCloseThis';
  label.className = 'doNotCloseThis labelSwitch';
  switchInput.setAttribute('type', 'checkbox');
  switchInput.setAttribute('id', 'switch');
  label.setAttribute('for', 'switch')
  switchHolder.appendChild(switchInput);
  switchHolder.appendChild(label);

  switchHolder.appendChild(paragSignUp);//sign up text
  paragSignUp.className = 'paragSignUp';
  paragSignUp.innerText = 'Skapa konto';

  txtEmail.className = 'txtEmail doNotCloseThis'; //creates an input field for email
  txtEmail.setAttribute('type', 'email');
  paragE.innerText = 'EMAIL ADDRESS'
  paragE.className = 'paragE'
  containerUserInput.appendChild(paragE);
  containerUserInput.appendChild(txtEmail);

  txtPassword.className = 'txtPassword doNotCloseThis'; // creates an input field for password
  txtPassword.setAttribute('type', 'password');
  paragP.innerText = 'PASSWORD'
  paragP.className = 'paragP'
  containerUserInput.appendChild(paragP);
  containerUserInput.appendChild(txtPassword);

  //Login button
  containerUser.appendChild(btnCuHolder);
  btnCuLogin.className = 'btnCuLogin btnCu btnCu-action doNotCloseThis';
  btnCuLogin.innerText = 'Logga in'
  btnCuHolder.appendChild(btnCuLogin);

  //Signup button
  btnCuSignUp.className = 'btnCuSignUp btnCu btnCu-secondary doNotCloseThis hide';
  btnCuSignUp.innerText = 'Skapa konto';
  btnCuHolder.appendChild(btnCuSignUp);

  divBorder.className = 'divBorder';
  containerUser.appendChild(divBorder);

  //Switch changed login- and signup button
  switchInput.addEventListener('change', function(event){
    if(this.checked){
      console.log("It is true!!");
      paragSignIn.classList.remove('highlight');
      paragSignUp.classList.add('highlight');
      btnCuLogin.classList.add('hide');
      btnCuSignUp.classList.remove('hide');

    }else{
      console.log('it is false');
      paragSignUp.classList.remove('highlight');
      paragSignIn.classList.add('highlight');
      btnCuLogin.classList.remove('hide');
      btnCuSignUp.classList.add('hide');
    }
  });



  //Add login event
  btnCuLogin.addEventListener('click', function(event){
    //get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    //Sign in
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise
    .catch(function(error){
      console.log(error.message);
      //printMessage('error', 'ah ah ah you didnt say the magic word..') // If some error occurs it will print the message
    });
  });

    btnCuSignUp.addEventListener('click', function(event){
      //get email and password
      const email = txtEmail.value;
      const password = txtPassword.value;
      //Sign-up user
      const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
      promise
        .catch(function(error){
          console.log(error.message);
          //printMessage('error', 'ah ah ah you didnt say the magic word..') // If some error occurs it will print the message
        });
    });





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
        if(!event.target.classList.contains('doNotCloseThis')){
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
  firebase.auth().signInWithRedirect(providerGoogle).catch(function(error){
    console.log('ERRORRRR: ', error);
  });
  console.log('Google button pressed!');
}

function loginFacebook(){
  var providerFacebook = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(providerFacebook).then(function(msg){
    console.log('FACEBOOK LOGMESSAGE', msg);
  })

  .catch(function(error){
    console.log('FB ERROR: ', error);
  });
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
