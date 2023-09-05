import Part from "./Part";

export const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} />
    ))}
  </div>
);
