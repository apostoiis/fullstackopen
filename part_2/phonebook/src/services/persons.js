import axios from "axios";
const baseUrl = "http://localhost:3001/persons/";

export const addPerson = (person) =>
  axios.post(baseUrl, person).then((response) => response.data);

export const deletePerson = (id) =>
  axios.delete(`${baseUrl}${id}`).then((response) => response.data);

export const updatePersonNumber = (id, updatedPerson) =>
  axios.put(`${baseUrl}${id}`, updatedPerson).then((response) => response.data);
