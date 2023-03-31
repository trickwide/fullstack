const PersonForm = ({ addPerson, newPerson, handlePersonChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newPerson.name} onChange={handlePersonChange} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={handlePersonChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
