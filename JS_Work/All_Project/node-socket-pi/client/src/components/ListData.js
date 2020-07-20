import React, { Fragment, useEffect, useState } from "react";
import webSocket from "socket.io-client";
const ListData = () => {
  const [ws, setWs] = useState(null);
  const [m, setM] = useState([]);
  const [cmd, setCmd] = useState([]);

  const connectWebSocket = () => {
    setWs(webSocket("192.168.43.106:8081"));
  };
  // connected with websocket when ws change
  useEffect(() => {
    if (ws) {
      console.log("success connect!");
      initWebSocket();
    }
  }, [ws]);
  // connected when web refresh
  useEffect(() => {
    connectWebSocket();
  }, []);

  // get message on "getMessage"
  const initWebSocket = () => {
    ws.on("getMessage", (message) => {
      console.log(message);
      setM(message);
      // localStorage.setItem("data", message); 儲存data
    });
  };
  // send cmd on "cmd"
  const sendCmd = (command) => {
    ws.emit("cmd", command);
  };

  const $ = (id) => {
    return document.getElementById(id);
  };
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <td width="30%">
              <h1>message from device</h1>
            </td>
            <td width="30%">
              <h1>send CMD to device</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h2>{m}</h2>
            </td>
            <td>
              <input id="cmd"></input>
              <button onClick={() => sendCmd($("cmd").value)}>sendCmd</button>
              <h2></h2>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListData;
