import React, {useState, useEffect, useRef} from "react"

function WeatherApp(){

    const [weatherData, setWeatherData] = useState({
        city:"Yorba Linda",
        temp:-1,
        desc:"null"
    })
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(true)

    const apiKey = "&appid=e2a1f488af64426995447698550ed654";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const metricURL = "&units=imperial"
    const url = `${baseURL}?q=${weatherData.city}${apiKey}${metricURL}`

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWeatherData(w => ({...w, 
                    temp: Math.round(data.main.temp), 
                    desc: data.weather[0].description
                }))
                setLoading(false)
            })
    }, [weatherData.city])

    function handleCityInput(e){
        setCity(e.target.value)
    }

    function handleKeyDown(e){
        if(e.key == "Enter")
        {
            addCity()
        }
    }

    function addCity(){
        setLoading(true)
        setWeatherData(w => ({...w, city: city}))
        setCity("")
    }

    return(<>
        <div>
            <h1>{weatherData.city}</h1>
            <hr></hr>
            <h2>{weatherData.temp + " °F"}</h2>
            <h2>{weatherData.desc}</h2>
            <hr></hr>
            <input
            type="text"
            placeholder="Type City Name"
            value={city}
            onChange={handleCityInput}
            onKeyDown={handleKeyDown}
            />
            <button
            onClick={addCity}
            >Enter</button>
            <h3>{loading ? "Loading..." : ""}</h3>
        </div>
    </>)
}

export default WeatherApp