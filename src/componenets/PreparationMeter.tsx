
import React from 'react';

const PreparationMeter = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Preparation Meter</h3>
      <p className="text-gray-600 mb-4">
        Assigned based on comparison with <span className="text-orange-500 font-medium border-b-2 border-orange-500">Toppers</span>
      </p>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
        </div>
        <p className="text-gray-600">Your preparation meter will appear here</p>
      </div>
    </div>
  );
};

export default PreparationMeter;
