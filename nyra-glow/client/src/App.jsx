import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BookingPage from './pages/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/book/:serviceId?" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
            </Routes>
            <WhatsAppButton />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: '#162015',
                  color: '#E8F0E6',
                  border: '1px solid rgba(125,155,118,0.3)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                },
                success: { iconTheme: { primary: '#7D9B76', secondary: '#162015' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#162015' } },
              }}
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
