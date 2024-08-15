// DisplayCountries component renders a form with a country name and a button
// that allows the user to select a country from the list of matched countries.
// It takes "country" and "handleCountrySelection" as props.
const DisplayCountries = ({ country, handleCountrySelection }) => {
  return (
    <div>
      {/* The form triggers the handleCountrySelection function when submitted */}
      <form onSubmit={handleCountrySelection}>
        {/* Display the country name */}
        {country}{" "}
        {/* The button, when clicked, submits the form and passes the country name as its value */}
        <button value={country} type="submit">
          show
        </button>
      </form>
    </div>
  );
};

export default DisplayCountries;
