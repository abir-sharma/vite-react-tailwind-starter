
import React from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from '../componenets/ui/button';

const NotificationBanner = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-6 mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-800">5 batches expiring soon!</span>
          <Button variant="link" className="text-orange-600 p-0 ml-2 h-auto text-sm">
            See Details
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NotificationBanner;
