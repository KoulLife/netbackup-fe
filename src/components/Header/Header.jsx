import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="board-logo">
                <img src="/Assets/logo.png" alt="로고"/>
            </div>
            <div>
                <input className="search-box"/>
            </div>
            <div>
                로그아웃
            </div>
        </div>
    );
};

export default Header;