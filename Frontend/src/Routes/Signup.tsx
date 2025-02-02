import Input from "../Components/Input";

export default function Signup() {
    return <div className="flex">
        <div className="w-full h-screen flex justify-center items-center" style={{ backgroundColor: "#F3F5F7" }}>
            <div className=" w-auto h-auto p-10">
                <div className="text-4xl font-bold font-mono text-center mb-2">Create an account</div>
                <div className="font-mono text-gray-400 text-center mb-6">Already have an account?<a href="/signin" className="underline">Login</a></div>
                <Input placeholder="John Doe" label="Username"></Input>
                <Input placeholder="xyz@gmail.com" label="Email"></Input>
                <Input placeholder="12345678" label="Password"></Input>
                <button className="text-center bg-black text-white px-20 w-full font-semibold py-2 rounded-sm" onClick={(e) => {
                    console.log(e);
                }}>Sign Up</button>
            </div>
        </div>
        <div className="w-3/4 h-screen flex justify-center items-center bg-gray-100">
            <div className="w-auto h-auto p-10 mx-20 text-left">
                <div className="text-2xl font-bold font-mono mb-2">"The customer service I recieved was exceptional. The support team went above and beyond to address my concerns."</div>
                <div className="font-semibold mt-4">Jules Winnfield</div>
                <div className="text-gray-600">CEO, Acme Inc</div>
            </div>
        </div>
    </div>
}