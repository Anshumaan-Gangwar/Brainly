import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { CloseIcon } from "../icons/CoseIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        console.log(usernameRef.current);
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })
        alert("New user has been added");
        navigate("/signin");

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
                    <Button onClick={signup} variant="primary" text="Signup"></Button>
                </div>
            </div>
        </div>
    )
}