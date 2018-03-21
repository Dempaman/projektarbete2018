// Globala variabler
const ticketMasterApiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';
const googleApiKey2 = 'AIzaSyDKH_D_sb0D4yfJy5OwO-SZf5kAFDGX7vo';

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
    // Create meetup btn Function

  });

}

function retrieveMeetupInfo(eventDate){
  let eventID = getLocationInfo()[0];
  if(!eventID){
    console.log('Rip, no eventid somehow!');
  } else {
    advancedListenerThatUpdatesTheDomLikeABoss(eventID);

  // This one listens to new Meetups and posts them in the DOM!
    db.ref('meetups/'+eventID).on('child_added', function(snapshot){


      let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
      let eventID = getLocationInfo()[0];
      let obj = snapshot.val();
      let meetupKey = snapshot.key;
      //console.log('NYCKEL:', meetupKey);

      // Initalize the sick advancedListenerThatUpdatesTheDomLikeABoss HERE


      //console.log(obj);

      if(!meetupKey.includes('info')){
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
        antal.innerText = currentMembers + ' / ' + obj.spots;



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
        googleMapDiv.setAttribute('lat', latitude);
        googleMapDiv.setAttribute('lng', longitude);
        // Just src
        googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        googleMap.setAttribute('zoom', '16');

        googleMap.addEventListener('click', function(){
          let currentZoom = googleMap.getAttribute('zoom');
          let newZoom = (currentZoom-0) + 1;
          googleMap.setAttribute('zoom', newZoom);
          googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${newZoom}&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        });
        googleMap.addEventListener('contextmenu', function(event){
          event.preventDefault();
          let currentZoom = googleMap.getAttribute('zoom');
          let newZoom = (currentZoom-0) - 1;
          googleMap.setAttribute('zoom', newZoom);
          googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${newZoom}&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        });

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

        let editBtn = document.createElement('button');
        editBtn.className = 'editBtn purple doNotCloseThis';
        editBtn.innerHTML = 'Redigera Meetup';

        let editSmallBtn = document.createElement('button');
        editSmallBtn.className = 'editBtn iconBtn doNotCloseThis' ;
        editSmallBtn.innerHTML = '<i class="mdi mdi-dots-vertical"></i>';

        /* check if it's the creator */
        let creator = false;
        if(localUser){
          if(localUser.uniqueID == obj.creator.uniqueID){
            creator = true;
          }
        }

        editSmallBtn.addEventListener('click', function(event){
          let admin = false;

          toggleMeetupDropDown(event, meetupKey, eventID, admin, creator);
        });

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
          // Skriva om denna så att vi kan kolla ifall personen är admin / ägare.
            let comingMembers = obj.members;
            let admins = obj.admins;
            console.log('The Admins of this meetup are: ' + admins);
              // Om det finns minst en medlem i meetupet. Vilket det alltid ska göra.
              if(comingMembers != null){
                console.log('Members coming to this Meetup: ',comingMembers);

                //Get dem admins first.
                let adminBool = false;
                for(let admin in admins){
                  if(admins[admin] == currentUser.uniqueID){
                    console.log('You are the effing admin man!');
                    adminBool = true;
                  } else {
                    console.log('No admin here.');
                  }
                }

                // Gå igenom användaregenskaperna under denna medlem
                let show = null;
                for(let user in comingMembers){
                  // Om användaren som är inloggad finns i detta meetup så sätter vi userIsInMeetup till true
                  if(comingMembers[user].uniqueID == currentUser.uniqueID){
                    show = true;
                  }
                }
                if(show){
                  md.appendChild(editSmallBtn);
                  displayMembersAndChat(md, meetupKey);
                } else {
                  md.appendChild(btnDiv);
                }
              } else {
                console.warn('Data is null for the members of this meeup!');
              }

        } else {
          md.appendChild(btnDiv);
          console.log('NO EFFING USER');
        }


        // Append MAINDIV (md)
        meetupWrapper.appendChild(md);

        // Create Eventlistener for the joinMeetupBtn
        joinBtnListener(joinMeetupBtn, meetupKey);
      }
    });
  }
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

    /* Börja med att kolla om meetpet finns kvar i databasen */
    if(meetupWrapper){
      //Uppdaterar titeln
      meetupWrapper.children[0].innerText = meetup.name;

      // Uppdaterar tid! - Splittar datumet för att kunna plocka bort tiden. Uppdaterar den sedan.
      let childOne = meetupWrapper.children[1];
      let timeStr = childOne.innerText.split(' - ')[0] + ' - ' + meetup.time;
      childOne.innerText = timeStr;

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

      ageAndMembersDiv.children[1].children[1].innerText = i + ' / ' + meetup.spots;

      //Adressen
      let adressDiv = meetupWrapper.children[5];
      adressDiv.children[1].innerText = meetup.address;

      // Address card is meetupWrapper.children[6]
      let addressCard = meetupWrapper.children[6];

      let addressCardPlace = addressCard.children[1];
      addressCardPlace.innerText = meetup.placeName;

      let addressCardAdress = addressCard.children[3];
      addressCardAdress.innerText = meetup.address;

      let dateAndTime = addressCard.children[5];
      dateAndTime.innerText = timeStr;

      let infoBox = meetupWrapper.children[7];
      infoBox.children[1].innerText = meetup.info;

      let memberOrButton = document.getElementsByClassName('moreMeetupInfoDiv ' + meetupKey)[0];

      if(!memberOrButton){
        memberOrButton = meetupWrapper.children[9];
        if(memberOrButton){
          if(memberOrButton.className.includes('editBtn')){
            printMessage('error', 'fk this');
            memberOrButton = meetupWrapper.children[10];
          }
        } else {
          memberOrButton = meetupWrapper.children[8];
        }


      }

      // Display members and shit!
      if(!memberOrButton.className){
        console.log('It must be the btnHolder then?');

      } else if(memberOrButton.className.includes('moreMeetupInfoDiv')){
            // If the user that is logged in isn't in the meetup anymore. Hide this.
            let found = false;
            console.log('Members are displayed!');

            let membersWrapper = memberOrButton.children[0].children[1]; // Emptying the members list with this method: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
            while(membersWrapper.firstChild){
              membersWrapper.removeChild(membersWrapper.firstChild);
            }

            // Update the member list!
            for(let member in meetup.members){
              let user = meetup.members[member];
              if(currentUser.uniqueID == user.uniqueID) { found = true; }
              let memberDiv = document.createElement('div');
              memberDiv.className = 'memberDiv';

              let memberImage = document.createElement('img');
              memberImage.setAttribute('src', user.avatarURL);
              memberImage.setAttribute('sid', user.sid);
              memberImage.addEventListener('click', gotoProfile);
              memberImage.meetupKey = meetupKey;
              memberImage.eventID = eventID;

              let hoverMessage = document.createElement('p');
              hoverMessage.innerText = user.fullname;
              hoverMessage.className = 'hoverMessage';

              memberDiv.appendChild(memberImage);
              memberDiv.appendChild(hoverMessage);
              membersWrapper.appendChild(memberDiv);
            }
            let memberDiv = document.createElement('div');
            memberDiv.className = 'memberDiv';
            // let imageWrapper = document.createElement('div');
            // let plus = document.createElement('span');
            // plus.innerHTML = '<i class="mdi mdi-account-plus"></i>';
            let addMemberDiv = document.createElement('div');
            addMemberDiv.className = 'addMemberDiv doNotCloseThis';
            addMemberDiv.innerHTML = '<i class="mdi mdi-plus mdi-36px"></i>';
            addMemberDiv.addEventListener('click', inviteFriend);
            addMemberDiv.meetupKey = meetupKey;


            let hoverMessage = document.createElement('p');
            hoverMessage.innerText = 'Bjud in en vän!';
            hoverMessage.className = 'hoverMessage';

            // imageWrapper.appendChild(plus);
            // imageWrapper.appendChild(memberImage);
            memberDiv.appendChild(addMemberDiv);
            memberDiv.appendChild(hoverMessage);
            membersWrapper.appendChild(memberDiv);

        } else if(memberOrButton.className == 'btnHolder'){
            console.log('This is a button.'); // This most likely the btn to join the meetup.

            // Now check if the logged in user just got added to the database!
            for(let member in meetup.members){
              let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
              if(localUser){
                if(localUser.uniqueID == meetup.members[member].uniqueID){
                  console.log('THIS PERSON JUST JOINED THIS MEETUP!!');
                  addEditBtns(meetupKey);
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
    } else {
      console.log('It just got removed, sry!');
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
    moreMeetupInfoDiv.className = 'moreMeetupInfoDiv ' + meetupKey;

    // Visa medlemmar här nedan

    //Skapa wrappers för medlemmar + label samt, chatt + label + input
    let memberWrapperWithLabel = document.createElement('div');
    let chatWrapperWithLabel = document.createElement('div');
    chatWrapperWithLabel.className = 'chatWrapperWithLabel';
    // Skapa label för medlemmar
    let membersLabel = document.createElement('p');
    membersLabel.innerText = 'Personer som kommer';
    memberWrapperWithLabel.appendChild(membersLabel);

    // Loopa igenom och skapa användarna.
    let membersWrappingDiv = document.createElement('div');

    membersWrappingDiv.className = 'membersWrappingDiv';

    // Spara nuvarande användare i databaseUser.
    let joinedTime = null;
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

      let data = snap.val();
      for(let comingUser in data){
        let user = data[comingUser];
        let memberDiv = document.createElement('div');
        memberDiv.className = 'memberDiv';

        let memberDivAvatar = document.createElement('img');
        memberDivAvatar.setAttribute('alt', 'User picture');
        memberDivAvatar.setAttribute('src', user.avatarURL);
        memberDivAvatar.setAttribute('sid', user.sid);
        memberDivAvatar.addEventListener('click', gotoProfile);
        memberDivAvatar.meetupKey = meetupKey;
        memberDivAvatar.eventID = eventID;

        let hoverMessage = document.createElement('p');
        hoverMessage.innerText = user.fullname;
        hoverMessage.className = 'hoverMessage';

        if(comingUser != 'creator'){
          if(data[comingUser].uniqueID == currentUser.uniqueID){
            console.log('This is the user right now! Set the joinedTime');
            joinedTime = user.joined;
          } else {
            console.log('This is not the current user. This person joined the meetup at: ' + data[comingUser].joined);
          }
        } else {
          console.log('This is the creator.. No joined time here :/');
        }



        memberDiv.appendChild(memberDivAvatar);
        memberDiv.appendChild(hoverMessage);
        membersWrappingDiv.appendChild(memberDiv);
        memberWrapperWithLabel.appendChild(membersWrappingDiv);
      }

      let memberDiv = document.createElement('div');
      memberDiv.className = 'memberDiv';
      // let imageWrapper = document.createElement('div');
      // let plus = document.createElement('span');
      // plus.innerHTML = '<i class="mdi mdi-account-plus"></i>';
      let addMemberDiv = document.createElement('div');
      addMemberDiv.className = 'addMemberDiv doNotCloseThis';
      addMemberDiv.innerHTML = '<i class="mdi mdi-plus mdi-36px"></i>';
      addMemberDiv.addEventListener('click', inviteFriend);
      addMemberDiv.meetupKey = meetupKey;

      console.log('attribute here is: ', addMemberDiv.attribute);

      let hoverMessage = document.createElement('p');
      hoverMessage.innerText = 'Bjud in en vän!';
      hoverMessage.className = 'hoverMessage';

      // imageWrapper.appendChild(plus);
      // imageWrapper.appendChild(memberImage);
      memberDiv.appendChild(addMemberDiv);
      memberDiv.appendChild(hoverMessage);
      membersWrappingDiv.appendChild(memberDiv);

    });

    // Append the members inside a div into the wrapper.

    // Börja med att skapa label för chatten
    let chattLabel = document.createElement('p');
    chattLabel.innerText = 'Meetup Chatt';

    // Skapa wrapper för chatten
    let chattWrapperDiv = document.createElement('div');
    chattWrapperDiv.className = 'chattWrapperDiv';

    // Inputbox box
    let inputBoxWrapper = document.createElement('div');
    inputBoxWrapper.className = 'inputBoxWrapper';
    let sendIcon = document.createElement('div');
    sendIcon.innerHTML = '<i class="mdi mdi-send mdi-24px"></i>';

    let inputBox = document.createElement('input');
    inputBox.setAttribute('placeholder', 'Skriv ett meddelande');
    inputBoxWrapper.appendChild(inputBox);
    inputBoxWrapper.appendChild(sendIcon);
    // Variables for the message
    let senderID = currentUser.uniqueID;
    let avatarURL = currentUser.avatarURL;

    // Add Eventlistener for the inputBox
    console.log('ADDING EVENTLISTENER FOR KEYPRESS');
    inputBox.addEventListener('keypress', createMessage);

    inputBox.nextSibling.addEventListener('click', function(event){
      createMessage(inputBox, true);
    });

    let noMessage = document.createElement('p');
    noMessage.innerText = 'Inga meddelanden ännu.';
    noMessage.className = 'noMessage';

    chattWrapperDiv.appendChild(noMessage);
    chattWrapperDiv.setAttribute('id', 'chat' + meetupKey);
    let first = true;

    // start listening to chat messages on this meetupKey
    listenToChat(chattWrapperDiv, meetupKey, joinedTime);
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
    moreMeetupInfoDiv.appendChild(memberWrapperWithLabel);

    // Append label
    chatWrapperWithLabel.appendChild(chattLabel);

    //Append the chatt
    chatWrapperWithLabel.appendChild(chattWrapperDiv);

    //Append inputBox
    chatWrapperWithLabel.appendChild(inputBoxWrapper);

    //Append chatWrapperWithLabel
    moreMeetupInfoDiv.appendChild(chatWrapperWithLabel);

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
let lastMessages = [];
function createMessage(event, sendBtn = false){

  if(event.keyCode == 13 || sendBtn){
    let target;
    if(sendBtn){
      target = event;
    } else {
      target = event.target
    }

      /* Get the fifth message */
      if(lastMessages[lastMessages.length - 5] > (new Date().getTime() - 15000)){
        printMessage('warn', 'Nu går det lite fort här');
      } else {
        if(localStorage.getItem('loggedInUser')){
          updateTimeStamps();
          // Some easy checks.
          if(target.value == "" || target.value == undefined || target.value == " "){
            printMessage('warn', 'Du behöver specificera ett meddelande');
            console.log('No message specified!');
          } else if(target.value.length < 2){
            console.log('Message too short!');
            printMessage('warn', 'Meddelandet är lite kort');
          } else if(target.value.length > 600){
            console.log('Message too long!');
            printMessage('warn', 'Meddelandet är lite långt');
          } else {
            // Send message to the database constructor(senderID, avatarURL, meetupID, fullname)
            let textmessage = target.value;
            let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
            let md = target.parentNode.parentNode.parentNode.parentNode; // Meetup Div
            let ms = md.getAttribute('id'); // meetup String

            let meetupKey = ms.replace('-', '&').split('&')[1]
            let eventID = getLocationInfo()[0];
            db.ref('meetups/' + eventID + '/' + meetupKey + '/creator').once('value', function(snapshot){
              let creator = snapshot.val();
              console.log('Creator is:', creator);

              if(creator.uniqueID == currentUser.uniqueID){
                creator = true;
              } else {
                creator = false;
              }
              let newMessage = new UserMessage(currentUser.uniqueID, currentUser.avatarURL, meetupKey, currentUser.fullname, textmessage, creator);
              newMessage.push();
              lastMessages.push(new Date().getTime());
            });




            let chattWrapperDiv = target.parentNode.previousSibling;
            // Scroll to the bottom of the div we're typing the message into! From this: https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div


            chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
            let htmlScroll = document.getElementsByTagName('html')[0];

            // Clear Inputbox
            target.value = '';
            target.focus();
          }
        } else {
          console.log('You are not logged in');
        }
      }
  }
}

// Start to listen to chat messages on this meetupKey
function listenToChat(chattWrapperDiv, meetupKey, joinedTime){

    // Fire scroll event.
    let likeArray = [];
    let doScroll = true;
    let messageCounter = 0;
    let count = 25;

    chatMessagesChildAdded(count);

    function loadMoreMessages(event){
      // Check if we're at the top.
      if(event.target.scrollTop == 0 && event.target.scrollHeight > 1200){
        // If we are and the fire scroll is active:
        if(doScroll){
          // Disable scroll event. We activate it later.
          doScroll = false;

          // Remove old listener. (Stop listening to new messages)
          stopListenToChat(meetupKey);

          // console.log('Count: ', count);
          // console.log('MessageCount: ', messageCounter);

          // If the counter + 15 is greater than messageCounter we've reached the top!
          if(count <= messageCounter + 15){

            console.log(chattWrapperDiv.scrollHeight);
            let scrollToThis = chattWrapperDiv.scrollHeight
            console.log(chattWrapperDiv.scrollTop);
            // Start to listen to the chat again. This time add 25 to the counter.
            chatMessagesChildAdded(count += 25, true);
            //console.log('Count increased by 25! Currently displaying ' + messageCounter + ' messages');
            //chattWrapperDiv.className += ' smooth-scroll'
            setTimeout(function(){
              //Set a timeout to scroll down.
              chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight - scrollToThis;
              console.log(chattWrapperDiv.scrollHeight);
              console.log(chattWrapperDiv.scrollTop);
              //Reset the scroll
              doScroll = true;
            },180);
          } else {
            console.log('No more messages to display.');
            let noMoreMessages = document.createElement('p');
            noMoreMessages.innerText = 'Inga fler meddelanden.';
            noMoreMessages.className = 'noMessage';
            chattWrapperDiv.insertBefore(noMoreMessages,chattWrapperDiv.firstChild);
            chattWrapperDiv.removeEventListener('scroll', loadMoreMessages);
            chatMessagesChildAdded(1, false);
          }
        }
      }
    }

    chattWrapperDiv.addEventListener('scroll', loadMoreMessages);


  let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  // chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
  let displayedMessages = [];
  let first = true;
  function chatMessagesChildAdded(count, scroll = false){

    messageCounter = 0;
    let firstInsert = true, insertBefore = null;
    db.ref('chats/' + meetupKey).limitToLast(count).on('child_added', function(snapshot){

      let chattWrapperDiv = document.getElementById('chat' + meetupKey);
      let message = snapshot.val();
      let messageKey = snapshot.key;
      let doNotAppend = false;

      // Should we display the message? If the message was made before the player joined we don't show it.
      if(joinedTime <= message.time || getAdmin(currentUser.uniqueID)){

        if(first){
          while(chattWrapperDiv.firstChild){
            chattWrapperDiv.removeChild(chattWrapperDiv.firstChild);
          }
          first = false;
        }
        if(displayedMessages.includes(messageKey)){
          //console.log('Stop code plox');
          doNotAppend = true;
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

        //Create Icon hoverMessage
        let iconHoverMessage = document.createElement('span');


        // Here we got the fullname, hehe! append appropriate icons?
        if(message.system){
            fullname.innerHTML += '<i class="mdi mdi-wrench"></i>';
            iconHoverMessage.innerText = 'Systembot';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
        } else if(getAdmin(message.sender)){
            fullname.innerHTML += '<i class="mdi mdi-verified"></i>';
            iconHoverMessage.innerText = 'Administratör';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
        } else if(message.creator){
            fullname.innerHTML += '<i class="mdi mdi-approval"></i>';
            iconHoverMessage.innerText = 'Skapare';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
          }

        // Then if the user is owner of the meetup append approval


        // Create the actual message
        let textmessage = document.createElement('p');
        let actualMessage = message.textmessage;
        let failed = false, onlyOneSpotify = true;

        if(actualMessage.includes('>') || actualMessage.includes('<') || actualMessage.includes('&')){
          actualMessage = 'Oops, nåt gick fel.';
          failed = true;
        }

        /* Add links to message */
        if(message.textmessage.includes('https://') || message.textmessage.includes('http://') || message.textmessage.includes('spotify:track')&& !failed){

          /* Om meddelandet innehåller en länk av någon typ, dela upp den och skapa länkar. */
          let splittedMessage = actualMessage.split(' ');
          actualMessage = [];
          for(let word of splittedMessage){
            if(word.includes('http://') || word.includes('https://')){
              if(word.includes('https://open.spotify.com/embed/') && onlyOneSpotify){
                word = '<iframe src="' + word + '" width="300" height="80"> frameborder="0" allowtransparency="true" allow="encrypted-media" </iframe>';
                onlyOneSpotify = false;
              } else {
                word = '<a href="' + word + '">' + word + '</a>';
              }
            } else if(word.includes('spotify:track:') && onlyOneSpotify){
              onlyOneSpotify = false;
              word = word.split('spotify:track:')[1];
              word = '<iframe src="https://open.spotify.com/embed/track/' + word + '" width="300" height="80"> frameborder="0" allowtransparency="true" allow="encrypted-media" </iframe>';
            }

            actualMessage.push(word);
          }
          actualMessage = actualMessage.join(' ');
          //
          // /* Dela vid länkens början */
          // let splitStr = message.textmessage.split('https://');
          //
          // /* Dela meddelandet och ta ut länken */
          // let link = 'https://';
          //
          // /* Kolla om det inte enbart är en länk vi skickar */
          // if(splitStr[1].includes(' ')){
          //
          //   /* Kolla om resten av meddelandet innehåller ett mellanslag */
          //   /* Om meddelandet innehåller ett mellanslag, byt ut det så vi kan dela det. */
          //   splitStr[1] = splitStr[1].replace(' ', '#');
          //
          //   /* Plocka ut länken */
          //   link += splitStr[1].split('#')[0];
          //
          //   /* Sätt ihop meddelandet */
          //   actualMessage = splitStr[0] + '<a href="' + link + '"> ' + link + '</a> ' + splitStr[1].split('#')[1];
          //
          //
          // } else {
          //   /* Om det inte finns ett till mellanslag. Så är länken meddelandet. */
          //   link += splitStr[1];
          //   actualMessage = splitStr[0] + '<a href="' + link + '"> ' + link + '</a>';
          // }
        }

        textmessage.innerHTML = actualMessage;







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
        db.ref('likes/' + meetupKey + '/' + messageKey  + '/' + currentUser.uniqueID).once('value', function(newShot){
          if(newShot.val()){
            likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
          } else {
            likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
          }
        });


        // Add eventListener for the likeButton
          if(!likeArray.includes(messageKey)){
            likeListenerOn(meetupKey, messageKey);
            likeArray.push(messageKey);
          } else {
            //console.log('This btn has already a likeListenerOn');
          }

          likeBtn.addEventListener('click', function(event){
            if(likeBtn.innerHTML == '<i class="mdi mdi-heart-outline"></i>'){
              toggleLike(meetupKey, messageKey);
              likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
              likeBtn.className += ' heartbeat';
            } else {
              toggleLike(meetupKey, messageKey);
              likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
              likeBtn.className = likeBtn.className.replace(' heartbeat', '');
            }
          });

        // Append it into the textmessageWrapper
        textmessageWrapper.appendChild(textmessage);
        textmessageWrapper.appendChild(likeCount);
        textmessageWrapper.appendChild(likeBtn);
        messageWrapper.appendChild(textmessageWrapper);

        // Append everything into the messageDiv
        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(messageWrapper);



        if(doNotAppend){
          //console.log('Not appending!');
        } else if(scroll && !insertBefore){
          // First insert!
          //console.log('Scroll is true!');
          insertBefore = chattWrapperDiv.firstChild;
          chattWrapperDiv.insertBefore(messageDiv, chattWrapperDiv.firstChild);
        } else if(insertBefore && !doNotAppend && scroll){
          //console.log('This one!');
          chattWrapperDiv.insertBefore(messageDiv, insertBefore);
        } else if(!scroll){
          //console.log('Appending normally, apparently scroll is false.');
          chattWrapperDiv.appendChild(messageDiv);
        }

          displayedMessages.push(messageKey);


        // To scroll down or not to scroll down. Only if there's a user message outputted and not the scroll.
        if(!scroll){

          let scrollHeight = chattWrapperDiv.scrollHeight;
          let scrollTop = chattWrapperDiv.scrollTop;

          if(scrollHeight - 760 < scrollTop){
            chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
          } else {
            // console.log('scrollHeight is: ', scrollHeight);
            // console.log('scrollTop is: ', scrollTop);
            // console.log('scrollHeight - 760 is: ', scrollHeight - 760);
            console.log('not scrolling, too far up.');
          }
        }
        messageCounter += 1;
      } else {
        console.log('Did not print message again.');
      }
    });
    setTimeout(function(){
      scroll = false;
      insertBefore = null;
    }, 500);
  }
}


// Denna funktion lyssnar på ifall någonting plockas bort ur databasen!
function restoreJoinBtn(meetupKey){
  let eventid = getLocationInfo()[0];

  db.ref('meetups/'+eventid+'/'+meetupKey + '/members').on('child_removed', function(snapshot){
    let data = snapshot.val();
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('This was removed: ',data);
    removeUserMeetup(data.uniqueID, eventid,  meetupKey);
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
          let moreMeetupInfoDiv = md.lastChild;
          md.lastChild.className += ' overlayAnimation';

          let inputBox = document.getElementById('chat' + meetupKey).nextSibling;
          inputBox.disabled = true;
          inputBox.style.backgroundColor = '#ABABAB';
          removeEditBtn(meetupKey);
          setTimeout(function(){
            md.removeChild(md.lastChild);

            // Gå med knapp
            let btnDiv = document.createElement('div');
            btnDiv.className = 'btnHolder';
            let joinMeetupBtn = document.createElement('button');

            joinMeetupBtn.className = 'purple';
            joinMeetupBtn.innerText = 'Gå med i meetup';

            btnDiv.appendChild(joinMeetupBtn);

            joinBtnListener(joinMeetupBtn, meetupKey);

            md.appendChild(btnDiv);
          },800);





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

          /* Remove notification setting */
          db.ref('users/' + user.uniqueID + '/meetupNotifications/' + meetupKey).set(false);
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

  // Display mainCategory
  let mainCategory = document.getElementById('mainCategory');
  mainCategory.innerText = event.mainCategory;

  // Set the Date
  document.getElementById('eventDate').innerText = displayDate(event.date, event.weekDay, event.offsale);
  document.getElementById('eventTitle').innerText = event.name;
  console.log('Event is:',event);


  // Om platsen inte finns (Göteborg - Ullevi) så skriver vi bara ut staden.
  let completePlace, venuePlace = false;
  if(event.place == undefined){
    completePlace = event.city;
  } else {
    completePlace = event.place + ', ' + event.city;
    venuePlace = true;
  }
  document.getElementById('eventPlace').innerText = completePlace;

  let infoTextDatum;
  if(event.date){
    infoTextDatum = displayDate(event.date, event.weekDay, event.offsale, true);
  } else {
    infoTextDatum = '.'
  }


  let infoTextPlace;
  if(venuePlace){
    infoTextPlace = 'på ' + event.place + ' i ' + event.city + infoTextDatum;
  } else {
    infoTextPlace = 'i ' + event.city + infoTextDatum;
  }

  let ticketsAvailable;
  if(event.onsale){
    ticketsAvailable = 'Om du inte redan har en biljett kan du klicka dig in på biljettsidan via knappen nedan för att köpa en.';
  } else {
    ticketsAvailable = 'Biljetterna för detta evenemang är tyvärr slut men du kan fortfarande skapa ett meetup om du redan har en biljett.';
  }

  let artister = [];
  for(let i = 0; i < event.attractions.length; i++){
    let artist = event.attractions[i];

    if(i != 0) {
      if(i != event.attractions.length-1){
        artister.push(' ' + artist.name);
      } else {
        artister.push(' och ' + artist.name.replace(',', '') + ' ');
      }
    }
  }

  let promoter;
  if(event.promoter){
    if(event.mainCategory == 'Festivaler'){
      promoter = 'Promotor för festivalen är ' + event.promoter.name+'.';
    } else {
      promoter = 'Promotor för evenemanget är ' + event.promoter.name +'.';
    }
  }
  if(event.minage){
    promoter += ' Åldersgräns: ' + event.minage + ' år';
  }

  /* skriv ut information om eventet */
  let attractionText;
  if(event.attractions.length > 1){
    attractionText = `${event.attractions[0].name} arrangeras ${infoTextPlace}<br><br> ${artister} kommer finnas på plats. <br>${ticketsAvailable} <br><span>${promoter}</span>`;
  } else if(event.attractions){
    attractionText = `${event.attractions[0].name} kommer att spela ${infoTextPlace}<br> ${ticketsAvailable} <br> <span>${promoter}</span>`;
  }
  let eventInfoText = document.getElementById('eventInfoText');

  eventInfoText.innerHTML = `<p>${attractionText}</p>`;

  retrieveMeetupInfo(event.date);
  //updateEventInfo(event);
}

function retrieveEventInfo(){
  //console.log('HREF: '+window.location.pathname);
  if(window.location.pathname.includes('eventpage.html')){
    let eventid = getLocationInfo()[0];
    //console.log('EVENTID IS', eventid);

    if(eventid != undefined){
      // Start to listen if meetups gets removed.
      listenToRemovedMeetups();
      let options = {
        credentials: 'same-origin'
      }

      fetch(`https://app.ticketmaster.eu/mfxapi/v1/event/${eventid}?domain_id=sweden&apikey=${ticketMasterApiKey}`)
      .then(function(response){

        //console.log(response);
        return response.json();
      })
      .then(function(json){
        //console.log('EVENTOBJECT without formatting:',json);

        if(json.errors){
          printMessage('error', json.errors[0].description);
          setTimeout(function(){
            printMessage('default', 'Skickar dig till framsidan');
          },1000);
          setTimeout(function(){
            location.assign('index.html');
          },4000)

          return;
        }

          let latitude = 58, longitude = 15;
          let event = json;
          let imageURL = event.images[0].url;
          let venue = event.venue;
          let priceRanges = event.price_ranges;
          let address = venue.location.address;
          let date = event.localeventdate;
          let offsale = event.offsale.value;
          let mainCategory = event.categories[0].name;
          let promoter = event.promoter;
           console.log('Straight from the API: ', json);
          // console.log('Main category is: ', mainCategory);
          if(!date){
            date = event.date;
          }

          if(!imageURL){
            //console.log('ImageURL:', imageURL);
            printMessage('error', 'No image for this event found.');
          }

          // createMarker(latitude, longitude);
          //console.log('ImageUrl', imageURL);

          let eventObject = new EventClass(eventid, event.name, date, venue.name, address.address, address.city, event.properties.seats_avail, event.properties.minimum_age_required, [priceRanges.including_ticket_fees.min, priceRanges.including_ticket_fees.max], event.currency, 'EventInformation', event.images[0].url, event.day_of_week, offsale, mainCategory, event.attractions, promoter);

          //console.log('EVENTOBJECT: ',eventObject);

          // Eventet hittades, information visas!
          displayEventInfo(eventObject);

          // Skapa eventListeners för knapparna!
          createEventListenersForBtns(eventid, event.url, event.properties.seats_avail);

          pageLoaded();
      })
      .catch(function(error){
        //console.log('Här skedde det ett fel! Försöker vi plocka fram något som inte skickas med?');
        console.error('Felmeddelande:',error);
      })
    }

  } else {
    //console.log('This function should not run on this page.');
  }
}


//Funktion för att visa datumet lite finare :)
function displayDate(dateStr, weekDay, offsale, attractionText = false){

  let date, time, year, month, day;

  if(!dateStr && offsale){
    dateStr = offsale;
  }

  // Make the checks
  if(dateStr.includes('T')){
    dateStr = dateStr.split('T');

    //console.log('datestr: ',dateStr);



    /* Now we have an array with two objects, TIME with Z on [1] and date on [0] */
    time = dateStr[1];

    /* Split it again */
    dateStr = dateStr[0].split('-');

    year = dateStr[0];
    month = dateStr[1];
    day = dateStr[2];

  } else {
    //console.log('DateSTRING: ',dateStr);
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
      // console.log('It\'s the same day!');
      time = offsale.split('T')[1];
      time = time.substring(0, time.length-4);
    } else{
      // console.log('Date:', date);
      // console.log(year, month, day);
    }
  }

  // Ifall dagen / månaden börjar med 0 så plocka bort nollan!
  if(day){
    if(day.startsWith('0')){
      day = day.replace(0, '');
    }
    if(month.startsWith('0')){
      month = month.replace(0, '');
    }
  }


  if(attractionText){
    if(weekDay){
      return ' ' + weekDay.toLowerCase() + 'en den ' + day + ' ' + getMonth(month-0) + ' klockan ' + time + '.';
    } else {
      return ' den ' + day + ' ' + getMonth(month-0) + ' klockan ' + time + '.';
    }


  } else if(weekDay){
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
      // console.warn('This page should only be reached with a event specified in the address field.');
      // console.log('Om man ändå hamnar här kan vi redirecta till alla event / lägga en sökruta här');
      // location.assign('/');
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
        // eventID = eventID.replace('#', '');

        // Om eventID innerhåller # så splitta och ta bort det efteråt.
        if(eventID.includes('#')){
          eventID = eventID.split('#')[0];
        }



        return [eventID, meetupID];
    }
  } else {
    return false;
  }
}

// Wikipedia api retriever
function updateEventInfo(event){

  /* Create the search string based on the event */
  if(event.attractions){
    if(event.attractions.length >= 1){
      let searchStr = event.attractions[0].name;
      let eventInfoText = document.getElementById('eventInfoText');
      fetch(`https://sv.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchStr}`)
      .then(function(response){
        //console.log(response);
        return response.json();
      })
      .then(function(json){

        //console.log('Json version: ', json);
        if(json.length === 0){

          console.log('ingenting hittades på wikipedia');
        } else {
          /* Retrieve the info */
          let pages = json.query.pages;
          let text;
          //console.log(pages);
          for(let page in pages) {

            text = pages[page].extract;

            if(text.includes('Denna artikel handlar')){
              text = text.split(/\n/)[1];
            } else if(text.includes('\n')){
              text = text.split(/\n/);
              text = text[0] + ' ' + text[1];
            }

            //console.log('what is this', text.split[" "][0]);
            //console.log('Text:',text);
          }

          let infoTextParagraf = document.createElement('p');
          infoTextParagraf.innerText = text;
          eventInfoText.insertBefore(infoTextParagraf, eventInfoText.firstChild);
        }
        //console.log(json);

      });

      //console.log('It is only one person. Lets find the info about this artist.');
    }
  } else {
    //console.log('No information to display about this person.');
  }

}

function toggleLike(meetupKey, messageKey){
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  db.ref('likes/' + meetupKey + '/' + messageKey).once('value', function(snapshot){
    let data = snapshot.val();
    if(data){
      let found = false;
      for(let uid in data){
        if(uid == user.uniqueID){
          db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + uid).remove();
          found = true;
          console.log('unlike');
        }
      }
      if(!found){
        db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + user.uniqueID ).set(true);
        console.log('like');
      }
    } else {
      db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + user.uniqueID ).set(true);
      console.log('like');
    }
  });
}

function likeListenerOn(meetupKey, messageKey){
  //Listen for likes
  db.ref('likes/' + meetupKey + '/'+ messageKey).on('child_added', function(){
    let likeCounters = document.getElementsByClassName('likeCount '+messageKey);
    for(let likeCount of likeCounters){
      //console.log(likeCount);
      if(likeCount.innerText){
        likeCount.innerText = (likeCount.innerText - 0) + 1;
      } else {
        likeCount.innerText = 1;
      }
    }
  });
  //Listen for unlikes
  db.ref('likes/' + meetupKey + '/'+ messageKey).on('child_removed', function(){
    //console.log('Someone unliked :(');

    let likeCounters = document.getElementsByClassName('likeCount '+messageKey);

    for(let likeCount of likeCounters){
      //console.log(likeCount);
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
      joinMeetup(currentUser, meetupKey, eventID);

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
  document.getElementById('divBorderEventPage').className = '';
  document.getElementsByClassName('footer-box hidden')[0].className = 'footer-box';
  if(document.getElementsByClassName('spinner')[0]){
    document.getElementsByClassName('spinner')[0].className = 'hidden';
  }

    // Interesting ? https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    let htmlScroll = document.getElementsByTagName('html')[0];

    if(getLocationInfo()[1]){
      recursiveScroll();
    }

    function recursiveScroll(count = 0){
      console.log('Scrolling: ' + count);
      let meetup = document.getElementById('meetup-' + getLocationInfo()[1]);
      if(count > 8){
        console.warn('Failed after 8 retries.');
        console.warn('Meetup is not yet in the dom. Or doesn\'t exist.');
      } else if(meetup){
        meetup.scrollIntoView({behavior: 'smooth', block: 'start'});
      } else {
        setTimeout(function(){
          return recursiveScroll(count += 1);
        }, 600);
      }
    }
}

function addEditBtns(meetupKey){
  let meetup = document.getElementById('meetup-' + meetupKey);
  let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let eventID = getLocationInfo()[0];
  let admin = false, creator = false;
  console.log('The addEditBtns ran');
  if(currentUser){
      if(meetup){
        let btn = document.createElement('button');
        btn.className = 'editBtn iconBtn doNotCloseThis';
        btn.innerHTML = '<i class="mdi mdi-dots-vertical"></i>';

        meetup.insertBefore(btn, meetup.lastChild);

        btn.addEventListener('click', function(event){
          toggleMeetupDropDown(event, meetupKey, eventID, admin, creator);
        });
      }
  }
}

function removeEditBtn(meetupKey){


  if(meetupKey != null){
    let meetup = document.getElementById('meetup-' + meetupKey);
    for(let i = meetup.children.length-1; i >= 0; i--){
      let node = meetup.children[i];

      if(node.className.includes('editBtn')){
        meetup.removeChild(node);
      }
    }
  } else {
    let array = document.getElementsByClassName('editBtn');

    for(let i = array.length-1; i >= 0; i--){
      let node = array[i];
      node.parentNode.removeChild(node);
    }
  }
}

// Funktion som lyssnar på när meetups tas bort ur databasen.
function listenToRemovedMeetups(){
    let eventID = getLocationInfo()[0];

    db.ref('meetups/'+eventID).on('child_removed', function(snapshot){
      let data = snapshot.val();
      let meetupKey = snapshot.key;

      // Remove the meetup from the database.
      removeMeetupEntirelyFromTheDatabase(eventID, data, meetupKey);

      // Remove the meetup from the DOM
      let meetup = document.getElementById('meetup-'+meetupKey);
      let wrapper = document.getElementById('meetupWrapper');

      if(meetup){
        let overlay = document.createElement('div');
        overlay.className = 'meetupOverlayRemoved';
        meetup.className += ' overlayAnimation';
        meetup.appendChild(overlay);

        // Scroll.
        let htmlScroll = document.getElementsByTagName('html')[0];
        let bodyScroll = document.getElementsByTagName('body')[0];
        // console.log('Window scrollHeight: ', window.scrollHeight);
        // console.log('bodyScroll scrollHeight: ', bodyScroll.scrollHeight);
        // console.log('html scrollHeight: ', htmlScroll.scrollHeight);
        // console.log('ClientHeight body:', bodyScroll.clientHeight);
        // console.log('ClientHeight html:', htmlScroll.clientHeight);
        // console.log('scrollTop html:', htmlScroll.scrollTop);
        // console.log('scrollTop body:', bodyScroll.scrollTop);

        // Only scroll if we're at the bottom of the page
        console.log('Height: ',document.documentElement.scrollHeight);
        if(wrapper.lastChild.getAttribute('id') == meetup.getAttribute('id')){

          if((htmlScroll.scrollHeight - htmlScroll.scrollTop) == htmlScroll.clientHeight) {
            console.log('htmlSrollheight: ', htmlScroll.scrollHeight);
            document.documentElement.className += ' smooth-scroll';
            document.documentElement.scrollTop -= wrapper.lastChild.scrollHeight
            //htmlScroll.scrollTop -= wrapper.lastChild.scrollHeight;
          }
        }


        setTimeout(function(){
          meetup.parentNode.removeChild(meetup);
        },1500);

        console.log('Successfully removed from the dom!');
      }

    });
}

// Ta bort meetupet ur databasen
function destroyMeetup(meetupKey, eventID){
  if(!eventID){
    eventID = getLocationInfo()[0];
  }

  console.log('Meetup with ID: '+meetupKey+' under eventID: '+eventID+'is being removed from the database...');
  db.ref('meetups/' +eventID+ '/' +meetupKey).remove();
}

// Tanken med denna funktion är att lägga till meetupets meetupKey på användarens profil under "meetups".
function addUserMeetup(userID, eventID, meetupKey){
  //console.log('Lägga till meetup på användarens profil kördes.');
  db.ref('users/' + userID + '/meetups/' + eventID + '/' + meetupKey).set(true);
}

// Ta bort meetups personen ska gå på ifrån profilen
function removeUserMeetup(userID, eventID, meetupKey){
  //console.log('Ta bort meetup från användarens profil kördes.');
  db.ref('users/' + userID + '/meetups/' + eventID + '/' +meetupKey).remove();
}

// Ta bort allting kring ett meetup i databasen.
function removeMeetupEntirelyFromTheDatabase(eventID, data, meetupKey){

  /* Some variables */
  let creator = data.creator;
  let members = data.members;

  /* Some logs */
  console.log('This meetup was removed entirely.', data);
  console.log('It had the key', meetupKey);

  /* Start by removing it from the user profile of the creator */
  db.ref('users/' + creator.uniqueID + '/createdMeetups/' + eventID + '/' + meetupKey).remove();

  /* Remove the likes */
  db.ref('likes/' + meetupKey).remove();

  /* Remove the chat for this meetup */
  db.ref('chats/' + meetupKey).remove();

  /* Remove the meetups from peoples user profiles.. */
  for(let member in members){
    /* Remove from the players profile */
    removeUserMeetup(members[member].uniqueID, meetupKey);
  }

  /* Decrease the meetupCounter */
  decreaseMeetupCount(eventID);

}

// Bjud in vänner till ett meetup!

function inviteFriend(event){
  let target = event.target;
  if(event.target.nodeName == 'I'){
    target = target.parentNode;
  }
  localStorage.setItem('currentMeetupKey', target.meetupKey);
  // console.log('Key is: ', target.meetupKey);
  // console.log('Event target is: ', event.target);
  //printMessage('error', 'You cannot invite friends yet, sorry :(');
  displayInviteFriends(event, target.meetupKey);
}

function gotoProfile(event){
  popupProfile(event, event.target.eventID, event.target.meetupKey);
}

// function to popup the userProfile when pressed on their avatar.
let localFriendList = [];
function popupProfile(event, eventID, meetupKey){
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let user = {
    sid: event.target.getAttribute('sid'),
    avatarURL: event.target.getAttribute('src'),
    fullname: event.target.nextSibling.innerText
  }
  if(user.sid == 'undefined'){
    user.sid = false;
  }

  let profileHolder = document.createElement('div');
  profileHolder.className = 'profileHolder fadein';

  let avatarImage = document.createElement('img');
  avatarImage.setAttribute('src', user.avatarURL);

  let nameAndSidHolder = document.createElement('div');
  let fullname = document.createElement('span');
  fullname.innerText = user.fullname;

  let sid = document.createElement('span');
  sid.innerText = '[' + user.sid + ']' ;

  let btnHolder = document.createElement('div');
  let gotoBtn = document.createElement('button');
  gotoBtn.innerText = 'Gå till profil';
  gotoBtn.className = 'doNotCloseThis';
  if(user.sid){
    gotoBtn.addEventListener('click', function(){
      window.location.assign('profil.html?user=' + event.target.getAttribute('sid'));
      //printMessage('default', 'Denna ska leda till användarens profil. SiteID: ' + user.sid);
    });
  } else {
    gotoBtn.className = 'disabledBtn doNotCloseThis';
  }


  let kickBtn = document.createElement('button');
  kickBtn.innerHTML = '<i class="mdi mdi-account-remove"></i>';
  kickBtn.className = 'kickBtn';
  let admin = getAdmin(localUser.uniqueID);



  let addFriendBtn = document.createElement('button');
  addFriendBtn.innerText = 'Lägg till vän';
  addFriendBtn.className = 'doNotCloseThis';

  let friendList = retrieveFriends();
  /* Some small checks */
  if(user.sid){
    if(localUser){
      if(localUser.sid == user.sid || friendList.includes(user.sid) || localFriendList.includes(user.sid)){
        addFriendBtn.className = 'disabledBtn doNotCloseThis';
        // console.log('You are already friends! Or this is u..');
        // console.log('localUser sid: ', localUser.sid, 'userSid: ', user.sid);
        console.log('localFriendList: ', localFriendList);
      } else {
        addFriendBtn.addEventListener('click', function(){
          // console.log('LOCALUSER', localUser);
          // console.log('JUST USER: ', user);
          localFriendList.push(user.sid);
          sendNotification(user.sid, 'friendRequest');

          addFriend(user.sid);
          addFriendBtn.disabled = true;
          addFriendBtn.className += ' disabledBtn doNotCloseThis';
        });
      }
    } else {
      printMessage('error', 'Du är inte inloggad :o');
    }
  } else {
    addFriendBtn.className = 'disabledBtn doNotCloseThis';
  }

  let closeBtn = document.createElement('span');
  closeBtn.innerHTML = '<i class="mdi mdi-close mdi-24px"></i>'
  closeBtn.className = 'closeBtn';

  closeBtn.addEventListener('click', function(event){
    profileHolder.parentNode.removeChild(profileHolder);
  })

  let nameAndBtnWrapper = document.createElement('div');

  /* Append Everything */
  btnHolder.appendChild(gotoBtn);
  btnHolder.appendChild(addFriendBtn);

  db.ref('meetups/'+eventID+'/'+meetupKey+'/creator').once('value', function(snapshot){
    let data = snapshot.val();
    console.log(data);
    console.log('THE EFFING CCREATOR IS: ', data);
    if(user.sid || admin){
      console.log('The user has a SID');
      if(localUser.sid == user.sid && !admin){
        console.log('Man kan inte kicka sig själv, lul');
      } else if(admin || data.uniqueID == localUser.uniqueID){
        console.log('Admin or creator');
        btnHolder.appendChild(kickBtn);
        kickBtn.addEventListener('click', function(){
          confirmRemoveMeetup(null, null, 'Vill du verkligen ta bort ' + user.fullname + ' ifrån meetupet?', 'Ja', function(){
            kickUserFromMeetup(eventID, meetupKey, user.sid);
          });
        });
      }
    }
  });


  nameAndSidHolder.appendChild(fullname);

  if(user.sid){ nameAndSidHolder.appendChild(sid); }
    else {nameAndSidHolder.className = 'noSid'; }
  nameAndSidHolder.appendChild(closeBtn);

  nameAndBtnWrapper.appendChild(nameAndSidHolder);
  nameAndBtnWrapper.appendChild(btnHolder);

  profileHolder.appendChild(avatarImage);
  profileHolder.appendChild(nameAndBtnWrapper);

  event.target.parentNode.appendChild(profileHolder);

  window.addEventListener('click', function(e){

    if(e.target.className != profileHolder && !e.target.className.includes('doNotCloseThis') && e.target.className != 'noSid'){
      if(e.target == event.target){
        if(document.getElementsByClassName('profileHolder').length >= 2){
          if(profileHolder.parentNode){
            profileHolder.parentNode.removeChild(profileHolder);
          }
        }
      } else if(profileHolder.parentNode){
        profileHolder.parentNode.removeChild(profileHolder);
      }
    }
  });
}


function displayInviteFriends(event, meetupKey){
  let array = [];
  /* Retrieve all the users in the databse and put them in an array */
  downloadUsersToArray(meetupKey, array);
  let friendWrapper = document.createElement('div');
  friendWrapper.className = 'friendWrapper doNotCloseThis';
  let friendTitle = document.createElement('h2');
  friendTitle.innerText = 'Bjud in vänner';

  let searchDiv = document.createElement('div');
  let searchIcon = document.createElement('span');
  searchIcon.className = 'icon';
  let searchBar = document.createElement('input');
  searchBar.setAttribute('placeholder', 'Sök efter namn eller #tag');
  searchIcon.innerHTML = '<i class="mdi mdi-magnify mdi-24px"></i>';

  let searchBtn = document.createElement('span');
  searchBtn.className = 'searchBtn';
  searchBtn.innerText = 'Sök';

  searchDiv.appendChild(searchIcon);
  searchDiv.appendChild(searchBar);
  searchDiv.appendChild(searchBtn);

  /* Resultat från sökningen */
  let resultDiv = document.createElement('div');
  resultDiv.className += 'resultHolder doNotCloseThis';

  let friendsResultTitle = document.createElement('h3');
  friendsResultTitle.innerText = 'Vänner';
  friendsResultTitle.className = 'hidden';
  let otherResultTitle = document.createElement('h3');
  otherResultTitle.innerText = 'Andra';
  otherResultTitle.className = 'hidden';
  let resultDivFriends = document.createElement('div');
  let resultDivAndra = document.createElement('div');
  resultDivFriends.className = 'friendList doNotCloseThis';
  resultDivAndra.className = 'otherList doNotCloseThis';

  resultDiv.appendChild(friendsResultTitle);
  resultDiv.appendChild(resultDivFriends);
  resultDiv.appendChild(otherResultTitle);
  resultDiv.appendChild(resultDivAndra);

  let closeWrapperBtn = document.createElement('div');
  closeWrapperBtn.className = 'closeWrapperBtn';
  closeWrapperBtn.innerHTML = '<i class="mdi mdi-close mdi-30px"></i>';


  let friendList = retrieveFriends();

  searchBtn.addEventListener('click', function(e){
    displayInviteFriendsResults(e, array, resultDiv, true);
    console.log('Search btn pressed! array contains: ', array);
  })

  searchBar.addEventListener('change', function(e){
    displayInviteFriendsResults(e, array, resultDiv);
    console.log('SearchBAR! array contains: ', array);
  });

  /* Append Everything */
  friendWrapper.appendChild(friendTitle);
  friendWrapper.appendChild(searchDiv);
  friendWrapper.appendChild(resultDiv);
  friendWrapper.appendChild(closeWrapperBtn);

  let body = document.getElementsByTagName('body')[0];
  body.appendChild(friendWrapper);

  closeWrapperBtn.addEventListener('click', function(){
    body.removeChild(friendWrapper);
  });

  /* Init the function */
  function closeThis(event){
    let target = event.target;

    /* Chrome fix */
    if(target.nodeName == 'I'){
      target = target.parentNode;
    }

    /* Rekursiv funktion för att kolla className på ovanstående element!! */
    function recursiveClose(elem, count = 0){
      console.log('Counter is: ' + count);
      if(count > 3) {
        if(friendWrapper.parentNode){
          friendWrapper.parentNode.removeChild(friendWrapper);
        }
        window.removeEventListener('click', closeThis);
        return false;
      } else {
        if(elem){
          if(elem.className){
            console.log('Has className');
            if(elem.className.includes('doNotCloseThis')){
              console.log('Has doNotCloseThis!!');
              return true;
            } else {
              return recursiveClose(elem.parentNode, count += 1);
            }
          } else {
            return recursiveClose(elem.parentNode, count += 1);
          }
        } else {
          return recursiveClose(elem.parentNode, count += 1);
        }
      }
    }
    recursiveClose(target);
    /* If the target doesn't have the doNotCloseThis class, we close it! */


  }

  /* add eventListener if clicked outside */
  window.addEventListener('click', closeThis);
}

/* This function displays possible invites and displays them in htmlobj-"printList" */
function displayInviteFriendsResults(event, searchArray, printList, btn){
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  /* Check searchStr, if it's empty show all*/
  let friendList = retrieveFriends();
  if(searchArray.length){
    let searchStr;
    if(btn){
      searchStr = event.target.previousSibling.value.toLowerCase();
    } else {
      searchStr = event.target.value.toLowerCase();
    }

    if(searchStr == ""){
      /* type, message, timer = 8000, delay = 0, limit = 2 */
      printMessage('success', 'Visar alla användare  :\') ', undefined, null, 1);
    }
    /* Filter the users based on value */
    let found = false;

    /* Remove all currently displayed persons & hide the titels*/
    while(printList.children[1].firstChild){
      printList.children[1].removeChild(printList.children[1].firstChild);
    }
    while(printList.children[3].firstChild){
      printList.children[3].removeChild(printList.children[3].firstChild);
    }
    /* hide titles */
    for(let title of printList.children){
      if(title.nodeName == 'H3'){
        title.className = 'hidden';
      }
    }

    /* Search through users in the usersArray */

    for(let user of searchArray){
      let fullname = user.fullname;
      let sid = user.sid;
      let friend = false;

      /* Check if logged in */
      if(localUser){
        if(user.uniqueID == localUser.uniqueID){
          /* User is localUser, don't show. */
          continue;
          /* Check if the user is already in the meetup. */
        }
      }


      if(fullname || sid){

        /* Search by sid */
        if(searchStr.includes('#')){
          if(sid){
            /* Set SID to toLowerCase */
            sid = sid.toLowerCase();

            if(sid.includes(searchStr)){
              /* We found a match! */
              if(friendList){
                /* The person has a friend ! */
                  if(user.sid){
                    /* the found person has a SID defined! They might be friends :o */
                    if(friendList.includes(user.sid)){
                      friend = true;
                    }
                  }
              }
              displayMatch(user, printList, friend, true);
              found = true;
            }
          }
        } else if(fullname){
          /* Set fullname to toLowerCase */
          fullname = fullname.toLowerCase();
          /* Search by name */
          if(fullname.includes(searchStr)){
            /* We found a match! */
            /* Display based on friendShip! */
            if(friendList){
              /* The person has a friend ! */
                if(user.sid){
                  /* the found person has a SID defined! They might be friends :o */
                  if(friendList.includes(user.sid)){
                    friend = true;
                  }
                }
            }
            displayMatch(user, printList, friend, false);
            found = true;
          }
        }

      }
    }
    if(!found){
      printMessage('error', 'Vi kunde tyvärr inte hitta en användare :(', undefined, undefined, 1);
    }
  } else {
    printMessage('error', 'Tyvärr kunde vi inte hitta någon att bjuda in!');
  }
}

function displayMatch(user, printList, friend, foundBySid = false){
  /* If the user we want to display is a friend of the current user put them in the friendsDiv */
  if(friend){
    printList.children[0].className = '';
    printList = printList.children[1];
  } else {
    printList.children[2].className = '';
    printList = printList.children[3];
  }

  let userDiv = document.createElement('div');
  userDiv.className = 'userProfile fadein';

  if(friend){
    userDiv.className += ' friend';
  }
  let avatarImage = document.createElement('img');
  avatarImage.setAttribute('src', user.avatarURL);

  let nameAndSidHolder = document.createElement('div');
  nameAndSidHolder.className = 'nameAndSidHolder';

  let fullname = document.createElement('span');
  fullname.innerText = user.fullname;

  let sid = document.createElement('span');
  sid.innerText = '[' + user.sid + ']' ;

  if(foundBySid){
    sid.className = 'foundBySid';
    fullname.className = 'foundBySid';
  }

  let inviteBtn = document.createElement('button');
  inviteBtn.innerHTML = '<i class="mdi mdi-plus mdi-24px"> </i>';
  console.log('What does user contain?', user);


  inviteBtn.addEventListener('click', function(e){
    let target = e.target;
    if(e.target.nodeName == 'I'){
      target = target.parentNode;
    }

    inviteBtn.disabled = true;
    printMessage('success', 'Inbjudan skickad!', undefined, undefined, 1);
    target.children[0].className += ' fadeout';

    sendNotification(user, 'invite');

    setTimeout(function(){
      target.innerHTML = '<i class="mdi mdi-check mdi-24px fadein"> </i>';
    }, 500);

  });

  nameAndSidHolder.appendChild(fullname);
  if(user.sid){
    nameAndSidHolder.appendChild(sid);
  }

  userDiv.appendChild(avatarImage);
  userDiv.appendChild(nameAndSidHolder);
  userDiv.appendChild(inviteBtn);

  printList.appendChild(userDiv);

}

function downloadUsersToArray(meetupKey, array){
  let eventid = getLocationInfo()[0];
  /* Only put those who is not in the meetup. */
  let meetupMembers = [];
  db.ref('meetups/' + eventid + '/' + meetupKey + '/members').once('value', function(snapshot){

    let data = snapshot.val();
    console.log('Members in this meetup are: ', data);
    for(let member in data){
      let user = data[member];
      meetupMembers.push(user.uniqueID);
    }

    console.log('ids: ', meetupMembers);

    db.ref('users/').on('child_added', function(snap){
      let compareUser = snap.val();

      if(meetupMembers.includes(compareUser.uniqueID)){
        console.log('Do not push this person');
      } else {
        console.log('Push this person!');
        array.push(compareUser);
        console.log('Array now contains: ', array);
      }
    });

  });

}

/* This function sends a notification to someone. Either by SID or uniqueID. */

function sendNotification(userOrSid = false, action, meetupKey = false){
  console.log('Does this fire?');
  /* Get localUser */
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));

  /* Get the EventID */
  eventID = getLocationInfo()[0];

  /* start by getting the friendList of the localUser */
  let friendList = retrieveFriends();
  let sid, user, friend;

  if(typeof userOrSid == 'string'){
    sid = userOrSid;
    console.log('This is a SID');
    user = false;
  } else {
    console.log('This is a USER');
    user = true;
    sid = false;
  }

  /* Kolla vänlistan */
  if(friendList.includes(sid)){
    friend = true;
  } else {
    friend = false;
  }

  /* Find the one who should get the message */
  let retriever;
  if(user){
    /* We should use the USER to send the message. */
    retriever = userOrSid.uniqueID;
    sid = userOrSid.sid;
    createAndSend(retriever);
  } else if(sid){
    /* We should use the SID to send the message. */

    /* Find the user with that SID and get their uniqueID */
    db.ref('users/').once('value', function(snapshot){
      let data = snapshot.val();
      for(let user in data){
        user = data[user];
        /* Check if they have a SID we can compare to. */

        if(user.sid){
          /* there is a sid */
          if(user.sid == userOrSid){
            /* If they match, this is the retriever. */
            retriever = user.uniqueID;
            console.log('Create and send');
            createAndSend(retriever);
          }
        }
      }
    });
  } else {
    console.error('Something went wrong when we tried to send a notification.');
  }


  /* If the user is logged in check */
  if(!localUser){
    printMessage('error', 'Du är inte inloggad! :o');
    throw('There is not a user logged in.');
  }


  function createAndSend(retriever){
    /* Create the object to be sent! */
    let notificationObject;
    /* If the action is a invite create the invite here */
    if(action == 'invite' || action == 'meetupEventJoin' || action == 'meetupEventLeave'){
      /* Get the currentMeetupKey we put in localStorage before */
      if(!meetupKey){
        meetupKey = localStorage.getItem('currentMeetupKey');
      } else {
        console.log('We already have a meetupKey specified.');
        console.log('and that key is: ', meetupKey);
      }

      notificationObject = {
        fromID: localUser.uniqueID,
        fromSID: localUser.sid,
        fullname: localUser.fullname,
        avatarURL: localUser.avatarURL,
        action: action,
        friend: friend,
        eventid: eventID,
        meetupKey: meetupKey,
        time: firebase.database.ServerValue.TIMESTAMP
      }


    } else if(action == 'friendRequest'){
      console.log('Vänförfrågan skickad');
      notificationObject = {
        fromID: localUser.uniqueID,
        fromSID: localUser.sid,
        fullname: localUser.fullname,
        avatarURL: localUser.avatarURL,
        action: action,
        friend: friend,
        time: firebase.database.ServerValue.TIMESTAMP
      }
    }

    /* If there is something to send */
    if(notificationObject){
      db.ref('users/' + retriever + '/notifications').push(notificationObject);
    } else {
      console.warn('No object was sent!');
    }
  }
}

function kickUserFromMeetup(eventid, meetupKey, sid){
  db.ref('meetups/' + eventid + '/' + meetupKey + '/members').once('value', function(snapshot){
    let data = snapshot.val();
    for(let user in data){
      let userKey = user;
      user = data[user];

      if(sid){
        console.log('Sid is: ', sid);
        if(user.sid){
          console.log('User in database sid: ', user.sid);
          if(sid == user.sid){
            console.log('Match found');
            /* Remove from the database at this position */
            db.ref('meetups/' + eventid + '/' + meetupKey + '/members/' + userKey).remove();
          }
        }
      } else {
        console.error('Abort, no sid found.');
      }
    }
  });
}

function getMonth(int){

  switch (int) {
  case 1:
    return 'januari';
  case 2:
    return 'februari';
  case 3:
    return 'mars';
  case 4:
    return 'april';
  case 5:
    return 'maj';
  case 6:
    return 'juni';
  case 7:
    return 'juli';
  case 8:
    return 'augusti'
  case 9:
    return 'september';
  case 10:
    return 'oktober';
  case 11:
    return 'november';
  case 12:
    return 'december';
  default:
    return 'okänd';
  }
}
