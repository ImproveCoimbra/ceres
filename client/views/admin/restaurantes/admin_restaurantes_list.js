Template.adminRestaurantesList.helpers({
  restaurantes: function () {
    return Restaurantes.find();
  }
});