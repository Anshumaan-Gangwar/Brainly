import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./sidebaritems";

export function Sidebar(){
    return(
        <div className="h-screen fixed w-72 bg-red-50">
            <div className="flex text-2xl mt-4 mb-8">
                <div className="px-4">
                    <BrainIcon/>
                </div>
                <b><h1>Second Brain</h1></b>
            </div>
            <div className="">
                <div className="my-4 cursor-pointer rounded hover:bg-gray-200  transition-all duration-150">
                    <SidebarItem icon = {<YoutubeIcon/>} text="Youtube"/>
                </div>
                <div className="my-4 cursor-pointer rounded hover:bg-gray-200 ">
                    <SidebarItem icon = {<TwitterIcon/>} text="Twitter"/>
                </div>
            </div>
        </div>
    )
}