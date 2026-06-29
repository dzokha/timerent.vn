import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

// Component bảo vệ Route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Trang chủ tạm thời sau khi đăng nhập thành công
const Home = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Đăng nhập thành công! 🎉</h1>
        <p className="text-gray-600 mb-6 text-sm">Email của bạn: <span className="font-semibold">{user?.email}</span></p>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium transition-all"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route công khai */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route bảo mật - Chỉ cho phép người dùng đã đăng nhập */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;