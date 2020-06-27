var w; // worker
var act;
var onScheEdit = 0;
var editCmd = 0;
var kM;
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
  // tb = $("TIME");
  // var x = tb.rows[0].cells;
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
    $("SW1").value = dt[0];
    $("SW2").value = dt[1];
    $("SW3").value = dt[2];
    for (let i = 1; i < dt.length + 1; i++) {
      dt[i - 1] == "ON" || dt[i - 1] == "M.ON"
        ? ($("SW" + i).style.background = "lawngreen")
        : ($("SW" + i).style.background = "red");
    }
  }

  if (act != "edit") {
    ControlTb("MOISTURE_edit", false);
  }
  if ("SMCV" in e.data) {
    $("MOISTURE_detect").innerHTML = e.data["SMCV"];
  }
  if ("SMSV" in e.data) {
    $("MOISTURE_set").innerHTML = e.data["SMSV"];
    $("MOISTURE_range").innerHTML = e.data["SMSVD"];
    if (act == "edit" && kM == 0) {
      kM = 1;
      ControlTb("MOISTURE_edit", true);
      $("SETSM").value = e.data["SMSV"];
      $("SETSMD").value = e.data["SMSVD"];
      $("MOISTURE_edit").innerHTML = hStr;
    }
  }
  // if ("MoisRd" in e.data) {
  //   $("MOISTURE_detect").innerHTNL = e.data["MoisRd"];
  // }

  // if ("SCHE" in e.data) {
  //   tb = $("SCHE");
  //   if (act != "edit" && e.data["SCHE"].length < tb.rows.length - 2) {
  //     tb.deleteRow(tb.rows.length - 2);
  //     $("MAGIC").rows[0].cells[0].innerHTML = "";
  //   }
  //   for (i = 0; i < e.data["SCHE"].length; ++i) {
  //     if (i >= tb.rows.length - 2) {
  //       row = tb.insertRow(tb.rows.length - 1);
  //       for (j = 0; j < 6; ++j) {
  //         row.insertCell(j);
  //       }
  //     }
  //     row = tb.rows[i + 1];
  //     dt = e.data["SCHE"][i].split(",");
  //     console.log(dt);
  //     row.cells[0].innerHTML = dt[1];
  //     row.cells[1].innerHTML = dt[2];
  //     row.cells[2].innerHTML = dt[3];
  //     row.cells[3].innerHTML = dt[4];
  //     row.cells[4].innerHTML = dt[5];
  //     row.cells[5].innerHTML =
  //       "<input type='button' value='刪除' onclick=delRule('" +
  //       String(i) +
  //       "')>";
  //   }
}
