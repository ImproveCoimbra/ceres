isLoggedIn = function(userId, doc) {
    return !! userId;
};

genericValidation = function (collection, docId, attributes) {
  check(attributes, {
    name: Match.String,
    mainPhotoUrl: Match.String,
    description: Match.String,
    //photos
    email: Match.String,
    isAproved: Match.Optional(Match.Boolean)
  });

  return true;
};

setUpCollection = function (collection) {
	collection.allow({
	  insert: isLoggedIn,
	  update : isLoggedIn,
	  remove : isLoggedIn
	});
  collection.deny({
    insert: _.partial(genericValidation, collection)
  });
	if (Meteor.isServer) {
	  logOperationsOf(collection);
	}
};