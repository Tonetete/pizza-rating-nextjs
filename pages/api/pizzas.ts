import { SERVER_URL, callApi } from "./config";
import { NextApiRequest, NextApiResponse } from "next";

export interface PizzaResponse {
  id: number;
  title: string;
  image: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pizzaId },
  } = req;
  let response: PizzaResponse[];

  response = await callApi(
    `${SERVER_URL}/pizzas${pizzaId ? `/${pizzaId}` : ""}`,
    {
      method: "GET",
    }
  );

  return response.length
    ? res.status(200).json({ response })
    : res.status(404).json({ response: "Not Found" });
};
