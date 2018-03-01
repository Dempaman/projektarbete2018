//känner av om de finns en användaren
window.addEventListener('load', function(event){

  let meetupWrapper = document.getElementById('meetupWrapper');
  let menuDiv = document.getElementById('menuDiv');
  let purple = document.getElementsByClassName('purple')[0];
  let modalWrapper = document.getElementById('modalWrapper');
  let navigation = document.getElementById('navigation');
  let loginInMenu = document.getElementsByClassName('loginInMenu')[0];

  //Tar bort användern från localStorage och loggar ut från google i Firebase.
  loginInMenu.addEventListener('click', function(event){
    if(localStorage.getItem('loggedInUser')){

      localStorage.removeItem('loggedInUser');
      loginInMenu.innerText = "LOGGA UT!!!";

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Google sign-out successful')
      }).catch(function(error) {
        // An error happened.
        console.log('No server response...')
      });

      loginInMenu.innerText = "LOGGA IN!!!";

    }else if(!localStorage.getItem('loggedInUser')){
      navigation.className = 'hidden';
      toggleLoginModal();
      console.log('HÄR SKA VI LOGGA IN ANVÄNDAREN');
    }
  });//Tar bort användern från localStorage --- slut


    //Om du är inloggad så står de "logga ut" i menu
    if(localStorage.getItem('loggedInUser')){
      loginInMenu.innerText = "LOGGA UT!!!";
    }
    //Gömmer hela navigation sidan och skickar dig vidare till login-modal.
    purple.addEventListener('click', function(event){
      navigation.className = 'hidden';
      toggleLoginModal();
    });


    menuDiv.addEventListener('click', function(event){
      modalWrapper.className = 'hidden'
      menuToggle.className = '';
      navigation.className = '';
      meetupWrapper.className = '';
    })
});
