import { SERVER_URL, callApi } from "./config";
import { CLIENT_URL } from "../../config/config";
import { NextApiRequest, NextApiResponse } from "next";

export const registerUser = async ({
  username,
  name,
  password,
}: {
  username: string;
  name: string;
  password: string;
}) => {
  const registerUserResponse = await fetch(`${CLIENT_URL}/api/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      username,
      password,
    }),
  });

  return registerUserResponse;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { name, username, password } = JSON.parse(body);
  let response = null;

  if (req.method === "POST" && name && username && password) {
    response = await callApi(`${SERVER_URL}/users?username=${username}`, {
      method: "GET",
    });

    if (response.length) {
      res
        .status(409)
        .json({ response: "There´s an existing username with that name" });
    } else {
      response = await callApi(`${SERVER_URL}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });
    }
  }

  response
    ? res.status(200).json({ response })
    : res.status(400).json({ response: "Bad Request" });
};

export default handler;
