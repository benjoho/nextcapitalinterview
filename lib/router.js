Router.configure({
  layoutTemplate: 'layoutMain'
});
Router.route('/',{
  layoutTemplate: 'layoutLogin',
  template: 'login',
  onBeforeAction: function(){
    if(Meteor.user()) this.redirect('/app');
    else this.next()
  }
});
Router.route('/create',{
  layoutTemplate: 'layoutLogin',
  template: 'create',
  onBeforeAction: function(){
    if(Meteor.user()) this.redirect('/app');
    else this.next()
  }
})
Router.route('/app', {
  template: 'app',
  onBeforeAction: function(){
    if(Meteor.user()) this.next()
    else this.redirect('/');
  }
});
Router.route('/logout', {
  template: 'app',
  onBeforeAction: function(){
    if(Meteor.user()){
      Meteor.logout();
      this.redirect('/');}
    else this.redirect('/');
  }
});
Router.route('/leagues', function(){
  this.render('leaguesList');
});
Router.route('/bowlers', function(){
  this.render('bowlersList');
});
Router.route('/leagues/:_id', function () {
  // find data for league id
  template: 'leagues'
  var url = "http://bowling-api.nextcapital.com/api/leagues/"+ this.params._id;
  var authToken = "Basic " + btoa(Meteor.user().emails[0].address + ":" + Meteor.user().username);
  var options = {
      headers: {'Content-Type': 'application/json',
                'Authorization': authToken}
    };
  this.render('leagues',{
    data:
          { data: this.params._id}
        });
});
