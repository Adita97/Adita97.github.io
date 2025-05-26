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

const Video = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    const playVideo = async () => {
      try {
        // First try to play with sound
        await video.play();
      } catch (error) {
        // If that fails, try muted
        video.muted = true;
        try {
          await video.play();
          // Once playing, try to unmute
          video.muted = false;
        } catch (e) {
          console.log('Autoplay failed:', e);
        }
      }
    };

    // Try to play when the video is loaded
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo);
    }

    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <VideoContainer>
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
        <source src="/wedding-video.mp4" type="video/mp4" />
        Browserul dvs. nu suportă tag-ul video.
      </StyledVideo>
    </VideoContainer>
  );
};

export default Video; 