var config = {
    apiKey: "AIzaSyBISgoM6Nlg9SMg8mwki7SmYCj2wsrbMzY",
    authDomain: "projekt-2018-mewent.firebaseapp.com",
    databaseURL: "https://projekt-2018-mewent.firebaseio.com",
    projectId: "projekt-2018-mewent",
    storageBucket: "projekt-2018-mewent.appspot.com",
    messagingSenderId: "42705428709"
  };

  firebase.initializeApp(config);

  const db = firebase.database();

  function createUniqueSid(userObject){
    return new Promise((resolve, reject) => {

      recursiveSidFind(userObject);

      function recursiveSidFind(userObject, count = 0){
        if(count <= 10){
          /* Create a site id here (sid) */
          let name = userObject.fullname;
          let sid;
          if(name.includes(' ')){
            name = name.split(' ');
            sid = name[0]+'.'+name[1];
          } else {
            sid = name;
          }

          if(count){
            sid += count;
          }

          console.log('sid is: ', sid);

          db.ref('users/').once('value', snapshot => {
            let data = snapshot.val();
            if(data){
              for(let user in data){
                user = data[user];
                if(user.sid == sid){
                  console.log('Sid already taken, lets create another one!')
                  return recursiveSidFind(userObject, count += 1);
                }
              }
              console.log('Sid not taken :o');
              resolve(sid);
            } else {
              printMessage('error', 'No database connection was found.');
            }
          });
        } else {
          reject('Could not find a sid in 10 tries.')
        }
      }
    });
  }


let userObject = {
  uniqueID: 'b6b5xMrqKKW0XA3hvExKoHvPbjm1',
  fullname: 'Anton Stjernquist'
}

createUniqueSid(userObject).then(function(value) {
    // Körs om/när Promise-koden har lyckats (anropat succeed)
    console.log('Sid found, woohoo');
    db.ref('users/' + userObject.uniqueID + '/sid').set(value)
})
.catch(function(error){
  console.log(error);
});
