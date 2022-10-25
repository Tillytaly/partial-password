import { forwardRef } from "react";
import { TInputProps } from "./types";

import styles from "./ActiveInput.module.scss";
const { container, containerInput, containerInputLabel } = styles;

const ActiveInput = forwardRef<HTMLInputElement, TInputProps>(
  ({ type, onChange, onKeyDown, onKeyUp, id, label }: TInputProps, ref) => {
    const inputClassNames = `${containerInput} active`;
    return (
      <div className={container}>
        <input
          type={type}
          onChange={onChange}
          className={inputClassNames}
          id={id}
          minLength={1}
          maxLength={1}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={ref}
        ></input>
        <label className={containerInputLabel} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);

export { ActiveInput };
