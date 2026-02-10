import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [role, setRole] = useState('patient');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        address: '',
        role: 'patient',
        // Patient specific
        date_of_birth: '',
        gender: 'male',
        // Doctor specific
        specialization: '',
        department_id: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        setFormData({ ...formData, role: newRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Sanitize data (convert empty strings to null/undefined)
        const payload = { ...formData };

        // Helper regex for UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (role === 'patient') {
            delete payload.specialization;
            delete payload.department_id;
        } else if (role === 'doctor') {
            delete payload.date_of_birth;
            delete payload.gender;

            // Handle optional department_id
            if (!payload.department_id || payload.department_id.trim() === '') {
                delete payload.department_id;
            } else if (!uuidRegex.test(payload.department_id)) {
                setError('Department ID must be a valid UUID format (e.g., 123e4567-e89b-12d3...)');
                setLoading(false);
                return;
            }
        }

        const res = await register(payload);

        if (res.success) {
            // If doctor, they are unverified, show message
            if (role === 'doctor') {
                alert("Registration successful! Your account is pending verification by an admin.");
                navigate('/login');
            } else {
                // Patient - auto login usually? But register API just returns success.
                // Let's redirect to login for simplicity
                alert("Registration successful! Please login.");
                navigate('/login');
            }
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {error && (
                <div style={{ padding: '12px', backgroundColor: 'rgba(255, 59, 48, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)' }}>
                    {error}
                </div>
            )}

            {/* Role Selection */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    I am a:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['patient', 'doctor'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => handleRoleChange({ target: { value: r } })}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: 'var(--radius-md)',
                                border: role === r ? '2px solid var(--accent)' : '1px solid var(--border)',
                                backgroundColor: role === r ? 'rgba(0, 122, 255, 0.1)' : 'var(--bg-secondary)',
                                color: role === r ? 'var(--accent)' : 'var(--text-primary)',
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="123-456-7890" />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" />

            {role === 'patient' && (
                <>
                    <Input label="Date of Birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </>
            )}

            {role === 'doctor' && (
                <>
                    <Input label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} required placeholder="Cardiology" />
                    {/* Department ID could be a select fetching from DB, keeping text for now */}
                    <Input label="Department ID (Optional)" name="department_id" value={formData.department_id} onChange={handleChange} placeholder="UUID" />
                </>
            )}

            <Button type="submit" fullWidth disabled={loading} style={{ marginTop: '8px' }}>
                {loading ? 'Creating Account...' : 'Register'}
            </Button>

            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Login</Link>
            </div>
        </form>
    );
};

export default RegisterForm;
