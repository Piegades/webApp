import React from "react";

import FlightsHistory from "./FlightsHistory";

class Informations extends React.Component {
  render() {
    return <FlightsHistory {...this.props} />;
  }
}

export default Informations;
