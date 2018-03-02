

window.addEventListener('load', profilFunction);

function profilFunction(event) {


  // User info text - show more/ show less
  let more = document.getElementById('user-info-more');
  let showMore = document.getElementsByClassName('show-more')[0];
  let userInfo = document.getElementsByClassName('white-cover')[0];

  more.addEventListener('click', function(event) {
      event.preventDefault();
      if (showMore.innerText === 'visa mer') {
          showMore.innerText = 'visa mindre';
          let upImg = document.createElement('i');
          upImg.className = "fas fa-angle-up fa-2x";
          more.children[1].parentElement.replaceChild(upImg, more.children[1]);
          userInfo.classList.add('transform');
          more.classList.add('move');
      } else {
            showMore.innerText = 'visa mer';

            let downImg = document.createElement('i');
            downImg.className = "fas fa-angle-down fa-2x";
            more.children[1].parentElement.replaceChild(downImg, more.children[1]);

              userInfo.classList.remove('transform');
              more.classList.remove('move');
    }

  }); // End of - User info text



  // To checkout meetups or remove them - hidden nav
  let smallMenu = document.getElementsByClassName('show-hidden-nav')[0];
  let closeSmallMenu = document.getElementsByClassName('close-small-menu')[0];
  let hiddenNav = document.getElementsByClassName('hidden-nav')[0];
  let goToo = document.getElementsByClassName('go-too')[0];
  let removeMeetup = document.getElementsByClassName('remove-meetup')[0];


  smallMenu.addEventListener('click', function(event) {
      event.preventDefault();

      if (hiddenNav.className === 'hidden-nav') {
          hiddenNav.classList.add('show');
      } else {
              hiddenNav.classList.remove('show');
    }
  });
closeSmallMenu.addEventListener('click', function(event) {
    event.preventDefault();
    if (hiddenNav.className === 'hidden-nav show') {
        hiddenNav.classList.remove('show');
    }
}); // End of -To checkout meetups or remove them - hidden nav

  let userEdit = document.getElementById('edit-user');

  userEdit.addEventListener('click', function(event){
    
  });


}
