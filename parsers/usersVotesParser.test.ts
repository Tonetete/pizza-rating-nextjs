import { UserResponse } from "../pages/api/users";
import { VoteResponse } from "../pages/api/votes";
import { parseUsersVotesResponse } from "./usersVotesParser";

const votesResponse: VoteResponse[] = [
  {
    pizzaId: 1,
    userId: 1,
    votes: 2,
    id: 1,
  },
  {
    pizzaId: 1,
    userId: 2,
    votes: 2,
    id: 2,
  },
  {
    pizzaId: 2,
    userId: 1,
    votes: 2,
    id: 3,
  },
  {
    pizzaId: 2,
    userId: 2,
    votes: 21,
    id: 4,
  },
];

const usersResponse: UserResponse[] = [
  {
    id: 1,
    name: "Antonio",
    username: "antonio",
    password: "1234",
  },
  {
    id: 2,
    name: "David",
    username: "david",
    password: "1234",
  },
];

describe("Pizza Parser Unit Test", () => {
  it("WHEN call parsePizzaResponse function THEN should merge votes result with pizza result", async () => {
    const result = parseUsersVotesResponse({ votesResponse, usersResponse });

    expect(result.labels).toEqual(["David", "Antonio"]);
    expect(result.values).toEqual([23, 4]);
  });
});
