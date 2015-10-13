Template.leagues.helpers({
  templateData: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + this.data;
    HTTP.call("GET",url,options,function(error,result){
      Session.set('league',result.data);
    });
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + this.data + '/lotteries';
    HTTP.call("GET",url,options,function(error,result){
      Session.set('currentLottery', result.data[result.data.length-1]);
    });
  },
  leagueName: function(){
    return Session.get('league').name;
  },
  bowlersInLeague: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + this.data + '/bowlers';
    HTTP.call("GET",url,options,function(error,result){
      var bowlers = result.data;
      for(var i =0; i < bowlers.length; i++){
        bowlers[i].winningTicket = false;
      }
      Session.set('league-bowlers', bowlers);
    });
  },
  getBowlers: function(){
    return Session.get('league-bowlers');
  },
  setLotteries: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
      }
    };
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + this.data + '/lotteries';
    HTTP.call("GET",url,options,function(error,result){
      Session.set('league-lotteries', result.data);
    });
  },
  getLotteries: function(){
    return Session.get('league-lotteries');
  },
  getLotteryTickets: function(){
    var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken}};
    var lotteries = Session.get('league-lotteries');
    var league = Session.get('league').id;
    var url = "http://bowling-api.nextcapital.com/api/leagues/" + league + '/lotteries/' + lotteries[lotteries.length-1].id + '/tickets';
    HTTP.call("GET",url,options,function(error,result){
      // need to add data to bowlers session variable
      var bowlers = Session.get('league-bowlers');
      var tickets = result.data;
      Session.set('lottery-tickets',tickets);
      for(var i = 0; i < bowlers.length; i++){
        for(var j = 0; j < tickets.length; j++){
          if(tickets[j].is_winner){
            Session.set('lotteryWinner',tickets[j]);
          }
        }
      }
      Session.set('league-bowlers',bowlers);
    });
    return Session.get('lottery-tickets');
  },
  getCurrentLottery: function(){
    return Session.get('currentLottery');
  },
  lotteryWinner: function(){
    return Session.get('lotteryWinner');
  }
});
