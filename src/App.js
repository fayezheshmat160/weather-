import React, { Component } from "react";
import Form from "./component/Form";
import Weather from "./component/weather";

const Api_key = "e24d64a8d0f6da2ab565443199a46790";
const ll = "e36ed364400282e43250b6c4c0274d44";
//http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44

class App extends Component {
  state = {
    temp: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };

  GetWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`
    );
    const data = await api.json();

    if (city && country) {
      this.setState({
        temp: (data.main.temp)/8.9,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temp: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Please Enter Data",
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form GetWeather={this.GetWeather} />
          <Weather
            temp={this.state.temp}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;
