// frontend/pages/auth/login.tsx
import { useState, useEffect } from 'react';
import api from '@/utils/axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      router.push('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;