$( function () {
  $.get("/users/"+$("#uid").attr("val") , function (data, err) {
    $("#name").text(data.name)
    $("#email").text(data.email)
    $("#email").attr("href", "mailto:"+data.email)
    $("#phone").text(data.phone)
    $("#phone").attr("href", "tel:" +data.phone)
    $("#profpic").attr("src", data.picture)
  });
});