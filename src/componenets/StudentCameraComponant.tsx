import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Your backend server

interface StudentCameraComponentProps {
  studentId: string;
}

interface CameraCommand {
  status: 'active' | 'inactive';
}

export default function StudentCameraComponent({ studentId }: StudentCameraComponentProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraOn, setCameraOn] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('register-student', studentId);

    // Listen for toggle commands
    socket.on('camera-command', ({ status }: CameraCommand) => {
      if (status === 'active') {
        startCamera();
      } else if (status === 'inactive') {
        stopCamera();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [studentId]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      console.error('Camera access denied', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setCameraOn(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <p>Camera is {cameraOn ? 'ON' : 'OFF'}</p>
    </div>
  );
}