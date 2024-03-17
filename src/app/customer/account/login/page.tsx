"use client"

import SignInForm from '@/Pages/SignInForm';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignIn = () => {
  const router = useRouter();
  
  return (
    <main className="flex min-h-0 flex-col">
        <SignInForm router={router} />
    </main>
  );
};

export default SignIn;
