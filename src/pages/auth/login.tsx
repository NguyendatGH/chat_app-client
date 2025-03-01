import React from "react";
import styled from "styled-components";
import { AuthForm } from "@/components/forms/authForm";
import { Link } from "@/components/links/link";

const Login = () => {
  console.log("hi");
  return (
    <>
      <Container>
        <Title>Login</Title>
        <AuthForm type="login" />
        <Link href="/register"> register here</Link>
      </Container>
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  background-color: ${({ theme }) => theme.palette.background.appBg};
  width: 360px;
  border-radius: 16px;
  padding: 12px;
`;

const Title = styled.h1`
  margin-top: 10px;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.text.mainColor};
`;

export default Login;
