
// import { configureStore } from '@reduxjs/toolkit';
// import sessionTokenReducer from './sessionTokenSlice';

// const store = configureStore({
//   reducer: {
//     sessionToken: sessionTokenReducer,
//   },
// });
// export type AppStore = ReturnType<typeof store>

// export default store;
// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sessionTokenReducer from './sessionTokenSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sessionToken: sessionTokenReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];