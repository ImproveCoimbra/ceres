Meteor.publish('produtores', function() {
  return Produtores.find();
});

Meteor.publish('lojas', function() {
  return Lojas.find();
});

Meteor.publish('restaurantes', function() {
  return Restaurantes.find();
});