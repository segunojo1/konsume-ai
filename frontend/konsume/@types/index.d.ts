import React, { ReactNode } from 'react';

import { boolean } from 'zod';
import { StaticImageData } from 'next/image';

// export all interfaces and types
declare module 'nprogress';

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  showDashboardSidebar?: boolean;
  showTopbar?: boolean;
  fixedTopbar?: boolean;
  showFooter?: boolean;
  includeMarginTop?: boolean;
  activePage?: string;
  topBarText?: string;
  topBarIcon?: string;
}


export interface MainLayoutContextProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}


export interface ProgressBarProps {
  color: string;
  value: number;
}

// Toastify interface
export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
export type ToastTheme = 'light' | 'dark' | 'colored';
export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'default';
export interface ToastProps {
  message?: string;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: ToastTheme;
  type?: ToastVariant;
}

// export all interfaces and type s
declare module 'nprogress';

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  showDashboardSidebar?: boolean;
  showTopbar?: boolean;
  showFooter?: boolean;
  activePage?: string;
  fixedTopbar?: boolean;
  topBarText?: string;
  topBarIcon?: string;
}

export interface Mealprops {
  course: string;
  name: string;
  description: string;
}

export interface BlogProps {
  id?: number;
  title?: string;
  text: string;
  category?: string;
  showHeading?: boolean;
}

export interface LoginFormProps {
  form: ReturnType<typeof useForm<FormData>>;
  onSubmit: SubmitHandler<FormData>;
}

export interface MainLayoutContextProps {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
  activePage?: string;
  setActivePage: (page: string) => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface searchProp {
  handleSearchChange: (searchString: string) => void;
}

export interface filterProp {
  handleFilter: (status: string) => void;
}

export interface AuthContextProps {
  auth: AuthResponse | undefined;
  email: string;
  redirect: string;
  userCameFrom: string | undefined;
  userCameFromForOAuth: string | undefined;
  handleAuth: (value: AuthResponse | undefined) => void;
  handleEmail: (value: string) => void;
  handleRedirect: (value: string) => void;
  handleUserCameFrom: (value: string | undefined) => void;
  handleUserCameFromForOAuth: (value: string | undefined) => void;
}

export interface SetupProviderProps {
  children: ReactNode;
}

export interface SetupContextType {
  userGoal: string;
  setUserGoal: React.Dispatch<React.SetStateAction<string>>;
  possibleDiseases: any;
  setPossibleDiseases: any;
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  nationality: string;
  age: string;
  gender: string;
  weight: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setNationality: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage(): void;
  previousPage(): void;
  diet: string;
  setDiet: React.Dispatch<React.SetStateAction<string>>;
  userID: number | undefined;
  setUserID: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface DashboardNavProps {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GoalCheckboxProps {
  label: string;
  data: string;
}

export interface SidebarProps {
  icon: StaticImageData;
  text: string;
  href: string;
}

export interface HealthProps {
  label: string;
  specify: string;
}

export interface StepsCircleProps {
  number: number;
}

export interface HarmBlockThresholdProps {
  NONE: string;
  LOW: string;
  MEDIUM: string;
  HIGH: string;
}
