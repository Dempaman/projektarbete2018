window.addEventListener('load', profilFunction);


// EXTRA CODE SAVE JUST IN charse
// db.ref('users/'+this.creator.uniqueID+'/createdMeetups').on('child_added', function(snapshot){
//       let eventObjects = snapshot.val();
//       let eventID = snapshot.key;
//       console.log(eventID);
//       for(let eventObj in eventObjects){
//         let currentEvent = eventObjects[eventObj];
//
//         console.log(currentEvent);
//         console.log(eventObj);
//       }
//     });



// function getUserMeetups() {
//
// }
//
// function getUserCreatedMeetups() {
//
// }

function ifUserIsTrue() {
  let userName = document.getElementById('user-name');
  let userImg = document.getElementById('user-img');
  let meetupCount = document.getElementById('user-joind-meetups');
  let createdCount = document.getElementById('user-created-meetups');

  let data;
  let profileName;
  let profileImg;
  let uniqueID;

  const userLog = JSON.parse(localStorage.getItem('loggedInUser'));
  const profilId = 0;

  if (userLog) {

    profileName = userLog.fullname;
    profileImg = userLog.avatarURL;
    uniqueID = userLog.uniqueID;
    if (profilId) {
      console.log('You have clicked on a profil');
      if (userLog === profilId) {
        profileName = userLog.fullname;
        profileImg = userLog.avatarURL;
        uniqueID = userLog.uniqueID;
        console.log('This is your profil');
      } else {
        profileName = profilId.fullname;
        profileImg = profilId.avatarURL;
        uniqueID = profilId.uniqueID;
        console.log('this is ' + profilId.fullname + 'profile');
      }

    }

    userName.innerText = profileName;
    userImg.src = profileImg;


    db.ref('/users/' + uniqueID).on('value', function(snapshot) {
      data = snapshot.val();

      if (data.meetups) {
        let amontOfMeetups = Object.keys(data.meetups);
        meetupCount.innerText = amontOfMeetups.length;

        let joindMeetups = data.meetups;
        console.log(joindMeetups);
        console.log(joindMeetups.key);

        for (let x in joindMeetups) {
          console.log(x);

          // Lägg till html kod som ska loppa igenom alla meetups

        }

      } else {
        meetupCount.innerText = 0;
        console.log('data[x] is ', data.meetups);
        console.log('du är anmäld på 0 meetups');
      }

    });

    // Hämta alla skapade Meetups
    db.ref('users/' + uniqueID + '/createdMeetups').on('value', function(snapshot) {
      // child_added
      let eventObjects = snapshot.val();
      let eventID = snapshot.key;

      if (eventObjects) {
        let counter = 0;
        for (let obj in eventObjects) {
          counter += Object.keys(eventObjects[obj]).length;
          //let currentEvent = eventObjects[obj];

          // Lägg till html kod som ska loppa igenom alla meetups

          console.log('eventObj ', obj);
          console.log('eventObjects ', Object.keys(eventObjects[obj]).length);
        }
          createdCount.innerText = counter;
      }

    });


  } else {
    console.log('Sorry! No Web Storage support');
    let indexPage = '/index.html';
    //let testLocalHost = window.location.protocol + '//' + window.location.hostname + ':8000' + indexPage;
    //let relocate = window.location.href
    //console.log(window.location.href);
    //console.log(testLocalHost);
    window.location.assign('index.html'); // kan komma att ändras i framtiden
  }

}

function profilFunction(event) {

  ifUserIsTrue();


  // User info text - show more/ show less
  // let more = document.getElementById('user-info-more');
  let showMore = document.getElementsByClassName('show-more')[0];
  let userInfo = document.getElementsByClassName('white-cover')[0];

  // more.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   if (showMore.innerText === 'visa mer') {
  //     showMore.innerText = 'visa mindre';
  //     let upImg = document.createElement('i');
  //     upImg.className = "fas fa-angle-up fa-2x";
  //     more.children[1].parentElement.replaceChild(upImg, more.children[1]);
  //     userInfo.classList.add('transform');
  //     more.classList.add('move');
  //   } else {
  //     showMore.innerText = 'visa mer';
  //
  //     let downImg = document.createElement('i');
  //     downImg.className = "fas fa-angle-down fa-2x";
  //     more.children[1].parentElement.replaceChild(downImg, more.children[1]);
  //
  //     userInfo.classList.remove('transform');
  //     more.classList.remove('move');
  //   }
  //
  // }); // End of - User info text



  // To checkout meetups or remove them - hidden nav
  let smallMenu = document.getElementsByClassName('show-hidden-nav');
  let closeSmallMenu = document.getElementsByClassName('close-small-menu');
  let hiddenNav = document.getElementsByClassName('hidden-nav');
  let goToo = document.getElementsByClassName('go-too')[0];
  let removeMeetup = document.getElementsByClassName('remove-meetup')[0];
  console.log(smallMenu);
  // console.log(smallMenu[1].className);

  for (var i = 0; i < smallMenu.length; i++) {
    let hide = hiddenNav[i];
    smallMenu[i].addEventListener('click', function(event) {
      event.preventDefault();
      if (hide.className === 'hidden-nav') {
        hide.classList.add('show');
      } else {
        hide.classList.remove('show');
      }
    });
  }

  for (var i = 0; i < closeSmallMenu.length; i++) {
    let close = hiddenNav[i];
    closeSmallMenu[i].addEventListener('click', function(event) {
      event.preventDefault();
      if (close.className === 'hidden-nav show') {
        close.classList.remove('show');
      }
    });
  } // End of -To checkout meetups or remove them - hidden nav

//   let userEdit = document.getElementById('tellMeMore');
// console.log(userEdit);
//   userEdit.addEventListener('click', function(event) {
//     console.log(event.type);
//
//     if (document.getElementsByClassName('user-story').style.display === 'none') {
//       document.getElementsByClassName('user-story').style.display = 'block';
//     }  else {
//       document.getElementsByClassName('user-story').style.display = 'none';
//     }
//
//   });


}
