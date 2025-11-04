
import React from 'react';
import { InfoIcon } from './icons/InfoIcon';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 animate-fade-in-up">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
                    About Img Pro
                </h1>
                <p className="mt-4 text-lg text-slate-400">
                    Your friendly, powerful, and modern image resizing tool.
                </p>
            </div>

            <div className="space-y-10">
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                        <InfoIcon className="w-7 h-7 text-teal-400" />
                        How It Works
                    </h2>
                    <div className="space-y-4 text-slate-300">
                        <p>
                            Img Pro simplifies the process of resizing images into three easy steps. We use your browser's built-in Canvas API to perform all resizing operations locally, ensuring your images are never uploaded to a server. This guarantees privacy and speed.
                        </p>
                        <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-semibold">Upload Your Image:</span> Simply click the upload area and select any image file from your device. A preview of your original image will appear instantly.
                            </li>
                            <li>
                                <span className="font-semibold">Set Dimensions:</span> Enter your desired width and height in pixels. For convenience, you can use our "Bangladeshi Passport Photo" template to automatically set the standard dimensions.
                            </li>
                            <li>
                                <span className="font-semibold">Resize & Download:</span> Click the "Resize Image" button. A high-quality preview of your resized image will be generated. If you're satisfied, click "Download" to save it to your device as a high-quality PNG file.
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        About the Developer
                    </h2>
                    <div className="space-y-4 text-slate-300">
                        <p>
                            Img Pro was designed and developed with passion by the team at <span className="font-bold text-white">MetaSoul</span>. We specialize in creating modern, user-centric web applications that are both beautiful and functional.
                        </p>
                        <p>
                            Our mission is to build tools that solve real-world problems with elegant solutions. We believe in the power of clean code, intuitive design, and a seamless user experience.
                        </p>
                        <div className="text-center pt-4">
                            <a 
                                href="https://metaxsoul.store" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Visit MetaSoul
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
