function isLoggedIn(){
	//TODO: MAKE THIS
	var isLogged = false;
	//If(whatever){}
	return isLogged;
}

//Fills main div to fill rest of screen
$(document).ready(function(){
	//Fills main div to fill rest of screen

	var hgt = window.innerHeight - $(".header").height() - $(".footer").height();
	if(hgt > $(".main").height()){
		$(".main").css("height", hgt);
		$(window).resize(function(){
			hgt = window.innerHeight - $(".header").height() - $(".footer").height();
			$(".main").css("height", hgt);
		});
	}
	var hidden = true
	$(".flip").click(function() {
	
		$(".panel").toggle(function() {
			if(hidden) { 
				$(".panel").show(); 
			} else { 
				$(".panel").hide();
			}
			hidden = !hidden;
		});
	});

	if(isLoggedIn()){
		$(".verify").text("Account Info");
		$(".signin").hide();
		$(".signedin").show();
	}
	else{
		$(".signedin").hide();
	}
});

