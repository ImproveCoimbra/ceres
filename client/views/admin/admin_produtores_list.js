Template.adminProdutoresList.helpers({
  produtores: function () {
    return Produtores.find();
  }
});