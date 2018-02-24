// Globala variabler
const ticketMasterApiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

window.onload = function(){

  let content = document.getElementById('content');

  let printDiv = document.createElement('div');
  printDiv.innerHTML = '<p>This is printed</p>';

  content.appendChild(printDiv);


  let btn = document.getElementById('queryButton');

  btn.addEventListener('click', function(event){
    // Change button to say Thanks
    event.target.innerText = 'Thanks!';
    queryApi();

  });

}


// Functions


function queryApi(){

  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterApiKey}&size=5&countryCode=SE`)
  .then(function(response){

    console.log(response);
    return response.json();
  })
  .then(function(json){

    for(let event of json._embedded.events){
      console.log(event);
      let currency = event.priceRanges[0].currency;
      let onsale = 'nej';
      let city = event._embedded.venues[0].city.name;

      let coordinates = event._embedded.venues[0].location;
      let latitude = coordinates.latitude;
      let longitude = coordinates.longitude;
      if(event.dates.status.code == 'onsale'){
        onsale = 'ja';
      }

      console.log(`Eventnamn: ${event.name}`);
      console.log(`Prisintervall: ${event.priceRanges[0].min + currency} - ${event.priceRanges[0].max + currency}`)
      console.log(`Datum: ${event.dates.start.localDate}`);
      console.log(`Tillgängliga biljetter finns? ${onsale}`);
      console.log(`Stad: ${city}`)
      console.log(`Koordinater\nLatitude: ${latitude}\nLongitude: ${longitude}`);
    }
  });

}
