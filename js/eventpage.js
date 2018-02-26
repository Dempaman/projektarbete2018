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

  console.log('hi');
  db.ref('meetups/'+getLocationInfo()[0]).on('child_added', function(snapshot){

    let obj = snapshot.val();
    console.log(obj);

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
    creatorName.innerText = obj.creator.name;


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

    // Deltagare
    let antalDiv = document.createElement('div');
    antalDiv.className = 'infoDiv';

    let antalLabel = document.createElement('p');
    antalLabel.innerText = 'Deltagare';
    let antal = document.createElement('p');
    antal.innerText = obj.members.length + '/' + obj.spots;

    antalDiv.appendChild(antalLabel);
    antalDiv.appendChild(antal);

    // Adress
    let adressLabel = document.createElement('p');
    adressLabel.innerText = 'Adress';
    let adress = document.createElement('p');
    adress.innerText = obj.address;


    // Åldersgräns
    let ageDiv = document.createElement('div');
    ageDiv.className = 'infoDiv';

    let ageIntervalLabel = document.createElement('p');
    ageIntervalLabel.innerText = 'Åldersgräns';
    let ageInterval = document.createElement('p');
    ageInterval.innerText = obj.ageInterval[0] + ' - ' + obj.ageInterval[1];

    ageDiv.appendChild(ageIntervalLabel);
    ageDiv.appendChild(ageInterval);



    // Splice latitude and longitude
    let latitude = obj.latitude.substring(0,9);
    let longitude = obj.longitude.substring(0,9);
    console.log('LATITUDE!!', latitude);
    console.log('LONGITUDE!!', longitude);


    let googleMap = document.createElement('img');

    // Just src
    googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`);

    // Data-src
    googleMap.setAttribute('data-src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`);

    let infoDiv = document.createElement('p');
    infoDiv.innerText = obj.info;


    let meetupWrapper = document.getElementById('meetupWrapper');

    md.appendChild(meetupDivTitle);
    md.appendChild(meetupDivDate);
    md.appendChild(creatorDiv);
    md.appendChild(creatorMailDiv);
    md.appendChild(ageDiv);
    md.appendChild(antalDiv);
    md.appendChild(adressLabel);
    md.appendChild(adress);
    md.appendChild(googleMap);
    md.appendChild(infoDiv);

    meetupWrapper.appendChild(md);

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
