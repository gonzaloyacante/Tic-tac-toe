/* eslint-disable react/prop-types */
export const CountGame = ({ title, children }) => {
  return (
    <div className="count-game">
      <h3>{title}</h3>
      <strong>{children}</strong>
    </div>
  );
};
