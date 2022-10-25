import { TInputProps } from "./types";

import styles from "./DisabledInput.module.scss";
const { container, containerInput, containerInputLabel } = styles;

const DisabledInput = ({ label, id }: TInputProps) => {
  return (
    <div className={container}>
      <input
        className={containerInput}
        type="text"
        id={id}
        disabled={true}
        value={""}
      ></input>
      <label className={containerInputLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export { DisabledInput };
