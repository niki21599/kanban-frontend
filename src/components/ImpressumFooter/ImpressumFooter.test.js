import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ImpressumFooter from "./ImpressumFooter";

let renderComponent = () => {
  render(
    <MemoryRouter>
      <ImpressumFooter />
    </MemoryRouter>
  );
};

test("shows link to impressum", () => {
  renderComponent();
  let impressumLink = screen.getByText(/impressum/i);
  expect(impressumLink).toHaveAttribute("href", "/impressum");
});

test("shows link to datenschutz", () => {
  renderComponent();
  let datenschutzLink = screen.getByText(/datenschutz/i);
  expect(datenschutzLink).toHaveAttribute("href", "/datenschutz");
});
