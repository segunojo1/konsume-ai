import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/ui/SearchBar';
import MainLayoutContext from '@/context/LayoutContext';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import MealInfo from '@/modules/meals/MealInfo';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const Meal = () => {
  const { name, toggled }: any = useContext(MainLayoutContext);

  const [activeMeal, setActiveMeal] = useState<string>('All');

  const handleMealChange = (meal: string) => {
    setActiveMeal(meal);
  };
  return (
    <div>
      <MainLayout fixedTopbar={true} topBarText='Eat with AI' topBarIcon='logo2' includeMarginTop={true}>
        <div className='flex justify-between w-full font-satoshi'>

          <div className="flex flex-col gap-7">

            <div className="relative w-fit">
              <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='  absolute bottom-0 top-0 my-auto left-11 -z-50' />
              <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Moimoi, A nutritious Beans Cake </h1>
            </div>
            <p className=" text-desktop-content text-primarygtext italic max-w-[450px]">A healthy, protein-rich Nigerian delicacy perfect for breakfast. <b>Bon Appétit!</b></p>
            <div className='flex items-center gap-2'>

              <p className=' text-desktop-highlight font-medium'>Calories per serving: 350 kcal </p><Image src="/breakfast.svg" alt='' width={27.6} height={27.6} />
            </div>
          </div>

          <div className="gap-2 flex flex-col md:min-w-[303px] font-bold">
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
        </div>
        <div className='flex gap-20 items-center mt-10 mb-16'>
          <Button className='bg-primarygtext  flex px-3 py-2 gap-3  '>
            <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg' /><p className=' text-primary-bg text-desktop-content font-bold font-satoshi'>Add to My Timetable</p>
          </Button>

          <SearchBar />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <MealInfo title='Nutritional Information' text='Nutritional Information (Approximate, per 100 grams):
Calories: 130-150 kcal
Protein: 8-10 grams
Fat: 6-8 grams
Saturated Fat: 1-2 grams (if using palm oil)
Carbohydrates: 15-18 grams
Dietary Fiber: 4-5 grams
Sugars: 1-2 grams
Sodium: 200-400 mg (depending on the amount of seasoning or salt used)
Cholesterol: 0 mg (if no animal products are added)
Nutritional Benefits:
High in Protein:

Beans are an excellent source of plant-based protein, which is essential for muscle building and repair.
Rich in Fiber:

Moi Moi contains dietary fiber from the beans, which aids in digestion, helps maintain healthy blood sugar levels, and can support weight management.
Good Source of Vitamins and Minerals:

Beans are rich in essential vitamins and minerals such as folate, iron, potassium, and magnesium.
Low in Cholesterol:

Since Moi Moi is made from plant-based ingredients, it is naturally free of cholesterol, making it heart-healthy.
Customizable:

The nutritional content can be adjusted by varying the ingredients. For example, using less oil or adding more vegetables can make it healthier.'/>
          <MealInfo title='Recipe' text='Moi Moi Recipe
Ingredients:
2 cups of peeled brown or black-eyed beans
1 medium onion (chopped)
1-2 red bell peppers (tatashe) or 1 large red bell pepper (chopped)
1-2 scotch bonnet peppers (ata rodo) (adjust to taste)
1/4 cup of vegetable oil or palm oil (optional)
2 tablespoons of ground crayfish (optional)
1 tablespoon of ground smoked fish (optional)
1 tablespoon of seasoning powder or bouillon cubes (Maggi or Knorr)
Salt to taste
2-3 cups of warm water or stock (depending on the consistency you want)
Boiled eggs (optional, sliced or whole)
Sardines or corned beef (optional)
Banana leaves, aluminum foil, or small containers for wrapping/steaming
Instructions:
Prepare the Beans:

Soak the beans in water for about 30 minutes to soften the skin.
Peel the beans by rubbing them between your hands to remove the skins. You can also use a blender to make peeling easier by pulsing the soaked beans in water for a few seconds. The skins will float to the top when you add water and can be drained off.
Blend the Ingredients:

In a blender, add the peeled beans, chopped onions, red bell peppers, and scotch bonnets. Blend until you get a smooth, thick paste. You may need to add some water or stock to help the blending process.
Mix the Batter:

Pour the blended mixture into a large bowl. Add the oil, ground crayfish, smoked fish, seasoning powder, and salt. Stir well to combine all the ingredients. Gradually add warm water or stock until you reach your desired consistency. The batter should be thick but still pourable.
Prepare the Steaming Containers:

If youre using banana leaves, cut them into rectangular shapes, soften them over a flame, and fold them into a cup shape. You can also use aluminum foil, ramekins, or small plastic containers.
Grease the insides of the containers with a little oil to prevent sticking.
Fill the Containers:

Pour the Moi Moi batter into the prepared containers. If you want to add boiled eggs, sardines, or corned beef, place them in the middle of the batter.
Steam the Moi Moi:

Place the filled containers in a large pot or steamer. Add enough water to the pot to steam the Moi Moi, but make sure the water doesn’t touch the batter. Cover the pot with a lid.
Steam for about 45 minutes to 1 hour on medium heat. Check occasionally and add more water to the pot if needed.
Check for Doneness:

The Moi Moi is done when its firm to the touch and a toothpick inserted into the center comes out clean.
Serve:

Allow the Moi Moi to cool slightly before removing it from the containers. Serve warm with rice, bread, pap, or enjoy it on its own.'/>
          <MealInfo title='Recipe' text='Moi Moi Recipe
Ingredients:
2 cups of peeled brown or black-eyed beans
1 medium onion (chopped)
1-2 red bell peppers (tatashe) or 1 large red bell pepper (chopped)
1-2 scotch bonnet peppers (ata rodo) (adjust to taste)
1/4 cup of vegetable oil or palm oil (optional)
2 tablespoons of ground crayfish (optional)
1 tablespoon of ground smoked fish (optional)
1 tablespoon of seasoning powder or bouillon cubes (Maggi or Knorr)
Salt to taste
2-3 cups of warm water or stock (depending on the consistency you want)
Boiled eggs (optional, sliced or whole)
Sardines or corned beef (optional)
Banana leaves, aluminum foil, or small containers for wrapping/steaming
Instructions:
Prepare the Beans:

Soak the beans in water for about 30 minutes to soften the skin.
Peel the beans by rubbing them between your hands to remove the skins. You can also use a blender to make peeling easier by pulsing the soaked beans in water for a few seconds. The skins will float to the top when you add water and can be drained off.
Blend the Ingredients:

In a blender, add the peeled beans, chopped onions, red bell peppers, and scotch bonnets. Blend until you get a smooth, thick paste. You may need to add some water or stock to help the blending process.
Mix the Batter:

Pour the blended mixture into a large bowl. Add the oil, ground crayfish, smoked fish, seasoning powder, and salt. Stir well to combine all the ingredients. Gradually add warm water or stock until you reach your desired consistency. The batter should be thick but still pourable.
Prepare the Steaming Containers:

If youre using banana leaves, cut them into rectangular shapes, soften them over a flame, and fold them into a cup shape. You can also use aluminum foil, ramekins, or small plastic containers.
Grease the insides of the containers with a little oil to prevent sticking.
Fill the Containers:

Pour the Moi Moi batter into the prepared containers. If you want to add boiled eggs, sardines, or corned beef, place them in the middle of the batter.
Steam the Moi Moi:

Place the filled containers in a large pot or steamer. Add enough water to the pot to steam the Moi Moi, but make sure the water doesn’t touch the batter. Cover the pot with a lid.
Steam for about 45 minutes to 1 hour on medium heat. Check occasionally and add more water to the pot if needed.
Check for Doneness:

The Moi Moi is done when its firm to the touch and a toothpick inserted into the center comes out clean.
Serve:

Allow the Moi Moi to cool slightly before removing it from the containers. Serve warm with rice, bread, pap, or enjoy it on its own.'/>
        </div>

      </MainLayout>
    </div>
  )
}

export default Meal