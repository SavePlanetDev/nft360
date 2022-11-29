const database = require("./database");

database
  .authenticate()
  .then(() => console.log("Database: Authenticated"))
  .catch((e) => console.log(e));
database
  .sync()
  .then(() => console.log("Database: Database Connected Successfully"))
  .catch((e) => console.log(e));
