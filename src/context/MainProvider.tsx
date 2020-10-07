import React, { useReducer } from "react";
import {
  MainContext,
  MainContextState,
  MainContextAction,
  ChartType,
} from "./MainContext";

const MainProvider = ({ children = <></> }) => {
  let initState: MainContextState = {
    chartType: ChartType.Bar,
    dollar: 0,
  };

  let reducer = (state: MainContextState, action: MainContextAction) => {
    switch (action.type) {
      case "update-chart-type":
        return { ...state, chartType: action.payload };
      case "update-dollar":
        return { ...state, dollar: action.payload };
      default:
        return state;
    }
  };

  let [state, dispatch] = useReducer(reducer, initState);
  let value = { state, dispatch };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
