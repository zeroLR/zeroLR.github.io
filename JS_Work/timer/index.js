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
  tb = $("TIME");
  var x = tb.rows[0].cells;
  if (act == "[修改]") {
    if (editCmd == 0) {
      editCmd = 1;
      tb.rows[3].cells[0].innerHTML =
        "<input type='text' id='CMD'><input type='button' value='執行' onclick='execCmd()'>";
    }
    if ("content" in e.data) $("content").innerHTML = e.data["content"];
  } else {
    editCmd = 0;
    tb.rows[2].cells[0].innerHTML = "";
    tb.rows[3].cells[0].innerHTML = "";
    $("content").innerHTML = "";
  }
  if ("date" in e.data) x[1].innerHTML = e.data["date"];
  if ("time" in e.data) x[3].innerHTML = e.data["time"];
  if ("ACT" in e.data) {
    act = x[4].innerHTML = e.data["ACT"];
    $("SCHE").rows[$("SCHE").rows.length - 1].cells[0].innerHTML =
      act == "[修改]" && !onScheEdit
        ? "<input type='button' value='新增' onclick='newRule()'>"
        : "";
  }
  if ("wifi" in e.data) tb.rows[1].cells[1].innerHTML = e.data["wifi"];
  if ("RSSI" in e.data) tb.rows[1].cells[3].innerHTML = e.data["RSSI"];
  if ("SW" in e.data) {
    dt = e.data["SW"].split(",");
    console.log(dt);
    $("SW1").value = dt[0];
    $("SW2").value = dt[1];
    $("SW3").value = dt[2];
    for (let i = 1; i < dt.length + 1; i++) {
      dt[i - 1] == "啟動" || dt[i - 1] == "手開"
        ? ($("SW" + i).style.background = "lawngreen")
        : ($("SW" + i).style.background = "red");
    }
  }
  tb = $("MOISTURE");
  if (act != "[修改]") {
    tb.rows[1].cells[0].innerHTML = "";
  }
  if ("SMCV" in e.data) {
    tb.rows[0].cells[2].innerHTML = e.data["SMCV"];
  }
  if ("SMSV" in e.data) {
    tb.rows[0].cells[4].innerHTML = e.data["SMSV"];
    tb.rows[0].cells[6].innerHTML = e.data["SMSVD"];
    if (act == "[修改]" && kM == 0) {
      kM = 1;
      hStr =
        "設定值（％）<input type='number' id='SETSM' value='" +
        e.data["SMSV"] +
        "'><input type='button' value='確認' onclick='setSM(1)'><br/>";
      hStr +=
        "範圍 （＋—）<input type='number' id='SETSMD' value='" +
        e.data["SMSVD"] +
        "'><input type='button' value='確認' onclick='setSM(2)'><br/>";
      tb.rows[1].cells[0].innerHTML = hStr;
    }
  }
  tb = $("MOISREC");
  if ("MoisRd" in e.data) {
    tb.rows[0].cells[1].innerHTNL = e.data["MoisRd"];
  }
  if ("SCHE" in e.data) {
    tb = $("SCHE");
    if (act != "[修改]" && e.data["SCHE"].length < tb.rows.length - 2) {
      tb.deleteRow(tb.rows.length - 2);
      $("MAGIC").rows[0].cells[0].innerHTML = "";
    }
    for (i = 0; i < e.data["SCHE"].length; ++i) {
      if (i >= tb.rows.length - 2) {
        row = tb.insertRow(tb.rows.length - 1);
        for (j = 0; j < 6; ++j) {
          row.insertCell(j);
        }
      }
      row = tb.rows[i + 1];
      dt = e.data["SCHE"][i].split(",");
      console.log(dt);
      row.cells[0].innerHTML = dt[1];
      row.cells[1].innerHTML = dt[2];
      row.cells[2].innerHTML = dt[3];
      row.cells[3].innerHTML = dt[4];
      row.cells[4].innerHTML = dt[5];
      row.cells[5].innerHTML =
        "<input type='button' value='刪除' onclick=delRule('" +
        String(i) +
        "')>";
    }
  }
  if ("MR" in e.data) {
    console.log(e.data["MR"]);
  }
}
