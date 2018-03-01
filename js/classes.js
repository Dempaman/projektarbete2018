// Global Variables
let googleApiKey = 'AIzaSyDKH_D_sb0D4yfJy5OwO-SZf5kAFDGX7vo';

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

class MeetupClass {

  constructor(eventid, name, address, placeName, latitude, longitude, time, spots, ageInterval, information, creator, members, admins){
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
    this.creator = creator;
    this.members = members;
    this.admins = admins;
  }

  push(){
    return db.ref('meetups/' + this.eventID).push(this).key; // Returnerar nyckeln som den skapas vid ifall vi vill, kanske. Otestat
  }

  removeSelf(){
    db.ref('meetups/'+ this.eventID + '/' + this.key).remove();

    // Remove the messages for this aswell!
    db.ref('chats/'+this.key).remove();
  }

  save(){
    db.ref('meetups/'+this.key).set(this);
  }

}




class EventClass {
  constructor(eventid, eventName, date, place, city, latitude, longitude, onsale, minage, priceRange, currency, eventInformation){
    this.eventid = eventid;
    this.name = eventName;
    this.date = date;
    this.place = place;
    this.city = city
    this.latitude = latitude;
    this.longitude = longitude;
    this.onsale = onsale;
    this.minage = minage;
    this.priceRange = priceRange;
    this.currency = currency;
    this.information = eventInformation;
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
  }

  push(){
    db.ref('users/'+this.uniqueID).set(this);
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

  constructor(senderID, avatarURL, meetupID, fullname, message){
    super(meetupID, message);
    this.sender = senderID;
    this.fullname = fullname;
    this.avatarURL = avatarURL;
  }
}

class SystemMessage extends MessageClass {
  constructor(meetupID, message){
    super(meetupID, message);
    this.avatarURL = 'img\\logo-design3.png';
    this.fullname = 'Chattbot';
  }
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
