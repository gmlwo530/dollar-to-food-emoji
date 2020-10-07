import React, { useContext } from "react";

interface MainContextAPI {
  state: MainContextState;
  dispatch: React.Dispatch<MainContextAction>;
}

export enum ChartType {
  Text = 0,
  Bar,
}

export type MainContextAction =
  | {
      type: "update-chart-type";
      payload: ChartType;
    }
  | {
      type: "update-dollar";
      payload: number;
    };

export interface MainContextState {
  chartType: ChartType;
  dollar: number;
}

export const MainContext = React.createContext<MainContextAPI | undefined>(
  undefined
);

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
