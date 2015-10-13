Template.login.events({
  'click #login': function(e,t){
    e.preventDefault();
    var url = "http://bowling-api.nextcapital.com/api/login";
    var email = t.find('#email').value;
    var password = t.find('#password').value;
    var authToken = "Basic " + btoa(email + ":" + password);
    var options = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': authToken}
      };
    // check if the user exists in NextCapital database
    HTTP.call("POST",url,options,
    function(error,result){
        // account exists in NextCapital database
        if(!error){
          // if account already exists check to see if ever logged into my database
          Meteor.loginWithPassword(email, password, function(err){
            // if account doesnt exist in local database create account
            if (err){
              var options = {
                username: password,
                email: result.data.email,
                password: password
              }
              // create account
              Accounts.createUser(options,function(err){
                if (err){
                  alert('Account creation failed :(');
                }
              });
            }
            // else just continue to main app page
            });
        }
        else {
          alert(result.data.error);
        }
    });
  },
  'submit #register-form': function(e,t){
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
