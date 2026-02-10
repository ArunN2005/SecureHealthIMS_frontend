import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div>
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '32px',
                borderBottom: '1px solid var(--glass-stroke)',
                paddingBottom: '2px'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'none',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            position: 'relative'
                        }}
                        className="hover-scale"
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div style={{
                                position: 'absolute',
                                bottom: '-2px',
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'var(--primary)',
                                boxShadow: '0 0 10px var(--primary-glow)'
                            }} />
                        )}
                    </button>
                ))}
            </div>

            <div>
                {tabs.map(tab => {
                    if (tab.id !== activeTab) return null;
                    return <div key={tab.id} className="tab-content">{tab.content}</div>;
                })}
            </div>
        </div>
    );
};

export default Tabs;
