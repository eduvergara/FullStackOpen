// Header component
const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content content={course.parts} />
    </div>
  );
};

const Content = ({ content }) => {
  const courseContent = content;

  const sumPartsCourse = courseContent.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      {courseContent.map((part) => (
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

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Header key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
