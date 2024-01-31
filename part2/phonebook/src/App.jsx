import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsToShow(initialPersons);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const addPerson = (event) => {
    event.preventDefault();
    const currentPerson = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentPerson.length === 0) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
          setErrorMessage(`Added ${newPerson.name} to phonebook`);
          setIsError(false);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setIsError(true);
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
            setErrorMessage(`Updated ${newPerson.name}'s number`);
            setIsError(false);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from server`
            );
            setIsError(true);
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
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setPersonsToShow(persons.filter((person) => person.id !== id));
          setErrorMessage(`Removed ${name} from phonebook`);
          setIsError(false);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          );
          setIsError(true);
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        type={isError ? "error" : "success"}
      />

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
