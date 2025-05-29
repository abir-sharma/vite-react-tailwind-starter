import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#F8F7FD] h-screen p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo.png" alt="Physics Wallah" className="w-8 h-8 rounded-full" />
        <h1 className="text-lg font-semibold">Physics Wallah</h1>
      </div>
      
      <nav className="flex flex-col gap-2">
        <a href="#" className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded">
          <span className="material-icons">school</span>
          Study
        </a>
        {/* Add other sidebar items */}
      </nav>
    </div>
  );
};

export default Sidebar;