import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const SignupActions = () => {
  const [response, setResponse] = useState<string | null>(null);
  const { data: session } = useSession();
  console.log(session);
  
  // const sendHandler = async function () {
  //   console.log("sent", session)
  //   const result = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/LoginWithGoogle`, // Make sure the URL has the correct endpoint
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // Indicating the body is JSON
  //       },
  //       body: JSON.stringify({
  //         email: session?.user?.email, // Replace with actual email value
  //         fullName: session?.user?.name, // Replace with actual full name value
  //         token: session?.authToken, // Replace with the actual token
  //       }),
  //     }
  //   );
    
  // }
    // useEffect(() => {
    //   sendHandler()
    // }, [])
  return (
    <div className='mt-6'>
      <Button
        className="bg-[#8DCF384D] p-[10px] border-2 max-w-[348.9px] w-full h-fit bottom-0 border-[#D6FBC4] rounded-[30px] text-desktop-highlight font-bold min-h-[52px]"
        type="submit"
      >
        Continue
      </Button>
      {/* <div className="flex flex-col justify-between gap-8 mt-8">
        <p className='text-desktop-highlight font-bold mx-auto'>Or</p> */}
        {/* <Button
        onClick={async () => await signIn("google")}
          className="mx-auto p-[10px] flex-[.7] border-2 max-w-[350px] w-full border-primary-bg-800 rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold"
          type="button"
        >
          <Image src="/assets/google.png" width={32} height={32} alt='google' />
          Sign up with Google
        </Button> */}
      {/* </div>  */}
      <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
        Already have an account?{' '}
        <Link href="/auth/login" className="text-secondary">Login</Link>{' '}
      </div>
    </div>
  );
};
