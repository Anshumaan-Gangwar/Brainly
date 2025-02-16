import { ReactElement } from "react";

interface SidebarItemProps{
    icon:ReactElement,
    text:string
}


export function SidebarItem({icon, text}:SidebarItemProps){
    return(
        <div className="flex items-center">
            <div className="ml-6">
                {icon} 
            </div>
            <div className="ml-4">
                {text}
            </div>
        </div>
    )
}