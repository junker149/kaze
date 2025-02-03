import { useState } from "react";
import Input from "../Components/Input";
import { SigninInput } from "@junker149/common";

export default function Signin() {
    const [signinInputs, setSigninInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })

    return <div className="flex">
        <div className="w-full h-screen flex justify-center items-center" style={{ backgroundColor: "#F3F5F7" }}>
            <div className=" w-auto h-auto p-10">
                <div className="text-4xl font-bold font-mono text-center mb-2">Enter your details</div>
                <div className="font-mono text-gray-400 text-center mb-6">Don't have an account?<a href="/signup" className="underline">Sign Up</a></div>
                <Input placeholder="xyz@gmail.com" label="Email" onChange={(e)=>{
                    setSigninInputs({
                        ...signinInputs,
                        email: e.target.value
                    })
                }} ></Input>
                <Input placeholder="12345678" label="Password" type="password" onChange={(e)=>{
                    setSigninInputs({
                        ...signinInputs,
                        password: e.target.value
                    })
                }}></Input>
                <button className="text-center bg-black text-white px-20 w-full font-semibold py-2 rounded-sm" onClick={(e) => {
                    console.log(e);
                }}>Sign In</button>
            </div>
        </div>
        <div className="w-3/4 h-screen flex justify-center items-center bg-gray-200">
            <div className="w-auto h-auto p-10 mx-20 text-left">
                <div className="text-2xl font-bold font-mono mb-2">"The platform offers an impressive experience, seamlessly combining functionality and ease of use to create something truly remarkable."</div>
                <div className="font-semibold mt-4">Hitoshi Ando</div>
                <div className="text-gray-600">CEO, Ando Corporation</div>
            </div>
        </div>
    </div>
}