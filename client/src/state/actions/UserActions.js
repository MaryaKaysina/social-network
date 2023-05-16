import * as UserApi from '@core/api/UserRequest';
import { 
  UPDATING_START, 
  UPDATING_SUCCESS,
  UPDATING_FAIL,
  FOLLOW_USER,
  FOLLOW_FAIL,
  UNFOLLOW_USER,
  UNFOLLOW_FAIL,
  FOLLOW_LOAD
} from '@core/state/actions/actionTypes';
import { ERR_SERVER } from '@core/const';

export const updateUser = (id, formData) => async(dispatch) => {
  dispatch({ type: UPDATING_START });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: UPDATING_SUCCESS, data: data })
  } catch (error) {
    dispatch({ type: UPDATING_FAIL, error : error.response.data || ERR_SERVER });
  }
}

export const followUser = (id, data) => async(dispatch) => {
  dispatch({ type: FOLLOW_LOAD });
  try {
    await UserApi.followUser(id, data);
    dispatch({ type: FOLLOW_USER, data: id });
  } catch (error) {
    dispatch({ type: FOLLOW_FAIL, error : error.response.data || ERR_SERVER });
  }
}

export const unFollowUser = (id, data) => async(dispatch) => {
  dispatch({ type: FOLLOW_LOAD });
  try {
    await UserApi.unFollowUser(id, data);
    dispatch({ type: UNFOLLOW_USER, data: id });
  } catch (error) {
    dispatch({ type: UNFOLLOW_FAIL, error : error.response.data || ERR_SERVER });
  }
}