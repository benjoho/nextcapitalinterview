Template.bowlersList.events({

});
Template.bowlersList.helpers({
  setBowlers: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/bowlers/";
    HTTP.call("GET",url,options,function(error,result){
      Session.set('bowlers',result.data);
    });
  },
  getBowlers: function(){
    return Session.get('bowlers');
  }
});
