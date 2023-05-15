import { LOCAL_KEY, LOCAL_BASE_KEY } from '@core/const';
import { 
  AUTH_START, 
  AUTH_SUCCESS, 
  AUTH_FAIL,
  LOG_OUT 
} from '@core/state/actions/actionTypes';

const initialState = {
  authData: null,
  loading: false,
  error: false,
  errMessage: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
        return { ...state, loading: true, error: false };
    case AUTH_SUCCESS:
      if(action?.data) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify({...action?.data}));
        return { 
          ...state, 
          authData: action.data, 
          loading: false, 
          error: false 
        };
      } else {
        return { 
          ...state, 
          loading: false, 
          error: true,
          errMessage: action.error
        };
      }
    case AUTH_FAIL:
      return { 
        ...state, 
        loading: false, 
        error: true,
        errMessage: action.error
      };
    case LOG_OUT:
      localStorage.removeItem(LOCAL_KEY);
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default authReducer;