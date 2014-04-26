Lojas = new Meteor.Collection('lojas');
setUpCollection(Lojas);

Meteor.methods({
	lojasSubmit : function (attributes) {
	  if (!Meteor.isServer) {
  		return;
  	  }
	  attributes.isAproved = false;
	  Lojas.insert(attributes);
  }
});