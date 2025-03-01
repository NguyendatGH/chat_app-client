import React from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import Button from "@/components/buttons/button";
import { TextInput } from "@/components/inputs/textInput";
import { AuthCredentials } from "@/interfaces";
import authValidationSchema from "@/pages/auth/utils/authValidationSchema";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";

interface AuthFormProps {
  type: "login" | "register";
}

const initialValues: AuthCredentials = {
  username: "",
  password: "",
};

const typeMap = {
  login: "Login",
  register: "Register",
};

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { error, isPending, mutate } = useAuthMutation();

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={authValidationSchema}
        onSubmit={(value: AuthCredentials) => mutate({ value, type })}
      >
        <Form>
          <TextInput name="username" type="text" label="Username" />
          <TextInput name="password" type="password" label="Password" />
          <ButtonWrapper>
            <Button>{isPending ? "Loading..." : typeMap[type]}</Button>
          </ButtonWrapper>
          <ErrorContainer>{error ? error : null}</ErrorContainer>
        </Form>
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  margin: auto 0;
  padding: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const ErrorContainer = styled.div`
  color: ${({ theme }) => theme.palette.priority.error};
  margin: 10px 0;
`;
