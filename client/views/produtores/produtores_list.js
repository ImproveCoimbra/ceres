Template.produtoresList.helpers({
  produtores: function () {
    return Produtores.find();
  }
});