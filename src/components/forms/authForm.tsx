import React from "react";
import {Formik, Form} from "formik";
import styled from "styled-components";
import {Button} from "@/components/button";
import {TextInput} from "@/components/inputs/textInput";
import {AuthCredentials} from "@/interfaces";
import authValidationSchema from "@/pages/auth/authValidationSchema";
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

export const AuthForm: React.FC<AuthFormProps> = ({type}) => {
  const {error, isPending, mutate} = useAuthMutation();

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={authValidationSchema}
        onSubmit={(value: AuthCredentials) => mutate({value, type})}
      >
        <Form>
          <TextInput name="username" type="text" label="Username" />
          <TextInput name="password" type="password" label="Password" />

          <Button>{isPending ? "Loading..." : typeMap[type]}</Button>
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

const ErrorContainer = styled.div`
  color: ${({theme}) => theme.palette.error};
  margin: 10px 0;
`;
