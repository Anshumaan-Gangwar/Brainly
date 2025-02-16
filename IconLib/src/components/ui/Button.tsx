import { ReactElement } from "react"
interface ButtonProps {
    type: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    frontIcon?: ReactElement,
    endIcon?: ReactElement
}

const variants = {
    "primary": "bg-white text-purple-500",
    "secondary": "bg-purple-400 text-white",
    "sm": "py-1 px-2 rounded-lg text-sm",
    "md": "py-2 px-4 rounded-lg text-md",
    "lg": "py-4 px-8 rounded-lg text-xl"
}



export function Button(props : ButtonProps){
    return(
        <button className={`${variants[props.type]} ${variants[props.size]} flex  items-center`}>
            {props.frontIcon? <div className="pr-2">{props.frontIcon}</div>:null}
            {props.text}
        </button>
    )
}