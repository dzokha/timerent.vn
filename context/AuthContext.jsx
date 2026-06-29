import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Kiểm tra session hiện tại khi user vừa vào web
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Lắng nghe các sự kiện thay đổi trạng thái (Đăng nhập, đăng xuất, đổi pass...)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Hàm Đăng ký
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Dữ liệu này sẽ được trigger Postgres ở bài trước bắt lấy để lưu vào bảng profiles
        data: { full_name: fullName } 
      }
    });
    if (error) throw error;
    return data;
  };

  // Hàm Đăng nhập
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  // Hàm Đăng xuất
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng Auth nhanh ở các file khác
export const useAuth = () => useContext(AuthContext);