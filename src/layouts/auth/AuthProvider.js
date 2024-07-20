import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const baseUrl = "https://david-test-webapp.azurewebsites.net/api";
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        username,
        password
      });

      if (response.data) {
        setUser(response.data.username);
        setRole(response.data.role);
        setToken(response.data.token);
        // TODO: GANTI USERNAME JADI USER
        localStorage.setItem("user", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
      
        navigate("/dashboard");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logoutAction = () => {
    setUser(null);
    setRole(null)
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, role, token, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};