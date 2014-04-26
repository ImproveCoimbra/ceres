Produtores = new Meteor.Collection('produtores');
setUpCollection(Produtores);

Meteor.methods({
	produtoresSubmit : function (attributes) {
	  if (!Meteor.isServer) {
  	 	return;
  	  }
	  attributes.isAproved = false;
	  Produtores.insert(attributes);
  }
});