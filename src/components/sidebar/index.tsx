import React from "react";
import styled from "styled-components";
import { Contacts } from "../contacts";
import { ActionsHeader } from "./actionsHeader";

export const SideBar: React.FC = () => {
  return (
    <Container>
      <ActionsHeader />
      <Contacts />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  gap: 20px;

  padding: 0 10px;
  border-right: 2px solid ${({ theme }) => theme.palette.border};
`;
