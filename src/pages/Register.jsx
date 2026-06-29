// src/pages/Register.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signUp(email, password, fullName); 
      alert('Đăng ký thành công! Hãy kiểm tra email để xác thực (nếu có).');
      navigate('/login');
    } catch (err) {
      // 1. In toàn bộ lỗi ra màn hình Console để developer đọc
      console.error("Chi tiết lỗi từ Supabase:", err);
      
      // 2. Xử lý logic hiển thị lỗi trên UI
      let errorMsg = 'Có lỗi xảy ra từ máy chủ. Vui lòng nhấn F12 kiểm tra Console.';
      if (err?.message && err.message !== '{}') {
        errorMsg = err.message;
      }
      setError(errorMsg); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-12 p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <div>
          {/* Placeholder cho Logo */}
          <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-50 shadow-inner">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-950 tracking-tighter">
            Tạo tài khoản <span className="text-indigo-600">timerent</span>
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600">
            Dễ dàng cho thuê thời gian của bạn
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-2xl text-sm text-red-900 flex items-start gap-4 shadow-inner">
            <svg className="w-6 h-6 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div>
              <p className="font-semibold">Lỗi đăng ký!</p>
              <p className="font-normal text-red-800 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-2xl shadow-sm -space-y-px border border-gray-200 overflow-hidden">
            <div>
              <label htmlFor="full-name" className="sr-only">Họ và tên</label>
              <input
                id="full-name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-5 py-4 border-b border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:z-10 sm:text-sm transition-all"
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-5 py-4 border-b border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:z-10 sm:text-sm transition-all"
                placeholder="vua-thue@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-5 py-4 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:z-10 sm:text-sm transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl transform hover:-translate-y-px"
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
            </button>
          </div>
        </form>

        <p className="mt-12 text-center text-sm text-gray-700">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}