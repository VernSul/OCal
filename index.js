
const app = require('./server');
const routes = app._router.stack;

let router_counter = 0;

for (let i = 0; i < routes.length; i++) {
  if (routes[i].route) {
    router_counter++;
  }
}