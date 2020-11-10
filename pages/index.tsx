import React, { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getInitialRequests } from "./api/config";
import utilStyles from "../styles/utils.module.css";
import { PizzaResponse } from "./api/pizzas";
import { votePizza } from "./api/votes";
import Layout from "../components/molecules/Layout";
import Footer from "../components/molecules/Footer";
import Barchart from "../components/molecules/ChartBar";
import Button from "../components/atoms/Button";
import { parsePizzaResponse } from "../parsers/pizzaParser";
import { parseUsersVotesResponse } from "../parsers/usersVotesParser";
import Cookies from "js-cookie";

export type PizzaVotesResponse = PizzaResponse & { votes: number };
export type UserVotesResponse = { userId: number; name: string; votes: number };
export type UserVotesChartData = { labels: string[]; values: number[] };

interface Data {
  pizzaData: PizzaVotesResponse[];
  githubData: any;
  usersVotesData: UserVotesChartData;
}

interface HomeProps {
  data: Data;
}

export const MainContext = React.createContext({});

const Home = ({ data }: HomeProps) => {
  const { useState } = React;
  const [updateData, setUpdateData] = useState(false);
  const [userId, setUserId] = useState<number>(Number(Cookies.get("userId")));
  const [pizzaData, setPizzaData] = useState(data.pizzaData);
  const [usersVotesData, setUsersVotesData] = useState(data.usersVotesData);

  const actions = {
    setUserId,
  };

  useEffect(() => {
    const getResponse = async () => {
      const {
        pizzaResult,
        usersResult,
        votesResult,
      } = await getInitialRequests();

      const pizzaParseData = parsePizzaResponse({
        pizzaResult: pizzaResult.response,
        votesResult: votesResult.response,
      });
      const usersVotesData = parseUsersVotesResponse({
        usersResponse: usersResult.response,
        votesResponse: votesResult.response,
      });

      setPizzaData(pizzaParseData);
      setUsersVotesData(usersVotesData);
      setUpdateData(false);
    };

    if (updateData) {
      getResponse();
    }
  }, [updateData]);

  return (
    <MainContext.Provider value={actions}>
      <Layout>
        <React.Fragment>
          <Head>
            <title>Pizza Rating!</title>
          </Head>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          >
            <h2 className={utilStyles.headingLg}>Pizza Rating!</h2>
            <ul className={utilStyles.list}>
              {pizzaData.map(({ id, title, image, votes }) => (
                <li className={utilStyles.listItem} key={id}>
                  <img className={utilStyles["item-image"]} src={image} />
                  <br />
                  <span>
                    {title} <br /> Likes: {votes}
                  </span>
                  <br />
                  <Button
                    disabled={!userId}
                    onClick={() =>
                      votePizza({
                        pizzaId: id,
                        setUpdateData,
                        userId,
                      })
                    }
                  >
                    I love it!
                  </Button>
                </li>
              ))}
            </ul>
            <Barchart
              titleChart="Ranking 10 users with most votes"
              data={usersVotesData}
            />
          </section>
          <Footer githubParams={data.githubData} />
        </React.Fragment>
      </Layout>
    </MainContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    githubResult,
    usersResult,
    pizzaResult,
    votesResult,
  } = await getInitialRequests();

  const pizzaData = parsePizzaResponse({
    pizzaResult: pizzaResult.response,
    votesResult: votesResult.response,
  });

  const usersVotesData = parseUsersVotesResponse({
    usersResponse: usersResult.response,
    votesResponse: votesResult.response,
  });

  const data: Data = {
    pizzaData: [...pizzaData],
    githubData: { ...githubResult },
    usersVotesData: { ...usersVotesData },
  };

  return { props: { data } };
};

export default Home;
