Produtores = new Meteor.Collection('produtores');
Produtores.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return true; //!! userId;
  },
  update : function() {
  	return true;
  }
});