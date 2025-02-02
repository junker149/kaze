// @ts-ignore
export default function Input({label, placeholder}){
    return <div className="">
        <div className="font-bold mb-1">{label}</div>
        <input className="border-1 border-gray-400 rounded-sm w-full mb-4 h-10 p-1.5" placeholder={placeholder}></input>
    </div>
}