import { NextApiRequest, NextApiResponse } from "next";
import { callApi } from "./config";
import Votes, { votePizza } from "./votes";

jest.mock("./config", () => ({
  callApi: jest.fn(async (url: string, options: any) =>
    Promise.resolve([{ id: 1, pizzaId: 1, userId: 1, votes: 3 }])
  ),
}));

const apiRequest = () => ({
  query: { pizzaId: 1, userId: 1, votes: 3 },
});

const statusJsonMock = jest.fn((code: number) => ({
  json: ({ response }) => response,
}));

const apiResponse = {
  status: statusJsonMock,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Votes Api Unit Test", () => {
  it("WHEN call api method with PUT THEN should return status 200", async () => {
    const response = await Votes(
      ({ ...apiRequest(), method: "PUT" } as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(200);
  });

  it("WHEN call api method with GET and get a result THEN should return status 200", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([{ id: 1, pizzaId: 1, userId: 1, votes: 3 }])
    );
    const response = await Votes(
      ({ ...apiRequest(), method: "GET" } as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(200);
  });

  it("WHEN call api method with GET and get no results THEN should return status 400", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Votes(
      ({ ...apiRequest(), method: "GET" } as unknown) as NextApiRequest,
      (apiResponse as unknown) as NextApiResponse
    );
    expect(statusJsonMock).toHaveBeenCalledWith(404);
  });

  it("WHEN call votePizza method THEN should vote pizza for a given user id", async () => {
    global.fetch = jest.fn((url, options = undefined) => {
      if (options && options.method === "PUT") {
        return Promise.resolve({ status: 200 });
      } else {
        return {
          json: async () =>
            Promise.resolve({
              response: [{ pizzaId: 1, userId: 1, votes: 4 }],
            }),
        };
      }
    }) as any;
    const setUpdateData = jest.fn((flag: boolean) => {});
    const response = await votePizza({
      pizzaId: 1,
      userId: 1,
      setUpdateData,
    });
    expect(setUpdateData).toHaveBeenCalledWith(true);
  });
});
