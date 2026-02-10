import React from 'react';

const Card = ({ children, padding = '32px', style = {}, ...props }) => {
    return (
        <div
            className="glass-card"
            style={{
                padding: padding,
                borderRadius: 'var(--radius-lg)',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
