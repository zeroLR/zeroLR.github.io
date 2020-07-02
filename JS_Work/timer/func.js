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

// 關閉壓力設定
function closeWP() {
  for (let i = 0; i < 7; i++) {
    $(`step${i + 1}`).style.display = "none";
  }
}
// 切換模式(0停止, 1自動, 2修改, 3手動)
function ckchm() {
  console.log("mode change");
  onScheEdit = 0;
  kM = 0;
  switch ($("ACT").options[$("ACT").selectedIndex].value) {
    case "stop":
      str = "change mode 0";
      closeWP();
      break;
    case "auto":
      str = "change mode 1";
      closeWP();
      break;
    case "edit":
      str = "change mode 2";
      break;
    case "manual":
      str = "change mode 3";
      break;
  }

  $("btn_WP").style.display = "none";
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
  closeWP();
}
// 開始設定出口壓力
function setWP() {
  $("setWP").style.display = "table-row";
  $("step1").style.display = "table-cell";
  $("btn_WP").style.display = "none";
  $("final").style.display = "none";
  postCmd("change mode 3"); //校正時進入手動狀態
}

// 等待函數
const delay = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
};
var n = 0;
// 依步驟設定
function step(i) {
  var cur = $("step" + (i - 1));
  var next = $("step" + i);

  if (i == 2) {
    const swap = async () => {
      // postCmd("swap motor"); //開啟馬達
      console.log("Open motor...");
      await delay(1000); // 等待一秒
      postCmd("swap SW1"); //開啟1站
      console.log("SW1 ON");
      await delay(5000); // 等待五秒
    };
    if (n) {
      $(`btn_set${i - 1}`).style.display = "none";
      next.style.display = "table-cell";
      store[i - 2] = parseFloat($("WP").innerText);
      console.log(store);
      cur.style.display = "none";
      n = 0;
    } else {
      swap();
      $(`btn_step${i - 1}`).style.display = "none";
      $(`btn_set${i - 1}`).style.display = "block";
      n = 1;
    }
  } else if (i == 3) {
    const swap = async () => {
      postCmd("swap SW1"); //關閉1站
      console.log("SW1 OFF");
      await delay(1000); // 等待一秒
      postCmd("swap SW2"); //開啟2站
      console.log("SW2 ON");
      await delay(5000); // 等待五秒
    };
    if (n) {
      $(`btn_set${i - 1}`).style.display = "none";
      next.style.display = "table-cell";
      store[i - 2] = parseFloat($("WP").innerText);
      console.log(store);
      cur.style.display = "none";
      n = 0;
    } else {
      swap();
      $(`btn_step${i - 1}`).style.display = "none";
      $(`btn_set${i - 1}`).style.display = "block";
      n = 1;
    }
  } else if (i == 4) {
    const swap = async () => {
      postCmd("swap SW2"); //關閉2站
      console.log("SW2 OFF");
      await delay(1000); // 等待一秒
      postCmd("swap SW3"); //開啟3站
      console.log("SW3 ON");
      await delay(5000); // 等待五秒
    };
    if (n) {
      $(`btn_set${i - 1}`).style.display = "none";
      next.style.display = "table-cell";
      store[i - 2] = parseFloat($("WP").innerText);
      console.log(store);
      cur.style.display = "none";
      n = 0;
    } else {
      swap();
      $(`btn_step${i - 1}`).style.display = "none";
      $(`btn_set${i - 1}`).style.display = "block";
      n = 1;
    }
  } else if (i == 5) {
    next.style.display = "table-cell";
    store[i - 2] = parseFloat($("WP").innerText);
    console.log(store);
    cur.style.display = "none";
  } else if (i == 6) {
    const swap = async () => {
      // postCmd("swap motor"); //關閉馬達
      console.log("SW2 OFF");
      await delay(500); // 等待0.5秒
    };
    if (n) {
      $(`btn_set${i - 1}`).style.display = "none";
      next.style.display = "table-cell";
      store[i - 2] = parseFloat($("WP").innerText);
      console.log(store);
      cur.style.display = "none";
      n = 0;
    } else {
      swap();
      $(`btn_step${i - 1}`).style.display = "none";
      $(`btn_set${i - 1}`).style.display = "block";
      n = 1;
    }
  } else if (i == 7) {
    next.style.display = "table-cell";
    store[5] = parseFloat($("threshold").value);
    next.innerHTML = `請確認設定值<br><br>
      1站標準值 : ${store[0]} <br>
      2站標準值 : ${store[1]} <br>
      3站標準值 : ${store[2]} <br>
      壓力下限 : ${store[3]} <br>
      壓力上限 : ${store[4]} <br>
      閥值(+-) : ${store[5]} <br><br>
      若無誤請按儲存,重設請按取消並重複步驟<br>
      <button class="button-ok" onclick="step(8)">儲存</button><br>
      <button class="button-cancel" onclick="step(9)">取消</button>`;
    cur.style.display = "none";
  } else if (i == 8) {
    $("final").innerHTML = `1站標準值 : ${store[0]} <br>
     2站標準值 : ${store[1]} <br>
     3站標準值 : ${store[2]} <br>
     壓力下限 : ${store[3]} <br>
     壓力上限 : ${store[4]} <br>
     閥值(+-) : ${store[5]} <br>`;
    $("final").style.display = "table-cell";
    $("btn_WP").style.display = "block";
    cur.style.display = "none";
    mark = store;
    console.log(store);
    str =
      "setWP" +
      ` ${mark[0]}` +
      ` ${mark[1]}` +
      ` ${mark[2]}` +
      ` ${mark[3]}` +
      ` ${mark[4]}` +
      ` ${mark[5]}`;
    postCmd(str);
    cur.style.display = "none";
  } else if (i == 9) {
    $("step7").style.display = "none";
    $("btn_WP").style.display = "block";
  }
}

// 輸入文字執行命令
function execCmd() {
  editCmd = 0;
  str = $("CMD_text").value;
  // str = $("CMD").options[$("CMD").selectedIndex].text;
  postCmd(str);
}
