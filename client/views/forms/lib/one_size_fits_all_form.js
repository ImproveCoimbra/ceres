Template.oneSizeFitsAllForm.previousPage = function () {
  if (currentPageIs(this.submitRouteName)) {
    return Router.path('submitPage');
  } else {
    return Router.path('adminPage');
  }
};

Template.oneSizeFitsAllForm.isOnSubmitPage = function () {
  return currentPageIs(this.submitRouteName);
};

Template.oneSizeFitsAllForm.saveButtonLabel = function () {
  if (currentPageIs(this.submitRouteName)) {
    return 'Submeter';
  } else {
    return 'Guardar';
  }
};

Template.oneSizeFitsAllForm.events({
  "submit form" : function (ev) {
    ev.preventDefault();

    var thing = {
      name: $(ev.target).find('[name=name]').val(),
      mainPhotoUrl: $(ev.target).find('[name=mainPhotoUrl]').val(),
      description: $(ev.target).find('[name=description]').val(),
      photos: _.map($(ev.target).find(".admin-produtores-edit-photos img"), function (img) {
        return {
          url: img.src
        };
      }),
      email: $(ev.target).find('[name=email]').val(),
      isAproved: true
    };

    if (currentPageIs(this.submitRouteName)) {
      Meteor.call(this.submitMethod, thing, function (error) {
          if (error) {
            console.error(error);
            Toasts.throwError("Operação falhou: " + error.message)
          } else {
            Router.go('homePage');
            Toasts.greatSuccess(thing.name + " submetido com sucesso e espera agora aprovação.");
          }
        });
    } else {
      if (this._id) {
        this.collection.update(this._id, {$set : thing}, function (error) {
          if (error) {
            console.error(error);
            Toasts.throwError("Operação falhou: " + error.message)
          } else {
            Toasts.greatSuccess(thing.name + " atualizado com sucesso!");
            Router.go('adminPage');
          }
        });
      } else {
        this.collection.insert(thing, function (error) {
          if (error) {
            console.error(error);
            Toasts.throwError("Operação falhou: " + error.message)
          } else {
            Toasts.greatSuccess(thing.name + " inserido com sucesso!");
            Router.go('adminPage');
          }
        });
      }
    }
  },
  'click .js-delete': function(ev) {
    ev.preventDefault();

    if (confirm("Apagar esta " + this.typeLabel + "?")) {
      this.collection.remove(this._id);
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

Template.oneSizeFitsAllForm.photos = function () {
  return Session.get("adminPhotoList");
};

Template.oneSizeFitsAllForm.created = function () {
  Session.set("adminPhotoList", this.data && this.data.photos ? this.data.photos : []);
};
