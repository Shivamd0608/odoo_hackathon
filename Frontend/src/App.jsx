import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/AdminLogin';
import UserLoginPage from "./components/Login";
 import Dashboard from './components/DashBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route can redirect or be user login */}
        <Route path="/" element={<UserLoginPage  />} />

        {/* User Login Page */}
        <Route path="/login" element={<UserLoginPage />} />

        {/* Admin Login Page */}
        <Route path="/admin-login" element={<LoginPage />} />
       


<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
