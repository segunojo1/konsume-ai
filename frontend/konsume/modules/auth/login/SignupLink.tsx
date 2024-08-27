import Link from 'next/link'
import React from 'react'

const SignUpLink = () => {
    return (
        <div className='font-bold text-desktop-content text-center mb-4 mt-5'>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-secondary">
                Sign up
            </Link>
        </div>
    )
}

export default SignUpLink