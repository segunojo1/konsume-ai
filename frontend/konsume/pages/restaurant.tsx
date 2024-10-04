import RestaurantBody from '@/modules/restaurant/RestaurantBody'
import RestaurantNav from '@/modules/restaurant/RestaurantNav'
import React from 'react'

const restaurant = () => {
  return (
    <div className="font-jakarta md:bg-white bg-[#D6FBC4]  flex flex-col gap-10">
        <RestaurantNav />
        <RestaurantBody />
      </div>
  )
}

export default restaurant