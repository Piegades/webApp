"use strict";

module.exports = {
  name: "flightAwareService",
  version: "0.0.1",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  acceptable: ["application/json"],
  strictRouting: true
};
