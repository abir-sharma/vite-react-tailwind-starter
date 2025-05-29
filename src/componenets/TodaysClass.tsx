
import React from 'react';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../componenets/ui/button';

const TodaysClass = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold">Yakeen NEET 5.0 2025</h2>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Today's Class</h3>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Weekly Schedule</span>
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Classes not Scheduled yet</p>
          </div>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
          <span>View All Classes</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodaysClass;
