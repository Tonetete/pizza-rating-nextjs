import styled from "styled-components";

const ButtonStyled = styled.button`
  border: 0;
  background: #78f89f;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  line-height: 1;

  :disabled {
    opacity: 0.4;
  }
`;

export default ButtonStyled;
