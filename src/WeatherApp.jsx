import React, {useState, useEffect, useRef} from "react"

function WeatherApp(){

    const [weatherData, setWeatherData] = useState({
        city:"Yorba Linda",
        temp:81
    })
    const apiKey = "e2a1f488af64426995447698550ed654";

    useEffect(() => {

    }, [])

    return(<>
        <div>
            <h1>{weatherData.city}</h1>
        </div>
    </>)
}

export default WeatherApp