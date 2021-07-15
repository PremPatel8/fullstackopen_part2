import React from "react";

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => ( <Course course={course} key={course.id} /> ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      <span>
        {part.name} {part.exercises}
      </span>
    </p>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      <strong>
        total of{" "}
        {course.parts.reduce((total, part) => total + part.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
