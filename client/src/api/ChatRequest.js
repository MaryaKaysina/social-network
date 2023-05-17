import { LOCAL_KEY } from '@core/const';
import { API } from '@core/api/apiInstance';

API.interceptors.request.use((req) => {
  if(localStorage.getItem(LOCAL_KEY)) {
    const token = JSON.parse(localStorage.getItem(LOCAL_KEY)).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

export const userChats = (id) => API.get(`/chat/${id}`);