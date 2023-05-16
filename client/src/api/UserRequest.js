import { LOCAL_KEY } from '@core/const';
import { API } from '@core/api/apiInstance';

API.interceptors.request.use((req) => {
  if(localStorage.getItem(LOCAL_KEY)) {
    const token = JSON.parse(localStorage.getItem(LOCAL_KEY)).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUsers = () => API.get(`/user`);
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);