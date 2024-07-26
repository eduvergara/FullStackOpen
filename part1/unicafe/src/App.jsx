import { useState } from "react";

// uses an implicit return with parentheses, making it more concise
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good + bad * -1) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <div>
          <Button
            handleClick={() => {
              setGood(good + 1);
            }}
            text="good"
          />
          <Button
            handleClick={() => {
              setNeutral(neutral + 1);
            }}
            text="neutral"
          />
          <Button
            handleClick={() => {
              setBad(bad + 1);
            }}
            text="bad"
          />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
