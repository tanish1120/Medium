import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className="border-b p-4 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center">
                <div className=""><Avatar size="small" name={authorName}/></div>
                <div className="font-extralight pl-2 text-sm ">{authorName}</div> 
                <div className=" pl-2"><Circle/></div>
                <div className="font-thin text-slate-500 pl-2 text-sm">{publishedDate}</div>
            </div>
            
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            
            <div className="text-md font-extralight ">
                {content.slice(0,100) + "..."}
            </div>
            
            <div className="text-slate-500 text-sm font-extralight pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
            {/* <div className="h-[1px] w-full bg-slate-200"></div> */}
        </div>
    </Link>
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}


export function Avatar( { name, size = "small" }: { name: string, size: "small" | "big" } ){
    return(
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-600 rounded-full`}>
            <span className={`${size === "small" ? "text-sm font-light" : "text-lg font-medium"}   text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    )
}