import {
  useState,
  useCallback,
  useEffect,
  SyntheticEvent,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import {
  generateRandomNumberBetweenMaxAndMinValue,
  generateArrayOfUniqueRandomNumbers,
} from "../../Utils/index";
import { usePartialPasswordContext } from "../../Contexts";
import {
  PartialPasswordState,
  UsePartialPassword,
  PasswordSettings,
} from "./types";

const initialPasswordState = {
  activeInputIndexes: [],
  hasError: false,
  message: "",
  areAllInputsProvided: false,
};

function usePartialPassword(
  password: string,
  { minLength, maxLength }: PasswordSettings,
  submitCallback: (password: string) => void
): UsePartialPassword {
  const { partialPassword, setPartialPassword } = usePartialPasswordContext();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [
    { activeInputIndexes, hasError, message, areAllInputsProvided },
    setPartialPasswordState,
  ] = useState<PartialPasswordState>(initialPasswordState);

  const isPasswordToShort = password.length < minLength;
  const isPasswordTooLong = password.length > maxLength;

  if (isPasswordToShort)
    throw new Error(`Password must be at least ${minLength} characters long.`);
  if (isPasswordTooLong)
    throw new Error(`Password's maximum length is ${maxLength} characters.`);

  const getActiveInputs = useCallback(() => {
    const maxNumberOfActiveInputs = Math.ceil(password.length / 2);

    const numberOfActiveInputs = generateRandomNumberBetweenMaxAndMinValue(
      2,
      maxNumberOfActiveInputs
    );

    const activeInputIndexes = generateArrayOfUniqueRandomNumbers(
      numberOfActiveInputs,
      0,
      password.length - 1
    );

    setPartialPasswordState((prevState) => {
      return { ...prevState, activeInputIndexes };
    });
  }, [password]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, id: currentInputId } = event.target;

      setPartialPassword((prev) => ({ ...prev, [currentInputId]: value }));
    },
    [setPartialPassword]
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (inputRefs.current.length === 0) return;

    const {
      key,
      currentTarget: { id: inputId, value },
    } = event;

    const currentInputIndex = inputRefs.current.findIndex(
      ({ id }) => id === inputId
    );

    const isCurrentInputEmpty = value.length === 0;
    const isCurrentInputFirst = currentInputIndex === 0;

    if (key === "Backspace" && isCurrentInputEmpty) {
      if (isCurrentInputFirst) return;
      const prevActiveInput = inputRefs.current[currentInputIndex - 1];

      event.preventDefault();
      prevActiveInput.focus();
      prevActiveInput.select();
    }
  }, []);

  const onKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    const {
      key,
      currentTarget: { id: inputId },
    } = event;
    const excludedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
    if (excludedKeys.includes(key)) return;

    const currentInputIndex = inputRefs.current.findIndex(
      ({ id }) => id === inputId
    );
    const lastActiveInputIndex = inputRefs.current.length - 1;
    const isCurrentInputLast = currentInputIndex === lastActiveInputIndex;

    if (isCurrentInputLast) return;

    const nextActiveInput = inputRefs.current[currentInputIndex + 1];

    nextActiveInput.focus();
  }, []);

  const onSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      const splittedPassword = password.split("");

      const hasError = splittedPassword.some((element, index) => {
        if (partialPassword[index]) {
          return partialPassword[index] !== element.toString();
        }
        return false;
      });

      if (hasError) {
        setPartialPasswordState((prevState) => ({
          ...prevState,
          hasError: true,
          message: "Invalid password.",
        }));

        setPartialPassword({});
        return;
      }

      submitCallback(password);
      setPartialPassword({});
    },
    [partialPassword, password, submitCallback, setPartialPassword]
  );

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible)
  }, [isPasswordVisible]);

  const addInputToRef = useCallback((element: HTMLInputElement) => {
    const isElementAlreadyInInputsArray = inputRefs.current.includes(element);
    if (isElementAlreadyInInputsArray) return;

    inputRefs.current.push(element);
  }, []);

  useEffect(() => {
    getActiveInputs();
  }, [getActiveInputs]);

  useEffect(() => {
    if (!hasError) return;

    const timeout = setTimeout(() => {
      setPartialPasswordState((prevState) => ({
        ...prevState,
        message: "",
        hasError: false,
      }));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [hasError]);

  useEffect(() => {
    const areAllInputsProvided =
      Object.keys(partialPassword).length === activeInputIndexes.length;

    setPartialPasswordState((prevState) => ({
      ...prevState,
      areAllInputsProvided,
    }));
  }, [partialPassword, activeInputIndexes]);

  return {
    togglePasswordVisibility,
    onSubmit,
    addInputToRef,
    activeInputIndexes,
    isPasswordVisible,
    hasError,
    message,
    areAllInputsProvided,
    inputActions: { onKeyDown, onChange, onKeyUp },
  };
}

export { usePartialPassword };
