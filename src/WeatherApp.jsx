import React, {useState, useEffect} from "react"

function WeatherApp(){

    const [weatherData, setWeatherData] = useState({
        city:"Yorba Linda",
        temp:-1,
        feels: -1,
        desc:"null",
        humidity: -1,
        wind: -1,
        icon:""
    })
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchCity, setSearchCity] = useState("Yorba Linda")

    const apiKey = "&appid=e2a1f488af64426995447698550ed654";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const metricURL = "&units=imperial"
    const url = `${baseURL}?q=${searchCity}${apiKey}${metricURL}`

    useEffect(() => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error('City not found')
                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                setWeatherData(w => ({...w, 
                    city: data.name,
                    temp: Math.round(data.main.temp),
                    feels: Math.round(data.main.feels_like),
                    humidity: Math.round(data.main.humidity),
                    wind: data.wind.speed,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon
                }))
                setLoading(false)
                setError("")
            })
            .catch(error => {
                console.log("Error", error)
                setLoading(false)
                setError(error.message)
            })
    }, [searchCity])

    function handleCityInput(e){
        setError("")
        setCity(e.target.value)
    }

    function handleKeyDown(e){
        if(e.key == "Enter")
        {
            addCity()
        }
    }

    function addCity(){
        if(city.trim() != "")
        {
            setLoading(true)
            setError("")
            setSearchCity(city)
            setCity("")
        }

    }

    return(<>
        <div>
            <h3>Check the weather forecast</h3>
            <div>
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
            </div>
            <div>
                <input
                type="radio"
                name="radioOptions"
                id="radio1"
                value="option1"
                checked
                />
                <label>Celsius</label>
                <input
                type="radio"
                name="radioOptions"
                id="radio2"
                value="option2"
                />
                <label>Farenheit</label>
            </div>
            <div>
                <h2>{weatherData.city}</h2>
                <h3>Current Temperature: <b>{weatherData.temp + " °F"}</b></h3>
                <h3>Feels like: <b>{weatherData.feels + " °F"}</b></h3>
                <h3>Humidity: <b>{weatherData.humidity + " %"}</b></h3>
                <h3>Wind speed: <b>{weatherData.wind + " mph"}</b></h3>
                <div>
                    <img
                    src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    />
                    <h4>{weatherData.desc}</h4>
                </div>

            </div>
            <div>
                <hr></hr>
                <h2>{loading ? "Loading..." : ""}</h2>
                <h2>{error}</h2>
            </div>
        </div>
    </>)
}

export default WeatherApp