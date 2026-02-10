import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            const user = JSON.parse(localStorage.getItem('user'));
            navigate(user?.role === 'admin' ? '/admin' : '/');
        } else {
            // Check for specific "pending approval" message
            if (result.message && result.message.toLowerCase().includes('pending approval')) {
                alert("Your account is pending verification by an admin. Please wait for approval.");
            } else {
                setError(result.message);
            }
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {error && (
                <div style={{
                    padding: '12px',
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    color: 'var(--danger)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    marginBottom: '16px'
                }}>
                    {error}
                </div>
            )}

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
            />

            <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Logging in...' : 'Sign In'}
            </Button>

            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                New? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500 }}>Register now</Link>
            </div>
        </form>
    );
};

export default LoginForm;
