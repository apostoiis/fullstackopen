import axios from "axios";
import { useEffect, useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import GlobalSearch from "./components/GlobalSearch";
import Notification from "./components/Notification";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedPersonMessage, setAddedPersonMessage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedPersonMessage} />
      <GlobalSearch
        persons={persons}
        setFilteredPersons={setFilteredPersons}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AddPersonForm
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        persons={persons}
        setPersons={setPersons}
        setAddedPersonMessage={setAddedPersonMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={searchTerm ? filteredPersons : persons}
        setPersons={setPersons}
        setAddedPersonMessage={setAddedPersonMessage}
      />
    </div>
  );
};

export default App;
