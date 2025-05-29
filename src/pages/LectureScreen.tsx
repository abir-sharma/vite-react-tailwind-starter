import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../componenets/VideoPlayer'; // assume you created this component
import FloatingCamera from '../componenets/FloatingCamera';
import { useParams } from 'react-router-dom';
import alakhSirLecture from "../assets/videoplayback.mp4"

const LectureScreen = () => {
    const [cameraOn, setCameraOn] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { videoId } = useParams();
    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing webcam:', err);
            }
        };

        if (cameraOn) {
            enableCamera();
        }

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [cameraOn]);

    return (
        <div style={styles.container}>

            <VideoPlayer
                src={alakhSirLecture}
                title="Atomic Structure Lecture"
                onExit={() => console.log('Exited player')}
                teacherId={videoId}
            />

            {cameraOn && (
                <div style={styles.floatingCamera}>
                    <FloatingCamera blur={false} onClose={() => true} />
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
    },
    floatingCamera: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 180,
        height: 130,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};

export default LectureScreen;
