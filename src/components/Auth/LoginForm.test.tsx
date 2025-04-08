import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  const mockSubmit = vi.fn();
  const defaultProps = {
    onSubmit: mockSubmit,
    loading: false,
    error: null,
  };

  //@ts-expect-error mock
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("renders the form with email and password fields", () => {
    render(<LoginForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", { name: "Log In" });

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error for invalid email format", async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    render(<LoginForm {...defaultProps} />);

    const testData = {
      email: "test@example.com",
      password: "password123",
    };

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: testData.email },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: testData.password },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(testData);
    });
  });

  it("shows loading state when submitting", () => {
    render(<LoginForm {...defaultProps} loading={true} />);

    const submitButton = screen.getByRole("button", { name: "Logging in..." });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("displays server error when error prop is provided", () => {
    const errorMessage = "Invalid credentials";
    render(<LoginForm {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(<LoginForm {...defaultProps} />);

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: "Show" });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    expect(toggleButton.textContent).toBe("Hide");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
    expect(toggleButton.textContent).toBe("Show");
  });

  it("shows password validation error when password is too short", async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "short" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => {
      expect(
        screen.getByText((text) =>
          text
            .toLowerCase()
            .includes("password must be at least 8 characters long")
        )
      ).toBeInTheDocument();
    });
  });
});
