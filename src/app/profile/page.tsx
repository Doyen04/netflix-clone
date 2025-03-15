"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Session from "../util/session";
import { User } from "next-auth";
import { useEffect, useState } from "react";



const Profiles = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        async function get() {
            const res = await Session()
            setUser(res)
        }
        get()
    }, [])

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="relative w-44 h-44 rounded-md flex 
                            items-center justify-center border-2 border-transparent 
                            group-hover:cursor-pointer group-hover:border-white overflow-hidden ">
                                <Image fill className="object-cover" src={'/images/netflix-smile.jpeg'} alt="profile" />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}



export default Profiles;