import { KeyboardEventHandler, ChangeEventHandler } from "react";

export interface ActiveInputs {
  [key: string]: string;
}

export interface PartialPasswordState {
  activeInputIndexes: number[];
  isVisible: boolean;
  hasError: boolean;
  message: string;
  areAllInputsProvided: boolean;
}

interface InputActions {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
}

export interface PasswordSettings {
  minLength: number;
  maxLength: number;
}

export interface PartialPasswordProps {
  password: string;
  passwordSettings: PasswordSettings;
  onSuccess: (password: string) => void;
}

export interface UsePartialPassword extends PartialPasswordState {
  inputActions: InputActions;
  addInputToRef: (element: HTMLInputElement) => void;
  togglePasswordVisibility: () => void;
  onSubmit: (event: React.SyntheticEvent) => void;
}
