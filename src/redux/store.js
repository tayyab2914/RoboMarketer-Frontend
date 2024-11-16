import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk"; // Import correctly

import rootReducer from "./rootReducer";  // Ensure correct path

const persistConfig = {
  key: "webVideoPersistStore",
  storage,
  blacklist: [],  // Blacklist other reducers if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)// Apply middleware and Redux DevTools
  );

const persistor = persistStore(store);

export default store;
export { persistor };
