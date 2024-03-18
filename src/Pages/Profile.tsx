"use client"

import { getSession } from "@/Server/lib";
import { useEffect, useState } from "react";

interface ViewProduct{
    role: string,
    router: any
}

export const ProfilePage : React.FC<ViewProduct> = ({role, router}) => {

    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
      const fetchSession = async () => {
        const sessionData = await getSession();
        if (!sessionData) {
            router.push('/');
        }
        setSession(sessionData);
      };
      fetchSession();
    }, [router, session]);

    return (
        <Profile session={session} setSession={setSession} router={router} role={role} />
    );
};

const Profile = ({ session, router, role ,setSession }: { session: SessionData | null; router: any | null ; role: string | null; setSession: (session: SessionData | null) => void }) => {
    return(
        <div className='bg-gray-50 pb-12 x1:px-28 px-4 relative flex justify-center items-start min-h-[100vh]'>
            <div className="flex h-fit bg-gray-100">
                <aside className="w-1/4 bg-gray-900 p-4">
                    <nav>
                    <ul className="space-y-2">
                        <li className="hover:bg-gray-700 p-2 rounded">Akun Saya</li>
                        {/* Tambahkan opsi menu lainnya dengan format yang sama */}
                    </ul>
                    </nav>
                </aside>
                <main className="w-3/4 p-4">
                    <section className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">Informasi Kontak</h2>
                    <div className="border p-4 rounded">
                        <p>Nama: [Nama Pengguna]</p>
                        <p>E-mail: [Email Pengguna]</p>
                        <p>Tanggal Lahir: [Tanggal Lahir Pengguna]</p>
                        <p>Role: {role}</p>
                        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2">
                        UBAH
                        </button>
                    </div>
                    </section>
                    <section>
                    <h2 className="text-2xl font-bold mb-2">Alamat Pengiriman</h2>
                    <div className="border p-4 rounded mb-4">
                        <address className="not-italic">
                        [Alamat Lengkap Pengguna]
                        </address>
                        <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-2">
                        + ALAMAT BARU
                        </button>
                    </div>
                    </section>
                </main>
            </div>
        </div>
    )
}