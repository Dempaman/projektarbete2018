window.addEventListener('load', profilFunction);

var dataList = [];
var createMeetupIdList = [];
var userStoryInfo;

function saveUserInfo(user) {
  // user info input tags
  let nameOnUser = document.getElementById('nameOnUser');
  let yourStory = document.getElementById('yourStory');
  let textarea = document.getElementsByTagName('textarea')[0];

  // Display user info tags
  let fullName = document.getElementById('user-name');
  let genderInfo = document.getElementById('genderInfo');
  let genderSelect = document.getElementById('genderSelect');
  let userDescription = document.getElementById('user-description');
  let userDefaultText = document.getElementsByClassName('userDefaultText')[0];

  // CARD COLORS
  let jonidCards = document.getElementsByClassName('join-single-meetup');
  let createdCards = document.getElementsByClassName('create-single-meetup');
  let profileColorCard = document.getElementsByClassName('user')[0];

  // radio
  let genders = document.getElementsByName('gender');
  let female = document.getElementById('kvinna');
  let man = document.getElementById('man');
  let other = document.getElementById('other');

  // color input tags
  let profileInputColor = document.getElementById('profileCard');
  let meetupInputColor = document.getElementById('joindColor');
  let createInputColor = document.getElementById('createMeetColor');
  //  console.log('inside fetchUserInfo function');


  let coloProfile = '#09035F';
  let joinMeetupColor = '#333333';
  let createMeetupColor = '#C05454';
  let toldStory = 'hej';
  let genderTrue = false;

  if (user.info) {
    if (user.info.gender) {
      genderInfo.style.display = 'block';
      genderSelect.innerText = user.info.gender;

      if (user.info.gender == 'kvinna') {

        female.setAttribute('checked', true);
      }
      if (user.info.gender == 'man') {

        man.setAttribute('checked', true);
      }
      if (user.info.gender == 'other') {

        other.setAttribute('checked', true);
      }
    } else {
      genderTrue = false;
      genderInfo.style.display = 'none';
    }

    // if (user.info.story) {
    //   console.log(user.info.story);
    // //  userDescription.style.display = 'none';
    //   toldStory = user.info.story;
    //   userDefaultText.style.display = 'none';
    // } else {
    //   //console.log(userInfo.info.story);
    // //yourStory.setAttribute("placeholder", 'vem är du?');
    // //  userDescription.style.display = 'none';
    // //  userDefaultText.style.display = 'none';
    //   //userDescription.innerText = '';
    //   //userDefaultText.style.display = 'block';
    // }
  }

  // Om du ändrar ditt namn
  if (nameOnUser.value !== '') {
    db.ref('/users/' + user.uniqueID + '/fullname').set(nameOnUser.value);
    //console.log('curent datalist ', dataList);
    createMeetupIdList;

    for (var z = 0; z < createMeetupIdList.length; z++) {
      db.ref('meetups/' + createMeetupIdList[z]).on('value', function(snapshot) {
        let creation = snapshot.val();
        dataList;

        for (var i = 0; i < dataList.length; i++) {
          let eventMeetupId = createMeetupIdList[z];
          let myMeetupId = dataList[i];
          for (let x in creation) {
            if (x === myMeetupId) {
              db.ref('/meetups/' + eventMeetupId + '/' + myMeetupId + '/creator/fullname').set(nameOnUser.value);
            }
          }
        }

      });
    }
  } else {
    db.ref('/users/' + user.uniqueID + '/fullname').set(user.fullname);
  }


  // color value change
  if (profileInputColor.value) {
    coloProfile = profileInputColor.value;
  }
  if (meetupInputColor.value) {
    joinMeetupColor = meetupInputColor.value;
  }
  if (createInputColor.value) {
    createMeetupColor = createInputColor.value;
  }
  // console.log(profileInputColor.value);
  // console.log(meetupInputColor.value);
  // console.log(createInputColor.value);


  if (female.checked) {
    //console.log(female.value);
    genderTrue = female.value;
    female.setAttribute('checked', true);
  }
  if (man.checked) {
    genderTrue = man.value;
    man.setAttribute('checked', true);
  }
  if (other.checked) {
    genderTrue = other.value;
    other.setAttribute('checked', true);
  }

  if (yourStory.value) {
    toldStory = yourStory.value;
  } else {
    toldStory = false;
    //userDescription.style.display = 'none';
  }

  // if (textarea.innerText) {
  //   toldStory = yourStory.value;
  // } else {
  //   toldStory = false;
  //   //userDescription.style.display = 'none';
  // }


  let info = {
    profilcolor: coloProfile,
    meetupcolor: joinMeetupColor,
    createcolor: createMeetupColor,
    story: toldStory,
    gender: genderTrue
  }


  db.ref('/users/' + user.uniqueID + '/info').set(info);

  //  fetchUserInfo(user.uniqueID);

}


// Hämtar och skriver ut informatuionen som du har om det finns någon
function fetchUserInfo(userId) {
  // Display user info tags
  let fullName = document.getElementById('user-name');
  let genderInfo = document.getElementById('genderInfo');
  let genderSelect = document.getElementById('genderSelect');
  let userDescription = document.getElementById('user-description');
  let userDefaultText = document.getElementsByClassName('userDefaultText')[0];

  // CARD COLORS
  let jonidCards = document.getElementsByClassName('join-single-meetup');
  let createdCards = document.getElementsByClassName('create-single-meetup');
  let profileColorCard = document.getElementsByClassName('user')[0];

  // user info input tags
  let nameOnUser = document.getElementById('nameOnUser');
  let yourStory = document.getElementsByTagName('textarea')[0];

  // radio
  let genders = document.getElementsByName('gender');
  let female = document.getElementById('kvinna');
  let man = document.getElementById('man');
  let other = document.getElementById('other');
  // color input tags
  let profileInputColor = document.getElementById('profileCard');
  let meetupInputColor = document.getElementById('joindColor');
  let createInputColor = document.getElementById('createMeetColor');
  //  console.log('inside fetchUserInfo function');


  db.ref('/users/' + userId).on('value', function(snapshot) {
    let userInfo = snapshot.val();
  //  console.log(userInfo);


    nameOnUser.setAttribute("value", userInfo.fullname);
    fullName.innerText = userInfo.fullname;
    if (userInfo.info) {

      if (userInfo.info.story) {
      //  console.log(userInfo.info.story);
        yourStory.innerText = userInfo.info.story;
        userDescription.style.display = 'block';
        userDescription.innerText = userInfo.info.story;
        userDefaultText.style.display = 'none';
      } else {
      //  console.log(userInfo.info.story);
        yourStory.setAttribute("placeholder", 'vem är du?');
        userDescription.style.display = 'none';
       userDescription.innerText = '';
        userDefaultText.style.display = 'block';
    }
    // console.log(userInfo.info.gender);
      if (userInfo.info.gender) {
        genderInfo.style.display = 'block';
        genderSelect.innerText = userInfo.info.gender;

        if (userInfo.info.gender == 'kvinna') {

          female.setAttribute('checked', true);
        }
        if (userInfo.info.gender == 'man') {

          man.setAttribute('checked', true);
        }
        if (userInfo.info.gender == 'other') {

          other.setAttribute('checked', true);
        }
      } else {
        genderInfo.style.display = 'none';
      }

      // profileInputColor.value = userInfo.info.profilcolor;
      // meetupInputColor.value = userInfo.info.meetupcolor;
      // createInputColor.value = userInfo.info.createcolor;

      if (jonidCards) {
        for (var i = 0; i < jonidCards.length; i++) {
          jonidCards[i].firstElementChild.style.backgroundColor = userInfo.info.meetupcolor;
        }
      }
      if (createdCards) {
        for (var i = 0; i < createdCards.length; i++) {
          createdCards[i].firstElementChild.style.backgroundColor = userInfo.info.createcolor;
        }
      }
      profileColorCard.firstElementChild.style.backgroundColor = userInfo.info.profilcolor;

    } else {
      userDescription.style.display = 'none';
      genderInfo.style.display = 'none';
    }

  });

}

//
// function ellisisTrue(event) {
//
//   let labelClick = event.target;
//   let textFakeWidth = event.target.offsetWidth;
//   let textRealWidth = event.target.parentElement.lastElementChild.offsetWidth;
//   let tooltip = event.target.parentElement.children[2];
//
//
//   if (textFakeWidth < textRealWidth) {
//     //console.log('textFakeWidth is smaller');
//
//     labelClick.addEventListener('click', function(event) {
//
//       if (tooltip.className === 'hide-small') {
//         tooltip.classList.add('show');
//         //console.log('added show classname = ', tooltip.className);
//         //console.log(event.target);
//       } else {
//         tooltip.classList.remove('show');
//         //console.log('removed show classname = ', tooltip.className);
//       }
//     });
//
//     tooltip.addEventListener('click', function(event) {
//
//       if (tooltip.className === 'hide-small') {
//         tooltip.classList.add('show');
//         //console.log(event.target.className);
//       } else {
//         tooltip.classList.remove('show');
//         // console.log(event.target.className);
//       }
//     });
//   } else {
//     tooltip.style.display = "none";
//     //console.log('textFakeWidth is NOT smaller');
//   }
// }


// TOLTIP hover funktion
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
    // console.log(mainText[i],' textFakeWidth ', textFakeWidth);
    // console.log(mainText[i], ' textRealWidth ', textRealWidth);

    if (textFakeWidth < textRealWidth) {
      //console.log('textFakeWidth is smaller');
      labelClick.addEventListener('click', function(event) {

        if (tooltip.className === hide) {
          tooltip.classList.add('show');
          // console.log('added show classname = ', tooltip.className);
          // console.log(event.target);
        } else {
          tooltip.classList.remove('show');
        //  console.log('removed show classname = ', tooltip.className);
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

    db.ref('/users/').once('value', function(snapshot) {
      let allUsers = snapshot.val();

      for (let x in allUsers) {
        //  console.log(allUsers[x].sid);
        if (allUsers[x].sid === pageUserId) {

          //console.log(allUsers[x]);

          userName.innerText = allUsers[x].fullname;
          userImg.src = allUsers[x].avatarURL;
          uniqueID = allUsers[x].uniqueID;
          fetchUserInfo(uniqueID);
          document.getElementsByClassName('userDefaultText')[0].style.display = 'none';
          document.getElementById('tellMeMore').disabled = true;
          document.getElementById('tellMeMore').style.display = 'none';




          // if (allUsers[x].info.story) {
          //   console.log('You have a story, good for you');
          // }else {
          //   document.getElementsByClassName('user-presentation-container')[0].style.marginBottom = '5rem';
          // }

          // console.log(createdContainer.firstElementChild);
          // createdContainer.firstElementChild.style.display = 'none';

          userCreated = allUsers[x].createdMeetups;
          meetups = allUsers[x].meetups;
          //  console.log(meetups);

          if (userCreated) {
            createdContainer.firstElementChild.style.display = 'block';
            let counter = 0;
            let otherEventId;
            let otherMeetUpId;
            dataList = [];
            for (let obj in userCreated) {
              counter += Object.keys(userCreated[obj]).length;

              otherEventId = obj;
              otherMeetUpId = userCreated[obj];


              for (let z in otherMeetUpId) {
                dataList.push(z);
            //    console.log('dataList later ', dataList);

                db.ref('meetups/' + otherEventId).once('value', function(snapshot) {
                  let snap = snapshot.val();
                  // console.log(z);
                  let date;

                  if (z) {
                    date = snap[z].eventDate.split('kl')[0] + 'kl ';
                    let div = document.createElement('div');
                    div.id = 'meetup-' + snap[z].key;
                    div.className = "create-single-meetup";
                    div.innerHTML = `<div class="event-backgound">
                        <div class="meetup-holder">
                          <p class="meetup-min">Meetup</p>
                            <p class="meetup-name">${snap[z].name}</p>
                            <p class="hide"><span>${snap[z].name}</span><br> <br>
                                ~ Av <span> ${snap[z].creator.fullname} </span>
                             </p>
                             <p class="main-allways-hidden">${snap[z].creator.fullname}</p>
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
                            <p class="main-text">${snap[z].eventName}</p>
                            <p class="hide-small">${snap[z].eventName}</p>
                            <p class="main-allways-hidden">${snap[z].eventName}</p>
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

          // CARD COLORS
          let createdCards = document.getElementsByClassName('create-single-meetup');
          let profileColorCard = document.getElementsByClassName('user')[0];

          if (allUsers[x].info) {

            if (createdCards) {
              for (var i = 0; i < createdCards.length; i++) {
              //  console.log('color ', allUsers[x].info.createcolor);
                createdCards[i].firstElementChild.style.backgroundColor = allUsers[x].info.createcolor;
              }
            }
            profileColorCard.firstElementChild.style.backgroundColor = allUsers[x].info.profilcolor;
          }
        } else {
          //  console.log('not user or no user with this id could be found');
        }
      }
    });
  } else if (userLog) {

    fetchUserInfo(userLog.uniqueID);
    // Form display button
    let userEdit = document.getElementById('tellMeMore');
    userEdit.style.display = 'block';
    let userDefaultText = document.getElementsByClassName('userDefaultText')[0];
    let userStory = document.getElementsByClassName('user-story')[0];
    let userDescription = document.getElementById('user-description');
    let saveBtn = document.getElementById('save');

    userEdit.addEventListener('click', function(event) {
      //  fetchUserInfo(userLog.uniqueID);

      if (userStory.className === 'user-story') {
        userStory.classList.add('show');
        userDescription.style.display = 'none';
        userDefaultText.style.display = 'none';
        userEdit.classList.add('abort');
        userEdit.innerText = 'Avbryt';
        saveBtn.style.display = 'block';
      } else {
        userDefaultText.style.display = 'none';
        userStory.classList.remove('show');
        userDescription.style.display = 'block';
        userEdit.classList.remove('abort');
        userEdit.innerText = 'Berätta om dig själv';
        saveBtn.style.display = 'none';
      }
    });

    saveBtn.addEventListener('click', function(event) {
      saveUserInfo(userLog);
      fetchUserInfo(userLog.uniqueID);

      if (userStory.className === 'user-story') {
        userDefaultText.style.display = 'none';
        userStory.classList.add('show');
        userDescription.style.display = 'block';
        userEdit.classList.add('abort');
        userEdit.innerText = 'Avbryt';
        saveBtn.style.display = 'block';
      } else {
        userStory.classList.remove('show');
        userDescription.style.display = 'block';
        userDefaultText.style.display = 'none';
        userStory.classList.remove('show');
        userEdit.classList.remove('abort');
        userEdit.innerText = 'Ändra din information';
        saveBtn.style.display = 'none';
      }

    });

    // Form information
    userName.innerText = userLog.fullname;
    userImg.src = userLog.avatarURL;
    uniqueID = userLog.uniqueID;

    // Hämta alla skapade Meetups
    db.ref('users/' + uniqueID + '/createdMeetups').once('value', function(snapshot) {
      let eventObjects = snapshot.val();

      createMeetupIdList = [];

      if (eventObjects) {
        createdContainer.firstElementChild.style.display = 'block';
        let counter = 0;
        let eventId;
        let meetupId;
        dataList = [];

        for (let obj in eventObjects) {
          counter += Object.keys(eventObjects[obj]).length;

          eventId = obj;
          meetupId = eventObjects[obj];
          createMeetupIdList.push(obj);

          for (let x in meetupId) {
            dataList.push(x);

            db.ref('meetups/' + eventId).once('value', function(snapshot) {
              let snap = snapshot.val();
              let date;
              //let textRealWidth = mainText[i].parentElement.lastElementChild.offsetWidth;
              if (x) {
                date = snap[x].eventDate.split('kl')[0] + 'kl ';
                let div = document.createElement('div');
                div.id = 'meetup-' + x;
                div.className = "create-single-meetup";
                div.innerHTML = `<div class="event-backgound">
                    <div class="meetup-holder">
                      <p class="meetup-min">Meetup</p>

                        <p class="meetup-name">${snap[x].name}</p>
                        <p class="hide"><span>${snap[x].name}</span><br> <br>
                            ~ Av <span> ${snap[x].creator.fullname} </span>
                         </p>
                         <p class="meetup-creator">~ Av ${snap[x].creator.fullname}</p>
                         <p class="main-allways-hidden"> ${snap[x].name}</p>
                    </div>
                  </div>
                  <div class="text-holder">
                    <div class="img-holder">
                      <img id="meetup-img" src="${snap[x].creator.avatarURL}">
                    </div>
                    <div class="user-meetup-text">
                      <div class="event-holder">
                        <p class="min-text">Event</p>
                        <p class="main-text">${snap[x].eventName}</p>
                        <p class="hide-small">${snap[x].eventName}</p>
                        <p class="main-allways-hidden">${snap[x].eventName}</p>
                      </div>
                      <div class="time-holder">
                        <p class="min-text">Tid</p>
                        <p class="small-main-text ">${date +snap[x].time}</p>
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
    db.ref('users/' + uniqueID + '/meetups').once('value', function(snapshot) {
      // child_added
      let meetupsJoind = snapshot.val();

      if (meetupsJoind) {
        joindContainer.firstElementChild.style.display = 'block';
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

            db.ref('meetups/' + joindEventId).once('value', function(snapshot) {
              let snap = snapshot.val();
              let date;

              //  joindContainer.innerText = '';

              if (x) {
                date = snap[x].eventDate.split('kl')[0] + 'kl ';
                //  console.log('joind snap ',snap[x]);
                let div = document.createElement('div');
                div.id = 'meetup-' + snap[x].key;
                div.className = "join-single-meetup";
                div.innerHTML = `<div class="event-backgound-joind">
                <div class="meetup-holder">
                  <p class="meetup-min">Meetup</p>

                    <p class="meetup-name">${snap[x].name}</p>
                    <p class="hide"><span>${snap[x].name}</span><br> <br>
                        ~ Av <span>${snap[x].creator.fullname} </span>
                     </p>
                      <p class="meetup-creator">~ Av ${snap[x].creator.fullname}</p>
                      <p class="main-allways-hidden">${snap[x].name}</p>
                </div>
              </div>
              <div class="text-holder">
                <div class="img-holder">
                  <img id="meetup-img" src="${snap[x].creator.avatarURL}">
                </div>
                <div class="user-meetup-text">
                  <div class="event-holder">
                    <p class="min-text">Event</p>
                    <p class="main-text">${snap[x].eventName}</p>
                    <p class="hide-small">${snap[x].eventName}</p>
                    <p class="main-allways-hidden">${snap[x].eventName}</p>
                  </div>
                  <div class="time-holder">
                    <p class="min-text">Tid</p>
                    <p class="small-main-text ">${date + snap[x].time}</p>
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

    window.location.assign('index.html'); // kan komma att ändras i framtiden
  }
}

function profilFunction(event) {


  // console.log('datalist beging ',dataList);
  ifUserIsTrue();

  // db.ref('meetups/').on('child_added', function(snapshot) {
  //   let added = snapshot.val();
  //   console.log(added);
  // });
  db.ref('meetups/').on('child_changed', function(snapshot) {
    let changed = snapshot.val();

    //    let createdDomObjects = document.getElementsByClassName('created-meetups-container')[0].children;

    // for (var i = 0; i < createdDomObjects.length; i++) {
    //   array[i]
    // }

    for (var i = 0; i < dataList.length; i++) {

      for (let x in changed) {
        if (x === dataList[i]) {
          date = changed[x].eventDate.split('kl')[0] + 'kl ';
          //console.log(date);
          let update = document.getElementById('meetup-' + x);
          let meetupHolder = update.firstElementChild.firstElementChild.children;
          let adressHolder = update.children[1].lastElementChild.lastElementChild.children;
          let time = update.children[1].children[1].children[1].children[1];
          //console.log('time ', time);

          let meetupName = meetupHolder[1];
          let meetupNameHidden = meetupHolder[2].firstElementChild;
          let creatorNameInHide = meetupHolder[2].lastElementChild;
          let creatorName = meetupHolder[3];
          let creatorNameHidden = meetupHolder[4];
        //  console.log(changed[x]);
          meetupName.innerText = changed[x].name;
          meetupNameHidden.innerText = changed[x].name;
          creatorNameInHide.innerText = changed[x].creator.fullname;
          creatorName.innerText = '~ Av ' + changed[x].creator.fullname;
          creatorNameHidden.innerText = changed[x].creator.fullname;

          time.innerText = date + changed[x].time;

          let adressName = adressHolder[1];
          let adressHide = adressHolder[2];
          let adressAleaysHiden = adressHolder[3];

          adressName.innerText = changed[x].address;
          adressHide.innerText = changed[x].address;
          adressAleaysHiden.innerText = changed[x].address;



          //
          // console.log('meetupName ', meetupName);
          // console.log('meetupNameHidden ', meetupNameHidden);
          // console.log('creatorNameInHide ', creatorNameInHide);
          // console.log('creatorName ', creatorName);
          // console.log('creatorNameHidden ', creatorNameHidden);
        }

      }
    }
    //onsole.log('dataList in child changed ', dataList);
    //console.log(changed);

  });

  //  let meetupWrapper = document.getElementById('meetup-' + meetupKey);

  // SAVE BUTTON VIKTIG
  // let saveFormBtn = document.getElementById('save');
  // saveFormBtn.addEventListener('click', function() {
  //   console.log(event.type);
  //   for (var i = 0; i < genders.length; i++) {
  //     if (genders[i].checked)
  //       genderTrue = genders[i].value;
  //   }
  //   coloProfile = profileInputColor.value;
  //   joinMeetupColor = meetupInputColor.value;
  //   createMeetupColor = createInputColor.value;
  //
  //   if (yourStory.value !== '') {
  //     toldStory = yourStory.value;
  //   } else {
  //     toldStory = 'Hej och välkommeen till din Profilsida! Vi skulle gärna veta mer om dig så...'
  //   }
  //
  //   if (nameOnUser.value !== '') {
  //     db.ref('/users/' + user.uniqueID + '/fullname').set(nameOnUser.value);
  //   } else {
  //     nameOnUser.value = user.fullname;
  //     db.ref('/users/' + user.uniqueID + '/fullname').set(nameOnUser.value);
  //   }
  //
  //     db.ref('/users/' + user.uniqueID + '/info').set(info);
  //
  // });









}
