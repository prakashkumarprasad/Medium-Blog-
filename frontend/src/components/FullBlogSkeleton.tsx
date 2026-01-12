export const FullBlogSkeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                
                <div className="col-span-8">
                    
                    <div className="space-y-4">
                        <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    
                    <div className="pt-4">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    
                    <div className="pt-6 space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                
                <div className="col-span-4 pl-8">
                    
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-4"></div>
                    
                    <div className="flex">
                        
                        <div className="pr-4 flex flex-col justify-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex-1">
                        
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                            
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};