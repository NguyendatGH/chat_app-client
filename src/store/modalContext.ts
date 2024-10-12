import {create} from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ModalsMap {
  profile: JSX.Element;
  contact: JSX.Element;
}

interface ModalContext {
  isModalOpen: boolean;
  currentModal: keyof ModalsMap | null;
  openModal: (modalKey: keyof ModalsMap) => void;
  closeModal: () => void;
}

const useModalContext = create<ModalContext>()(
    immer((set) => ({
        isModalOpen : false,
        currentModal : null,
        openModal: (modalKey) => {
            set((state) =>{
                state.isModalOpen = true;
                state.currentModal = modalKey;
            })
        },


        closeModal: () =>{
            set((state) =>{
                state.isModalOpen = false;
                state.currentModal = null;
            })
        }
    }))
);
export default useModalContext;