Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notfound',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [
      Meteor.subscribe('produtores'),
      Meteor.subscribe('lojas'),
      Meteor.subscribe('restaurantes')
    ];
  }
});

Router.onRun(function() {
  Toasts.clearToasts();
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

var submitEnum = {
  AGRICULTOR: function () {
    return {
      type : "agricultor",
      submitRouteName: "submitProdutorPage",
      collection: Produtores,
      submitMethod: "produtoresSubmit",
      typeLabel: "agricultor"
    };  
  },
  LOJA: function () {
    return {
      type : "loja",
      submitRouteName: "submitLojaPage",
      collection: Lojas,
      submitMethod: "lojasSubmit",
      typeLabel: "loja/mercado"
    };  
  },
  RESTAURANTE: function () {
    return {
      type : "restaurante",
      submitRouteName: "submitRestaurantePage",
      collection: Restaurantes,
      submitMethod: "submitRestaurantePage",
      typeLabel: "restaurante"
    };  
  }
};

AdminController = RouteController.extend({
  onBeforeAction: requireLogin,
  waitOn: function() { 
    return [
      Meteor.subscribe('produtoresAdmin'),
      Meteor.subscribe('lojasAdmin'),
      Meteor.subscribe('restaurantesAdmin')
    ];
  }
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
  
  //Public user submitions pages
  this.route('submitPage', {path: '/submit'});
  this.route('submitProdutorPage', {
    path: '/submit/agricultor', 
    data: submitEnum.AGRICULTOR
  });
  this.route('submitLojaPage', {
    path: '/submit/loja', 
    data: submitEnum.LOJA
  });
  this.route('submitRestaurantePage', {
    path: '/submit/restaurante', 
    data: submitEnum.RESTAURANTE
  });
  
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
    controller: AdminController,
    data: submitEnum.AGRICULTOR
  });
  this.route('adminProdutoresEditItem', {
    path: '/admin/agricultores/:_id',
    controller: AdminController,
    data: function() { 
      return _.extend({}, Produtores.findOne(this.params._id), submitEnum.AGRICULTOR()); 
    }
  });
  //Admin lojas
  this.route('adminLojaCreateItem', {
    path: '/admin/submitLoja',
    controller: AdminController,
    data: submitEnum.LOJA
  });
  this.route('adminLojasEditItem', {
    path: '/admin/lojas/:_id',
    controller: AdminController,
    data: function() { 
      return _.extend({}, Lojas.findOne(this.params._id), submitEnum.LOJA()); 
    }
  });
  //Admin restaurantes
  this.route('adminRestauranteCreateItem', {
    path: '/admin/submitRestaurante',
    controller: AdminController,
    data: submitEnum.RESTAURANTE
  });
  this.route('adminRestaurantesEditItem', {
    path: '/admin/restaurantes/:_id',
    controller: AdminController,
    data: function() { 
      return _.extend({}, Restaurantes.findOne(this.params._id), submitEnum.RESTAURANTE()); 
    }
  });
});
