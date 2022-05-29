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

const DisplayStatistics = ({ good, neutral, bad }) => (
  <>
    <h1>statistics</h1>
    <Statistic name="good" value={good} />
    <Statistic name="neutral" value={neutral} />
    <Statistic name="bad" value={bad} />
  </>
);


const Statistic = ({ name, value }) => <p>{name} {value}</p>;

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
