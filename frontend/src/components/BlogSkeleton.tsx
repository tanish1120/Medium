import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return(

        <div role="status" className="animate-pulse">
            
            <div className="border-b p-4 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex items-center">
                    
                    <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                    
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                    <div className=" pl-2"><Circle/></div>

                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>
                
                <div className="text-xl font-semibold pt-2">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                
                <div className="text-md font-extralight ">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                
                <div className="text-slate-500 text-sm font-extralight pt-4">
                     <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}