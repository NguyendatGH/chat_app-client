import styled from "styled-components";
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

  const renderContent = (modalType: "delete" | "clear") => {
    switch (modalType) {
      case "delete":
        return (
          <ModalContent>
            <h2>Are you sure to delete this conversation ?</h2>
            <span>this action cannot be restore!</span>
            <ButtonGroup>
              <Button onClick={deleteContact}>Yes</Button>
              <Button onClick={closeModal}>Cancel</Button>
            </ButtonGroup>
          </ModalContent>
        );
      case "clear":
        return (
          <ModalContent>
            <h2>Are you sure to clear this conversation ?</h2>
            <span>this action cannot be restore!</span>
            <ButtonGroup>
              <Button onClick={clearConversation}>Yes</Button>
              <Button onClick={closeModal}>Cancel</Button>
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
    // setMessages([]); 
    await resetMessage();
    alert("all message have been deleted!");
    closeModal();
  };
  return (
    <>
      <Container>
        <Title>Contact option</Title>
        <Option onClick={() => openModal("clear")}>
          <IconComponent Icon={MdRestore} color="success" />
          Clear Conversation
        </Option>
        <Option onClick={() => openModal("delete")}>
          <IconComponent Icon={BiSolidTrash} color="error" />
          Delete Contact
        </Option>
      </Container>
      {modalType.map((type, index) => (
        <Modal
          key={index}
          onModalClose={closeModal}
          Content={renderContent(type)}
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
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
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
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;
