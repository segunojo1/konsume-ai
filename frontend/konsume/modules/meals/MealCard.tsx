import Image from 'next/image'
import React from 'react'

const MealCard = () => {
  return (
    <div className='shadow-bordershad border-2 border-[black] rounded p-6 font-satoshi'>
      <div className='flex justify-between items-center'>
        <h1 className=' text-desktop-highlight font-bold'>Nutritional Information</h1>
        <Image alt='' height={36} width={36} src='/star.svg'/>
      </div>
        <p className=' text-desktop-content mt-4'>A popular Nigerian dish containing some ingredients sha like shdfhffb dhfbf ffjff jfd gjfg gjggg ggggjgg...</p>
    </div>
  )
}

export default MealCard