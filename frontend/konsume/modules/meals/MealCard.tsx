import Image from 'next/image'
import React from 'react'

const MealCard = () => {
  return (
    <div className='shadow-bordershad border-2 border-[black] rounded'>
        <Image src='/fruits.jpeg' height={96} width={260} alt='food' className='w-full h-[130px] object-cover'/>
        <div className=' p-3'>
        <h1 className=' text-desktop-content font-bold'>Jollof Rice</h1>
        <p className=' text-desktop-content'>A popular Nigerian dish containing some ingredients sha like shdfhffb dhfbf ffjff jfd gjfg gjggg ggggjgg...</p>
        </div>
    </div>
  )
}

export default MealCard