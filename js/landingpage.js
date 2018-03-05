
      window.addEventListener("load", function(){


      const apiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';

      let testOutPut = document.getElementById('testOutPut');
      getMostPopularEvents();

      function getMostPopularEvents() {
        fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&rows=6&sort_by=popularity&apikey=${apiKey}`)
        .then((response) => {
          console.log(response);
          return response.json();
        }).then((json) => {
          let event = json.events;
          console.log(event);

          event.forEach((event) => {

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

            console.log(eventId, eventName, eventPlace, eventCity, eventTime, eventImg);
            getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg);
          })
      }).catch((error) => {

        let errorMessage = error.message;
        console.log('Felmeddelande: ', errorMessage);

      })
    }

    function getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg) {

          //Create event-cards (Test)
      let eventDiv = document.createElement('div');
      let eUrlImg = document.createElement('img');
      eUrlImg.src = eImg;
      let eID = document.createElement('h5');
      let eName = document.createElement('h4');
      let ePlace = document.createElement('p');
      let eTime = document.createElement('span');

      eID.innerText = `ID: ${eventId}`;
      eName.innerText = `${eventName}`;
      ePlace.innerText = `${eventPlace}, ${eventCity}`;
      eTime.innerText = `${eventTime}`;
      //     //Add classes and info

      eventDiv.className = "big-card";
      // eName.className = "event-info";
      // ePlace.className = "event-info";
      // eTime.className = "date";



          //Append
      eventDiv.appendChild(eUrlImg);
      eventDiv.appendChild(eName);
      eventDiv.appendChild(ePlace);
      // eventDiv.appendChild(eTime);
      // eventDiv.appendChild(eID);
      testOutPut.appendChild(eventDiv);
    }
    })
