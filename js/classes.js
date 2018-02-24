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


// db.ref('chatter/'+id).on('child_added', function(snapshot){
//
//   let values = snapshot.val();
//
//   printChatMessage(values);
//
// });
