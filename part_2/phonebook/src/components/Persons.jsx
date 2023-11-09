import { deletePerson } from "../services/persons";

export default function Persons({ persons, setPersons }) {
  const handleDeletePerson = (id) => {
    window.confirm("Are you sure?");
    deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
          <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
