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

  constructor(eventid, name, address, latitude, longitude, time, spots, ageInterval, information, creator, members, admins){
    this.eventID = eventid;
    this.name = name;
    this.address = address;
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
    db.ref('meetups/'+this.key).remove();
  }

  save(){
    db.ref('meetups/'+this.key).set(this);
  }

}

class EventClass {
  constructor(eventid, eventName, date, time, place, city, latitude, longitude, onsale, priceRange, currency, eventInformation){
    this.eventid = eventid;
    this.name = eventName;
    this.date = date;
    this.time = time;
    this.place = place;
    this.city = city
    this.latitude = latitude;
    this.longitude = longitude;
    this.onsale = onsale;
    this.priceRange = priceRange;
    this.currency = currency;
    this.information = eventInformation;
  }
}

class UserClass {

  constructor(uniqueID, fullname, age, sex, mail, avatarURL, admin, meetups, information){
    this.uniqueID = uniqueID;
    this.fullname = fullname;
    this.age = age;
    this.sex = sex;
    this.mail = mail;
    this.avatarURL = avatarURL;
    this.admin = admin;
    this.meetups = meetups;
    this.information = information;
  }

  push(){
    return db.ref('users/').push(this).key;
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


// db.ref('chatter/'+id).on('child_added', function(snapshot){
//
//   let values = snapshot.val();
//
//   printChatMessage(values);
//
// });
