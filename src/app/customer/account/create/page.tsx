"use client"

import SignUpForm from '@/Pages/SignUpForm';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignUp = () => {
  const router = useRouter();
  
  return (
    <main className="flex min-h-0 flex-col">
        <SignUpForm router={router}/>
    </main>
  );
};

export default SignUp;