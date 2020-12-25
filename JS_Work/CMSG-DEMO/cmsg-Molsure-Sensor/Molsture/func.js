// 開啟/關閉table
function ControlTb(id, bool = false) {
  var id = document.getElementById(id);
  if (bool) {
    id.style.display = "table-row";
  } else {
    id.style.display = "none";
  }
}

// 顯示目前模式
function showACT(act) {
  $("ACT").value = act;
}

// 根據傳入字串執行對應function
function postCmd(str) {
  if (str === "") return;
  jsonCmd = { SENDCMD: str };
  console.log(jsonCmd);
  w.postMessage(jsonCmd);
}
// 切換模式(0停止, 1自動, 2修改, 3手動)
function ckchm() {
  console.log("mode change");
  onScheEdit = 0;
  kM = 0;
  switch ($("ACT").options[$("ACT").selectedIndex].value) {
    case "stop":
      str = "change mode 0";
      break;
    case "auto":
      str = "change mode 1";
      break;
    case "edit":
      str = "change mode 2";
      break;
    case "manual":
      str = "change mode 3";
      break;
  }
  postCmd(str);
}
// 開始修改時間
function upTm(cell) {
  if (act != "edit") return;
  ControlTb("date_edit", true);
}
// 取消修改時間
function abET() {
  ControlTb("date_edit", false);
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
  onScheEdit = 1;
  ControlTb("time_edit", true);
  ControlTb("MAGIC_edit", true);
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
  $("all").checked == true
    ? ControlTb("alltm", true)
    : ControlTb("alltm", false);
}
// 新增灑水時間設定
function appSche(i) {
  onScheEdit = 0;
  if (i) {
    var row = $("SCHE").rows[$("SCHE").rows.length - 3];
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
  ControlTb("time_edit", false);
  ControlTb("MAGIC_edit", false);
}
// 刪除時間設定
function delRule(i) {
  if (act != "edit") return;
  str = "del Sche " + parseInt(i);
  postCmd(str);
}
// 切換灑水狀態
function BTSW(bt) {
  if (act != "manual") return;
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
  str = $("CMD_text").value;
  // str = $("CMD").options[$("CMD").selectedIndex].text;
  postCmd(str);
}
