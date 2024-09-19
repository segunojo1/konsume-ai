"use client"
import React, { useContext, useEffect } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import withAuth from '../../helpers/withAuth';
import { axiosKonsumeInstance } from '../../http/konsume';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import DashboardBody from '@/modules/dashboard/DashboardBody';
import DashboardHead from '@/modules/dashboard/DashboardHead';
import CreateProfileLoader from '@/components/animated-visual-cues/CreateProfileLoader';
import { useUserContext } from '@/context/UserContext';

const Dashboard = () => {
  const { 
    userGoal, 
    name, 
    userID, 
    setPossibleDiseases, 
    setUserGoal, 
    setWeight, 
    setDiet, 
    setAge, 
    setNationality 
  } = useSetupContext();
  const {profileID} = useUserContext()

  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(`/api/profile/${profileID}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('ktn')}`,
        },
      });
      setPossibleDiseases(data?.value?.allergies.$values);
      setUserGoal(data?.value?.userGoals.$values);
      setWeight(data?.value?.weight);
      setDiet(data?.value?.dietType);
      setAge(data?.value?.age);
      setNationality(data?.value?.nationality);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [setPossibleDiseases, setUserGoal, setWeight, setDiet, setAge, router]);

  return (
    <div className='bg-base-white'>
      <MainLayout fixedTopbar={true} topBarText='Dashboard' topBarIcon='dashborad'>
        <div className="font-satoshi pb-10">
          <DashboardHead />
          <DashboardBody />
          {/* <CreateProfileLoader /> */}
        </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(Dashboard);
