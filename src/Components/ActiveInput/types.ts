import { KeyboardEventHandler, ChangeEventHandler } from "react";

export type TInputProps = {
  label: number;
  id: string;
  type: "text" | "password";
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
};
