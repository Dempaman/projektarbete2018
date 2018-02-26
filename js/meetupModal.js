// Initialize a new plugin instance for one element or NodeList of elements.

window.onload = function(){
  displayAgeInterval('0,100');

  var ageSlider = new rSlider({
          target: '#ageSlider',
          values: {min: 0, max: 100},
          step: 1,
          range: true,
          tooltip: false,
          scale: false,
          labels: false,
          onChange: displayAgeInterval
      });


      /* Functions that require the DOM to be laoded */

      function displayAgeInterval(values){
        let displayDiv = document.getElementById('ageIntervalDisplayer');
        let valueArray = getValues(values);
        let val1 = valueArray[0], val2 = valueArray[1];

        displayDiv.innerHTML = `<div val1="${val1}" val2="${val2}">${val1} år</div><div>${val2} år</div>`

        displayDiv.children[0].addEventListener('click', function(event){
          makeInput(event.target, values, val1, 'start');
        });
        displayDiv.children[1].addEventListener('click', function(event){
          makeInput(event.target, values, val2, 'end');
        });
      }

      function makeInput(target, oldValues, val, pos){
        let ageInput = document.createElement('input');
        console.log(pos);
        ageInput.className = 'ageInput';
        ageInput.setAttribute('type', 'text');
        ageInput.setAttribute('placeholder',val);
        target.innerText = '';
        //target.innerHTML = '<input class="ageInput" type="text" ';

        // append the input.
        target.appendChild(ageInput);
        // Focus the input
        ageInput.focus();

        // Add eventListener for when the input gets blurred.
        ageInput.addEventListener('blur', function(event){
          setAgeInterval(event, oldValues, pos, ageSlider);
        });
        // Add eventListener for enter.
        ageInput.addEventListener('keypress', function(event){
          if(event.keyCode == 13){
            setAgeInterval(event, oldValues, pos, ageSlider);
          }
        });
      }

// EventListener för att lägga till ett meetup
initCreateMeetupListeners(ageSlider);

function setAgeInterval(event, oldValues, pos, ageSlider){
  let val1 = oldValues.split(',')[0];
  let val2 = oldValues.split(',')[1];
  console.log(oldValues);
    // Kolla position
    if(pos == 'start'){
      val1 = Number.parseInt(event.target.value);
      ageSlider.setValues(val1,val2);
    } else {
      val2 = Number.parseInt(event.target.value);
      ageSlider.setValues(val1,val2);
    }
    displayAgeInterval(val1 + ',' + val2);
  };

//end of callback
}



function initCreateMeetupListeners(ageSlider){
  let createBtn = document.getElementById('createMeetupButton');

  // Vad gör vi när man trycker på skapa meetup. (eventid, name, address, latitude, longitude, time, spots, ageInterval, information, creator, members, admins)
  createBtn.addEventListener('click', function(event){
    console.log('HALLÅ!!!');
    /* Börja med att hämta alla variabler */
    let eventid = 'Z698xZq2Z17fvZ9';
    let name = document.getElementById('nameInput').value;
    let address = document.getElementById('addressInput').value;
    let placeName = document.getElementById('placeNameInput').value;
    let time = document.getElementById('timeInput').value;

    // Koordinater
    let latitude = document.getElementById('map').getAttribute('lat');
    let longitude = document.getElementById('map').getAttribute('lng');

    // ageInterval
    let ageInterval = ageSlider.getValue().split(',');

    // Antal platser
    let spots = document.getElementById('spotsInput').value;

    // Information
    let information = document.getElementsByTagName('textarea')[0].value;



    //(uniqueID, fullname, mail, verified, age, sex, avatarURL, admin, meetups, information)


    // Skaparens användarID som vi får genom autentiseringen!
    if(localStorage.getItem('loggedInUser')){

      let localUser = JSON.parse(localStorage.getItem('loggedInUser'));

      let creator = {
        uniqueID: localUser.uniqueID,
        name: localUser.fullname,
        mail: localUser.mail,
        avatarURL: localUser.avatarURL
      };

      console.log(creator);

      console.log('CREATOR LOGGED IN ATM: ', creator);
      // Medlemmar - Lägger skaparen av meetupet som medlem direkt i en LISTA.
      let members = [creator.uniqueID];

      // Admins - Lägger skaparen av meetupet som admin direkt i en LISTA.
      let admins = [creator.uniqueID];

      // Skapa meetupet.
      let meetup = new MeetupClass(eventid, name, address, placeName, latitude, longitude, time, spots, ageInterval, information, creator.uniqueID, members, admins);
      meetup.push();
      console.log('Meetup: ',meetup);
    } else {
      console.log('No user logged in!!!');
    }
  });
}


function getValues(values){
  console.log('VALUES BEFORE SPLIT: ', values);
  return values.split(',');
}
