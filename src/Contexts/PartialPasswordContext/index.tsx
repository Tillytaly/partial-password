import { useState, useContext, createContext } from "react";
import { TPartialPassword, TPartialPasswordContext } from "./types";
import { PartialPasswordProviderProps } from "./types";

const PartialPasswordContext = createContext<null | TPartialPasswordContext>(
  null
);

export const PartialPasswordProvider = ({
  children,
}: PartialPasswordProviderProps) => {
  const [partialPassword, setPartialPassword] = useState<TPartialPassword>({});

  return (
    <PartialPasswordContext.Provider
      value={{ partialPassword, setPartialPassword }}
    >
      {children}
    </PartialPasswordContext.Provider>
  );
};

export const usePartialPasswordContext = () => {
  const context = useContext(PartialPasswordContext);

  if (!context) throw new Error("No context provided");

  return context;
};
