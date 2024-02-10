import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterSlice from "./Reducers/Reducers";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
  whitelist: ["token", "name", "email", "social"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth","cart_id"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, counterSlice),
});

export default persistReducer(rootPersistConfig, rootReducer);
