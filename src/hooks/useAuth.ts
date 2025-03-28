import { useState } from "react";
import { signup, login, getCurrentUser } from "../services/authService";
import { SignupData, LoginData } from "../types/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signup(data);
      setLoading(false);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      setLoading(false);
      throw err;
    }
  };

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await login(data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const getCurrentAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const user = await getCurrentUser(token);
      return user;
    } catch (err: any) {
      handleLogout();
      return null;
    }
  };

  return {
    loading,
    error,
    handleSignup,
    handleLogin,
    handleLogout,
    getCurrentAuthUser,
  };
};
