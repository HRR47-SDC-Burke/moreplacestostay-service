import React from "react";
import axios from "axios";
import Places from './Places.js';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places : []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:3030/api/moreplacestostay')
      .then(data => {
        this.setState({
          places: data.data
        })
      });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      arrows: true
    };
    var size = 12;
    var items = this.state.places.slice(0, size);
    return (
      <div className ="App" style = {{padding: 24}}>
        <h2 className = "header"> More places to stay </h2>
        <br/>
        <Slider {...settings} >
          {items.map((place) => {
            return (
              <div className="slick-slide" key={place.name}>
                <img className="slick-slide-image" width = "100%" src = {place.imageurl} />
                <h4 className="slick-slide-title"> {place.name} </h4>
                <h5 className="slick-slide-label"> ${place.price} / night </h5>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}

export default App;

{/* < Places places = {this.state.places}/> */}