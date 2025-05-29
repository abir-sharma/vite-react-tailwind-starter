
import React from 'react';

const FloatingAvatar = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="w-16 h-16 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
        <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            <img src="https://www.pw.live/study/assets/gyan-guru/gyan-guru-avatar.svg" alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatingAvatar;
