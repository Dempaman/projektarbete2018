// Global Variables
let googleApiKey = 'AIzaSyDKH_D_sb0D4yfJy5OwO-SZf5kAFDGX7vo';

// En array med admins.
const adminArray = [];

// En funktion för att se om användarID:et är admin.
function getAdmin(userID){
  return adminArray.includes(userID);
}

// En funktion för att hämta alla admins.
function retrieveAdminsFromDatabase(){
    db.ref('users/').on('child_added', function(snapshot){
      let data = snapshot.val();
      if(data.admin){
        adminArray.push(data.uniqueID);
      }
    });
}

var config = {
    apiKey: "AIzaSyBISgoM6Nlg9SMg8mwki7SmYCj2wsrbMzY",
    authDomain: "projekt-2018-mewent.firebaseapp.com",
    databaseURL: "https://projekt-2018-mewent.firebaseio.com",
    projectId: "projekt-2018-mewent",
    storageBucket: "projekt-2018-mewent.appspot.com",
    messagingSenderId: "42705428709"
  };

  firebase.initializeApp(config);

  const db = firebase.database();
  retrieveAdminsFromDatabase();

class MeetupClass {

  constructor(eventid, name, address, placeName, latitude, longitude, time, spots, ageInterval, information){
    this.eventID = eventid;
    this.name = name;
    this.address = address;
    this.placeName = placeName;
    this.latitude = latitude;
    this.longitude = longitude;
    this.time = time;
    this.spots = spots;
    this.ageInterval = ageInterval;
    this.info = information;
    this.created = firebase.database.ServerValue.TIMESTAMP;
  }

  push(){

    this.key = db.ref('meetups/' + this.eventID + '/').push(this).key; // Returnerar nyckeln som den skapas vid ifall vi vill, kanske. Otestat
    new SystemMessage(this.key, this.creator.fullname + ' skapade detta meetup!').push(); // Skapar ett meddelande i chatten direkt

    /* Lägg till meetupKey under createdMeetups på användarens profil. */
    db.ref('users/' + this.creator.uniqueID + '/createdMeetups/' + this.eventID + '/' + this.key).set(true);
    printMessage('success', 'Ditt meetup skapades!'); // Visa ett meddelande på sidan att meetupet har skapats!
    console.log('EventID är lika med:',this.eventID);

    increaseMeetupCount(this.eventID);

    return this.key;
  }

  updateCount(){
    console.log('Hej jag behövs inte');
  }

  removeSelf(){
    db.ref('meetups/'+ this.eventID + '/' + this.key).remove();

    // Remove the messages for this aswell!
    db.ref('chats/'+this.key).remove();
  }

  save(){
    db.ref('meetups/' + this.eventID + '/' + this.key).update(this);
    console.log('Update the meetup with information: ', this)
    printMessage('success', 'Meetupet har uppdaterats!');
  }

}

class EventClass {
  constructor(eventid, eventName, date, place, address, city, onsale, minage, priceRange, currency, eventInformation, imageURL, weekDay, offsale){
    this.eventid = eventid;
    this.name = eventName;
    this.date = date;
    this.place = place;
    this.address = address;
    this.city = city
    this.onsale = onsale;
    this.minage = minage;
    this.priceRange = priceRange;
    this.currency = currency;
    this.information = eventInformation;
    this.imageURL = imageURL;
    this.weekDay = weekDay;
    this.offsale = offsale;
  }
}

class UserClass {

  constructor(uniqueID, fullname, mail, verified, age, sex, avatarURL, admin, meetups, information){
    this.uniqueID = uniqueID;
    this.fullname = fullname;
    this.verified = verified;
    this.age = age;
    this.sex = sex;
    this.mail = mail;
    this.avatarURL = avatarURL;
    this.admin = admin;
    this.meetups = meetups;
    this.information = information;
    this.created = firebase.database.ServerValue.TIMESTAMP;
  }

  push(){
    db.ref('users/'+this.uniqueID).set(this);

    // Get a sid
    createUniqueSid(this).then(function(value){
        // Körs om/när Promise-koden har lyckats (anropat succeed)
        console.log('Sid found, woohoo');
        db.ref('users/' + value[0].uniqueID + '/sid').set(value[1]);
    })
    .catch(function(error){
      console.log('fel', error);
    });

  }

  removeSelf(){
    db.ref('users/'+this.key).remove();
  }

  save(){
    db.ref('users/'+this.key).set(this);
  }

  setAdmin(){
    this.admin = true;
  }

  removeAdmin(){
    this.admin = false;
  }

}

class MessageClass {

  constructor(meetupID, textmessage){
    this.meetupID = meetupID;
    this.textmessage = textmessage;
    this.time = firebase.database.ServerValue.TIMESTAMP;
  }

  push(){
    db.ref('chats/' + this.meetupID).push(this);
    console.log('Message sent to the database with information: ', this);
  }

  removeSelf(){
    db.ref('users/'+this.key).remove();
  }

  save(){
    db.ref('users/'+this.key).set(this);
  }
}


class UserMessage extends MessageClass {

  constructor(senderID, avatarURL, meetupID, fullname, message, creator){
    super(meetupID, message);
    this.sender = senderID;
    this.fullname = fullname;
    this.avatarURL = avatarURL;
    this.creator = creator;
  }
}

class SystemMessage extends MessageClass {
  constructor(meetupID, message){
    super(meetupID, message);
    this.avatarURL = 'img\\logo-design3.png';
    this.fullname = 'Chattbot';
    this.system = 'true';
  }
}


/* Global functions to be used on all pages */

/* Function to print a message on any page */
let count = 0;
function printMessage(type, message, timer = 8000, delay = 0){

  let messageHolder = document.getElementById('printMessageHolder');
  let body = document.getElementsByTagName('body')[0];
  if(!messageHolder){
    messageHolder = document.createElement('div');
    messageHolder.setAttribute('id', 'printMessageHolder');
    body.appendChild(messageHolder);
  }

  if(type){
    if(type.includes('success') || type.includes('error') || type.includes('warn')){
      type += 'printMessage';
    } else {
      type = 'defaultprintMessage';
    }
  } else {
    type = 'defaultprintMessage';
  }


  let messageWrapper = document.createElement('div');
  messageWrapper.className = 'printMessageWrapper ' + type;

  let icon = document.createElement('span');


  /* Icon based on Type */
  if(type == 'successprintMessage'){
    icon.innerHTML = '<i class="mdi mdi-check-circle-outline mdi-24px"></i>';
  } else if(type == 'errorprintMessage'){
    icon.innerHTML = '<i class="mdi mdi-alert-circle-outline mdi-24px"></i>';
  } else if(type == 'warnprintMessage'){
    icon.innerHTML = '<i class="mdi mdi-alert mdi-24px"></i>';
  } else {
    icon.innerHTML = '<i class="mdi mdi-information-outline mdi-24px"></i>';
  }

  let textMessage = document.createElement('p');
  textMessage.innerText = message;

  let closeBtn = document.createElement('span');
  closeBtn.innerHTML = '<i class="mdi mdi-close mdi-24px"></i>';

  /* Add listener for the close button */
  closeBtn.addEventListener('click', function(){
    messageWrapper.className += ' fadeout';

    // Remove it after the timer.
    setTimeout(function(){
      messageHolder.removeChild(messageWrapper);
      count--;
    }, 450)
  });

  /* If we have a delay */
  setTimeout(function(){
    /* Append Everything */
    messageWrapper.appendChild(icon);
    messageWrapper.appendChild(textMessage);
    messageWrapper.appendChild(closeBtn);

    if(count >= 2){
      messageHolder.removeChild(messageHolder.firstChild);
      --count;
    }
    messageHolder.appendChild(messageWrapper);
    count++;
    /* Kod för att ta bort meddelandet efter x sekunder! */
    setTimeout(function(){
      // Add animation fadeout.
      messageWrapper.className += ' fadeout';
      setTimeout(function(){

        // If the messagewrapper is already displaying. Don't remove it.
        if(messageWrapper.offsetParent != null){
          messageHolder.removeChild(messageWrapper);
          count--;
        } else {
          console.log('Already removed!');
        }
      }, 450)
    }, timer-500);
  },delay);
}

function increaseMeetupCount(eventID){
  db.ref('meetups/'+eventID+'/info/meetupCounter').once('value', function(snapshot){
    let count = snapshot.val();

    if(count){
      db.ref('meetups/'+eventID+'/info/meetupCounter').set((count - 0) + 1);
    } else {
      db.ref('meetups/'+eventID+'/info/meetupCounter').set(1);
    }
  });
}
function decreaseMeetupCount(eventID){
  db.ref('meetups/'+eventID+'/info/meetupCounter').once('value', function(snapshot){
    let count = snapshot.val();

    if(count >= 1){
      db.ref('meetups/'+eventID+'/info/meetupCounter').set(count - 1);
    } else {
      db.ref('meetups/'+eventID+'/info/meetupCounter').set(0);
    }
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function createUniqueSid(userObject, requestedSid){
  return new Promise((resolve, reject) => {

    recursiveSidFind(userObject);

    function recursiveSidFind(userObject, count = 0){
      if(count <= 10){
        /* Create a site id here (sid) */
        let name = userObject.fullname, sid;

        if(name == null){
          sid = 'anonymous#'+getRandomInt(1000, 9999);
        } else {
          if(name.includes(' ')){
            name = name.split(' ');
            sid = name[0] + '#' + getRandomInt(1000,9999);
          } else {
            sid = name + '#' + getRandomInt(1000,9999);
          }
        }

        if(requestedSid){
          if(!requestedSid.includes('#')){
            sid = requestedSid + '#' + getRandomInt(1000,9999);
          } else {
            printMessage('error', 'You can\'t have another hashtag in your usertag.');
            reject('Too many hashtags.');
          }
        }
        sid = sid.toString().toLowerCase();

        // /* Check if the requestsid is lower than 100 */
        // if(requestsid){
        //   try{
        //     let num = Number.parseInt(sid);
        //
        //     if(num <= 99){
        //       printMessage('error', 'SID-nummer under 1000 är reserverade.');
        //       reject('För lågt nummer specificerat.');
        //       return;
        //     }
        //   } catch(e){
        //     console.log('No ints found');
        //   }
        // }
        console.log('Final sid is: ', sid);
        db.ref('users/').once('value', snapshot => {
          let data = snapshot.val();
          if(data){
            for(let user in data){
              user = data[user];
              if(user.sid){
                if(user.sid.toString().toLowerCase() == sid){
                  console.log('Sid already taken, lets create another one!');
                  if(requestedSid){
                    printMessage('error', 'Det unika id:et är tyvärr redan taget.');
                    reject('Sid already taken.');
                  } else {
                    return recursiveSidFind(userObject, count += 1);
                  }
                }
              }
            }
            console.log('Sid not taken :o');
            resolve([userObject, sid]);
          } else {
            printMessage('error', 'Ingen databasanslutning hittades');
          }
        });
      } else {
        reject('Could not find a sid in 10 tries.')
      }
    }
  });
}

/* ett userObject måste innehålla userObject.uniqueID */
function requestsid(userObject, sid){
  createUniqueSid(userObject, sid).then(function(value){
      db.ref('users/' + value[0].uniqueID + '/sid').set(value[1]);

      /* Check if the requested sid is for the localUser then set it to loggedInUser */
      let localUser = JSON.parse(localStorage.getItem('loggedInUser'));

      /* check if there's a local user */
      if(localUser){
        /* Check if they match */
        if(localUser.uniqueID == userObject.uniqueID){
          /* If so set the SID then push it into the localStorage */
          localUser.sid = sid;
          localStorage.setItem('loggedInUser', JSON.stringify(localUser));
        }
      }
  })
  .catch(function(error){
    console.log('Något gick snett: ', error);
  });
}

/*

avatarURL: "https://lh3.googleusercontent.com/-AxgGHdqx1CM/AAAAAAAAAAI/AAAAAAAAABo/hrcuCx0tzAU/photo.jpg"
fullname: "Anton Stjernquist"
meetupID: "-L6R_WRczkx4zHm9RHBy"
sender: "b6b5xMrqKKW0XA3hvExKoHvPbjm1"
textmessage: "Hej igen"

*/


//new MessageClass(currentUser.uniqueID, currentUser.avatarURL, meetupKey, currentUser.fullname, textmessage);


// db.ref('chatter/'+id).on('child_added', function(snapshot){
//
//   let values = snapshot.val();
//
//   printChatMessage(values);
//
// });
