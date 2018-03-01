//känner av om de finns en användaren
if(localStorage.getItem('loggedInUser')){
  document.getElementById('loginInMenu').innerText = "logga ut";
};
