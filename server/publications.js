Meteor.publish('produtores', function() {
  return Produtores.find();
});