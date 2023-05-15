import { 
  UPLOAD_START, 
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RETREIVING_START,
  RETREIVING_SUCCESS,
  RETREIVING_FAIL
} from '@core/state/actions/actionTypes';

const initialState = {
  posts: [],
  error: false,
  errMessage: '',
  uploading: false,
  loading: false,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_START:
        return { ...state, uploading: true, error: false };
    case UPLOAD_SUCCESS:
      return { 
        ...state,
        posts: [ action.data, ...state.posts ], 
        uploading: false, 
        error: false 
      };
    case UPLOAD_FAIL:
      return { 
        ...state, 
        uploading: false, 
        error: true,
        errMessage: action.error
      };
    case RETREIVING_START:
      return { ...state, loading: true, error: false };
    case RETREIVING_SUCCESS:
      return { ...state, posts: action.data, loading: false, error: false };
    case RETREIVING_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export default postReducer;