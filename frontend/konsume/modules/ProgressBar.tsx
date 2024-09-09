import React from 'react'

interface progressBarProps {
  currentStep: number;
  totalSteps: number
}
const ProgressBar = ({ currentStep, totalSteps }: progressBarProps) => {
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (
        <div className='flex items-center gap-2'>
            <div className="progress-lines-container2  ">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={`progress-line2  ${currentStep === step ? 'bg-secondary-500  flex-[3] h-1 rounded-[6px]' : 'flex-[1] bg-[#D2D6DB] h-[5px] rounded-full'}`}
        ></div>
      ))}
    </div>
            <div>
                <p className=' font-bold text-[16px]'>Step {currentStep}/{totalSteps}</p>
            </div>
        </div>
    )
}

export default ProgressBar