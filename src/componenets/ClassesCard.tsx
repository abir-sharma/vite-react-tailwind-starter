import { useEffect, useRef, useState } from "react";
import { ChevronDown, Calendar, ChevronLeft, ChevronRight, Play, Clock } from "lucide-react";
import { Button } from "../componenets/ui/button";
// import { ToastContainer, toast } from 'react-toastify';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../componenets/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import FaceMeshComponent from "./FaceMeshComponent";
import CameraPermissionModal from "./CameraPermissionModal";

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAchievement: React.Dispatch<React.SetStateAction<boolean>>;
}


const ClassesCard: React.FC<Props> = ({ }) => {
    const [selectedCourse, setSelectedCourse] = useState("Yakeen NEET 2.0 2026");
    // const navigate = useNavigate()

    const todaysClasses = [
    {
        id: 1,
        uniqueId: crypto.randomUUID(),
        title: "Basic Maths and Calculus",
        subtitle: "(Mathematical Tools)",
        lesson: "Assignment 02 : Discussion",
        instructor: "Manish Raj Sir",
        duration: "00:39:22",
        time: "6:00 AM",
        subject: "Physics by MR Sir",
        image: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/aae10a97-c7ab-468c-8024-92d243992c1f.jpg"
    },
    {
        id: 2,
        uniqueId: crypto.randomUUID(),
        title: "Basic Maths and Calculus",
        subtitle: "(Mathematical Tools)",
        lesson: "Lec-10 : Basic Differentiation",
        instructor: "Manish Raj Sir",
        duration: "02:03:40",
        time: "8:45 AM",
        subject: "Physics by MR Sir",
        image: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/ef97d29c-2bdc-438d-834e-f103d1a5d249.jpg"
    },
    {
        id: 3,
        uniqueId: crypto.randomUUID(),
        title: "Basic Maths and Calculus",
        subtitle: "(Mathematical Tools)",
        lesson: "Lec 09 : Graphs",
        instructor: "Saleem Ahmad Sir",
        duration: "01:47:06",
        time: "8:45 AM",
        subject: "Physics by Saleem Sir",
        image: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/aae10a97-c7ab-468c-8024-92d243992c1f.jpg"
    },
    {
        id: 4,
        uniqueId: crypto.randomUUID(),
        title: "Some Basic Concepts of Chemistry",
        subtitle: "",
        lesson: "Lec-09 : Laws of Chemical Combination",
        instructor: "Amit Mahajan Sir",
        duration: "01:53:52",
        time: "8:45 AM",
        subject: "Physical Chemistry By",
        image: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/aae10a97-c7ab-468c-8024-92d243992c1f.jpg"
    }
];


    const courses = [
        "Yakeen NEET 2.0 2026",
        "Yakeen NEET 2.0 2025",
        "Foundation Course 2026",
        "Target PMT 2026"
    ];

    // const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    // const videoRef = useRef<HTMLVideoElement>(null);
    // const [activateAttentivness, setActiveAttentivness] = useState(false); // whether camera is open ofr not count
    // const [__faceData, setFaceData] = useState<any>(null); // Replace `any` with proper type if known
    // const [lookingLeft, setLookingLeft] = useState(false);
    // const [lookingRight, setLookingRight] = useState(false);
    // const [lookingUp, setLookingUp] = useState(false);
    // const [lookingDown, setLookingDown] = useState(false);
    // const [eyeStatus, setEyeStatus] = useState<'open' | 'left_closed' | 'right_closed' | 'both_closed'>('open');
    // const [isInFrame, setIsInFrame] = useState(false)

    // const [submitAnswer, setSubmitAnswer] = useState(true);
    // const [answerSubmittedSuccessfully, setAnswerSubmittedSuccessfully] = useState<boolean | null>(null);

    // const [showModal, setShowModal] = useState(false);
    // const [cameraAllowed, setCameraAllowed] = useState(false);
    // const [blurEnabled, setBlurEnabled] = useState(false);
    const navigate = useNavigate();

    // const handleAllowCamera = (blur: boolean) => {
    //     setCameraAllowed(true);
    //     setBlurEnabled(blur);
    //     setShowModal(false);
    //     // Start camera logic here with blur config...
    // };

    // const [showCoin, setShowCoin] = useState(false);
    // const [pointChange, setPointChange] = useState<number | null>(null);

    // const triggerCoinAnimation = (points: number) => {
    //     setPointChange(points);
    //     setShowCoin(true);
    //     setTimeout(() => {
    //         setShowCoin(false);
    //         setPointChange(null);
    //     }, 2000);
    // };


    // // const closePlayer = () => {
    // //     if (videoRef.current) {
    // //         videoRef.current.pause();
    // //     }
    // //     setSelectedVideo(null);
    // // };
    // const speak = (message: string) => {
    //     const utterance = new SpeechSynthesisUtterance(message);
    //     speechSynthesis.speak(utterance);
    // };
    // console.log(isInFrame, "isInFrame")
    // useEffect(() => {
    //     if (submitAnswer) {
    //         const promise = new Promise<void>((resolve, reject) => {
    //             // Simulate an async action like submitting an answer
    //             setTimeout(() => {
    //                 const success = Math.random() > 0.3; // 70% chance of success
    //                 if (success) {
    //                     setAnswerSubmittedSuccessfully(true);
    //                     triggerCoinAnimation(+50)
    //                     resolve();
    //                 } else {
    //                     setAnswerSubmittedSuccessfully(false);
    //                     triggerCoinAnimation(-20)
    //                     reject();
    //                 }
    //                 setSubmitAnswer(false);
    //             }, 5000); // 3 seconds simulation
    //         });

    //         toast.promise(promise, {
    //             pending: 'Please show your notebook to camera, Submitting your answer...',
    //             success: 'Answer submitted successfully! 🎉',
    //             error: 'Failed to submit answer. Please try again. ❌'
    //         });
    //     }
    // }, [submitAnswer]);


    // useEffect(() => {
    //     let lookTimer: ReturnType<typeof setTimeout>;
    //     let eyeTimer: ReturnType<typeof setTimeout>;


    //     if (true) {
    //         // Check for looking directions
    //         if (lookingLeft || lookingRight || lookingUp) {
    //             lookTimer = setTimeout(() => {
    //                 const message = "Don't get distracted!";
    //                 toast(message + " 📚");
    //                 speak(message);
    //                 triggerCoinAnimation(-10)
    //             }, 10000);
    //         }

    //         if (!lookingUp && !lookingLeft && !lookingRight && eyeStatus === "open") {
    //             eyeTimer = setTimeout(() => {
    //                 const message = "Great job staying engaged!";
    //                 toast(message + " 👍");
    //                 speak(message);
    //                 triggerCoinAnimation(+20)
    //             }, 10000);
    //         }

    //         if (eyeStatus === 'both_closed') {
    //             eyeTimer = setTimeout(() => {
    //                 const message = "Hey! Wake up. Stay focused.";
    //                 toast("😴 " + message);
    //                 speak(message);
    //                 triggerCoinAnimation(-10)
    //             }, 10000);
    //         }

    //     }

    //     return () => {
    //         clearTimeout(lookTimer);
    //         clearTimeout(eyeTimer);
    //     };
    // }, [lookingLeft, lookingRight, lookingUp, lookingDown, eyeStatus]);
    // console.log("looking left", lookingLeft)
    // console.log("looking Right", lookingRight)
    // console.log("looking down", lookingDown)
    // console.log("looking up", lookingUp)
    // console.log("eyeStatus", eyeStatus)
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-lg font-medium text-gray-800 hover:bg-gray-100 p-2">
                                    {selectedCourse}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-64 bg-white border border-gray-200 shadow-lg">
                                {courses.map((course) => (
                                    <DropdownMenuItem
                                        key={course}
                                        onClick={() => setSelectedCourse(course)}
                                        className="hover:bg-gray-50 cursor-pointer p-3"
                                    >
                                        {course}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Button variant="outline" className="flex items-center space-x-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                        <Calendar className="h-4 w-4" />
                        <span>Weekly Schedule</span>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-0 py-8 ">
                {/* Today's Class Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-medium text-gray-800 mb-6">Today's Class</h2>

                    {/* Class Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {todaysClasses.map((classItem) => (
                            <div key={classItem.id} onClick={() => {
                                // setShowModal(true)
                                navigate(`/video-player/${classItem.uniqueId}`)
                            }} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:cursor-pointer transition-shadow duration-200">
                                <div className="p-2 relative">
                                    <img
                                        src={classItem.image}
                                        alt={classItem.instructor}
                                        className="rounded-md w-full h-auto object-cover"
                                    />
                                    <div className="absolute bottom-6 right-6 bg-purple-600 rounded-full p-2 shadow-md">
                                        <Play className="h-6 w-6 text-white fill-white" />
                                    </div>
                                </div>



                                {/* Instructor Section */}
                                <div className="p-4 relative">
                                    {/* <div className="flex items-center space-x-3 mb-4">
                                        <div className="relative">
                                            <img
                                                src={classItem.image}
                                                alt={classItem.instructor}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                                <Play className="h-3 w-3 text-white fill-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">By {classItem.instructor}</p>
                                        </div>
                                    </div> */}

                                    {/* Time Info */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{classItem.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{classItem.time}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm font-bold  text-gray-700" >{classItem.subject}</p>
                                    <div className="flex mt-4 gap-8 text-gray-300 ">
                                        <FaRegStar className="w-4 h-4" />
                                        <FaRegStar className="w-4 h-4" />
                                        <FaRegStar className="w-4 h-4" />
                                        <FaRegStar className="w-4 h-4" />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* View All Classes Button */}
                    <div className="flex justify-center">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium">
                            View All Classes
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClassesCard;