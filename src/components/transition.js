import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const transition = (OgComponent) => {
    return () => {
        // 로딩 완료 후 slide-out 제거를 위한 상태 관리
        const [showOverlay, setShowOverlay] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setShowOverlay(false);
            }, 1000); // 1초 후 overlay 제거
            return () => clearTimeout(timer);
        }, []);

        return (
            <>
                <OgComponent/>
                <AnimatePresence>
                    {showOverlay && (
                        <motion.div
                            className="slide-out"
                            style={{ zIndex: 100 }}
                            initial={{scaleY: 1}}
                            animate={{scaleY: 0}}
                            exit={{scaleY: 0}}
                            transition={{duration: 1, ease: [0.22, 1, 0.36, 1]}}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }
};

export default transition;
