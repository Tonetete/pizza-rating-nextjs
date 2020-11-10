import { NextApiRequest, NextApiResponse } from "next";
import { callApi } from "./config";
import Pizzas from "./pizzas";

jest.mock("./config", () => ({
  callApi: jest.fn(async (url: string, options: any) =>
    Promise.resolve([{ pizzaId: 1, title: "Barbecue" }])
  ),
}));

const apiRequest = () => ({
  query: {
    pizzaId: 1,
  },
});

const apiResponse = () => ({
  status: (code: number) => ({
    json: ({ response }) => response,
  }),
});

describe("Pizzas Api Unit Test", () => {
  it("WHEN call api method and get a success response THEN should return status 200", async () => {
    const response = await Pizzas(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse() as unknown) as NextApiResponse
    );
    expect(response).toEqual([{ pizzaId: 1, title: "Barbecue" }]);
  });

  it("WHEN call api method and get a success response THEN should return status 200", async () => {
    // @ts-ignore
    callApi.mockImplementation(async (url: string, options: any) =>
      Promise.resolve([])
    );
    const response = await Pizzas(
      (apiRequest() as unknown) as NextApiRequest,
      (apiResponse() as unknown) as NextApiResponse
    );
    expect(response).toEqual("Not Found");
  });
});
