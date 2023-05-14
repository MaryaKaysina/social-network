import { API } from '@core/api/apiInstance';

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`, id);

