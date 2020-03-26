import React, { useState } from 'react';
import './App.css';
import gsap from "gsap"

function App() {
  const [object, setobject] = useState()
  const [city, setcity] = useState()
  const [error, seterror] = useState()

  const animationCity = () => {
    gsap.from(".result", { top: 1000 })
    let h1 = gsap.fromTo("#h1", { opacity: 0 }, { opacity: 1, duration: 0.3 })
    h1.repeat(4)
    let h2 = gsap.fromTo("#h2", { opacity: 0 }, { opacity: 1, duration: 0.2 })
    h2.repeat(3)
    let h4 = gsap.fromTo("#h4", { opacity: 0 }, { opacity: 1, duration: 0.2 })
    h4.repeat(6)
    let h5 = gsap.fromTo("#h5", { opacity: 0 }, { opacity: 1, duration: 0.1, delay: 1.5 })
    h5.repeat(1)
    gsap.fromTo("#h1", { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 2 })
  }
  const animationError = () => {
    gsap.from(".result", { bottom: 1000 })
    let h3 = gsap.fromTo("#h3", { opacity: 0 }, { opacity: 1, duration: 0.1, delay: 0.5 })
    h3.repeat(2)
  }

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b02311f78e0fa1b0d9a6796d1a554bcc`)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return Promise.reject(response)
          }
        })
        .then(result => {
          seterror(null)
          setobject(result)
          animationCity()
        })
        .catch(error => {
          if (error.status === 404) {
            seterror("Takie miasto nie istnieje")
            setobject(null)
            animationError()
          }
        })
    }
  }
  return (

    <>

      <div className="inputWrapper">
        <div className="inputElement">
          <input
            onKeyPress={keyPressed}
            value={city ? city : ""}
            onChange={(e) => setcity(e.target.value)}
            type="text"
            placeholder="Search city...">
          </input>
        </div>
      </div>


      {object ?

        < div className="result">
          <h1 id="h1" >  {object.name} </h1>
          <h2 id="h2">{parseInt(object.main.temp - 273.15)}&deg;C </h2>
          <h4 id="h4"> Wind: {object.wind.speed} m/s</h4>
          <h5 id="h5"> Pressure: {object.main.pressure} hPa</h5>

        </div>

        : null
      }
      {error ? <div className="result"><h3 id="h3">{error}</h3></div> : null}
    </>
  );
}
export default App;
