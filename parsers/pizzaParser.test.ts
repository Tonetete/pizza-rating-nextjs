import { PizzaVotesResponse } from "../pages";
import { VoteResponse } from "../pages/api/votes";
import { parsePizzaResponse } from "./pizzaParser";

const pizzaResult: PizzaVotesResponse[] = [
  {
    id: 1,
    title: "4 cheeses",
    image: "/images/4cheeses.jpg",
    votes: 0,
  },
  {
    id: 2,
    title: "Barbecue",
    image: "/images/barbecue.jpg",
    votes: 0,
  },
];

const votesResult: VoteResponse[] = [
  {
    pizzaId: 1,
    userId: 1,
    votes: 2,
    id: 1,
  },
  {
    pizzaId: 2,
    userId: 2,
    votes: 2,
    id: 2,
  },
  {
    pizzaId: 2,
    userId: 2,
    votes: 2,
    id: 3,
  },
];

describe("Pizza Parser Unit Test", () => {
  it("WHEN call parsePizzaResponse function THEN should merge votes result with pizza result", async () => {
    const result = parsePizzaResponse({ pizzaResult, votesResult });

    expect(result[0].votes).toBe(2);
    expect(result[1].votes).toBe(4);
  });
});
