var ws = null;
var wsStr = "";

function WSOpen(evt) {
  console.log("connectting");
}

function WSClose(evt) {
  console.log("dis connect !");
  ws.close(); //close websocket
  ws = null;
}

function WSMessage(evt) {
  msg = evt.data;
  //	msg.replace( "\r\n","</br>");
  document.getElementById("DISPLAY").innerHTML = msg;
  console.log(evt.data);
  ws.send("\r\n");
}
function WSError(evt) {
  ws.close();
  delete ws;
  console.log("Error occure!\r\nreconnect...\r\n");
  var delayInMilliseconds = 1000; //1 second
  setTimeout(function () {
    ws = newWS(wsStr);
  }, delayInMilliseconds);
}

function newWS(str) {
  wsStr = str;
  console.log("Connect:\t" + str);
  ws = new WebSocket(str);
  if (ws) {
    ws.onopen = WSOpen;
    ws.onclose = WSClose;
    ws.onmessage = WSMessage;
    ws.onerror = WSError;
  }
  return ws;
}

function connect(sw) {
  if (sw == "1") {
    if (ws) return;
    str = document.getElementById("ugvurl");
    wsStr = "ws://" + str.value;

    ws = newWS(wsStr);
    console.log(ws ? "connected" : "unconnect");
  } else {
    console.log(sw);
    if (ws) {
      ws.close();
      ws = null;
      console.log("websocket closed");
      document.getElementById("DISPLAY").innerHTML = "";
    }
  }
}
var sw = 0;
function arm() {
  msw = document.getElementById("msw");

  if (ws === undefined || ws === null) return;
  if (sw === "1") {
    sw = "0";
    msw.style.background = "red";
    msw.value = "Lock";
  } else {
    sw = "1";
    msw.style.background = "greenyellow";
    msw.value = "Unlock";
  }

  ws.send(sw == "1" ? "elevator arm\r\n" : "elevator disarm\r\n");
  sw === "1" ? (sw = "0") : (sw = "1");
}

function active(sw) {
  if (ws === undefined) return;
  if (sw == "UP") {
    ws.send("elevator up\r\n");
    return;
  }
  if (sw == "STOP") {
    ws.send("elevator stop\r\n");
    return;
  }
  if (sw == "DOWN") {
    ws.send("elevator down\r\n");
    return;
  }
  if (sw == "SPDUP") {
    ws.send("elevator speed up\r\n");
    return;
  }
  if (sw == "SPDDOWN") {
    ws.send("elevator speed down\r\n");
    return;
  }
}

function setCycle(sw) {
  if (sw == "STARTPT") {
    ws.send("elevator reset\r\n");
    return;
  }
  if (sw == "STOPPT") {
    ws.send("elevator set limit\r\n");
    return;
  }
  if (sw == "TEST") {
    ws.send("elevator down\r\n");
    return;
  }
  if (sw == "CYCLESET") {
    ws.send("elevator set reverse on\r\n");
    return;
  }
  if (sw == "CYCLESTOP") {
    ws.send("elevator set reverse off\r\n");
    return;
  }
}
