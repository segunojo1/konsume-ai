import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Image from "next/image"

const OtpModal = () => {
    return (
        <div className="fixed backdrop-blur-sm mx-auto w-fit right-0 left-0">
            <div className="max-w-[700px] flex flex-col items-center gap-8 border-[3px] border-secondary-100 p-6 rounded-[32px]">
                <div className='md:text-desktop-heading2 text-mobile-heading1 flex items-center gap-4 relative w-fit mb-3'>
                    <h1 className='font-bold '>Please enter </h1>
                    <div className=' '>
                        <Image src='/curved_line2.png' alt='curved line' height={41.5} width={282} className='md:w-[232px] w-[141px] absolute top-1 xl:top-1 right-2 -z-10' />
                        <h1 className=' font-bold '>OTP code!</h1>
                    </div>
                </div>
                <p className="md:text-desktop-feature text-mobile-highlight">Please Enter 6-digit code sent to your email.</p>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className='' />
                        <InputOTPSlot index={1} className='' />
                        <InputOTPSlot index={2} className=' ' />
                        <InputOTPSlot index={3} className=' ' />
                        <InputOTPSlot index={4} className='' />
                        <InputOTPSlot index={5} className=' ' />
                    </InputOTPGroup>
                </InputOTP>
                <h3 className=" md:text-desktop-highlight text-desktop-caption font-bold text-center">Enter OTP code - <br />
                Didn't receive the code? Check your spam folder or try resending</h3>
                <p className="md:text-desktop-feature text-desktop-highlight font-bold text-secondary-900">Resend OTP code</p>
            </div>

        </div>
    )
}

export default OtpModal