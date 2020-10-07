import React, { useEffect, useRef, useState } from "react";
import { BarChart } from "./BarChart";
import { TextChart } from "./TextChart";

import { useMainContext, ChartType } from "../context/MainContext";

import "../sass/main.scss";

interface MainSize {
  width: number;
  height: number;
}

export const Main: React.FC = () => {
  const { state } = useMainContext();
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainSize, setMainSize] = useState<MainSize>({ width: 0, height: 0 });

  const renderChart = (chartType: ChartType) => {
    switch (chartType) {
      case ChartType.Text:
        return (
          <TextChart
            parentWidth={mainSize.width}
            parentHeight={mainSize.height}
          />
        );
      case ChartType.Bar:
        return (
          <BarChart
            parentWidth={mainSize.width}
            parentHeight={mainSize.height}
          />
        );
      default:
        return (
          <TextChart
            parentWidth={mainSize.width}
            parentHeight={mainSize.height}
          />
        );
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      setMainSize({
        width: mainRef.current.offsetWidth,
        height: mainRef.current.offsetHeight,
      });
    }
  }, [mainRef]);

  return <main ref={mainRef}>{renderChart(state.chartType)}</main>;
};
