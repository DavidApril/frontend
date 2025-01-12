"use client";
import { useEffect, useReducer, useState } from "react";
import { Provider } from "./context";
import { authReducer } from "./reducer";
import { AUTH_TOKENS_KEY, InitialState } from "./interfaces";
import { ISignin } from "@/core/interfaces";
import { AuthService } from "@/core/services";
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie'

const initialState: InitialState = {
  isAuthenticated: false,
  token: "",
  user: {
    id: "",
    name: "",
    email: "",
    roles: [],
  },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, initialState);
  const { isAuthenticated } = state;
  const { token } = state;

  const sign_in = async (credentials: ISignin) => {
    setLoading(true);

    const { user, token } = await AuthService.signin(credentials);
    dispatch({ type: "SIGN_IN", payload: { user: user, token: token } });
    Cookies.set(AUTH_TOKENS_KEY, token, { sameSite: 'strict' })

    setLoading(false);
    return { user, token };
  };

  const logout = async () => Cookies.remove(AUTH_TOKENS_KEY)

  useEffect(() => {
    if (token) dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
    else dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated])

  return (
    <Provider
      value={{
        sign_in,
        logout,
        loading,
        user: state.user,
        token: state.token,
        isAuth: state.isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};
