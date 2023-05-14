import * as PostApi from '@core/api/PostRequest';
import { 
  RETREIVING_START, 
  RETREIVING_SUCCESS,
  RETREIVING_FAIL
} from '@core/state/actions/actionTypes';

export const getTimelinePosts = (id) => async(dispatch) => {
  dispatch({ type: RETREIVING_START });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: RETREIVING_SUCCESS, data: data })
  } catch (error) {
    console.log(error);
    dispatch({ type: RETREIVING_FAIL });
  }
}