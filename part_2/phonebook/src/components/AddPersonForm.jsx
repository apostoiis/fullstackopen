import { addPerson, updatePersonNumber } from "../services/persons";

export default function AddPersonForm({
  newName,
  phoneNumber,
  setNewName,
  setPhoneNumber,
  persons,
  setPersons,
  setAddedPersonMessage,
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
      const findPerson = persons.find((person) => person.name === newName);
      const findPersonId = findPerson.id;

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (confirmUpdate)
        updatePersonNumber(findPersonId, {
          name: newName,
          number: phoneNumber,
        })
          .then((updatedPerson) => {
            const newPersonsArray = persons.map((person) =>
              person.id !== findPersonId ? person : updatedPerson,
            );

            setPersons(newPersonsArray);
            setAddedPersonMessage(`${updatedPerson.name} is updated!`);
            setTimeout(() => {
              setAddedPersonMessage(null);
            }, 2000);
          })
          .catch((err) =>
            setAddedPersonMessage(`${updatedPerson.name} is already deleted!`),
          );

      return;
    }

    const newPersonObject = {
      name: newName,
      number: phoneNumber,
    };

    addPerson(newPersonObject)
      .then((response) => {
        setPersons([...persons, response]);
        setAddedPersonMessage(`${response.name} is added!`);
        setTimeout(() => {
          setAddedPersonMessage(null);
        }, 2000);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setNewName("");
        setPhoneNumber("");
      });
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
