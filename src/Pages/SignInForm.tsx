"use client"

import { useEffect, useState } from 'react';
import Image from "next/image";
import logo from '../../public/logo.png'
import Tab from '@/Components/Tab';
import Link from 'next/link';
import { getSession, login } from './../Server/lib';

export const SignInForm = ({ router }: any) => {

    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
      const fetchSession = async () => {
        const sessionData = await getSession();
        setSession(sessionData);
      };
      fetchSession();
    }, [router, session]);

    useEffect(() => {
      if (session) {
        router.push('/');
      }
    }, [router, session]);

    return (
        <SignIn session={session} setSession={setSession} router={router} />
    );
};

const SignIn = ({ session, router ,setSession }: { session: SessionData | null; router: any | null ;setSession: (session: SessionData | null) => void }) => {
  
  const path = '/customer/account/login/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [error, setError] = useState({
    errorEmail: '',
    errorPassword: '', 
  });

  const [authError, setAuthErrors] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let errors = {
      errorEmail: error.errorEmail,
      errorPassword: error.errorPassword,
    };
  
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  
    if((name === 'email' && !value)){
      errors = { ...errors, errorEmail: 'Email harus diisi!' };
    }else if((name === 'password' && !value)){
      errors = { ...errors, errorPassword: 'Password harus diisi!' };
    }else if (name === 'email') {
      errors = { ...errors, errorEmail: !isValidEmail(value) ? 'Email tidak valid!' : '' };
    } else if (name === 'password') {
      errors = { ...errors, errorPassword: value && !isValidPassword(value) ? 'Password tidak memenuhi kriteria keamanan!' : '' };
    }

    else{
      setError(errors);
    }
  
    setError(errors);
    
  };

  const isValidEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors = {
      errorEmail: '',
      errorPassword: '',
    };
  
    if (!formData.email) {
      errors = { ...errors, errorEmail: 'Email harus diisi!' };
    }else if (formData.email && !isValidEmail(formData.email)) {
      errors = { ...errors, errorEmail: 'Email tidak valid!' };
    }
  
    if (!formData.password) {
      errors = { ...errors, errorPassword: 'Password harus diisi!' };
    }else if (formData.password && !isValidPassword(formData.password)) {
      errors = { ...errors, errorPassword: 'Password tidak memenuhi kriteria keamanan!' };
    }

  
    setError(errors);

    if (
      !errors.errorEmail &&
      !errors.errorPassword
    ) {
      await login(formData).then(() => {
        }).catch((error) => {
          setAuthErrors(error.message);
        });
      router.push('/');
      window.location.reload();
    }

  };

  const isValidPassword = (password: string) => {
    return (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[@$!%*?&]/.test(password)
    );
  };

  return (
    <div className='bg-gray-50 pb-12 x1:px-28 px-4 relative flex justify-center items-start min-h-[100vh]'>
        {
          session ? (
              <div></div>
          ):(
              <form 
                onSubmit={handleSubmit} 
              >
                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-20 w-[550px] flex-col gap-9">
                      <Tab path={path} />
                      <div className="text-center flex justify-center flex-col items-center mb-5">
                          <Image alt='' className='w-[250px] h-auto' src={logo}/>  
                          <h1 className='font-sans font-bold text-lg'>
                            Mauk Ke Akun Anda
                          </h1>
                      </div>
                      <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email
                          </label>
                          <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          />
                          {error.errorEmail && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorEmail}</p>}
                      </div>
                      <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                          Password
                          </label>
                          <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          />
                          {error.errorPassword && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorPassword}</p>}
                      </div>
                      <p className='text-black text-xs italic mt-2 ml-1 mb-7'>
                          Belum mendaftar? 
                          <Link href='/customer/account/create/' rel='noindex,nofollow' className='ml-1 underline text-blue-300 hover:text-blue-500'>Create Account</Link>
                      </p>
                      <div className="flex items-center justify-center flex-col">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-96 h-14 font-sans" type="submit">
                          Konfirmasi dan Lanjutkan
                          </button>
                          <p className='w-72 text-center font-serif text-sm mt-2'>
                          Dengan membuat atau mendaftar akun, Anda menyetujui isi Persyaratan dan Ketentuan & Kebijakan Privasi kami.
                          </p>
                      </div>
                      {authError && <p className="text-red-500 text-xs italic mt-2 ml-1">{authError}</p>}
                  </div>
              </form>
          )
        }
    </div>
  );
};

export default SignInForm;
