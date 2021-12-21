import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import { combineReducers } from "redux";
import userReducerScreen, { USER_NAME } from "./store/userReducerScreen";
const rootReducer = combineReducers({
  [USER_NAME]: userReducerScreen,
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;
