import { useRef } from "react"
import { CloseIcon } from "../icons/CoseIcon"
import { Button } from "./Button.tsx"
import { Input } from "./Input.tsx"
import { BACKEND_URL } from "../config.ts"
import axios from "axios"


interface CreateContentModelProp{
    open: boolean,
    onClose: ()=>void
}

export function CreateContentModel({open, onClose}: CreateContentModelProp) {
    const titleRef = useRef<HTMLInputElement>();
    const typeRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();

    async function addContent(){
        const title = titleRef.current?.value; // it is possible that titlrRef.current is undefined and in that case accessing the value is ts error.
        const type = typeRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{  // three parameters accepted, url, body, config(header, timeout, authentication)
            title,
            type,
            link
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }
    
    return(
        <div>
            {open && (
                <div className="h-screen w-screen bg-slate-300 bg-opacity-50 top-0 bottom-0 fixed flex justify-center
                items-center">
                    <div className="bg-white p-2">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CloseIcon/>
                            </div>
                        </div>
                        
                        <div>
                            <Input reference={titleRef} label="Title" placeholder="title"></Input>
                            <Input reference={typeRef} label="Type" placeholder="youtube/twitter"></Input>
                            <Input reference={linkRef} label="Link" placeholder="Paste here"></Input>
                        </div>

                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit"></Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}