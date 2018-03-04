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
  let smallMenu = document.getElementsByClassName('show-hidden-nav');
  let closeSmallMenu = document.getElementsByClassName('close-small-menu');
  let hiddenNav = document.getElementsByClassName('hidden-nav');
  let goToo = document.getElementsByClassName('go-too')[0];
  let removeMeetup = document.getElementsByClassName('remove-meetup')[0];
  console.log(smallMenu);
  console.log(smallMenu[1].className);

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

  let userEdit = document.getElementById('edit-user');

  userEdit.addEventListener('click', function(event) {
    event.preventDefault();
  });


}
