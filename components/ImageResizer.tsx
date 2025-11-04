
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ResizeIcon } from './icons/ResizeIcon';

const ImageResizer: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                return;
            }
            setError(null);
            setOriginalImage(file);
            setResizedImageUrl(null);
            setOriginalImageUrl(URL.createObjectURL(file));
        }
    };

    const handleResize = useCallback(() => {
        if (!originalImageUrl || !width || !height) {
            setError('Please upload an image and specify both width and height.');
            return;
        }

        const numWidth = parseInt(width);
        const numHeight = parseInt(height);

        if (isNaN(numWidth) || isNaN(numHeight) || numWidth <= 0 || numHeight <= 0) {
            setError('Please enter valid, positive numbers for dimensions.');
            return;
        }

        setIsResizing(true);
        setError(null);

        const img = new Image();
        img.src = originalImageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = numWidth;
            canvas.height = numHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, numWidth, numHeight);
                // Use image/png for highest quality and transparency support
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                setResizedImageUrl(dataUrl);
            } else {
                setError('Could not process the image. Please try again.');
            }
            setIsResizing(false);
        };
        img.onerror = () => {
            setError('Failed to load the image for resizing.');
            setIsResizing(false);
        };
    }, [originalImageUrl, width, height]);

    const handleDownload = () => {
        if (!resizedImageUrl) return;
        const link = document.createElement('a');
        link.href = resizedImageUrl;
        const fileName = originalImage?.name.split('.').slice(0, -1).join('.') || 'resized-image';
        link.download = `${fileName}_${width}x${height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const setPassportSize = () => {
        // Standard Bangladeshi passport photo size: 45mm x 55mm.
        // At 300 DPI, this is approximately 531 x 650 pixels.
        setWidth('531');
        setHeight('650');
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    Resize Your Image Instantly
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    Upload your image, set your desired dimensions, and download with perfect quality.
                </p>
            </div>
            
            {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center transition-all duration-300">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: Upload & Controls */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6 shadow-lg">
                    <div 
                      className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-800 transition-all duration-300"
                      onClick={() => fileInputRef.current?.click()}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <UploadIcon className="w-12 h-12 text-slate-500" />
                            <p className="text-slate-400">
                                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">Any image format (PNG, JPG, GIF, etc.)</p>
                        </div>
                    </div>
                    
                    {originalImage && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-slate-300">Resizing Options</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Width (px)"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                />
                                <input
                                    type="number"
                                    placeholder="Height (px)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                />
                            </div>
                            <button 
                                onClick={setPassportSize} 
                                className="w-full text-sm bg-slate-700 text-indigo-300 py-2 rounded-md hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Use Bangladeshi Passport Photo Template (531x650)
                            </button>
                            <button
                                onClick={handleResize}
                                disabled={isResizing || !width || !height}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                {isResizing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Resizing...
                                    </>
                                ) : (
                                    <>
                                        <ResizeIcon className="w-5 h-5" />
                                        Resize Image
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Panel: Previews */}
                <div className="flex flex-col gap-8">
                    <ImagePreview title="Original Image" imageUrl={originalImageUrl} fileName={originalImage?.name}/>
                    <ImagePreview title="Resized Image" imageUrl={resizedImageUrl} isDownloadable={true} onDownload={handleDownload}/>
                </div>
            </div>
        </div>
    );
};

interface ImagePreviewProps {
    title: string;
    imageUrl: string | null;
    fileName?: string;
    isDownloadable?: boolean;
    onDownload?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ title, imageUrl, fileName, isDownloadable = false, onDownload }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex-1 flex flex-col shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
                {isDownloadable && imageUrl && (
                    <button onClick={onDownload} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-sm">
                        <DownloadIcon className="w-4 h-4"/>
                        Download
                    </button>
                )}
            </div>
            <div className="flex-1 flex items-center justify-center bg-slate-900/50 rounded-lg min-h-[200px] overflow-hidden">
                {imageUrl ? (
                    <div className="p-4 animate-fade-in w-full text-center">
                        <img src={imageUrl} alt={title} className="max-w-full max-h-64 mx-auto object-contain rounded-md shadow-md" />
                        {fileName && <p className="text-xs text-slate-500 mt-2 truncate">{fileName}</p>}
                    </div>
                ) : (
                    <p className="text-slate-500">Image preview will appear here</p>
                )}
            </div>
        </div>
    );
}

export default ImageResizer;
