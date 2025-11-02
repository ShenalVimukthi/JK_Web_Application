import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Check if token is valid (not expired)
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !expiry) {
    return false;
  }
  
  // Token expired → cleanup and return false
  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    return false;
  }
  
  return true;
};

function App() {
  // Always check fresh authentication status
  const isAuth = isAuthenticated();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={isAuth ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuth ? <Dashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
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
















