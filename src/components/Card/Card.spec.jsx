import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import imagePlaceholder from "../assets/image-placeholder.png";

describe("Card", () => {
  const imageUrl = "https://example.com/image.jpg";
  const artistName = "John Doe";
  const title = "Artwork Title";

  it("renders the card with correct image, artist name, and title", () => {
    const { getByTestId, getByText } = render(
      <Card imageUrl={imageUrl} artistName={artistName} title={title} />
    );

    const cardElement = getByTestId("card-item");
    const cardImage = cardElement.style.backgroundImage;
    const cardTitle = getByText(title);
    const cardArtistName = getByText(artistName);

    expect(cardElement).toBeInTheDocument();
    expect(cardImage).toBe(`url(${imageUrl})`);
    expect(cardTitle).toBeInTheDocument();
    expect(cardArtistName).toBeInTheDocument();
  });

  // it("renders a placeholder image if imageUrl prop is an empty string", () => {
  //   const { getByTestId } = render(
  //     <Card imageUrl="" artistName={artistName} title={title} />
  //   );

  //   const cardElement = getByTestId("card-item");
  //   const cardImage = cardElement.style.backgroundImage;

  //   expect(cardElement).toBeInTheDocument();
  //   expect(cardImage).toBe(`url(${imagePlaceholder})`);
  // });

  it("renders 'Untitled' if title prop is an empty string", () => {
    const { getByTestId, getByText } = render(
      <Card imageUrl={imageUrl} artistName={artistName} title="" />
    );

    const cardElement = getByTestId("card-item");
    const cardTitle = getByText("Untitled");

    expect(cardElement).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
  });

  it("renders 'Unknown Artist' if artistName prop is an empty string", () => {
    const { getByTestId, getByText } = render(
      <Card imageUrl={imageUrl} artistName="" title={title} />
    );

    const cardElement = getByTestId("card-item");
    const cardArtistName = getByText("Unknown Artist");

    expect(cardElement).toBeInTheDocument();
    expect(cardArtistName).toBeInTheDocument();
  });
});
