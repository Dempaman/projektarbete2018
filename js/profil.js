
window.addEventListener('load', profilFunction);

function profilFunction(event) {
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

  });
}
