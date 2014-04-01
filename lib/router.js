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
  
  //Agricultores
  this.route('produtoresPage', {path: '/agricultores'});
  this.route('produtorPage', {
    path: '/produtores/:_id',
    data: function() { return Produtores.findOne(this.params._id); }
  });

  //Lojas
  this.route('lojasPage', {path: '/lojas'});

  //Restaurantes
  this.route('restaurantesPage', {path: '/restaurantes'});

  this.route('sobrePage', {path: '/sobre'});

  //Allow to get all the produtores as JSON
  this.route('produtoresJSON', {
    where: 'server',
    path: '/json/agricultores',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(Produtores.find().fetch()));
    }
  });

  this.route('historyJSON', {
    where: 'server',
    path: '/json/history',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(getHistoryEntries()));
    }
  });

  //Admin pages, MUST use `AdminController`
  this.route('adminPage', {
    path: '/admin',
    controller: AdminController
  });
  this.route('adminProdutorCreateItem', {
    path: '/admin/submitAgricultor',
    controller: AdminController
  });
  this.route('adminProdutoresEditItem', {
    path: '/admin/agricultores/:_id',
    controller: AdminController,
    data: function() { return Produtores.findOne(this.params._id); }
  });
});