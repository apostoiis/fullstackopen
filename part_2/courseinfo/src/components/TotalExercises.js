export const TotalExercises = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <h4>total of {sum} exercises</h4>
    </div>
  );
};

export default TotalExercises;
