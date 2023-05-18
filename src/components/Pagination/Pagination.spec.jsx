import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders without errors", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
  });

  it("calls onPageChange with previous page number when previous page is clicked", () => {
    const onPageChangeMock = jest.fn();
    const { getByAltText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const leftArrowIcon = getByAltText("left arrow icon");

    fireEvent.click(leftArrowIcon);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page number when next page is clicked", () => {
    const onPageChangeMock = jest.fn();
    const { getByAltText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const rightArrowIcon = getByAltText("right arrow icon");

    fireEvent.click(rightArrowIcon);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with correct page number when a page is clicked", () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const pageThree = getByText("3");

    fireEvent.click(pageThree);

    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
