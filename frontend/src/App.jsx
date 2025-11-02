import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');

    const valid = token && expiry && Date.now() < parseInt(expiry);
    setIsAuth(!!valid);

    if (!valid) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
    }
  };

  // Run on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for login/logout events
  useEffect(() => {
    const handler = () => checkAuth();
    window.addEventListener('localstorage-updated', handler);
    return () => window.removeEventListener('localstorage-updated', handler);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;







// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
















