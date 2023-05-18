import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { act } from "react-dom/test-utils";

import Art from "./Art";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Art", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "123" });
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          artObject: {
            webImage: { url: "https://example.com/art.jpg" },
            longTitle: "Artwork Title",
            principalMaker: "John Doe",
            objectTypes: ["Painting"],
            dimensions: [
              { type: "height", value: "100" },
              { type: "width", value: "80" },
              { type: "depth", value: "5" },
            ],
            label: { description: "Artwork description" },
          },
        }),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  it("renders the loading spinner while fetching art data", async () => {
    render(
      <MemoryRouter initialEntries={["/art/123"]}>
        <Routes>
          <Route path="/art/:id" element={<Art />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
  });

  it("loading spinner is no longer on the screen after fetching art data", async () => {
    render(
      <MemoryRouter initialEntries={["/art/123"]}>
        <Routes>
          <Route path="/art/:id" element={<Art />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
  });

  it("art data is being displayed after successful fetch", async () => {
    render(
      <MemoryRouter initialEntries={["/art/123"]}>
        <Routes>
          <Route path="/art/:id" element={<Art />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );

    const artworkTitleElements = screen.queryAllByText("Artwork Title");
    expect(artworkTitleElements[1]).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Painting")).toBeInTheDocument();
    expect(
      screen.getByText("height 100cm x width 80cm x depth 5cm")
    ).toBeInTheDocument();
    expect(screen.getByText("Artwork description")).toBeInTheDocument();
  });

  it("displays an error message if an error occurs during fetching", async () => {
    const errorMessage = "Error occurred: Network error";
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter initialEntries={["/art/123"]}>
        <Routes>
          <Route path="/art/:id" element={<Art />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
