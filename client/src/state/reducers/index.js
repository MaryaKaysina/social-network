import { combineReducers } from "redux";
import authReducer from '@core/state/reducers/authReducer';
import postReducer from '@core/state/reducers/postReducer';

export const reducers = combineReducers({ authReducer, postReducer });