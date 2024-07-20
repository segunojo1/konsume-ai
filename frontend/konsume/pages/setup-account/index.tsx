import BioData from '../../components/setup-account/BioData';
import Steps from '../../components/setup-account/Steps';
import Welcome from '../../components/setup-account/Welcome';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import Form from '../../components/setup-account/Form';
import SetupContext, { useSetupContext } from '../../context/SetupContext';
import { useRouter } from 'next/router';
import { axiosKonsumeInstance } from '../../http/konsume';
import { diettype } from '../../components/dashboard/diettype';
import Cookies from 'js-cookie';
import { Input } from '../../ui/input';
import { toast } from 'react-toastify';

const SetupAccount = () => {
  const {
    nextPage,
    currentPage,
    userGoal,
    possibleDiseases,
    setPossibleDiseases,
    setUserGoal,
    age,
    height,
    gender,
    weight,
    diet,
    userID,
  } = useSetupContext();
  const [test, setTest] = useState(false);

  useEffect(() => {
    setPossibleDiseases([]);
    setUserGoal('');
    Cookies.remove('possibleDiseases');
    Cookies.remove('userGoal');
  }, []);
  const route = useRouter();
  const submitForm = async () => {
    try {
      toast.info('Loading...');
      const { data } = await axiosKonsumeInstance.post(
        '/api/profile/create',
        {
          dateOfBirth: age,
          gender: gender,
          height: height,
          weight: weight,
          nationality: 'Nigerian',
          bodyFat: '',
          dietType: diet,
          snackPreference: '',
          noOfMealPerDay: '',
          allergies: possibleDiseases,
          userGoals: [userGoal],
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('ktn')}`,
          },
          params: {
            userId: Cookies.get('userid'),
          },
        },
      );
      console.log(data);
      Cookies.set('age', age);
      Cookies.set('gender', gender);
      Cookies.set('height', weight);
      Cookies.set('diet', diet);
      Cookies.set('possibleDiseases', possibleDiseases);
      Cookies.set('goal', userGoal);
      route.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div className="w-10/12 m-auto">
      <div className="md:p-10 p-1 font-satoshi">
        <Welcome />
        <Steps />
        {/* <BioData /> */}
        <Form />
        {currentPage == 4 && (
          <button
            className=" mt-12 m-auto py-[7px] px-[84px] bg-[#8DCF38] rounded-[34.71px]  w-fit flex"
            onClick={submitForm}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default SetupAccount;
