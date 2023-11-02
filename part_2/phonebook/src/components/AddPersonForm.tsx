export default function AddPersonForm({
  newName,
  phoneNumber,
  setNewName,
  setPhoneNumber,
  persons,
  setPersons,
}) {
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const isPersonAdded = (name) => {
    return persons.some((person) => person.name === name);
  };

  const addNewName = (e) => {
    e.preventDefault();

    if (isPersonAdded(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: phoneNumber }]);

    setNewName("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone number:{" "}
        <input value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
