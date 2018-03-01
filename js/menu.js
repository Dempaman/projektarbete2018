//känner av om de finns en användaren
window.addEventListener('load', function(event){

  let meetupWrapper = document.getElementById('meetupWrapper');
  let menuDiv = document.getElementById('menuDiv');
  let purple = document.getElementsByClassName('purple')[0];
  let modalWrapper = document.getElementById('modalWrapper');
  let navigation = document.getElementById('navigation');
  let loginInMenu = document.getElementsByClassName('loginInMenu')[0];

  //Tar bort användern från localStorage
  loginInMenu.addEventListener('click', function(event){
    if(localStorage.getItem('loggedInUser')){
      localStorage.removeItem('loggedInUser');
      loginInMenu.innerText = "LOGGA IN!!!";
    }else if(!localStorage.getItem('loggedInUser')){
      navigation.className = 'hidden';
      toggleLoginModal();
      console.log('HÄR SKA VI LOGGA IN ANVÄNDAREN');
    }
    });

    if(localStorage.getItem('loggedInUser')){
      loginInMenu.innerText = "LOGGA UT!!!";
    }

    purple.addEventListener('click', function(event){
      navigation.className = 'hidden';
    });


    menuDiv.addEventListener('click', function(event){
      modalWrapper.className = 'hidden'
      menuToggle.className = '';
      navigation.className = '';
      meetupWrapper.className = '';
    })



});
