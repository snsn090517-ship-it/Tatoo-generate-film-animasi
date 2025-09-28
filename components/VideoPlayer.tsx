
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

interface VideoPlayerProps {
  isLoading: boolean;
  videoUrl: string | null;
}

const LoadingIndicator: React.FC = () => {
    const [message, setMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                return LOADING_MESSAGES[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-4">
            <svg className="animate-spin h-12 w-12 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-gray-200">AI sedang berkreasi...</p>
            <p className="text-gray-400 mt-2 transition-opacity duration-500">{message}</p>
        </div>
    );
};


const VideoPlayer: React.FC<VideoPlayerProps> = ({ isLoading, videoUrl }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (videoUrl) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-gray-900 rounded-lg flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <p className="mt-4 text-gray-500">Video yang Anda buat akan muncul di sini</p>
    </div>
  );
};

export default VideoPlayer;
