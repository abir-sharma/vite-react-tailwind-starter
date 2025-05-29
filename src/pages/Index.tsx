
import React, { useEffect, useRef, useState } from 'react';
import Header from '../componenets/Header';
import Sidebar from '../componenets/Sidebar';
import NotificationBanner from '../componenets/NotificationBanner';
import TodaysClass from '../componenets/TodaysClass';
import PreparationMeter from '../componenets/PreparationMeter';
import FloatingAvatar from '../componenets/FloatingAvatar';
import ClassesCard from '../componenets/ClassesCard';
import CameraPermissionModal from '../componenets/CameraPermissionModal';
import { ToastContainer, toast } from 'react-toastify';
import FaceMeshComponent from '../componenets/FaceMeshComponent';
import { useNavigate } from 'react-router-dom';
import AchievementModal from '../componenets/AchievementModal';

interface Props {
  studentName:string;
}

const Index: React.FC<Props>  = ({studentName}) => {
  const [__faceData, setFaceData] = useState<any>(null); // Replace `any` with proper type if known
  const [openAcheivment,setOpenAchievement]=useState()

  
  const [showModal, setShowModal] = useState(false);


  



  


  // const closePlayer = () => {
  //     if (videoRef.current) {
  //         videoRef.current.pause();
  //     }
  //     setSelectedVideo(null);
  // };
  // const speak = (message: string) => {
  //   const utterance = new SpeechSynthesisUtterance(message);
  //   speechSynthesis.speak(utterance);
  // };
  // console.log(isInFrame, "isInFrame")
  // useEffect(() => {
  //   if (submitAnswer) {
  //     const promise = new Promise<void>((resolve, reject) => {
  //       // Simulate an async action like submitting an answer
  //       setTimeout(() => {
  //         const success = Math.random() > 0.3; // 70% chance of success
  //         if (success) {
  //           setAnswerSubmittedSuccessfully(true);
  //           triggerCoinAnimation(+50)
  //           resolve();
  //         } else {
  //           setAnswerSubmittedSuccessfully(false);
  //           triggerCoinAnimation(-20)
  //           reject();
  //         }
  //         setSubmitAnswer(false);
  //       }, 5000); // 3 seconds simulation
  //     });

  //     toast.promise(promise, {
  //       pending: 'Please show your notebook to camera, Submitting your answer...',
  //       success: 'Answer submitted successfully! 🎉',
  //       error: 'Failed to submit answer. Please try again. ❌'
  //     });
  //   }
  // }, [submitAnswer]);


  // useEffect(() => {
  //   let lookTimer: ReturnType<typeof setTimeout>;
  //   let eyeTimer: ReturnType<typeof setTimeout>;


  //   if (true) {
  //     // Check for looking directions
  //     if (lookingLeft || lookingRight || lookingUp) {
  //       lookTimer = setTimeout(() => {
  //         const message = "Don't get distracted!";
  //         toast(message + " 📚");
  //         speak(message + studentName);
  //         triggerCoinAnimation(-10)
  //       }, 10000);
  //     }

  //     if (!lookingUp && !lookingLeft && !lookingRight && eyeStatus === "open") {
  //       eyeTimer = setTimeout(() => {
  //         const message = "Great job staying engaged!";
  //         toast(message + " 👍");
  //         speak(message + studentName);
  //         triggerCoinAnimation(+20)
  //       }, 10000);
  //     }

  //     if (eyeStatus === 'both_closed') {
  //       eyeTimer = setTimeout(() => {
  //         const message = "Hey! Wake up. Stay focused.";
  //         toast("😴 " + message);
  //         speak(message + studentName);
  //         triggerCoinAnimation(-10)
  //       }, 10000);
  //     }

  //   }

  //   return () => {
  //     clearTimeout(lookTimer);
  //     clearTimeout(eyeTimer);
  //   };
  // }, [lookingLeft, lookingRight, lookingUp, lookingDown, eyeStatus]);
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <NotificationBanner />

          {/* <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
          <div className='flex-col p-6'>
            <ClassesCard setShowModal={setShowModal} showModal={showModal} setOpenAchievement={setOpenAchievement} />
            {/* <div className='flex w-full justify-evenly'>
              <TodaysClass />
            <PreparationMeter />
            </div> */}

          </div>
          {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}


          {/* {activateAttentivness && (
            <div style={{ display: 'none' }}>
              <FaceMeshComponent
                onDataChange={setFaceData}
                setLookingLeft={setLookingLeft}
                setLookingRight={setLookingRight}
                setLookingUp={setLookingUp}
                setLookingDown={setLookingDown}
                setEyeStatus={setEyeStatus}
                setIsInFrame={setIsInFrame}
              />


            </div>
          )} */}

          {/* {showCoin && pointChange !== null && (
            <div className={`coin-popup ${pointChange >= 0 ? 'gain' : 'loss'}`}>
              {pointChange >= 0 ? '🪙 +' : '💸 '}
              {Math.abs(pointChange)} Points
            </div>
          )} */}
        </main>/

      </div>
      {/* <CameraPermissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAllow={()=>{
          setShowModal(true)
          setActiveAttentivness(true)
        }}
      /> */}
      <FloatingAvatar />
      {/* {openAcheivment && <AchievementModal isOpen={openAcheivment} setOpenAchievement={setOpenAchievement}  />} */}
    </div>
  );
};

export default Index;
