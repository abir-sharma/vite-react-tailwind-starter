import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface Props {
    //   togglePlay: () => void;
    isPlaying: boolean;
}
const MOCK_DURATION = 236; // 2 minutes (in seconds)

const VideoPlayerFooter: React.FC<Props> = ({ isPlaying }) => {
    // const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Format seconds to mm:ss
    const formatTime = (time: number) =>
        new Date(time * 1000).toISOString().substr(14, 5);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= MOCK_DURATION) {
                        clearInterval(intervalRef.current!);
                        return MOCK_DURATION;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying]);

    // const togglePlay = () => setIsPlaying(prev => !prev);
    const toggleMute = () => setIsMuted(prev => !prev);

    const progressPercent = (currentTime / MOCK_DURATION) * 100;

    return (
        <div style={styles.container}>
            {/* Progress Bar on Top */}
            <div style={styles.progressBarContainer}>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
                    <div style={{ ...styles.progressThumb, left: `${progressPercent}%` }} />
                </div>
            </div>

            {/* Controls Below */}
            <div style={styles.controlsRow}>
                {/* <div style={styles.time}>{formatTime(currentTime)}</div> */}
                <div style={styles.time}>
                    {formatTime(currentTime)} / {formatTime(MOCK_DURATION)}
                </div>

                <button style={styles.controlButton}>
                    {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
                <button onClick={toggleMute} style={styles.controlButton}>
                    {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                </button>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: '100%',
        padding: '12px 16px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    progressBarContainer: {
        width: '100%',
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#444',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00f2ff',
        borderRadius: 3,
    },
    progressThumb: {
        position: 'absolute',
        top: -4,
        width: 12,
        height: 12,
        backgroundColor: '#00f2ff',
        borderRadius: '50%',
        transform: 'translateX(-50%)',
    },
    controlsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 14,
        minWidth: 50,
    },
    controlButton: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
    },
};

export default VideoPlayerFooter;


