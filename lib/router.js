Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('produtores'); }
});

Router.map(function() {
  this.route('homePage', {path: '/'});
  this.route('produtoresPage', {path: '/produtores'});
  this.route('produtorPage', {
    path: '/produtores/:_id',
    data: function() { return Produtores.findOne(this.params._id); }
  });
  this.route('sobrePage', {path: '/sobre'});
});