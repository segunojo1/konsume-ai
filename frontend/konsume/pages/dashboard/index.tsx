"use client"
import React, { useContext, useEffect, useState } from 'react';
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
import { Steps } from 'intro.js-react';

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
  const {profileID}:any = useUserContext()

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
  const steps = [
    {
      element: '.timetable',
      intro: 'Click to get see your personalized timetable',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.chat',
      intro: 'Click here to try out the chatbot',
    },
    {
      element: '.scanner',
      intro: 'Click here try out the image scanner',
    },
    {
      element: '.meals',
      intro: 'Click here to see recommended meals for you',
    },
    {
      element: '.blogs',
      intro: 'Click here to see AI generated blogs',
    },
    {
      element: '.profile',
      intro: 'Click here to see and edit your profile',
    },
    {
      element: '.search-meal',
      intro: 'Click here to search and generate recipe for any meal of your choice',
    },
    {
      element: '.open-timetable',
      intro: 'Click to open your timetable',
    },
  ];
  // const [isTourEnabled, setIsTourEnabled] = useState(false);

  useEffect(() => {
    // const visited = Cookies.get('visited');
    // if (!visited) {
    //   setIsTourEnabled(true); // Show the tour if the user hasn't visited yet
    // }
  }, []);

  // const handleExit = () => {
  //   console.log('Tour finished');
  //   // Cookies.set('visited', 'true');
  //   // setIsTourEnabled(false); // Disable the tour after it's done
  // };
  // useEffect(() => {
  //   getUserDetails();
  // }, [setPossibleDiseases, setUserGoal, setWeight, setDiet, setAge, router]);
  useEffect(() => {
    // setTimeout(() => {
    //   Cookies.set('visited', 'true');
    // }, 2000);
  }, [])
  const [tourEnabled, setTourEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem("tourEnabled");
      return savedState === null ? true : JSON.parse(savedState);
    }
    return true; // Default state if `window` is not defined
  });

  // Save to localStorage if we're in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("tourEnabled", JSON.stringify(tourEnabled));
    }
  }, [tourEnabled]);

  const handleExit = () => {
    setTourEnabled(false); // Disable the tour after it finishes
  };

  return (
    <div className='bg-base-white'>
      <MainLayout fixedTopbar={true} topBarText='Dashboard' topBarIcon='dashborad'>
        <div className="font-satoshi pb-10">
          <DashboardHead />
          <DashboardBody />
          
        <Steps
          enabled={tourEnabled}
          steps={steps}
          initialStep={0}
          onExit={handleExit} // This will now only fire when the user exits the tour
        />
     
          {/* <CreateProfileLoader /> */}
        </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(Dashboard);
