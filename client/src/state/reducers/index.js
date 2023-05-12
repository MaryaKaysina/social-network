import { combineReducers } from "redux";
import authReducer from '@core/state/reducers/authReducer';

export const reducers = combineReducers({ authReducer });