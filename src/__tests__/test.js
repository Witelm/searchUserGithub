import { render, screen } from "@testing-library/react";
import Search from "../pages/Search";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;

jest.mock("../api/ApiGithub", () => ({
  useSearchUsersApiAscQuery: jest.fn(),
  useSearchUsersApiDescQuery: jest.fn(),
  useGetByIdQuery: jest.fn(),
}));

describe("<Search/>", () => {
  it('should render "Поиск..." correctly', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const searchButton = screen.getByText("Поиск...");
    expect(searchButton).toBeInTheDocument();
  });
  it("should be disabled Prev by default", () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });
});
