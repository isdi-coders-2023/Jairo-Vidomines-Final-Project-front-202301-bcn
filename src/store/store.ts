import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";
import { projectsReducer } from "./features/projectsSlice/projectsSlice";
import { userReducer } from "./features/userSlice/userSlice";
import { uiReducer } from "./features/uiSlice/uiSlice";

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  project: projectsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
