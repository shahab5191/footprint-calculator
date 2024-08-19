import { ReactNode } from "react";

interface PropsType {
    children: ReactNode
}
const Button = (props:PropsType) => {
    return (
        <button className="bg-accent w-full text-primary px-sm py-s rounded-s">
            {props.children}
        </button>
    )
}

export default Button;
