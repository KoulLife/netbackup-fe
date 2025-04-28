import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: '/netbackup/api',
   timeout: 5000,
   headers: {
       'Content-Type': 'application/json',
   }
});

// 요청 인터셉터 (토큰 추가 등)
axiosInstance.interceptors.request.use((config) => {
    // 예: 토큰 있으면 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;