import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/layout/Navbar';
import Tabs from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            await api.post(`/admin/approve/${id}`);
            alert('Doctor approved successfully');
            fetchUsers(); // Refresh list
        } catch (err) {
            alert('Failed to approve doctor');
        }
    };

    const handleBan = async (id, role, action) => {
        // action: 'ban' or 'unban'
        const verb = action === 'ban' ? 'ban' : 'unban';
        if (!window.confirm(`Are you sure you want to ${verb} this user?`)) return;

        try {
            const endpoint = action === 'ban' ? `/admin/ban/${id}` : `/admin/unban/${id}`;
            await api.post(endpoint, { role });
            alert(`User ${verb}ned successfully`);
            fetchUsers(); // Refresh list
        } catch (err) {
            alert(`Failed to ${verb} user`);
            console.error(err);
        }
    };

    // Filter Users based on Search
    const filteredUsers = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const patients = filteredUsers.filter(u => u.role === 'patient');
    const doctors = filteredUsers.filter(u => u.role === 'doctor');
    const nurses = filteredUsers.filter(u => u.role === 'nurse');

    // Doctor Sub-sections
    const pendingDoctors = doctors.filter(d => !d.verified);
    const verifiedDoctors = doctors.filter(d => d.verified);

    const UserList = ({ list, showActions = false }) => (
        <div style={{ display: 'grid', gap: '16px' }}>
            {list.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No users found.</p>}
            {list.map(user => (
                <Card key={user.id} padding="16px" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{user.name} ({user.email})</h4>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            <span style={{ marginRight: '12px' }}>Role: {user.role}</span>

                            {/* Status based on verified flag as requested */}
                            <span style={{
                                color: user.verified ? 'var(--success)' : 'var(--danger)',
                                fontWeight: 500
                            }}>
                                Status: {user.verified ? 'Unbanned' : 'Banned'}
                            </span>

                            {/* Patient Consent */}
                            {user.role === 'patient' && (
                                <span style={{ marginLeft: '12px' }}>
                                    Consent: {user.consent ? 'True' : 'False'} | Verified: {user.verified ? 'True' : 'False'}
                                </span>
                            )}
                        </div>
                        {user.role === 'doctor' && user.specialization && (
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Spec: {user.specialization}</p>
                        )}
                    </div>
                    {showActions && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {/* Doctor Approval (Only for unverified doctors) */}
                            {user.role === 'doctor' && !user.verified && (
                                <Button size="sm" onClick={() => handleApprove(user.id)}>Approve</Button>
                            )}

                            {/* Ban/Unban Buttons based on verified status */}
                            {user.verified ? (
                                <Button variant="danger" size="sm" onClick={() => handleBan(user.id, user.role, 'ban')}>Ban</Button>
                            ) : (
                                <Button variant="outline" size="sm" onClick={() => handleBan(user.id, user.role, 'unban')}>Unban</Button>
                            )}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );

    const DoctorTabContent = () => (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--warning)' }}>Pending Verification ({pendingDoctors.length})</h3>
                <UserList list={pendingDoctors} showActions={true} />
            </div>
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--success)' }}>Verified Doctors ({verifiedDoctors.length})</h3>
                <UserList list={verifiedDoctors} showActions={true} />
            </div>
        </div>
    );

    const tabs = [
        { id: 'doctors', label: 'Doctors', content: <DoctorTabContent /> },
        { id: 'patients', label: 'Patients', content: <UserList list={patients} showActions={true} /> },
        { id: 'nurses', label: 'Nurses', content: <UserList list={nurses} showActions={true} /> },
    ];

    if (loading) return <div style={{ padding: '24px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '24px', color: 'red' }}>{error}</div>;

    // Statistics (Verified/Unbanned only)
    const stats = {
        doctors: users.filter(u => u.role === 'doctor' && u.verified).length,
        patients: users.filter(u => u.role === 'patient' && u.verified).length,
        nurses: users.filter(u => u.role === 'nurse' && u.verified).length
    };

    return (
        <div style={{ minHeight: '100vh', /* Background is now global */ }}>
            <Navbar />
            <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage users and verifications</p>
                </div>

                {/* Stats Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <Card padding="20px">
                        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Verified Doctors</h3>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)' }}>{stats.doctors}</p>
                    </Card>
                    <Card padding="20px">
                        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Active Nurses</h3>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--success)' }}>{stats.nurses}</p>
                    </Card>
                    <Card padding="20px">
                        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Verified Patients</h3>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--info)' }}>{stats.patients}</p>
                    </Card>
                </div>

                <div style={{ marginBottom: '24px', maxWidth: '400px' }}>
                    <Input
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default AdminDashboard;
