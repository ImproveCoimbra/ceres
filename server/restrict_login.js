var allowedEmails = [
	"me@lfac.me"
];

Accounts.validateNewUser(function (user) {
	if (_.contains(allowedEmails, _.first(_.pluck(user.emails, "address")))) {
		return true;
	}
  throw new Meteor.Error(403, "The email is not on the allowed list");
});