// CountryInformation component displays detailed information about a country,
// including its name, capital, area, languages, flag, and weather report.
// It takes "countryApiCall", "loading", and "capitalWeatherApiCall" as props.

import CountryLanguages from "./CountryLanguages";
import CountryFlag from "./CountryFlag";
import CapitalWeatherReport from "./CapitalWeatherReport";

const CountryInformation = ({
  countryApiCall,
  loading,
  capitalWeatherApiCall,
}) => {
  // If the API call result for country data is null, do not render anything.

  if (countryApiCall === null) return null;

  const countryName = countryApiCall.name.common;
  const countryCapital = countryApiCall.capital;
  const countryArea = countryApiCall.area;

  return (
    <div>
      <h2>{countryName}</h2>
      <div>
        <p>capital {countryCapital}</p>
        <p>area {countryArea}</p>
      </div>
      {/* Display the country's languages using the CountryLanguages component */}
      <CountryLanguages countryApiCall={countryApiCall} />
      {/* Display the country's flag using the CountryFlag component */}
      <CountryFlag countryApiCall={countryApiCall} />
      {/* Display the capital city's weather report using the CapitalWeatherReport component */}
      <CapitalWeatherReport
        countryName={countryName}
        countryCapital={countryCapital}
        capitalWeatherApiCall={capitalWeatherApiCall}
      />
    </div>
  );
};

export default CountryInformation;
