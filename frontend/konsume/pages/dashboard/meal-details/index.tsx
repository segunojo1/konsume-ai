import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import star4 from '../../../public/assets/star4.png';
import gemini from '../../../http/gemini';
import Sidebar from '@/modules/Sidebar';
import DashboardNav from '@/modules/dashboard/DashboardNav';
import { useSetupContext } from '../../../context/SetupContext';
import MealHead from '@/modules/dashboard/meal-details/MealHead';
import { useRouter } from 'next/router';
import withAuth from '../../../helpers/withAuth';
import { parseBoldText } from '../../../helpers/parseBoldText';
import MainLayout from '@/components/Layout/MainLayout';

const MealDetails = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.breakfast) {
      setBreakfast(decodeURIComponent(router.query.breakfast as string));
    }
  }, [router.query.breakfast]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);
  const { userGoal, possibleDiseases, userID } = useSetupContext();
  const [breakfast, setBreakfast] = useState<string>('');
  const [query, setQuery] = useState(
    `What are the health and my goals impact of this food ${router.query.breakfast} on me my goal is ${userGoal} and my healthconditions are ${possibleDiseases}`,
  );
  const [answer, setAnswer] = useState();
  const [q2, setQ2] = useState(
    `What are the ingredients used to make this food ${decodeURIComponent(router.query.breakfast as string)}`,
  );
  const [answer1, setAnswer1] = useState('');

  useEffect(() => {
    makeRequest();
  }, []);
  let replacedString = '';
  const makeRequest = async () => {
    setLoading(true);
    console.log('hii');
    const { data } = await gemini.post('/gemini-pro:generateContent', {
      contents: [{ parts: [{ text: query }] }],
    });
    const ingredients = await gemini.post('/gemini-pro:generateContent', {
      contents: [{ parts: [{ text: q2 }] }],
    });
    setAnswer(data.candidates[0].content.parts[0].text);
    setAnswer1(ingredients.data.candidates[0].content.parts[0].text.replace(/\*/g, '\n'));
    // replacedString = answer1.replace(/\*\*/g, '\n');
    console.log(data);
    console.log('done');
    console.log(query);
    setLoading(false);
  };

  return (
    <div>
      
      <MainLayout fixedTopbar={true}>
        <MealHead />
        {/* <ChatWithFoodie /> */}

        <div className="flex md:flex-row flex-col  gap-2 font-satoshi mt-6">
          <div className="bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco">
            <div className="flex justify-between items-center mb-5">
              <p className=" font-bold text-xs">Health and Goal Impact</p>
              <Image src={star4} alt="star" />
            </div>
            {answer ? (
              <div>
                {parseBoldText(answer).map((part, index) => (
                  <React.Fragment key={index}>
                    {typeof part === 'string' ? (
                      part
                    ) : (
                      <>
                        <br />
                        {part}
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <LoaderCircle className="my-auto animate-spin mx-auto" /> // Placeholder while text data is being fetched
            )}
          </div>
          <div className="bg-[#B0D2C1] p-4 rounded-2xl js-tilt mealreco">
            <div className="flex justify-between items-center mb-5">
              <p className=" font-bold text-xs">Ingredients</p>
              <Image src={star4} alt="star" />
            </div>
            {answer1 ? (
              <div>
                {parseBoldText(answer1).map((part, index) => (
                  <React.Fragment key={index}>
                    {typeof part === 'string' ? (
                      part
                    ) : (
                      <>
                        <br />
                        {part}
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <LoaderCircle className="my-auto animate-spin mx-auto" /> // Placeholder while text data is being fetched
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(MealDetails);
