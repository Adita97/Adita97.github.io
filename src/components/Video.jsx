import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const StyledVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background: #000;
`;

const ErrorMessage = styled.div`
  position: absolute;
  color: white;
  font-size: 1.2rem;
  z-index: 1001;
  text-align: center;
  padding: 20px;
`;

const Video = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSource, setCurrentSource] = useState(0);

  const videoSources = [
    '/wedding-video2.mp4',
    'wedding-video2.mp4',
    './wedding-video2.mp4',
    '../wedding-video2.mp4'
  ];

  useEffect(() => {
    const video = videoRef.current;
    let loadingTimeout;

    const handleError = (e) => {
      console.error('Video error:', e);
      const videoError = video.error;
      if (videoError) {
        console.error('Error code:', videoError.code);
        console.error('Error message:', videoError.message);
        
        // Try next source if available
        if (currentSource < videoSources.length - 1) {
          console.log('Trying next video source...');
          setCurrentSource(prev => prev + 1);
        } else {
          setError(`Video error: ${videoError.message || 'Unknown error'}`);
          setIsLoading(false);
        }
      }
    };

    const handleLoadStart = () => {
      console.log('Video loading started');
      setLoadingProgress(0);
      setIsLoading(true);
    };

    const handleProgress = (e) => {
      if (video.buffered.length > 0) {
        const progress = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
        console.log('Loading progress:', progress.toFixed(2) + '%');
        setLoadingProgress(progress);
      }
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      setIsLoading(false);
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      console.log('Video duration:', video.duration);
      console.log('Video ready state:', video.readyState);
      console.log('Video network state:', video.networkState);
      console.log('Video current source:', video.currentSrc);
    };

    const handleLoadedData = () => {
      console.log('Video data loaded');
      setIsLoading(false);
    };

    const handleStalled = () => {
      console.log('Video stalled');
      setIsLoading(true);
    };

    const handleWaiting = () => {
      console.log('Video waiting for data');
      setIsLoading(true);
    };

    const playVideo = async () => {
      try {
        console.log('Attempting to play video...');
        console.log('Video ready state before play:', video.readyState);
        console.log('Video network state before play:', video.networkState);
        
        // First try to play with sound
        await video.play();
        console.log('Video playing successfully with sound');
        setIsPlaying(true);
      } catch (error) {
        console.log('Initial play failed, trying muted:', error);
        // If that fails, try muted
        video.muted = true;
        try {
          await video.play();
          console.log('Video playing successfully muted');
          setIsPlaying(true);
          // Once playing, try to unmute
          video.muted = false;
          console.log('Attempting to unmute video');
        } catch (e) {
          console.error('Autoplay failed completely:', e);
          setError('Failed to play video: ' + e.message);
        }
      }
    };

    // Add event listeners
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);

    // Set a timeout to detect if loading takes too long
    loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.error('Video loading timeout');
        if (currentSource < videoSources.length - 1) {
          console.log('Trying next video source due to timeout...');
          setCurrentSource(prev => prev + 1);
        } else {
          setError('Video loading timeout. Please try refreshing the page.');
          setIsLoading(false);
        }
      }
    }, 10000); // 10 seconds timeout

    // Try to play when the video is loaded
    if (video.readyState >= 2) {
      console.log('Video already loaded, attempting to play');
      playVideo();
    } else {
      console.log('Waiting for video to load...');
      video.addEventListener('loadeddata', playVideo);
    }

    return () => {
      clearTimeout(loadingTimeout);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, [currentSource]);

  const handleVideoEnd = () => {
    console.log('Video ended');
    onComplete();
  };

  const handlePlay = () => {
    console.log('Video started playing');
    setIsPlaying(true);
  };

  return (
    <VideoContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && (
        <ErrorMessage>
          {loadingProgress > 0 
            ? `Loading video: ${loadingProgress.toFixed(0)}%`
            : 'Loading video...'}
        </ErrorMessage>
      )}
      <StyledVideo
        ref={videoRef}
        onEnded={handleVideoEnd}
        onPlay={handlePlay}
        controls={false}
        autoPlay
        playsInline
        muted={false}
        disablePictureInPicture
        controlsList="nodownload noremoteplayback nofullscreen noplaybackrate"
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={videoSources[currentSource]} type="video/mp4" />
        Browserul dvs. nu suportă tag-ul video.
      </StyledVideo>
    </VideoContainer>
  );
};

export default Video; 