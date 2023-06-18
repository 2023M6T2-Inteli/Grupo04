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
                <p className="font-mont text-blue-gerdau-init font-semibold text-px-40 md:text-3xl flex items-center">
                    {header}
                </p>
                <p className="font-inter text-black-zero text-px-22 text-center lg:text-lg">
                    {text}
                </p>
            </div>
            <SignForm signType={signType}/>
        </>
    )
};

export default AuthBody;