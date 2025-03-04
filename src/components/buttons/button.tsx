import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <StyledButton type={type || "submit"} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  height: 35px;

  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
  padding: 2px 10px;

  color: ${({theme}) => theme.palette.button.buttonText};
  
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export default Button;
