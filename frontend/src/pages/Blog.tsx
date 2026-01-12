import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading) {
        return (
            <div>
                <AppBar />
                <FullBlogSkeleton />
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center">
                    <div className="max-w-screen-xl pt-10">
                        <div className="text-center">Blog not found</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on {new Date().toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}