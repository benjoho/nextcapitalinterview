Template.app.events({
  'click #logout':function(e,t){
    Meteor.logout();
  },
  'click #create-league': function(e,t){
    e.preventDefault();
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      data: {
        "name": t.find('#name').value
      }
    }
    var url = "http://bowling-api.nextcapital.com/api/leagues";
    HTTP.call("POST",url,options,function(error,result){
      var leagues = Session.get('leagues');
      Session.set('leagues', leagues.push(result.data));
    });
  },
  'click #create-bowler': function(e,t){
    e.preventDefault();
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      data: {
        "name": t.find('#bowler-name').value
      }
    }
    var url = "http://bowling-api.nextcapital.com/api/bowlers";
    HTTP.call("POST",url,options,function(error,result){
      var bowlers = Session.get('bowlers');
      Session.set('bowlers', bowlers.push(result.data));
    });
  }

});
Template.app.helpers({
  allLeagues: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    }
    var url = "http://bowling-api.nextcapital.com/api/leagues";
    var result2;
    HTTP.call("GET",url,options, function(error, result){
      Session.set('leagues',result.data);
    });
    return Session.get('leagues');
  },
  allBowlers: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    }
    var url = "http://bowling-api.nextcapital.com/api/bowlers";
    var result2;
    HTTP.call("GET",url,options, function(error, result){
      Session.set('bowlers',result.data);
    });
    return Session.get('bowlers');
  }


});
