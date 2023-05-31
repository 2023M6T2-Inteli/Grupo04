import NavBar from "@/components/NavBar";
import Display from "@/components/Display";
import {useEffect, useState} from "react";
import AddAnalyze from "@/components/AddAnalyze";
import {useRouter} from 'next/router'
import axios from "@/utils/axios";
import {Spinner} from "@chakra-ui/react";

export enum DisplayType {
    Dashboard,
    AddAnalyze,
    History,
    TestRobot,
}

const DashBoard = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [display, setDisplay] = useState<DisplayType>(DisplayType.Dashboard);

    const router = useRouter();

    useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                axios.get("/api/authenticate", {headers: {Bearer: `${token}`}}).then((res) => {
                        if (res.status === 200) {
                            setAuthenticated(true);
                        } else {
                            router.push("/").then(() => {
                                setAuthenticated(false);
                                console.log("Redirecting to login");
                            });
                        }
                        return
                    }
                )
            }
            router.push("/").then(() => {
                console.log("Redirecting to login");
            })
        }
    )


    if (authenticated) {
        return (
            <div className="h-screen w-screen overflow-hidden flex">
                <NavBar display={display} setDisplay={setDisplay}/>
                {display === DisplayType.Dashboard && <Display/>}
                {display === DisplayType.AddAnalyze && <AddAnalyze/>}
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    )
};

export default DashBoard;
