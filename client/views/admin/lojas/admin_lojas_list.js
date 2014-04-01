Template.adminLojasList.helpers({
  lojas: function () {
    return Lojas.find();
  }
});