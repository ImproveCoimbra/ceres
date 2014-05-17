Restaurantes = new Meteor.Collection('restaurantes');
setUpCollection(Restaurantes);

Meteor.methods({
  restaurantesSubmit : function (attributes) {
  	if (!Meteor.isServer) {
  		return;
  	}
  	attributes.isAproved = false;
  	Restaurantes.insert(attributes, function (error, _id) {
      if (!error) {
        notifySubmission("restaurantes", attributes, "adminRestaurantesEditItem", _id);
      }
    });
  }
});