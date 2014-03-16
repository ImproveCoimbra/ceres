Template.header.currentPageIs = function (page) {
	return Router.current() ? Router.current().route.name === page : null;
};