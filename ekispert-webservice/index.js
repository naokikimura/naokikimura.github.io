window.onload = function () {
  document.getElementById("date").value = new Date().toISOString().substring(-1, 10);
  var figure = document.getElementById("result");
  var iframe = figure.querySelector("iframe");
  var a = figure.querySelector(".close");
  a.addEventListener("click", function (e) {
    e.preventDefault();
    figure.classList.add("hidden");
  });
  iframe.addEventListener("load", function (e) {
    figure.classList.remove("hidden");
  });
  var button = document.getElementById("search");
  button.addEventListener("click", function (e) {
    console.log("search");
    figure.classList.add("hidden");
    var toQueryString = function (params) {
      return Object.keys(params).map(function (e) { return [e, params[e]]; })
        .reduce(function (p, c) { return p + "&" + c[0] + "=" + encodeURIComponent(c[1]); }, "?");
    };
    var params = {
      "key": "LE_aYYhp8kwYt3Yb",
      "date": document.getElementById("date").value.replace(/\D/g, ""),
      "time": "0900",
      "from": document.getElementById("from").value,
      "to": document.getElementById("to").value,
      "contentsMode": "sp"
    };
    var url = "https://api.ekispert.jp/v1/json/search/course/light" + toQueryString(params);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.responseType = "json";
    xhr.onload = function(e) {
      console.log(this.response);
      var response = typeof this.response == "string" ? JSON.parse(this.response) : this.response;
      if (this.status == 200) {
        console.log(response.ResultSet.ResourceURI);
        // var win = window.open(response.ResultSet.ResourceURI);
        iframe.src = response.ResultSet.ResourceURI.replace(/^http:/, "https:");
      } else if (this.status == 400) {
        alert(response.ResultSet.Error.Message);
      }
    };
    xhr.send();
  });
}
