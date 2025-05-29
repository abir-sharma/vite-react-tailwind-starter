import React, { useState, useRef } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
import FloatingCamera from './FloatingCamera';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Video 1',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Video 2',
    thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
  },
  {
    id: 3,
    title: 'Video 3',
    thumbnailUrl: 'https://img.youtube.com/vi/tVj0ZTS4WF4/hqdefault.jpg',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  },
];

const VideoPlayerScreen: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const notify = () => toast("Wow so easy!");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const [showCam, setShowCam] = useState(false);
  const [blur, setBlur] = useState(false);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setLiked(false);
    setSaved(false);
    // Auto play new video after setting it
    setTimeout(() => videoRef.current?.play(), 100);
  };

  return (
    <div className='' style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      {/* Main Video Player */}
      <video
        ref={videoRef}
        src={selectedVideo.videoUrl}
        width="100%"
        height="400"
        controls={false}
        autoPlay
        onEnded={() => setIsPlaying(false)}
        style={{ backgroundColor: '#000' }}
      />
        <ToastContainer />

      {/* Buttons */}
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 20 }}>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => setLiked(!liked)} style={{ color: liked ? 'red' : 'black' }}>
          {liked ? 'Liked ❤️' : 'Like ♡'}
        </button>
        <button onClick={() => setSaved(!saved)} style={{ color: saved ? 'green' : 'black' }}>
          {saved ? 'Saved ✔️' : 'Save'}
        </button>
      </div>

      {/* Video Thumbnails */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          overflowX: 'auto',
          gap: 10,
          paddingBottom: 10,
          borderBottom: '1px solid #ccc',
        }}
      >
        {videos.map((video) => (
          <div
          
            key={video.id}
            style={{
              cursor: 'pointer',
              border: selectedVideo.id === video.id ? '2px solid blue' : '2px solid transparent',
              borderRadius: 4,
              flexShrink: 0,
              width: 160,
            }}
            onClick={() => handleVideoSelect(video)}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              style={{ width: '100%', borderRadius: 4, display: 'block' }}
            />
            <p className='' style={{ textAlign: 'center', marginTop: 6 }}>{video.title}</p>
          </div>
        ))}
      </div>
      {/* {true && (
        <FloatingCamera blur={blur} onClose={() => setShowCam(false)} />
      )} */}
    </div>
  );
};

export default VideoPlayerScreen;
