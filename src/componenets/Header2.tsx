import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="pw-header">
      <div className="pw-header-content">
        <div className="pw-logo">
          <span className="pw-logo-icon">📘</span>
        </div>
        <div>
          <h1 className="pw-title">Physics Wallah Classes</h1>
          <p className="pw-subtitle bg-blue-500 text-white p-4 ">Empowering Every Student with Quality Education</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
