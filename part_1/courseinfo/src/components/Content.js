import Part from "./Part";

export const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};
