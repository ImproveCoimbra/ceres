// Local (client-only) collection
Toasts = new Meteor.Collection(null);

Toasts.TYPES = {
  ERROR: 1,
  SUCCESS: 2
};

Toasts.throwError = function(message) {
  Toasts.insert({message: message, seen: false, type: Toasts.TYPES.ERROR});
};

Toasts.greatSuccess = function(message) {
  Toasts.insert({message: message, seen: false, type: Toasts.TYPES.SUCCESS});
};

Toasts.clearToasts = function() {
  Toasts.remove({seen: true});
};