import axios from './axiosInstance';

// 인증번호 발송 API
export const sendMailCode = (email) => {
    return axios.post(
        `/auth/sendMailCode?email=${encodeURIComponent(email)}`,
        null
    );
};

// 인증번호 검증 및 로그인 API
export const verifyCodeLogin = ({ email, code, rememberMe }) => {
    const qs = `?email=${encodeURIComponent(email)}`
        + `&code=${encodeURIComponent(code)}`
        + `&rememberMe=${rememberMe}`;
    return axios.post(`/auth/codeVerify${qs}`, null);
};