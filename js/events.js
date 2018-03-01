document.addEventListener('DOMContentLoaded', function() {

const apiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';

let testOutPut = document.getElementById('testOutPut');
let searchBtn = document.getElementById('search-button');
let searchValue = document.querySelectorAll('input[name="searchevent"]');

/*
API DOKUMENTION: 
https://developer.ticketmaster.com/products-and-docs/apis/international-discovery/#event-search

Land:
https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq

Städer:
https://app.ticketmaster.eu/mfxapi/v1/cities?domain_id=sweden&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq

Images ex:
https://app.ticketmaster.eu/discovery/v2/events/Z698xZq2Z17fvZ9/images.json?apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq
*/


searchBtn.addEventListener('click', function(event){
    retrieveSearchEventInfo();
})
    

/********************TESTFUNKTION/********************/
/********************FETCH FROM TICKETMASTER API/********************/
function retrieveSearchEventInfo(){
    event.preventDefault();

    let userSearch;
    let userSearchValue = searchValue[0].value;
    
    //Switch för 10 största städer
    switch(userSearchValue) {
        case "Stockholm":
        case "stockholm":
            userSearchValue = '50001';
            break;
        case "Göteborg":
        case "göteborg":
            userSearchValue = '50482';
            break;
        case "Malmö":
        case "malmö":
            userSearchValue = '50111';
            break;
        case "Uppsala":
        case "uppsala":
            userSearchValue = '51166';
            break;
        case "Sollentuna":
        case "sollentuna":
            userSearchValue = '50103';
            break;
        case "Västerås":
        case "västerås":
            userSearchValue = '51109';
            break;
        case "Örebro":
        case "örebro":
            userSearchValue = '51082';
            break;
        case "Linköping":
        case "linköping":
            userSearchValue = '50869';
            break;
        case "Helsingborg": 
        case "helsingborg":
            userSearchValue = '50167';
            break;
        case "Norrköping": 
        case "norrköping":
            userSearchValue = '50906';
            break;
        case "Jönköping": 
        case "jönköping":
            userSearchValue = '50792';
            break;
        default:
            userSearchValue = 'Your city sucks!'
            alert(userSearchValue);
    }
        
        
        //fetchar api från input
        fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?&city_ids=${userSearchValue}&rows=10&apikey=${apiKey}`)
        .then(function(response){
          return response.json();
        })
        .then(function(json){
            
            //kolla objektet i konsolen
            console.log(json);
            
            //spara objektet
            let event = json.events;
            
            //loopa igenom listan och ta ut den info du vill ha
            event.forEach(function(event){
                
                let eventId = event.id;
                let eventName = event.name;
                let eventPlace = event.venue.name;
                let eventCity = event.venue.location.address.city;
                let eventTime = event.localeventdate;
                let eventImg = event.images;
                let eImg;
                
                console.log(eventImg);
                
                if (eventImg !== undefined) {
                    eImg = eventImg[0].url;
                    
                } else {
                    eImg = `http://cdn-01.hymn.se/wp-content/uploads/2017/09/IMG-142.jpg`;
                }
                
                
                if (eventTime == undefined) {
                    eventTime = '';
                } else {
                    eventTime = eventTime.slice(0, 10);
                }

                //console.log(`ID: ${eventId}`);
                //console.log(`Namn: ${eventName}`);
                //console.log(`Plats: ${eventPlace}`);
                //console.log(`Datum: ${eventTime}`);
                
                getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg);

            })
            
        })
        .catch(function(error){
          console.log('Error');
          console.log('Felmeddelande:',error);
        })
        
};



/********************TYPE OUT INFO IN SOME RANDOM DIV FUNCTION********************/


function getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg){
    
    let eventDiv = document.createElement('div');
    let eUrlImg = document.createElement('img');
    eUrlImg.src = eImg;
    let eID = document.createElement('h5');
    let eName = document.createElement('h4');
    let ePlace = document.createElement('p');
    let eTime = document.createElement('p');
    
    eventDiv.classList.add('event-card');
    
    eID.innerText = `ID: ${eventId}`;
    eName.innerText = `${eventName}`;
    ePlace.innerText = `${eventPlace}, ${eventCity}`;
    eTime.innerText = `${eventTime}`;
    
    eventDiv.appendChild(eUrlImg);
    eventDiv.appendChild(eName);
    eventDiv.appendChild(ePlace);
    eventDiv.appendChild(eTime);
    eventDiv.appendChild(eID);
    testOutPut.appendChild(eventDiv);
}








































































});
