import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="">
      <div className="">
        <p>&copy; {currentYear} News App. All rights reserved.</p>
      </div>
    </footer>
  );
};