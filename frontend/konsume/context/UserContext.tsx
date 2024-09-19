import React, { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { axiosKonsumeInstance } from "@/http/konsume";
import { useRouter } from "next/router";
import { formatDateToDDMMYY } from "@/helpers/formatDateToDDMMYY";

interface UserContextProps {
  username: string;
    email: string;
    nationality: string;
    setNationality?: React.Dispatch<React.SetStateAction<string>>;
    userGoals: any;
    setUserGoals?:  React.Dispatch<React.SetStateAction<any>>;
    allergies: any;
    setAllergies?: React.Dispatch<React.SetStateAction<any>>;
    DOB: string;
    weight?: number;
    setWeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
    gender: string;
    setGender?: React.Dispatch<React.SetStateAction<string>>
    dietType: string;
    setDietType?: React.Dispatch<React.SetStateAction<string>>;
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
    updating: boolean;
    setDOB?: React.Dispatch<React.SetStateAction<string>>;
    streakCount: number;
    profileID: number | undefined;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number>();
  const [dietType, setDietType] = useState("");
  const [DOB, setDOB] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState(0);
  const [profileID, setProfileID] = useState<number | undefined>();
  const router = useRouter();
  const getUserDetails = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(
        `/api/users/users/${Cookies.get("userid")}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("ktn")}`,
          },
          params: {
            id: Cookies.get("userid"),
          },
        }
      );

      if (data) {
        setUsername(data.fullName);
        setEmail(data.email);

        console.log(username);
      } else {
        setUsername("");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setUsername("");
    }
  };
  const getProfileDetails = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(
        `/api/Profile/${profileID}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("ktn")}`,
          },
          params: {
            id: profileID,
          },
        }
      );
      console.log(data);
      const formattedDate = formatDateToDDMMYY(data.value.dateOfBirth);
      setNationality(data.value.nationality);
      setWeight(data.value.weight);
      if (data.value.gender == 1) {
        setGender("Male");
      } else {
        setGender("Female");
      }
      setDietType(data.value.dietType);
      setUserGoals(data.value.userGoals.$values);
      setAllergies(data.value.allergies.$values);
      setDOB(formattedDate);
    } catch (error) {
      console.log(error);
    }
  };
  const getStreakCount = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get(`/api/Streak/GetStreakCount/${profileID}`, {
        params: { 
          profileId: profileID
         },
      });
      setStreakCount(data.streakCount)
      console.log(data);
      console.log(streakCount);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const getProfileID = async () => {
    try {
      
      const { data } = await axiosKonsumeInstance.get(`/api/Profile/ProfileByIdUserId`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ktn")}`,
        },
        params: { 
          Userid: Cookies.get("userid")
         },
      });
      setProfileID(data?.value);
      console.log(data?.value);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    Promise.all([getUserDetails(), getProfileID()]).then(() => Promise.all([getProfileDetails(), getStreakCount()]))
  }, [router.pathname]);
  useEffect(() => {
    getProfileDetails();
  }, [updating])
  return (
    <UserContext.Provider
      value={{
        username,
        email,
        nationality,
        setNationality,
        allergies,
        setAllergies,
        userGoals,
        setUserGoals,
        gender,
        setGender,
        weight,
        setWeight,
        dietType,
        setDietType,
        DOB,
        setDOB,
        setUpdating,
        updating,
        streakCount,
        profileID
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvideProps");
  }
  return context;
};
