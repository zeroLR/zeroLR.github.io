const net = require("net");
const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const { encode } = require("punycode");
var getdata;

//middleware
app.use(cors());
app.use(express.json());

const server = net
  .createServer((socket) => {
    socket.on("data", (data) => {
      try {
        if (data == "command1") {
          server.write("server get command1");
          console.log("server run command1");
        } else {
          socket.write(data); //response to python client
          io.emit("getMessage", data.toString("utf8")); // broadcast to client whitch connect to port 8081
          console.log(data.toString("utf8"));
        }

        getdata = data;
      } catch (error) {
        console.error(error);
      }
    });
  })
  .on("connection", (socket) => {
    console.log(
      `New connection from ${socket.remoteAddress}:${socket.remotePort}`
    );
  })
  .on("error", (err) => {
    throw err;
  });

// socketServer
// 未指定port位置，則會動態使用系統可用Port
server.listen(8080, "0.0.0.0", () => {
  address = server.address();
  console.log("opened server on %j", address);
});

// socketClient
const client = net.createConnection({ port: 9999 }, () => {
  console.log("connected to server!");
});
client.on("data", (data) => {
  console.log(encodeURI(data));
  io.emit("getMessage", data.toString("utf8"));
});

// webserver
app.get("/getdata", (req, res) => {
  res.send(`${getdata}`);
});

app.post("/command", (req, res) => {
  client.write("sendCommand");
  console.log(req.param("server"));
  res.send("hello");
});

const serverapp = require("http")
  .Server(app)
  .listen(8081, () => {
    console.log("listen port on 8081");
  });

const io = require("socket.io")(serverapp);

io.on("connection", (socket) => {
  console.log("web socket connect");
  /*只回傳給發送訊息的 client*/
  socket.on("getMessage", (message) => {
    socket.emit("getMessage", message);
  });

  /*回傳給所有連結著的 client*/
  socket.on("getMessageAll", (message) => {
    io.sockets.emit("getMessageAll", message);
  });

  /*回傳給除了發送者外所有連結著的 client*/
  socket.on("getMessageLess", (message) => {
    socket.broadcast.emit("getMessageLess", message);
  });

  socket.on("cmd", (message) => {
    client.write(message);
  });
});
