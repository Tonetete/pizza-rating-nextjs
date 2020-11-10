import { ReactElement } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button";

const ModalStyled = styled.div`
  width: 500px;
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;
  box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  margin: auto;
  h2 {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 0;
  }
  .content {
    padding: 1rem;
  }
  .actions {
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 0.5rem 1rem;
  }
`;

const Modal = ({
  onCloseCb,
  show,
  title,
  submitText,
  children,
}: {
  onCloseCb: (evt: React.SyntheticEvent) => void;
  show: boolean;
  title: string;
  submitText: string;
  children: ReactElement;
}) => {
  const onClose = (e: React.SyntheticEvent) => {
    onCloseCb && onCloseCb(e);
  };
  if (!show) {
    return null;
  }
  return (
    <ModalStyled>
      <h2>{title}</h2>
      <div className="content">{children}</div>
      <div className="actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </ModalStyled>
  );
};

export default Modal;
