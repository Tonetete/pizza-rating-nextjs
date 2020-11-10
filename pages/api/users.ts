import { NextApiRequest, NextApiResponse } from "next";
import { SERVER_URL, callApi } from "./config";

export interface UserResponse {
  id: number;
  name: string;
  username: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userId },
  } = req;
  let response: UserResponse[];

  response = await callApi(`${SERVER_URL}/users${userId ? `/${userId}` : ""}`, {
    method: "GET",
  });
  response && response.length
    ? res.status(200).json({ response })
    : res.status(404).json({ response: "Not Found" });
};
