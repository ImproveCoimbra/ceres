Restaurantes = new Meteor.Collection('restaurantes');
setUpCollection(Restaurantes);

Meteor.methods({
  restaurantesSubmit : function (attributes) {
  	if (!Meteor.isServer) {
  		return;
  	}
	attributes.isAproved = false;
	Restaurantes.insert(attributes);
  }
});