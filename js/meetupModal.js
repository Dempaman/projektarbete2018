// Initialize a new plugin instance for one element or NodeList of elements.
let createSlider = true;
let ageSlider;
function initSliderAndMoreShit(redigera = false, meetupKey) {

  if(createSlider){
    createSlider = false;
    ageSlider = new rSlider({
              target: '#ageSlider',
              values: {min: 0, max: 100},
              step: 1,
              range: true,
              tooltip: false,
              scale: false,
              labels: false,
              onChange: displayAgeInterval
          });
    }
    ageSlider.setValues(1,100);

  /* Variables */
  let mc = document.getElementById('modalContent');
  let headerTitle = mc.children[0].children[0];

  /* Inställningar för redigera */
  if(redigera && meetupKey){
    /* scrolla till toppen */
    document.getElementsByTagName('html')[0].scrollTop = 0;

    headerTitle.innerText = 'Redigera meetup';


    let meetupData = document.getElementById('meetup-'+meetupKey);
    let infoDivWrapper = meetupData.children[4];
    let addressCard = meetupData.children[6];
    let meetupInfo = meetupData.children[7];
    // ageSlider.values = {min: 40, max: 90}; // Sätt värden på slidern.

    console.log('Vi ska redigera detta event: ');
    console.log(meetupData.children[0].innerText); // Meetupets namn
    console.log(meetupData.children[1].innerText); // Tiden för meetupet.

    console.log(infoDivWrapper.children[1].children[1].innerText); // Deltagare
    let spots = infoDivWrapper.children[1].children[1].innerText;
    spots = spots.split(' / ')[1];

    /* Set the name */
      document.getElementById('nameInput').value = meetupData.children[0].innerText;

    /* Set the address */
      document.getElementById('addressInput').value = addressCard.children[3].innerText;

    /* Set the place */
      document.getElementById('placeNameInput').value = addressCard.children[1].innerText;

    /* Get the ageInterval */
      let ageInterval = infoDivWrapper.children[0].children[1].innerText;
      console.log(ageInterval); // Åldersgräns

      /* Split it */
      ageInterval = ageInterval.split(' - ');

      //Check if val1 == 0 if so set it to 1,
      let val1 = ageInterval[0]-0;
      if(!val1){
        val1 = 1;
      }
      displayAgeInterval([val1, ageInterval[1]-0]);
      ageSlider.setValues(val1, ageInterval[1]-0);

    /* Set the time */
      let time = meetupData.children[1].innerText.split(' - ')[1];
      document.getElementById('timeInput').value = time;

    /* Set the spots */
      document.getElementById('spotsInput').value = spots;

    /* Set google map marker */
      let googleMapDiv = addressCard.children[6]; // googleMapDiv

      let lat = Number.parseFloat(googleMapDiv.getAttribute('lat'));
      let lng = Number.parseFloat(googleMapDiv.getAttribute('lng'));
      console.log('Lat:',lat,'Long:',lng);

      let myLatLng = new google.maps.LatLng({lat: lat, lng: lng});
      initMap(myLatLng);
      let map = document.getElementById('map');
      map.setAttribute('lat', lat);
      map.setAttribute('lng', lng);

    /* Set the meetup information */
      document.getElementById('textareaDiv').children[1].value = meetupInfo.children[1].innerText; // Information about the meetup.

    console.log('I guess you where being serious :o');
  } else {
    headerTitle.innerText = 'Skapa meetup';

    console.log('Inte här för att redigera!');
  }


      let closeBtn = document.getElementById('menuDiv');
      let modalWrapper = document.getElementById('modalWrapper');
      let meetupWrapper = document.getElementById('meetupWrapper');
      let footer = document.getElementsByTagName('footer')[0];

      if(closeBtn){
        closeBtn.addEventListener('click', function(event){
          console.log('Target:', event.target);
          console.log('Closed skapa meetup');
          //ageSlider.destroy();
          modalWrapper.className = 'hidden';
          meetupWrapper.className = 'show';
          footer.className = 'footer-box';
        });
      } else {
        console.log('no btn');
      }

/* Functions that require the DOM to be laoded */
function displayAgeInterval(values){
        let displayDiv = document.getElementById('ageIntervalDisplayer');
        console.log('This is the displayAgeInterval', values);
        let valueArray;
        if(typeof values == 'string'){
          valueArray = getValues(values);
        } else {
          valueArray = values;
        }
        let val1 = valueArray[0], val2 = valueArray[1];

        console.log('Val1: ', val1, 'Val2:', val2);
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
initCreateMeetupListeners(ageSlider, redigera, meetupKey);
redigera = false;
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

  //Add eventlistener for the info Inputbox
  let inputBox = document.getElementsByTagName('textarea')[0];
  let charCount = document.getElementsByClassName('characterCounter')[0];
  let charCountOutput = charCount.children[0];

  let lastKeyUp = new Date().getTime();
  inputBox.addEventListener('keyup', function(e){
      let curTime = new Date().getTime();
      if(inputBox.value.length >= 900){
        if(lastKeyUp > curTime - 5000){
            console.log('Wait!');
        } else {
          printMessage('warn', 'Du har nu nått maximalt antal tecken som får plats i beskrivningen.', 4000);
          lastKeyUp = curTime;
        }
      }
      charCountOutput.innerText = inputBox.value.length + ' /900';
  });
}

function initCreateMeetupListeners(ageSlider, redigera = false, meetupKey = false){
  let createBtn = document.getElementById('createMeetupButton');

    createBtn.addEventListener('click', createMeetupListener);
    createBtn.meetupKey = meetupKey;
    createBtn.redigera = redigera;

}
function createMeetupListener(event){
  let redigera = event.target.redigera;
  let meetupKey = event.target.meetupKey;

  /* Börja med att hämta alla variabler */
  let eventid = getLocationInfo()[0];
  let name = document.getElementById('nameInput').value;
  let address = document.getElementById('addressInput').value;
  let placeName = document.getElementById('placeNameInput').value;
  let time = document.getElementById('timeInput').value;

  // Koordinater
  let latitude = document.getElementById('map').getAttribute('lat').substring(0,9);
  let longitude = document.getElementById('map').getAttribute('lng').substring(0,9);

  // ageInterval
  let ageInterval = ageSlider.getValue().split(',');

  // Antal platser
  let spots = document.getElementById('spotsInput').value;

  // Information
  let information = document.getElementsByTagName('textarea')[0].value;

  // Skaparens användarID som vi får genom autentiseringen!
  if(localStorage.getItem('loggedInUser')){


    let localUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let creator = {
        uniqueID: localUser.uniqueID,
        sid: localUser.sid,
        fullname: localUser.fullname,
        mail: localUser.mail,
        avatarURL: localUser.avatarURL
    };

    console.log(creator);

    console.log('CREATOR LOGGED IN ATM: ', creator);
    // Medlemmar - Lägger skaparen av meetupet som medlem direkt i en LISTA.
    let members = {creator};

    // Admins - Lägger skaparen av meetupet som admin direkt i en LISTA.
    let admins = [creator.uniqueID];
    let allChecks = false;


    if(checkLength('Namnet', name.length, 6, 36)){
        if(checkLength('Platsnamnet', placeName.length, 4, 48)){
            if(checkForNumber('Antal plantser', spots)){
                if(checkForTime('Tid', time)){

                  // Skapa meetupet.
                  if(meetupKey && redigera){
                    let meetup = new MeetupClass(eventid, name, address, placeName, latitude, longitude, time, spots, ageInterval, information);
                    meetup.key = meetupKey;
                    meetup.save();
                    redigera = false;
                  } else {
                    let meetup = new MeetupClass(eventid, name, address, placeName, latitude, longitude, time, spots, ageInterval, information);

                    meetup.creator = creator;
                    meetup.admins = admins;
                    meetup.members = members;

                    /* Skapa meetup */
                    meetupKey = meetup.push();
                    meetup.updateCount();
                    console.log('Meetup: ',meetup);
                  }

                  setTimeout(function(){
                    // Interesting ? https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                    let htmlScroll = document.getElementsByTagName('html')[0];

                    let newMeetup = document.getElementById('meetup-' + meetupKey);

                    newMeetup.scrollIntoView({behavior: 'smooth'});
                    console.log(htmlScroll.scrollHeight);

                  },200);

                  //visa navigation och menu.... igen!!.
                    document.getElementById('navigation').className = 'show';
                    document.getElementById('menuToggle').className = 'show';


                  // Empty the fields
                    document.getElementById('nameInput').value = '';
                    document.getElementById('addressInput').value = '';
                    document.getElementById('timeInput').value = '';
                    document.getElementById('spotsInput').value = '';
                    document.getElementById('placeNameInput').value = '';

                  // Visa alla meetups igen!
                    document.getElementById('modalWrapper').className = 'hidden';
                    document.getElementById('meetupWrapper').className = 'show';

                    let footer = document.getElementsByTagName('footer')[0];
                    footer.className = 'footer-box';

                    event.target.removeEventListener('click', createMeetupListener);

                }
            }
        }
    }

  } else {
    modalWrapper.className = 'hidden'
    let footer = document.getElementsByTagName('footer')[0];
    footer.className = 'footer-box';
    toggleLoginModal();
    event.target.removeEventListener('click', createMeetupListener);
    console.log('No user logged in!!!');
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

function getValues(values){
  console.log('VALUES BEFORE SPLIT: ', values);
  return values.split(',');
}

function toggleCreateMeetupModal(redigera = false){

  let modalWrapper = document.getElementById('modalWrapper');
  let meetupWrapper = document.getElementById('meetupWrapper');
  let menuToggleBtn = document.getElementById('menuToggle');
  let footer = document.getElementsByTagName('footer')[0];

  // ModalWrapper är gömd från början. Om den är hidden visar vi den.
  if(modalWrapper.className == 'hidden'){
    modalWrapper.className = ''; // Visa modalen för att skapa meetup
    meetupWrapper.className = 'hidden'; // Dölj
    menuToggleBtn.className = 'hidden'; // Dölj
    footer.setAttribute('id', 'fokenHide'); // Dölj

  } else {
    modalWrapper.className = 'hidden';
    meetupWrapper.className = '';
    menuToggleBtn.className = '';
    footer.setAttribute('id', '');
  }

  //Check if user is logged in and set btn correctly
  let btn = document.getElementById('createMeetupButton')

  if(localStorage.getItem('loggedInUser')){
    if(redigera){
      btn.innerText = 'Redigera meetup';
    } else {
      btn.innerText = 'Skapa meetup';
    }
    btn.className = 'createMeetupBtn purple';
  } else {
    btn.innerText = 'Logga in';
    btn.className = 'createMeetupBtn logInBtn leaveMeetupBtn';
  }
}

function checkLength(type, str, min, max){
    if(str < min){
      printMessage('error', type + ' är lite för kort.');
      return false;
    } else if (str > max){
      printMessage('error', type + ' är lite långt.');
      return false;
    } else {
      return true;
    }
}

function checkForNumber(type, number){
    if(isNaN(number)){
      return printMessage('error', type + ' måste vara ett tal');
    } else if( number < 2){
      printMessage('error', type + ' är för få platser')
    } else if ( number > 100){
      printMessage('error', type + ' är för många platser');
    }
      return true;
}
/*
function checkForTime(type, timeVal){


    if(isNaN(timeVal)){
      printMessage('error', type + ' måste vara en tid');
      //let newtimeVal = timeVal.split(":", 2);
    }
    else {
      let timeToString = timeVal.toString().split('');
      console.log('fungerar detta', + timeToString)
      printMessage('success', type + ' är en test!!')
    }
} */

function checkForTime(type, timeInp){
    var timeValue = timeInp;
    if(timeValue == "" || timeValue.indexOf(":")<0){
        printMessage('error',  type  + ': Fel format. Exempel 17:10');
        return false;
    } else {
        var hours = timeValue.split(':')[0];
        var min = timeValue.split(':')[1];

        if(hours == "" || isNaN(hours) || parseInt(hours)>23){
            printMessage('error', type + ': Fel format. Exempel "17:10"');
            return false;
        } else if(parseInt(hours) == 0)
            hours = "00";
        else if (hours <10)
            hours = "0"+hours;
        if(min == "" || isNaN(min) || parseInt(min)>59){
            printMessage('error', type + ': Fel format. Exempel "17:10"');
            return false;
        }
        else if(parseInt(min) == 0)
            min = "00";
        else if (min <10)
            min = "0"+min;
        timeInp = hours + ":" + min;
    }
    return true;
}
