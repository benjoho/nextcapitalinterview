Template.create.events({
  'click #register': function(e,t){
    e.preventDefault();
    // check to make sure account doesnt already exist
    // @TODO
    // create account and login to account
    var url = "http://bowling-api.nextcapital.com/api/users";
    var password = t.find('#password-register').value;
    var options = {
      headers: {'Content-Type': 'application/json'},
      data: { "email": t.find('#email-register').value,
              "password": t.find('#password-register').value}
    }
    HTTP.call("POST",url,options,
      function(error,result){
        if(!error){
          // successfully created account
          // add account to local database
          var options = {
            username: password,
            email: result.data.email,
            password: password
          }
          Accounts.createUser(options,function(err){
            if (err){
              alert('Account creation failed :(');
            }
            // else created account now sign in
          });
        }
        else{
          alert('Email has already been taken');
        }
      });
  }
});
