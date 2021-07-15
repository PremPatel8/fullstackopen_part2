import React from "react";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        );
      })}
    </div>
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

export default Course;
