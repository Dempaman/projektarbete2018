// Globala variabler
console.log('this should be printed');
const ticketMasterApiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';
const googleApiKey2 = 'AIzaSyDKH_D_sb0D4yfJy5OwO-SZf5kAFDGX7vo';

// Initalize the page based on window location.
window.onload = function(){
console.log(chatMessageTimeStamp(1519755958554));
console.log(chatMessageTimeStamp(1516758062943));



  // Turned off for debug purposes
  //document.getElementById('eventTitle').addEventListener('click', retrieveEventInfo);


}

function createEventListenersForBtns(eventid, url, onsale){
  let buyBtn = document.getElementById('eventDivButtons').children[0];

  let createMeetupBtn = document.getElementById('eventDivButtons').children[2];

  if(onsale){
    buyBtn.addEventListener('click', function(){
      window.open(url);
      console.log('Köp biljett hos Ticketmaster!');
    });
  } else {
    buyBtn.disabled = true;
    buyBtn.innerText = 'Inga biljetter finns';
    buyBtn.className = 'noTicketsBtn';
  }


  createMeetupBtn.addEventListener('click', function(){

    // Init the skapa meetup modal HERE
    toggleCreateMeetupModal();
    initSliderAndMoreShit();
    console.log('DOES THIS EVEN FIRE?!');
    // Create meetup btn Function

  });

}

function retrieveMeetupInfo(eventDate){
  advancedListenerThatUpdatesTheDomLikeABoss(getLocationInfo()[0]);
  db.ref('meetups/'+getLocationInfo()[0]).on('child_added', function(snapshot){

    let eventID = getLocationInfo()[0];
    let obj = snapshot.val();
    let meetupKey = snapshot.key;
    //console.log('NYCKEL:', meetupKey);

    // Initalize the sick advancedListenerThatUpdatesTheDomLikeABoss HERE


    //console.log(obj);

    // Skapa funktion här som lägger till ett meetupkort!
    let md = document.createElement('div');
    md.setAttribute('id', 'meetup-' + meetupKey);

    let meetupDivTitle = document.createElement('h2');
    meetupDivTitle.innerText = obj.name;

    let meetupDivDate = document.createElement('p');
    meetupDivDate.innerText = eventDate + ' - ' + obj.time;


    // Namn på skaparen av meetup och label med bild.

    let creatorDiv = document.createElement('div');
    creatorDiv.className = 'creatorDiv';
    let insideCreatorDiv = document.createElement('div');

    let creatorNameLabel = document.createElement('p');
    creatorNameLabel.innerText = 'Skapare';
    let creatorName = document.createElement('p');
    creatorName.innerText = obj.creator.fullname;


    insideCreatorDiv.appendChild(creatorNameLabel);
    insideCreatorDiv.appendChild(creatorName);

    // ProfilbildsURL
    let creatorAvatarURL = document.createElement('img');
    creatorAvatarURL.setAttribute('alt', obj.creator.name + '\'s avatar.');
    creatorAvatarURL.setAttribute('src', obj.creator.avatarURL);
    creatorAvatarURL.className = 'avatar';

    creatorDiv.appendChild(creatorAvatarURL);
    creatorDiv.appendChild(insideCreatorDiv);

    // Skaparns mail
    let creatorMailDiv = document.createElement('div');
    creatorMailDiv.className = 'infoDiv';
    let creatorMailLabel = document.createElement('p');
    creatorMailLabel.innerText = 'Kontaktinformation';
    let creatorMail = document.createElement('p');
    creatorMail.innerText = obj.creator.mail;

    creatorMailDiv.appendChild(creatorMailLabel);
    creatorMailDiv.appendChild(creatorMail);


    //Deltagare + Åldersgräns wrapper
    let ageAntalWrapper = document.createElement('div');
    ageAntalWrapper.className = 'infoDivWrapper';

    // Deltagare

    let currentMembers = 0;

    for(let thisisnotused in obj.members){
      currentMembers++;
    }


    let antalDiv = document.createElement('div');
    antalDiv.className = 'infoDiv';

    let antalLabel = document.createElement('p');
    antalLabel.innerText = 'Deltagare';
    let antal = document.createElement('p');
    antal.innerText = currentMembers + '/' + obj.spots;



    antalDiv.appendChild(antalLabel);
    antalDiv.appendChild(antal);

    // Åldersgräns
    let ageDiv = document.createElement('div');
    ageDiv.className = 'infoDiv';

    let ageIntervalLabel = document.createElement('p');
    ageIntervalLabel.innerText = 'Åldersgräns';
    let ageInterval = document.createElement('p');
    ageInterval.innerText = obj.ageInterval[0] + ' - ' + obj.ageInterval[1];

    ageDiv.appendChild(ageIntervalLabel);
    ageDiv.appendChild(ageInterval);

    ageAntalWrapper.appendChild(ageDiv);
    ageAntalWrapper.appendChild(antalDiv);

    // Adress
    let addressDiv = document.createElement('div');
    addressDiv.className = 'infoDiv';

    let addressLabel = document.createElement('p');
    addressLabel.innerText = 'Adress';
    let address = document.createElement('p');
    address.innerText = obj.address;

    addressDiv.appendChild(addressLabel);
    addressDiv.appendChild(address);


    /* MAKE THE CARD HERE, PLACED RIGHT IN THE MEETUP */

    // Kort wrapper!
    let addressCard = document.createElement('div');
    addressCard.className = 'addressCard';

    // Plats
    let placeNameLabel = document.createElement('p');
    let placeName = document.createElement('p');
    placeNameLabel.innerText = 'Plats';
    placeName.innerText = obj.placeName;

    //Address!
    let cardAddressLabel = document.createElement('p');
    let cardAddress = document.createElement('p');
    cardAddress.innerText = obj.address;
    cardAddressLabel.innerText = 'Adress';

    let cardDateLabel = document.createElement('p');
    let cardDate = document.createElement('p');
    cardDateLabel.innerText = 'Datum & Tid';
    cardDate.innerText = eventDate + ' kl ' + obj.time;

    // Splice latitude and longitude
    let latitude = obj.latitude.substring(0,9);
    let longitude = obj.longitude.substring(0,9);
    //console.log('LATITUDE!!', latitude);
    //console.log('LONGITUDE!!', longitude);


    let googleMapDiv = document.createElement('div');
    let googleMap = document.createElement('img');
    googleMapDiv.className = 'googleMapDiv';
    // Just src
    googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);

    // Data-src - Debug shit
    // googleMap.setAttribute('data-src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);

    googleMapDiv.appendChild(googleMap);

    //Append into the card:

    addressCard.appendChild(placeNameLabel);
    addressCard.appendChild(placeName);

    addressCard.appendChild(cardAddressLabel);
    addressCard.appendChild(cardAddress);

    addressCard.appendChild(cardDateLabel);
    addressCard.appendChild(cardDate);

    addressCard.appendChild(googleMapDiv);

    let infoDiv = document.createElement('div');
    infoDiv.className = 'meetupInfo';

    let infoTextLabel = document.createElement('p')
    infoTextLabel.innerText = 'Information';
    let infoText = document.createElement('p');
    infoText.innerText = obj.info;

    infoDiv.appendChild(infoTextLabel);
    infoDiv.appendChild(infoText);

    let meetupWrapper = document.getElementById('meetupWrapper');

    // Gå med knapp
    let btnDiv = document.createElement('div');
    btnDiv.className = 'btnHolder';
    let joinMeetupBtn = document.createElement('button');

    joinMeetupBtn.className = 'purple';
    joinMeetupBtn.innerText = 'Gå med i meetup';

    btnDiv.appendChild(joinMeetupBtn);

    md.appendChild(meetupDivTitle);
    md.appendChild(meetupDivDate);
    md.appendChild(creatorDiv);
    md.appendChild(creatorMailDiv);
    md.appendChild(ageAntalWrapper);
    md.appendChild(addressDiv);
    md.appendChild(addressCard);
    md.appendChild(infoDiv);

    // Display button based on if the user is in the meetup or not.
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if(currentUser){

      db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

        let data = snap.val();
          // Om det finns minst en medlem i meetupet. Vilket det alltid ska göra.
          if(data != null){
            console.log('Members coming to this Meetup: ',data);

            // Gå igenom användaregenskaperna under denna medlem
            let show = null;
            for(let user in data){
              // Om användaren som är inloggad finns i detta meetup så sätter vi userIsInMeetup till true

              if(data[user].uniqueID == currentUser.uniqueID){
                show = true;
              }
            }
            if(show){
              displayMembersAndChat(md, meetupKey);
            } else {
              md.appendChild(btnDiv);
            }
          } else {
            console.warn('Data is null for the members of this meeup!');
          }
      });
    } else {
      md.appendChild(btnDiv);
      console.log('NO EFFING USER');
    }


    // Append MAINDIV (md)
    meetupWrapper.appendChild(md);

    // Create Eventlistener for the joinMeetupBtn
    joinBtnListener(joinMeetupBtn, meetupKey);

  });
}

// Funktion för att gå med i ett meetup!
function joinMeetup(userID, avatarURL, fullname, meetupID, eventID){

  // joinMeetup(currentUser.uniqueID, currentUser.avatarURL, currentUser.fullname, meetupKey, eventID);
  db.ref('meetups/' + eventID + '/' + meetupID + '/members').once('value', function(snap){

    let data = snap.val();
    let userIsNotComing = false;

    for(let comingUser in data){
      if(data[comingUser].uniqueID == userID) {
        userIsNotComing = true;
      }
    }

    let userObject = {
      uniqueID: userID,
      fullname: fullname,
      avatarURL: avatarURL,
      joined: firebase.database.ServerValue.TIMESTAMP
    }

    if(!userIsNotComing){
      db.ref('meetups/' + eventID + '/' + meetupID + '/members').push(userObject);
      console.log('Vi la till dig i meetupet!');
      new SystemMessage(meetupID, userObject.fullname + ' gick med i meetupet.').push();
    } else {
      console.log('Du är redan med i detta meetup! Något måste gått fel!');
    }
  });
}

// Denna funktion uppdaterar dom:en när det sker en ändring i databasen!
function advancedListenerThatUpdatesTheDomLikeABoss(eventID){

  db.ref('meetups/'+eventID).on('child_changed', function(snapshot){
    // DatabaseObject
    let meetup = snapshot.val();
    let meetupKey = snapshot.key;
    let currentUser = localStorage.getItem('loggedInUser');
    // Definiera dom-objektet.
    let meetupWrapper = document.getElementById('meetup-' + meetupKey);
    console.log(meetupWrapper);

    // Dags att uppdatera det appropriatly.

    //Uppdaterar titeln
    meetupWrapper.children[0].innerText = meetup.name;

    // Uppdaterar tid! - Splittar datumet för att kunna plocka bort tiden. Uppdaterar den sedan.
    let childOne = meetupWrapper.children[1];
    childOne.innerText = childOne.innerText.split(' - ')[0] + ' - ' + meetup.time;

    let creatorDiv = meetupWrapper.children[2];
    //Img of the user avatar
    creatorDiv.children[0].setAttribute('src', meetup.creator.avatarURL);

    // This is the path to the creator name displayed in the dom.
    creatorDiv.children[1].children[1].innerText = meetup.creator.fullname;

    let contactInfoDiv = meetupWrapper.children[3];
    contactInfoDiv.children[1].innerText = meetup.creator.mail;


    // Åldersgräns samt Deltagare
    let ageAndMembersDiv = meetupWrapper.children[4];
    ageAndMembersDiv.children[0].children[1].innerText = meetup.ageInterval[0] + ' - ' + meetup.ageInterval[1];

    // Count current members.
    let i = 0;
    for(let member in meetup.members){
      i++;
    }

    ageAndMembersDiv.children[1].children[1].innerText = i + '/' + meetup.spots;

    //Adressen
    let adressDiv = meetupWrapper.children[5];
    adressDiv.children[1].innerText = meetup.address;

    // Google map is meetupWrapper.children[6]

    let infoBox = meetupWrapper.children[7];
    infoBox.children[1].innerText = meetup.info;

    let memberOrButton = meetupWrapper.children[8];

    // Display members and shit!
    if(memberOrButton.className == 'moreMeetupInfoDiv'){
        // If the user that is logged in isn't in the meetup anymore. Hide this.
        let found = false;
        console.log('Members are displayed!');

        let membersWrapper = memberOrButton.children[1]; // Emptying the members list with this method: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while(membersWrapper.firstChild){
          membersWrapper.removeChild(membersWrapper.firstChild);
        }

        // Update the member list!
        for(let member in meetup.members){
          if(currentUser.uniqueID == meetup.members[member].uniqueID) { found = true; }
          let memberDiv = document.createElement('div');
          memberDiv.className = 'memberDiv';

          let memberImage = document.createElement('img');
          memberImage.setAttribute('src', meetup.members[member].avatarURL);

          let hoverMessage = document.createElement('p');
          hoverMessage.innerText = meetup.members[member].fullname;
          hoverMessage.className = 'hoverMessage';

          memberDiv.appendChild(memberImage);
          memberDiv.appendChild(hoverMessage);
          membersWrapper.appendChild(memberDiv);
        }

    } else if(memberOrButton.className == 'btnHolder'){
        console.log('This is a button.'); // This most likely the btn to join the meetup.

        // Now check if the logged in user just got added to the database!
        for(let member in meetup.members){
          let userStr = localStorage.getItem('loggedInUser');
          let user = JSON.parse(userStr);
          if(user){
            if(user.uniqueID == meetup.members[member].uniqueID){
              console.log('THIS PERSON JUST JOINED THIS MEETUP!!');
              if(memberOrButton.parentNode){
                memberOrButton.parentNode.removeChild(memberOrButton);
              }
              displayMembersAndChat(null, meetupKey);

            }
          } else {
            console.log('No user logged in!');
          }
        }
    }
  });

}

function displayMembersAndChat(md, meetupKey){
    let eventID = getLocationInfo()[0];

    if(md == null){
      md = document.getElementById('meetup-' + meetupKey);
    }


    // Börja med att skapa wrappern för allting som ska visas när man är med i ett meetup!
    let moreMeetupInfoDiv = document.createElement('div');
    moreMeetupInfoDiv.className = 'moreMeetupInfoDiv';

    // Visa medlemmar här nedan

    // Skapa label för medlemmar
    let membersLabel = document.createElement('p');
    membersLabel.innerText = 'Personer som kommer';
    moreMeetupInfoDiv.appendChild(membersLabel);

    // Loopa igenom och skapa användarna.
    let membersWrappingDiv = document.createElement('div');

    membersWrappingDiv.className = 'membersWrappingDiv';

    // Spara nuvarande användare i databaseUser.
    let joinedTime = null;
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

      let data = snap.val();
      for(let comingUser in data){
        let memberDiv = document.createElement('div');
        memberDiv.className = 'memberDiv';

        let memberDivAvatar = document.createElement('img');
        memberDivAvatar.setAttribute('alt', 'User picture');
        memberDivAvatar.setAttribute('src', data[comingUser].avatarURL);

        let hoverMessage = document.createElement('p');
        hoverMessage.innerText = data[comingUser].fullname;
        hoverMessage.className = 'hoverMessage';

        if(comingUser != 'creator'){
          if(data[comingUser].uniqueID == currentUser.uniqueID){
            console.log('This is the user right now! Set the joinedTime');
            joinedTime = data[comingUser].joined;
          } else {
            console.log('This is not the current user. This person joined the meetup at: ' + data[comingUser].joined);
          }
        } else {
          console.log('This is the creator.. No joined time here :/');
        }



        memberDiv.appendChild(memberDivAvatar);
        memberDiv.appendChild(hoverMessage);
        membersWrappingDiv.appendChild(memberDiv);
      }

    });

    // Append the members inside a div into the wrapper.

    // Börja med att skapa label för chatten
    let chattLabel = document.createElement('p');
    chattLabel.innerText = 'Meetup Chatt';

    // Skapa wrapper för chatten
    let chattWrapperDiv = document.createElement('div');
    chattWrapperDiv.className = 'chattWrapperDiv';

    // Inputbox box
    let inputBox = document.createElement('input');
    inputBox.setAttribute('placeholder', 'Skriv ett meddelande');

    // Variables for the message
    let senderID = currentUser.uniqueID;
    let avatarURL = currentUser.avatarURL;

    // Add Eventlistener for the inputBox
    console.log('ADDING EVENTLISTENER FOR KEYPRESS');
    inputBox.addEventListener('keypress', createMessage);

    let noMessage = document.createElement('p');
    noMessage.innerText = 'Inga meddelanden ännu.';
    noMessage.className = 'noMessage';

    chattWrapperDiv.appendChild(noMessage);
    chattWrapperDiv.setAttribute('id', 'chat' + meetupKey);
    let first = true;

    // start listening to chat messages on this meetupKey
    listenToChat(meetupKey, joinedTime);
    // End of chat


    // Create leaveMeetupBtn if the user isn't the creator!
    let appendBtn = false;
    let leaveMeetupBtn = document.createElement('button');

    db.ref('meetups/' + eventID + '/' + meetupKey + '/creator').once('value', function(snapshot){
      let data = snapshot.val();
      console.log('Compare', currentUser.uniqueID, data.uniqueID);
      if(data.uniqueID == currentUser.uniqueID){
        console.log('Lets not show leave meetup button :)');
      } else {
        appendBtn = true;

        leaveMeetupBtn.innerText = 'Lämna meetup';
        leaveMeetupBtn.className = 'leaveMeetupBtn';

        leaveMeetupBtn.addEventListener('click', function(event){
          event.target.style.backgroundColor = '#444';
          leaveMeetup(meetupKey);
        });
      }
    });

    // Append the members and chat into the moreMeetupInfoDiv
    moreMeetupInfoDiv.appendChild(membersWrappingDiv);

    // Append label
    moreMeetupInfoDiv.appendChild(chattLabel);

    //Append the chatt
    moreMeetupInfoDiv.appendChild(chattWrapperDiv);

    //Append inputBox
    moreMeetupInfoDiv.appendChild(inputBox);

    //Append leave meetup button if the User isn't the creator
    if(appendBtn) moreMeetupInfoDiv.appendChild(leaveMeetupBtn);

    //Append moreMeetupInfoDiv into the MAINDIV and listen for the leave event
    md.appendChild(moreMeetupInfoDiv);

    //Lägg till en lyssnare ifall någon lämnar detta meetup!
    restoreJoinBtn(meetupKey);
}

// Stop listenting to chat messages on this meetupKey
function stopListenToChat(meetupKey){
  db.ref('chats/' + meetupKey).off();
}

function createMessage(event){
  if(event.keyCode == 13){
    if(localStorage.getItem('loggedInUser')){
      updateTimeStamps();
      // Some easy checks.
      if(event.target.value == "" || event.target.value == undefined || event.target.value == " "){
        console.log('No message specified!');
      } else if(event.target.value.length < 3){
        console.log('Message too short!');
      } else if(event.target.value.length > 200){
        console.log('Message too long!');
      } else {
        // Send message to the database constructor(senderID, avatarURL, meetupID, fullname)
        let textmessage = event.target.value;
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let md = event.target.parentNode.parentNode; // Meetup Div
        let ms = md.getAttribute('id'); // meetup String

        let meetupKey = ms.replace('-', '&').split('&')[1]

        let newMessage = new UserMessage(currentUser.uniqueID, currentUser.avatarURL, meetupKey, currentUser.fullname, textmessage);

        newMessage.push();

        let chattWrapperDiv = event.target.previousSibling;
        // Scroll to the bottom of the div we're typing the message into! From this: https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
        chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;

        // Clear Inputbox
        event.target.value = '';
      }
    } else {
      console.log('You are not logged in');
    }
  }
}

// Start to listen to chat messages on this meetupKey
function listenToChat(meetupKey, joinedTime){
  let first = true;
  let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  for(let wrapperDiv in document.getElementsByClassName('chattWrapperDiv')){
    wrapperDiv.scrollTop = wrapperDiv.scrollHeight;
  }

  db.ref('chats/' + meetupKey).on('child_added', function(snapshot){
    let chattWrapperDiv = document.getElementById('chat' + meetupKey);
    let message = snapshot.val();
    let messageKey = snapshot.key;
    // Should we display the message? If the message was made before the player joined we don't show it.
    if(joinedTime <= message.time){

      if(first){
        while(chattWrapperDiv.firstChild){
          chattWrapperDiv.removeChild(chattWrapperDiv.firstChild);
        }
        first = false;
      }

      // Create the message DIV to be printed on the DOM
      let messageDiv = document.createElement('div');
      messageDiv.className = 'chattMessageDiv';

      // Create the avatar picture
      let avatarImg = document.createElement('img');
      avatarImg.setAttribute('src', message.avatarURL);
      messageDiv.appendChild(avatarImg);

      // Create the timeStamp
      let timeStamp = document.createElement('p');
      timeStamp.innerText = chatMessageTimeStamp(message.time);
      timeStamp.setAttribute('timeStamp', message.time);
      timeStamp.className = 'timeStamp';

      // Create the fullname
      let fullname = document.createElement('p');
      fullname.innerText = message.fullname;

      // Create the actual message
      let textmessage = document.createElement('p');
      textmessage.innerText = message.textmessage;

      // Create a div to hold name + timeStamp
      let messageWrapper = document.createElement('div');
      messageWrapper.className = 'messageWrapper';

      messageWrapper.appendChild(fullname);
      messageWrapper.appendChild(timeStamp);

      //Create textmessage wrapperDiv
      let textmessageWrapper = document.createElement('div');
      textmessageWrapper.className = 'textmessageWrapper';

      // Create Like Button and counter
      let likeCount = document.createElement('span');
      likeCount.className = 'likeCount ' + messageKey;
      let likeBtn = document.createElement('span');

      // If the current user has liked this message, put this as a filled heart already!
      db.ref('likes/' + messageKey  + '/' + currentUser.uniqueID).once('value', function(newShot){
        if(newShot.val()){
          likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
        } else {
          likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
        }
      });


      // Add eventListener for the likeButton
      likeBtn.addEventListener('click', function(event){
        if(likeBtn.innerHTML == '<i class="mdi mdi-heart-outline"></i>'){
          toggleLike(messageKey);
          likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
        } else {
          toggleLike(messageKey);
          likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
        }
      });

      likeListenerOn(messageKey);
      // Append it into the textmessageWrapper
      textmessageWrapper.appendChild(textmessage);
      textmessageWrapper.appendChild(likeCount);
      textmessageWrapper.appendChild(likeBtn);
      messageWrapper.appendChild(textmessageWrapper);

      // Append everything into the messageDiv
      messageDiv.appendChild(avatarImg);
      messageDiv.appendChild(messageWrapper);


      chattWrapperDiv.appendChild(messageDiv);

      chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
    }

  });
}

// Denna funktion uppdaterar tiden på meddelanden!
function updateTimeStamps(){
  let timestamps = document.getElementsByClassName('timeStamp');

  // We should limit this to the latest 10-30 messages?, will create weird stuff later if noticed.
  for(let stamp of timestamps){
    let messageTime = stamp.getAttribute('timeStamp');
    stamp.innerText = chatMessageTimeStamp(messageTime);
  }
}

// Denna funktion lyssnar på ifall någonting plockas bort ur databasen!
function restoreJoinBtn(meetupKey){
  let eventid = getLocationInfo()[0];

  db.ref('meetups/'+eventid+'/'+meetupKey + '/members').on('child_removed', function(snapshot){
    let data = snapshot.val();
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('This was removed: ',data);

        if(currentUser.uniqueID == data.uniqueID){
          // Alert('It was you who left!');
          let md = document.getElementById('meetup-'+meetupKey);
          stopListenToChat(meetupKey);
          // Remove the eventListener for inputBox here for this user. DEBUG CODE, Might be useful.
          // let inputBox = document.getElementById('chat'+meetupKey).nextSibling;
          // console.log(inputBox);
          //
          // inputBox.removeEventListener('keypress', createMessage);
          // inputBox.setAttribute('placeholder', 'You got kicked :(');

          // Remove the mainDiv and append a join btn!
          md.removeChild(md.children[8]);


          // Gå med knapp
          let btnDiv = document.createElement('div');
          btnDiv.className = 'btnHolder';
          let joinMeetupBtn = document.createElement('button');

          joinMeetupBtn.className = 'purple';
          joinMeetupBtn.innerText = 'Gå med i meetup';

          btnDiv.appendChild(joinMeetupBtn);

          joinBtnListener(joinMeetupBtn, meetupKey);

          md.appendChild(btnDiv);
        }
  });
}

// Lämna ett meetup!
function leaveMeetup(meetupKey){
  stopListenToChat(meetupKey);
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  let eventID = getLocationInfo()[0];

  db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snapshot){
    let data = snapshot.val();
    let key = snapshot.key;

    for(let member in data) {
      if(user.uniqueID == data[member].uniqueID){
        if(member == 'creator'){
          console.log('Du kan inte lämna detta meetup då du har skapat det! Radera det istället.');
        } else {
          db.ref('meetups/' + eventID + '/' + meetupKey + '/members/'+member).remove();
          new SystemMessage(meetupKey, user.fullname + ' lämnade meetupet.').push();
          console.log('Raderade användaren ifrån meetupet i databasen?');
        }
      }
    }
  });

}

function displayEventInfo(event){

  let imgHolder = document.getElementById('imageHolder').children[0];
  imgHolder.style.background = 'url("'+event.imageURL+'")';
  imgHolder.style.backgroundRepeat =  'no-repeat';
  imgHolder.style.backgroundSize = 'cover';
  imgHolder.style.backgroundPosition = 'center';

  // Add google map!
  let googleMapImg = document.getElementById('imageHolder').children[1];
  let googleMapImgURL = `https://maps.googleapis.com/maps/api/staticmap?center=${event.address}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${event.address}&key=${googleApiKey2}`;
  googleMapImg.style.background = 'url("'+googleMapImgURL+'")';
  googleMapImg.style.backgroundRepeat =  'no-repeat';
  googleMapImg.style.backgroundSize = 'cover';
  googleMapImg.style.backgroundPosition = 'center';

  // Set the Date
  document.getElementById('eventDate').innerText = displayDate(event.date, event.weekDay, event.offsale);
  document.getElementById('eventTitle').innerText = event.name;
  console.log('Event is:',event);


  // Om platsen inte finns (Göteborg - Ullevi) så skriver vi bara ut staden.
  if(event.place == undefined){
    document.getElementById('eventPlace').innerText = event.city;
  } else {
    document.getElementById('eventPlace').innerText = event.place + ', ' + event.city;
  }

  retrieveMeetupInfo(event.date);
  //updateEventInfo(event.name, event.priceRange, event.currency, event.onsale);
}

function retrieveEventInfo(){
  console.log('HREF: '+window.location.pathname);
  if(window.location.pathname.includes('eventpage.html')){
    let eventid = getLocationInfo()[0];
    //console.log('EVENTID IS', eventid);

    if(eventid != undefined){
      fetch(`https://app.ticketmaster.eu/mfxapi/v1/event/${eventid}?domain_id=sweden&apikey=${ticketMasterApiKey}`, null)
      .then(function(response){

        //console.log(response);
        return response.json();
      })
      .then(function(json){
        //console.log('EVENTOBJECT without formatting:',json);
          let latitude = 58, longitude = 15;
          let event = json;
          let imageURL = event.images[0].url;
          let venue = event.venue;
          let priceRanges = event.price_ranges;
          let address = venue.location.address;
          let date = event.localeventdate;
          let offsale = event.offsale.value;

          // createMarker(latitude, longitude);
          //console.log('ImageUrl', imageURL);

          let eventObject = new EventClass(eventid, event.name, date, venue.name, address.address, address.city, event.properties.seats_avail, event.properties.minimum_age_required, [priceRanges.including_ticket_fees.min, priceRanges.including_ticket_fees.max], event.currency, 'EventInformation', event.images[0].url, event.day_of_week, offsale);

          console.log('EVENTOBJECT: ',eventObject);

          // Eventet hittades, information visas!
          displayEventInfo(eventObject);

          // Skapa eventListeners för knapparna!
          createEventListenersForBtns(eventid, event.url, event.properties.seats_avail);

          pageLoaded();
      })
      .catch(function(error){
        console.log('Här skedde det ett fel! Försöker vi plocka fram något som inte skickas med?');
        console.log('Felmeddelande:',error);
      })
    }

  } else {
    console.log('This function should not run on this page.');
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

//Funktion för att visa datumet lite finare :)
function displayDate(dateStr, weekDay, offsale){

  let date, time, year, month, day;

  if(!dateStr && offsale){
    dateStr = offsale;
  }

  // Make the checks
  if(dateStr.includes('T')){
    dateStr = dateStr.split('T');

    console.log('datestr: ',dateStr)

  } else {
    console.log('DateSTRING: ',dateStr);
    dateStr = dateStr.split('-');

    year = dateStr[0];
    month = dateStr[1];
    day = dateStr[2];

  }

  // Om tiden finns, plocka bort millisekunder samt Z
  if(time){
    time = time.substring(0, time.length-4);
  } else if(offsale){ // Annars försöker vi hämta tiden ifrån offsale datumet ifall det är samma dag. (Risky)
    date = offsale.split('T')[0];
    date = date.split('-');
    if(year == date[0] && month == date[1] && day == date[2]){
      console.log('It\'s the same day!');
      time = offsale.split('T')[1];
      time = time.substring(0, time.length-4);
    } else{
      console.log('Date:', date);
      console.log(year, month, day);
    }
  }

  // Ifall dagen / månaden börjar med 0 så plocka bort nollan!
  if(day.startsWith('0')){
    day = day.replace(0, '');
  }
  if(month.startsWith('0')){
    month = month.replace(0, '');
  }

  console.log(date + ' - ' + time);
  if(weekDay){
    return weekDay + ', ' + day + '/' + month + ' kl ' + time;
  } else {
    return day + '/' + month + ' - ' + year + ' kl ' + time;
  }
}

// Denna funktion hämtar informationen ifrån window.location!
function getLocationInfo(){
  let href = window.location.href, stopcode = false;

    if(href.includes('?event')){
      href = href.split('?')[1];

      href = href.split('&');

    } else {
      console.warn('This page should only be reached with a event specified in the address field.');
      console.log('Om man ändå hamnar här kan vi redirecta till alla event / lägga en sökruta här');
      //window.location.href = 'events.html';
      stopcode = true;
    }


  let eventID = 0, meetupID = 0;

  // Innehåller platsen för många antal setters?
  if(!stopcode){
    if(href.length > 2 || href.length <= 0){
      console.warn('Invalid href!');
    } else {
        for(let loc of href){

          // Loopa igenom adressen!
          if(loc.includes('event')){

            // Om det är eventdelen av adressen ta fram eventID:et!
            eventID = loc.split('=')[1];
          } else {
            // Annars tar vi fram meetupID:et!
            meetupID = loc.split('=')[1];
          }
        }

        // Radera eventuella #
        eventID = eventID.replace('#', '');
        return [eventID, meetupID];
    }
  } else {
    return false;
  }
}

// Wikipedia api retriever
function updateEventInfo(eventName, priceRange, currency, onsale){

  fetch(`https://sv.wikipedia.org/w/api.php?action=opensearch&search=${eventName}&limit=1&format=json`)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(json){
    if(json[2].length === 0){
      let tickets = '';
      if(onsale){
        tickets = '<p>Biljetter finns för detta event finns!</p>';
      }
      document.getElementById('eventInfoText').innerHTML = `
      ${tickets}
      <p>Pris:</p>

      <span>${priceRange[0] + currency} - ${priceRange[1] + currency}</span>

      <p>Ingenting om detta event hittades på Wikipedia</p>`;
    } else {
      document.getElementById('eventInfoText').innerHTML = json[2].toString();
    }
    console.log(json);

  });
}

function toggleLike(key){
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  db.ref('likes/' + key).once('value', function(snapshot){
    let data = snapshot.val();
    if(data){
      let found = false;
      for(let uid in data){
        if(uid == user.uniqueID){
          db.ref('likes/'+key+'/'+uid).remove();
          found = true;
          console.log('unlike');
        }
      }
      if(!found){
        db.ref('likes/' + key + '/' + user.uniqueID ).set(true);
        console.log('like');
      }
    } else {
      db.ref('likes/' + key + '/' + user.uniqueID ).set(true);
      console.log('like');
    }
  });
}

function likeListenerOn(key){
  //Listen for likes
  db.ref('likes/' + key).on('child_added', function(){
    console.log('New like!');
    let likeCounters = document.getElementsByClassName('likeCount '+key);
    for(let likeCount of likeCounters){
      console.log(likeCount);
      if(likeCount.innerText){
        likeCount.innerText = (likeCount.innerText - 0) + 1;
      } else {
        likeCount.innerText = 1;
      }
    }
  });
  //Listen for unlikes
  db.ref('likes/' + key).on('child_removed', function(){
    console.log('Someone unliked :(');

    let likeCounters = document.getElementsByClassName('likeCount '+key);

    for(let likeCount of likeCounters){
      console.log(likeCount);
      if(likeCount.innerText != 1){
        likeCount.innerText = (likeCount.innerText - 0) - 1;
      } else if(likeCount.innerText == 1){
        likeCount.innerText = '';
      }
    }
  });

}

function joinBtnListener(joinMeetupBtn, meetupKey){

  joinMeetupBtn.addEventListener('click', function(event){
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let eventID = getLocationInfo()[0];

    if(currentUser){
      joinMeetup(currentUser.uniqueID, currentUser.avatarURL, currentUser.fullname, meetupKey, eventID);

    } else {
      console.log('Setup login modal here?');
      toggleLoginModal();
    }

    event.target.style.backgroundColor = '#606060';
    event.target.disabled = true;

  });
}

function pageLoaded(){
  let header = document.getElementById('navigation');
  header.className = header.className.replace('hidden', '');
  document.getElementById('imageHolder').className = '';
  document.getElementById('eventHolder').className = '';
  if(document.getElementsByClassName('spinner')[0]){
    document.getElementsByClassName('spinner')[0].className = 'hidden';
  }
}
