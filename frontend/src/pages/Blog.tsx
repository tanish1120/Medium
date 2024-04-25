import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {

  const {id} = useParams();

  const {blog,loading} = useBlog({
    id: id || ""
  });
  
  if(loading || !blog){
    return(
      <div>
        <Appbar/>
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner/>
        </div>
      </div>
    )
  }
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}
