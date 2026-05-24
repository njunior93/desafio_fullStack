import { createContext, useState, type ReactNode } from "react";

interface IContext {
  listPosition: string[];
  listAvailability: string[];
  openModal: false | true;
  setOpenModal: (open: false | true) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  alertEdit: "sucess" | "error" | null;
  setAlertEdit: (alert: "sucess" | "error" | null) => void;
}

interface AppProvideProps {
  children: ReactNode;
}

const inicial: IContext = {
  listPosition: ["Cozinha", "Atendimento", "Logistica", "Administrativo"],

  listAvailability: ["Manhã", "Tarde", "Noite"],
  setOpenModal: () => {},
  openModal: false,
  setSelectedId: () => {},
  selectedId: null,
  alertEdit: null,
  setAlertEdit: () => {},
};

export const AppContext = createContext<IContext>(inicial);

export const AppProvider = ({ children }: AppProvideProps) => {
  const [openModal, setOpenModal] = useState<false | true>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [alertEdit, setAlertEdit] = useState<"sucess" | "error" | null>(null);

  return (
    <AppContext.Provider
      value={{
        alertEdit,
        setAlertEdit,
        selectedId,
        setSelectedId,
        openModal,
        setOpenModal,
        listPosition: inicial.listPosition,
        listAvailability: inicial.listAvailability,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
