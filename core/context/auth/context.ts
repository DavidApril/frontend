'use client';

import { createContext } from 'react';
import { AuthContextProps } from './interfaces';

export const authContext = createContext({} as AuthContextProps);
export const { Provider } = authContext;
