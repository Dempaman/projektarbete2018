function createUniqueSid(userObject){
  return new Promise((resolve, reject) => {

    recursiveSidFind(userObject);

    function recursiveSidFind(userObject, count = 0){
      if(count <= 10){
        /* Create a site id here (sid) */
        let name = userObject.fullname;
        if(name == null){
          reject('User has no name.');
        }
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
