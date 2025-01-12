import { ISignin, OSignin } from "@/core/interfaces";

export type ACTIONS =
  | { type: "SIGN_IN"; payload: OSignin }
  | { type: "SIGN_UP"; payload: {} }
  | { type: "SET_IS_AUTHENTICATED"; payload: boolean };

export interface InitialState {
  user: OSignin["user"];
  token: OSignin["token"];
  isAuthenticated: boolean;
}

export interface AuthContextProps {
  sign_in: (credentials: ISignin) => Promise<OSignin>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuth: boolean;
  token: string;
  user: OSignin["user"];
}

export const AUTH_TOKENS_KEY = 'user-access-token'
