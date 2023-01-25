import { screen, render } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

let renderComponent = (signedIn = false) => {
  render(
    <MemoryRouter>
      <Login loggedIn={signedIn} />
    </MemoryRouter>
  );
};

test("username field is shown", () => {
  renderComponent();
  let usernameField = screen.getByRole("textbox", { name: /username/i });
  expect(usernameField).toBeInTheDocument();
});

test("password field is shown", () => {
  renderComponent();
  let passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
});

test("sign in Button is shown", () => {
  renderComponent();
  let signInButton = screen.getByRole("button", { name: /sign in/i });
  expect(signInButton).toBeInTheDocument();
});

test("link to register is shown", () => {
  renderComponent();
  let linkToRegister = screen.getByRole("link", { name: /here/i });
  expect(linkToRegister).toHaveAttribute("href", "/register");
});

test("Continue as guest is shown", () => {
  renderComponent();
  let asGuestButton = screen.getByRole("button", {
    name: /continue as guest/i,
  });
  expect(asGuestButton).toBeInTheDocument();
});
