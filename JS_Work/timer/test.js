var tb = document.getElementById("MOISTURE");
hStr =
  "設定值（％）<input type='number' id='SETSM'><input type='button' value='確認' onclick='setSM(1)'><br/>";
hStr +=
  "範圍（％）<input type='number' id='SETSM'><input type='button' value='確認' onclick='setSM(1)'><br/>";
tb.rows[1].cells[0].innerHTML = hStr;

function addckbox(boxname, prompt, ckfunc) {
  str = "<input type='checkbox' name='" + boxname + "' id='" + boxname + "'";
  str += ckfunc != "" ? "onchange='" + ckfunc + "'" : "";
  str += "><label for='" + boxname + "'>" + prompt + "</label><br/>";
  return str;
}

var row = document.getElementById("SCHE");
row = row.insertRow(row.rows.length - 1);
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
