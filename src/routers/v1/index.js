const express = require("express");
const router = express.Router();

const memberRoutes = require("./member.routes");

let defaultRoutes = [];

if (process.env.production == "PROD") {
  defaultRoutes = [
    {
      path: "/members",
      route: memberRoutes,
    },
  ];
} else {
  defaultRoutes = [
    {
      path: "/members",
      route: memberRoutes,
    },
  ];
}

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
