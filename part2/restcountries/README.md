# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# REST Countries App

This is a React application that allows users to search for countries, view details about a specific country, and display weather information for the capital of the selected country. The app utilizes REST APIs to fetch country and weather data.

## Features

- **Country Search**: Type in the search bar to filter countries by name.
- **Country Details**: Displays information such as the capital, area, languages, and flag of the selected country.
- **Weather Information**: Shows the current weather in the capital of the selected country, including temperature and wind speed.

## Components

- **App**: The main component that manages the overall state of the application, handles API calls, and coordinates the display of other components.
- **DisplayCountries**: Renders a list of countries matching the search query, with a button to select a specific country.
- **CountryInformation**: Displays detailed information about the selected country, including its languages, flag, and weather in the capital.
- **CountryLanguages**: Shows the languages spoken in the selected country.
- **CountryFlag**: Displays the flag of the selected country.
- **CapitalWeatherReport**: Shows the current weather in the capital of the selected country.

## Technologies Used

- **React**: For building the user interface and managing component state.
- **Axios**: For making HTTP requests to fetch data from external APIs.
- **OpenWeatherMap API**: To retrieve current weather information for the capital of the selected country.
- **REST Countries API**: To retrieve details about countries, such as name, capital, area, and languages.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/country-information-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd country-information-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. Enter the name of a country in the search bar to filter the list of countries.
2. Click the "show" button next to a country to view detailed information about it.
3. If only one country matches the search query, detailed information about that country will be displayed automatically, including the weather in its capital.

## Project Structure

```bash
src/
├── components/
│   ├── CapitalWeatherReport.js
│   ├── CountryFlag.js
│   ├── CountryInformation.js
│   ├── CountryLanguages.js
│   └── DisplayCountries.js
├── App.js
└── index.js
```

API References
REST Countries API: https://restcountries.com/
OpenWeatherMap API: https://openweathermap.org/
