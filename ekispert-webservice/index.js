$(function () {
  $("#date").val((new Date()).toISOString().substring(0, 10));
  $("#result").dialog({
    autoOpen: false,
    width: "auto",
    show: { effect: "fade", duration: 700 },
    hide: { effect: "fade", duration: 700 }
  });
  $("#result iframe").on("load", function (e) {
    console.log("load");
    $("#result").dialog("open");
  });
  $(".amount").after('<button type="button" class="search"><img src="./icon_150050.svg" alt="経路検索" /></button>');
  $(".search").on("click", function (e) {
    console.log("search");
    $("#result").dialog("close");
    $("#result").dialog({
      position: { my: "right top", at: "right bottom", of: this }
    });

    var params = {
      "key": "LE_aYYhp8kwYt3Yb",
      "date": $("#date").val().replace(/\D/g, ""),
      "time": "0900",
      "from": $(this).parents("tr").find(".from").val(),
      "to": $(this).parents("tr").find(".to").val(),
      "contentsMode": "sp"
    };
    var url = "https://api.ekispert.jp/v1/json/search/course/light?" + $.param(params);
    $.get({
      crossDomain: true,
      url: url,
      dataType: "json"
    }).done(function (response) {
      console.log(response);
      var src = response.ResultSet.ResourceURI.replace(/^http:/, "https:");
      $("#result iframe").attr("src", src);
    }).fail(function (xhr, statuText, err) {
      var response = xhr.responseJSON || JSON.parse(xhr.responseText);
      alert(response.ResultSet.Error.Message);
    });
  });
});
