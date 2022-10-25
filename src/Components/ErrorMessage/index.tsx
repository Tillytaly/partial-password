import { TErrorMessageProps } from "./types";
import styles from "./ErrorMessage.module.scss";

const { errorMessage } = styles;

const ErrorMessage = ({ message }: TErrorMessageProps) => {
  return (
    <div>
      <p className={errorMessage}>{message}</p>
    </div>
  );
};

export { ErrorMessage };
