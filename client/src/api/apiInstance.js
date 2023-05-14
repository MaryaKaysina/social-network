import axios from 'axios';
import { BASE_URL } from '@core/const';

export const API = axios.create({baseURL: BASE_URL});