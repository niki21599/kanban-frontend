import { screen, render } from "@testing-library/react";
import Navbar from "./Navbar";
import user from "@testing-library/user-event";

let renderComponent = (signedIn) => {
  let boards = [
    {
      pk: 1,
      fields: {
        name: "Test 1",
        created_at: "2023-01-25",
        users: [],
      },
    },
    {
      pk: 2,
      fields: {
        name: "Test 2",
        created_at: "2023-01-25",
        users: [],
      },
    },
  ];

  render(<Navbar loggedIn={signedIn} boards={boards} />);
  return boards;
};

test("shows Logout, when signed in", () => {
  renderComponent(true);
  let logout = screen.getByText(/logout/i);
  expect(logout).toBeInTheDocument();
});

test("shows menu, when signed in", () => {
  renderComponent(true);
  let menu = screen.getByLabelText("menu");
  expect(menu).toBeInTheDocument();
});

test("doesnt show Menu, when not signed in", () => {
  renderComponent(false);
  let menu = screen.queryByLabelText("menu");

  expect(menu).not.toBeInTheDocument();
});

test("doesnt show logout, when not signed in", () => {
  renderComponent(false);
  let logout = screen.queryByText(/logout/i);
  expect(logout).not.toBeInTheDocument();
});

test("shows two Boards in the drawer", () => {
  let boards = renderComponent(true);
  let menu = screen.getByLabelText("menu");
  user.click(menu);

  for (const board of boards) {
    let menuItem = screen.getByText(board.fields.name);
    expect(menuItem).toBeInTheDocument();
  }
});
