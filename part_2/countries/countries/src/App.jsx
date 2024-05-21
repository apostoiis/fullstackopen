import React from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const WEATHER_API_BASE_URL = `https://api.open-meteo.com/v1/forecast`;

function App() {
  const [value, setValue] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [filteredCountries, setFilteredCountries] = React.useState(countries);

  const handleChange = (e) => {
    setValue(e.target.value);
    filterCountries(e.target.value.toLowerCase());
  };

  const filterCountries = (value) => {
    const filtered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(value);
    });
    setFilteredCountries(filtered);
  };

  React.useEffect(() => {
    axios.get(`${API_URL}`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const message = () => {
    const countriesToShow = value.length > 0 ? filteredCountries : countries;

    if (value.length && countriesToShow.length > 10) {
      return <p>Too many matches</p>;
    } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      return countriesToShow.map((country) => (
        <div key={country.name.common}>
          <Country country={country} shouldGetWeatherData={false} />
        </div>
      ));
    } else if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} shouldGetWeatherData />;
    }
  };

  return (
    <>
      <div>
        <h3>find countries</h3>
        <input type="search" value={value} onChange={handleChange} />
      </div>
      <div>{countries.length > 0 && message()}</div>
    </>
  );
}

const Country = ({ country, shouldGetWeatherData }) => {
  const [lat, lon] = country.latlng;
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (!shouldGetWeatherData) return;

    axios
      .get(
        `${WEATHER_API_BASE_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`,
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error)); // enable babel-throw-exceptions
    // .catch((error) => throw new Error(`Error: ${error}`)); // enable babel-throw-exceptionsa
  }, []);

  console.log("data", data);

  return (
    <>
      <div>{country.name.common}</div>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <div>{country.flag}</div>
      <div>{Object.values(country.languages).map((lang) => lang)}</div>
      {Object.keys(data).length > 0 && (
        <div>
          Temperature: {data.hourly.temperature_2m[0]}{" "}
          {data.hourly_units.temperature_2m}
        </div>
      )}
    </>
  );
};

export default App;
