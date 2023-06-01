import React from "react";
import { ReactElement } from "react";
import { useState } from "react";
import axios from "@/utils/axios"

export enum AuthType{
    Home,
    Register,
}

interface Props {
    section: AuthType;
}

const AuthBody: React.FC<Props> = ({ section }) => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const register = async (event) => {
        event.preventDefault();
        console.log(name, email, password, confirmPassword)
        await axios.post('/register',{
            name:name,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        })
    }
    
    switch(section) {
        case AuthType.Home:
            return(
                <>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-mont text-blue-zero font-bold text-lg md:text-3xl flex items-center">
                        Sign In
                    </p>
                    <p className="font-inter text-xs text-center lg:text-lg">Welcome Back!</p>
                    </div>
                    <form>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" type="text" placeholder="E-mail" name="e-mail" id="emaillogin" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" type="password" placeholder="Password" name="password" id="passwordlogin" />
                            </p>
                        </label>
                    </form>
                </>
            );
        case AuthType.Register:
            return(
                <>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-mont text-blue-zero font-bold text-lg md:text-3xl flex items-center">
                        Sign Up
                    </p>
                    <p className="font-inter text-xs text-center lg:text-lg">Let's get started</p>
                    </div>
                    <form onSubmit={register} >
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" onChange={(event)=> setName(event.target.value)} type="text" placeholder="Name" name="name" id="namereg" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" onChange={(event)=> setEmail(event.target.value)} type="text" placeholder="E-mail" name="e-mail" id="emailreg" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" onChange={(event)=> setPassword(event.target.value)} type="password" placeholder="Password" name="password" id="passwordreg" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full outline-none ring-0" onChange={(e)=> setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" name="confirmpassword" id="confirmpasswordreg" />
                            </p>
                        </label>
                        <button type="submit" className="bg-blue-zero w-full py-2 text-white text-base lg:text-2xl font-mont font-bold rounded-full">Start</button>
                    </form>
                </>
            );
    }
};

export default AuthBody;