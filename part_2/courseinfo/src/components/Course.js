import { Header } from "./Header";
import { Content } from "./Content";
import { TotalExercises } from "./TotalExercises";

export const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <TotalExercises parts={parts} />
    </div>
  );
};
