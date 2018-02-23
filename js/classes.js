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

  constructor(eventid, name, address, latitude, longitude, date, time, spots, ageInterval, information, creator, members, admins){
    this.eventID = eventid;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
    this.time = time;
    this.spots = spots;
    this.ageInterval = ageInterval;
    this.info = information;
    this.creator = creator;
    this.members = members;
    this.admins = admins;
  }

  push(){
    this.key = db.ref('meetups/').push(this).key;
  }

  removeSelf(){
    db.ref('meetups/'+this.key).remove();
  }

  save(){
    db.ref('meetups/'+this.key).set(this);
  }

}


let meetup = new MeetupClass(1, 'Öl för fan', 'Mölndalsvägen 81', '58.124123', '11.12949123', '2018' ,'19:00', '5', [11,65], 'Detta är ett jävligt gött meetup', 'John Svensson (id222222)', 'hej', 'hej');

meetup.push();

console.log(meetup.key);

meetup.save();

// db.ref('chatter/'+id).on('child_added', function(snapshot){
//
//   let values = snapshot.val();
//
//   printChatMessage(values);
//
// });
