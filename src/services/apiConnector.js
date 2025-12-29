// import axios from "axios";

// export const axiosInstance = axios.create({
//     withCredentials: true
// });

// export const apiConnector = (method, url, bodyData, headers, params)=>{
//     return axiosInstance({
//         method,
//         url,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null,
//     });
// };

import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

// Add interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
  });
};
