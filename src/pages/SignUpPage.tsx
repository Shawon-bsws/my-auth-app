// SignupPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignupForm from "../components/Auth/SignupForm";

const SignupPage: React.FC = () => {
  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await handleSignup(data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <SignupForm onSubmit={onSubmit} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default SignupPage;
