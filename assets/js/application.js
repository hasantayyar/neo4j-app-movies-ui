// application.js

$(document).ready(function($) {
	$("#owl-example").owlCarousel({
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2]
	});

	var owl = $("#owl-demo-1, #owl-demo-2, #owl-demo-3");
 
	owl.owlCarousel({
		itemsCustom : [
		[0, 2],
		[450, 4],
		[600, 7],
		[700, 9],
		[1000, 10],
		[1200, 12],
		[1400, 13],
		[1600, 15]
		]
	});
});
