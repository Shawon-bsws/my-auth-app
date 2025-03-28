// mockApi.ts
import { SignupData, LoginData, User } from "../types/types";

// Mock user database
const mockUsers: User[] = [];

// Helper function to simulate network delay
const simulateNetworkDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 300));

export const signup = async (data: SignupData): Promise<User> => {
  await simulateNetworkDelay();

  // Check if user already exists
  if (mockUsers.some((user) => user.email === data.email)) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: String(mockUsers.length + 1),
    name: data.name,
    email: data.email,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);
  localStorage.setItem("user", JSON.stringify(newUser));

  // Generate a mock token
  const mockToken = `mock-token-${Math.random().toString(36).substring(2)}`;
  localStorage.setItem("token", mockToken);

  return newUser;
};

export const login = async (
  data: LoginData
): Promise<{ user: User; token: string }> => {
  await simulateNetworkDelay();

  const user = mockUsers.find((u) => u.email === data.email);
  if (!user) {
    throw new Error("User not found");
  }

  // In a real app, you would verify the password here
  // For mock purposes, we'll just check if it's not empty
  if (!data.password) {
    throw new Error("Invalid password");
  }

  localStorage.setItem("user", JSON.stringify(user));

  // Generate a mock token
  const mockToken = `mock-token-${Math.random().toString(36).substring(2)}`;
  localStorage.setItem("token", mockToken);

  return { user, token: mockToken };
};

export const getCurrentUser = async (token: string): Promise<User> => {
  await simulateNetworkDelay();

  if (!token.startsWith("mock-token-")) {
    throw new Error("Invalid token");
  }

  const userJson = localStorage.getItem("user");
  if (!userJson) {
    throw new Error("User not found");
  }

  return JSON.parse(userJson);
};
