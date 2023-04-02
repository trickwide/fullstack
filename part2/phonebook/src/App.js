import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsToShow(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const currentPerson = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentPerson.length === 0) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setPersonsToShow(persons.concat(returnedPerson));
      });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentPerson[0].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== currentPerson[0].id ? person : returnedPerson
              )
            );
            setPersonsToShow(
              persons.map((person) =>
                person.id !== currentPerson[0].id ? person : returnedPerson
              )
            );
          });
      }
    }
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const filterPersons = (event) => {
    setFilter(event.target.value);
    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
        setPersonsToShow(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterPersons={filterPersons} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </>
  );
};

export default App;
