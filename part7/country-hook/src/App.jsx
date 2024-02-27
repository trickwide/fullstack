import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          if (response.data) {
            const countryData = response.data
            setCountry({ data: countryData, found: true })
          } else {
            setCountry({ found: false })
          }
        })
        .catch((error) => {
          setCountry({ found: false })
        })
    } else {
      setCountry(null)
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common} </h3>
      <div>capital {capital[0]} </div>
      <div>population {population}</div>
      <img
        src={flags.svg || flags.png}
        height='100'
        alt={`flag of ${name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
