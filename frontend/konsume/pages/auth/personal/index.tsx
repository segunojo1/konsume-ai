import { SignupForm } from '@/modules/auth/signup/SignupForm';
import React from 'react';

const Signup = () => {
  return (
    <div className='py-10 mx-auto max-w-[358px] font-satoshi'>
      <div>
        <h3 className='text-desktop-content font-bold mb-8'>
          Sign up for yourself and get personalized meal recommendations, progress tracking, and more.
        </h3>
      </div>
      <SignupForm />
    </div>
  );
}

export default Signup;