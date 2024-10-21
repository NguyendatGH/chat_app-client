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
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.dark};
  max-width: 500px;
  min-height: 500px;
  border-radius: 10px;
  padding: 12px;
`;

const Title = styled.h1`
  margin-top: 10px;
  text-align: center;
  margin-bottom: 16px;
`;

export default Login;
