import { NextApiRequest, NextApiResponse } from "next";
import { callApi } from "./config";
import Register, { registerUser } from "./register";

jest.mock("./config", () => ({
  callApi: jest.fn(async (url: string, options: any) =>
    Promise.resolve([{ id: 1 }])
  ),
}));

const apiRequest = () => ({
  method: "POST",
  body: JSON.stringify({
    name: "name",
    username: "username",
    password: "1234",
  }),
});

const statusJsonMock = jest.fn((code: number) => ({
  json: ({ response }) => response,
}));

const apiResponse = {
  status: statusJsonMock,
};

describe("Register Api Unit Test", () => {
  it("WHEN call api method registiring an existing user THEN should return status 409", async () => {
    const response = await Register(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(409);
  });

  it("WHEN call api method registiring a non-existing user THEN should return status 200", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Register(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(200);
  });

  it("WHEN call api method with wrong method THEN should return status 400", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Register(
      ({ ...apiRequest(), method: "GET" } as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(400);
  });

  it("WHEN call registerUser method THEN should return from server", async () => {
    global.fetch = jest.fn((url) => Promise.resolve([{ id: 1 }])) as any;
    const response = await registerUser({
      username: "username",
      name: "name",
      password: "1234",
    });
    expect(response).toEqual([{ id: 1 }]);
  });
});
