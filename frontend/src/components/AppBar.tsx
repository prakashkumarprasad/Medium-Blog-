import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const AppBar = () => {
    const userName = localStorage.getItem("userName") || "Anonymous"
    
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            Medium
        </Link>
        <div className="flex items-center gap-4">
            <Link to={"/publish"}>
                <button className="text-white bg-green-600 border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-sm font-medium rounded-full text-sm px-4 py-2">
                    New
                </button>
            </Link>
            <Avatar size={"big"} name={userName}/>
        </div>
    </div>
}