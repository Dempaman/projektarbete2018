// Globala variabler
const ticketMasterApiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

window.onload = function(){


  // Initalize the page based on window location.



  // Turned off for debug purposes
  document.getElementById('eventTitle').addEventListener('click', retrieveEventInfo);
  //retrieveEventInfo();


  // end of callbacl
}

class EventClass {
  constructor(eventid, eventName, date, time, place, city, latitude, longitude, onsale, priceRange, currency, eventInformation){
    this.eventid = eventid;
    this.name = eventName;
    this.date = date;
    this.time = time;
    this.place = place;
    this.city = city
    this.latitude = latitude;
    this.longitude = longitude;
    this.onsale = onsale;
    this.priceRange = priceRange;
    this.currency = currency;
    this.information = eventInformation;
  }
}

function displayEventInfo(event){

  // <p id="eventDate">23/6 2018</p>
  // <h2 id="eventTitle">Summerburst 2018</h2>
  // <p id="eventPlace">Göteborg, Ullevi</p>
  // <p>Information</p>
  // <div id="eventInfoText">
  //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum iaculis vehicula. Praesent venenatis sem vulputate neque dictum, vel gravida magna rutrum. Aenean faucibus gravida ligula et vestibulum. Phasellus blandit finibus odio at pellentesque. Nam blandit viverra libero, nec fringilla nibh luctus a. Integer nisl leo, auctor quis interdum ut, interdum vel sapien. Sed et erat a purus pharetra ultrices non ut nisi. Pellentesque mi odio, dapibus sit amet aliquam ut, congue a urna. Nam eu risus vitae purus malesuada aliquam non ac sem. Etiam semper tortor et mi ullamcorper molestie in nec mauris. Nullam in orci neque. Sed vestibulum, lorem at vestibulum maximus, eros enim mollis eros, ut consectetur tellus ex pulvinar turpis. Quisque ornare metus id enim mattis porttitor. Donec ultrices nisl a nibh volutpat pretium. </p>
  // </div>

  document.getElementById('eventDate').innerText = event.date;
  document.getElementById('eventTitle').innerText = event.name;

  // Om platsen inte finns (Göteborg - Ullevi) så skriver vi bara ut staden.
  if(event.place == undefined){
    document.getElementById('eventPlace').innerText = event.city;
  } else {
    document.getElementById('eventPlace').innerText = event.place;
  }


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
