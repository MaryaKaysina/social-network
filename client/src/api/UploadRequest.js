import { API } from '@core/api/apiInstance';

export const uploadImage = (data) => API.post('/upload', data);
export const uploadPost = (data) => API.post('/post', data);