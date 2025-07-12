import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/Aminlogin/AdminLogin';
import UserLoginPage from "./components/Login/Login";
 import Dashboard from './components/Dashboard/DashBoard';
 import Homepage from "./components/Homepage/Homepage";  

const App = () => {
  return (
    <Router>
      <Routes>
        
        {/* User Login Page */}
        <Route path="/login" element={<UserLoginPage />} />

        {/* Admin Login Page */}
        <Route path="/admin-login" element={<LoginPage />} />
       
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />
       


<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
