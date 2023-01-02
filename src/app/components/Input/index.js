import React, { useId } from "react";

function Input({ label, id, type = "text", onChange }) {
  const generatedId = useId();

  return (
    <React.Fragment>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input id={id || generatedId} type={type} onChange={onChange} />
    </React.Fragment>
  );
}

export default Input;
