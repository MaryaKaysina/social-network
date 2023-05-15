import { API } from '@core/api/apiInstance';

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId: userId });

