import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${clientX}px`;
                cursorRef.current.style.top = `${clientY}px`;
            }

            if (followerRef.current) {
                // Subtle delay for the follower
                setTimeout(() => {
                    if (followerRef.current) {
                        followerRef.current.style.left = `${clientX}px`;
                        followerRef.current.style.top = `${clientY}px`;
                    }
                }, 50);
            }
        };

        const onMouseDown = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
            if (followerRef.current) followerRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        };

        const onMouseUp = () => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            if (followerRef.current) followerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <>
            <div id="custom-cursor" ref={cursorRef} />
            <div id="custom-cursor-follower" ref={followerRef} />
        </>
    );
};

export default CustomCursor;
