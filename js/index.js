  window.addEventListener("load", function() {

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
          //console.log(event);

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
              day = eventTime.slice(8, 10);
              month = eventTime.slice(5, 7);

              switch (month) {
                case "01":
                  month = "Jan";
                  break;
                case "02":
                  month = "Feb";
                  break;
                case "03":
                  month = "Mar";
                  break;
                case "04":
                  month = "Apr";
                  break;
                case "05":
                  month = "Maj";
                  break;
                case "06":
                  month = "Jun";
                  break;
                case "07":
                  month = "Jul";
                  break;
                case "08":
                  month = "Aug";
                  break;
                case "09":
                  month = "Sep";
                  break;
                case "10":
                  month = "Okt";
                  break;
                case "11":
                  month = "Nov";
                case "12":
                  month = "Dec";
                  break;
                default:

              }

            }

            //console.log(eventId, eventName, eventPlace, eventCity, eventTime, eventImg, day, month);
            //console.log(eventId);
            getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg, day, month, meetUps);
          })
        }).catch((error) => {

          let errorMessage = error.message;
          console.log('Felmeddelande: ', errorMessage);

        })
    }

    function getUserEventInfo(eventName, eventPlace, eventTime, eventId, eventCity, eImg, day, month, meetUps) {


      let eventLink = document.createElement('a');
      eventLink.setAttribute('href', '/eventpage.html?event='+ eventId);
      //console.log(eventLink);
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
      eDay.innerText = `${day}`;
      eMonth.innerText = `${month}`;
    //  eMeetUps.innerHTML = `${meetUps} <i class="fas fa-users fa-1x"></i>`;

      //Add classes and info

      eventDiv.className = "big-card";
      eName.className = "event-name";
      ePlace.className = "event-place";
      eDay.className = "day";
      eMonth.className = "month";
      eMeetUps.className = "meetups-box";
      eventLink.className = "eventLink";

      //Append

      setMeetupCount(eventId, eMeetUps);
      eventDiv.appendChild(eventLink)
      eventDiv.appendChild(eUrlImg);
      eventDiv.appendChild(eName);
      eventDiv.appendChild(ePlace);
      eventDiv.appendChild(eDay);
      eventDiv.appendChild(eMonth);
      eventDiv.appendChild(eMeetUps);
      testOutPut.appendChild(eventDiv);
    }
  })

  /* Funktion för meetups  */
  function setMeetupCount(eventID, meetUps) {
    db.ref('meetups/' + eventID + '/info/meetupCounter').on('value', function(snapshot) {
      let data = snapshot.val();
      //console.log(data);
      if (true) {
        meetUps.innerHTML = `${data} <i class="mdi mdi-account-multiple mdi-24px"></i>`;
      }if(data == null){
        meetUps.innerHTML = `<i class="mdi mdi-account-multiple mdi-24px"></i>`;
      }
    });
  }
