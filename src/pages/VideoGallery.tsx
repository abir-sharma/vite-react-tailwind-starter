import React, { useState, useRef, useEffect } from 'react';
import './VideoGallery.css';
import FaceMeshComponent from '../componenets/FaceMeshComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraPermissionModal from '../componenets/CameraPermissionModal';
import VideoPlayer from '../componenets/VideoPlayer';
import { Link, useNavigate } from 'react-router-dom';
import FloatingCamera from '../componenets/FloatingCamera';

interface Video {
    id: number;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    watched: boolean;
    points: number;
}


const videos: Video[] = [
    {
        id: 1,
        title: 'Kinematics - Lecture 1',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        watched: true,
        points: 20,
    },
    {
        id: 2,
        title: 'Laws of Motion',
        thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        watched: false,
        points: 0,
    },
    {
        id: 3,
        title: 'Work, Energy & Power',
        thumbnailUrl: 'https://img.youtube.com/vi/tVj0ZTS4WF4/hqdefault.jpg',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        watched: false,
        points: 0,
    },
    {
        id: 4,
        title: 'Kinematics - Lecture 1',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        watched: true,
        points: 50,
    },
    {
        id: 5,
        title: 'Laws of Motion',
        thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        watched: false,
        points: 0,
    },
    {
        id: 6,
        title: 'Work, Energy & Power',
        thumbnailUrl: 'https://img.youtube.com/vi/tVj0ZTS4WF4/hqdefault.jpg',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        watched: false,
        points: 0,
    },
];


const randomMessages = [
    "Stay focused! 👀",
    "Are you paying attention? 🎯",
    "Don't get distracted! 📚",
    "Great job staying engaged! 👍",
];

const VideoGallery: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [activateAttentivness, setActiveAttentivness] = useState(false); // whether camera is open ofr not count
    const [__faceData, setFaceData] = useState<any>(null); // Replace `any` with proper type if known
    const [lookingLeft, setLookingLeft] = useState(false);
    const [lookingRight, setLookingRight] = useState(false);
    const [lookingUp, setLookingUp] = useState(false);
    const [lookingDown, setLookingDown] = useState(false);
    const [eyeStatus, setEyeStatus] = useState<'open' | 'left_closed' | 'right_closed' | 'both_closed'>('open');
    const [isInFrame, setIsInFrame] = useState(false)

    const [submitAnswer, setSubmitAnswer] = useState(true);
    const [answerSubmittedSuccessfully, setAnswerSubmittedSuccessfully] = useState<boolean | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [cameraAllowed, setCameraAllowed] = useState(false);
    const [blurEnabled, setBlurEnabled] = useState(false);
    const navigate = useNavigate();

    const handleAllowCamera = (blur: boolean) => {
        setCameraAllowed(true);
        setBlurEnabled(blur);
        setShowModal(false);
        // Start camera logic here with blur config...
    };

    const [showCoin, setShowCoin] = useState(false);
    const [pointChange, setPointChange] = useState<number | null>(null);

    const triggerCoinAnimation = (points: number) => {
        setPointChange(points);
        setShowCoin(true);
        setTimeout(() => {
            setShowCoin(false);
            setPointChange(null);
        }, 2000);
    };


    const closePlayer = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setSelectedVideo(null);
    };
    const speak = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };
    console.log(isInFrame, "isInFrame")
    useEffect(() => {
        if (submitAnswer) {
            const promise = new Promise<void>((resolve, reject) => {
                // Simulate an async action like submitting an answer
                setTimeout(() => {
                    const success = Math.random() > 0.3; // 70% chance of success
                    if (success) {
                        setAnswerSubmittedSuccessfully(true);
                        triggerCoinAnimation(+50)
                        resolve();
                    } else {
                        setAnswerSubmittedSuccessfully(false);
                        triggerCoinAnimation(-20)
                        reject();
                    }
                    setSubmitAnswer(false);
                }, 5000); // 3 seconds simulation
            });

            toast.promise(promise, {
                pending: 'Please show your notebook to camera, Submitting your answer...',
                success: 'Answer submitted successfully! 🎉',
                error: 'Failed to submit answer. Please try again. ❌'
            });
        }
    }, [submitAnswer]);


    useEffect(() => {
        let lookTimer: ReturnType<typeof setTimeout>;
        let eyeTimer: ReturnType<typeof setTimeout>;


        if (selectedVideo) {
            // Check for looking directions
            if (lookingLeft || lookingRight || lookingUp) {
                lookTimer = setTimeout(() => {
                    const message = "Don't get distracted!";
                    toast(message + " 📚");
                    speak(message);
                    triggerCoinAnimation(-10)
                }, 10000);
            }

            if (!lookingUp && !lookingLeft && !lookingRight && eyeStatus === "open") {
                eyeTimer = setTimeout(() => {
                    const message = "Great job staying engaged!";
                    toast(message + " 👍");
                    speak(message);
                    triggerCoinAnimation(+20)
                }, 10000);
            }

            if (eyeStatus === 'both_closed') {
                eyeTimer = setTimeout(() => {
                    const message = "Hey! Wake up. Stay focused.";
                    toast("😴 " + message);
                    speak(message);
                    triggerCoinAnimation(-10)
                }, 10000);
            }

        }

        return () => {
            clearTimeout(lookTimer);
            clearTimeout(eyeTimer);
        };
    }, [lookingLeft, lookingRight, lookingUp, lookingDown, eyeStatus, selectedVideo]);
    console.log("looking left", lookingLeft)
    console.log("looking Right", lookingRight)
    console.log("looking down", lookingDown)
    console.log("looking up", lookingUp)
    console.log("eyeStatus", eyeStatus)
    return (
        <>
            <div className="gallery-container">
                {/* <header className="app-header">Physics Wallah - Live Lectures</header> */}

                <div className="video-grid">
                    {videos.map((video) => (
                        <div key={video.id} className="video-card" onClick={() => {
                            // setActiveAttentivness(true);
                            // setShowModal(true)
                            // if (cameraAllowed) {
                                setActiveAttentivness(true)
                                // navigate("/video-player")
                            // }
                            // if (showModal) {
                            //     setSelectedVideo(video);
                            // }
                            // setSelectedVideo(video);

                        }}>
                            <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                            <div className="video-title">{video.title}</div>

                            <div className="video-meta">
                                <div className={`status ${video.watched ? 'watched' : 'pending'}`}>
                                    {video.watched ? '✅ Watched' : '⏳ Pending'}
                                </div>
                                <div className="points">
                                    ⭐ {video.points} Points
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <CameraPermissionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onAllow={handleAllowCamera}
                />

                {selectedVideo && (
                    <div className="fullscreen-overlay">
                        <video
                            ref={videoRef}
                            src={selectedVideo.videoUrl}
                            className="fullscreen-video"
                            controls
                            autoPlay
                        />
                        <Link className='close-button' onClick={closePlayer} to="/lecture-details">Exit</Link>
                        {/* <button className="close-button" onClick={closePlayer}>
                            End the 
                        </button> */}
                        <div className="video-heading">{selectedVideo.title}</div>
                    </div>
                )}
            </div>


            {/* Hidden FaceMeshComponent */}
            {activateAttentivness && (
                <div style={{ display: 'none' }}>
                    {/* <FaceMeshComponent onDataChange={setFaceData} /> */}
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
            )}

            {/* (
            <div className="face-info-box" style={{ color: "black" }}>
                <strong>Face Direction:</strong><br />
                👈 Left: {lookingLeft ? 'Yes' : 'No'}<br />
                👉 Right: {lookingRight ? 'Yes' : 'No'}<br />
                👆 Up: {lookingUp ? 'Yes' : 'No'}<br />
                👇 Down: {lookingDown ? 'Yes' : 'No'}<br />
                👁️ Eye Status: {eyeStatus}
            </div>
            ) */}
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            {showCoin && pointChange !== null && (
                <div className={`coin-popup ${pointChange >= 0 ? 'gain' : 'loss'}`}>
                    {pointChange >= 0 ? '🪙 +' : '💸 '}
                    {Math.abs(pointChange)} Points
                </div>
            )}
            



        </>
    );
};

export default VideoGallery;

