import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X } from 'lucide-react';

const PatientRegistrationModal = ({
    show,
    onClose,
    onSubmit,
    formData,
    onChange,
    loading,
    message
}) => {
    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                        padding: '8px'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                    Register as User
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Fill in your details to register in the system. Fields marked with * are required.
                </p>

                {message && (
                    <div style={{
                        padding: '12px',
                        marginBottom: '16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: message.includes('success') || message.includes('Successfully')
                            ? 'rgba(52, 199, 89, 0.1)'
                            : 'rgba(255, 59, 48, 0.1)',
                        color: message.includes('success') || message.includes('Successfully')
                            ? 'var(--success)'
                            : 'var(--danger)'
                    }}>
                        {message}
                    </div>
                )}

                <form onSubmit={onSubmit} style={{ display: 'grid', gap: '16px' }}>
                    <Input
                        label="Full Name *"
                        name="full_name"
                        value={formData.full_name}
                        onChange={onChange}
                        required
                        placeholder="Enter your full name"
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input
                            label="Phone *"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={onChange}
                            required
                            placeholder="+1-555-1234"
                        />
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Date of Birth * (from patient record)
                            </label>
                            <input
                                type="date"
                                value={formData.date_of_birth}
                                readOnly
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '16px',
                                    outline: 'none',
                                    cursor: 'not-allowed',
                                    opacity: 0.7
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Gender *
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={onChange}
                                required
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
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <Input
                            label="Blood Group"
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={onChange}
                            placeholder="e.g. O+"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Address (from patient record)
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            readOnly
                            placeholder="No address on file"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--text-secondary)',
                                fontSize: '16px',
                                outline: 'none',
                                cursor: 'not-allowed',
                                opacity: 0.7
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input
                            label="Emergency Contact"
                            name="emergency_contact"
                            value={formData.emergency_contact}
                            onChange={onChange}
                            placeholder="Contact name"
                        />
                        <Input
                            label="Emergency Phone"
                            name="emergency_phone"
                            type="tel"
                            value={formData.emergency_phone}
                            onChange={onChange}
                            placeholder="Contact phone"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Allergies
                        </label>
                        <textarea
                            name="allergies"
                            value={formData.allergies}
                            onChange={onChange}
                            placeholder="List any allergies..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                minHeight: '80px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            Medical History
                        </label>
                        <textarea
                            name="medical_history"
                            value={formData.medical_history}
                            onChange={onChange}
                            placeholder="Previous health conditions or surgeries..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                minHeight: '100px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            style={{ flex: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? 'Registering...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientRegistrationModal;
