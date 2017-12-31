"use strict";

/**
 * Module Dependencies
 */
const config = require("./config"),
  flightAware = require("./services/flightAwareService"),
  restify = require("restify"),
  corsMiddleware = require("restify-cors-middleware");

/**
 * Initialize Server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version,
  acceptable: config.acceptable,
  strictRouting: config.strictRouting
});

/*
 * CORS Middleware
 */

const cors = corsMiddleware({
  preflightMaxAge: -1,
  origins: ["*"] // in the futur will be website url
  //allowHeaders: ["API-Token"],
  //exposeHeaders: ["API-Token-Expiry"]
});
server.pre(cors.preflight);
server.use(cors.actual);

/**
 * Middleware for checking if POST request are in json
 *
server.pre(function rejectNonJSON(req, res, next) {
  console.log(req.header("content-type"));
  if (
    (req.header("content-type") !== "application/json" &&
      req.method === "POST") ||
    (req.header("content-type") !== "application/json; charset=utf-8" &&
      req.method === "POST")
  ) {
    res.send(415, "Only accept json content type");
  } else {
    next();
  }
});
*/
/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */

server.use(
  restify.plugins.jsonBodyParser({ mapParams: true, rejectUnknown: true })
);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.gzipResponse());

/*
 * Secrue the user keystore by entering the password at the Launch.
 * Be careful this usage is not a substitute for the server/db security.
 * Password are freely available in the RAM, a determined Hacker can get whatever she wants.
 */

/*
 * Launch the server
 */
server.listen(config.port, () => {
  console.log(
    "%s v%s ready to accept connections on port %s in %s environment.",
    server.name,
    config.version,
    config.port,
    config.env
  );

  require("./routes")({ server });
});
