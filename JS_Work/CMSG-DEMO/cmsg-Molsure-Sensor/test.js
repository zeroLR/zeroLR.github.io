function upTm() {
  var d = document.getElementById("date_edit");
  d.style.display = "table-row";
}

function showCMD() {
  var d = document.getElementById("CMD_text");
  var c = document.getElementById("CMD");
  d.parentElement.parentElement.style.display = "table-row";
  console.log(d.value);
  console.log(c);
}

function setTm() {
  var d = document.getElementById("EDT");
  console.log(d.value);
}

function abET() {
  var d = document.getElementById("date_edit");
  d.style.display = "none";
}

function testTm() {
  var d = document.getElementById("wifi");
  console.log(d);
  d.innerHTML = "555";
}

function print() {
  var s = document.getElementById("ACT");
  s = s.options[s.selectedIndex].value;
  console.log(s);
}

function addEvent() {
  var a = document.getElementById("event_add");
  var e = document.getElementById("evnet_edit");

  e.style.display = "table-row";
  a.style.display = "none";
}

function appEvent(i) {
  var a = document.getElementById("event_add");
  var e = document.getElementById("evnet_edit");
  var tb = document.getElementById("EVENT");
  var token = document.getElementById("token");
  var mark1 = document.getElementById("mark1");
  var mark2 = document.getElementById("mark2");
  var tem = document.getElementById("temperature");
  var water = document.getElementById("water");
  var m = document.getElementById("message");
  if (i) {
    console.log(
      "token: " +
        token.value +
        "\n" +
        mark1.value +
        tem.value +
        mark2.value +
        water.value +
        "\n" +
        "message: " +
        m.value
    );

    row = tb.insertRow(tb.rows.length - 2);
    row.id = "event" + String(tb.rows.length - 3);

    row = tb.rows[tb.rows.length - 3];
    dt = "";
    row.innerHTML =
      "<td data-label='Line權杖'>" +
      token.value +
      "</td>" +
      "<td data-label='事件'>" +
      mark1.value +
      tem.value +
      bool.value +
      mark2.value +
      water.value +
      "</td>" +
      "<td data-label='訊息'>" +
      m.value;
  }
  e.style.display = "none";
  a.style.display = "table-row";
}

function ckchm() {
  var a = document.getElementById("ACT");
  var wp = document.getElementById("setWP");
  var b = document.getElementById("btn_WP");
  console.log(a.value);
  if (a.value == "edit") {
    b.style.display = "flex";
  } else {
    b.style.display = "none";
    wp.style.display = "none";
  }
}

function setWP() {
  var wp = document.getElementById("setWP");
  var b = document.getElementById("btn_WP");
  wp.style.display = "table-row";
  b.style.display = "none";
}

function message() {
  var ul = document.getElementById("content");
  var li = document.createElement("li");
  li.innerHTML = "時間：0701 16:41 <br>通知： 馬達啟動";
  ul.insertBefore(li, ul.firstChild);
}
