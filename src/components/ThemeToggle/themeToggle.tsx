import React from "react";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/themeContext";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      <Icon>{isDark ? <FaSun /> : <FaMoon />}</Icon>
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  right: 28px;
  bottom: 28px;
  background: ${({ theme }) => theme.palette.background.appBg};
  border-radius: 50%;
  border: none;
  padding: 14px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);


  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 20px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 20px;
    color: ${({ theme }) =>
      theme.palette.text.mainColor}; 
    transition: color 0.3s ease-in-out;
  }
`;
export default ThemeToggle;
