const express = require("express");

const router = express.Router();

import managerRoute from './managerRoute'
import tableRoute from './tableRoute'
import customerRoute from './customerRoute'
import reservationRoute from './reservationRoute'
import paymentRoute from './paymentRoute'

const routesIndex = [
  {
    path: "/manager",
    route: managerRoute,
  },
  {
    path: "/table",
    route: tableRoute,
  },
  {
    path: '/customer',
    route: customerRoute
  },
  {
    path: '/reservation',
    route: reservationRoute
  },
  {
    path: '/payment',
    route: paymentRoute
  },

];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
