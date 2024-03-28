import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { meetingCreator } from "./slices";
import { AghotaApi } from "./services";

const store = configureStore({
  reducer: {
    meetingCreator: meetingCreator.reducer,
    [AghotaApi.reducerPath]: AghotaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AghotaApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
