Lojas = new Meteor.Collection('lojas');
setUpCollection(Lojas);

Meteor.methods({
	lojasSubmit : function (attributes) {
	  if (!Meteor.isServer) {
  		return;
  	  }
	  console.log("bob start");
	  attributes.isAproved = false;
	  Lojas.insert(attributes);
	  console.log("bob");
  }
});