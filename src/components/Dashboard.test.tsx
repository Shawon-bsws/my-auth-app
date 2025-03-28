import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { User } from "../types/types";

describe("Dashboard Component", () => {
  const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date().toISOString(),
  };

  const mockLogout = vi.fn();

  const renderDashboard = (
    props: Partial<React.ComponentProps<typeof Dashboard>> = {}
  ) => {
    const defaultProps = {
      user: mockUser,
      onLogout: mockLogout,
    };

    return render(<Dashboard {...defaultProps} {...props} />);
  };

  it("renders correctly with user data", () => {
    renderDashboard();

    expect(screen.getByText(`Welcome, ${mockUser.name}!`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("displays the correct user name and email", () => {
    const customUser: User = {
      id: "1",
      name: "Jane Smith",
      email: "jane.smith@test.com",
      createdAt: new Date().toISOString(),
    };

    renderDashboard({ user: customUser });

    expect(
      screen.getByText(`Welcome, ${customUser.name}!`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Email: ${customUser.email}`)).toBeInTheDocument();
  });

  it("calls the onLogout function when the logout button is clicked", () => {
    renderDashboard();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("has the correct styling classes", () => {
    renderDashboard();

    const dashboardElement = screen.getByTestId("dashboard-container");
    expect(dashboardElement).toHaveClass(
      "max-w-md",
      "mx-auto",
      "p-6",
      "bg-white",
      "rounded-md",
      "shadow-md"
    );

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveClass("text-2xl", "font-bold", "mb-4");

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toHaveClass(
      "mt-6",
      "w-full",
      "flex",
      "justify-center",
      "py-2",
      "px-4",
      "border",
      "border-transparent",
      "rounded-md",
      "shadow-sm",
      "text-sm",
      "font-medium",
      "text-white",
      "bg-red-600",
      "hover:bg-red-700"
    );
  });
});
