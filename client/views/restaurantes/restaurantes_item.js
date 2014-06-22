Template.restaurantesItem.helpers({
  shortDescription: function () {
    return this.description ? this.description.split("\n")[0] : "";
  }
});