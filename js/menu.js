//känner av om de finns en användaren
window.addEventListener('load', function(event){

  let loginInMenu = document.getElementsByClassName('loginInMenu')[0];
  //Tar bort användern från localStorage
  loginInMenu.addEventListener('click', function(event){
    localStorage.removeItem('loggedInUser');
  });

  if(localStorage.getItem('loggedInUser')){
    loginInMenu.innerText = "logga ut";
    console.log('THE USER ISS LOGGED IN YEAHÄ!!!!')
  };


});
