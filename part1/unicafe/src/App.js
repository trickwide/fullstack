import { useState } from "react";

const Button = ({ handleClick, title }) => {
  return <button onClick={handleClick}>{title}</button>;
};

const StatisticLine = ({ title, value }) => {
  if (title === "positive") {
    return (
      <table>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>{value} %</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{title}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <StatisticLine title="good" value={good} />
      <StatisticLine title="neutral" value={neutral} />
      <StatisticLine title="bad" value={bad} />
      <StatisticLine title="all" value={all} />
      <StatisticLine title="average" value={average} />
      <StatisticLine title="positive" value={positive} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} title="good" />
      <Button handleClick={incrementNeutral} title="neutral" />
      <Button handleClick={incrementBad} title="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
