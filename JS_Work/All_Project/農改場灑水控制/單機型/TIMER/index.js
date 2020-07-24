var w; // worker
var act;
var onScheEdit = 0;
var editCmd = 0;
var kM;
var WPsetting;
// 取得id
function $(id) {
  return document.getElementById(id);
}
// 連上網站
function connect() {
  if (typeof Worker === "undefined") {
    console.log("not support Worker");
    return;
  }
  if (typeof w === "undefined") {
    w = new Worker("./worker.js");
    w.onmessage = wkMsg;
  }
  cmd = { URL: document.URL };
  w.postMessage(cmd);
}
// 取得網站傳回的資料
function wkMsg(e) {
  if (act == "edit") {
    if (editCmd == 0) {
      editCmd = 1;
      ControlTb("CMD", true);
    }
  }
  if ("date" in e.data) $("date").innerHTML = e.data["date"];
  if ("time" in e.data) $("time").innerHTML = e.data["time"];
  if ("ACT" in e.data) {
    act = e.data["ACT"];
    showACT(act);
    if (act == "edit" && !onScheEdit) {
      ControlTb("CMD", true);
      ControlTb("time_add", true);
    } else {
      ControlTb("CMD", false);
      ControlTb("time_add", false);
    }
  }
  if ("wifi" in e.data) $("wifi").innerHTML = e.data["wifi"];
  if ("RSSI" in e.data) $("RSSI").innerHTML = e.data["RSSI"];
  if ("SW" in e.data) {
    dt = e.data["SW"].split(",");
    console.log(dt);
    $("SW1").value = "1-" + dt[0];
    $("SW2").value = "2-" + dt[1];
    $("SW3").value = "3-" + dt[2];
    for (let i = 1; i < dt.length + 1; i++) {
      if (dt[i - 1] == "ON" || dt[i - 1] == "M.ON") {
        $("SW" + i).style.background = "lawngreen";
      } else if (dt[i - 1] == "IDLE" || dt[i - 1] == "M.IDLE") {
        $("SW" + i).style.background = "blue";
        $("SW" + i).style.color = "white";
      } else if (dt[i - 1] == "OFF" || dt[i - 1] == "M.OFF") {
        $("SW" + i).style.background = "red";
        $("SW" + i).style.color = "#211e55";
      }
    }
  }

  if ("WP" in e.data) {
    $("WP").innerHTML = e.data["WP"];
  }
  if ("WPH" in e.data) {
    WPsetting = e.data;
  }
  if ("WPL" in e.data) {
  }
  if ("WPR" in e.data) {
  }
  if ("WPS" in e.data) {
  }

  if ("SCHE" in e.data) {
    tb = $("SCHE");
    if (act != "edit" && e.data["SCHE"].length < tb.rows.length - 2) {
      ControlTb("time_edit", false);
      ControlTb("MAGIC_edit", false);
    }
    for (i = 0; i < e.data["SCHE"].length; ++i) {
      if (i >= tb.rows.length - 3) {
        row = tb.insertRow(tb.rows.length - 2);
        // row.id = String(i + 1);
      }
      row = tb.rows[i + 1];
      row.id = String(i + 1);
      dt = e.data["SCHE"][i].split(",");
      console.log(dt);
      row.innerHTML =
        "<td data-label='週期'>" +
        dt[1] +
        "</td>" +
        "<td data-label='時間'>" +
        dt[2] +
        "</td>" +
        "<td data-label='1站'>" +
        dt[3] +
        "</td>" +
        "<td data-label='2站'>" +
        dt[4] +
        "</td>" +
        "<td data-label='3站'>" +
        dt[5] +
        "</td>" +
        "<td>" +
        "<input class='button-cancel' type='button' value='刪除' onclick=delRule('" +
        String(i + 1) +
        "')>" +
        "</td>";
    }
  }
}
