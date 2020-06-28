const pg = require("pg-promise/typescript/pg-subset");

var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://postgres:jkc695kcd@localhost:5432/transportApi");

db.one("SELECT $1 AS value", 123)
  .then(function (data) {
    console.log("DATA:", data.value);
  })
  .catch(function (error) {
    console.log("ERROR:", error);
  });
