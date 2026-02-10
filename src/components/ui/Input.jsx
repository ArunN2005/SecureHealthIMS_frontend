import React, { useState } from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error, ...props }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div style={{ marginBottom: '24px', width: '100%' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: focused ? 'var(--primary)' : 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                }}>
                    {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid',
                        borderColor: error ? 'var(--danger)' : (focused ? 'var(--primary)' : 'var(--glass-stroke)'),
                        backgroundColor: focused ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(12px)',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: focused ? '0 0 20px var(--primary-glow)' : 'none',
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
                {error && (
                    <span style={{
                        display: 'block',
                        marginTop: '6px',
                        fontSize: '12px',
                        color: 'var(--danger)',
                        fontWeight: 500
                    }}>
                        {error}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
