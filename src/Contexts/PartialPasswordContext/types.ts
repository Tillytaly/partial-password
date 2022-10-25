import { PropsWithChildren } from "react";

export type TPartialPasswordContext = {
  setPartialPassword: React.Dispatch<React.SetStateAction<TPartialPassword>>;
  partialPassword: TPartialPassword;
};

export type TPartialPassword = {
  [key: string]: string;
};

export interface PartialPasswordProviderProps extends PropsWithChildren {}
