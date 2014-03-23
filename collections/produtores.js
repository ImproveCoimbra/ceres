Produtores = new Meteor.Collection('produtores');
Produtores.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update : function(userId, doc) {
    // only allow posting if you are logged in
  	return !! userId;
  },
  remove : function(userId, doc) {
    // only allow posting if you are logged in
  	return !! userId;
  }
});