import { SignupInput } from "@tanishrathore/medium-common";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ( {type} : { type:"signup" | "signin" } ) => {
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    });

    const navigate = useNavigate()

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,postInputs);
            const jwt = response.data.jwt;
            console.log(jwt)
            localStorage.setItem("Authorization",jwt);
            navigate("/blogs")
        } catch (e) {
            // Alert the user that the request failed
            alert(`Error while ${type === "signin" ? "Signing in" : " Signing up"}`)
        }
        
    }


  return (
    <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className='text-3xl font-extrabold mt-4'>
                        {type === "signin"? "Login to Account" : "Create an Account"}
                    </div>
                    <div className=" text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "SignUp" : "SignIn"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type ==="signup" ? <LabelledInput label="Name" placeholder="Tanish Rathore...." onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }}/> : null}
                    <LabelledInput label="Email" placeholder="tanish@mail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value,
                        })
                    }}/>
                    <LabelledInput label="Password" type="password" placeholder="hbad832@#uygf" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value,
                        })
                    }}/>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {type === "signup" ? "SignUp" : "SignIn"}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

interface LabelledInputType{
    label:string,
    placeholder:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return(
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 pt-5">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}