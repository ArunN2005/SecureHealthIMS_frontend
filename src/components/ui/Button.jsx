import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', size = 'md', className, fullWidth = false, style = {}, ...props }) => {
    const { theme } = useThemeContext();

    const baseStyles = {
        borderRadius: '9999px', // Pill shape
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto', // Restore fullWidth support
        // Common glass feel for all buttons
        backdropFilter: 'blur(10px)',
    };

    const variants = {
        primary: {
            background: 'var(--primary-gradient)', // Gradient
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)', // Colored glow
            border: '1px solid rgba(255,255,255,0.2)',
        },
        secondary: {
            backgroundColor: 'rgba(142, 142, 147, 0.15)',
            color: 'var(--text-primary)',
            border: '1px solid rgba(255,255,255,0.1)',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
        },
        danger: {
            background: 'linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)',
        }
    };

    const sizes = {
        sm: { padding: '8px 16px', fontSize: '13px' },
        md: { padding: '12px 24px', fontSize: '15px' },
        lg: { padding: '16px 32px', fontSize: '18px' },
    };

    const computedStyle = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        ...style
    };

    return (
        <button
            className={clsx(className)}
            style={computedStyle}
            onMouseEnter={(e) => {
                if (variant === 'primary' || variant === 'danger') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = variant === 'primary'
                        ? '0 8px 25px rgba(0, 122, 255, 0.5)'
                        : '0 8px 25px rgba(255, 59, 48, 0.5)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = variants[variant].boxShadow || 'none';
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'; // Return to hover state
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
