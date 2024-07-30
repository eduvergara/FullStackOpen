// Header component
const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  );
};

// Content Component
const Content = ({ content }) => {
  const sumPartsCourse = content.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <strong>
          {"total of "} {sumPartsCourse} {"exercises"}
        </strong>
      </p>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Course component
const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course} />
        <Content content={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;
