import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "@core/state/reducers";
import { LOCAL_BASE_KEY } from '@core/const';

function saveToLocalStorage(store) {
  try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem(LOCAL_BASE_KEY, serializedStore);
  } catch(e) {
      console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
      const serializedStore = window.localStorage.getItem(LOCAL_BASE_KEY);
      if(serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
  } catch(e) {
      console.log(e);
      return undefined;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;