window.onload = function(){


  let loggedIn = userLoggedIn() ? true : false;
  let userUniqueId = getLocationInfo()[1], user = null;


  // uniqueID, fullname, age, sex, mail, avatarURL, admin, meetups, information
  let newUser = new UserClass('2341dasfasd', 'Anton Stjernquist', '23', 'dude', 'antonstjernquist@gmail.com', 'https://imgur.com/123123', true, ['12481238asdnasd', 'aisfniasdn01823'], 'This is my profile page, welcome!');
  //newUser.push();

  setInformation(newUser);

  if(userUniqueId){
    console.log('Something specified');

    // Retrieve this user from the Database
    db.ref('users/').once('value', function(snap){
      console.log(snap.val());
      console.log('this');
    });


  } else {
    console.log('Nothing specified');
  }

}


function setInformation(userObject){
  document.getElementById('userName').innerText = userObject.fullname;
  document.getElementById('userMail').innerText = userObject.mail;

  document.getElementById('eventInfoText').children[0].innerText = userObject.information;

}


function userLoggedIn(){
  return localStorage.getItem('userLoggedIn') ? true : false;
}


function getLocationInfo(){
  let href = window.location.href, stopcode = false;

    if(href.includes('?event')){
      href = href.split('?')[1];

      href = href.split('&');

    } else if(href.includes('?user')){
      href = href.split('?')[1];

      href = href.split('&');
      console.log('user, yay');

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
