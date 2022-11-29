const database = require("./database");

database
  .authenticate()
  .then(() => console.log("authenticated"))
  .catch((e) => console.log(e));
database
  .sync()
  .then(() => console.log("DATABASE: Database Connected Successfully"))
  .catch((e) => console.log(e));
