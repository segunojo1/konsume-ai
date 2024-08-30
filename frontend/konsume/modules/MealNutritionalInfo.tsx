import React from 'react'

const MealNutritionalInfo = () => {
    return (
        <div className=" font-satoshi gap-2 flex flex-col font-bold text-[6.8px]/[120%] w-full">
            <div className="justify-between flex bg-primary-bg-400 p-3 rounded-lg">
                <p className="">Calories</p>
                <p className="text-[#FFC501]">
                    30kcal
                </p>
            </div>
            <div className="justify-between flex bg-primary-bg-400 p-3 rounded-lg">
                <p className="">Protein</p>
                <p className="text-[#FFC501]">
                    30-40%
                </p>
            </div>
            <div className="justify-between flex bg-secondary-100 p-3 rounded-lg">
                <p className=" ">Carbohydrates</p>
                <p className=" text-[#FFC501]">
                    30-40
                </p>
            </div>
            <div className="justify-between flex bg-primary-bg-main p-3 rounded-lg">
                <p className="">Healthy Fats</p>
                <p className=" text-[#FFC501]">40-50</p>
            </div>
        </div>
    )
}

export default MealNutritionalInfo