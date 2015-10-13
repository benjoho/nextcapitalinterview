Template.leaguesList.events({

});
Template.leaguesList.helpers({
  setLeagues: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/leagues/";
    HTTP.call("GET",url,options,function(error,result){
      Session.set('leagues',result.data);
    });
  },
  getLeagues: function(){
    return Session.get('leagues');
  }
});
