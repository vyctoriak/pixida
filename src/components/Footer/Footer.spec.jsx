import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the footer text correctly", () => {
    render(<Footer />);

    const footerText = screen.getByText("Art API");

    expect(footerText).toBeInTheDocument();
  });
});
