Template.lojaForm.events({
  "submit form" : function (ev) {
    ev.preventDefault();

    var loja = {
      name: $(ev.target).find('[name=name]').val(),
      mainPhotoUrl: $(ev.target).find('[name=mainPhotoUrl]').val(),
      description: $(ev.target).find('[name=description]').val(),
      photos: _.map($(ev.target).find(".admin-produtores-edit-photos img"), function (img) {
        return {
          url: img.src
        };
      })
    };

    if (currentPageIs('submitLojasPgae')) {
      // TODO Meteor call
      Router.go('homePage');
    } else if (currentPageIs('admninLojaCreateItem')) {
      if (this._id) {
        Produtores.update(this._id, {$set : produtor});
      } else {
        Produtores.insert(produtor);
      }

      Router.go('adminPage');
    } else {
      Router.go('homePage');
    }

    if (currentPageIs('submitLojaPage')) {
      //TODO Meteor call
      Router.go('homePage');
    } else if (currentPageIs('adminLojaCreateItem')) {
      if (this._id) {
        Lojas.update(this._id, {$set : loja});
      } else {
        Lojas.insert(loja);
      }

      Router.go('adminPage');
    }
  },
  'click .js-delete': function(ev) {
    ev.preventDefault();

    if (confirm("Apagar esta loja/mercado?")) {
      Lojas.remove(this._id);
      Router.go('adminPage');
    }
  },
  'click .js-delete-photo': function() {
    var url;

    url = this.url;
    Session.set("adminPhotoList", _.reject(Session.get("adminPhotoList"), function (photo) {
      return photo.url === url;
    }));
  },
  'click .js-add-photo': function(ev) {
    var newPhoto, input;

    input = $(ev.target).closest("form").find('[name=newPhotoUrl]');
    newPhoto = {
      url: input.val()
    };
    Session.set("adminPhotoList", Session.get("adminPhotoList").concat(newPhoto));
    input.val("");
  }
});

Template.lojaForm.photos = function () {
  return Session.get("adminPhotoList");
};

Template.lojaForm.created = function () {
  Session.set("adminPhotoList", this.data && this.data.photos ? this.data.photos : []);
};
