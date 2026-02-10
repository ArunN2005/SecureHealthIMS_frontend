import React from 'react';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', size = 'md', className, fullWidth = false, style = {}, ...props }) => {
    const baseStyles = {
        borderRadius: 'var(--radius-full)',
        fontWeight: '700',
        cursor: 'none', // Custom cursor handles this
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        fontSize: '14px'
    };

    const variants = {
        primary: {
            background: 'var(--primary)',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px var(--primary-glow)',
            border: '1px solid rgba(255,255,255,0.1)',
        },
        secondary: {
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-stroke)',
            backdropFilter: 'blur(10px)',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '2px solid var(--primary)',
            color: 'var(--primary)',
        },
        danger: {
            background: 'var(--danger)',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(255, 59, 48, 0.2)',
        }
    };

    const sizes = {
        sm: { padding: '10px 20px', fontSize: '12px' },
        md: { padding: '14px 28px' },
        lg: { padding: '18px 36px', fontSize: '16px' },
    };

    const computedStyle = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        ...style
    };

    return (
        <button
            className={clsx('hover-scale', className)}
            style={computedStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
            }}
            {...props}
        >
            <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
            {/* Glossy Reflection Effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                transform: 'rotate(45deg)',
                transition: 'all 0.6s ease',
                pointerEvents: 'none'
            }} className="button-gloss" />
        </button>
    );
};

export default Button;
