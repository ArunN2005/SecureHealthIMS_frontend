import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div>
            <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                marginBottom: '24px'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            marginBottom: '-1px'
                        }}
                    >
                        {tab.label}
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
