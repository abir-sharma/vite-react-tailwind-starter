import React from 'react';
import type { Lecture } from '../types/type';

interface LectureCardProps {
  lecture: Lecture;
}

const LectureCard: React.FC<LectureCardProps> = ({ lecture }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="relative">
        <img 
          src={lecture.thumbnailUrl} 
          alt={lecture.title}
          className="w-full h-32 object-cover rounded"
        />
        <button className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-full p-2">
          <span className="material-icons">play_arrow</span>
        </button>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-purple-600">{lecture.subject}</h3>
        <p className="text-gray-800 font-medium mt-1">{lecture.title}</p>
        <p className="text-sm text-gray-600 mt-1">By {lecture.instructor}</p>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span className="material-icons text-sm">schedule</span>
          {lecture.time}
          <span className="material-icons text-sm">timer</span>
          {lecture.duration}
        </div>
      </div>
    </div>
  );
};

export default LectureCard;