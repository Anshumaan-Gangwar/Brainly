import { ReactElement } from "react"

interface ButtonProps {
    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: ()=>void
}

const buttonVariants = {
    "primary": "bg-customPurple-dark text-white",
    "secondary": "bg-customPurple-light text-customPurple-md"
}
const defaultStyle="px-4 py-2 rounded-lg flex items-center "

export function Button({variant, text, startIcon, onClick}: ButtonProps){
    return(
        <button onClick={onClick} className={buttonVariants[variant]+" "+defaultStyle}>
            <div className="mr-2">
                {startIcon}
            </div>
            {text}
        </button>
    )
}
