document.addEventListener('DOMContentLoaded', function() {


let searchBtn = document.getElementById('search-button');

/*
Land:
https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq
Städer:
https://app.ticketmaster.eu/mfxapi/v1/cities?domain_id=sweden&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq
*/


searchBtn.addEventListener('click', function(event){
    retrieveSearchEventInfo()
    console.log('click')
})

//ANTONS KOD, FETCH!
function retrieveSearchEventInfo(){

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${ticketMasterApiKey}`)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(json){
        console.log(json);
    })
    .catch(function(error){
      console.log('Error');
      console.log('Felmeddelande:',error);
    })


}







































































})//window.load
