import Button from "@/components/buttons/button";
import { TextInput } from "@/components/inputs/textInput";
import { Formik, Form } from "formik";
import styled from "styled-components";
import useLoginMutation, {
  FormValue,
} from "@/hooks/mutations/useLoginMutation";
import authValidationSchema from "../utils/authValidationSchema";

const initialValues: FormValue = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const { mutation, error } = useLoginMutation();

  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={authValidationSchema}
          onSubmit={(value) => mutation.mutate(value)}
        >
          <Form>
            <TextInput name="username" type="text" label="Username..." />
            <TextInput name="password" type="password" label="Password..." />
            <Button>{mutation.isPending ? "loading..." : "login"}</Button>
            <ErrorContainer>{mutation.isError ? error : null}</ErrorContainer>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: auto 0;
  padding: 16px;
`;

const ErrorContainer = styled.div`
  color: ${({ theme }) => theme.palette.error};
  margin: 10px 0;
`;
export default LoginForm;
