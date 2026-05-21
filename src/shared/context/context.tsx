import { createContext, useState, type ReactNode } from "react";

interface IContext {
  listaCargos: string[];
  listaDisponibilidade: string[];
}

interface AppProvideProps {
  children: ReactNode;
}

const inicial: IContext = {
  listaCargos: [
    "Cozinha",
    "Atendimento",
    "Logistica",
    "Administrativo",
  ],

  listaDisponibilidade: [
    "Manhã",
    "Tarde",
    "Noite"
  ]
};

export const AppContext = createContext<IContext>(inicial);

export const AppProvider = ({ children }: AppProvideProps) => {

  return (
    <AppContext.Provider value={{listaCargos: inicial.listaCargos, listaDisponibilidade: inicial.listaDisponibilidade}}
    >
      {children}
    </AppContext.Provider>
  );
};
