import React from 'react';

const Card = ({ children, padding = '24px', style = {}, ...props }) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-xl)', // More rounded
                padding: padding,
                border: 'var(--glass-border)', // Glass border
                boxShadow: 'var(--glass-shadow)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
