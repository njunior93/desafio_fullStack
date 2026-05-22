import { createContext, useState, type ReactNode } from "react";

interface IContext {
  listPosition: string[];
  listAvailability: string[];
}

interface AppProvideProps {
  children: ReactNode;
}

const inicial: IContext = {
  listPosition: [
    "Cozinha",
    "Atendimento",
    "Logistica",
    "Administrativo",
  ],

  listAvailability: [
    "Manhã",
    "Tarde",
    "Noite"
  ]
};

export const AppContext = createContext<IContext>(inicial);

export const AppProvider = ({ children }: AppProvideProps) => {

  return (
    <AppContext.Provider value={{listPosition: inicial.listPosition, listAvailability: inicial.listAvailability}}
    >
      {children}
    </AppContext.Provider>
  );
};
