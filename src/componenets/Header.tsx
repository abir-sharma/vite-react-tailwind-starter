
import React from 'react';
import { ChevronDown, Bell, Mic, X } from 'lucide-react';
import pwLogo from "../../src/assets/pwLogo.jpeg"

const Header = () => {
  const userData = localStorage.getItem('userData');
  const studentName = userData ? JSON.parse(userData).name : '';
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            {/* <span className="text-white font-bold text-sm">PW</span> */}
            <img src={pwLogo} alt="" />
          </div>
          <span className="font-semibold text-lg">Physics Wallah</span>
        </div>
        
        <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-md">
          <span className="text-sm font-medium">12th - IIT JEE</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
        </div>
        
        <div className="relative">
          <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">XP</div>
          <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
        </div>
        
        <span className="text-sm text-gray-600 font-bold">Hi, {studentName}</span>
        
        <Mic className="w-5 h-5 text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
