export const BlogSkeleton = () => {
    return (
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                
                
                <div className="flex justify-center flex-col pl-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                
                <div className="flex justify-center flex-col pl-2">
                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                </div>
                
                
                <div className="pl-2 flex justify-center flex-col">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
            
            
            <div className="pt-2">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            </div>
            
            
            <div className="pt-2 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            
            <div className="pt-4">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export const BlogSkeletonList = () => {
    return (
        <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    );
};