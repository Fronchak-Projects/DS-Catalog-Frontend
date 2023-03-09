import axios from 'axios';
import qs from 'qs';

export const BASE_URL = 'http://localhost:8080';
const CLIENT_ID = 'dscatalog';
const CLIENT_SECRET = 'dscatalog123';
const AUTH_DATA  = 'authData';

export const basicHeader = () => {
  const code = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  return `Basic ${code}`;
}

type LoginData = {
  username: string;
  password: string;
}

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  }

  const data = qs.stringify({
    username: loginData.username,
    password: loginData.password,
    grant_type: 'password'
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers
  });
}

export const saveAuthData = (loginResponse: any) => {
  localStorage.setItem(AUTH_DATA, JSON.stringify(loginResponse));
}

export const getAuthData = () => {
  const stringToken = localStorage.getItem(AUTH_DATA) ?? "{}";
  return JSON.parse(stringToken);
}

export const getPageParams = (request: Request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 0;
  const categoryId = url.searchParams.get("categoryId") || 0;
  const filter = url.searchParams.get("filter");
  return {
    page,
    size: 4,
    filter,
    categoryId
  }
}
