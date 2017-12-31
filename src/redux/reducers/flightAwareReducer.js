const flightAware = (
  state = {
    loading: false,
    flights: null
  },
  action
) => {
  switch (action.type) {
    case "GETTING_FLIGHT":
      return {
        ...state,
        loading: true
      };
    case "GETTING_FLIGHT_SUCCESS":
      return {
        ...state,
        loading: false,
        flights: action.flights
      };
    default:
      return state;
  }
};

export default flightAware;
