// Globala variabler
const ticketMasterApiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

// Initalize the page based on window location.
window.onload = function(){



  // Turned off for debug purposes
  document.getElementById('eventTitle').addEventListener('click', retrieveEventInfo);
  //retrieveEventInfo();


  // end of callbacl
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

    // Skaparen
    let creatorNameLabel = document.createElement('p');
    creatorNameLabel.innerText = 'Skapare';
    let creatorName = document.createElement('p');
    creatorName.innerText = obj.creator.name;

    // ProfilbildsURL
    let creatorAvatarURL = document.createElement('img');
    creatorAvatarURL.setAttribute('alt', obj.creator.name + '\'s avatar.');
    creatorAvatarURL.setAttribute('src', obj.creator.avatarURL);

    // Skapare
    let creatorMailLabel = document.createElement('p');
    creatorMailLabel.innerText = 'Skaparens email';
    let creatorMail = document.createElement('p');
    creatorMail.innerText = obj.creator.mail;

    // Deltagare
    let antalLabel = document.createElement('p');
    antalLabel.innerText = 'Deltagare';
    let antal = document.createElement('p');
    antal.innerText = obj.members.length + '/' + obj.spots;

    // Adress
    let adressLabel = document.createElement('p');
    adressLabel.innerText = 'Adress';
    let adress = document.createElement('p');
    adress.innerText = obj.address;


    // Åldersgräns
    let ageIntervalLabel = document.createElement('p');
    ageIntervalLabel.innerText = 'Åldersgräns';
    let ageInterval = document.createElement('p');
    ageInterval.innerText = obj.ageInterval[0] + ' - ' + obj.ageInterval[1];



    // Splice latitude and longitude
    let latitude = obj.latitude.substring(0,9);
    let longitude = obj.longitude.substring(0,9);
    console.log('LATITUDE!!', latitude);
    console.log('LONGITUDE!!', longitude);


    let googleMap = document.createElement('img');
    googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`);

    let infoDiv = document.createElement('p');
    infoDiv.innerText = obj.info;


    let meetupWrapper = document.getElementById('meetupWrapper');

    md.appendChild(meetupDivTitle);
    md.appendChild(meetupDivDate);
    md.appendChild(creatorAvatarURL);
    md.appendChild(creatorNameLabel);
    md.appendChild(creatorName);
    md.appendChild(creatorMailLabel);
    md.appendChild(creatorMail);
    md.appendChild(antalLabel);
    md.appendChild(antal);
    md.appendChild(adressLabel);
    md.appendChild(adress);
    md.appendChild(ageIntervalLabel);
    md.appendChild(ageInterval);
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

        displayEventInfo(eventObject);

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
