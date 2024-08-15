// CountryFlag component displays the flag of a country.
// It takes "countryApiCall" as a prop, which contains the API response with country details.

const CountryFlag = ({ countryApiCall }) => {
  // Extract the URL of the country's flag image from the API response.
  const flagURL = countryApiCall.flags.png;
  // Extract the alternative text for the flag image from the API response.
  const flagAlt = countryApiCall.flags.alt;

  return (
    <div>
      {/* Display the country's flag using the extracted URL and alt text */}
      <img className="flags" src={flagURL} alt={flagAlt} />
    </div>
  );
};

export default CountryFlag;
