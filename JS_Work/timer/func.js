// 根據傳入字串執行對應function
function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}
// 切換模式(自動, 手動, 修改, 停止)
function ckchm() {
  console.log("mode change");
  onScheEdit = 0;
  kM = 0;
  str = "change mode";
  postCmd(str);
}
// 開始修改時間
function upTm(cell) {
  if (act != "[修改]") return;
  var x = $("TIME").rows[2].cells[0];
  x.innerHTML =
    "修改日期:<input type='datetime-local' id='EDT'><input type='button' value='確認' onclick='setTm()'><input type='button' value='取消' onclick='abET()'>";
}
// 取消修改時間
function abET() {
  $("TIME").rows[2].cells[0].innerHTML = "";
}
// 確定修改時間
function setTm() {
  d = new Date();
  str = "set time " + $("EDT").value + " " + d.getDay();
  postCmd(str);
  abET();
}
// 開始灑水時間設定
function newRule() {
  var row = $("SCHE").insertRow($("SCHE").rows.length - 1);
  row.insertCell(0).innerHTML =
    "<input type='button' value='儲存' onclick='appSche(1)'><input type='button' value='取消' onclick='appSche(0)'>";
  row.insertCell(0).innerHTML = "<input type='number' id='v3' value='0'>";
  row.insertCell(0).innerHTML = "<input type='number' id='v2' value='0'>";
  row.insertCell(0).innerHTML = "<input type='number' id='v1'value='0'>";
  row.insertCell(0).innerHTML = "<input type='time' id='tm'>";
  str = addckbox("d0", "每一天");
  str += addckbox("w0", "星期日");
  str += addckbox("w1", "星期一");
  str += addckbox("w2", "星期二");
  str += addckbox("w3", "星期三");
  str += addckbox("w4", "星期四");
  str += addckbox("w5", "星期五");
  str += addckbox("w6", "星期六");
  row.insertCell(0).innerHTML = str;
  $("MAGIC").rows[0].cells[0].innerHTML = addckbox("all", "全開", "ckAll(1)");
  $("SCHE").rows[$("SCHE").rows.length - 1].cells[0].innerHTML = "";

  onScheEdit = 1;
}
// 添加checkbox
function addckbox(boxname, prompt, ckfunc) {
  str = "<input type='checkbox' name='" + boxname + "' id='" + boxname + "'";
  str += ckfunc != "" ? "onchange='" + ckfunc + "'" : "";
  str += "><label for='" + boxname + "'>" + prompt + "</label><br/>";
  return str;
}
// 控制器全開同時灑水
function ckAll(i) {
  $("MAGIC").rows[0].cells[0].innerHTML = addckbox(
    "all",
    "全開",
    i ? "ckAll(0)" : "ckAll(1)"
  );
  if (i) {
    $("MAGIC").rows[0].cells[0].innerHTML +=
      "<input type='number' id='alltm' value='0'>";
    $("all").checked = true;
  }
}
// 新增灑水時間設定
function appSche(i) {
  onScheEdit = 0;
  if (i) {
    var row = $("SCHE").rows[$("SCHE").rows.length - 2];
    mm = parseInt($("SCHE").rows.length - 2);
    str = "add Sche ";
    str += mm > 9 ? mm : "0" + mm;
    str += ",";
    if ($("d0").checked) {
      str += "FF";
    } else {
      wk = 0;
      for (i = 0; i < 7; ++i) {
        wk |= $("w" + String(i)).checked ? 1 << i : 0x00;
      }

      str += wk > 15 ? wk.toString(16) : "0" + wk.toString(16);
    }
    str += ",";
    str += $("tm").value;

    mm = $("all").checked ? parseInt($("alltm").value) : 0;
    tall = mm > 9 ? mm : "0" + mm;

    mm = parseInt($("v1").value);
    str += ",";
    str += tall !== "00" ? tall : mm > 9 ? mm : "0" + mm;

    mm = parseInt($("v2").value);
    str += ",";
    str += tall !== "00" ? tall : mm > 9 ? mm : "0" + mm;

    mm = parseInt($("v3").value);
    str += ",";
    str += tall !== "00" ? tall : mm > 9 ? mm : "0" + mm;
    str += ",";
    str += tall;
    postCmd(str);
  }
  $("SCHE").deleteRow($("SCHE").rows.length - 2);
  $("MAGIC").rows[0].cells[0].innerHTML = "";
}
// 刪除時間設定
function delRule(i) {
  if (act != "[修改]") return;
  str = "del Sche " + parseInt(i);
  postCmd(str);
}
// 切換灑水狀態
function BTSW(bt) {
  if (act != "[手動]") return;
  str = "swap " + bt.id;
  postCmd(str);
}

// 溼度偵測設定值修改
function setSM(i) {
  kM = 0;
  str =
    i == 1
      ? "set SM SV " + $("SETSM").value
      : i == 2
      ? "set SM Delta " + $("SETSMD").value
      : "";
  postCmd(str);
}
// 輸入文字執行命令
function execCmd() {
  editCmd = 0;
  str = $("CMD").value;
  // str = $("CMD").options[$("CMD").selectedIndex].text;
  postCmd(str);
}
