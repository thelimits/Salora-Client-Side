"use client"

import { useEffect, useState } from 'react';
import Image from "next/image";
import logo from '../../public/logo.png'
import Tab from '@/Components/Tab';
import { getSession, register } from '@/Server/lib';


export const SignUpForm = ({ router }: any) => {
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
      <SignUp session={session} setSession={setSession} router={router} />
  );
  }

const SignUp = ({ session, router ,setSession }: { session: SessionData | null; router: any | null ;setSession: (session: SessionData | null) => void }) => {

  const path = '/customer/account/create/';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDateArray: {
      day: '',
      month: '',
      year: ''
    },
    role: "CUSTOMER",
    birthDate: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [error, setError] = useState({
    errorNama: '',
    errorEmail: '',
    errorPassword: '', 
    errorCPassword: '', 
    errorGender: '', 
    errorBDay: '', 
  });

  const [registerError, setRegisterErrors] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let errors = {
      errorNama: error.errorNama,
      errorEmail: error.errorEmail,
      errorPassword: error.errorPassword,
      errorCPassword: error.errorCPassword,
      errorGender: error.errorGender,
      errorBDay: error.errorBDay,
    };
  
    if (name === 'day' || name === 'month' || name === 'year') {
      const updatedBirthDateArray = { ...formData.birthDateArray, [name]: value ? value : null };
      const birthDate = updatedBirthDateArray.day && updatedBirthDateArray.month && updatedBirthDateArray.year
        ? `${updatedBirthDateArray.year}-${updatedBirthDateArray.month}-${updatedBirthDateArray.day}`
        : '';
  
      setFormData(prevState => ({
        ...prevState,
        birthDateArray: updatedBirthDateArray,
        birthDate: birthDate
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  
    if (name === 'name' && !value) {
      errors = { ...errors, errorNama: 'Nama harus diisi!' };
    } else if((name === 'email' && !value)){
      errors = { ...errors, errorEmail: 'Email harus diisi!' };
    }else if((name === 'password' && !value)){
      errors = { ...errors, errorPassword: 'Password harus diisi!' };
    }else if((name === 'confirmPassword' && !value)){
      errors = { ...errors, errorCPassword: 'Confirm Password harus diisi!' };
    }else if((name === 'gender' && !value)){
      errors = { ...errors, errorGender: 'Gender harus diisi!' };
    }else if((name === 'day' && !value) || (name === 'month' && !value) || (name === 'year' && !value)){
      errors = { ...errors, errorBDay: 'Tanggal lahir harus diisi!' };
    }

    else if (name === 'email') {
      errors = { ...errors, errorEmail: !isValidEmail(value) ? 'Email tidak valid!' : '' };
    } else if (name === 'password') {
      errors = { ...errors, errorPassword: value && !isValidPassword(value) ? 'Password tidak memenuhi kriteria keamanan!' : '' };
    }else if (name === 'confirmPassword') {
      errors = { ...errors, errorCPassword: value && value != formData.password ? 'Password tidak match!' : '' };
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
      errorNama: '',
      errorEmail: '',
      errorPassword: '',
      errorCPassword: '',
      errorGender: '',
      errorBDay: '',
    };
  
    if (!formData.name) {
      errors = { ...errors, errorNama: 'Nama harus diisi!' };
    }
  
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

    if(!formData.confirmPassword) {
      errors = { ...errors, errorCPassword: 'Confirm password harus diisi!' };
    }else if(formData.confirmPassword != formData.password){
      errors = { ...errors, errorCPassword: 'Password tidak match!' };
    }
    
    if(!formData.gender) {
      errors = { ...errors, errorGender: 'Gender harus diisi!' };
    }

    if(!(formData.birthDateArray.day && formData.birthDateArray.month && formData.birthDateArray.year)) {
      errors = { ...errors, errorBDay: 'Tanggal lahir harus diisi!' };
    }
  
    setError(errors);

    console.log(formData)
    if (
      !errors.errorNama &&
      !errors.errorEmail &&
      !errors.errorPassword &&
      !errors.errorCPassword &&
      !errors.errorGender &&
      !errors.errorBDay
    ) {
      await register(formData).then(() => {
      }).catch((error) => {
        setRegisterErrors(error.message);
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
        ) : (
          <form onSubmit={handleSubmit}>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-20 w-[550px] flex-col gap-9">
              <Tab path={path} />
              <div className="text-center flex justify-center flex-col items-center mb-5">
                  <Image alt='' className='w-[250px] h-auto' src={logo}/>  
                  <h1 className='font-sans font-bold text-lg'>
                  Buat Akun
                  </h1>
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nama
                  </label>
                  <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  />
                  {error.errorNama && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorNama}</p>}
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
              <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                  </label>
                  <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  />
                  {error.errorCPassword && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorCPassword}</p>}
              </div>
              <div className="mb-4">
                  <span className="block text-gray-700 text-sm font-bold mb-2">Gender * - untuk personalisasi akun</span>
                  <div className="mt-2">
                  <label className="inline-flex items-center">
                      <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="WANITA"
                      onChange={handleChange}
                      />
                      <span className="ml-2">Wanita</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                      <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="PRIA"
                      onChange={handleChange}
                      />
                      <span className="ml-2">Pria</span>
                  </label>
                  </div>
              </div>
              {error.errorGender && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorGender}</p>}
              <div className="mb-4">
                  <span className="block text-gray-700 text-sm font-bold mb-2 mt-5">Tanggal Lahir - dapatkan kejutan hari ulang tahun!</span>
                  <div className="mt-2 grid grid-cols-3 gap-4 h-12">
                  <select name="day" onChange={handleChange} className="form-select block w-full mt-1 border-2 border-gray-100 outline-blue-400" aria-label="Day">
                      <option value="">Tanggal</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                          {day}
                      </option>
                      ))}
                  </select>
                  <select name="month" onChange={handleChange} className="form-select block w-full mt-1 border-2 border-gray-100 outline-blue-400" aria-label="Month">
                  <option value="">Bulan</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                      {month}
                      </option>
                  ))}
                  </select>
                  <select name="year" onChange={handleChange} className="form-select block w-full mt-1 border-2 border-gray-100 outline-blue-400" aria-label="Year">
                  <option value="">Tahun</option>
                  {Array.from({ length: 121 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                      {year}
                      </option>
                  ))}
                  </select>
              </div>
              {error.errorBDay && <p className="text-red-500 text-xs italic mt-2 ml-1">{error.errorBDay}</p>}
              </div>
              <div className="flex items-center justify-center flex-col mt-7">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-96 h-14 font-sans" type="submit">
                  Konfirmasi dan Lanjutkan
                  </button>
                  <p className='w-72 text-center font-serif text-sm mt-2'>
                  Dengan membuat atau mendaftar akun, Anda menyetujui isi Persyaratan dan Ketentuan & Kebijakan Privasi kami.
                  </p>
              </div>
              {registerError && <p className="text-red-500 text-xs italic mt-2 ml-1">{registerError}</p>}
              </div>
          </form>
        )
      }
    </div>
  );
};

export default SignUpForm;
