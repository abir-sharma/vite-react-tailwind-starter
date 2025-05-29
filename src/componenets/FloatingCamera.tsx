import React, { useRef, useState, useEffect } from 'react';

const FloatingCamera = ({
  blur,
  onClose,
  setAnswerSubmittedSuccessfully
}: {
  blur: boolean;
  onClose: () => void;
  setAnswerSubmittedSuccessfully: (value: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error('Failed to open webcam:', err);
      }
    };

    initCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  const generateUUID = (): string => {
    // Returns a random UUID (version 4)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = Math.random() * 16 | 0;
      const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
      return value.toString(16);
    });
  };
  const uuid = generateUUID()
  // ✅ Function to capture image and log it
  //   const captureImage = () => {
  //   try {
  //     const video = videoRef.current;
  //     if (!video) {
  //       console.error('Video element not found.');
  //       // alert('❌ Failed to capture: Video not available.');
  //       setAnswerSubmittedSuccessfully(false)
  //       return;
  //     }

  //     // Ensure video is ready
  //     if (video.videoWidth === 0 || video.videoHeight === 0) {
  //       console.error('Video not ready or dimensions are zero.');
  //       // alert('❌ Failed to capture: Video not ready.');
  //       setAnswerSubmittedSuccessfully(false)
  //       return;
  //     }

  //     const canvas = document.createElement('canvas');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) {
  //       console.error('Could not get canvas context.');
  //       // alert('❌ Failed to capture: Cannot draw to canvas.');
  //       setAnswerSubmittedSuccessfully(false)
  //       return;
  //     }

  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     const dataURL = canvas.toDataURL('image/png');

  //     if (dataURL && dataURL.startsWith('data:image/png')) {
  //       console.log('📸 Captured Image Data URL:', dataURL);
  //       // alert('✅ Image captured successfully!');
  //       setAnswerSubmittedSuccessfully(true)
  //     } else {
  //       console.error('Invalid image data.');
  //       // alert('❌ Failed to capture: Invalid image data.');
  //       setAnswerSubmittedSuccessfully(false)
  //     }
  //   } catch (error) {
  //     console.error('Error capturing image:', error);
  //     // alert('❌ Failed to capture image due to unexpected error.');
  //     setAnswerSubmittedSuccessfully(false)
  //   }
  // };

  const userData = localStorage.getItem('userData');
  const studentName = userData ? JSON.parse(userData).name : '';





  const captureImage = async () => {
    try {
      const video = videoRef.current;
      if (!video) {
        console.error('Video element not found.');
        setAnswerSubmittedSuccessfully(false);
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Video not ready or dimensions are zero.');
        alert('❌ Failed to capture: Video not ready.');
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get canvas context.');
        alert('❌ Failed to capture: Cannot draw to canvas.');
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      const base64 = dataURL.split(',')[1]; // remove "data:image/png;base64,"

      // 🔐 Replace YOUR_API_KEY with your ImgBB key
      const apiKey = "ee9ffc3e024b37f73ebcdd7d3de1fc92";

      const formData = new FormData();
      formData.append("image", base64);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        console.log("✅ Uploaded Image URL:", result.data.url);
        alert("✅ Image uploaded successfully!");
      } else {
        console.error("❌ Upload failed:", result);
        alert("❌ Image upload failed.");
      }
    } catch (error) {
      console.error('Error capturing or uploading image:', error);
      alert('❌ Failed to capture/upload image.');
    }
  };



  return (
    <div style={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          ...styles.video,
          filter: blur ? 'blur(6px)' : 'none',
        }}
      />
      <p style={styles.closeButton} onClick={onClose}>{studentName}</p>
      <button style={styles.captureButton} onClick={captureImage}>📸</button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    bottom: 100,
    right: 20,
    width: 200,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 1000,
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  closeButton: {
    position: 'absolute',
    left: 2,
    font: '1',
    bottom: 2,
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    color: 'white',
    fontSize: 10,
    padding: '2px 6px',
    cursor: 'pointer',
    borderRadius: 4,
  },
  captureButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: 4,
    padding: '2px 6px',
    fontSize: 12,
    cursor: 'pointer',
    zIndex: 1001,
  },
};

export default FloatingCamera;
