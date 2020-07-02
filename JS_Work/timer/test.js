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
  var s1 = document.getElementById("step1");
  var f = document.getElementById("final");
  wp.style.display = "table-row";
  b.style.display = "none";
  s1.style.display = "table-cell";
  f.style.display = "none";
}

function message() {
  var ul = document.getElementById("content");
  var li = document.createElement("li");
  li.innerHTML = "時間：0701 16:41 <br>通知： 馬達啟動";
  ul.insertBefore(li, ul.firstChild);
}
var mark = [0, 1, 2, 3, 4, 5];
function step(i) {
  var cur = document.getElementById("step" + (i - 1));
  var next = document.getElementById("step" + i);
  var wp = document.getElementById("setWP");
  var td = document.createElement("td");
  var b = document.getElementById("btn_WP");
  var f = document.getElementById("final");
  var w = document.getElementById("WP");
  var t = document.getElementById("threshold");
  if (i < 8) {
    cur.style.display = "none";
  }
  if (i == 7) {
    next.style.display = "table-cell";
    mark[5] = parseFloat(t.value);
    next.innerHTML = `請確認設定值<br><br>
    壓力上限 : ${mark[0]} <br>
    壓力下限 : ${mark[1]} <br>
    1站標準值 : ${mark[2]} <br>
    2站標準值 : ${mark[3]} <br>
    3站標準值 : ${mark[4]} <br>
    閥值(+-) : ${mark[5]} <br><br>
    若無誤請按儲存,重設請按取消並重複步驟<br>
    <button class="button-ok" onclick="step(8)">儲存</button>
    <button class="button-cancel" onclick="step(9)">取消</button>`;
  } else if (i == 8) {
    f.innerHTML = `壓力上限 : ${mark[0]} <br>
    壓力下限 : ${mark[1]} <br>
    1站標準值 : ${mark[2]} <br>
    2站標準值 : ${mark[3]} <br>
    3站標準值 : ${mark[4]} <br>
    閥值(+-) : ${mark[5]} <br>`;
    f.style.display = "table-cell";
    b.style.display = "flex";
    cur.style.display = "none";
    console.log(mark);
  } else if (i == 9) {
    var s7 = document.getElementById("step7");
    s7.style.display = "none";
    b.style.display = "flex";
  } else {
    mark[i - 2] = parseFloat(w.innerText);
    console.log(mark);
    next.style.display = "table-cell";
    f.style.display = "none";
  }
}
