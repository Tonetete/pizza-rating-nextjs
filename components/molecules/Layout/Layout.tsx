import Head from "next/head";
import { ReactElement } from "react";
import styled from "styled-components";
import Header from "../Header";

interface LayoutProps {
  children: ReactElement;
  [key: string]: any;
}

const LayoutStyled = styled.div`
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`;

const Layout = ({ children, ...props }: LayoutProps) => (
  <LayoutStyled>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="pizza rating" content="A site for rating pizzas" />
    </Head>
    <Header />
    <main>{children}</main>
  </LayoutStyled>
);

export default Layout;
