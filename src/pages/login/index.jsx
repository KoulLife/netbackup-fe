import React, {useEffect, useState} from 'react';
import './login.css';
import * as motion from "motion/react-client";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
import transition from "../../components/transition";
import {FaLock, FaUser} from "react-icons/fa";
import {sendMailCode, verifyCodeLogin} from "../../api/authApi";

const Login = () => {
    // 상태 변수
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isAuthSent, setIsAuthSent] = useState(false);
    const [isAutoLogin, setIsAutoLogin] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isSending, setIsSending] = useState(false);

    // 자동 로그인 저장된 토큰 있으면 바로 이동
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) window.location.href = "/dashboard";
    }, []);

    // 타이머 효과
    useEffect(() => {
        let timer;
        if (isAuthSent && seconds > 0) {
            timer = setInterval(() => setSeconds(s => s - 1), 1000);
        }
        if (isAuthSent && seconds === 0) {
            alert('인증번호 유효시간이 만료되었습니다.');
            setIsAuthSent(false);
            setCode("");
        }
        return () => clearInterval(timer);
    }, [isAuthSent, seconds]);

    // 인증번호 발송
    const handleSendCode = async () => {
        if (isSending || !email.trim()) {
            if (!email.trim()) alert("회사 이메일을 입력하세요.");
            return;
        }
        setIsSending(true);
        try {
            await sendMailCode(email);
            setIsAuthSent(true);
            setSeconds(180);
        } catch (err) {
            alert(err.response?.data?.message || "인증번호 발송 실패");
        } finally {
            setIsSending(false);
        }
    };

    // 로그인
    const handleLogin = async () => {
        if (!code.trim()) {
            alert("인증번호를 입력하세요.");
            return;
        }
        try {
            const res = await verifyCodeLogin({email, code, rememberMe: isAutoLogin});
            // 자동로그인 선택 시 token 저장
            if (isAutoLogin && res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            window.location.href = "/dashboard";
        } catch (err) {
            alert(err.response?.data?.message || "로그인 실패");
        }
    };

    // 시간 포맷
    const formatTime = secs => {
        const m = String(Math.floor(secs / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    // 자동 로그인 토글
    const toggleSwitch = () => setIsAutoLogin(prev => !prev);

    return (
        <>
            <BackgroundVideo/>

            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="logo">
                            <img src="/Assets/logo.png" alt="로고"/>
                        </div>

                        {/* 이메일 입력 */}
                        <div className="input-box email">
                            <input
                                type="email"
                                placeholder="회사 이메일 입력"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                readOnly={isAuthSent}
                                onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                            />
                            <FaUser className="icon"/>
                        </div>

                        {/* 인증번호 입력 */}
                        {isAuthSent && (
                            <div className="input-box passcode">
                                <input
                                    type="text"
                                    placeholder="인증번호 입력"
                                    required
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleLogin();
                                        }
                                    }}
                                />
                                <FaLock className="icon"/>
                            </div>
                        )}

                        {/* 자동로그인 토글 + 타이머 */}
                        {isAuthSent && (
                            <div className="top-row">
                                <label className="auto-login">
                                    <button
                                        type="button"
                                        className="toggle-container"
                                        style={{
                                            ...container,
                                            justifyContent: isAutoLogin ? 'flex-end' : 'flex-start',
                                        }}
                                        onClick={toggleSwitch}
                                    >
                                        <motion.div
                                            className="toggle-handle"
                                            style={handleStyle}
                                            layout
                                            transition={{type: 'spring', visualDuration: 0.2, bounce: 0.2}}
                                        />
                                    </button>
                                    {/* 하이라이트 클래스 동적 적용 */}
                                    <div className={`summary ${isAutoLogin ? 'highlight' : ''}`}>자동로그인</div>
                                </label>
                                <div className="timer">{formatTime(seconds)}</div>
                            </div>
                        )}

                        {/* 버튼 그룹 */}
                        {isAuthSent ? (
                            <div className="actions-row">
                                <button
                                    type="button"
                                    className="send-code-btn"
                                    onClick={handleSendCode}
                                    disabled={isSending}
                                >
                                    {isSending ? '전송 중...' : '인증번호 재발송'}
                                </button>
                                <button
                                    type="button"
                                    className="send-code-btn login-btn"
                                    onClick={handleLogin}
                                >
                                    로그인
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="send-code-btn full-width"
                                onClick={handleSendCode}
                                disabled={isSending}
                            >
                                {isSending ? '전송 중...' : '인증번호 발송'}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default transition(Login);

// 토글 스위치 스타일
const container = {
    width: 60,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    cursor: 'pointer',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
};
const handleStyle = {
    width: 20,
    height: 20,
    backgroundColor: '#9911ff',
    borderRadius: '50%',
};
