import React, { useMemo } from "react";

const Button = ({ name, type, id, onClick }) => {
  const options = useMemo(
    () => ({
      name,
      type,
      id,
      onClick,
    }),
    [name, type, id, onClick]
  );

  return (
    <button type={options.type} id={options.id} onClick={options.onClick}>
      {options.name}
    </button>
  );
};
export default React.memo(Button);
