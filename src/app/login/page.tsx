"use client"

import React from "react";
import Input from "@/component/input";
import axios from "axios";

import Image from "next/image";
import { useCallback, useState } from "react";

import { Login } from "@/lib/loginHandle";


const Auth = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant == 'login' ? 'register' : 'login')
    }, [])

    const register = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/register', {
                email,
                name,
                password
            })
        } catch (error) {
            console.log(error);

        }
    }, [email, name, password])


    const login = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await Login(email, password)

            if (!!response.error) {
                console.error("response.error");

            } else {
                console.log('success');
            }
        } catch (error) {
            console.log(error);
            console.log("Check your Credentials");
        }
    }, [email, password])

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
                        <form onSubmit={variant == 'login' ? login : register} className="flex flex-col gap-4">
                            {variant == 'register' &&
                                <Input label="Username" id="name" type="text" onChange={(ev) => { setName(ev.target.value) }} value={name} />
                            }
                            <Input label="Email" id="email" type="email" onChange={(ev) => { setEmail(ev.target.value) }} value={email} />
                            <Input label="Password" id="password" type="password" onChange={(ev) => { setPassword(ev.target.value) }} value={password} />

                            <button type="submit" className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                                {variant == 'login' ? 'Login' : 'Sign up'}
                            </button>
                        </form>

                        <p className="text-neutral-500 mt-12 truncate">
                            {variant == 'login' ? 'First time using Netflix?' : "Already have an account?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant == 'login' ? 'Create an Account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;