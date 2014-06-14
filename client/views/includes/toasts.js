Template.toasts.helpers({
  toasts: function() {
    return Toasts.find();
  }
});

Template.toast.helpers({
  alertClass: function() {
    return this.type === Toasts.TYPES.ERROR ? "alert-danger" : "alert-success";
  },
  icon : function() {
    return this.type === Toasts.TYPES.ERROR ? "glyphicon-fire" : "glyphicon-ok-circle";
  }
});

Template.toast.rendered = function() {
  var toast = this.data;
  Meteor.defer(function() {
    Toasts.update(toast._id, {$set: {seen: true}});
  });
  $('html, body').animate({ scrollTop: 0 }, 'fast');
};