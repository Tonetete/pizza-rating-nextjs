export const SERVER_URL = "http://localhost:9000";
export const GITHUB_PROFILE_URL = "https://api.github.com/users/tonetete";
import { CLIENT_URL } from "../../config/config";

export const callApi = async (url, options) => {
  const result = await fetch(url, options);
  return result.json();
};

export const getInitialRequests = async () => {
  const pizzaResponse = await fetch(`${CLIENT_URL}/api/pizzas`);
  const votesResponse = await fetch(`${CLIENT_URL}/api/votes`);
  const usersResponse = await fetch(`${CLIENT_URL}/api/users`);
  const githubResponse = await fetch(`${GITHUB_PROFILE_URL}`);
  const githubResult = await githubResponse.json();
  const pizzaResult = await pizzaResponse.json();
  const votesResult = await votesResponse.json();
  const usersResult = await usersResponse.json();

  return { githubResult, pizzaResult, votesResult, usersResult };
};
