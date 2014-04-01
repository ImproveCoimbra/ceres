Template.adminRestauranteForm.events({
	"submit form" : function (ev) {
		ev.preventDefault();

		var restaurante = {
	      name: $(ev.target).find('[name=name]').val(),
	      mainPhotoUrl: $(ev.target).find('[name=mainPhotoUrl]').val(),
	      description: $(ev.target).find('[name=description]').val(),
	      photos: _.map($(ev.target).find(".admin-produtores-edit-photos img"), function (img) {
	      	return {
	      		url: img.src
	      	};
	      })
	    };

	    if (this._id) {
	    	Restaurantes.update(this._id, {$set : restaurante});
	    } else {
	    	Restaurantes.insert(restaurante);
	    }

	    Router.go('adminPage');
	},
	'click .js-delete': function(ev) {
	    ev.preventDefault();

	    if (confirm("Apagar este restaurante?")) {
	      Restaurantes.remove(this._id);
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

Template.adminRestauranteForm.photos = function () {
	return Session.get("adminPhotoList");
};

Template.adminRestauranteForm.created = function () {
	Session.set("adminPhotoList", this.data.photos);
};