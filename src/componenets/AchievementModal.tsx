import React from 'react';
import { Button } from '../componenets/ui/button';
import { Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

interface AchievementModalProps {
  isOpen: boolean;
  setOpenAchievement: React.Dispatch<React.SetStateAction<boolean>>;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, setOpenAchievement }) => {
  if (!isOpen) return null;
  const navigate=useNavigate()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                  {/* <div className='w-full bg-green-300'><RxCross2 /> */}
{/* </div> */}

        {/* Header */}
        <div className="text-center pt-4 pb-6 px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Great !!</h1>
          <p className="text-gray-600 text-base">
            You scored higher than 65% of people who have these test
          </p>
        </div>

        {/* Attentiveness Section */}
        <div className="mx-6 mb-4">
          <div className="bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-lg font-medium mb-1">Attentiveness</p>
                <p className="text-6xl font-bold text-purple-600">83%</p>
              </div>
              <div className="relative">
                {/* Trophy illustration */}
                <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg transform rotate-12"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg flex items-center justify-center">
                    <Award className="w-8 h-8 text-orange-700" />
                  </div>
                  {/* Base */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-purple-300 to-purple-500 rounded-lg"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div className="mx-6 mb-6">
          <div className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-lg font-medium mb-1">Your Points Earned</p>
                <p className="text-6xl font-bold text-yellow-600">26</p>
              </div>
              <div className="relative">
                {/* Star illustration */}
                <div className="w-16 h-16 relative">
                  <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
                  <Star className="w-12 h-12 text-yellow-500 fill-yellow-500 absolute top-2 left-2" />
                  <Star className="w-8 h-8 text-yellow-600 fill-yellow-600 absolute top-4 left-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Earn Badges</h2>
          <div className="flex justify-center space-x-4 mb-8">
            {/* Badge 1 */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl transform rotate-12 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-6 bg-purple-500 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl transform -rotate-6 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-6 bg-purple-500 rounded-sm"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                x2
              </div>
            </div>

            {/* Badge 3 */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl transform rotate-6 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-6 bg-purple-500 rounded-sm"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                x3
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Button 
            onClick={()=>{
                navigate("/")
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg"
          >
            Back to study
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;