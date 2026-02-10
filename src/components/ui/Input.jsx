import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error, ...props }) => {
    return (
        <div style={{ marginBottom: '16px', width: '100%' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)'
                }}>
                    {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: error ? '1px solid var(--danger)' : 'var(--glass-border)',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent
                    backdropFilter: 'blur(10px)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? 'var(--danger)' : 'var(--glass-border)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05)';
                }}
                {...props}
            />
            {error && (
                <span style={{ display: 'block', marginTop: '4px', fontSize: '12px', color: 'var(--danger)' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
