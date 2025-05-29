import React from 'react'
import goal from "../assets/goal.png"
import CustomVideoControls from './CustomVideoControls'
import videoIcon from "../assets/videoIcon.png"
import { IoExit } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useNavigate } from 'react-router-dom';


interface Props {
    setShowWebcam: React.Dispatch<React.SetStateAction<boolean>>;
    togglePlay: () => void;
    setOpenAchievement: (value:boolean) => void;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
}
const VideoPlayerFooter: React.FC<Props> = ({ setShowWebcam, isPlaying, togglePlay,duration,currentTime,setOpenAchievement }) => {
    const navigate = useNavigate()
    return (
        <div className=' relative w-full'>
            <div className='absolute -right-4 bottom-[100px] w-full flex items-center text-white gap-2 hover:cursor-pointer'>
                <img src={videoIcon} onClick={() => setShowWebcam(prev => !prev)} alt='videoIcon' className='w-16 h-16' />
                {/* <IoExit className='w-16 h-16' /> */}
                <div className='bg-black rounded-full p-3'>
                    <div className='bg-purple-800 rounded-full p-[10px]'>
                        <ImExit onClick={() => setOpenAchievement(true)} className='w-5 h-5 text-white' />
                    </div>
                </div>


            </div>
            <div className="flex bg-transparent relative w-full" style={styles.container}>

                <div className="flex justify-center  items-center bg-transparent w-full rounded-tr-full">
                    <CustomVideoControls isPlaying={isPlaying} />
                </div>

                {/* Top-left corner fully rounded */}
                {/* <div className="w-1/2 flex justify-center items-center gap-1  rounded-tl-full">
                    <img src={goal} className="w-8 h-8" alt="" />
                    <p className="text-sm text-white">
                        Impressive focus. Keep it going!
                    </p>
                </div> */}


            </div>
        </div>
    )
}

export default VideoPlayerFooter

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: 12,
        left: 16,
        width: "98%",
        height: 80,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        backgroundColor: 'black',
    },
}