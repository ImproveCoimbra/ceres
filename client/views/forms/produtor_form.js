Template.produtorForm.previousPage = function () {
  if (currentPageIs('submitProdutorPage')) {
    return Router.path('submitPage');
  } else {
    return Router.path('adminPage');
  }
};

Template.produtorForm.saveButtonLabel = function () {
  if (currentPageIs('submitProdutorPage')) {
    return 'Submeter';
  } else {
    return 'Guardar';
  }
};

Template.produtorForm.events({
  "submit form": function (ev) {
    ev.preventDefault();

    var produtor = {
      name: $(ev.target).find('[name=name]').val(),
      mainPhotoUrl: $(ev.target).find('[name=mainPhotoUrl]').val(),
      description: $(ev.target).find('[name=description]').val(),
      photos: _.map($(ev.target).find(".admin-produtores-edit-photos img"), function (img) {
        return {
          url: img.src
        };
      })
    };

    if (currentPageIs('submitProdutorPage')) {
      Meteor.call("produtoresSubmit", produtor);
      Router.go('homePage');
    } else if (currentPageIs('adminProdutorCreateItem')) {
      if (this._id) {
        Produtores.update(this._id, {$set : produtor});
      } else {
        Produtores.insert(produtor);
      }

      Router.go('adminPage');
    } else {
      throw new Meteor.Error(400, "Invalid route!");
    }
  },
  'click .js-delete': function(ev) {
    ev.preventDefault();

    if (confirm("Apagar este produtor?")) {
      Produtores.remove(this._id);
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

Template.produtorForm.photos = function () {
  return Session.get("adminPhotoList");
};

Template.produtorForm.created = function () {
  Session.set("adminPhotoList", this.data && this.data.photos ? this.data.photos : []);
};
