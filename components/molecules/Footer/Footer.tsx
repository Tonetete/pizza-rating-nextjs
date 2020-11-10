import styled from "styled-components";

const FooterStyled = styled.main`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-left: 0.5rem;
  }

  .logo {
    height: 5em;
  }
`;

const Footer = ({ githubParams }: any) => {
  return (
    <FooterStyled>
      Developed by
      <a href={githubParams && githubParams.html_url}>Antonio Rivas</a>
      <img
        src={githubParams && githubParams.avatar_url}
        alt="avatar"
        className="logo"
      />
      <br />
      Powered by
      <a href="https://nextjs.org/">Next.JS</a>
    </FooterStyled>
  );
};

export default Footer;
