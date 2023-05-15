import { API } from '@core/api/apiInstance';

export const getUser = (userId) => API.get(`/user/${userId}`);