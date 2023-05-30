import React from "react";
import { ReactElement } from "react";

export enum AuthType{
    Home,
    Register,
}

interface Props {
    section: AuthType;
}

const AuthBody: React.FC<Props> = ({ section }) => {
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
                                <input className="w-full" type="text" placeholder="E-mail" name="e-mail" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full" type="password" placeholder="Password" name="password" />
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
                    <form>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full" type="text" placeholder="Name" name="name" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full" type="text" placeholder="E-mail" name="e-mail" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full" type="password" placeholder="Password" name="password" />
                            </p>
                        </label>
                        <label>
                            <p className="border-b-2 border-blue-700 w-full rounded font-inter font-xs mb-4">
                                <input className="w-full" type="password" placeholder="Confirm password" name="confirmpassword" />
                            </p>
                        </label>
                    </form>
                </>
            );
    }
};

export default AuthBody;