window.addEventListener('load', profilFunction);

//eventpage.html?eventid=501710&meetup=-z1458127xasd
//VIKTIG


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



// if (profilId) {
//   console.log('You have clicked on a profil');
//   if (userLog === profilId) {
//     profileName = userLog.fullname;
//     profileImg = userLog.avatarURL;
//     uniqueID = userLog.uniqueID;
//     console.log('This is your profil');
//   } else {
//     profileName = profilId.fullname;
//     profileImg = profilId.avatarURL;
//     uniqueID = profilId.uniqueID;
//     console.log('this is ' + profilId.fullname + 'profile');
//   }

function fetchUserInfo(user) {
  let nameOnUser = document.getElementById('nameOnUser');
  let yourStory = document.getElementById('yourStory');
  let genders = document.getElementsByName('gender');
  let female = document.getElementById('kvinna');
  let man = document.getElementById('man');
  let other = document.getElementById('other');

  nameOnUser.setAttribute("placeholder", user.fullname);

  if (user.info) {
    let userInfo = user.info;

    if (userInfo.story) {
      nameOnUser.setAttribute("placeholder", userInfo.story);
    } else {
      nameOnUser.setAttribute("placeholder", 'Vem är du?');
    }
    if (userInfo.gender) {
      nameOnUser.setAttribute("placeholder", 'Vem är du?');
      if (userInfo.gender === "kvinna") {
        female.checked = true;

        // var genders = document.getElementsByName("gender");
        // var selectedGender;
        //
        // for (var i = 0; i < genders.length; i++) {
        //   if (genders[i].checked)
        //     selectedGender = genders[i].value;
      } else if (userInfo.gender === "man") {
        man.checked = true;
      } else if (userInfo.gender === "other") {
        other.checked = true;
      }
    }

  }


}


function profilePage() {
  // console.log(window.location.href);
  // console.log(window.location.pathname);
  // console.log('test ' + window.location.search);

}

function ellisisTrue(event) {

  let labelClick = event.target;
  let textFakeWidth = event.target.offsetWidth;
  let textRealWidth = event.target.parentElement.lastElementChild.offsetWidth;
  let tooltip = event.target.parentElement.children[2];


  if (textFakeWidth < textRealWidth) {
    //console.log('textFakeWidth is smaller');

    labelClick.addEventListener('click', function(event) {

      if (tooltip.className === 'hide-small') {
        tooltip.classList.add('show');
        //console.log('added show classname = ', tooltip.className);
        //console.log(event.target);
      } else {
        tooltip.classList.remove('show');
        //console.log('removed show classname = ', tooltip.className);
      }
    });

    tooltip.addEventListener('click', function(event) {

      if (tooltip.className === 'hide-small') {
        tooltip.classList.add('show');
        //console.log(event.target.className);
      } else {
        tooltip.classList.remove('show');
        // console.log(event.target.className);
      }
    });
  } else {
    tooltip.style.display = "none";
    //console.log('textFakeWidth is NOT smaller');
  }
}

function ellipsisEvents(mainText, hide) {
  // console.log(mainText);
  // console.log('inside ellipsisEvents function' );

  // console.log('length ', mainText.length);
  // console.log('maintext is now ', mainText);
  for (let i = 0; i < mainText.length; i++) {

    let labelClick = mainText[i];
    let textFakeWidth = mainText[i].offsetWidth;
    let textRealWidth = mainText[i].parentElement.lastElementChild.offsetWidth;
    let tooltip = mainText[i].parentElement.children[2];
    // console.log('textFakeWidth ', textFakeWidth);
    // console.log('textRealWidth ', textRealWidth);

    if (textFakeWidth < textRealWidth) {
      //console.log('textFakeWidth is smaller');

      labelClick.addEventListener('click', function(event) {

        if (tooltip.className === hide) {
          tooltip.classList.add('show');
          //  console.log('added show classname = ', tooltip.className);
          //console.log(event.target);
        } else {
          tooltip.classList.remove('show');
          // console.log('removed show classname = ', tooltip.className);
        }
      });

      tooltip.addEventListener('click', function(event) {

        if (tooltip.className === hide) {
          tooltip.classList.add('show');
          //console.log(event.target.className);
        } else {
          tooltip.classList.remove('show');
          // console.log(event.target.className);
        }
      });
    } else {
      tooltip.style.display = "none";
      //console.log('textFakeWidth is NOT smaller');
    }
  }
}

function ifUserIsTrue() {
  // Hämta alla element som behöver informationen
  let userName = document.getElementById('user-name');
  let userImg = document.getElementById('user-img');
  let meetupCount = document.getElementById('user-joind-meetups');
  let createdCount = document.getElementById('user-created-meetups');
  let createdContainer = document.getElementsByClassName('created-meetups-container')[0];
  let joindContainer = document.getElementsByClassName('joind-meetups-container')[0];

  // variable för att spara och föra vidare data
  let data;
  let profileName;
  let profileImg;
  let uniqueID;

  let meetups;
  let userCreated;

  // Är användaren inloggad
  const userLog = JSON.parse(localStorage.getItem('loggedInUser'));

  // användarens user ID querystring
  const pageUserId = window.location.href.split('?user=')[1];
  //console.log(pageUserId);
  //console.log(pageUserId);

  if (pageUserId && userLog) {

    joindContainer.style.display = "none";

    db.ref('/users/').on('value', function(snapshot) {
      let allUsers = snapshot.val();

      for (let x in allUsers) {
        //  console.log(allUsers[x].sid);
        if (allUsers[x].sid === pageUserId) {

          //console.log(allUsers[x]);

          userName.innerText = allUsers[x].fullname;
          userImg.src = allUsers[x].avatarURL;
          uniqueID = allUsers[x].uniqueID;

          userCreated = allUsers[x].createdMeetups;
          meetups = allUsers[x].meetups;
          //  console.log(meetups);

          if (userCreated) {
            let counter = 0;
            let otherEventId;
            let otherMeetUpId;
            for (let obj in userCreated) {
              counter += Object.keys(userCreated[obj]).length;

              otherEventId = obj;
              otherMeetUpId = userCreated[obj];

              for (let z in otherMeetUpId) {

                db.ref('meetups/' + otherEventId).on('value', function(snapshot) {
                  let snap = snapshot.val();
                  // console.log(z);
                  // console.log(snap[z]);
                  if (z) {
                    let div = document.createElement('div');
                    div.className = "single-meetup";
                    div.innerHTML = `<div class="event-backgound">
                        <div class="meetup-holder">
                          <p class="meetup-min">Meetup</p>

                            <p class="meetup-name">${snap[z].name}</p>
                            <p class="hide">${snap[z].name}<br> <br>
                                ~ Av ${snap[z].creator.fullname}
                             </p>
                             <p class="main-allways-hidden">eventnamn</p>
                          <p class="meetup-creator">~ Av ${snap[z].creator.fullname}</p>
                        </div>
                      </div>
                      <div class="text-holder">
                        <div class="img-holder">
                          <img id="meetup-img" src="${snap[z].creator.avatarURL}">
                        </div>
                        <div class="user-meetup-text">
                          <div class="event-holder">
                            <p class="min-text">Event</p>
                            <p class="main-text">eventnamn</p>
                            <p class="hide-small">eventnamn</p>
                            <p class="main-allways-hidden">eventnamn</p>
                          </div>
                          <div class="time-holder">
                            <p class="min-text">Tid</p>
                            <p class="small-main-text ">${snap[z].time}</p>
                          </div>
                          <div class="adress-holder">
                            <p class="min-text">Adress</p>
                            <p class="main-text">${snap[z].address}</p>
                            <p class="hide-small">${snap[z].address}</p>
                            <p class="main-allways-hidden">${snap[z].address}</p>
                          </div>
                        </div>
                      </div>
                      <div class="change-status">
                        <a href="eventpage.html?eventid=${snap[z].eventID}&meetup=${z}">Gå till Meetup > </a>
                      </div>`;

                    createdContainer.appendChild(div);

                    // div.getElementsByClassName('main-text')[0].addEventListener('click', ellisisTrue);
                    // div.getElementsByClassName('main-text')[1].addEventListener('click', ellisisTrue);
                    let mainText = div.getElementsByClassName('main-text');
                    let meetupName = div.getElementsByClassName('meetup-name');
                    ellipsisEvents(mainText, "hide-small");
                    ellipsisEvents(meetupName, "hide");

                  }
                });
              }

              // console.log('other user obj ', obj);
              // console.log('other user userCreated[obj] ', userCreated[obj]);

            }
            createdCount.innerText = counter;
          }

          if (meetups) {
            let secondCounter = 0;
            for (let obj in meetups) {
              secondCounter += Object.keys(meetups[obj]).length;
              // Inga Joinade meetups ska visas upp om det någon annan än den egna användaren
            }
            meetupCount.innerText = secondCounter;
          }
        } else {
          //  console.log('not user or no user with this id could be found');
        }
      }
    });
  } else if (userLog) {

    fetchUserInfo(userLog);

    // Form information
    userName.innerText = userLog.fullname;
    userImg.src = userLog.avatarURL;
    uniqueID = userLog.uniqueID;

    // Hämta alla skapade Meetups
    db.ref('users/' + uniqueID + '/createdMeetups').on('value', function(snapshot) {
      let eventObjects = snapshot.val();

      if (eventObjects) {
        let counter = 0;
        let eventId;
        let meetupId;
        for (let obj in eventObjects) {
          counter += Object.keys(eventObjects[obj]).length;

          eventId = obj;
          meetupId = eventObjects[obj];

          for (let x in meetupId) {

            db.ref('meetups/' + eventId).on('value', function(snapshot) {
              let snap = snapshot.val();

              if (x) {
                let div = document.createElement('div');
                div.className = "single-meetup";
                div.innerHTML = `<div class="event-backgound">
                    <div class="meetup-holder">
                      <p class="meetup-min">Meetup</p>

                        <p class="meetup-name">${snap[x].name}</p>
                        <p class="hide">${snap[x].name}<br> <br>
                            ~ Av ${snap[x].creator.fullname}
                         </p>
                         <p class="main-allways-hidden">eventnamn</p>
                      <p class="meetup-creator">~ Av ${snap[x].creator.fullname}</p>
                    </div>
                  </div>
                  <div class="text-holder">
                    <div class="img-holder">
                      <img id="meetup-img" src="${snap[x].creator.avatarURL}">
                    </div>
                    <div class="user-meetup-text">
                      <div class="event-holder">
                        <p class="min-text">Event</p>
                        <p class="main-text">eventnamn</p>
                        <p class="hide-small">eventnamn</p>
                        <p class="main-allways-hidden">eventnamn</p>
                      </div>
                      <div class="time-holder">
                        <p class="min-text">Tid</p>
                        <p class="small-main-text ">${snap[x].time}</p>
                      </div>
                      <div class="adress-holder">
                        <p class="min-text">Adress</p>
                        <p class="main-text">${snap[x].address}</p>
                        <p class="hide-small">${snap[x].address}</p>
                        <p class="main-allways-hidden">${snap[x].address}</p>
                      </div>
                    </div>
                  </div>
                  <div class="change-status">
                    <a href="eventpage.html?eventid=${snap[x].eventID}&meetup=${x}">Gå till Meetup > </a>
                  </div>`;

                createdContainer.appendChild(div);

                let mainText = div.getElementsByClassName('main-text');
                let meetupName = div.getElementsByClassName('meetup-name');
                ellipsisEvents(mainText, "hide-small");
                ellipsisEvents(meetupName, "hide");
              }
            });
          } // THE END OF THE ADDED CREATED MEETUPCARD
        }
        createdCount.innerText = counter;
      }
    }); // THE END OF Hämta alla skapade Meetups :)

    // Hämta alla joind CREATED MEETUPCARD
    db.ref('users/' + uniqueID + '/meetups').on('value', function(snapshot) {
      // child_added
      let meetupsJoind = snapshot.val();

      if (meetupsJoind) {
        let joindCounter = 0;
        let joindEventId;
        let joindMeetupId;
        for (let obj in meetupsJoind) {
          joindCounter += Object.keys(meetupsJoind[obj]).length;

          joindEventId = obj;
          joindMeetupId = meetupsJoind[obj];
          // console.log('joind obj ', joindEventId);
          // console.log('joind meetup ', joindMeetupId);

          for (let x in joindMeetupId) {

            db.ref('meetups/' + joindEventId).on('value', function(snapshot) {
              let snap = snapshot.val();

              if (x) {

                //  console.log('joind snap ',snap[x]);
                let div = document.createElement('div');
                div.className = "single-meetup";
                div.innerHTML = `<div class="event-backgound-joind">
                <div class="meetup-holder">
                  <p class="meetup-min">Meetup</p>

                    <p class="meetup-name">${snap[x].name}</p>
                    <p class="hide">${snap[x].name}<br> <br>
                        ~ Av ${snap[x].creator.fullname}
                     </p>
                     <p class="main-allways-hidden">eventnamn</p>
                  <p class="meetup-creator">~ Av ${snap[x].creator.fullname}</p>
                </div>
              </div>
              <div class="text-holder">
                <div class="img-holder">
                  <img id="meetup-img" src="${snap[x].creator.avatarURL}">
                </div>
                <div class="user-meetup-text">
                  <div class="event-holder">
                    <p class="min-text">Event</p>
                    <p class="main-text">eventnamn</p>
                    <p class="hide-small">eventnamn</p>
                    <p class="main-allways-hidden">eventnamn</p>
                  </div>
                  <div class="time-holder">
                    <p class="min-text">Tid</p>
                    <p class="small-main-text ">${snap[x].time}</p>
                  </div>
                  <div class="adress-holder">
                    <p class="min-text">Adress</p>
                    <p class="main-text">${snap[x].address}</p>
                    <p class="hide-small">${snap[x].address}</p>
                    <p class="main-allways-hidden">${snap[x].address}</p>
                  </div>
                </div>
              </div>
              <div class="change-status">
                <a href="eventpage.html?eventid=${snap[x].eventID}&meetup=${x}">Gå till Meetup > </a>
              </div>`;

                joindContainer.appendChild(div);

                let mainText = div.getElementsByClassName('main-text');
                let meetupName = div.getElementsByClassName('meetup-name');
                ellipsisEvents(mainText, "hide-small");
                ellipsisEvents(meetupName, "hide");
              }
            });
          } // THE END OF THE joind CREATED MEETUPCARD
        }
        meetupCount.innerText = joindCounter;
      }
    });

  } else {
    //  console.log('Sorry! No Web Storage support');
    //let indexPage = '/index.html';
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
  // let showMore = document.getElementsByClassName('show-more')[0];
  // let userInfo = document.getElementsByClassName('white-cover')[0];

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
  // let smallMenu = document.getElementsByClassName('show-hidden-nav');
  // let closeSmallMenu = document.getElementsByClassName('close-small-menu');
  // let hiddenNav = document.getElementsByClassName('hidden-nav');
  // let goToo = document.getElementsByClassName('go-too')[0];
  // let removeMeetup = document.getElementsByClassName('remove-meetup')[0];
  // console.log(smallMenu);
  // // console.log(smallMenu[1].className);
  //
  // for (var i = 0; i < smallMenu.length; i++) {
  //   let hide = hiddenNav[i];
  //   smallMenu[i].addEventListener('click', function(event) {
  //     event.preventDefault();
  //     if (hide.className === 'hidden-nav') {
  //       hide.classList.add('show');
  //     } else {
  //       hide.classList.remove('show');
  //     }
  //   });
  // }
  //
  // for (var i = 0; i < closeSmallMenu.length; i++) {
  //   let close = hiddenNav[i];
  //   closeSmallMenu[i].addEventListener('click', function(event) {
  //     event.preventDefault();
  //     if (close.className === 'hidden-nav show') {
  //       close.classList.remove('show');
  //     }
  //   });
  // } // End of -To checkout meetups or remove them - hidden nav

  let userEdit = document.getElementById('tellMeMore');
  let userStory = document.getElementsByClassName('user-story')[0];
  let userDescription = document.getElementById('user-description');
  let closeTellMeMore = document.getElementById('closeTellMeMore');
  //console.log('userEdit ' + userEdit);
  userEdit.addEventListener('click', function(event) {
    console.log(event.type);
    console.log(userStory.className);

    if (userStory.className === 'user-story') {
      userStory.classList.add('show');
      userDescription.style.display = 'none';
      userEdit.innerText = 'Spara';
      closeTellMeMore.style.display ='block';
    } else {
      userStory.classList.remove('show');
      userDescription.style.display = 'block';
      userEdit.innerText = 'Berätta om dig själv';
      closeTellMeMore.style.display ='none';
    }

  });

}
