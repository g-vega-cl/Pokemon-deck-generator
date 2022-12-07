import { render, screen, within } from "@testing-library/react";
import React from "react";
import { IDeckCard } from "../../models/pokemon";
import {DeckCardCard} from "../DeckCard";

const mockDeckCard: IDeckCard = {
    Id: "test-id",
	Name: "Charizard-test-deck",
	Image: "http://Image.png",
	Type: "Fire"
}

describe("DeckCard tests", () => {
  it("should render DeckCard", () => {
    render(<DeckCardCard deckCard={mockDeckCard} handleClick={jest.fn()} />);
  });

  it("DeckCard components should be in document", () => {
    render(<DeckCardCard deckCard={mockDeckCard} handleClick={jest.fn()} />);
    const DeckCardTag = screen.getByTestId("DeckCard-CardTag");
    const DeckCardName = screen.getByText('Charizard-test-deck');
    const DeckCardType = screen.getByText('Fire');
    expect(DeckCardTag).toBeInTheDocument();
    expect(DeckCardName).toBeInTheDocument();
    expect(DeckCardType).toBeInTheDocument();
  });
});
