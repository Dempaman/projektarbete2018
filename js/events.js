/*
API DOKUMENTION: 
https://developer.ticketmaster.com/products-and-docs/apis/international-discovery/#event-search

Land:
https://app.ticketmaster.eu/mfxapi/v1/events?&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq

Städer:
https://app.ticketmaster.eu/mfxapi/v1/cities?domain_id=sweden&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq

Images ex:
https://app.ticketmaster.eu/discovery/v2/events/Z698xZq2Z17fvZ9/images.json?apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq
*/

document.addEventListener('DOMContentLoaded', function () {
    
	const apiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';
    
	let testOutPut = document.getElementById('testOutPut');
	let searchBtn = document.getElementById('search-button');
	let searchValue = document.querySelectorAll('input[name="searchevent"]');
    
	let allEventsSearchDefault = document.getElementsByClassName('all-events-search');
	let selectedEvents = allEventsSearchDefault[0];
	let selectedCity = allEventsSearchDefault[1];
	let selectedWhen = allEventsSearchDefault[2];
    
	getMostPopularEvents();
    
	searchBtn.addEventListener('click', function (event) {
		testOutPut.innerHTML = '';
		retrieveSearchEventInfo();
	})
	selectedEvents.addEventListener('change', function (event) {
		testOutPut.innerHTML = '';
		defaultSearchEventInfo();
	})
	selectedCity.addEventListener('change', function (event) {
		testOutPut.innerHTML = '';
		defaultSearchEventInfo();
	})
	selectedWhen.addEventListener('change', function (event) {
		testOutPut.innerHTML = '';
		defaultSearchEventInfo();
	})

	/********************Fetch from TicketMaster Api/********************/
	function retrieveSearchEventInfo() {
		event.preventDefault();
		let userSearch;
		let userSearchValue = searchValue[0].value;
		
        //Switch for Sweden 10 biggest cities
		switch (userSearchValue) {
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
			handleError(userSearchValue);
		}
        
		//Fetch from TicketMaster Api in search field
		fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?&city_ids=${userSearchValue}&rows=10&sort_by=popularity&apikey=${apiKey}`).then(function (response) {
			return response.json();
		}).then(function (json) {
			//spara objektet
			let event = json.events;
			//loopa igenom listan och ta ut den info du vill ha
			event.forEach(function (event) {
				let eventId = event.id;
				let eventName = event.name;
				let eventPlace = event.venue.name;
				let eventCity = event.venue.location.address.city;
				let eventTime = event.localeventdate;
				let eventImg = event.images;
				let eImg;
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
				getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg);
				searchValue[0].value = '';
			})
		}).catch(function (error) {
			
            let errorMessage = error.message;
            
			console.log('Felmeddelande: ', errorMessage);
            
            handleError(errorMessage);
            
		})
	};
    
    
/*
ALLA: https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&sort_by=popularity&apikey=wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq
*/
    
	//Search my search default field, user selection
	function defaultSearchEventInfo() {
		let ISO = 'T10:00:00Z';
		let selCategory = selectedEvents.value;
		let selCity = selectedCity.value;
		let selWhen = selectedWhen.value;
        
		//Todays date
		let currentDate = new Date();
		let today = currentDate.toISOString();
		today = today.slice(0, 10) + ISO;
		console.log(today);
        
		//This month
		let nextDateMonth = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
		let month = nextDateMonth.toISOString();
		month = month.slice(0, 10) + ISO;
        
		//This week
		let nextDateWeek = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
		let week = nextDateWeek.toISOString();
		week = week.slice(0, 10) + ISO;
        
		//Today & Tomorrow
		let tomorrowDate = new Date(Date.now() + (1 * 24 * 60 * 60 * 1000));
		let tomorrow = tomorrowDate.toISOString();
		tomorrow = tomorrow.slice(0, 10) + ISO;
        
        
		if (selWhen == 'today') {
			selWhen = today;
            
		} else if (selWhen == 'tomorrow') {
			selWhen = tomorrow;
            
		} else if (selWhen == 'week') {
			selWhen = week;
            
		} else if (selWhen == 'month') {
			selWhen = month;
		}
        
		fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&category_ids=${selCategory}&city_ids=${selCity}&eventdate_from=${today}&eventdate_to=${selWhen}&rows=15&sort_by=popularity&apikey=${apiKey}`).then(function (response) {
            
			return response.json();
            
		}).then(function (json) {
            
			let event = json.events;
            
			event.forEach(function (event) {
                
				let eventId = event.id;
				let eventName = event.name;
				let eventPlace = event.venue.name;
				let eventCity = event.venue.location.address.city;
				let eventTime = event.localeventdate;
				let eventImg = event.images;
				let eImg;
                
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
                
				getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg);
			})
		}).catch(function (error) {
			
            let errorMessage = error.message;
            
			console.log('Felmeddelande: ', errorMessage);
            
            handleError(errorMessage);
            
		})
	}

    /********************Get most popular event in Sweden on eventpage load********************/
	function getMostPopularEvents() {
		fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&rows=15&sort_by=popularity&apikey=${apiKey}`).then(function (response) {
            
			return response.json();
            
		}).then(function (json) {
            
			let event = json.events;
            
			event.forEach(function (event) {
                
				let eventId = event.id;
				let eventName = event.name;
				let eventPlace = event.venue.name;
				let eventCity = event.venue.location.address.city;
				let eventTime = event.localeventdate;
				let eventImg = event.images;
				let eImg;
                
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
                
				getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg);
			})
		}).catch(function (error) {
			
            let errorMessage = error.message;
            
			console.log('Felmeddelande: ', errorMessage);
            
            handleError(errorMessage);
		})
	}
    
    
    
	/********************Random code before merging with eventcards file********************/
	function getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg) {
        
		while (testOutPut.firstchild) {
			testOutPut.removeChild(testOutPut.firstChild);
		}
        
        //Create event-cards (Test)
		let eventDiv = document.createElement('div');
		let eUrlImg = document.createElement('img');
		eUrlImg.src = eImg;
		let eID = document.createElement('h5');
		let eName = document.createElement('h4');
		let ePlace = document.createElement('p');
		let eTime = document.createElement('p');
        
        //Add classes and info
		eventDiv.classList.add('event-card');
		eID.innerText = `ID: ${eventId}`;
		eName.innerText = `${eventName}`;
		ePlace.innerText = `${eventPlace}, ${eventCity}`;
		eTime.innerText = `${eventTime}`;
        
        //Append
		eventDiv.appendChild(eUrlImg);
		eventDiv.appendChild(eName);
		eventDiv.appendChild(ePlace);
		eventDiv.appendChild(eTime);
		eventDiv.appendChild(eID);
		testOutPut.appendChild(eventDiv);
	}
    
    
    /********************Handling error function********************/
    
    function handleError(errorMessage, userSearchValue){
        
        let errorMessageDiv = document.createElement('div');
        
        errorMessageDiv.innerText = errorMessage;
        
        testOutPut.appendChild(errorMessageDiv);
        
    }























});