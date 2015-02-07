//Fills main div to fill rest of screen
$(document).ready(function(){
	//Fills main div to fill rest of screen
	var hgt = window.innerHeight - $(".header").height() - $(".footer").height();
	$(".main").css("height", hgt);
	$(window).resize(function(){
		hgt = window.innerHeight - $(".header").height() - $(".footer").height();
		$(".main").css("height", hgt);
	});

	$('#signinbut').click(function(){
		$("input[type=button]").addClass("off");
		$(".signinform").addClass("on");
	});
});

function isLoggedIn(){
	//TODO: MAKE THIS
	var isLogged = false;
	//If(whatever){}
	return isLogged;
}
