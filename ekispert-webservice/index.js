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
  $("#search").on("click", function (e) {
    console.log("search");
    $("#result").dialog("close");
    $("#result").dialog({
      position: { my: "right top", at: "right bottom", of: this }
    });

    var params = {
      "key": "LE_aYYhp8kwYt3Yb",
      "date": $("#date").val().replace(/\D/g, ""),
      "time": "0900",
      "from": $("#from").val(),
      "to": $("#to").val(),
      "contentsMode": "sp"
    };
    $.get({
      crossDomain: true,
      url: "https://api.ekispert.jp/v1/json/search/course/light?" + $.param(params),
      dataType: "json"
    }).done(function (response) {
      console.log(response);
      $("#result iframe").attr("src", response.ResultSet.ResourceURI.replace(/^http:/, "https:"));
    }).fail(function (xhr, statuText, err) {
      var response = xhr.responseJSON || JSON.parse(xhr.responseText);
      alert(response.ResultSet.Error.Message);
    });
  });
});
