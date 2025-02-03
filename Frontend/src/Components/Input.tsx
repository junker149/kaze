import { ChangeEventHandler } from "react";

interface InputParam {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    type?: string;
}
export default function Input({label, placeholder, onChange, type}: InputParam){
    return <div className="">
        <div className="font-bold mb-1">{label}</div>
        <input className="border-1 border-gray-400 rounded-sm w-full mb-4 h-10 p-1.5" placeholder={placeholder} type={type || "text"} onChange={onChange}></input>
    </div>
}