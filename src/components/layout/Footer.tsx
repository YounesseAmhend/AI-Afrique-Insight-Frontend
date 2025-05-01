import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} News App. All rights reserved.</p>
      </div>
    </footer>
  );
};