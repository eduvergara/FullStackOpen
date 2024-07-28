import { useState } from "react";

// Button compoenent
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

// Statistics component
const Statistics = (props) => {
  const copyAnecdoteVotes = props.anecdoteVotes;
  const actualAnecdote = props.actualAnecdote;
  return <div>has {copyAnecdoteVotes[actualAnecdote]} votes</div>;
};

// Most voted component
const MostVotedAnecdote = (props) => {
  const voted = props.voted;
  const anecdotes = props.anecdotes;
  const [mostVotedAnecdote, mostVotedAnecdoteIndex] = getMostVoted(voted);

  // Calculate the max voted and index fo the max voted
  function getMostVoted(voted) {
    if (voted.length === 0) {
      return -1;
    }
    var max = voted[0];
    var maxIndex = 0;
    for (var i = 1; i < voted.length; i++) {
      if (voted[i] > max) {
        maxIndex = i;
        max = voted[i];
      }
    }
    return [max, maxIndex];
  }

  if (mostVotedAnecdote === 0) {
    return undefined;
  }

  return (
    <div>
      <p>{anecdotes[mostVotedAnecdoteIndex]}</p>
      <p>has {mostVotedAnecdote} votes</p>
    </div>
  );
};

// App compoenent
function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // useState declaration
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [voted, setVoted] = useState(new Array(anecdotes.length).fill(0));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Statistics anecdoteVotes={voted} actualAnecdote={selected} />
      <div>
        <Button
          handleClick={() => {
            const votesCopy = [...voted]; // copy of voted array
            votesCopy[selected] += 1;
            setVoted(votesCopy);
          }}
          text="vote"
        />

        <Button
          handleClick={() => {
            setSelected(getRandomInt(anecdotes.length));
          }}
          text="next anecdote"
        />
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote voted={voted} anecdotes={anecdotes} />
    </div>
  );
}

export default App;
