isLoggedIn = function(userId, doc) {
    return !! userId;
};

var SaneStringMatcher = Match.Where(function (x) {
  check(x, String);

  if (x.length > 2000) {
    throw new Match.Error("String inválida.");
  }
  return true;
});
var RequiredStringMatcher = Match.Where(function (x) {
  check(x, String);

  if (x.length === 0) {
    throw new Match.Error("Não pode ser vazio");
  }
  return true;
});
var UrlMatcher = Match.Where(function (x) {
  var regExp;

  check(x, RequiredStringMatcher)

  regExp = new RegExp('(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)', 'i');

  if (!regExp.test(x)) {
    throw new Match.Error(_.template("'<% - url %>'' não é um endereço web válido.")({url: x}));
  }

  return true;
});
var EmailMatcher = Match.Where(function (x) {
  check(x, RequiredStringMatcher);

  var regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;      

  if (!regExp.test(x)) {
    throw new Match.Error(_.template("'<% - email %>'' não é um email válido.")({email: x}));
  }
  return true;
});

genericValidation = function (collection, docId, attributes) {
  try {
  check(attributes, {
    name: RequiredStringMatcher,
    mainPhotoUrl: UrlMatcher,
    description: SaneStringMatcher,
    photos: [UrlMatcher],
    email: EmailMatcher,
    isAproved: Match.Optional(Boolean),
    _id: Match.Optional(String)
  });

  if (collection.findOne({name: attributes.name}) && collection.findOne({name: attributes.name})._id !== attributes._id) {
    throw new Error("Este nome já está a ser utilizado.");  
  }

} catch (e) {
  console.log(e.message);
  throw new Meteor.Error(400, e.message.replace("Match error: ", "").replace("in field", "no campo"));
}

  return false;
};

setUpCollection = function (collection) {
	collection.allow({
	  insert: isLoggedIn,
	  update : isLoggedIn,
	  remove : isLoggedIn
	});
  collection.deny({
    insert: _.partial(genericValidation, collection),
    update: _.partial(genericValidation, collection)
  });
	if (Meteor.isServer) {
	  logOperationsOf(collection);
	}
};