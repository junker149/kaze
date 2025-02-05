import { useState } from "react";
import Input from "../Components/Input";
import { SignupInput } from "@junker149/common";
import axios from "axios"

export default function Signup() {
    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`https://backend.rawalaman-0505.workers.dev/api/v1/user/signup`, signupInputs);
            //@ts-ignore
            localStorage.setItem('token',response.data.token);
        }catch(err){
            console.log(err);
        }
    }

    return <div className="flex">
        <div className="w-full h-screen flex justify-center items-center" style={{ backgroundColor: "#F3F5F7" }}>
            <div className=" w-auto h-auto p-10">
                <div className="text-4xl font-bold text-center mb-2">Create an account</div>
                <div className="text-gray-400 text-center mb-6">Already have an account?<a href="/signin" className="underline">Login</a></div>
                <Input placeholder="John Doe" label="Username" onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        name: e.target.value
                    })
                }}></Input>
                <Input placeholder="xyz@gmail.com" label="Email" onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        email: e.target.value
                    })
                }}></Input>
                <Input placeholder="12345678" label="Password" type="password" onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        password: e.target.value
                    })
                }}></Input>
                <button className="text-center bg-black text-white px-20 w-full font-semibold py-2 rounded-sm" onClick={sendRequest}>Sign Up</button>
            </div>
        </div>
        <div className="w-3/4 h-screen flex justify-center items-center bg-gray-200">
            <div className="w-auto h-auto p-10 mx-20 text-left">
                <div className="text-2xl font-bold mb-2">"The customer service I recieved was exceptional. The support team went above and beyond to address my concerns."</div>
                <div className="font-semibold mt-4">Jules Winnfield</div>
                <div className="text-gray-600">CEO, Acme Inc</div>
            </div>
        </div>
    </div>
}