// Globala variabler
const ticketMasterApiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

// Initalize the page based on window location.
window.onload = function(){



  // Turned off for debug purposes
  document.getElementById('eventTitle').addEventListener('click', retrieveEventInfo);
  //retrieveEventInfo();


  // end of callback
}

function createEventListenersForBtns(eventid, url){
  let buyBtn = document.getElementById('eventDivButtons').children[0];
  let createMeetupBtn = document.getElementById('eventDivButtons').children[2];

  buyBtn.addEventListener('click', function(){
    window.open(url);
    console.log('Köp biljett hos Ticketmaster!');
  });

  createMeetupBtn.addEventListener('click', function(){
    window.location.href = "modal.html?event=" + eventid;
    console.log('Skapa ett meetup för event:',eventid);
  });

}

function retrieveMeetupInfo(eventDate){

  db.ref('meetups/'+getLocationInfo()[0]).on('child_added', function(snapshot){

    let eventID = getLocationInfo()[0];
    let obj = snapshot.val();
    let meetupKey = snapshot.key;
    //console.log('NYCKEL:', meetupKey);
    //console.log(obj);

    // Skapa funktion här som lägger till ett meetupkort!
    let md = document.createElement('div');

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
    let adressDiv = document.createElement('div');
    adressDiv.className = 'infoDiv';

    let adressLabel = document.createElement('p');
    adressLabel.innerText = 'Adress';
    let adress = document.createElement('p');
    adress.innerText = obj.address;

    adressDiv.appendChild(adressLabel);
    adressDiv.appendChild(adress);



    // Splice latitude and longitude
    let latitude = obj.latitude.substring(0,9);
    let longitude = obj.longitude.substring(0,9);
    //console.log('LATITUDE!!', latitude);
    //console.log('LONGITUDE!!', longitude);


    let googleMapDiv = document.createElement('div');
    let googleMap = document.createElement('img');
    googleMapDiv.className = 'googleMapDiv';
    // Just src
    googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`);

    // Data-src
    googleMap.setAttribute('data-src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`);

    googleMapDiv.appendChild(googleMap);

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
    md.appendChild(adressDiv);
    md.appendChild(googleMapDiv);
    md.appendChild(infoDiv);





    // Display button based on if the user is in the meetup or not.
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

      let data = snap.val();
      let userIsInMeetup = false;

        // Om det finns minst en medlem i meetupet. Vilket det alltid ska göra.
        if(data != null){
          console.log('Data: ',data);

          // Gå igenom användaregenskaperna under denna medlem
          for(let user in data){
            // Om användaren som är inloggad finns i detta meetup så sätter vi userIsInMeetup till true
            if(data[user].uniqueID == currentUser.uniqueID){
              userIsInMeetup = true;
            }
          }
        } else {
          console.warn('Data is null for the members of this meeup!');
        }



      if(!userIsInMeetup){
        console.log('this btn should be appended!?');
        // Om användaren inte är med i meetupet visa joinMeetupBtn
        md.appendChild(btnDiv);

      } else {
        // Annars visa chatt och medlemmar!
        console.log('Du är redan med i detta meetup!');


        // Börja med att skapa wrappern för allting som ska visas när man är med i ett meetup!
        let moreMeetupInfoDiv = document.createElement('div');
        moreMeetupInfoDiv.className = 'moreMeetupInfoDiv';


        // Visa medlemmar här!


        // Skapa label för medlemmar
        let membersLabel = document.createElement('p');
        membersLabel.innerText = 'Personer som kommer';
        moreMeetupInfoDiv.appendChild(membersLabel);

        // Loopa igenom och skapa användarna.
        let membersWrappingDiv = document.createElement('div');

        membersWrappingDiv.className = 'membersWrappingDiv';
        for(let comingUser in data){
          let memberDiv = document.createElement('div');
          memberDiv.className = 'memberDiv';
          let memberDivAvatar = document.createElement('img');
          console.log(data[comingUser]);
          memberDivAvatar.setAttribute('alt', 'User picture');
          memberDivAvatar.setAttribute('src', data[comingUser].avatarURL);

          memberDiv.appendChild(memberDivAvatar);
          membersWrappingDiv.appendChild(memberDiv);
        }
        // Append the members inside a div into the wrapper.





        // Dags för chatten här!

        // Börja med att skapa label för chatten
        let chattLabel = document.createElement('p');
        chattLabel.innerText = 'Meetup Chatt';

        // Skapa wrapper för chatten
        let chattWrapperDiv = document.createElement('div');
        chattWrapperDiv.className = 'chattWrapperDiv';

        let inputBox = document.createElement('input');

        meetupKey
        db.ref('chatter/'+meetupKey).on('child_added', function(snapshot){
          console.log('ATLEAST ONE MESSAGE HERE!!');
          let message = snapshot.val();

          console.log(message.sender);
          console.log(message.time);
          console.log(message.text);

          // Create the message DIV to be printed on the DOM

          let messageDiv = document.createElement('div');


          document.getElementById('chattWrapperDiv').appendChild(messageDiv)
        })


        // Append the members and chat into the moreMeetupInfoDiv
        moreMeetupInfoDiv.appendChild(membersWrappingDiv);

        // Append label
        moreMeetupInfoDiv.appendChild(chattLabel);

        //Append the chatt
        moreMeetupInfoDiv.appendChild(chattWrapperDiv);

        //Append moreMeetupInfoDiv into the MAINDIV
        md.appendChild(moreMeetupInfoDiv);

      }
    });


    // Append MAINDIV (md)
    meetupWrapper.appendChild(md);

    // Create Eventlistener for the joinMeetupBtn
    joinMeetupBtn.addEventListener('click', function(event){
      let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
      //console.log('FULLNAME OF USER IS: ', currentUser);
      joinMeetup(currentUser.uniqueID, currentUser.avatarURL, currentUser.fullname, meetupKey, eventID);
      console.log('joined meetup!');
    });

  });
}

function joinMeetup(userID, avatarURL, fullname, meetupID, eventID){

  db.ref('meetups/' + eventID + '/' + meetupID + '/members').once('value', function(snap){

    let data = snap.val();
    let userIsNotComing = true;
    for(let comingUser in data){
      if(data[comingUser] == userID) {
        userIsNotComing = false;
      }
    }

    let userObject = {
      uniqueID: userID,
      fullname: fullname,
      avatarURL: avatarURL
    }

    if(userIsNotComing){
      db.ref('meetups/' + eventID + '/' + meetupID + '/members').push(userObject);
    } else {
      console.log('Du är redan med i detta meetup!');
    }
  });
}

function displayEventInfo(event){

  document.getElementById('eventDate').innerText = event.date;
  document.getElementById('eventTitle').innerText = event.name;

  // Om platsen inte finns (Göteborg - Ullevi) så skriver vi bara ut staden.
  if(event.place == undefined){
    document.getElementById('eventPlace').innerText = event.city;
  } else {
    document.getElementById('eventPlace').innerText = event.place;
  }

  retrieveMeetupInfo(event.date);
  updateEventInfo(event.name, event.priceRange, event.currency, event.onsale);
}

function retrieveEventInfo(){

  let eventid = getLocationInfo()[0];

  if(eventid != undefined){
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventid}?apikey=${ticketMasterApiKey}`)
    .then(function(response){

      console.log(response);
      return response.json();
    })
    .then(function(json){
      console.log('EVENTOBJECT without formatting:',json);
        let latitude = 58, longitude = 15;
        let event = json;
        let venue = event._embedded.venues[0];
        let onsale = false;
        let coordinates = event._embedded.venues[0].location;
        latitude = Number.parseFloat(coordinates.latitude);
        longitude = Number.parseFloat(coordinates.longitude);

        if(event.dates.status.code == 'onsale'){
          onsale = true;
        }
        // createMarker(latitude, longitude);

        let eventObject = new EventClass(eventid, event.name, event.dates.start.localDate, event.dates.start.localTime, venue.name, venue.city.name, latitude, longitude, onsale, [event.priceRanges[0].min, event.priceRanges[0].max], event.priceRanges[0].currency);

        console.log('EVENTOBJECT: ',eventObject);

        // Eventet hittades, information visas!
        displayEventInfo(eventObject);

        // Skapa eventListeners för knapparna!
        createEventListenersForBtns(eventid, event.url);

    })
    .catch(function(error){
      console.log('Eventet hittades inte! Här är en sökruta du kan använda för att söka efter ett event :)');
      console.log('Felmeddelande:',error);
    })
  }
}

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
    }
    return [eventID, meetupID];
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
