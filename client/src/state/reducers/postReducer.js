import { 
  UPLOAD_START, 
  UPLOAD_SUCCESS,
  UPLOAD_FAIL
} from '@core/state/actions/actionTypes';

const initialState = {
  posts: [],
  error: false,
  errMessage: '',
  uploading: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_START:
        return { ...state, uploading: true, error: false };
    case UPLOAD_SUCCESS:
      return { 
        ...state, 
        posts: [...action.data], 
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
    default:
      return state;
  }
}

export default postReducer;