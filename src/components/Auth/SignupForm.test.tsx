import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  //  waitFor
} from "@testing-library/react";
import SignupForm from "./SignupForm";
import * as validationSchemas from "../../utils/validationSchemas";

// Mock the entire module at the top level
vi.mock("../../utils/validationSchemas", () => ({
  signupSchema: {
    validate: vi.fn().mockReturnValue({ error: null }),
  },
}));

describe("SignupForm", () => {
  const mockSubmit = vi.fn();
  const defaultProps = {
    onSubmit: mockSubmit,
    loading: false,
    error: null,
  };
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset the mock implementation
    //@ts-expect-error mock
    (validationSchemas.signupSchema.validate as vi.Mock).mockReturnValue({
      error: null,
    });
  });

  it("renders the form with all fields", () => {
    render(<SignupForm {...defaultProps} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    const errorMessage = "Registration failed";
    render(<SignupForm {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass("text-red-500");
  });

  it("shows loading state on button when loading is true", () => {
    render(<SignupForm {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: /signing up/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("toggles password visibility when show/hide button is clicked", async () => {
    render(<SignupForm {...defaultProps} />);
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show/i });

    // Password should be hidden by default
    expect(passwordInput.type).toBe("password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    expect(toggleButton).toHaveTextContent(/hide/i);

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
    expect(toggleButton).toHaveTextContent(/show/i);
  });

  // it("submits the form with valid data", async () => {
  //   render(<SignupForm {...defaultProps} />);

  //   // Fill out the form
  //   fireEvent.change(screen.getByLabelText("Name"), {
  //     target: { value: "John Doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Password"), {
  //     target: { value: "password123" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Confirm Password"), {
  //     target: { value: "password123" },
  //   });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   await waitFor(() => {
  //     expect(mockSubmit).toHaveBeenCalledTimes(1);
  //     expect(mockSubmit).toHaveBeenCalledWith({
  //       name: "John Doe",
  //       email: "test@example.com",
  //       password: "password123",
  //       confirmPassword: "password123",
  //     });
  //   });
  // });

  // it("shows validation errors when validation fails", async () => {
  //   // Mock validation to fail
  //   (validationSchemas.signupSchema.validate as vi.Mock).mockReturnValue({
  //     error: {
  //       details: [
  //         { message: "Name is required", path: ["name"] },
  //         {
  //           message: "Password must be at least 8 characters",
  //           path: ["password"],
  //         },
  //       ],
  //     },
  //   });

  //   render(<SignupForm {...defaultProps} />);

  //   // Submit the form without filling anything
  //   fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText("Name is required")).toBeInTheDocument();
  //     expect(
  //       screen.getByText("Password must be at least 8 characters")
  //     ).toBeInTheDocument();
  //   });
  // });

  // it("shows password mismatch error when passwords do not match", async () => {
  //   // Mock validation to fail for password mismatch
  //   (validationSchemas.signupSchema.validate as vi.Mock).mockReturnValue({
  //     error: {
  //       details: [
  //         { message: "Passwords must match", path: ["confirmPassword"] },
  //       ],
  //     },
  //   });

  //   render(<SignupForm {...defaultProps} />);

  //   // Fill with mismatched passwords
  //   fireEvent.change(screen.getByLabelText("Password"), {
  //     target: { value: "password123" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Confirm Password"), {
  //     target: { value: "different" },
  //   });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText("Passwords must match")).toBeInTheDocument();
  //   });
  // });
});
