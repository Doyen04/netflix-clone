"use client"

import Input from "@/component/input";
import Image from "next/image";
import { useCallback, useState } from "react";



const Auth = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant == 'login' ? 'register' : 'login')
    }, [])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-black/50">
                <div className="px-12 py-5">
                    <Image src={'/images/netflix.png'} alt={'logo'} width={78} height={48} />
                </div>
                <div className="flex justify-center">
                    <div className="bg-black/70  px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-4xl text-white mb-3 font-semibold">
                            {variant == 'login' ? ' Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' &&
                                <Input label="Username" id="name" type="text" onChange={(ev) => { setName(ev.target.value) }} value={name} />
                            }
                            <Input label="Email" id="email" type="email" onChange={(ev) => { setEmail(ev.target.value) }} value={email} />
                            <Input label="Password" id="password" type="password" onChange={(ev) => { setPassword(ev.target.value) }} value={password} />

                        </div>
                        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant == 'login'? 'Login' : 'Sign up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            First time using Netflix
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                Create an Account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;