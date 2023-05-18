import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("SearchBar", () => {
  it("renders without errors", () => {
    const onSearchMock = jest.fn();
    render(
      <Router>
        <SearchBar onSearch={onSearchMock} />
      </Router>
    );
  });

  it("calls onSearch function with search query on button click", () => {
    const onSearchMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <Router>
        <SearchBar onSearch={onSearchMock} />
      </Router>
    );
    const searchInput = getByLabelText("Search");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "test query" } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith("test query");
  });

  it("updates searchQuery state on input change", () => {
    const onSearchMock = jest.fn();
    const { getByLabelText } = render(
      <Router>
        <SearchBar onSearch={onSearchMock} />
      </Router>
    );
    const searchInput = getByLabelText("Search");

    fireEvent.change(searchInput, { target: { value: "test query" } });

    expect(searchInput.value).toBe("test query");
  });
});
