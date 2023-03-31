import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setnewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newPerson)) {
      alert(`${newPerson} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setPersonsToShow(persons.concat(personObject));
    setnewPerson({ name: "", number: "" });
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setnewPerson(event.target.value);
  };

  const filterPersons = (event) => {
    setFilter(event.target.value);
    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterPersons={filterPersons} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </>
  );
};

export default App;
