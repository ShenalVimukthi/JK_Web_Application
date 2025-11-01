import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(creds);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Login failed : ',err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          className="input mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          className="input mb-6"
          required
        />
        <button type="submit" className="btn-primary w-full">Login</button>
        <p className="mt-4 text-sm text-gray-600">
          Use: <strong>admin@org.com</strong> / <strong>admin123</strong>
        </p>
      </form>
    </div>
  );
}