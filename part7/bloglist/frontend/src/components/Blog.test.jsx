import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Test Author",
  url: "www.testurl.com",
  likes: 5,
  user: "Test User",
};

const updateLikes = () => {
  const updatedBlog = "updated blog";
};

const removeBlog = () => {
  const removedBlog = "removed blog";
};

const user = {
  username: "Test User",
};

test("renders content", () => {
  render(
    <Blog
      blog={blog}
      updateLikes={updateLikes}
      removeBlog={removeBlog}
      user={user}
    ></Blog>,
  );

  screen.getByText(
    "Component testing is done with react-testing-library Test Author",
  );
});

test("clicking view button shows url and likes", async () => {
  render(
    <Blog
      blog={blog}
      updateLikes={updateLikes}
      removeBlog={removeBlog}
      user={user}
    ></Blog>,
  );
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  screen.getByText("www.testurl.com");
  screen.getByText("likes 5");
});

test("clicking like button twice calls event handler twice", async () => {
  const mockHandler = jest.fn();

  render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      removeBlog={removeBlog}
      user={user}
    ></Blog>,
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByTestId("like-button");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
