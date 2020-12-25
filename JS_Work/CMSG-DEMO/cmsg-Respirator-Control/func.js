var sw = 1;
var sw_cmd = 1;
var control = document.getElementById("control");
var state = document.getElementById("state");
var main = document.getElementById("main");
var sys = document.getElementById("sys");
var cmd_btn = document.getElementById("btn-cmd");
var cmd_text = document.getElementById("cmd-text");
var log_result = document.getElementById("log-result");
var male = document.getElementById("male");
var female = document.getElementById("female");
var male_span = document.getElementById("span-male");
var female_span = document.getElementById("span-female");
var config = {};

function openCMD() {
  if (sw_cmd) {
    sw_cmd = 0;
    cmd_btn.value = "操作";
    cmd_btn.style = "background-color: red";
    main.style = "display: none";
    sys.style = "display: block";
  } else {
    sw_cmd = 1;
    cmd_btn.value = "命令";
    cmd_btn.style = "background-color: lime";
    main.style = "display: block";
    sys.style = "display: none";
  }
}
function execCMD() {
  if (cmd_text.value) window.localStorage.setItem(Date.now(), cmd_text.value);
  else alert("請輸入指令");
  showLog();
}

function showLog() {
  log_result.innerHTML = "";
  var result = window.localStorage;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const date = new Date(parseInt(key)).toLocaleDateString("en-US");
      const time = new Date(parseInt(key)).toLocaleTimeString("en-US");
      const element = result[key];
      log_result.innerHTML += `時間: ${date} ${time} <br> 命令: ${element}<br>`;
    }
  }
}

function clearLog() {
  if (window.localStorage.length) log_result.innerHTML = "";
  else alert("no log");
}

function switchPage() {
  if (sw) {
    sw = 0;
    control.style = "display: none";
    state.style = "display: block";
  } else {
    sw = 1;
    state.style = "display: none";
    control.style = "display: block";
  }
}

function swMale() {
  female.checked ? (female.checked = false) : undefined;
  male.checked ? undefined : (male.checked = true);
  male_span.style = "background-color: #2979e2";
  female_span.style = "background-color: #b3b3b3";
  config.sex = "male";
}

function swFemale() {
  female.checked ? undefined : (female.checked = true);
  male.checked ? (male.checked = false) : undefined;
  male_span.style = "background-color: #b3b3b3";
  female_span.style = "background-color: #f70a94";
  config.sex = "female";
}

function setOption(id) {
  var i = document.getElementById(id);
  config[id] = i.value;
}

function validator(config) {
  console.log(config);
}

function Reset() {
  alert("reset");
}
function Start() {
  validator(config);
  alert(JSON.stringify(config));
}
function Stop() {
  alert("stop");
}
