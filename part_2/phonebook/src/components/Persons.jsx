import { deletePerson } from "../services/persons";

export default function Persons({
  persons,
  setPersons,
  setAddedPersonMessage,
}) {
  const handleDeletePerson = (person) => {
    window.confirm("Are you sure?");
    deletePerson(person.id)
      .then((response) => {
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((err) =>
        setAddedPersonMessage(`${response.name} is already deleted!`)
      );
  };

  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
          <button onClick={() => handleDeletePerson(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
