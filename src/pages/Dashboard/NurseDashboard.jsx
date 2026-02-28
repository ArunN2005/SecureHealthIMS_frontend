/**
 * Nurse Dashboard
 * 
 * Provides medical staff with read-only access to patient records,
 * prescriptions, and medical history. Designed for care coordination
 * with strict audit-logging of all data access.
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Navbar from '../../components/layout/Navbar';
import Card from '../../components/ui/Card';
import { User, Calendar, Search, ChevronRight, FileText, Eye, Lock, Stethoscope, Phone, Mail, MapPin, AlertCircle, Pill, Activity, X } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const NurseDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Patient Search State (Read-Only)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loadingPatient, setLoadingPatient] = useState(false);
    const [searching, setSearching] = useState(false);

    // Patient detail data
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loadingMedical, setLoadingMedical] = useState(false);
    const [patientDetailTab, setPatientDetailTab] = useState('info');

    const handleSearchPatients = async () => {
        setSearching(true);
        try {
            const res = await api.get(`/patients/search?q=${encodeURIComponent(searchQuery)}`);
            if (res.data.success) {
                setSearchResults(res.data.data);
            }
        } catch (error) {
            console.error('Search failed', error);
        }
        setSearching(false);
    };

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length >= 2 && activeTab === 'patients') {
                handleSearchPatients();
            } else {
                setSearchResults([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, activeTab]);

    // When a patient is selected: fetch full profile by ID (triggers backend audit log),
    // then fetch prescriptions, appointments, medical records
    const handleSelectPatient = async (patient) => {
        setLoadingPatient(true);
        setSelectedPatient(null);
        setPrescriptions([]);
        setAppointments([]);
        setMedicalRecords([]);
        setPatientDetailTab('info');

        try {
            // This GET /patients/:id call logs nurse access in the audit trail on the backend
            const res = await api.get(`/patients/${patient.id}`);
            if (res.data.success) {
                setSelectedPatient(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch patient profile:', err);
            // Fallback to search result data
            setSelectedPatient(patient);
        }
        setLoadingPatient(false);

        // Fetch all patient data in parallel
        setLoadingPrescriptions(true);
        setLoadingAppointments(true);
        setLoadingMedical(true);

        const [rxRes, aptRes, mrRes] = await Promise.allSettled([
            api.get(`/prescriptions/patient/${patient.id}`),
            api.get(`/appointments/patient/${patient.id}`),
            api.get(`/medical-records/patient/${patient.id}`),
        ]);

        if (rxRes.status === 'fulfilled' && rxRes.value.data.success) {
            setPrescriptions(rxRes.value.data.data?.prescriptions || rxRes.value.data.data || []);
        }
        setLoadingPrescriptions(false);

        if (aptRes.status === 'fulfilled' && aptRes.value.data.success) {
            setAppointments(aptRes.value.data.data?.appointments || aptRes.value.data.data || []);
        }
        setLoadingAppointments(false);

        if (mrRes.status === 'fulfilled' && mrRes.value.data.success) {
            setMedicalRecords(mrRes.value.data.data?.records || mrRes.value.data.data || []);
        }
        setLoadingMedical(false);
    };

    const renderPatientDetailTabs = () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['info', 'prescriptions', 'appointments', 'medical-history'].map(t => (
                <button
                    key={t}
                    onClick={() => setPatientDetailTab(t)}
                    style={{
                        padding: '8px 18px',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        backgroundColor: patientDetailTab === t ? 'var(--success)' : 'var(--bg-secondary)',
                        color: patientDetailTab === t ? 'white' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        letterSpacing: '0.3px'
                    }}
                >
                    {t.replace('-', ' ')}
                </button>
            ))}
        </div>
    );

    const renderPatientInfo = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                    { label: 'Blood Group', value: selectedPatient.blood_group || 'N/A', icon: <Activity size={14} /> },
                    { label: 'Date of Birth', value: selectedPatient.date_of_birth || selectedPatient.dob || 'N/A', icon: <Calendar size={14} /> },
                    { label: 'Gender', value: selectedPatient.gender || 'N/A', icon: <User size={14} /> },
                    { label: 'Phone', value: selectedPatient.phone || 'N/A', icon: <Phone size={14} /> },
                    { label: 'Email', value: selectedPatient.email || 'N/A', icon: <Mail size={14} /> },
                    { label: 'Address', value: selectedPatient.address || 'N/A', icon: <MapPin size={14} /> },
                ].map(({ label, value, icon }) => (
                    <div key={label} style={{ padding: '14px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {icon}{label}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{value}</span>
                    </div>
                ))}
            </div>
            {selectedPatient.allergies && (
                <div style={{ padding: '14px', backgroundColor: 'rgba(255,59,48,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,59,48,0.2)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Allergies</div>
                    <span style={{ fontSize: '14px' }}>{selectedPatient.allergies}</span>
                </div>
            )}
            {selectedPatient.medical_history && (
                <div style={{ padding: '14px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Medical History (Summary)</div>
                    <span style={{ fontSize: '14px', lineHeight: '1.6' }}>{selectedPatient.medical_history}</span>
                </div>
            )}
            {selectedPatient.emergency_contact && (
                <div style={{ padding: '14px', backgroundColor: 'rgba(255,149,0,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,149,0,0.2)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--warning)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Emergency Contact</div>
                    <span style={{ fontWeight: 600 }}>{selectedPatient.emergency_contact}</span>
                    {selectedPatient.emergency_phone && <span style={{ color: 'var(--text-secondary)', marginLeft: '12px' }}>{selectedPatient.emergency_phone}</span>}
                </div>
            )}
        </div>
    );

    const renderPrescriptions = () => (
        loadingPrescriptions ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '24px 0' }}>Loading prescriptions...</p>
        ) : prescriptions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                <Pill size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p>No prescriptions found.</p>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {prescriptions.map(px => (
                    <div key={px.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>{px.medication_name}</h4>
                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{px.dosage} &bull; {px.frequency}</span>
                            </div>
                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(0,122,255,0.1)', color: 'var(--accent)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                {px.duration || 'Ongoing'}
                            </span>
                        </div>
                        {px.instructions && <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}><strong>Instructions:</strong> {px.instructions}</p>}
                        <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Prescribed by {px.users?.name || px.doctors?.name || 'Doctor'} &bull; {px.created_at ? new Date(px.created_at).toLocaleDateString() : ''}
                        </div>
                    </div>
                ))}
            </div>
        )
    );

    const renderAppointments = () => (
        loadingAppointments ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '24px 0' }}>Loading appointments...</p>
        ) : appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                <Calendar size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p>No appointments found.</p>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {appointments.map(apt => {
                    const statusColor = apt.status === 'Confirmed' ? 'var(--success)' : apt.status === 'Cancelled' ? 'var(--danger)' : apt.status === 'Completed' ? 'var(--accent)' : 'var(--warning)';
                    return (
                        <div key={apt.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: `1px solid var(--border)`, borderLeft: `4px solid ${statusColor}`, backgroundColor: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                                    {apt.date || apt.appointment_date} &nbsp;{apt.time || apt.appointment_time && `at ${apt.appointment_time}`}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    Dr. {apt.doctor_details?.name || apt.doctor?.name || apt.doctor_name || 'Unknown'}
                                    {apt.doctor_details?.specialization && ` Â· ${apt.doctor_details.specialization}`}
                                </div>
                                {apt.reason && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Reason: {apt.reason}</div>}
                            </div>
                            <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: `${statusColor}20`, color: statusColor, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                {apt.status}
                            </span>
                        </div>
                    );
                })}
            </div>
        )
    );

    const renderMedicalHistory = () => (
        loadingMedical ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '24px 0' }}>Loading medical history...</p>
        ) : medicalRecords.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                <FileText size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p>No medical records found.</p>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {medicalRecords.map(rec => (
                    <div key={rec.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: 700, fontSize: '15px' }}>{rec.record_type || 'Medical Record'}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{rec.created_at ? new Date(rec.created_at).toLocaleDateString() : ''}</span>
                        </div>
                        {rec.chief_complaint && <p style={{ margin: '0 0 6px', fontSize: '13px' }}><strong>Complaint:</strong> {rec.chief_complaint}</p>}
                        {rec.diagnosis && <p style={{ margin: '0 0 6px', fontSize: '13px' }}><strong>Diagnosis:</strong> {rec.diagnosis}</p>}
                        {rec.notes && <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{rec.notes}</p>}
                    </div>
                ))}
            </div>
        )
    );

    const renderPatientsTab = () => (
        <div style={{ display: 'grid', gridTemplateColumns: selectedPatient || loadingPatient ? '320px 1fr' : '1fr', gap: '24px' }}>
            {/* Search Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Card>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Search size={16} /> Find Patient
                    </h3>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Name, email or phone..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '10px 10px 10px 38px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    {searching && <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>Searching...</p>}
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {searchResults.map(p => (
                            <div
                                key={p.id}
                                onClick={() => handleSelectPatient(p)}
                                style={{
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: selectedPatient?.id === p.id ? 'var(--success)' : 'var(--bg-secondary)',
                                    color: selectedPatient?.id === p.id ? 'white' : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.full_name || p.name}</div>
                                    <div style={{ fontSize: '12px', opacity: 0.75 }}>{p.email}</div>
                                </div>
                                <ChevronRight size={16} />
                            </div>
                        ))}
                        {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '8px 0' }}>No patients found.</p>
                        )}
                        {searchQuery.length === 0 && (
                            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '8px 0' }}>Type at least 2 characters to search.</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Patient Detail Panel */}
            {(selectedPatient || loadingPatient) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {loadingPatient ? (
                        <Card><p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading patient...</p></Card>
                    ) : (
                        <Card>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'rgba(52,199,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', flexShrink: 0 }}>
                                        <User size={26} />
                                    </div>
                                    <div>
                                        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>{selectedPatient.full_name || selectedPatient.name}</h2>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            {selectedPatient.gender && <span>{selectedPatient.gender}</span>}
                                            {selectedPatient.blood_group && <><span>Â·</span><span>Blood: {selectedPatient.blood_group}</span></>}
                                            {(selectedPatient.date_of_birth || selectedPatient.dob) && <><span>Â·</span><span>DOB: {selectedPatient.date_of_birth || selectedPatient.dob}</span></>}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255,149,0,0.1)', color: 'var(--warning)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                        <Eye size={13} /> Read-Only
                                    </div>
                                    <button onClick={() => { setSelectedPatient(null); setSearchResults([]); setSearchQuery(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px' }}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Read-only notice */}
                            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(255,149,0,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,149,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <Lock size={15} style={{ color: 'var(--warning)', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    <strong>Nurse read-only access.</strong> Your view of this profile has been logged in the patient&apos;s audit trail for compliance.
                                </p>
                            </div>

                            {/* Sub-tabs */}
                            {renderPatientDetailTabs()}

                            {/* Tab content */}
                            {patientDetailTab === 'info' && renderPatientInfo()}
                            {patientDetailTab === 'prescriptions' && renderPrescriptions()}
                            {patientDetailTab === 'appointments' && renderAppointments()}
                            {patientDetailTab === 'medical-history' && renderMedicalHistory()}
                        </Card>
                    )}
                </div>
            )}
        </div>
    );

    const renderNurseProfile = () => (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(52,199,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', flexShrink: 0 }}>
                    <User size={30} />
                </div>
                <div>
                    <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800 }}>{user?.name || user?.full_name || user?.email?.split('@')[0]}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ padding: '3px 12px', backgroundColor: 'rgba(52,199,89,0.12)', color: 'var(--success)', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Nurse</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Read-only access to patient records</span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>Email</div>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{user?.email || 'N/A'}</span>
                </div>
                <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>Role</div>
                    <span style={{ fontWeight: 600, fontSize: '14px', textTransform: 'capitalize' }}>Nurse</span>
                </div>
                {user?.phone && (
                    <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>Phone</div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.phone}</span>
                    </div>
                )}
                {user?.hospital_affiliation && (
                    <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>Hospital</div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.hospital_affiliation}</span>
                    </div>
                )}
            </div>
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(255,149,0,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,149,0,0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Your access is <strong>read-only</strong>. You can view patient records but cannot create, edit, or delete clinical entries. All access to patient profiles is automatically logged in the audit trail.
                </p>
            </div>
        </Card>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {renderNurseProfile()}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                            <Card padding="20px">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                    <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(52,199,89,0.1)', color: 'var(--success)' }}><FileText size={22} /></div>
                                    <div>
                                        <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>Patient Records</h3>
                                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>View-only access</p>
                                    </div>
                                </div>
                                <button onClick={() => setActiveTab('patients')} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                                    Search Patients â†’
                                </button>
                            </Card>
                            <Card padding="20px">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                    <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(0,122,255,0.1)', color: 'var(--accent)' }}><Stethoscope size={22} /></div>
                                    <div>
                                        <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>Prescriptions</h3>
                                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>View patient prescriptions</p>
                                    </div>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Search for a patient to view their active prescriptions.</p>
                            </Card>
                            <Card padding="20px">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                    <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(255,149,0,0.1)', color: 'var(--warning)' }}><AlertCircle size={22} /></div>
                                    <div>
                                        <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>Access Level</h3>
                                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Read-only permissions</p>
                                    </div>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Creating or modifying clinical records requires doctor-level access.</p>
                            </Card>
                        </div>
                    </div>
                );
            case 'patients':
                return renderPatientsTab();
            default:
                return null;
        }
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <Navbar />
            <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
                <header style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(52,199,89,0.1)', color: 'var(--success)', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                        Nurse Portal
                    </div>
                    <h1 className="title-font" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-1.5px' }}>
                        Welcome, <span style={{ color: 'var(--success)' }}>{user?.name?.split(' ')[0] || user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Nurse'}</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Patient monitoring with read-only access. All views are audit-logged.</p>
                </header>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', padding: '8px', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-stroke)', width: 'fit-content', backdropFilter: 'blur(20px)' }}>
                    {['overview', 'patients'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                backgroundColor: activeTab === tab ? 'var(--success)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                                fontWeight: 700,
                                fontSize: '14px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NurseDashboard;

