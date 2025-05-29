import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LectureDetailsScreen from './pages/LectureDetailsScreen';
import LectureScreen from './pages/LectureScreen';
import Index from './pages/Index';
import StudentResultScreen from './pages/StudentResultScreen';
import Login from './pages/Login';

function ProtectedRoute({ element }:any) {
  const userData = localStorage.getItem('userData');
  return userData ? element : <Navigate to="/login" replace />;
}

function App() {
  const userData = localStorage.getItem('userData');
  const studentName = userData ? JSON.parse(userData).name : '';
console.log(userData,"userData")
console.log(studentName,"studentName")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Index studentName={studentName} />} />} />
        <Route
          path="/lecture-details"
          element={
            <ProtectedRoute
              element={
                <LectureDetailsScreen
                  youtubeId="dQw4w9WgXcQ"
                  title="Understanding Quantum Mechanics"
                  description="This lecture covers the basics of quantum entanglement and wave-particle duality..."
                  attentivenessData={[
                    { time: '00:00', value: 80 },
                    { time: '10:00', value: 75 },
                    { time: '20:00', value: 60 },
                    { time: '30:00', value: 50 },
                    { time: '40:00', value: 90 },
                  ]}
                  notesImages={[
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcBnnpOe9WMc82W7bNypnEtT9Gsugo_ijPg&s',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcBnnpOe9WMc82W7bNypnEtT9Gsugo_ijPg&s',
                  ]}
                  solutionImages={[
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcBnnpOe9WMc82W7bNypnEtT9Gsugo_ijPg&s',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcBnnpOe9WMc82W7bNypnEtT9Gsugo_ijPg&s',
                  ]}
                />
              }
            />
          }
        />
        <Route path="/video-player/:videoId" element={<ProtectedRoute element={<LectureScreen />} />} />
        <Route path="/student-result" element={<ProtectedRoute element={<StudentResultScreen />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
