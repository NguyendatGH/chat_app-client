import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface ModalItem {
  key: string;
  component: keyof ModalsMap;
}

interface ModalContext {
  modals: ModalItem[];
  openModal: (key: string, modalKey: keyof ModalsMap) => void;
  closeModal: (key: string) => void;
  closeAllModals: () => void;
}

export interface ModalsMap {
  profile: JSX.Element;
  contact: JSX.Element;
  [key: string]: JSX.Element;
}



const useModalContext = create<ModalContext>()(
  immer((set) => ({
    modals: [],
    openModal: (key, modalKey) => {
      set((state) => {
        if (!state.modals.some((modal) => modal.key === key)) {
          state.modals.push({ key, component: modalKey });
        }
      });
    },

    closeModal: (key) => {
      set((state) => {
        state.modals = state.modals.filter((modal) => modal.key !== key);
      });
    },
    closeAllModals: () => {
      set((state) => {
        state.modals = [];
      });
    },
  }))
);
export default useModalContext;
