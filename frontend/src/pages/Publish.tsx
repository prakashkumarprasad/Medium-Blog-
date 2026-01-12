import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const userName = localStorage.getItem("userName") || "Anonymous"
    const userInitial = userName.charAt(0).toUpperCase()

    const handlePublish = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            alert("Blog published successfully!");
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Failed to publish blog");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-9 h-9 bg-black rounded-full"></div>
                            <div className="w-9 h-9 bg-black rounded-full -ml-3"></div>
                        </div>
                    </div>
                    <span className="text-gray-600 text-sm">Draft in {userName}</span>
                    <span className="text-green-600 text-sm">Saved</span>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={handlePublish}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2"
                    >
                        Publish
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
                        <span className="font-medium text-gray-300">{userInitial}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-10 py-8">
                <div className="flex gap-4 mb-8">
                    <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full text-5xl font-serif font-light placeholder-gray-300 border-none outline-none resize-none mb-4"
                    rows={1}
                    style={{ overflow: 'hidden' }}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full text-xl font-serif placeholder-gray-400 border-none outline-none resize-none min-h-[400px]"
                />
            </div>
        </div>
    );
};