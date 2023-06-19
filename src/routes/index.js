const express = require("express");

const router = express.Router();

import managerRoute from './managerRoute'
import tableRoute from './tableRoute'

const routesIndex = [
  {
    path: "/manager",
    route: managerRoute,
  },
  {
    path: '/table',
    route: tableRoute
  }

];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
