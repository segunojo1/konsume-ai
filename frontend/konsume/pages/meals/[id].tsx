import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/ui/SearchBar';
import MainLayoutContext from '@/context/LayoutContext';
import gemini from '@/http/gemini';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import MealInfo from '@/modules/meals/MealInfo';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { renderTextWithBold } from '@/helpers/renderTextWithBold';
import MealsContext from '@/context/MealsContext';

const Meal = () => {
  const router = useRouter();
  let { id } = router.query;
  const {generatingMeal, setGeneratingMeal} = useContext(MealsContext);

  const mealPrompt = `Generate a very short description of the meal ${id}. Strictly not more than 20 words`
const caloriePrompt = `What is the range of number of calories per serving of the meal ${id}. it doesnt have to be exact just give a range, your response should strictly just be the number of kcal e.g 350-400`;
const proteinIntakeRange = `What is the range of percent of protein contained in the meal ${id}. it doesnt have to be exact just give a range, your response should strictly just be the percentage of protein e.g 30-40 `;
const carbIntakeRange = `What is the range of percent of carbohydrates contained in the meal ${id}, your response should strictly just be the percentage of carbohydrates e.g 30-40 it doesnt have to be exact just give a range`;
const fatIntakeRange = `What is the range of percent of fats contained in the meal ${id}, your response should strictly just be the percentage of fats e.g 30-40 it doesnt have to be exact just give a range`;
const nutritionalInfoPrompt = `provide a general nutritional info of the meal ${id} it doesnt have to be exact`
const recipePrompt = `What is the recipe of the meal ${id}`
const healthImpactPrompt = `What is the impact of the meal ${id} on me if i have ${Cookies.get('possibleDiseases')} I know you are not a medical professional just provide an answer`
  

  const [activeMeal, setActiveMeal] = useState<string>('All');
  const [mealDesc, setMealDesc] = useState("");
  const [numberOfCalories, setNumberOfCalories] = useState();
  const [proteinPercent, setProteinPercent] = useState();
  const [carbPercent, setCarbPercent] = useState();
  const [fats, setFats] = useState();
  const [nutritionalInfo, setNutritionalInfo] = useState();
  const [recipe, setRecipe] = useState();
  const [healthImpact, setHealthImpact] = useState();

  const [responses, setResponses] = useState<any>([]);

  useEffect(() => {
    const getMealDetailsWithDelay = async () => {
      // Ensure the `id` is available before making the API calls
      if (!id) return;
  
      try {
        setGeneratingMeal(true);
        // First batch of requests
        const mealResponses = await Promise.all([
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: mealPrompt }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: caloriePrompt }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: proteinIntakeRange }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: carbIntakeRange }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: fatIntakeRange }] }],
          }),
        ]);
  
        const [
          mealResponse,
          calorieResponse,
          proteinResponse,
          carbResponse,
          fatsResponse
        ] = mealResponses;
  
        setProteinPercent(proteinResponse.data.candidates[0].content.parts[0].text);
        setCarbPercent(carbResponse.data.candidates[0].content.parts[0].text);
        setFats(fatsResponse.data.candidates[0].content.parts[0].text);
        setNumberOfCalories(calorieResponse.data.candidates[0].content.parts[0].text);
        setMealDesc(mealResponse.data.candidates[0].content.parts[0].text);
  
        // Delay before the next set of requests
        await new Promise(resolve => setTimeout(resolve, 9000));
  
        // Second batch of requests
        const additionalResponses = await Promise.all([
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: nutritionalInfoPrompt }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: recipePrompt }] }],
          }),
          gemini.post("/gemini-1.5-flash:generateContent", {
            contents: [{ parts: [{ text: healthImpactPrompt }] }],
          }),
        ]);
  
        const [
          nutritionResponse,
          recipeResponse,
          healthResponse
        ] = additionalResponses;
  
        setNutritionalInfo(nutritionResponse.data.candidates[0].content.parts[0].text);
        setRecipe(recipeResponse.data.candidates[0].content.parts[0].text);
        setHealthImpact(healthResponse.data.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error(error);
        router.back();
      }finally{
        setGeneratingMeal(false)
      }
    };
  
    if (id) {
      setGeneratingMeal(true);
      setTimeout(() => {

        getMealDetailsWithDelay();
      }, 2000)
    }
  }, [id]);
  
  
  

  console.log(id);
  return (
    <div>
      <MainLayout fixedTopbar={true} topBarText='Eat with AI' topBarIcon='logo2' includeMarginTop={true}>
        <div className='flex justify-between w-full font-satoshi'>

          <div className="flex flex-col gap-7">

            <div className="relative w-fit">
              <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='  absolute bottom-0 top-0 my-auto left-11 -z-50' />
              <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">{id}</h1>
            </div>
            <p className=" text-desktop-content text-primarygtext italic max-w-[450px]">{mealDesc ? mealDesc : ".."} <b>Bon Appétit!</b></p>
            <div className='flex items-center gap-2'>

              <p className=' text-desktop-highlight font-medium'>Calories per serving: {numberOfCalories ? numberOfCalories : ".."} kcal </p><Image src="/breakfast.svg" alt='' width={27.6} height={27.6} />
            </div>
          </div>

          <div className="gap-2 flex flex-col md:min-w-[303px] font-bold">
            <div className="justify-between flex bg-primary-bg-400 p-3 rounded-lg">
              <p className="">Protein</p>
              <p className="text-[#FFC501]">
                {proteinPercent}%
              </p>
            </div>
            <div className="justify-between flex bg-secondary-100 p-3 rounded-lg">
              <p className=" ">Carbohydrates</p>
              <p className=" text-[#FFC501]">
                {carbPercent}%
              </p>
            </div>
            <div className="justify-between flex bg-primary-bg-main p-3 rounded-lg">
              <p className="">Healthy Fats</p>
              <p className=" text-[#FFC501]">{fats}%</p>
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
          <MealInfo title='Nutritional Information' text={nutritionalInfo ? renderTextWithBold(nutritionalInfo) : ''}/>
          <MealInfo title='Recipe' text={recipe ? renderTextWithBold(recipe) : ''}/>
          <MealInfo title='Health Impact' text={healthImpact ? renderTextWithBold(healthImpact) : ''}/>
        </div>
        <div className={`z-50 fixed backdrop-blur-md ${generatingMeal ? 'flex' : 'hidden'}  justify-center items-center top-0 left-0 bottom-0 right-0`}>
                <div className='loader2'></div>
                <h1 className='font-bold bg-base-white rounded-full'>Generating Meal...</h1>
            </div>
      </MainLayout>
    </div>
  )
}

export default Meal