import React, {Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import bgImage from './assets/background-img.mp4'
import bgAlert from './assets/caution_01.mp4'
import weatherLogo from './assets/open-weather-logo.png'

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if(location == false) {
    return (
        <div className='text-wrapper'>
        <span className="weather-form-title"> Para funcionar, habilite a localização! </span>
        <video autoPlay loop muted>
          <source src={bgAlert} type="video/mp4" />
        </video>
      </div>
      
    )
  }else if(weather == false) {
    return (
      <Fragment>
        Carregando clima
      </Fragment>
    )
  }else{
    return (
      <div className="App">
        <video autoPlay loop muted>
          <source src={bgImage} type="video/mp4" />
        </video>
          <div className="container">
          <div className="container-weather">
            <div className="wrap-weather">
              <form className="weather-form">

                <span className="weather-form-title">
                  <img src={weatherLogo} alt="open weather logo" />
                </span>
                <span className="weather-form-title"> Sobre o clima: </span>

                <div className="wrap-input">
                  <input
                    className={weather !== "" ? "has-val input" : "input"}
                    type="text"
                    value={weather['main']['temp']}
                    disabled
                  />
                  <span className="focus-input" data-placeholder="Temperatura Atual"></span>
                </div>
                <div className="wrap-input">
                  <input
                    className={weather !== "" ? "has-val input" : "input"}
                    type="text"
                    value={weather['main']['temp_max']}
                    disabled
                  />
                  <span className="focus-input" data-placeholder="Temperatura Máxima"></span>
                </div>
                <div className="wrap-input">
                  <input
                    className={weather !== "" ? "has-val input" : "input"}
                    type="text"
                    value={weather['main']['temp_min']}
                    disabled
                  />
                  <span className="focus-input" data-placeholder="Temperatura Mínima"></span>
                </div>
                <div className="wrap-input">
                  <input
                    className={weather !== "" ? "has-val input" : "input"}
                    type="text"
                    value={weather['main']['pressure'] }
                    disabled
                  />
                  <span className="focus-input" data-placeholder="Pressão (hpa)"></span>
                </div>
                <div className="wrap-input">
                  <input
                    className={weather !== "" ? "has-val input" : "input"}
                    type="text"
                    value={weather['main']['humidity'] }
                    disabled
                  />
                  <span className="focus-input" data-placeholder="Humidade (%)"></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
