Template.galleryItem.events({
	"click .js-gallery-item" : function (ev) {
		var gelleryItem, galleryModalElement;

		galleryItem = $(ev.currentTarget);

		galleryModalElement = galleryItem.closest(".gallery").find(".gallery-modal");
		galleryModalElement.find(".modal-body").html('<img src="' + galleryItem.find("img").attr("src") + '">');
		galleryModalElement.modal();
	}
})