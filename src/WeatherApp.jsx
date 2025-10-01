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
    const [units, setUnits] = useState("imperial")
    const [recentSearches, setRecentSearches] = useState([])

    const apiKey = "&appid=e2a1f488af64426995447698550ed654";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather"
    const metricURL = `&units=${units}`
    const url = `${baseURL}?q=${searchCity}${apiKey}${metricURL}`

    useEffect(() => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    if (response.status === 404) {
                        throw new Error('NOT_FOUND')
                    } else if (response.status === 429) {
                        throw new Error('RATE_LIMIT')
                    } else {
                        throw new Error('API_ERROR')
                    }
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
                setRecentSearches(r => {
                    const filtered = r.filter(city => city !== data.name);
                    return [data.name, ...filtered].slice(0, 5);
                })
                setLoading(false)
                setError("")
            })
            .catch(error => {
                setLoading(false)
                
                if (error.message === 'NOT_FOUND') {
                    setError(`City "${searchCity}" not found. Check spelling?`)
                } else if (error.message === 'RATE_LIMIT') {
                    setError("Too many requests. Wait a minute and try again.")
                } else {
                    setError("Connection error. Check your internet.")
                }
            })
    }, [searchCity, units])

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

    function addRecentCity(recentCity){
        setSearchCity(recentCity)
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
            <br></br>
            <div>
                <input
                type="radio"
                name="radioOptions"
                id="radio1"
                value="imperial"
                checked={units === 'imperial'}
                onChange={(e) => setUnits(e.target.value)}
                />
                <label>Farenheit</label>
                <input
                type="radio"
                name="radioOptions"
                id="radio2"
                value="metric"
                checked={units === 'metric'}
                onChange={(e) => setUnits(e.target.value)}
                />
                <label>Celsius</label>
            </div>
            <div>
                <h2>{weatherData.city}</h2>
                <hr></hr>
                <h3>Current Temperature: <b>{weatherData.temp + (units === 'imperial' ? " °F" : "°C")}</b></h3>
                <h3>Feels like: <b>{weatherData.feels + (units === 'imperial' ? " °F" : "°C")}</b></h3>
                <h3>Humidity: <b>{weatherData.humidity + " %"}</b></h3>
                <h3>Wind speed: <b>{weatherData.wind + (units === 'imperial' ? " mph" : " m/s")}</b></h3>
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
                <ul>
                    {recentSearches.map((recentCity, _) => (
                        <li key={recentCity}>
                            <button
                            onClick={() => addRecentCity(recentCity)}
                            >
                                {recentCity}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}

export default WeatherApp