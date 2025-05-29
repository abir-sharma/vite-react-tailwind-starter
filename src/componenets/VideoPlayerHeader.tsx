import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import Badge from "../assets/Badge.png"
import BadgeWithPoint from "../assets/BadgeWithPoint.png"
import BadgeNeedToEarn from "../assets/BadgeNeedToEarn.png"
import LineCompleted from "../assets/LineCompleted.png"
import LineUncompleted from "../assets/LineUncompleted.png"
import { useNavigate } from 'react-router-dom';

const VideoPlayerHeader = () => {
    const map = {
        "badge": Badge,
        "badgeWithPoint": BadgeWithPoint,
        "badgeNeedToEarn": BadgeNeedToEarn,
        "lineCompleted": LineCompleted,
        "lineUncompleted": LineUncompleted
    }
    const array = [
        { status: "not earned", },
        { status: "not earned" },
        { status: "earned" },
        { status: "not earned" },
        { status: "not processed" },
        { status: "not processed" }
    ]
    const navigate=useNavigate()
    const isEarnedOrNotEarned = (status: string) =>
        status === "earned" || status === "not earned";
    // const BadgeTimeline = () => {
    // const isEarnedOrNotEarned = (status: string) =>
    //     status === "earned" || status === "not earned";
    return (
        <div className='flex w-full items-center p-0 z-10' style={styles.container}>
            <span className='hover:cursor-pointer'>
                <IoMdArrowBack onClick={()=>navigate("/")} className='text-white w-6 h-6' />
            </span>
            <div className='w-full flex items-center px-6'>

                {/* <div className="flex items-center justify-between gap-2 w-full">
                    {array.map((item, index) => {
                        const currentStatus = item.status;
                        const nextStatus = array[index + 1]?.status;

                        // Select badge
                        let imageSrc;
                        if (currentStatus === "earned") {
                            imageSrc = map.badgeWithPoint;
                        } else if (currentStatus === "not processed") {
                            imageSrc = map.badgeNeedToEarn;
                        } else {
                            imageSrc = map.badge;
                        }

                        // Decide which line to show
                        let LineComponent = null;

                        const isEarnedOrNotEarned = (status: string) =>
                            status === "earned" || status === "not earned";

                        const bothSame = currentStatus === nextStatus;

                        if (
                            (bothSame && isEarnedOrNotEarned(currentStatus)) ||
                            (currentStatus === "earned" && nextStatus === "not earned") ||
                            (currentStatus === "not earned" && nextStatus === "earned")
                        ) {
                            LineComponent = map.lineCompleted;
                        } else if (
                            (isEarnedOrNotEarned(currentStatus) && nextStatus === "not processed") ||
                            (currentStatus === "not processed" && isEarnedOrNotEarned(nextStatus)) ||
                            (currentStatus === "not processed" && nextStatus === "not processed")
                        ) {
                            LineComponent = map.lineUncompleted;
                        }

                        return (
                            <div className='w-fit items-center flex justify-between bg-gray-300' key={index}>
                                <div>
                                    <img src={imageSrc} alt={currentStatus} className="" />
                                </div>
                                {LineComponent && index !== array.length - 1 && (
                                    <div>
                                        <img src={LineComponent} alt="line" className="" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div> */}

                <div className="w-full flex items-center justify-center px-4">
                    <div className="flex w-full max-w-full items-center justify-between  ">
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
                                            className="w-16 h-16 object-contain"
                                        />
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
    )
}

export default VideoPlayerHeader

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        top: 12,
        left: 18,
        width: "98%",
        // height: 80,
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        backgroundColor: 'black',
    },
}