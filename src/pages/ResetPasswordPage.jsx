import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Parse recovery tokens from the URL hash once on module load — no side-effect needed.
function parseRecoveryTokens() {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    if (params.get('type') !== 'recovery' || !params.get('access_token')) {
        return { accessToken: '', refreshToken: '', tokenError: 'This password reset link is invalid or has expired. Please request a new one.' };
    }
    // Clean the hash from the URL without a reload
    history.replaceState(null, '', window.location.pathname);
    return { accessToken: params.get('access_token'), refreshToken: params.get('refresh_token') || '', tokenError: '' };
}

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [{ accessToken, refreshToken, tokenError }] = useState(parseRecoveryTokens);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setStatus('error');
            setMessage('Password must be at least 8 characters.');
            return;
        }

        setStatus('loading');
        setMessage('');
        try {
            await api.post('/auth/reset-password', {
                access_token: accessToken,
                refresh_token: refreshToken || accessToken,
                password,
            });
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setMessage(err?.response?.data?.message || 'Failed to reset password. The link may have expired.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <Navbar />
            <div className="animate-fade-in" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 100px)',
                padding: '24px'
            }}>
                <div style={{ width: '100%', maxWidth: '440px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div
                            className="float-subtle"
                            style={{
                                display: 'inline-block',
                                background: 'var(--primary-glow)',
                                color: 'var(--primary)',
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '13px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                marginBottom: '24px',
                                border: '1px solid var(--primary-glow)',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }}
                        >
                            Set New Password
                        </div>
                        <h1 className="title-font text-shimmer" style={{
                            fontSize: '3.5rem',
                            fontWeight: 900,
                            marginBottom: '16px',
                            letterSpacing: '-2px',
                            lineHeight: 1.1
                        }}>
                            Reset Password
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            opacity: 0.8
                        }}>
                            Choose a strong new password for your account.
                        </p>
                    </div>

                    <Card style={{
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                        border: '1px solid var(--glass-highlight)'
                    }}>
                        {tokenError ? (
                            <div style={{ textAlign: 'center', padding: '8px 0' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 59, 48, 0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '26px'
                                }}>⚠</div>
                                <p style={{ color: 'var(--danger)', fontSize: '15px', lineHeight: 1.6 }}>
                                    {tokenError}
                                </p>
                                <div style={{ marginTop: '24px' }}>
                                    <Link to="/forgot-password" style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '14px' }}>
                                        Request a new reset link →
                                    </Link>
                                </div>
                            </div>
                        ) : status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '8px 0' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'rgba(52, 199, 89, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '28px'
                                }}>✓</div>
                                <p style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.6 }}>
                                    Your password has been reset successfully.
                                </p>
                                <div style={{ marginTop: '24px' }}>
                                    <Button onClick={() => navigate('/login')} fullWidth>
                                        Sign In with New Password
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {status === 'error' && (
                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: 'rgba(255, 59, 48, 0.1)',
                                        color: 'var(--danger)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        {message}
                                    </div>
                                )}
                                <Input
                                    label="New Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="At least 8 characters"
                                />
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Repeat your new password"
                                />
                                <Button type="submit" fullWidth disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                                </Button>
                                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                                        ← Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        )}
                    </Card>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Secure &amp; Encrypted HIPAA Compliant Platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
