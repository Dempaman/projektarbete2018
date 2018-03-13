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
    }
    //window.location = 'eventpage.html'; //After successful login, user will be redirected to home.html


    /* start to listen for invites for this person */
    let initTime = new Date().getTime();
    db.ref('users/' + user.uid + '/notifications').on('child_added', function(snapshot){
      let bell = document.getElementById('notificationBell');
      if(bell){
        bell.innerHTML = '<i class="mdi mdi-bell-ring mdi-24px"> </i>'
      }
      let data = snapshot.val();

      if(initTime > data.time){
        console.log('This is an old invite.');
      } else {
        if(data.action == 'invite'){
          printMessage('notification', data.fullname + ' bjöd precis in dig till ett meetup!');
        } else if(data.action == 'friendRequest'){
          printMessage('notification', data.fullname + ' la precis till dig som vän!');
        }
      }
    });
    // The user is logged in.
    console.log('User data:',user);
    //Annas magic
    let helloUser = document.getElementById("helloUser");

    if(helloUser){
      helloUser.classList.remove("hidden");
    }

    let userName = document.getElementById("userName");
    // let firstName = user.displayName.split(" ",1);
    userName.innerText = user.displayName;

    let bell = document.getElementById('notificationBell');
    if(bell){
      bell.classList.remove('hidden');
    }


    bell.addEventListener('click', showNotifications);

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
      helloUser.classList.add("hidden");
      let bell = document.getElementById('notificationBell');
      if(bell != undefined){
        bell.classList.add('hidden');
      }
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
  let txtPassword2 = document.createElement('input');
  let btnCuHolder = document.createElement('div');
  let switchHolder = document.createElement('div');
  let btnCuLogin = document.createElement('button');
  let btnCuSignUp = document.createElement('button');
  let btnCuLogout = document.createElement('button');
  let paragE = document.createElement('p');
  let paragP = document.createElement('p');
  let paragCp = document.createElement('p');
  let paragN = document.createElement('p');
  let paragSignIn = document.createElement('p');
  let paragSignUp = document.createElement('p');
  let switchInput = document.createElement('input');
  let nameInput = document.createElement('input');
  let label = document.createElement('label');
  let divBorder = document.createElement('div');
  let confDiv = document.createElement('div');

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
  paragE.innerText = 'EMAIL ADRESS'
  paragE.className = 'paragE'
  containerUserInput.appendChild(paragE);
  containerUserInput.appendChild(txtEmail);

  txtPassword.className = 'txtPassword doNotCloseThis'; // creates an input field for password
  txtPassword.setAttribute('type', 'password');
  paragP.innerText = 'LÖSENORD'
  paragP.className = 'paragP'
  containerUserInput.appendChild(paragP);
  containerUserInput.appendChild(txtPassword);

  txtPassword2.className = 'txtPassword2 doNotCloseThis'; // creates an input field for password2
  txtPassword2.setAttribute('type', 'password');
  paragCp.innerText = 'BEKRÄFTA LÖSENORD';
  paragCp.className = 'paragCp';
  confDiv.className ='slider closed';
  containerUserInput.appendChild(confDiv);
  confDiv.appendChild(paragCp);
  confDiv.appendChild(txtPassword2);

  nameInput.className = 'nameInput doNotCloseThis'; // creates a name for the user
  nameInput.setAttribute('type', 'text');
  paragN.innerText = 'Namn';
  paragN.className = 'paragN';
  confDiv.className ='slider closed';
  confDiv.appendChild(paragN);
  confDiv.appendChild(nameInput);


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
      paragCp.classList.remove('hide');
      txtPassword2.classList.remove('hide');

      confDiv.classList.remove('closed');
      confDiv.classList.add('slideUp');

      btnHolderInside.classList.add('closed');
      btnHolderInside.classList.remove('slideUp');

    }else{
      console.log('it is false');
      paragSignUp.classList.remove('highlight');
      paragSignIn.classList.add('highlight');
      btnCuLogin.classList.remove('hide');
      btnCuSignUp.classList.add('hide');
      paragCp.classList.add('hide');
      txtPassword2.classList.add('hide');

      confDiv.classList.add('closed');
      confDiv.classList.remove('slideUp');

      btnHolderInside.classList.remove('closed');
      btnHolderInside.classList.add('slideUp');
    }
  });



  //Add login event
  btnCuLogin.addEventListener('click', function(event){
    //get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const password2 = txtPassword2.value;
    //Sign in
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise
    .catch(function(error){
      console.log(error.message);
      //printMessage('error', 'ah ah ah you didnt say the magic word..') // If some error occurs it will print the message
    });
  });

    btnCuSignUp.addEventListener('click', function(event){
      //Sign-up
      //passwordMatch();
      const email = txtEmail.value;
      const password = txtPassword.value;
      const password2 = txtPassword2.value;
      const name = nameInput.value;
      if (password != password2) {
          printMessage('error', ' fel lösenordet matchar inte');
          txtPassword.style.borderColor = "#E34234";
          txtPassword2.style.borderColor = "#E34234";
      }else{
        //Sign-up user if password match
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
          var user = firebase.auth().currentUser;
              user.updateProfile({
              displayName: name
              }).then(function() {
                location.reload(); //Laddar om sidan
              }).catch(function(error) {
                printMessage('error', "något hände...")
              });
          })
        .catch(function(error){
            console.log(error.message);
            //printMessage('error', 'ah ah ah you didnt say the magic word..') // If some error occurs it will print the message
          });
      }
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
  btnHolderInside.className = 'loginModalButtonHolder slider';


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

function showNotifications(event){
  console.log('Hi!!');
  let notificationWrapper = document.getElementById('notificationWrapper');
  if(notificationWrapper){
    toggleNotifications();
    updateTimeStamps();
  } else {

    notificationWrapper = document.createElement('div');
    notificationWrapper.setAttribute('id', 'notificationWrapper');

    /* Notification header */
    let notificationHeader = document.createElement('div');
    let notificationLabel = document.createElement('h2');
    notificationLabel.innerText = 'Notifikationer';
    let notificationCloseIcon = document.createElement('span');
    notificationCloseIcon.innerHTML = '<i class="mdi mdi-close mdi-36px"></i>'

    notificationCloseIcon.addEventListener('click', toggleNotifications);

    let notificationContent = document.createElement('div');
    let notificationList = document.createElement('div');
    notificationList.setAttribute('id', 'notificationList');


    /* append everything */
    let header = document.getElementsByClassName('header')[0];


    notificationHeader.appendChild(notificationLabel);
    notificationHeader.appendChild(notificationCloseIcon);

    notificationContent.appendChild(notificationList);

    notificationWrapper.appendChild(notificationHeader);
    notificationWrapper.appendChild(notificationContent);

    header.appendChild(notificationWrapper);


    displayNotifications(notificationList);
  }
}

function toggleNotifications(){
  let wrapper = document.getElementById('notificationWrapper');
  let bell = document.getElementById('notificationBell');
  if(wrapper.className.includes('hidden')){
    wrapper.classList.remove('hidden');
  } else {
    wrapper.classList.add('hidden');
    bell.innerHTML = '<i class="mdi mdi-bell mdi-24px"></i>';
  }
}


function displayNotifications(displayList){
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  /* Check if user is logged in */
  if(localUser){
    db.ref('users/' + localUser.uniqueID + '/notifications').on('child_added', function(snapshot){
      let data = snapshot.val();
      let notificationKey = snapshot.key;
      let action = data.action;
      let eventID, meetupKey;

      if(action == 'invite'){
        eventID = data.eventid;
        meetupKey = data.meetupKey;
      }

      console.log('WHAT IS DATA?!', data);
      let listItem = document.createElement('div');
      let contentWrapper = document.createElement('div');

      let img = document.createElement('img');
      img.setAttribute('src', data.avatarURL);
      img.style.border = 'none';

      let fromName = document.createElement('span');
      fromName.innerText = data.fullname + ' ' + getAction(data.action);

      let time = document.createElement('span');
      time.innerText = chatMessageTimeStamp(data.time);
      time.className = 'notificationTime timeStamp';
      time.setAttribute('timeStamp', data.time);
      let btn = document.createElement('button');
      btn.innerHTML = '<i class="mdi mdi-chevron-down mdi-30px"></i>'

      /* Show more */
      let showMoreDiv = document.createElement('div');
      showMoreDiv.className = 'hidden';
      btn.addEventListener('click', function(e){
        if(showMoreDiv.className == 'hidden'){
          showMoreDiv.className = '';
          e.target.innerHTML = '<i class="mdi mdi-chevron-up mdi-30px"></i>';
        } else {
          showMoreDiv.className = 'hidden';
          e.target.innerHTML = '<i class="mdi mdi-chevron-down mdi-30px"></i>'
        }
      });

      let notImgDiv = document.createElement('div');
      contentWrapper.appendChild(img);

      notImgDiv.appendChild(fromName);
      contentWrapper.appendChild(time);


      contentWrapper.appendChild(notImgDiv);
      contentWrapper.appendChild(btn);


      /* Append stuff into showMoreDiv */

      /* If it's an invitation to a meetup */
      if(action == 'invite'){
        db.ref('meetups/' + eventID + '/' + meetupKey).once('value', function(snapshot){
          data = snapshot.val();
          console.log('WHAT IS MEETUPDATA?!?', data);
          let showMoreInfoDiv = document.createElement('div');
          showMoreInfoDiv.className = 'showMoreInfoDiv';

          let skapareDiv = document.createElement('div');
          let skapareLabel = document.createElement('span');
          skapareLabel.innerText = 'Skapare';
          let skapare = document.createElement('span')
          skapare.innerText = data.creator.fullname;
          skapareDiv.appendChild(skapareLabel);
          skapareDiv.appendChild(skapare);

          let platsDiv = document.createElement('div');
          let platsLabel = document.createElement('span');
          platsLabel.innerText = 'Plats';
          let plats = document.createElement('span')
          plats.innerText = data.placeName;
          platsDiv.appendChild(platsLabel);
          platsDiv.appendChild(plats);

          let nameDiv = document.createElement('div');
          let nameLabel = document.createElement('span');
          nameLabel.innerText = 'Name'
          let name = document.createElement('span')
          name.innerText = data.name;
          nameDiv.appendChild(nameLabel);
          nameDiv.appendChild(name);


          let adressDiv = document.createElement('div');
          let adressLabel = document.createElement('span');
          adressLabel.innerText = 'Adress';
          let adress = document.createElement('span')
          adress.innerText = data.adress;
          adressDiv.appendChild(adressLabel);
          adressDiv.appendChild(adress);
          let infoWrapper = document.createElement('div');
          infoWrapper.className = 'infoWrapper';


          infoWrapper.appendChild(skapareDiv);
          infoWrapper.appendChild(platsDiv);
          infoWrapper.appendChild(nameDiv);
          infoWrapper.appendChild(adressDiv);

          showMoreInfoDiv.appendChild(infoWrapper);

          showMoreDiv.appendChild(showMoreInfoDiv);


        });
      } else {
        console.log('LUUUL THIS IS A friendRequest!!!!');
      }

      /* append Btns */
      let btnHolder = document.createElement('div');

      let gotoEventBtn = document.createElement('button');
      let acceptInviteBtn = document.createElement('button');


      /* Om det är en inbjudan till ett meetup */
      if(action == 'invite'){

        gotoEventBtn.innerText = 'Tacka nej';
        acceptInviteBtn.innerText = 'Acceptera';
        gotoEventBtn.className = 'gotoBtn';
        acceptInviteBtn.className = 'gotoBtn';

        gotoEventBtn.addEventListener('click', function(e){
            /* Tacka nej */
            db.ref('users/' + localUser.uniqueID + '/notifications/'+notificationKey).remove();
            displayList.removeChild(listItem);
        });

        acceptInviteBtn.addEventListener('click', function(e){
          joinMeetup(localUser, meetupKey, eventID);
          printMessage('success', 'Du gick med i meetupet');
        });

      } else if(action == 'friendRequest'){
        gotoEventBtn.innerText = 'Tacka nej';
        acceptInviteBtn.innerText = 'Acceptera';
        gotoEventBtn.className = 'gotoBtn';
        acceptInviteBtn.className = 'gotoBtn';

        gotoEventBtn.addEventListener('click', function(e){
            /* Tacka nej */
            db.ref('users/' + localUser.uniqueID + '/notifications/'+notificationKey).remove();
            displayList.removeChild(listItem);
        });

        acceptInviteBtn.addEventListener('click', function(e){
          addFriend(data.fromSID);
          db.ref('users/' + localUser.uniqueID + '/notifications/'+notificationKey).remove()
          displayList.removeChild(listItem);
        });
      }


      btnHolder.appendChild(gotoEventBtn);
      btnHolder.appendChild(acceptInviteBtn);

      showMoreDiv.appendChild(btnHolder);


      /* Append final stuff */

      listItem.appendChild(contentWrapper);
      listItem.appendChild(showMoreDiv);

      if(displayList.firstChild){
        displayList.insertBefore(listItem, displayList.firstChild);
      } else {
        displayList.appendChild(listItem);
      }
    });
  }
}

function getAction(action){

  if(action == 'invite'){
    return ' bjöd in dig till ett meetup';
  } else if(action == 'friendRequest'){
    return ' la till dig som vän';
  }

}

// Denna funktion beräknar vad som ska visas som tid på varje chattmeddelande!
function chatMessageTimeStamp(timeStamp){
  let currTime = new Date().getTime();
  //console.log('Current time is: ', currTime);
  let difference = currTime - timeStamp;
  //console.log('Difference:', difference);
  let seconds = Math.floor((difference / 1000));
  let minutes = Math.floor((difference / 1000 / 60));
  let hours = Math.floor((difference / 1000 / 60 / 60));
  let days = Math.floor((difference / 1000 / 60 / 60 / 24));
  // console.log('Divided by 1000 then 60:', difference / 1000 / 60);
  // console.log('Current date: ', new Date(currTime));
  // console.log('Timestamp date:', new Date(timeStamp));
  //console.log(timeStamp);

  // console.log('Sekunder: ' + seconds);
  // console.log('Minuter: ' + minutes);
  // console.log('Timmar: ' + hours);

  if(days > 0){
    if(days == 1){
      return ' en dag sedan';
    } else {
      return days + ' dagar sedan';
    }
  } else if(hours > 0){
    if(hours == 1){
      return hours + ' timme sedan';
    } else {
      return hours + ' timmar sedan';
    }
  } else if(minutes > 0){
      if(minutes == 1){
        return minutes + ' minut sedan';
      } else {
        return minutes + ' minuter sedan';
      }
  } else if (seconds > 0){
      if(seconds == 1){
        return seconds + ' sekund sedan';
      } else {
        return seconds + ' sekunder sedan';
      }
  } else {
    return 'nu';
  }
}

// Funktion för att gå med i ett meetup!
function joinMeetup(user, meetupKey, eventID){

  // joinMeetup(currentUser.uniqueID, currentUser.avatarURL, currentUser.fullname, meetupKey, eventID);
  db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

    let data = snap.val();
    let userIsNotComing = false;

    for(let comingUser in data){
      if(data[comingUser].uniqueID == user.uniqueID) {
        userIsNotComing = true;
      }
    }

    let userObject = {
      uniqueID: user.uniqueID,
      sid: user.sid,
      fullname: user.fullname,
      avatarURL: user.avatarURL,
      joined: firebase.database.ServerValue.TIMESTAMP
    }
    console.log('DATA IS: ', data);
    if(!userIsNotComing){
      db.ref('meetups/' + eventID + '/' + meetupKey + '/members').push(userObject);
      console.log('Vi la till dig i meetupet!');
      new SystemMessage(meetupKey, userObject.fullname + ' gick med i meetupet.').push();


      // Lägg till meetup i användarens profil.
      addUserMeetup(userObject.uniqueID,eventID, meetupKey);
    } else {
      console.log('Du är redan med i detta meetup! Något måste gått fel!');
    }
  });
}
