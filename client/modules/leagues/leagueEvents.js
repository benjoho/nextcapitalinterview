Template.leagues.events({
  'click #add': function(e,t){
    e.preventDefault();
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      data: {
        "bowler_id":t.find('#bowler-id').value
      }
    }
    var url = "http://bowling-api.nextcapital.com/api/leagues/"+ Session.get('league').id + "/bowlers";
    HTTP.put(url,options,function(error,result){
      if(!error){
        if (Session.get('league-bowlers').length !== result.data.length){
          Session.set('league-bowlers',result.data);
        }
        else{
          alert('Bowler already added');
        }
      }
      else{
        alert("Sorry could not add bowler.")
      }
    });
  },
  'click #buy-ticket':function(e,t){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      data: {
        "bowler_id": e.target.id
      }
    };
    var lotteries = Session.get('league-lotteries');
    var league = Session.get('league').id;
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + league + '/lotteries/' + lotteries[lotteries.length-1].id + '/tickets';
    HTTP.call("POST",url,options,function(error,result){
      var bowlers = Session.get('league-bowlers');
      for(var i = 0; i < bowlers.length; i++){
        if(bowlers[i].id === result.data.bowler_id){
          bowlers[i].ticketCount = bowlers[i].ticketCount + 1;
        }
      }
      var lotteries = Session.get('league-lotteries');
      lotteries[lotteries.length-1].balance = lotteries[lotteries.length-1].balance + 10;
      Session.set('league-lotteries',lotteries);
      Session.set('league-bowlers',bowlers);
    });
    // need to add code to live update the running lottery total
  },
  'click #draw-ticket':function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var lotteries = Session.get('league-lotteries');
    var league = Session.get('league').id;
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + league + '/lotteries/' + lotteries[lotteries.length-1].id + '/roll';
    HTTP.call("GET",url,options,function(error,result){
      if(error != undefined){
        alert('No tickets bought for this lottery, please buy at least one ticket!');
      }
      else{
        var bowlers = Session.get('league-bowlers');
        var winningTicket = result.data;
        for(var i = 0; i < bowlers.length; i++){
          if(bowlers[i].id === winningTicket.bowler_id){
            bowlers[i].winningTicket = true;
            Session.set('lotteryWinner',winningTicket.bowler_id);
          }
        }
        Session.set('league-bowlers',bowlers);
      }

      });
  },
  'submit #roll':function(e,t){
    e.preventDefault();
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      },
      data: {
        "pin_count": t.find("#pins").value
      }
    };
    var lotteries = Session.get('league-lotteries');
    var last = lotteries.length-1;
    var league = Session.get('league').id;
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + league + '/lotteries/' + lotteries[last].id + '/roll';
    HTTP.put(url,options,function(error,result){
      // need to do stuff here
      var bowlers = Session.get('league-bowlers');
      for(var i = 0; i < bowlers.length; i++){
        bowlers[i].ticketCount = 0;
      }
      Session.set('league-bowlers',bowlers);
    });
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + league + '/lotteries';
    HTTP.call("GET",url,options,function(error,result){
      Session.set('league-lotteries', result.data);
    });
    Session.set('lotteryWinner',false);
  }
});
