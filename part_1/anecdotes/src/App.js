import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const initialAnecdotesWithVotes = [...anecdotes].map((message) => ({
  message,
  votes: 0,
}));

const App = () => {
  const [selected, setSelected] = useState(0);
  const [anecdotesWithVotes, setAnecdotesWithVotes] = useState(
    initialAnecdotesWithVotes
  );

  const handleClick = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const handleVote = () => {
    const newState = anecdotesWithVotes.map((obj, idx) => {
      if (idx === selected) {
        return { ...obj, votes: obj.votes + 1 };
      }

      return obj;
    });

    setAnecdotesWithVotes(newState);
  };

  const mostVotedAnecdote = anecdotesWithVotes.reduce((acc, curr) => {
    return acc.votes > curr.votes ? acc : curr;
  });

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {anecdotesWithVotes[selected].votes} votes</p>
      <p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </p>

      <h2>Anecdote with most votes</h2>
      {mostVotedAnecdote.votes === 0 ? null : (
        <div>
          <p>{mostVotedAnecdote.message}</p>
          <p>{mostVotedAnecdote.votes}</p>
        </div>
      )}
    </div>
  );
};

export default App;
