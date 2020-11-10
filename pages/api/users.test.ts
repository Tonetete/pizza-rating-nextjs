import { NextApiRequest, NextApiResponse } from "next";
import { callApi } from "./config";
import Users from "./users";

jest.mock("./config", () => ({
  callApi: jest.fn(async (url: string, options: any) =>
    Promise.resolve([{ id: 1, name: "name", username: "username" }])
  ),
}));

const apiRequest = () => ({
  query: { userId: 1 },
});

const statusJsonMock = jest.fn((code: number) => ({
  json: ({ response }) => response,
}));

const apiResponse = {
  status: statusJsonMock,
};

describe("Users Api Unit Test", () => {
  it("WHEN call api method and user exists THEN should return status 200", async () => {
    const response = await Users(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(200);
  });

  it("WHEN call api method registiring a non-existing user THEN should return status 404", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Users(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(404);
  });
});
