import React from "react";

import { foodEmojis, dollarToFoodEmoji } from "../data";
import { useMainContext } from "../context/MainContext";
import "../sass/text_chart.scss";

import { Text } from "@visx/text";

interface TextChartProps {
  parentWidth: number;
  parentHeight: number;
}

interface TextChartAttr {
  chartWidth: number;
  chartHeight: number;
}

const TextChart: React.FC<TextChartProps> = ({ parentWidth, parentHeight }) => {
  const { state } = useMainContext();

  const columnCount =
    foodEmojis.length > 25 ? 7 : foodEmojis.length > 9 ? 5 : 3;

  const getColumnCountAndWidth = (): TextChartAttr => {
    return {
      chartWidth: parentWidth / columnCount,
      chartHeight: parentHeight / columnCount,
    };
  };

  const { chartWidth, chartHeight } = getColumnCountAndWidth();

  return (
    <div id="price-text-chart-layout" data-column-count={columnCount}>
      {dollarToFoodEmoji(state.dollar).map((item, index) => {
        return (
          <div className="price-layout" key={index}>
            <span role="img" aria-label={item.label}>
              {item.emoji}
            </span>
            <Text
              width={chartWidth / 6}
              x={(chartWidth * 5) / 12}
              y={chartHeight / 2}
              style={{ fontWeight: 800 }}
              scaleToFit
            >
              {item.result.toString().toLocaleString()}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default TextChart;
