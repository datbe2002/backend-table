const express = require("express");

const router = express.Router();

import managerRoute from './managerRoute'
import customerRoute from './customerRoute'

const routesIndex = [
  {
    path: "/manager",
    route: managerRoute,
  },
  {
    path: '/customer',
    route: customerRoute
  }

];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
