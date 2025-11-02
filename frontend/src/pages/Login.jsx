import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { checkAuth } from '../../../backend/utils/auth';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(creds);

      // STEP 1: Save token FIRST
      localStorage.setItem('token', res.data.token);

      // STEP 2: Add expiry (1 hour)
      localStorage.setItem('tokenExpiry', Date.now() + 60 * 60 * 1000);

      toast.success('Login successful!');

      checkAuth();

      window.dispatchEvent(new Event('localstorage-updated'));

      // STEP 3: Now navigate
      navigate('/dashboard', { replace: true });

    } catch (err) {
      toast.error('Login failed: Invalid credentials',err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white border rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Admin Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:border-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:border-indigo-500"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Use: <strong>admin@org.com</strong> / <strong>admin123</strong>
        </p>
      </form>
    </div>
  );
}



// import { useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/api';
// import { toast } from 'react-toastify';

// export default function Login() {
//   const [creds, setCreds] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(creds);
//       navigate('/dashboard');
//       localStorage.setItem('token', res.data.token);    
//     } catch (err) {
//       toast.error('Login failed : ',err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg w-96">
//         <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={creds.email}
//           onChange={(e) => setCreds({ ...creds, email: e.target.value })}
//           className="input mb-4"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={creds.password}
//           onChange={(e) => setCreds({ ...creds, password: e.target.value })}
//           className="input mb-6"
//           required
//         />
//         <button type="submit" className="btn-primary w-full">Login</button>
//         <p className="mt-4 text-sm text-gray-600">
//           Use: <strong>admin@org.com</strong> / <strong>admin123</strong>
//         </p>
//       </form>
//     </div>
//   );
// }