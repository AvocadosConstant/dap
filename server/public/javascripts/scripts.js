$(document).ready(function(){
	$(".main").css("height", window.innerHeight - 240);
	$(window).resize(function(){
		$(".main").css("height", window.innerHeight - 240);
	});
});