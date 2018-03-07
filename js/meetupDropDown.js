function toggleMeetupDropDown(event, meetupKey, eventID){
  let dropDownWrapper = document.getElementById('drop'+meetupKey);
  let target = event.target;

  function printCloseIfNotCenter(event){
    let t = event.target;
    if(t.className != 'dropDownWrapper'){
        if(!t.className.includes('doNotCloseThis')){
          toggleWrapper();
          window.removeEventListener('click', printCloseIfNotCenter);
          console.log('Closeeed with closeIfNotCenter');
        }
    }
  }

  if(dropDownWrapper){
    toggleWrapper(dropDownWrapper, event.target);
  } else {
    /* Byt texten på knappen */

    if(target.className.includes('purple')){
      target.innerText = 'Stäng';
    } else {
      console.log('Small btn pressed for the first time :3');
    }

    /* Skapa själva dropdownmenyn */
    dropDownWrapper = document.createElement('div');
    dropDownWrapper.setAttribute('id', 'drop'+meetupKey);
    dropDownWrapper.className = 'dropDownWrapper';

    /* Skapa UL */
    let dropDownList = document.createElement('ul');

    /* Skapa "Redigera" */
    let dropDownEdit = document.createElement('li');
    dropDownEdit.innerHTML = '<i class="mdi mdi-pencil"></i> Redigera';
    dropDownList.appendChild(dropDownEdit);

    /* EventListener för "Redigera" */

    /* Skapa "Notiser" */
    let dropDownNotice = document.createElement('li');
    dropDownNotice.className = 'doNotCloseThis';
    dropDownNotice.innerHTML = '<i class="mdi mdi-bell"></i> Notifikationer';
    dropDownList.appendChild(dropDownNotice);

    /* EventListener för "Notiser" */
    dropDownNotice.addEventListener('click', toggleNotifications);

    /* Skapa "Radera" */
    let dropDownRemove = document.createElement('li');
    dropDownRemove.innerHTML = '<i class="mdi mdi-delete"></i> Radera';
    dropDownList.appendChild(dropDownRemove);

    /* EventListener för "Radera" */
    dropDownRemove.addEventListener('click', dropDownRemoveMeetup);

    /* Lägg in listan i wrappern (Själva menyn) */
    dropDownWrapper.appendChild(dropDownList);

    setTimeout(function(){
      window.addEventListener('click', printCloseIfNotCenter);
    },200);
    /* Lägg till om man klickar utanför menyn så stängs den. */

    /* Lägg ut den i dom:en */
    event.target.parentNode.insertBefore(dropDownWrapper, event.target);
  }

  function toggleWrapper(){
    if(dropDownWrapper.className.includes('hidden')){
      if(target.className.includes('purple')){
        target.innerText = 'Stäng';
      }


        setTimeout(function(){
          window.addEventListener('click', printCloseIfNotCenter);
        },200);


      dropDownWrapper.className = dropDownWrapper.className.replace(' hidden', '');
    } else {
        if(target.className.includes('purple')){
          target.innerText = 'Redigera Meetup';
        }
        dropDownWrapper.className += ' hidden';
    }
  }

  /* Remove Meetup function */
  function dropDownRemoveMeetup(event){
    //toggleWrapper();
    confirmRemoveMeetup(eventID, meetupKey);
  }
}

function confirmRemoveMeetup(eventID, meetupKey){
  let confirmWrapper = document.createElement('div');
  confirmWrapper.className = 'confirmModal centered';

  /* Skapa divar */
  let divOne = document.createElement('div');
  let divTwo = document.createElement('div');

  /* Skapa fråga */
  let question = document.createElement('p');
  question.innerHTML = '<i class="mdi mdi-alert-circle-outline mdi-36px"></i> Du håller på att radera detta meetup, är du säker?';
  /* Skapa knappar */
  let yesBtn = document.createElement('button');
  yesBtn.innerHTML = 'Radera';
  let noBtn = document.createElement('button');
  noBtn.innerHTML = 'Stäng';

  /* Add Listeners */
  yesBtn.addEventListener('click', function(){
    db.ref('meetups/' + eventID + '/' + meetupKey).remove();
    printMessage('success', 'Meetupet har raderats.', 7000, 1500);
    fadeOutObject(confirmWrapper);
  });

  noBtn.addEventListener('click', function(){
    fadeOutObject(confirmWrapper);
  });

  /* Append Question */
  divOne.appendChild(question);

  /* Append buttons */
  divTwo.appendChild(yesBtn);
  divTwo.appendChild(noBtn);

  /* Append divs */
  confirmWrapper.appendChild(divOne);
  confirmWrapper.appendChild(divTwo);

  document.getElementsByTagName('body')[0].appendChild(confirmWrapper);
}

function toggleNotifications(event){
  /* Start by toggle in the DOM (To make it look cool :PppPPpPpPp) */
  if(event.target.innerHTML.includes('bell-off')){
    event.target.innerHTML = '<i class="mdi mdi-bell"></i> Notifikationer';
  } else {
    event.target.innerHTML = '<i class="mdi mdi-bell-off"></i> Notifikationer';
  }


}


function fadeOutObject(htmlObj){
  htmlObj.className += ' fadeout';
  setTimeout(function(){
    htmlObj.parentNode.removeChild(htmlObj);
  },450);
}
