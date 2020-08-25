import React from "react";
import axios from "axios";

class Places extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var size = 12;
    var items = this.props.places.slice(0, size);
    return (
      <div>
      {items.map(place => {
        return (
          <div >
            <img src = {place.imageurl} alt = "new" />
            <h3> {place.name} </h3>
            <h4> ${place.price} / night </h4>
          </div>
        )
      })}
      </div>
    )
  }
}

export default Places;