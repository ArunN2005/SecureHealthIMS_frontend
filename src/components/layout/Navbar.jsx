import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { Moon, Sun, LogOut, LayoutDashboard, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px',
      height: '72px',
      position: 'sticky',
      top: '20px',
      zIndex: 1000,
      margin: '0 24px',
      border: '1px solid var(--glass-border)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(24px)',
      boxShadow: 'var(--shadow-premium)',
      borderRadius: 'var(--radius-full)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          background: 'var(--primary-glow)',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Stethoscope size={24} color="var(--primary)" />
        </div>
        <Link to="/" className="title-font" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Cura<span style={{ color: 'var(--primary)' }}>Link</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-stroke)',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          className="hover-scale"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 500 }}>
                <LayoutDashboard size={18} color="var(--primary)" />
                <span>Dashboard</span>
              </Link>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--glass-stroke)'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'center', color: 'white', fontSize: '12px', fontWeight: 700, justifyContent: 'center' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: 500 }}>{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.2)',
                color: 'var(--danger)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              className="hover-scale"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            padding: '10px 24px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius-full)',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 8px 16px var(--primary-glow)',
            transition: 'all 0.3s ease'
          }} className="hover-scale">
            Get Started
          </Link>
        )}
      </div>
    </nav >
  );
};

export default Navbar;
