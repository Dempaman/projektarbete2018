//känner av om de finns en användaren
window.addEventListener('load', function(event){

  let modalWrapper = document.getElementById('modalWrapper');
  let menuDiv = document.getElementById('menuDiv');
  let loginInMenu = document.getElementsByClassName('loginInMenu')[0];
  //Tar bort användern från localStorage
  loginInMenu.addEventListener('click', function(event){

    if(localStorage.getItem('loggedInUser')){
      localStorage.removeItem('loggedInUser');
      loginInMenu.innerText = "LOGGA IN!!!";
    }else if(!localStorage.getItem('loggedInUser')){
      console.log('HÄR SKA VI LOGGA IN ANVÄNDAREN');
    }

    });
    if(localStorage.getItem('loggedInUser')){
      loginInMenu.innerText = "LOGGA UT!!!";
    }

    menuDiv.addEventListener('click', function(event){
      modalWrapper.className = 'hidden'
      menuToggle.className = '';
    })

});
