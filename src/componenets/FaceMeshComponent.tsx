import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import type { Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

interface Props {
    onDataChange: (data: any) => void;
}

interface Props {
    // onDataChange: (data: FaceMeshData) => void;
    setLookingLeft: React.Dispatch<React.SetStateAction<boolean>>;
    setLookingRight: React.Dispatch<React.SetStateAction<boolean>>;
    setLookingUp: React.Dispatch<React.SetStateAction<boolean>>;
    setLookingDown: React.Dispatch<React.SetStateAction<boolean>>;
    setEyeStatus: React.Dispatch<React.SetStateAction<'open' | 'left_closed' | 'right_closed' | 'both_closed'>>;
    setIsInFrame: React.Dispatch<React.SetStateAction<boolean>>; // NEW
}


const FaceMeshComponent: React.FC<Props> = ({ setLookingLeft,setLookingRight,setLookingUp,setLookingDown,setEyeStatus, setIsInFrame }) => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const faceMeshRef = useRef<FaceMesh | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    // States for UI
    const [cameraOn, setCameraOn] = useState(true);
    // const [lookingLeft, setLookingLeft] = useState(false);
    // const [lookingRight, setLookingRight] = useState(false);
    // const [lookingUp, setLookingUp] = useState(false);
    // const [lookingDown, setLookingDown] = useState(false);
    // const [eyeStatus, setEyeStatus] = useState<'open' | 'left_closed' | 'right_closed' | 'both_closed'>('open');

    function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    // useEffect(() => {
    //     // Example simulated data
    //     const interval = setInterval(() => {
    //         const dummyData = { attentionScore: Math.random().toFixed(2) };
    //         onDataChange(dummyData);
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [onDataChange]);
//     useEffect(() => {
//     const interval = setInterval(() => {
//         const data: FaceMeshData = {
//             lookingLeft,
//             lookingRight,
//             lookingUp,
//             lookingDown,
//             eyeStatus,
//         };
//         onDataChange(data);
//     }, 1000); // adjust timing as needed

//     return () => clearInterval(interval);
// }, [lookingLeft, lookingRight, lookingUp, lookingDown, eyeStatus]);


    // return null; // or <canvas style={{ display: 'none' }} /> if needed

    function eyeAspectRatio(landmarks: any[], indices: number[]) {
        const p1 = landmarks[indices[0]];
        const p2 = landmarks[indices[1]];
        const p3 = landmarks[indices[2]];
        const p4 = landmarks[indices[3]];
        const p5 = landmarks[indices[4]];
        const p6 = landmarks[indices[5]];

        const vertical1 = distance(p2, p6);
        const vertical2 = distance(p3, p5);
        const horizontal = distance(p1, p4);

        return (vertical1 + vertical2) / (2.0 * horizontal);
    }
    console.log("hello")
    // This function handles face mesh results and updates canvas + state
    function handleResults(results: Results) {
        const canvasCtx = canvasRef.current?.getContext('2d');
        if (!canvasCtx || !canvasRef.current) return;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(results.image as CanvasImageSource, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const landmarks = results.multiFaceLandmarks?.[0];
        setIsInFrame(!!landmarks); // Set true if landmarks found, false otherwise
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            // Reset states
            setLookingLeft(false);
            setLookingRight(false);
            setLookingUp(false);
            setLookingDown(false);

            // Gaze detection points
            const noseTip = landmarks[1];
            const leftEyeInner = landmarks[33];
            const rightEyeInner = landmarks[263];
            const leftEyeUpper = landmarks[159];
            const rightEyeUpper = landmarks[386];

            // Left/Right gaze detection
            const noseToLeftEyeDist = Math.abs(noseTip.x - leftEyeInner.x);
            const noseToRightEyeDist = Math.abs(rightEyeInner.x - noseTip.x);
            if (noseToLeftEyeDist > noseToRightEyeDist + 0.015) {
                setLookingRight(true);
            } else if (noseToRightEyeDist > noseToLeftEyeDist + 0.015) {
                setLookingLeft(true);
            }

            // Up/Down gaze detection
            const avgEyeY = (leftEyeUpper.y + rightEyeUpper.y) / 2;
            const diffY = avgEyeY - noseTip.y;
            if (diffY > 0.02) {
                setLookingUp(true);
            } else if (diffY < -0.02) {
                setLookingDown(true);
            }

            // Eye open/closed detection
            const leftEAR = eyeAspectRatio(landmarks, [33, 159, 158, 133, 153, 144]);
            const rightEAR = eyeAspectRatio(landmarks, [263, 386, 385, 362, 374, 380]);
            const EAR_THRESHOLD = 0.25;

            if (leftEAR < EAR_THRESHOLD && rightEAR < EAR_THRESHOLD) {
                setEyeStatus('both_closed');
            } else if (leftEAR < EAR_THRESHOLD) {
                setEyeStatus('left_closed');
            } else if (rightEAR < EAR_THRESHOLD) {
                setEyeStatus('right_closed');
            } else {
                setEyeStatus('open');
            }

            // Draw landmarks
            for (const point of landmarks) {
                const x = point.x * canvasRef.current.width;
                const y = point.y * canvasRef.current.height;
                canvasCtx.beginPath();
                canvasCtx.arc(x, y, 1, 0, 2 * Math.PI);
                canvasCtx.fillStyle = 'cyan';
                canvasCtx.fill();
            }
        }
        canvasCtx.restore();
    }

    // Initialize FaceMesh and Camera when cameraOn changes
    useEffect(() => {
        if (cameraOn && webcamRef.current && webcamRef.current.video) {
            if (!faceMeshRef.current) {
                faceMeshRef.current = new FaceMesh({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
                });

                faceMeshRef.current.setOptions({
                    maxNumFaces: 1,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5,
                });

                faceMeshRef.current.onResults(handleResults);
            }

            cameraRef.current = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await faceMeshRef.current?.send({ image: webcamRef.current.video });
                    }
                },
                width: 640,
                height: 480,
            });

            cameraRef.current.start();
        } else {
            // Stop the camera and clear canvas if cameraOff
            cameraRef.current?.stop();
            cameraRef.current = null;
            faceMeshRef.current = null;

            const canvasCtx = canvasRef.current?.getContext('2d');
            if (canvasCtx && canvasRef.current) {
                canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }

            // Reset all face state on camera off
            setLookingLeft(false);
            setLookingRight(false);
            setLookingUp(false);
            setLookingDown(false);
            setEyeStatus('open');
        }
    }, [cameraOn]);

    return (
        <div>
            <button
                onClick={() => setCameraOn((prev) => !prev)}
                style={{ marginBottom: 10 }}
            >
                {cameraOn ? 'Close Camera' : 'Open Camera'}
            </button>

            <Webcam
                ref={webcamRef}
                audio={false}
                style={{ display: 'none' }}
            />


            <canvas
                ref={canvasRef}
                width={640}
                height={480}
                style={{ position: 'relative', width: 640, height: 480 }}
            />
        </div>
    );
};

export default FaceMeshComponent;


