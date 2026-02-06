import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a0f2e',
            border: '1px solid rgba(176, 38, 255, 0.3)',
            color: '#ffffff',
          },
        }}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
