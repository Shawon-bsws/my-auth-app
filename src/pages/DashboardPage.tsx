// DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "../components/Dashboard";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { handleLogout, getCurrentAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentAuthUser();
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    };

    fetchUser();
  }, [getCurrentAuthUser, navigate]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Dashboard user={user} onLogout={handleLogoutClick} />
    </div>
  );
};

export default DashboardPage;
