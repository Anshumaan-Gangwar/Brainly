import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { CloseIcon } from "../icons/CoseIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Login(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        console.log(usernameRef.current);
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        // console.log(response);
        const JWT = response.data.token //fetcing token send by our backend axios rerturn response which has other thihgs then the main thing which are backend is sending(json{token})
        localStorage.setItem("token", JWT); //genereating key with value JWT



        // alert("New user has been added");
        navigate("/dashboard");

    }
    return(
        <div className="h-screen w-screen bg-slate-300 bg-opacity-50 top-0 bottom-0 fixed flex justify-center items-center">
            <div className="bg-white p-2">
                <div className="flex justify-end">
                    <div className="cursor-pointer">
                        <CloseIcon/>
                    </div>
                </div>
                
                <div>
                    <Input label="Username" placeholder="Username" reference={usernameRef}></Input>
                    <Input label="Password" placeholder="Password" reference={passwordRef}></Input>
                </div>
                <div className="flex justify-center">
                    <Button onClick={signin} variant="primary" text="Login"></Button>
                </div>
            </div>
        </div>
    )
}