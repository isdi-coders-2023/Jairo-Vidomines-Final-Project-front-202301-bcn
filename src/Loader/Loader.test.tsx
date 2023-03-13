import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils/renderWithProviders";
import Loader from "./Loader";

describe("Given a Loader component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an aria-label with text: 'Page loading'", () => {
      const expectText = "Page loading";

      renderWithProviders(<Loader />);

      const result = screen.getByLabelText(expectText);

      expect(result).toBeInTheDocument();
    });
  });
});
