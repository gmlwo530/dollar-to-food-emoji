import React from "react";

import { useMainContext, ChartType } from "../context/MainContext";

import "../sass/header.scss";

export const Header: React.FC = () => {
  const { state, dispatch } = useMainContext();

  const updateDollar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDollar = parseInt(e.target.value);

    if (isNaN(newDollar)) {
      newDollar = 0;
    }

    dispatch({ type: "update-dollar", payload: newDollar });
  };

  return (
    <header>
      <div id="dollar-input-layout">
        <div id="label">$&nbsp;&nbsp;&nbsp;</div>
        <input
          type="text"
          pattern="[0-9]*"
          id="dollar-input"
          value={state.dollar}
          onChange={updateDollar}
        />
      </div>

      <select
        id="chart-select"
        value={state.chartType}
        onChange={(e) =>
          dispatch({
            type: "update-chart-type",
            payload: parseInt(e.target.value),
          })
        }
      >
        <option value={ChartType.Text}>Text Chart</option>
        <option value={ChartType.Bar}>Bar Chart</option>
      </select>
    </header>
  );
};
