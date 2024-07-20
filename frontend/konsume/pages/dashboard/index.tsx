import DashboardBody from '@/modules/dashboard/DashboardBody';
import DashboardHead from '@/modules/dashboard/DashboardHead';
import DashboardNav from '@/modules/dashboard/DashboardNav';
import Sidebar from '@/modules/dashboard/Sidebar';
import React, { useEffect, useState } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import withAuth from '../../helpers/withAuth';
import ChatWithFoodie from '@/modules/dashboard/ChatWithFoodie';
import { axiosKonsumeInstance } from '../../http/konsume';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const { userGoal, name, userID, setPossibleDiseases, setUserGoal, setWeight, setDiet, setAge, setHeight } =
    useSetupContext();
  console.log(userGoal);

  const router = useRouter();
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axiosKonsumeInstance.get(`/api/profile/${Cookies.get('userid')}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('ktn')}`,
          },
        });
        setTimeout(() => {
          setPossibleDiseases(data?.value?.allergies.$values);
          setUserGoal(data?.value?.userGoals.$values);
          setWeight(data?.value?.weight);
          setDiet(data?.value?.dietType);
          setAge(data?.value?.age);
          setHeight(data?.value?.height);
        }, 1000);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetails();
  }, [setPossibleDiseases, setUserGoal, setWeight, setDiet, setAge, router]);
  return (
    <div>
      <Sidebar toggled={toggled} setToggled={setToggled} />
      <div className={`${toggled ? '' : 'md:ml-[280px]'} gap-5 flex flex-col px-5`}>
        <DashboardNav toggled={toggled} setToggled={setToggled} />
        <DashboardHead />
        <ChatWithFoodie />
        <DashboardBody />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
