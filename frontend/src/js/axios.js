import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json",
    }
})

//요청을 가로채서 토큰을 달아주는 로직
api.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 꺼냄
        const token = localStorage.getItem("token");
        
        // 토큰이 존재한다면, 요청 헤더에 심어줌
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);