import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { FaSchool } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

const PWHeader = () => {
    return (
        <div className='bg-pink-200 flex'>
            <div className='bg-blue-300 py-6 w-1/4 flex justify-center items-center'>
                <p>Pyhics Wallah</p>
            </div>
            <div className='bg-green-300 w-full flex justify-between items-center px-24'>
                <div className='flex shadow-md items-center p-2 gap-2 rounded-md'>

                    <FaSchool className='text-yellow-300' />

                    <p>12th - IIT JEE</p>
                    <IoIosArrowForward className='text-blue-500' />
                </div>
                <div>
                    <div>
                        <FaFire />
                        <p>0</p>
                    </div>

                    <div>
                        <FaFire />
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PWHeader