import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { TPasswordVisibilityBtnProps } from "./types";
import { usePartialPasswordContext } from "../../Contexts";

import styles from "./PasswordVisibilityBtn.module.scss";
const { button, buttonIcon } = styles;

const PasswordVisibilityBtn = ({
  onClick,
  isVisible,
}: TPasswordVisibilityBtnProps) => {
  const { partialPassword } = usePartialPasswordContext();
  const isNoInputProvided = Object.values(partialPassword).length === 0;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isNoInputProvided}
      className={button}
    >
      {isVisible ? (
        <BsEyeSlash className={buttonIcon} />
      ) : (
        <BsEyeFill className={buttonIcon} />
      )}
    </button>
  );
};

export { PasswordVisibilityBtn };
