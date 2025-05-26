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

  useEffect(() => {
    const video = videoRef.current;
    
    const handleError = (e) => {
      console.error('Video error:', e);
      const videoError = video.error;
      if (videoError) {
        console.error('Error code:', videoError.code);
        console.error('Error message:', videoError.message);
        setError(`Video error: ${videoError.message || 'Unknown error'}`);
      }
    };

    const handleLoadStart = () => {
      console.log('Video loading started');
    };

    const handleCanPlay = () => {
      console.log('Video can play');
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      console.log('Video duration:', video.duration);
      console.log('Video ready state:', video.readyState);
    };

    const playVideo = async () => {
      try {
        console.log('Attempting to play video...');
        // First try to play with sound
        await video.play();
        console.log('Video playing successfully with sound');
      } catch (error) {
        console.log('Initial play failed, trying muted:', error);
        // If that fails, try muted
        video.muted = true;
        try {
          await video.play();
          console.log('Video playing successfully muted');
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
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Try to play when the video is loaded
    if (video.readyState >= 2) {
      console.log('Video already loaded, attempting to play');
      playVideo();
    } else {
      console.log('Waiting for video to load...');
      video.addEventListener('loadeddata', playVideo);
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

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
      >
        <source src="wedding-video.mp4" type="video/mp4" />
        Browserul dvs. nu suportă tag-ul video.
      </StyledVideo>
    </VideoContainer>
  );
};

export default Video; 