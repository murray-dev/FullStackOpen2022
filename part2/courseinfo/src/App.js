const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part part={part} key={part.id} />)}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Total = (props) => {

  let sum = 0;
  props.parts.forEach((part) => sum += part.exercises)

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} /> */}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return <Course course={course} />
}

export default App;
