import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeletonList } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs()

    if (loading) {
        return (
            <div>
                <AppBar/>
                <div className="flex justify-center">
                    <div className="max-w-xl">
                        <BlogSkeletonList />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar/>
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {blogs.length === 0 ? (
                        <div className="text-center pt-10">
                            <p className="text-gray-500">No blogs found. Be the first to create one!</p>
                        </div>
                    ) : (
                        blogs.map(blog => (
                            <BlogCard 
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}