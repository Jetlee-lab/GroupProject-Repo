
import type { AxiosInstance } from 'axios';
import axios from 'axios'
import config from '@/config'
import { createContext, useContext } from 'react';

export const client = axios.create({
    baseURL: config.API_SERVER,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });


export const ClientContext = createContext<AxiosInstance | null>(null);

// O11+ if (process.env.NODE_ENV !== 'production') {
// O11+   ClientContext.displayName = 'ClientContext';
// O11+ }

export const ClientProvider = ClientContext.Provider

export const useClient = (): AxiosInstance => {
    const c = useContext(ClientContext)
    
    if (!c) throw Error("Need to call useClient() as child of a <ClientProvider> component.")
    return c
}
