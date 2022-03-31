import React from "react";

const Button = ({ name, type, id, onClick }) => {
  return (
    <button type={type} id={id} onClick={onClick}>
      {name}
    </button>
  );
};
export default React.memo(Button);
