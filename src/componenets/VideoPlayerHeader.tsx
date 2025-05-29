import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import Badge from "../assets/Badge.png";
import BadgeWithPoint from "../assets/BadgeWithPoint.png";
import BadgeNeedToEarn from "../assets/BadgeNeedToEarn.png";
import LineCompleted from "../assets/LineCompleted.png";
import LineUncompleted from "../assets/LineUncompleted.png";
import { useNavigate } from 'react-router-dom';
import negativemp3 from "../assets/negative.mp3"
import positivemp3 from "../assets/positive.mp3"


const timeStringToSeconds = (timeStr: string) => {
    const [min, sec] = timeStr.split(':').map(t => parseInt(t.trim()));
    return min * 60 + sec;
};

const VideoPlayerHeader = ({ currentTime }: { currentTime: number }) => {
    const map = {
        "badge": Badge,
        "badgeWithPoint": BadgeWithPoint,
        "badgeNeedToEarn": BadgeNeedToEarn,
        "lineCompleted": LineCompleted,
        "lineUncompleted": LineUncompleted
    };

    const [array, setArray] = useState([
        { status: "not processed", timeStamp: "00 : 25" },
        { status: "not processed", timeStamp: "00 : 50" },
        { status: "not processed", timeStamp: "01 : 15" },
        { status: "not processed", timeStamp: "01 : 45" },
        { status: "not processed", timeStamp: "02 : 00" },
        { status: "not processed", timeStamp: "02 : 25" }
    ]);

    const navigate = useNavigate();

    const isEarnedOrNotEarned = (status: string) =>
        status === "earned" || status === "not earned";

    useEffect(() => {
        setArray(prev =>
            prev.map(item => {
                const seconds = timeStringToSeconds(item.timeStamp);
                if (item.status !== "earned" && Math.abs(currentTime - seconds) <= 1) {
                    const audio = new Audio(positivemp3);
                    audio.play();
                    return { ...item, status: "earned" };
                }
                return item;
            })
        );
    }, [currentTime]);

    return (
        <div className='flex w-full items-center p-0 z-10' style={styles.container}>
            <span className='hover:cursor-pointer'>
                <IoMdArrowBack onClick={() => navigate("/")} className='text-white w-6 h-6' />
            </span>
            <div className='w-full flex items-center px-6'>
                <div className="w-full flex items-center justify-center px-4">
                    <div className="flex w-full max-w-full items-center justify-between">
                        {array.map((item, index) => {
                            const current = item.status;
                            const next = array[index + 1]?.status;

                            // Select badge
                            let imageSrc;
                            if (current === "earned") {
                                imageSrc = map.badgeWithPoint;
                            } else if (current === "not processed") {
                                imageSrc = map.badgeNeedToEarn;
                            } else {
                                imageSrc = map.badge;
                            }

                            // Decide which line to show
                            let LineComponent = null;
                            const bothSame = current === next;

                            if (
                                (bothSame && isEarnedOrNotEarned(current)) ||
                                (current === "earned" && next === "not earned") ||
                                (current === "not earned" && next === "earned")
                            ) {
                                LineComponent = map.lineCompleted;
                            } else if (
                                (isEarnedOrNotEarned(current) && next === "not processed") ||
                                (current === "not processed" && isEarnedOrNotEarned(next)) ||
                                (current === "not processed" && next === "not processed")
                            ) {
                                LineComponent = map.lineUncompleted;
                            }

                            return (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={imageSrc}
                                            alt={current}
                                            className="w-10 h-10 object-contain"
                                        />
                                        <p
                                            className="text-black text-xs"
                                            style={{ WebkitTextStroke: '0.35px white' }}
                                        >
                                            {item.timeStamp}
                                        </p>
                                    </div>
                                    {LineComponent && index !== array.length - 1 && (
                                        <div className="flex-1 mx-2 flex justify-center">
                                            <img
                                                src={LineComponent}
                                                alt="line"
                                                className="w-full max-w-[80px] h-2 object-contain"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
            <span className='px-2 py-1 bg-red-500 h-fit rounded-md'>
                <p className='text-sm text-white'>Live</p>
            </span>
        </div>
    );
};

export default VideoPlayerHeader;

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        top: 12,
        left: 18,
        width: "98%",
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 1000,
    },
};
