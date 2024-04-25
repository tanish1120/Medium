import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return(
        <div className="flex border-b justify-between py-4 px-10">
            
            <div className="flex flex-col justify-center cursor-pointer">
                <Link to='/blogs'>
                    Medium
                </Link>
            </div>
            
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
                </Link>
                <Avatar size="big" name="Tanish"/>
            </div>
        </div>
    )
}