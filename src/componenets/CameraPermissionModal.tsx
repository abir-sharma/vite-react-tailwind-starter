// import React, { useRef, useEffect } from 'react';

// interface CameraPermissionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAllow: (blur: boolean) => void;
// }

// const CameraPermissionModal: React.FC<CameraPermissionModalProps> = ({
//   isOpen,
//   onClose,
//   onAllow,
// }) => {
//   const [blur, setBlur] = React.useState(false);
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div style={styles.overlay}>

//       <div style={styles.modal} ref={modalRef}>
//         <h2>Enable Camera for Attentiveness?</h2>
//         <p>This will allow us to track your attentiveness via camera.</p>
//         <p style={{ fontSize: '14px', color: '#555' }}>
//           ✅ Stay attentive to earn rewards and improve your learning experience.<br />
//           🔒 Want privacy? Enable background blur to hide your surroundings.
//         </p>

//         <label style={styles.checkbox}>
//           <input
//             type="checkbox"
//             checked={blur}
//             onChange={(e) => setBlur(e.target.checked)}
//           />
//           Enable background blur
//         </label>

//         <div style={styles.buttons}>
//           <button onClick={() => onAllow(blur)} style={styles.buttonYes}>Yes</button>
//           <button onClick={onClose} style={styles.buttonNo}>No</button>
//         </div>
//       </div> 
//     </div>

//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   overlay: {
//     position: 'fixed',
//     top: 0, left: 0,
//     width: '100%', height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 9999,
//   },
//   modal: {
//     background: '#fff',
//     padding: '2rem',
//     borderRadius: '8px',
//     width: '300px',
//     textAlign: 'center',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
//   },
//   checkbox: {
//     margin: '1rem 0',
//     fontSize: '14px',
//   },
//   buttons: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     marginTop: '1rem',
//   },
//   buttonYes: {
//     padding: '0.5rem 1rem',
//     background: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   buttonNo: {
//     padding: '0.5rem 1rem',
//     background: '#f44336',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//      cursor: 'pointer',
//    },
//  };

//  export default CameraPermissionModal;



import React, { useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
// import { Button } from '@/components/u';
import { Card } from '../componenets/ui/card';
import { Checkbox } from '../componenets/ui/checkbox';
import Icon from "../assets/image 9.png"
import cameraIcon from "../assets/webcam.png"

interface CameraPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: (blur: boolean) => void;
}

const CameraPermissionModal: React.FC<CameraPermissionModalProps> = ({ isOpen, onClose, onAllow }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [blurBackground, setBlurBackground] = useState(false);
  const [learningMode, setLearningMode] = useState<'distractive' | 'attentive'>('attentive');

  const [cameraOff, setCamerOff] = useState(false)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
      <Card className="w-full max-w-md bg-white rounded-3xl p-2 relative">
        {/* Close button */}
        {/* <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button> */}

        {/* Camera Icon */}
        <div className="flex justify-center">
          <div className="relative">
            {/* <div className="w-20v h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              </div>
            </div> */}
           <div><img src={Icon} alt="" /></div>
            {/* Exclamation mark */}
            {/* <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            {/* Blue dashed lines */}
            {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="w-1 h-4 border-l-2 border-dashed border-blue-400"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
              <div className="w-1 h-4 border-l-2 border-dashed border-blue-400"></div>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
              <div className="w-4 h-1 border-t-2 border-dashed border-blue-400"></div>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
              <div className="w-4 h-1 border-t-2 border-dashed border-blue-400"></div>
            </div>  */}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">
          Enable Camera for Attentiveness.
        </h2>

        {/* Subtitle */}
        {/* <p className="text-gray-600 text-center mb-0"> */}
          {/* Turn on your camera to track focus and earn rewards.
        </p> */}

        <p className="text-black font-semibold text-center mb-8">
          78% of our student using it.
        </p>

        {/* Camera Toggle Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            {/* Camera On */}
            <div className="flex flex-col items-center flex-1">
              {/* <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all ${cameraEnabled ? 'bg-blue-100' : 'bg-gray-100' */}
              <div>
                {/* // }`}> */}
                {/* <Camera className={`w-8 h-8 ${cameraEnabled ? 'text-blue-600' : 'text-gray-400'}`} /> */}
                <img className='w-6 h-6' src={cameraIcon} alt="camerIcon" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={cameraEnabled}
                  onCheckedChange={(checked) => {
                    setCameraEnabled(checked as boolean)
                    setLearningMode("attentive")
                  }}
                  className="border-2"
                />
                <span className="font-medium text-gray-500">Camera On</span>
              </div>
            </div>

            {/* Camera Off */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all ${!cameraEnabled ? 'bg-gray-100' : 'bg-gray-50'
                }`}>
                <CameraOff className={`w-8 h-8 ${!cameraEnabled ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={!cameraEnabled}
                  onCheckedChange={(checked) => {
                    setCameraEnabled(!(checked as boolean))
                    setLearningMode("distractive")
                  }}
                  className="border-2"
                />
                <span className="font-medium text-gray-500">Camera Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Option */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={blurBackground}
              onCheckedChange={(checked) => {
                setBlurBackground(checked as boolean)
                setLearningMode("attentive")
              }}
              className="border-2"
            />
            <span className="text-gray-600">Want privacy? Blur your background</span>
          </div>
        </div>

        {/* Learning Mode Selection */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-1 mb-6">
          <div className="flex">
            <button
              // disabled={!cameraEnabled}
              onClick={() => {
                setLearningMode("distractive")
                setCameraEnabled(false)
                // onClose()
              }}
              className={`flex-1 py-4 px-6 rounded-lg font-medium transition-all ${learningMode === 'distractive'
                  ? 'bg-pink-300 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
            >
              Distractive Learning
            </button>
            <button
              // disabled={!cameraEnabled}
              onClick={() => {
                setLearningMode("attentive")
                setCameraEnabled(true)
              }}
              className={`flex-1 py-4 px-6 rounded-lg font-medium transition-all ${learningMode === 'attentive'
                  // cameraEnabled
                  ? 'bg-green-300 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
            >
              Attentive Learning
            </button>
          </div>
        </div>
        <div onClick={()=>{
          cameraEnabled?onAllow(blurBackground):onClose()

        }} className='w-full flex justify-center '><button className='text-white bg-blue-500 rounded-md px-2 py-1 font-semibold'>Proceed</button></div>
      </Card>
    </div>
  );
};

export default CameraPermissionModal;
