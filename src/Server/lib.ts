"use server"

import { BaseUrl } from '@/configAPI';
import { cookies } from "next/headers";

type LoginData = {
    email: string;
    password: string;
};

type RegistData = {
    name: string,
    email: string,
    password: string,
    gender: string,
    role: string,
    birthDate: string
};

const expires = new Date(Date.now() + (30 * 60 * 1000));

export const login = async (formData: LoginData) => {

    try {
        const response = await fetch(`${BaseUrl}api/v1/auth/authenticate`, {
          method: 'POST',
          headers: {
            'Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
            throw new Error('Authentication Error');
        }
  
        const data = await response.json();
        const authResponse: AuthResponse = data;

        cookies().set("tkn_idx", authResponse.access_token, { expires, httpOnly: true });

        await getSession();
    } catch (error) {
        throw new Error('Authentication Error');
    }
}

export const register = async (formData: RegistData) => {
    try {
        const response = await fetch(`${BaseUrl}api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Register Error');
        }

        const data = await response.json();
        const authResponse: AuthResponse = data;

        cookies().set("tkn_idx", authResponse.access_token, { expires, httpOnly: true });

        await getSession();
    } catch (error) {
        console.error('Register Error:', error);
        throw new Error('Register Error');
    }
}


export async function logout() {
    await fetch(`${BaseUrl}api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies().get("tkn_idx")?.value}`
        },
    });
    cookies().set("tkn_idx", "", { expires: new Date(0) });
    cookies().set("s_id", "", { expires: new Date(0) });
    cookies().set("s_uname", "", { expires: new Date(0) });
    cookies().set("payloads", "", { expires: new Date(0) });
}
  
export const getSession = async () => {
    let data = null;
    try{
        const session = cookies().get("tkn_idx")?.value;
        if (!session) return null;
        const response = await fetch(`${BaseUrl}api/v1/auth/session`, {
            method: 'POST',
            headers: {
              'Origin': 'http://localhost:3000',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookies().get("tkn_idx")?.value}`
            },
        });
    
        data = await response.json();

        cookies().set("s_id", data.users.s_id, { expires, httpOnly: true });
        cookies().set("s_uname", data.users.s_uname, { expires, httpOnly: true });
        cookies().set("payloads", data, { expires, httpOnly: true });
    }catch(error){
        return null;
    }
    return data;
}

export const getUname = async () =>{
    return cookies().get("s_uname")?.value
}

export const getTx_id = async () => {
    return cookies().get("tkn_idx")?.value
}
