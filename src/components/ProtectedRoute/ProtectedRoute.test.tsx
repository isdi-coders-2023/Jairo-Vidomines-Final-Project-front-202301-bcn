import { screen } from "@testing-library/react";
import { useAppSelector } from "../../store/hooks";
import ProtectedRoute from "./ProtectedRoute";
import renderWithProviders from "../../testUtils/renderWithProviders";

jest.mock("../../store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

describe("Given a ProtectedRoute component", () => {
  describe("When it is rendered and have a token", () => {
    test("Then it should show the react element received by props", () => {
      (useAppSelector as jest.Mock).mockReturnValueOnce({
        token: "Jairo1p2o3i4u5y",
      });
      const element = <div>protected route</div>;

      renderWithProviders(<ProtectedRoute element={element} />);

      const result = screen.getByText("Protected route");

      expect(result).toBeInTheDocument();
    });
  });
});
