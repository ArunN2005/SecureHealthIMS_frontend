import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Card from '../components/ui/Card';
import Navbar from '../components/layout/Navbar';

const RegisterPage = () => {
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
                <div style={{ width: '100%', maxWidth: '480px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Create Account</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Join MediCare for better health management</p>
                    </div>
                    <Card padding="32px">
                        <RegisterForm />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
