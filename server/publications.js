Meteor.publish('produtores', function() {
  return Produtores.find({isAproved: true});
});

Meteor.publish('lojas', function() {
  return Lojas.find({isAproved: true});
});

Meteor.publish('restaurantes', function() {
  return Restaurantes.find({isAproved: true});
});

Meteor.publish('produtoresAdmin', function() {
  //If logged in then we for now assume the user can see everything
  return Produtores.find(this.userId ? {} : {isAproved: true});
});

Meteor.publish('lojasAdmin', function() {
  //If logged in then we for now assume the user can see everything
  return Lojas.find(this.userId ? {} : {isAproved: true});
});

Meteor.publish('restaurantesAdmin', function() {
  //If logged in then we for now assume the user can see everything
  return Restaurantes.find(this.userId ? {} : {isAproved: true});
});