import {
  DisabledInput,
  PasswordVisibilityBtn,
  ErrorMessage,
  ActiveInput,
} from "../index";
import { usePartialPassword } from "./usePartialPassword";
import { PartialPasswordProps } from "./types";

import styles from "./rwd.module.scss";

const {
  formContent,
  formInputs,
  submitBtn,
  form,
  iconBtnContainer,
  formContainer,
} = styles;

const PartialPassword = ({
  password,
  onSuccess,
  passwordSettings,
}: PartialPasswordProps) => {
  const {
    activeInputIndexes,
    isVisible,
    hasError,
    message,
    inputActions,
    areAllInputsProvided,
    onSubmit,
    togglePasswordVisibility,
    addInputToRef,
  } = usePartialPassword(password, passwordSettings, onSuccess);

  const inputType = isVisible ? "text" : "password";

  return (
    <div className={formContainer}>
      <form className={form} onSubmit={onSubmit}>
        <div className={formContent}>
          <div>
            <div className={formInputs}>
              {Array.from(Array(passwordSettings.maxLength), (_, index) => {
                const indexAsString = index.toString();

                if (activeInputIndexes.includes(index)) {
                  return (
                    <ActiveInput
                      key={index}
                      id={indexAsString}
                      type={inputType}
                      label={index + 1}
                      ref={addInputToRef}
                      {...inputActions}
                    />
                  );
                }
                return (
                  <DisabledInput
                    key={index}
                    id={indexAsString}
                    label={index + 1}
                  />
                );
              })}
            </div>
            {hasError && <ErrorMessage message={message} />}
          </div>
          <div className={iconBtnContainer}>
            <PasswordVisibilityBtn
              onClick={togglePasswordVisibility}
              isVisible={isVisible}
            />
          </div>
        </div>

        <div className={submitBtn}>
          <button type="submit" disabled={!areAllInputsProvided}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export { PartialPassword };
