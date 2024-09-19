import { configureStore, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import timetableSliceReducer from "./features/timetable.slice";

import { useStorage } from "@/lib/manage-store";
import { api } from "./api";
import { timetableApi } from "./api/timetable.api";

const persistConfig = {
  key: "root",
  storage,
};

type RootAction =
  | PayloadAction<any, "auth/refreshToken", { payload: any }>
  | PayloadAction<void, "user/signout">;

const appReducer = combineReducers({
  timetable: timetableSliceReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: RootState | undefined,
  action: RootAction
): RootState => {
  if (action.type === "auth/refreshToken") {
    const { setAccessToken } = useStorage();
    const token = action.payload.data.access;
    setAccessToken(token, { expires: 24 / 6 });
  }
  if (action.type === "user/signout") {
    const { removeAccessToken, removeRefreshToken } = useStorage();
    storage.removeItem("persist:root");
    state = undefined;
    removeAccessToken();
    removeRefreshToken();
    localStorage.clear();
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(timetableApi.middleware as Middleware),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
persistor.purge().then(() => {
  console.log('Persisted state has been purged.');
  });
