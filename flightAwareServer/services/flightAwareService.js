"use strict";

const Client = require("node-rest-client").Client;

const username = "bthivend";
const apiKey = "aefb3d583c779430cfc7032727c82d1be68cf239";
const fxmlUrl = "https://flightxml.flightaware.com/json/FlightXML3/";

const client_options = {
  user: username,
  password: apiKey
};
const client = new Client(client_options);

client.registerMethod("airportBoards", fxmlUrl + "AirportBoards", "GET");

const airportBoardsArgs = {
  parameters: {
    airport_code: "DXB",
    howMany: 100
  }
};

/* Create a UAE selector*/
const flightAwareService = {
  getSchudeledFlight: function() {
    return new Promise((resolve, reject) => {
      let flightTab = {}; //[]
      client.methods.airportBoards(airportBoardsArgs, function(data, response) {
        for (
          var i = 0;
          i < data.AirportBoardsResult.departures.num_flights;
          i++
        ) {
          let flights = data.AirportBoardsResult.departures.flights[i];
          flightTab["flight" + i] = {
            id: flights.ident,
            Flight_number: flights.faFlightID,
            airline: flights.airline,
            loadPerc: 10, //
            nbPass: 300, // It's will be connected to Emirates
            departureTime: flights.estimated_departure_time.epoch
          };
        }
        return resolve(flightTab);
      });
    });
  }
};

module.exports = flightAwareService;

/*

Should to go to this nethods when payed for the api

client.registerMethod(
  "airlineFlightSchedules",
  fxmlUrl + "AirlineFlightSchedules",
  "GET"
);

const airlineFlightSchedulesArgs = {
  parameters: {
    start_date: new Date(),
    origin: "DXB",
    airline: "EK",
    howMany: 100
  }
};
*/
