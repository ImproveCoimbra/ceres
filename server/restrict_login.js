var allowedEmails = [
	"lfac.pt@gmai.com"
];

Accounts.validateNewUser(function (user) {

	if (_.contains(allowedEmails, user.email)) {
		return true;
	}
  throw new Meteor.Error(403, "The email is not on the allowed list");
});