import { NextApiRequest, NextApiResponse } from "next";
import { callApi } from "./config";
import Login from "./login";

jest.mock("./config", () => ({
  // @ts-ignore
  callApi: jest.fn(async (url: string, options: any) =>
    Promise.resolve([{ username: "username", id: 1 }])
  ),
}));

const apiRequest = () => ({
  query: {
    username: "username",
    password: 1234,
  },
});

const apiResponse = () => ({
  status: (code: number) => ({
    json: ({ response }) => response,
  }),
});

describe("Login Api Unit Test", () => {
  it("WHEN call api method and get a success response THEN should return status 200", async () => {
    const response = await Login(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse() as unknown) as NextApiResponse
    );
    expect(response).toEqual([{ username: "username", id: 1 }]);
  });

  it("WHEN call api method and get a failure response THEN should return status 4040", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Login(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse() as unknown) as NextApiResponse
    );
    expect(response).toEqual("Bad Request");
  });
});
