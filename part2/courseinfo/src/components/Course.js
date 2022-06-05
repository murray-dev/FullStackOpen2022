import React from 'react';

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => <Part part={part} key={part.id} />)}
  </>
);

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Total = ({ parts }) => {

  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p><strong>total of {sum} exercises</strong></p>
    </>
  )
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;