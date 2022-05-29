import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const getRandomAnecdoteIndex = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(getRandomAnecdoteIndex())
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => setSelected(getRandomAnecdoteIndex());

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdotes
        anecdote={anecdotes[selected]}
        numberOfVotes={votes[selected]}
        handleVote={handleVote}
        handleNextAnecdote={handleNextAnecdote}
      />
      <MostVotedAnecdote
        anecdote={anecdotes[indexOfMaxVotes]}
        numberOfVotes={votes[indexOfMaxVotes]}
      />
    </div>
  );
}

const Anecdotes = ({ anecdote, numberOfVotes, handleVote, handleNextAnecdote }) => (
  <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdote} numberOfVotes={numberOfVotes} />
    <button onClick={handleVote}>vote</button>
    <button onClick={handleNextAnecdote}>next anecdote</button>
  </>
);

const Anecdote = ({ anecdote, numberOfVotes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {numberOfVotes} votes</p>
  </>
)

const MostVotedAnecdote = ({ anecdote, numberOfVotes }) => (
  <>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={anecdote} numberOfVotes={numberOfVotes} />
  </>
);

export default App