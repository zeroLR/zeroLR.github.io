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
      message(`通知 ： 切換到停止模式<br>CMD:${str}`);
      break;
    case "auto":
      str = "change mode 1";
      message(`通知 ： 切換到自動模式<br>CMD:${str}`);
      break;
    case "edit":
      str = "change mode 2";
      message(`通知 ： 切換到修改模式<br>CMD:${str}`);
      break;
    case "manual":
      str = "change mode 3";
      message(`通知 ： 切換到手動模式<br>CMD:${str}`);
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
  message(`通知 ：　修改時間`);
  postCmd(str);
  abET();
}

// 開始灑水時間設定
function newRule() {
  onScheEdit = 1;
  ControlTb("time_edit", true);
  ControlTb("MAGIC_edit", true);
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
    mm = parseInt($("SCHE").rows.length - 2);
    message(`通知 ：　增加時間設定${mm}`);
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
  $(`${i}`).remove();
  str = "del Sche " + parseInt(i);
  message(`通知 ：　刪除時間設定${i}`);
  postCmd(str);
}
// 切換灑水狀態
function BTSW(bt) {
  if (act != "manual") return;
  str = "swap " + bt.id;
  postCmd(str);
}

// 輸入文字執行命令
function execCmd() {
  editCmd = 0;
  str = $("CMD_text").value;
  // str = $("CMD").options[$("CMD").selectedIndex].text;
  postCmd(str);
}

// 訊息顯示
function message(str) {
  var li = document.createElement("li");
  li.innerHTML = `日期: ${$("date").innerText}<br>時間: ${
    $("time").innerText
  }<br>${str}`;
  $("content").insertBefore(li, $("content").firstChild);
}
