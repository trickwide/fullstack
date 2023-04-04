import WeatherData from "./WeatherData";

const CountryData = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ width: "200px", height: "100px" }}
      />
      <WeatherData city={country.capital} />
    </>
  );
};

export default CountryData;
