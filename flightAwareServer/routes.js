"use strict";

module.exports = function(ctx) {
  // extract context from passed in object
  const flightAware = require("./services/flightAwareService"),
    server = ctx.server;

  server.get("/schudeledflight", (req, res, next) => {
    flightAware
      .getSchudeledFlight()
      .then(flightTab => {
        res.send(200, { error: [], result: flightTab });
        next();
      })
      .catch(error => {
        res.send(500, error);
        next();
      });
  });
};
