
      window.addEventListener("load", function(){


      const apiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';

      let testOutPut = document.getElementById('testOutPut');
      getMostPopularEvents();

      function getMostPopularEvents() {
        fetch(`https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids=sweden&rows=8&sort_by=popularity&apikey=${apiKey}`)
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
            let day;
            let month;
            let meetUps;

            if (eventImg !== undefined) {
              eImg = eventImg[0].url;

            } else {
              eImg = `http://cdn-01.hymn.se/wp-content/uploads/2017/09/IMG-142.jpg`;

            }
            if (eventTime === undefined) {
              day = "";
              month = "";

            } else {
              eventTime = eventTime.slice(0, 10);
              day = eventTime.slice(8,10);
              month = eventTime.slice(5, 7);
            }

            console.log(eventId, eventName, eventPlace, eventCity, eventTime, eventImg, day, month);
            getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg, day, month);
          })
      }).catch((error) => {

        let errorMessage = error.message;
        console.log('Felmeddelande: ', errorMessage);

      })
    }

    function getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg, day, month) {

          //Create event-cards (Test)
      let eventDiv = document.createElement('div');
      let eUrlImg = document.createElement('img');
      eUrlImg.src = eImg;
      let eID = document.createElement('h5');
      let eName = document.createElement('h4');
      let ePlace = document.createElement('p');
      let eTime = document.createElement('span');

      let eDay = document.createElement("span");
      let eMonth = document.createElement("span");
      let eMeetUps = document.createElement("span");

      eID.innerText = `ID: ${eventId}`;
      eName.innerText = `${eventName}`;
      ePlace.innerText = `${eventPlace}, ${eventCity}`;
      eTime.innerText = `${eventTime}`;
      eDay.innerText =  `${day}`;
      eMonth.innerText = `${month}`;
      eMeetUps.innerHTML = `<a href="#">Gå till meetups <i class="fas fa-users"></i></a>`;

      //     //Add classes and info

      eventDiv.className = "big-card";
      eName.className = "event-info";
      ePlace.className = "event-info";
      // eTime.className = "date";
      eDay.className = "day";
      // eDay.className = "date";
      eMonth.className = "month";
      eMeetUps.className = "meetups-box";


          //Append
      eventDiv.appendChild(eUrlImg);
      eventDiv.appendChild(eName);
      eventDiv.appendChild(ePlace);
      //eventDiv.appendChild(eTime);

      eventDiv.appendChild(eDay);
      eventDiv.appendChild(eMonth);
      eventDiv.appendChild(eMeetUps);

      // eventDiv.appendChild(eID);
      testOutPut.appendChild(eventDiv);
    }
    })
