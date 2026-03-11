import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setMessage('');
        try {
            await api.post('/auth/forgot-password', { email });
            setStatus('success');
            setMessage('If that email is registered, a password reset link has been sent. Check your inbox (and spam folder).');
        } catch (err) {
            setStatus('error');
            setMessage(err?.response?.data?.message || 'Something went wrong. Please try again.');
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
                            Account Recovery
                        </div>
                        <h1 className="title-font text-shimmer" style={{
                            fontSize: '3.5rem',
                            fontWeight: 900,
                            marginBottom: '16px',
                            letterSpacing: '-2px',
                            lineHeight: 1.1
                        }}>
                            Forgot Password
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            opacity: 0.8
                        }}>
                            Enter your email and we&apos;ll send you a reset link.
                        </p>
                    </div>

                    <Card style={{
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                        border: '1px solid var(--glass-highlight)'
                    }}>
                        {status === 'success' ? (
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
                                    {message}
                                </p>
                                <div style={{ marginTop: '24px' }}>
                                    <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '14px' }}>
                                        ← Back to Sign In
                                    </Link>
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
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your registered email"
                                />
                                <Button type="submit" fullWidth disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPasswordPage;
