import RestClient from "another-rest-client";

const api = new RestClient("http://localhost:4000");

api.res({ schudeledflight: "schudeledflight" });
api.conf({ contentType: "application/json" });

export const getSchudeledFlight = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "GETTING_FLIGHT" });
    api.schudeledflight.get().then(flights => {
      const arrayOfFlights = Object.values(flights.result);
      dispatch({ type: "GETTING_FLIGHT_SUCCESS", flights: arrayOfFlights });
      return resolve(arrayOfFlights);
    });
  });
};
/*
const client_options = {
  user: username,
  password: apiKey
};

const client = new Client(client_options);

client.registerMethod("airportBoards", `${fxmlUrl}AirportBoards`, "GET");

// MARCHE PAS

const airportBoardsArgs = {
  parameters: {
    airport_code: "DXB",
    howMany: 100
  }
};
let myTAB = {};
export const airportBoards = () => dispatch => {
  client.methods.airportBoards(
    airportBoardsArgs,
    ({ AirportBoardsResult }, response) => {
      for (let i = 0; i < AirportBoardsResult.departures.num_flights; i++) {
        let myFlight = AirportBoardsResult.departures.flights[i];
        const utcSeconds = myFlight.estimated_departure_time.epoch;
        const d = new Date(0);
        d.setUTCSeconds(utcSeconds);
        myTab[`flight${i}`] = {
          id: myFlight.ident,
          Flight_number: myFlight.faFlightID,
          airline: myFlight.airline,
          loadPerc: 10,
          nbPass: 300, // A MODIFIER
          timeDep: d
        };
      }
      myTAB = myTab;
      console.log(myTAB);
      return myTAB;
    }
  );
};

airportBoards();

console.log(myTAB.length);
*/
