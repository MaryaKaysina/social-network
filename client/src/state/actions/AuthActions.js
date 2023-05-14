import * as AuthApi from '@core/api/AuthRequests';
import { 
  AUTH_START, 
  AUTH_SUCCESS, 
  AUTH_FAIL 
} from '@core/state/actions/actionTypes';
import { ERR_SERVER } from '@core/const';

export const logIn = (formData) => async(dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: AUTH_SUCCESS, data: data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error : error.response.data || ERR_SERVER });
  }
}

export const signUp = (formData) => async(dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: AUTH_SUCCESS, data: data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error: error.response?.data.message || ERR_SERVER });
  }
}