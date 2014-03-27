Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('produtores'); }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
};

AdminController = RouteController.extend({
  before: requireLogin
});

Router.map(function() {
  this.route('homePage', {path: '/'});
  this.route('produtoresPage', {path: '/produtores'});
  this.route('produtorPage', {
    path: '/produtores/:_id',
    data: function() { return Produtores.findOne(this.params._id); }
  });
  this.route('sobrePage', {path: '/sobre'});

  //Allow to get all the produtores as JSON
  this.route('produtoresJSON', {
    where: 'server',
    path: '/json/produtores',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(Produtores.find().fetch()));
    }
  });

  //Admin pages, MUST use `AdminController`
  this.route('adminPage', {
    path: '/admin',
    controller: AdminController
  });
  this.route('adminProdutorCreateItem', {
    path: '/admin/submitProdutor',
    controller: AdminController
  });
  this.route('adminProdutoresEditItem', {
    path: '/admin/produtores/:_id',
    controller: AdminController,
    data: function() { return Produtores.findOne(this.params._id); }
  });
});