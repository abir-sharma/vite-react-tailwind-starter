import React from 'react'
import AchievementModal from '../componenets/AchievementModal'

const StudentResultScreen = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <AchievementModal isOpen={true} setOpenAchievement={()=>{}} />
    </div>
  )
}

export default StudentResultScreen