import axios from 'axios';
import qs from 'qs';
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json' },
});

service.interceptors.request.use(
  config =>
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data);
    // }
    config,
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

export default service;
