export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
