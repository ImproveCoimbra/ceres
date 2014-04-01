isLoggedIn = function(userId, doc) {
    return !! userId;
};

setUpCollection = function (collection) {
	collection.allow({
	  insert: isLoggedIn,
	  update : isLoggedIn,
	  remove : isLoggedIn
	});
	if (Meteor.isServer) {
	  logOperationsOf(collection);
	}
};