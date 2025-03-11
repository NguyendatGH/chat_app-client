import styled, { useTheme } from "styled-components";
import { BiSolidTrash } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import { DefaultTheme } from "styled-components/dist/types";
import { useState } from "react";
import Modal from "..";
import useConversationContext from "@/store/conversationContext";
export const ContactOption: React.FC = () => {
  const [modalType, setModalType] = useState<("delete" | "clear")[]>([]);

  const { resetMessage } = useConversationContext();

  const openModal = (type: "delete" | "clear") => {
    setModalType((prev) => [...prev, type]);
  };
  const closeModal = () => {
    setModalType((prev) => prev.slice(0, prev.length - 1));
  };
  const theme = useTheme();

  const renderContent = (modalType: "delete" | "clear", theme: DefaultTheme) => {
    switch (modalType) {
      case "delete":
        return (
          <ModalContent style={{color: theme.palette.text.mainColor}}>
            <h3>Are you sure to delete this conversation ?</h3>
            <span style={{ color: "#cc0000" }}>
              this action cannot be restore!
            </span>
            <ButtonGroup>
              <Button onClick={deleteContact}>Yes</Button>
              <Button onClick={closeModal}>No</Button>
            </ButtonGroup>
          </ModalContent>
        );
      case "clear":
        return (
          <ModalContent>
            <h3 >Are you sure to clear this conversation ?</h3>
            <span style={{ color: "#cc0000" }}>this action cannot be restore!</span>
            <ButtonGroup>
              <Button onClick={clearConversation}>Yes</Button>
              <Button onClick={closeModal}>No</Button>
            </ButtonGroup>
          </ModalContent>
        );
      default:
        return <></>;
    }
  };
  const deleteContact = () => {
    closeModal();
  };
  const clearConversation = async () => {
    await resetMessage();
    alert("all message have been deleted!");
    closeModal();
  };
  return (
    <>
      <Container>
        <Title>Contact option</Title>
        <Option onClick={() => openModal("clear")}>
          <IconComponent Icon={MdRestore} color="#00897B" />
          Clear Conversation
        </Option>
        <Option onClick={() => openModal("delete")}>
          <IconComponent Icon={BiSolidTrash} color="#C62828" />
          Delete Contact
        </Option>
      </Container>
      {modalType.map((type, index) => (
        <Modal
          key={index}
          onModalClose={closeModal}
          Content={renderContent(type, theme)}
        />
      ))}
    </>
  );
};

const IconComponent: React.FC<{
  Icon: React.ElementType;
  color: keyof DefaultTheme;
}> = ({ Icon, color }) => {
  return <StyledIcon as={Icon} color={color} />;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 16px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.palette.text.mainColor};
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.mainColor};
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.priority.warning};
  }
`;
const StyledIcon = styled.div<{ color: keyof DefaultTheme["palette"] }>`
  fill: ${({ theme, color }) => theme.palette[color]};
  width: 20px;
  height: 20px;
  margin: 0 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.palette.text.textColor};
  padding: 10px 24px;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.textColor};

  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;
