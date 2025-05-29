import React, { useRef, useState, useEffect } from 'react';
import FloatingCamera from './FloatingCamera';
import { useNavigate } from 'react-router-dom';
import { FaVideo } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { RiBlurOffLine } from "react-icons/ri";
import { RiBlurOffFill } from "react-icons/ri";
import VideoPlayerHeader from './VideoPlayerHeader';
import VideoPlayerFooter from './VideoPlayerFooter';
import videoIcon from "../assets/videoIcon.png"
import CameraPermissionModal from './CameraPermissionModal';
import { ToastContainer, toast } from 'react-toastify';
import FaceMeshComponent from './FaceMeshComponent';
import axios from 'axios';
import socket from "../socket"
import StudentCameraComponent from './StudentCameraComponant';
import AchievementModal from './AchievementModal';
import negativemp3 from "../assets/negative.mp3"
import positivemp3 from "../assets/positive.mp3"


const MOCK_DURATION = 236;

const VideoPlayer = ({
    src,
    title,
    onExit,
    teacherId
}: {
    src: string;
    title: string;
    onExit: () => void;
    teacherId: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const webcamRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showWebcam, setShowWebcam] = useState(false);
    const [blur, setBlur] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [submitAnswer, setSubmitAnswer] = useState(false);
    const [answerSubmittedSuccessfully, setAnswerSubmittedSuccessfully] = useState<boolean | null>(null);
    // const [cameraAllowed, setCameraAllowed] = useState(false);
    // const [blurEnabled, setBlurEnabled] = useState(false);
    // const [prevState, setPrevState] = useState("")
    // const [currentState, setCurrentState] = useState("")

    const userData = localStorage.getItem('userData');
    const studentName = userData ? JSON.parse(userData).name : '';
    const studentId = userData ? JSON.parse(userData).id : '';

    const navigate = useNavigate()
    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const [showControls, setShowControls] = useState(true);
    const hideControlsTimeout = useRef<number | null>(null);

    const handleMouseMove = () => {
        setShowControls(true);

        // Clear previous timeout
        if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current);
        }

        // Set new timeout to hide controls after 3 seconds
        hideControlsTimeout.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };


    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    useEffect(() => {
        if (isPlaying) {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    setCurrentTime(prev => {
                        if (prev >= MOCK_DURATION) {
                            clearInterval(intervalRef.current!);
                            return MOCK_DURATION;
                        }
                        return prev + 1;
                    });
                }, 1000);
            }
        } else {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
        }

        return () => clearInterval(intervalRef.current!);
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            if (hideControlsTimeout.current) {
                clearTimeout(hideControlsTimeout.current);
            }
        };
    }, []);


    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            videoRef.current.currentTime = newTime;
        }
    };

    const [showModal, setShowModal] = useState(true);
    const [modalDecisionMade, setModalDecisionMade] = useState(false);


    const [showCoin, setShowCoin] = useState(false);
    const [pointChange, setPointChange] = useState<number | null>(null);
    const [teacherCommand, setTeacherCommand] = useState(false)

    const triggerCoinAnimation = (points: number) => {
        setPointChange(points);
        setShowCoin(true);
        setTimeout(() => {
            setShowCoin(false);
            setPointChange(null);
        }, 2000);
    };

    // useEffect(() => {
    //     if (submitAnswer) {
    //         const promise = new Promise<void>((resolve, reject) => {
    //             // Simulate an async action like submitting an answer
    //             // setTimeout(() => {
    //             const success = Math.random() > 0.3; // 70% chance of success
    //             if (success) {
    //                 setAnswerSubmittedSuccessfully(true);
    //                 triggerCoinAnimation(+50)
    //                 resolve();
    //                 setTeacherCommand(false)
    //             } else {
    //                 setAnswerSubmittedSuccessfully(false);
    //                 triggerCoinAnimation(-20)
    //                 reject();
    //                 setTeacherCommand(false)
    //             }
    //             setSubmitAnswer(false);
    //             // }); // 3 seconds simulation
    //         });

    //         toast.promise(promise, {
    //             pending: 'Please show your notebook to camera, Submitting your answer...',
    //             success: 'Answer submitted successfully! 🎉',
    //             error: 'Failed to submit answer. Please try again. ❌'
    //         });
    //     }
    // }, [submitAnswer, teacherCommand]);


    const toggleWebcam = async () => {
        if (!showWebcam) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
                setStream(stream);
            } catch (err) {
                console.error('Failed to access webcam:', err);
            }
        } else {
            // Stop webcam
            stream?.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
        setShowWebcam(!showWebcam);
    };

    const formatTime = (time: number) =>
        new Date(time * 1000).toISOString().substr(14, 5);


    useEffect(() => {
        const enterFullscreenAndPlay = async () => {
            if (!modalDecisionMade) return;

            const videoEl = videoRef.current;
            const videoContainer = videoEl?.parentElement;

            if (videoEl && videoContainer) {
                try {
                    if (!document.fullscreenElement) {
                        await videoContainer.requestFullscreen();
                    }

                    await videoEl.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.error('Failed to enter fullscreen or play video:', err);
                }
            }
        };

        enterFullscreenAndPlay();

        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, [modalDecisionMade]); // ✅ Trigger when modal decision is made

    const [activateAttentivness, setActiveAttentivness] = useState(false); // whether camera is open ofr not count
    const [__faceData, setFaceData] = useState<any>(null); // Replace `any` with proper type if known
    const [lookingLeft, setLookingLeft] = useState(false);
    const [lookingRight, setLookingRight] = useState(false);
    const [lookingUp, setLookingUp] = useState(false);
    const [lookingDown, setLookingDown] = useState(false);
    const [eyeStatus, setEyeStatus] = useState<'open' | 'left_closed' | 'right_closed' | 'both_closed'>('open');
    const [isInFrame, setIsInFrame] = useState(false)


    const [openAcheivment, setOpenAchievement] = useState(false)

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
        if (showWebcam && isInFrame) {
            axios.patch("http://localhost:3000/api/student/camera", {
                "teacherId": "t1",
                "studentId": studentId,
                "status": "active"
            })
            console.log("camera open")
        }
        else if (showWebcam && !isInFrame) {
            axios.patch("http://localhost:3000/api/student/camera", {
                "teacherId": "t1",
                "studentId": studentId,
                "status": "not_detected"
            })
            console.log("cmaera clsoe")
        }
        else {
            axios.patch("http://localhost:3000/api/student/camera", {
                "teacherId": "t1",
                "studentId": studentId,
                "status": "not_detected"
            })
        }

    }, [showWebcam, isInFrame])



    useEffect(() => {
        axios.post('http://localhost:3000/api/student/join', {
            "teacherId": "t1",
            "studentId": studentId,
            "studentName": "abcdef"
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        let lookTimer: ReturnType<typeof setTimeout>;
        let eyeTimer: ReturnType<typeof setTimeout>;


        if (activateAttentivness) {
            // Check for looking directions
            if (lookingLeft || lookingRight || lookingUp) {
                lookTimer = setTimeout(() => {
                    const message = "Don't get distracted!";
                    toast(message + " 📚");
                // speak(message + studentName);
                const audio = new Audio(negativemp3);
                audio.play();
                    triggerCoinAnimation(-10)
                }, 3000);
            }

            if (!lookingUp && !lookingLeft && !lookingRight && eyeStatus === "open") {
                eyeTimer = setTimeout(() => {
                    const message = "Great job staying engaged!";
                    toast(message + " 👍");
                // speak(message + studentName);
                const audio = new Audio(positivemp3);
                audio.play();
                    triggerCoinAnimation(+20)
                }, 3000);
            }

            if (eyeStatus === 'both_closed') {
                eyeTimer = setTimeout(() => {
                    const message = "Hey! Wake up. Stay focused.";
                    toast("😴 " + message);
                // speak(message + studentName);
                const audio = new Audio(negativemp3);
                audio.play();
                    triggerCoinAnimation(-10)
                }, 3000);
            }
        }



        return () => {
            clearTimeout(lookTimer);
            clearTimeout(eyeTimer);
        };
    }, [lookingLeft, lookingRight, lookingUp, lookingDown, eyeStatus]);

    // useEffect(() => {
    //     if (prevState != currentState) {
    //         if (currentState === "attentive") {
    //             const message = "Great job staying engaged!";
    //             toast(message + " 👍");
    //             const audio = new Audio(positivemp3);
    //             audio.play(); 
    //             triggerCoinAnimation(+20)
    //         }
    //         else if (currentState === "unattentive") {
    //             const message = "Don't get distracted!";
    //             toast(message + " 👍");
    //             const audio = new Audio(negativemp3);
    //             audio.play();
    //             triggerCoinAnimation(-10)
    //         }
    //         setPrevState(currentState)
    //     }

    // }, [currentState])


    return (
        <div
            style={styles.container}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className='relative'

        >
            <video
                // ref={videoRef}
                // src={src}
                // style={styles.video}
                // onTimeUpdate={handleTimeUpdate}
                // onLoadedMetadata={handleLoadedMetadata}


                ref={videoRef}
                src={src}
                style={styles.video}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                // autoPlay
                // muted
                playsInline
            />

            {/* Header */}
            {isHovered && (
                <div style={styles.header}>
                    <h3 style={{ margin: 0, color: 'white' }}>{title}</h3>
                </div>
            )}

            {/* Footer Controls */}
            {isHovered && (
                <div className='' style={styles.footer}>
                    {/* Exit Button */}
                    <button onClick={() => {
                        navigate("/lecture-details")
                    }} style={styles.controlButton}>
                        <MdExitToApp className='h-6 w-6 text-red-500' />


                    </button>

                    {/* Play / Pause */}
                    <button onClick={togglePlay} style={styles.controlButton}>
                        {isPlaying ? <FaPause className='h-6 w-6' />

                            : <FaPlayCircle className='h-6 w-6' />
                        }
                    </button>

                    {/* Time */}
                    <div style={{ color: 'white', fontSize: 12 }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Progress Bar */}
                    <div style={styles.progressBarContainer} onClick={handleProgressClick}>
                        <div
                            style={{
                                ...styles.progressBar,
                                width: `${(currentTime / duration) * 100}%`,
                            }}
                        />
                    </div>

                    {/* Webcam Button */}
                    <button onClick={toggleWebcam} style={styles.iconButton}>

                        {showWebcam ? <FaVideo className='text-red-500 h-6 w-6' /> : <FaVideo className='text-white h-6 w-6' />}
                    </button>

                    {/* Blur Toggle */}
                    <button onClick={(e) => setBlur(!blur)} style={styles.iconButton}>

                        {blur ? <RiBlurOffFill className='text-red-500 h-6 w-6' />
                            : <RiBlurOffLine className='text-white h-6 w-6' />}
                    </button>
                </div>
            )}

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
            {/* Webcam feed */}
            {showWebcam && (
                <FloatingCamera blur={false} onClose={() => true} setAnswerSubmittedSuccessfully={setAnswerSubmittedSuccessfully} />
            )}
            <CameraPermissionModal
                isOpen={showModal}
                // onClose={() => handleModalClose}
                onClose={() => {
                    setShowModal(false)
                    setModalDecisionMade(true)
                }}
                // onAllow={handleAllowCamera}
                onAllow={() => {
                    setActiveAttentivness(true)
                    setShowModal(false)
                    setModalDecisionMade(true)
                }}
            />
            {true && <VideoPlayerHeader currentTime={currentTime} />}
            {/* {showControls && <VideoPlayerFooter setShowWebcam={setShowWebcam} isPlaying={isPlaying} />} */}
            {true && <VideoPlayerFooter
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                currentTime={currentTime}
                duration={MOCK_DURATION}
                setShowWebcam={setShowWebcam}
                setOpenAchievement={setOpenAchievement}
            />}

            {openAcheivment && <AchievementModal isOpen={true} setOpenAchievement={setOpenAchievement} />}



            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            {showCoin && pointChange !== null && (
                <div className={`coin-popup ${pointChange >= 0 ? 'gain' : 'loss'}`}>
                    {pointChange >= 0 ? '🪙 +' : '💸 '}
                    {Math.abs(pointChange)} Points
                </div>
            )}
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        aspectRatio: '16 / 9',
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '8px 16px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
        zIndex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '8px 16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        zIndex: 1,
    },
    controlButton: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: 16,
        cursor: 'pointer',
    },
    iconButton: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: 16,
        cursor: 'pointer',
    },
    label: {
        color: 'white',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
    },
    progressBarContainer: {
        flex: 1,
        height: 6,
        backgroundColor: '#666',
        borderRadius: 3,
        cursor: 'pointer',
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00f2ff',
        borderRadius: 3,
    },
    webcamFeed: {
        position: 'absolute',
        bottom: 60,
        right: 16,
        width: 120,
        height: 90,
        borderRadius: 10,
        border: '2px solid white',
        objectFit: 'cover',
        zIndex: 2,
    },
};

export default VideoPlayer;
