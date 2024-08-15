// CapitalWeatherReport component displays the weather report for the capital city of a country.
// It takes "countryName", "countryCapital", and "capitalWeatherApiCall" as props.
const CapitalWeatherReport = ({
  countryName,
  countryCapital,
  capitalWeatherApiCall,
}) => {
  // If the API call result for weather data is null, do not render anything.
  if (capitalWeatherApiCall === null) return null;

  // Extract weather details from the API call result.
  const cityTemp = capitalWeatherApiCall.main.temp;
  const weatherIcon = capitalWeatherApiCall.weather[0].icon;
  const weatherDescription = capitalWeatherApiCall.weather.description;
  const cityWind = capitalWeatherApiCall.wind.speed;

  return (
    <div>
      <h2>Weather in {countryCapital}</h2>
      <div>
        {/* Display the temperature in Celsius */}
        <p>temperature: {cityTemp} Celcius</p>
      </div>
      <div>
        {/* Display the weather icon from the OpenWeatherMap API */}
        <img
          className="flags"
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        />
      </div>
      <div>
        {/* Display the wind speed in meters per second */}
        <p>wind {cityWind} m/s</p>
      </div>
    </div>
  );
};

export default CapitalWeatherReport;
