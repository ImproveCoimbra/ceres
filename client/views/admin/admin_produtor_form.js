Template.adminProdutorForm.events({
	"submit form" : function (ev) {
		ev.preventDefault();

		var produtor = {
	      name: $(ev.target).find('[name=name]').val(),
	      mainPhotoUrl: $(ev.target).find('[name=mainPhotoUrl]').val(),
	      description: $(ev.target).find('[name=description]').val()
	    };

	    if (this._id) {
	    	Produtores.update(this._id, {$set : produtor});
	    } else {
	    	Produtores.insert(produtor);
	    }

	    Router.go('adminPage');
	},
	'click .js-delete': function(ev) {
	    ev.preventDefault();

	    if (confirm("Apagar este produtor?")) {
	      Produtores.remove(this._id);
	      Router.go('adminPage');
	    }
	}
})