import { useEffect, useState } from "react";
import axios from "axios";
import DisplayCountries from "./components/DisplayCountries";
import CountryInformation from "./components/CountryInformation";

function App() {
  // useState hooks for storing
  const [countries, setCountries] = useState([]);
  const [countriesMatchingSearch, setCountriesMatchingSearch] = useState("");
  const [countryApiCall, setCountryApiCall] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(null);
  const [capitalWeatherApiCall, setCapitalWeatherApiCall] = useState(null);

  // Fetch all countries from the REST API and set the "countries" state variable with country names.
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data.map((country) => country.name.common));
        setLoading(false);
      })
      .catch(() => {
        // catch any error
        setErrorMessage(` Error during initial reading from countries API`);
      });
  }, []);

  // Handles the country search input by updating the "countriesMatchingSearch" state.
  const handleCountrySearch = (event) => {
    setCountriesMatchingSearch(event.target.value);
  };

  // Determines which countries to show based on the search input.
  const countriesToShow =
    countriesMatchingSearch === ""
      ? []
      : countries.filter((country) =>
          country.toLowerCase().includes(countriesMatchingSearch.toLowerCase())
        );

  // Get the number of countries that match the search input.
  const qtyCountryMatches = countriesToShow.length;

  // API call to fetch detailed information about a country if only one match is found.
  useEffect(() => {
    if (qtyCountryMatches === 1) {
      setLoading(true);
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToShow[0]}`
        )
        .then((response) => {
          setCountryApiCall(response.data);
          setLoading(false);
          setWeatherLoading(true); // Trigger the weather API call
        })
        .catch(() => {
          // catch any error
          setErrorMessage(` Error reading from countries API`);
        });
    } else {
      setCountryApiCall(null); // Clear the details if more than one match is found
    }
  }, [qtyCountryMatches]);

  // API call to fetch the weather information for the capital city of the matched country.
  useEffect(() => {
    if (qtyCountryMatches === 1) {
      setLoading(true);
      const cityName = countryApiCall.capital;
      const countryCode = countryApiCall.cca2;
      const apiKey = `406acc6cfd0979736bd2b2ae3a84a5e5`;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setCapitalWeatherApiCall(response.data);
          setLoading(false);
          setWeatherLoading(null);
        })
        .catch(() => {
          // catch any error
          setErrorMessage(` Error reading from weather API`);
        });
    }
  }, [weatherLoading]);

  // Handles the selection of a country from the list of matches.
  // This triggers the effect that fetches detailed information when only one match is present.
  const handleCountrySelection = (event) => {
    event.preventDefault(); // Prevent default form submission
    const buttonValue = event.nativeEvent.submitter.value; // Get the button value
    setCountriesMatchingSearch(buttonValue); // Update state with the selected country
  };

  // Renders the search input, country list, and detailed information depending on the matches found.
  return (
    <div>
      find countries{" "}
      <input onChange={handleCountrySearch} value={countriesMatchingSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : qtyCountryMatches > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : qtyCountryMatches === 1 ? (
        <CountryInformation
          countryApiCall={countryApiCall}
          loading={loading}
          capitalWeatherApiCall={capitalWeatherApiCall}
        />
      ) : (
        countriesToShow.map((country) => (
          <DisplayCountries
            key={country}
            country={country}
            handleCountrySelection={handleCountrySelection}
          />
        ))
      )}
    </div>
  );
}

export default App;
