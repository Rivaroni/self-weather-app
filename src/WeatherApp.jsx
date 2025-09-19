import React, {useState, useEffect, useRef} from "react"

function WeatherApp(){

    const [weatherData, setWeatherData] = useState({
        city:"Yorba Linda",
        temp:81
    })
    const apiKey = "&appid=e2a1f488af64426995447698550ed654";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const metricURL = "&units=imperial"
    const url = `${baseURL}?q=${weatherData.city}${apiKey}${metricURL}`

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWeatherData(w => ({...w, temp: Math.round(data.main.temp)}))
            })
    }, [])

    return(<>
        <div>
            <h1>{weatherData.city}</h1>
            <hr></hr>
            <h2>{weatherData.temp + " °F"}</h2>
        </div>
    </>)
}

export default WeatherApp