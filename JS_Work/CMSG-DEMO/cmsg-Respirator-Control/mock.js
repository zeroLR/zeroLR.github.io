var sw = 1;
var sw_cmd = 1;
var config = {};

function $(id) {
  return document.getElementById(id);
}

// 執行指令
function execCMD() {
  if ($("cmd-text").value) {
    console.log($("cmd-text").value);
    window.localStorage.setItem(Date.now(), $("cmd-text").value);
  } else alert("請輸入指令");
  showLog();
}

// Log顯示
function showLog() {
  $("log-result").innerHTML = "";
  var result = window.localStorage;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const date = new Date(parseInt(key)).toLocaleDateString("en-US");
      const time = new Date(parseInt(key)).toLocaleTimeString("en-US");
      const element = result[key];
      $(
        "log-result"
      ).innerHTML += `時間: ${date} ${time} <br> 命令: ${element}<br>`;
    }
  }
}

// 清除Log
function clearLog() {
  if (window.localStorage.length) $("log-result").innerHTML = "";
  else alert("no log");
}

// 切換功能頁面
function swPage() {
  switch ($("page").options[$("page").selectedIndex].value) {
    case "control":
      $("control").style = "display: block";
      $("state").style = "display: none";
      $("sys").style = "display: none";
      break;
    case "state":
      $("control").style = "display: none";
      $("state").style = "display: block";
      $("sys").style = "display: none";
      break;
    case "sys":
      $("control").style = "display: none";
      $("state").style = "display: none";
      $("sys").style = "display: block";
      break;
    case "help":
      window.open(`${window.location.origin}/help.html`, "_blank");
      $("page").value = "control";
      $("control").style = "display: block";
      $("state").style = "display: none";
      $("sys").style = "display: none";

      break;
    default:
      break;
  }
}

// 選擇男性
function swMale() {
  $("female").checked ? ($("female").checked = false) : undefined;
  $("male").checked ? undefined : ($("male").checked = true);
  $("span-male").style = "background-color: #2979e2";
  $("span-female").style = "background-color: #b3b3b3";
  config.sex = "male";
}

// 選擇女性
function swFemale() {
  $("female").checked ? undefined : ($("female").checked = true);
  $("male").checked ? ($("male").checked = false) : undefined;
  $("span-male").style = "background-color: #b3b3b3";
  $("span-female").style = "background-color: #f70a94";
  config.sex = "female";
}

// 參數設定
function setOption(id) {
  config[id] = $(id).value;
}

// 檢查輸入資訊
function validator(config) {
  console.log(config);
}

// 重設
function Reset() {
  // alert("reset");
}

// 啟動
function Start() {
  validator(config);
  setTimeout(() => {
    alert(JSON.stringify(config));
  }, 1000);
}

// 停止
function Stop() {
  // alert("stop");
}

// 顯示WIF清單
function showWifi() {
  $("mask").style = "display: block";
  $("wifi-content").style = "display: block";
  scanWifi();
}

// 顯示已搜尋WIFI清單
function scanWifi() {
  // "{SENDCMD: 'AP scan'}"
  // res : ESP8266回傳的scan資料
  var res =
    "RD01|RD01|RD01|RD01|RD01|RD01|RD01|RD01|RD01|RD01|SGRD|greenhouse|";

  $("wifi-now").innerHTML = $("wifi").value;
  $("wifi-result").innerHTML = "";
  var res_result = res.split("|");
  // wait for res
  setTimeout(() => {
    res_result.forEach((e) => {
      if (e === "") return;
      console.log(e);
      $(
        "wifi-result"
      ).innerHTML += `<li><input class="w-btn" type="button" value=${e} onclick="showPWD(this)"></li>`;
    });
  }, 1500);
}

// 關閉
function closeWifi() {
  $("wifi-content").style = "display: none";
  $("mask").style = "display: none";
  $("pwd").value = "";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
}
var SSID;
// 輸入密碼視窗
function showPWD(t) {
  $("wifi-list").style = "display: none";
  $("wifi-pwd").style = "display: block";
  SSID = t.value;
}

// AP connect
function APconnect() {
  var PWD = $("pwd").value;
  setTimeout(() => {
    var cmd = `{ SENDCMD: "AP connect [${SSID}]:[${PWD}]" }`;
    alert(cmd);
    $("wifi").value = SSID;
    $("wifi-content").style = "display: none";
    $("mask").style = "display: none";
    $("wifi-pwd").style = "display: none";
    $("wifi-list").style = "display: block";
    $("pwd").value = "";
    window.localStorage.setItem(Date.now(), cmd);
  }, 1000);
}

// 取消密碼輸入
function APcancel() {
  $("pwd").value = "";
  $("wifi-pwd").style = "display: none";
  $("wifi-list").style = "display: block";
  scanWifi();
}
