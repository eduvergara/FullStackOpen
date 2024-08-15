// CountryLanguages component displays the list of languages spoken in a country.
// It takes "countryApiCall" as a prop, which contains the API response with country details.
const CountryLanguages = ({ countryApiCall }) => {
  // Extract the "languages" object from the "countryApiCall" data.
  const languagesList = countryApiCall.languages;

  return (
    <div>
      <h3>languages:</h3>
      <ul>
        {/* Iterate over the languages object and display each language in a list item */}
        {Object.entries(languagesList).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryLanguages;
