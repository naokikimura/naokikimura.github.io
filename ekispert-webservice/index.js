$(function () {
  var now = new Date();
  $("#date").html(now.toLocaleDateString()).attr("datetime", now.toISOString().substring(0, 10));

  $('<figure id="result" title="経路検索結果"><iframe src="about:blank" frameborder="0"></iframe></figure>').appendTo("body");
  $("#result").dialog({
    autoOpen: false,
    width: "auto",
    show: { effect: "fade", duration: 700 },
    hide: { effect: "fade", duration: 700 }
  });
  $("#result iframe").on("load", function (e) {
    console.log("load");
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
      "date": $("#date").attr("datetime").replace(/\D/g, ""),
      "time": ("00" + Number($(".beginning .hour").val())).slice(-2) + ("00" + Number($(".beginning .minute").val())).slice(-2),
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
      $("#result").dialog("open");
    }).fail(function (xhr, statuText, err) {
      var response = xhr.responseJSON || JSON.parse(xhr.responseText);
      alert(response.ResultSet.Error.Message);
    });
  });

  $(".station").get().map(function (node) {
    var div = $('<div></div>', { id: uuid(), "class": "exp-gui-station-outer" }).insertAfter(node).get(0);
    var station = new expGuiStation(div);
    station.dispStation();
    station.bind("blur", function () {
      $(node).val(station.getStation());
      station.closeStationList();
    });
    $(node).css({ "display": "none" });
    return station;
  });

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
});
