export default function GlobalSearch({
  persons,
  setFilteredPersons,
  searchTerm,
  setSearchTerm,
}) {
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);

    const filteredResults = persons.filter((person) => {
      const personName = person.name.toLowerCase().replace(" ", "");

      return personName.includes(searchTerm);
    });

    setFilteredPersons(filteredResults);
  };

  return (
    <input
      type="search"
      placeholder="Search person..."
      value={searchTerm}
      onChange={handleSearchTerm}
    />
  );
}
