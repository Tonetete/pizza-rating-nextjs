import { PizzaVotesResponse } from "../pages";
import { SERVER_URL } from "../pages/api/config";
import { VoteResponse } from "../pages/api/votes";

export const parsePizzaResponse = ({
  pizzaResult,
  votesResult,
}: {
  pizzaResult: PizzaVotesResponse[];
  votesResult: VoteResponse[];
}) =>
  pizzaResult.map((item: PizzaVotesResponse) => {
    const image = `${SERVER_URL}/${item.image}`;
    const votes = votesResult
      .filter((vote: VoteResponse) => vote.pizzaId === item.id)
      .reduce((prev: number, curr: VoteResponse) => {
        return prev + curr.votes;
      }, 0);
    return { ...item, image, votes };
  });
