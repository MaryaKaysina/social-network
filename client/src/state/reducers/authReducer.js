import { LOCAL_KEY } from '@core/const';
import { 
  AUTH_START, 
  AUTH_SUCCESS, 
  AUTH_FAIL,
  LOG_OUT,
  UPDATING_START,
  UPDATING_SUCCESS,
  UPDATING_FAIL,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_LOAD
} from '@core/state/actions/actionTypes';

const initialState = {
  authData: null,
  loading: false,
  error: false,
  errMessage: '',
  updateLoading: false,
  followLoading: false
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
    case UPDATING_START:
      return { ...state, updateLoading: true, error: false };
    case UPDATING_SUCCESS:
      localStorage.setItem(LOCAL_KEY, JSON.stringify({...action?.data}));
      return { 
        ...state, 
        authData: action.data, 
        updateLoading: false, 
        error: false 
      };
    case UPDATING_FAIL:
      return { 
        ...state, 
        updateLoading: false, 
        error: true,
        errMessage: action.error
      };
    case FOLLOW_LOAD:
      return { 
        ...state, 
        followLoading: true
      };
    case FOLLOW_USER:
      return {
        ...state, 
        followLoading: false,
        authData: {
          ...state.authData, 
          userData: {
            ...state.authData.userData, 
            following: [...state.authData.userData.following, action.data]
          } 
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state, 
        followLoading: false,
        authData: {
          ...state.authData, 
          userData: {
            ...state.authData.userData, 
            following: [
              ...state.authData.userData.following
                .filter((personId)=>personId!==action.data)
            ]
          } 
        }
      };
    case LOG_OUT:
      localStorage.removeItem(LOCAL_KEY);
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default authReducer;