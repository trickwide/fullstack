import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import CountryData from "./components/CountryData";

const App = () => {
  const [queryCountry, setQueryCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQueryCountry(search);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <>
      <div>
        Find countries{" "}
        <input value={queryCountry} onChange={handleQueryChange} />
      </div>
      {countriesToShow.length === 1 ? (
        <CountryData country={countriesToShow[0]} />
      ) : null}
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow}
        />
      )}
    </>
  );
};

export default App;
