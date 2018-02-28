document.addEventListener('DOMContentLoaded', function() {

const ticketMasterApiKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';
let searchBtn = document.getElementById('search-button');


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
