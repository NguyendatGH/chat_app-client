import { useField } from "formik";
import { useMemo } from "react";
import styled from "styled-components";

interface TextInputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password";
}

export const TextInput: React.FC<TextInputProps> = ({ label, name, type }) => {
  const [field, meta] = useField({ name });
  const isError = useMemo(() => !!(meta.touched && meta.error), [meta]);

  return (
    <Container>
      <Label isError={isError}>{label}</Label>
      <Input
        {...field}
        name={name}
        type={type}
        isError={isError}
        autoComplete="off"
      />
      {isError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 44px;
`;

const Label = styled.label<{ isError: boolean }>`
  font-size: 14.5px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.palette.text.mainColor};
`;

const Input = styled.input<{ isError: boolean }>`
  -webkit-appearance: none;
  outline: none;
  padding: 4px;
  font-size: 14px;

  background-color: ${({ theme }) => theme.palette.background.appBg};
  color:  ${({ theme }) => theme.palette.text.mainColor};
  border: none;
  border-bottom: 2px solid
    ${({ theme, isError }) =>
      isError ? theme.palette.priority.error : theme.palette.border};
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.priority.error};

  font-size: 12px;
  margin-top: 2px;
`;
