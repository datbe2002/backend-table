const express = require("express");

const router = express.Router();

import managerRoute from './managerRoute'

const routesIndex = [
  {
    path: "/manager",
    route: managerRoute,
  },
  // {
  //   path: '/customer',
  //   route: customerRoute
  // }

];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
