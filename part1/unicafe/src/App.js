import { useState } from "react";

const Button = ({ text, onClick }) =>
  <button onClick={onClick}>{text}</button>;

const GetFeedback = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => (
  <>
    <h1>give feedback</h1>
    <Button text="good" onClick={handleGoodClick} />
    <Button text="neutral" onClick={handleNeutralClick} />
    <Button text="bad" onClick={handleBadClick} />
  </>
);

// Note: already did exercise 1.8 as part of 1.7
const DisplayStatistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <>
      <h1>statistics</h1>
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
      <Statistic name="all" value={all} />
      <Statistic name="average" value={average} />
      <Statistic name="positive" value={positive} unit="%" />
    </>
  );
}

const Statistic = ({ name, value, unit }) => <p>{name} {value} {unit}</p>;

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <GetFeedback
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick}
      />
      <DisplayStatistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App;
