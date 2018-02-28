
window.addEventListener('load', profilFunction);

function profilFunction(event) {
  let more = document.getElementById('user-info-more');
  let showMore = document.getElementsByClassName('show-more')[0];
  let userInfo = document.getElementsByClassName('user-info')[0];
  more.addEventListener('click', function(event) {
      event.preventDefault();

      if (showMore.innerText === 'visa mer') {

        window.setTimeout(function() {
          showMore.innerText = 'visa mindre';
          let upImg = document.createElement('i');
          upImg.className = "fas fa-angle-up fa-2x";
          more.children[1].parentElement.replaceChild(upImg, more.children[1]);

          userInfo.style.overflow = 'visible';
          userInfo.style.whiteSpace = 'normal';
          userInfo.style.transition = '0.4s ease';
        }, 400);


      } else {

        window.setTimeout(function() {
            showMore.innerText = 'visa mer';

            let downImg = document.createElement('i');
            downImg.className = "fas fa-angle-down fa-2x";
            more.children[1].parentElement.replaceChild(downImg, more.children[1]);

            userInfo.style.overflow = 'hidden';
            userInfo.style.whiteSpace = 'nowrap';
            userInfo.style.transition = '0.4s';
        }, 400);



    }
    console.log(event.type);
  });
}
