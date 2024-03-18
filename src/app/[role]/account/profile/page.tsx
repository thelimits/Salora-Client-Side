"use client"

import { ProfilePage } from '@/Pages/Profile';
import { useRouter } from 'next/navigation';
import React from 'react'

const Profile = ( { params }: {
    params: {
        role: string,
    }
  } ) => {
  const router = useRouter();
  
  return (
    <main className="flex min-h-0 flex-col">
        <ProfilePage router={router} role={params.role}/>
    </main>
  );
};

export default Profile;