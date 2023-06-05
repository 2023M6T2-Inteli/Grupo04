import React from "react";
import SignForm, {SignType} from "@/components/SignForm";

interface Props {
    signType: SignType;
    header: string;
    text: string;
}

const AuthBody: React.FC<Props> = ({header, text, signType}) => {
  
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <p className="font-mont text-blue-zero font-bold text-lg md:text-3xl flex items-center">
                    {header}
                </p>
                <p className="font-inter text-xs text-center lg:text-lg">
                    {text}
                </p>
            </div>
            <SignForm signType={signType}/>
        </>
    )
};

export default AuthBody;