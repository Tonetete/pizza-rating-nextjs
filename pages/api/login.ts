import { SERVER_URL, callApi } from "./config";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { username, password },
  } = req;
  let response = null;

  if (username && password) {
    response = await callApi(
      `${SERVER_URL}/users?username=${username}&password=${password}`,
      {
        method: "GET",
      }
    );
  }

  return response && response.length
    ? res.status(200).json({ response })
    : res.status(400).json({ response: "Bad Request" });
};
