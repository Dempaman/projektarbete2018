function toggleMeetupDropDown(event, meetupKey, eventID, admin, creator){

  let dropDownWrapper = document.getElementById('drop'+meetupKey);
  let target = event.target;
  if(target.nodeName == 'I'){
    target = target.parentNode;
  }

  function printCloseIfNotCenter(closeEvent){
    let target = closeEvent.target;
      if(target.nodeName == 'I'){
        target = target.parentNode;
      }
      if(!target.className.includes('doNotCloseThis')){
        toggleWrapper(true);
        window.removeEventListener('click', printCloseIfNotCenter);
        console.log('Closeeed with closeIfNotCenter');
      }
  }

  if(dropDownWrapper){
    toggleWrapper();
  } else {
    /* Byt texten på knappen */

    if(target.className.includes('purple')){
      target.innerText = 'Stäng';
    } else {
      console.log('Small btn pressed for the first time :3');
    }

    /* Skapa själva dropdownmenyn */
    dropDownWrapper = document.createElement('div');
    dropDownWrapper.setAttribute('id', 'drop'+meetupKey);
    dropDownWrapper.className = 'dropDownWrapper';

    /* Skapa UL */
    let dropDownList = document.createElement('ul');
    dropDownList.className = 'doNotCloseThis';

    /* Skapa "Notiser" */
    let dropDownNotice = document.createElement('li');
    dropDownNotice.className = 'doNotCloseThis';
    dropDownNotice.innerHTML = '<i class="mdi mdi-bell-off"></i> Notifikationer'
    dropDownList.appendChild(dropDownNotice);

    listenForBellChanges(dropDownNotice, meetupKey);

    /* EventListener för "Notiser" */
    dropDownNotice.addEventListener('click', toggleMeetupNotifications);
    dropDownNotice.meetupKey = meetupKey;
    /* Skapa "Bjud in en vän" */
    let dropDownInvite = document.createElement('li');
    dropDownInvite.innerHTML = '<i class="mdi mdi-account"></i> Bjud in en vän';
    dropDownList.appendChild(dropDownInvite);

    /* EventListener för "Notiser" */
    dropDownInvite.addEventListener('click', inviteFriend);
    dropDownInvite.meetupKey = meetupKey;

    /* Skapa "Dela" */
    let dropDownShare = document.createElement('li');
    dropDownShare.innerHTML = '<i class="mdi mdi-share-variant"></i> Dela';
    dropDownList.appendChild(dropDownShare);

    /* EventListener för "Notiser" */
    dropDownShare.addEventListener('click', function(){

      var strWindowFeatures = "height=550,width=530";

      window.open(`https://www.facebook.com/sharer/sharer.php?u=https://dempaman.github.io/projektarbete2018-meWent/eventpage.html?event=${eventID}&meetup=${meetupKey}&whyDoesThisNotWork=sadFace`, '', strWindowFeatures);

    });


    /* Gör enbart nedanstående om personen är admin eller creator */
    if(admin || creator){
      /* Skapa "Redigera" */
      let dropDownEdit = document.createElement('li');
      dropDownEdit.className += ' doNotCloseThis';
      dropDownEdit.innerHTML = '<i class="mdi mdi-pencil"></i> Redigera';
      dropDownList.appendChild(dropDownEdit);

      /* EventListener för "Redigera" */
      dropDownEdit.addEventListener('click', function(event){
        dropDownEditMeetup(eventID, meetupKey);
      });


      /* Skapa "Radera" */
      let dropDownRemove = document.createElement('li');
      dropDownRemove.className = 'removeMeetupEntirelyBtn';
      dropDownRemove.innerHTML = '<i class="mdi mdi-delete"></i> Radera';
      dropDownList.appendChild(dropDownRemove);

      /* EventListener för "Radera" */
      dropDownRemove.addEventListener('click', dropDownRemoveMeetup);

    }


    /* Lägg in listan i wrappern (Själva menyn) */
    dropDownWrapper.appendChild(dropDownList);

    /* Lägg till om man klickar utanför menyn så stängs den. */
    window.addEventListener('click', printCloseIfNotCenter);

    /* Lägg ut den i dom:en */

    /* OM det är mobilknappen vi trycker på så appenda den en framför den framför */
    target.parentNode.insertBefore(dropDownWrapper, target);
  }

  function toggleWrapper(close = false){
    console.log('Toggled the dropDownMenu');

      if(dropDownWrapper.className.includes('hidden') && !close){
        if(target.className.includes('purple')){
          target.innerText = 'Stäng';
          console.log('We are now showing the dropDownMenu');
        } else if(target.previousSibling.className.includes('purple')){
          target.previousSibling.innerText = 'Stäng';
        }
        console.log('Adding printCloseIfNotCenter');
        window.addEventListener('click', printCloseIfNotCenter);
        dropDownWrapper.className = dropDownWrapper.className.replace(' hidden', '');
      } else if(!dropDownWrapper.className.includes('hidden')){
          if(target.className.includes('purple')){
            target.innerText = 'Redigera Meetup';
          } else if(target.previousSibling.className.includes('purple')){
            target.previousSibling.innerText = 'Redigera Meetup';
          }
          dropDownWrapper.className += ' hidden';
          console.log('Removing listener');
          window.removeEventListener('click', printCloseIfNotCenter);
      }

  }

  /* Remove Meetup function */
  function dropDownRemoveMeetup(event){
    //toggleWrapper();
    confirmRemoveMeetup(eventID, meetupKey);
  }
}

function confirmRemoveMeetup(eventID, meetupKey, questionParam, answer, callback){
  let confirmWrapper = document.createElement('div');
  confirmWrapper.className = 'confirmModal centered';

  /* Skapa divar */
  let divOne = document.createElement('div');
  let divTwo = document.createElement('div');

  /* Skapa fråga */
  let question = document.createElement('p');
  if(questionParam){
    question.innerHTML = '<i class="mdi mdi-alert-circle-outline mdi-36px"></i>' + questionParam;
  } else {
    question.innerHTML = '<i class="mdi mdi-alert-circle-outline mdi-36px"></i> Du håller på att radera detta meetup, är du säker?';
  }

  /* Skapa knappar */
  let yesBtn = document.createElement('button');
  if(answer){
    yesBtn.innerHTML = answer;
  } else {
    yesBtn.innerHTML = 'Ja';
  }

  let noBtn = document.createElement('button');
  noBtn.innerHTML = 'Stäng';

  /* Add Listeners */

  if(callback){
    yesBtn.addEventListener('click', function(){
      callback();
      fadeOutObject(confirmWrapper);
    });
  } else {
    yesBtn.addEventListener('click', function(){
      db.ref('meetups/' + eventID + '/' + meetupKey).remove();
      printMessage('success', 'Meetupet har raderats.', 7000, 1500);
      fadeOutObject(confirmWrapper);
    });
  }

  noBtn.addEventListener('click', function(){
    fadeOutObject(confirmWrapper);
  });

  /* Append Question */
  divOne.appendChild(question);

  /* Append buttons */
  divTwo.appendChild(yesBtn);
  divTwo.appendChild(noBtn);

  /* Append divs */
  confirmWrapper.appendChild(divOne);
  confirmWrapper.appendChild(divTwo);

  document.getElementsByTagName('body')[0].appendChild(confirmWrapper);
}

function toggleMeetupNotifications(event){
  /* Start by toggle in the DOM (To make it look cool :PppPPpPpPp) */
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if(localUser){

    /* If the user is logged in, do shit. */

    db.ref('users/' + localUser.uniqueID).once('value', function(snapshot){
      let data = snapshot.val();
      let meetupKey = event.target.meetupKey;
      let setting;

      if(data.meetupNotifications){
        /* There are some notificationSettings */
        for(let noti in data.meetupNotifications){
          if(noti == meetupKey){
            setting = data.meetupNotifications[noti];
          }
        }
      }


      if(setting){
        /* It's true, set it to false. */
        db.ref('users/' + localUser.uniqueID + '/meetupNotifications/' + meetupKey).set(false);

        /* Skriv ut ett meddelande till användaren */
        printMessage('success', 'Du stängde av notifikationer för detta meetup');
      } else {
        /* It's false, set it to true. */
        db.ref('users/' + localUser.uniqueID + '/meetupNotifications/' + meetupKey).set(true);

        /* Skriv ut ett meddelande till användaren */
        printMessage('success', 'Du startade notifikationer för detta meetup');
      }
    });

  } else {
    console.warn('No logged in user found');
  }
}

function dropDownEditMeetup(eventID, meetupKey){
  console.log('So you want me to edit this meetup? ', eventID, meetupKey);
  toggleCreateMeetupModal(true);
  initSliderAndMoreShit(true, meetupKey);
}

function fadeOutObject(htmlObj){
  htmlObj.className += ' fadeout';
  setTimeout(function(){
    if(htmlObj.parentNode){
      htmlObj.parentNode.removeChild(htmlObj);
    }
  },450);
}

function listenForBellChanges(htmlObj, meetupKey){
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if(localUser){

    db.ref('users/' + localUser.uniqueID + '/meetupNotifications/').on('value', function(snapshot){
      let data = snapshot.val();
      let found = false;
      for(let noti in data){
        let bool = data[noti];
        let key = noti;
        /* If the key in the database is the same as the meetup we'd like to set notifications on */
        if(key == meetupKey){
          found = true;
          if(bool){
            htmlObj.innerHTML = '<i class="mdi mdi-bell"></i> Notifikationer';
          } else {
            htmlObj.innerHTML = '<i class="mdi mdi-bell-off"></i> Notifikationer';
          }
          console.log('Set to: ', bool);
        }
      }
    });
  } else {
    console.error('No user logged in');
  }
}
