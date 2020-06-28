var express = require("express");
var app = express();

const cb0 = (req, res, next) => {
  console.log("CB0");
  res.sendStatus(200);
  next();
};

const cb1 = (req, res, next) => {
  console.log("CB1");
  //   res.redirect("https://google.com");
  next();
};

const cb2 = (req, res, next) => {
  console.log("CB2");
  next();
};

app.get("/example/c", [cb0, cb1, cb2]);

app.get(
  "/example/d",
  [cb0, cb1],
  function (req, res, next) {
    console.log("the response will be sent by the next function ...");
    next();
  },
  function (req, res) {
    res.download("A:\\zeroLR.github.io\\JS_Work\\timer\\index.html");
  }
);

app.all(
  "/secret",
  function (req, res, next) {
    console.log("Accessing the secret section ...");
    next();
  },
  function (req, res) {
    res.sendFile("A:\\zeroLR.github.io\\JS_Work\\timer\\index.html");
  }
);

app
  .route("/book")
  .get(function (req, res) {
    res.send("get a random book");
  })
  .post(function (req, res) {
    res.send("add a book");
  })
  .put(function (req, res) {
    res.send("update the book");
  });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

const Square = require("./square");
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);

setTimeout(() => {
  console.log("first");
}, 3000);

console.log("second");

var wiki = require("./wiki.js");

app.use("/wiki", wiki);
