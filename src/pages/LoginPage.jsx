import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/ui/Card';
import Navbar from '../components/layout/Navbar';

const LoginPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
                padding: '24px'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your medical records</p>
                    </div>
                    <Card padding="32px">
                        <LoginForm />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
