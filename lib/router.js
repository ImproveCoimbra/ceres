Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [
      Meteor.subscribe('produtores'),
      Meteor.subscribe('lojas'),
      Meteor.subscribe('restaurantes')
    ] 
  }
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
};

AdminController = RouteController.extend({
  onBeforeAction: requireLogin
});

Router.map(function() {
  this.route('homePage', {path: '/'});
  
  this.route('inqueritoPage', {path: '/inquerito/abril2014'});
  
  //Agricultores
  this.route('produtoresPage', {path: '/agricultores'});
  this.route('produtorPage', {
    path: '/produtores/:_id',
    data: function() { return Produtores.findOne(this.params._id); }
  });

  //Lojas
  this.route('lojasPage', {path: '/lojas'});
  this.route('lojaPage', {
    path: '/lojas/:_id',
    data: function() { return Lojas.findOne(this.params._id); }
  });

  //Restaurantes
  this.route('restaurantesPage', {path: '/restaurantes'});
  this.route('restaurantePage', {
    path: '/restaurantes/:_id',
    data: function() { return Restaurantes.findOne(this.params._id); }
  });

  this.route('sobrePage', {path: '/sobre'});

  //Allow to get all the resources as JSON
  this.route('produtoresJSON', {
    where: 'server',
    path: '/json/agricultores',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(Produtores.find().fetch()));
    }
  });
  this.route('lojasJSON', {
    where: 'server',
    path: '/json/lojas',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(Lojas.find().fetch()));
    }
  });
  this.route('restaurantesJSON', {
    where: 'server',
    path: '/json/restaurantes',

    action: function () {
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(Restaurantes.find().fetch()));
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
  //Admin agricultores
  this.route('adminProdutorCreateItem', {
    path: '/admin/submitAgricultor',
    controller: AdminController
  });
  this.route('adminProdutoresEditItem', {
    path: '/admin/agricultores/:_id',
    controller: AdminController,
    data: function() { return Produtores.findOne(this.params._id); }
  });
  //Admin lojas
  this.route('adminLojaCreateItem', {
    path: '/admin/submitLoja',
    controller: AdminController
  });
  this.route('adminLojasEditItem', {
    path: '/admin/lojas/:_id',
    controller: AdminController,
    data: function() { return Lojas.findOne(this.params._id); }
  });
  //Admin restaurantes
  this.route('adminRestauranteCreateItem', {
    path: '/admin/submitRestaurante',
    controller: AdminController
  });
  this.route('adminRestaurantesEditItem', {
    path: '/admin/restaurantes/:_id',
    controller: AdminController,
    data: function() { return Restaurantes.findOne(this.params._id); }
  });
});