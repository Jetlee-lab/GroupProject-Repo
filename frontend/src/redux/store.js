import { configureStore, combineReducers } from "@reduxjs/toolkit";

// We'll use redux-logger just as an example of adding another middleware
// import logger from 'redux-logger'

// And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from 'redux-batched-subscribe'

import authReducer from "./features/auth/authSlice";
import issuesReducer from "./features/issuesSilce"

export const reducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer
});

const preloadedState = {
  auth: null,
  issues: null,
};

// const debounceNotify = _.debounce((notify) => notify())

export const store = configureStore({
  reducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  //   devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
  //   enhancers: (getDefaultEnhancers) =>
  //     getDefaultEnhancers({
  //       autoBatch: false,
  //     }).concat(batchedSubscribe(debounceNotify)),
});
