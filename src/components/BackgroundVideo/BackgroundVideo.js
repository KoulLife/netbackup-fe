import React from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = () => {
    return (
        <video autoPlay muted loop className="video-background">
            <source src="/Assets/background.mp4" type="video/mp4" />
        </video>
    );
};

export default BackgroundVideo;