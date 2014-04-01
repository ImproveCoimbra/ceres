Template.restaurantesList.helpers({
  restaurantes: function () {
    return Restaurantes.find();
  }
});