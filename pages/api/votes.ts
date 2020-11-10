import { SERVER_URL, callApi } from "./config";
import { CLIENT_URL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

export interface VoteResponse {
  id: number;
  pizzaId: number;
  userId: number;
  votes: number;
}

export const votePizza = async ({
  pizzaId,
  userId,
  setUpdateData,
}: {
  pizzaId: number;
  userId: number;
  setUpdateData: (flag: boolean) => void;
}) => {
  if (!isNaN(userId)) {
    let votes = 0;
    const userVotesForPizza = await fetch(
      `${CLIENT_URL}/api/votes?pizzaId=${pizzaId}&userId=${userId}`
    );
    const resultUserVotesForPizza = await userVotesForPizza.json();

    if (resultUserVotesForPizza.response.length) {
      votes = resultUserVotesForPizza.response[0].votes;
    }

    const result = await fetch(
      `${CLIENT_URL}/api/votes?pizzaId=${pizzaId}&userId=${userId}&votes=${
        votes + 1
      }`,
      {
        method: "PUT",
      }
    );

    if (result.status === 200) {
      setUpdateData(true);
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pizzaId, userId, votes },
  } = req;
  let response: VoteResponse[];

  const queryParams = queryString.stringify({ pizzaId, userId });

  if (req.method === "PUT") {
    response = await callApi(
      `${SERVER_URL}/votes${queryParams ? `?${queryParams}` : ``}`,
      {
        method: "GET",
      }
    );
    const method = response.length ? "PUT" : "POST";
    response = await callApi(
      `${SERVER_URL}/votes/${method === "PUT" ? `/${response[0].id}` : ``}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pizzaId: Number(pizzaId),
          userId: Number(userId),
          votes: Number(votes),
        }),
      }
    );
    res.status(200).json({ response });
  } else {
    response = await callApi(
      `${SERVER_URL}/votes${queryParams ? `?${queryParams}` : ``}`,
      {
        method: "GET",
      }
    );
  }
  response && response.length
    ? res.status(200).json({ response })
    : res.status(404).json({ response: "Not Found" });
};

export default handler;
